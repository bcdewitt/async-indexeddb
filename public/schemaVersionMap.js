export default new Map([
  [1, ({ db }) => {
    db.createObjectStore('customers', { keyPath: 'ssn' })
      .createIndex('name', 'name', { unique: false })
  }],

  [2, ({ db, transaction }) => {
    db.createObjectStore('businesses', { keyPath: 'ein' })
      .createIndex('name', 'name', { unique: false })

    transaction.objectStore('customers')
      .createIndex('email', 'email', { unique: true })
  }],
])
