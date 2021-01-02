import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

const state = () => ({
  list: {}
})

const getters = {
  all: (state) => {
    return Object.values(state.list)
  },
  find: (state) => (id) => {
    return state.list[id]
  }
}

const actions = {
  create ({ commit }, params) {
    commit('post', params)
  },
  update ({ commit }, params) {
    commit('patch', params)
  },
  destroy ({ commit }, params) {
    commit('delete', params)
  }
}

const mutations = {
  post (state, payload) {
    const data = { ...{ id: uuidv4() }, ...payload.data }
    Vue.set(state.list, data.id, data)
  },
  patch (state, payload) {
    const data = { ...state.list[payload.id], ...payload.data }
    Vue.set(state.list, payload.id, data)
  },
  delete (state, payload) {
    Vue.delete(state.list, payload.id)
  }
}

const articles = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default articles
