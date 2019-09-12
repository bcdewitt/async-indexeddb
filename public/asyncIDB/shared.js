export const idbRequestToPromise = request =>
  new Promise((resolve, reject) => {
    Object.assign(request, {
      onerror: e => reject(e.target.error),
      onsuccess: e => resolve(e.target.result),
    })
  })
