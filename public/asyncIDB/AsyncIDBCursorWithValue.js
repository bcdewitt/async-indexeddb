import AsyncIDBCursor from './AsyncIDBCursor.js'

export default class AsyncIDBCursorWithValue extends AsyncIDBCursor {
  get value() { return this._decorated.value }
}
