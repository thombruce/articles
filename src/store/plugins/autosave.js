import _ from 'lodash'

import { Database } from '@/database.js'

const db = new Database()

const save = _.debounce(function (id, payload) {
  db.notes.update(id, payload)
}, 500, { maxWait: 2000 })

const autosave = store => {
  store.subscribe((mutation, _state) => {
    if (mutation.type === 'notes/update') {
      save(mutation.payload.id, mutation.payload)
    }
  })
}

export default autosave
