import schemaVersionMap from './schemaVersionMap.js'
import seed from './seed.js'

const versionGenerator = function * (versionMap, oldVersion, newVersion) {
  let i = oldVersion + 1
  while (i <= newVersion) {
    yield versionMap.get(i++)
  }
}

export default async ({ oldVersion, newVersion, db, transaction }) => {
  console.log(`Upgrading IndexedDB "${db.name}" v${oldVersion} -> v${newVersion}`)

  // Schema
  for (const versionBuilder of versionGenerator(schemaVersionMap, oldVersion, newVersion)) {
    await versionBuilder({ db, transaction })
  }
  await transaction.asPromise()

  // Seed
  const seedTransaction = db.transaction(seed[0], 'readwrite')
  await seed[1](seedTransaction)
  return seedTransaction.asPromise()
}
