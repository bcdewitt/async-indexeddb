import AsyncIDBDatabase from './AsyncIDBDatabase.js'
import AsyncIDBTransaction from './AsyncIDBTransaction.js'

export default ({ indexedDB = window.indexedDB } = {}) => {
  const toAsyncIDBDatabase = idbDatabase => new AsyncIDBDatabase(idbDatabase)
  const toAsyncIDBTransaction = idbTransaction => new AsyncIDBTransaction(idbTransaction)

  const idbOpenDBRequestToPromise = (request, { onupgradeneeded, ...eventHandlers } = {}) =>
    new Promise((resolve, reject) => {
      if (onupgradeneeded) {
        request.onupgradeneeded = e => onupgradeneeded({
          oldVersion: e.oldVersion,
          newVersion: e.newVersion,
          db: toAsyncIDBDatabase(e.target.result),
          transaction: toAsyncIDBTransaction(e.target.transaction),
        })
      }

      Object.assign(request, {
        ...eventHandlers,
        onerror: e => reject(e.target.error),
        onsuccess: e => resolve(toAsyncIDBDatabase(e.target.result)),
      })
    })

  return class AsyncIDBFactory {
    static openAsync(name, version, eventHandlers) {
      return idbOpenDBRequestToPromise(indexedDB.open(name, version), eventHandlers)
    }

    static deleteDatabaseAsync(name, eventHandlers) {
      return idbOpenDBRequestToPromise(indexedDB.deleteDatabase(name), eventHandlers)
    }

    static cmp(...args) {
      return indexedDB.cmp(...args)
    }

    static databasesAsync(...args) {
      return indexedDB.databases(...args)
    }
  }
}
