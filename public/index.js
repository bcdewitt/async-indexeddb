import 'https://unpkg.com/core-js-bundle@3.2.1/minified.js'
import createAsyncIDBFactory from './asyncIDB/index.js'
import onupgradeneeded from './onupgradeneeded.js'

const AsyncIDBFactory = createAsyncIDBFactory()

;(async () => {
  try {
    const db = await AsyncIDBFactory.openAsync('test', 2, { onupgradeneeded })
    const transaction = db.transaction(['customers', 'businesses'], 'readonly')

    // Build Customers Table
    const customerCursor = transaction.objectStore('customers').openCursor()
    const customersTableEl = document.querySelector('.js-customers-table')
    for await (const cursor of customerCursor) {
      const trEl = document.createElement('tr')
      const tdEl1 = document.createElement('td')
      const tdEl2 = document.createElement('td')
      const tdEl3 = document.createElement('td')
      tdEl1.textContent = cursor.value.ssn
      tdEl2.textContent = cursor.value.name
      tdEl3.textContent = cursor.value.email
      trEl.appendChild(tdEl1)
      trEl.appendChild(tdEl2)
      trEl.appendChild(tdEl3)
      customersTableEl.appendChild(trEl)
      cursor.continue()
    }

    // Build Businesses Table
    const businessCursor = transaction.objectStore('businesses').openCursor()
    const businessesTableEl = document.querySelector('.js-businesses-table')
    for await (const cursor of businessCursor) {
      const trEl = document.createElement('tr')
      const tdEl1 = document.createElement('td')
      const tdEl2 = document.createElement('td')
      tdEl1.textContent = cursor.value.ein
      tdEl2.textContent = cursor.value.name
      trEl.appendChild(tdEl1)
      trEl.appendChild(tdEl2)
      businessesTableEl.appendChild(trEl)
      cursor.continue()
    }

  // Handle errors
  } catch (e) {
    const el = document.querySelector('.js-app-message')
    if (!el) return
    el.textContent = e.message
    el.classList.add('app-message--danger')
    console.error(e)
  }
})()
