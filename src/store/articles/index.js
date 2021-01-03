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
    const timestamp = new Date().getTime()
    const data = {
      ...params.data,
      ...{ id: uuidv4(), createdAt: timestamp, updatedAt: timestamp }
    }

    await db.addArticle(data).then(() => {
      commit('insert', data)
    })
  },
  async update ({ state, commit }, params) {
    const timestamp = new Date().getTime()
    const data = {
      ...state.list[params.id],
      ...params.data,
      ...{ updatedAt: timestamp }
    }

    await db.updateArticle(params.id, data).then(() => {
      commit('insert', data)
    })
  },
  async destroy ({ commit }, params) {
    await db.deleteArticle(params.id).then(() => {
      commit('delete', params)
    })
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
  insert (state, payload) {
    Vue.set(state.list, payload.id, payload)
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
