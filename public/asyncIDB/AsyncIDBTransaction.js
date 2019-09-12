import AsyncIDBDatabase from './AsyncIDBDatabase.js'
import AsyncIDBObjectStore from './AsyncIDBObjectStore.js'

export default class AsyncIDBTransaction {
  constructor(idbTransaction) {
    this._decorated = idbTransaction
  }

  get db() { return new AsyncIDBDatabase(this._decorated.db) }
  get error() { return this._decorated.error }
  get mode() { return this._decorated.mode }
  get objectStoreNames() { return this._decorated.objectStoreNames }

  abort(...args) {
    return this._decorated.abort(...args)
  }

  objectStore(...args) {
    return new AsyncIDBObjectStore(this._decorated.objectStore(...args))
  }

  commit(...args) {
    return this._decorated.commit(...args)
  }

  set onabort(f) { this._decorated.onabort = f }
  get onabort() { return this._decorated.onabort }

  set oncomplete(f) { this._decorated.oncomplete = f }
  get oncomplete() { return this._decorated.oncomplete }

  set onerror(f) { this._decorated.onerror = f }
  get onerror() { return this._decorated.onerror }

  addEventListener(...args) {
    return this._decorated.addEventListener(...args)
  }

  removeEventListener(...args) {
    return this._decorated.removeEventListener(...args)
  }

  dispatchEvent(...args) {
    return this._decorated.dispatchEvent(...args)
  }

  // Added...but is it needed?
  asPromise(resolveOnAbort = true) {
    return new Promise((resolve, reject) => {
      const once = (eventName, handler) =>
        this.addEventListener(eventName, handler, { once: true })

      once('error', e => reject(e.target.error))
      once('complete', e => resolve(e))
      if (resolveOnAbort) once('abort', e => resolve(e))
    })
  }
}
