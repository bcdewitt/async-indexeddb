import AsyncIDBTransaction from './AsyncIDBTransaction.js'
import AsyncIDBIndex from './AsyncIDBIndex.js'
import AsyncIDBCursorWithValue from './AsyncIDBCursorWithValue.js'
import AsyncIDBCursor from './AsyncIDBCursor.js'
import { idbRequestToPromise } from './shared.js'

export default class AsyncIDBObjectStore {
  constructor(idbObjectStore) {
    this._decorated = idbObjectStore
  }

  // Properties
  get indexNames() { return this._decorated.indexNames }

  get keyPath() { return this._decorated.keyPath }

  get name() { return this._decorated.name }
  set name(v) { this._decorated.name = v }

  get transaction() {
    return new AsyncIDBTransaction(this._decorated.transaction)
  }

  get autoIncrement() { return this._decorated.autoIncrement }

  // Methods
  addAsync(...args) {
    return idbRequestToPromise(this._decorated.add(...args))
  }

  clearAsync(...args) {
    return idbRequestToPromise(this._decorated.clear(...args))
  }

  countAsync(...args) {
    return idbRequestToPromise(this._decorated.count(...args))
  }

  createIndex(...args) {
    return new AsyncIDBIndex(this._decorated.createIndex(...args))
  }

  deleteAsync(...args) {
    return idbRequestToPromise(this._decorated.delete(...args))
  }

  deleteIndex(...args) {
    return this._decorated.deleteIndex(...args)
  }

  getAsync(...args) {
    return idbRequestToPromise(this._decorated.get(...args))
  }

  getKeyAsync(...args) {
    return idbRequestToPromise(this._decorated.getKey(...args))
  }

  getAllAsync(...args) {
    return idbRequestToPromise(this._decorated.getAll(...args))
  }

  getAllKeysAsync(...args) {
    return idbRequestToPromise(this._decorated.getAllKeys(...args))
  }

  index(...args) {
    return new AsyncIDBIndex(this._decorated.index(...args))
  }

  openCursor(...args) {
    return new AsyncIDBCursorWithValue(this._decorated.openCursor(...args))
  }

  openKeyCursor(...args) {
    return new AsyncIDBCursor(this._decorated.openKeyCursor(...args))
  }

  putAsync(...args) {
    return idbRequestToPromise(this._decorated.put(...args))
  }
}
