/* global Observable */
import AsyncIDBObjectStore from './AsyncIDBObjectStore.js'
import AsyncIDBIndex from './AsyncIDBIndex.js'
import { idbRequestToPromise } from './shared.js'

export default class AsyncIDBCursor {
  constructor(idbCursor) {
    this._decorated = idbCursor

    // Observables are push-based already, so it's shorter
    this._observable = new Observable((observer) => {
      idbCursor.onsuccess = ({ target: { result: cursor } }) => {
        if (cursor) observer.next(cursor)
        else if (observer.complete) observer.complete()
      }
      return () => {
        idbCursor.onsuccess = undefined
      }
    })
  }

  // NOTE: Took notes from callback-to-async-iterator
  async * [Symbol.asyncIterator]() {
    const pushQueue = []
    const pullQueue = []
    const pushValue = value => {
      if (pullQueue.length !== 0) {
        pullQueue.shift()(value)
      } else {
        pushQueue.push(value)
      }
    }

    const pullValue = () => {
      return new Promise(resolve => {
        if (pushQueue.length !== 0) {
          resolve(pushQueue.shift())
        } else {
          pullQueue.push(resolve)
        }
      })
    }

    this._decorated.onsuccess = ({ target: { result: cursor } }) => {
      pushValue(cursor)
    }
    while (true) {
      const currentCursor = await pullValue()
      if (!currentCursor) break
      yield currentCursor
    }
    this._decorated.onsuccess = undefined
  }

  get source() {
    const source = this._decorated.source
    if (source instanceof IDBObjectStore) {
      return new AsyncIDBObjectStore(source)
    } else if (source instanceof IDBIndex) {
      return new AsyncIDBIndex(source)
    }
  }

  get direction() { return this._decorated.direction }
  get key() { return this._decorated.key }
  get primaryKey() { return this._decorated.primaryKey }

  // avoid exposing "request" in favor of iterator/observable
  get observable() {
    return this._observable
  }

  advance(...args) { return this._decorated.advance(...args) }
  continue(...args) { return this._decorated.continue(...args) }
  continuePrimaryKey(...args) { return this._decorated.continuePrimaryKey(...args) }

  deleteAsync(...args) {
    return idbRequestToPromise(this._decorated.delete(...args))
  }

  updateAsync(...args) {
    return idbRequestToPromise(this._decorated.update(...args))
  }
}
