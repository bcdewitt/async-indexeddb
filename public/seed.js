export default [['customers', 'businesses'], async t => {
  const customersStore = t.objectStore('customers')
  const businessesStore = t.objectStore('businesses')

  // Customers are new, let's seed them
  await customersStore.addAsync({
    ssn: '123-45-6789',
    name: 'John Doe',
  })

  await customersStore.addAsync({
    ssn: '987-65-4321',
    name: 'Jane Doe',
  })

  // Email is new on customers, so let's seed that for John and Jane Doe
  const johnDoeCustomer = await customersStore.getAsync('123-45-6789')
  customersStore.putAsync(Object.assign(johnDoeCustomer, {
    email: 'john.doe@gmail.com',
  }))

  const janeDoeCustomer = await customersStore.getAsync('987-65-4321')
  customersStore.putAsync(Object.assign(janeDoeCustomer, {
    email: 'jane.doe@gmail.com',
  }))

  // Businesses are new, let's seed those
  businessesStore.addAsync({
    ein: '123456789',
    name: 'ResolveX Technology, LLC',
  })
}]
