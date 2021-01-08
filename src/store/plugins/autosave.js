import _ from 'lodash'

import { Database } from '@/database.js'

const db = new Database()

const save = _.debounce(function (id, content) {
  db.updateArticle(id, content)
}, 1000, { maxWait: 3000 })

const autosave = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'articles/updateArticle') {
      save(mutation.payload.id, mutation.payload)
    }
  })
}

export default autosave
