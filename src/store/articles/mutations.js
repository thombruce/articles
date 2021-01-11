import Vue from 'vue'

const mutations = {
  push (state, articles) {
    articles = articles.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {})

    state.list = { ...state.list, ...articles }
  },

  insert (state, payload) {
    Vue.set(state.list, payload.id, payload)
  },

  update (state, payload) {
    Vue.set(state.list, payload.id, payload)
  },

  delete (state, id) {
    Vue.delete(state.list, id)
  }
}

export default mutations
