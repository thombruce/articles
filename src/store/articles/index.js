import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

import { Database } from '@/database.js'

const db = new Database()

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
  async loadDb ({ commit }) {
    const articles = await db.getArticles()
    commit('init', articles)
  },
  async create ({ commit }, params) {
    await db.addArticle(params.data)
    commit('post', params)
  },
  async update ({ commit }, params) {
    await db.updateArticle(params.id, params.data)
    commit('patch', params)
  },
  async destroy ({ commit }, params) {
    await db.deleteArticle(params.id)
    commit('delete', params)
  }
}

const mutations = {
  init (state, payload) {
    // Convert the Array received from Dexie Db to an Object with IDs as keys.
    const data = payload.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {})

    state.list = data
  },
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
