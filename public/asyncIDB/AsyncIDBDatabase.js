import AsyncIDBObjectStore from './AsyncIDBObjectStore.js'
import AsyncIDBTransaction from './AsyncIDBTransaction.js'

export default class AsyncIDBDatabase {
  constructor(idbDatabase) {
    this._decorated = idbDatabase
  }

  get name() { return this._decorated.name }
  get version() { return this._decorated.version }
  get objectStoreNames() { return this._decorated.objectStoreNames }

  createObjectStore(...args) {
    return new AsyncIDBObjectStore(
      this._decorated.createObjectStore(...args)
    )
  }

  deleteObjectStore(...args) {
    return this._decorated.deleteObjectStore(...args)
  }

  transaction(...args) {
    return new AsyncIDBTransaction(
      this._decorated.transaction(...args)
    )
  }

  set onabort(f) { this._decorated.onabort = f }
  get onabort() { return this._decorated.onabort }

  set onclose(f) { this._decorated.onclose = f }
  get onclose() { return this._decorated.onclose }

  set onerror(f) { this._decorated.onerror = f }
  get onerror() { return this._decorated.onerror }

  set onversionchange(f) { this._decorated.onversionchange = f }
  get onversionchange() { return this._decorated.onversionchange }

  addEventListener(...args) {
    return this._decorated.addEventListener(...args)
  }

  removeEventListener(...args) {
    return this._decorated.removeEventListener(...args)
  }

  dispatchEvent(...args) {
    return this._decorated.dispatchEvent(...args)
  }
}
