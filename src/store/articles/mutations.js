import Vue from 'vue'

const mutations = {
  setCount (state, count) {
    state.count = count
  },

  push (state, articles) {
    articles = articles.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {})

    state.list = { ...state.list, ...articles }
  },

  insert (state, payload) {
    Vue.set(state.list, payload.id, payload)
    state.currentId = payload.id
    state.count++
  },

  update (state, payload) {
    Vue.set(state.list, payload.id, payload)
  },

  delete (state, id) {
    Vue.delete(state.list, id)
    state.currentId = null
    state.count--
  }
}

export default mutations
