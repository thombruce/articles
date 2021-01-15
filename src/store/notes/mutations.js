import Vue from 'vue'

const mutations = {
  setCount (state, count) {
    state.total = count
  },

  setQueryCount (state, queryCount) {
    state.queryTotal = queryCount
  },

  push (state, notes) {
    notes = notes.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {})

    state.list = { ...state.list, ...notes }
  },

  pushIndexed (state, ids) {
    state.indexed = [...state.indexed, ...ids]
  },

  pushQueried (state, ids) {
    state.queried = [...state.queried, ...ids]
  },

  insert (state, payload) {
    Vue.set(state.list, payload.id, payload)
    state.currentId = payload.id
  },

  update (state, payload) {
    Vue.set(state.list, payload.id, payload)
  },

  delete (state, id) {
    Vue.delete(state.list, id)
    state.currentId = null
    state.count--
  },

  setQuery (state, query) {
    state.query = query
    state.queried = []
  }
}

export default mutations
