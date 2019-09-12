import AsyncIDBObjectStore from './AsyncIDBObjectStore.js'
import AsyncIDBCursor from './AsyncIDBCursor.js'
import AsyncIDBCursorWithValue from './AsyncIDBCursorWithValue.js'
import { idbRequestToPromise } from './shared.js'

export default class AsyncIDBIndex {
  constructor(idbIndex) {
    this._decorated = idbIndex
  }

  // Properties (including non-standard)
  get isAutoLocale() { return this._decorated.isAutoLocale }

  get locale() { return this._decorated.locale }

  get name() { return this._decorated.name }

  get objectStore() {
    return new AsyncIDBObjectStore(this._decorated.objectStore)
  }

  get keyPath() { return this._decorated.keyPath }

  get multiEntry() { return this._decorated.multiEntry }

  get unique() { return this._decorated.unique }

  // Methods
  countAsync(...args) {
    return idbRequestToPromise(this._decorated.count(...args))
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

  async openCursorAsync(...args) {
    return new AsyncIDBCursorWithValue(await idbRequestToPromise(this._decorated.openCursor(...args)))
  }

  async openKeyCursorAsync(...args) {
    return new AsyncIDBCursor(await idbRequestToPromise(this._decorated.openKeyCursor(...args)))
  }
}
