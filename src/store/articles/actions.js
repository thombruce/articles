import { v4 as uuidv4 } from 'uuid'

import { Database } from '@/database.js'

const db = new Database()

const actions = {
  async init ({ dispatch, commit }, params) {
    const articlesCount = await db.articles.count()

    commit('setCount', articlesCount)
    return dispatch('index', params)
  },

  async index ({ commit, getters }, params) {
    const offset = (params && params.offset) || 0
    const limit = (params && params.limit) || 10

    const articles = await db.articles
      .orderBy('updatedAt')
      .reverse()
      .offset(offset)
      .limit(limit)
      .toArray()

    commit('push', articles)
    return getters.all
  },

  async show ({ commit, getters }, id) {
    const article = await db.articles.get(id)

    commit('insert', article)
    return getters.current
  },

  async new ({ commit, getters }) {
    const id = uuidv4()
    const timestamp = new Date().getTime()
    const article = {
      id,
      content: '',
      createdAt: timestamp,
      updatedAt: timestamp
    }

    await db.articles.add(article)

    commit('insert', article)
    return getters.current
  },

  async update ({ dispatch, commit, state, getters }, article) {
    const timestamp = new Date().getTime()
    article = {
      ...getters.current,
      ...article,
      ...{ updatedAt: timestamp }
    }

    commit('update', article)
    return getters.current
  },

  async save ({ state, getters }) {
    if (getters.current) await db.articles.update(state.currentId, getters.current)
  },

  async destroy ({ commit }, id) {
    await db.articles.delete(id)

    commit('delete', id)
    return true
  }
}

export default actions
