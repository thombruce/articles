import { v4 as uuidv4 } from 'uuid'

import { Database } from '@/database.js'

const db = new Database()

const actions = {
  async init ({ dispatch, commit }, params) {
    const articlesCount = await db.articles.count()

    commit('setCount', articlesCount)
    return dispatch('index', params)
  },

  async index ({ dispatch, commit, state, getters }, params) {
    if (state.query !== '') return dispatch('search', params)

    const offset = (params && params.offset) || 0
    const limit = (params && params.limit) || 10

    const articles = await db.articles
      .orderBy('updatedAt')
      .reverse()
      .offset(offset)
      .limit(limit)
      .toArray()

    commit('push', articles)

    const ids = articles.map(article => article.id)
    commit('pushIndexed', ids)

    return getters.all
  },

  async search ({ state, commit, getters }, params) {
    const offset = (params && params.offset) || 0
    const limit = (params && params.limit) || 10
    const words = state.query.split(' ').filter(item => item)

    const articles = await db.articles
      .where('textWords')
      .startsWithAnyOfIgnoreCase(words)
      .distinct()
      .offset(offset)
      .limit(limit)
      .toArray()

    commit('push', articles)
    const ids = articles.map(article => article.id)
    commit('pushQueried', ids)

    return getters.queried
  },

  async show ({ commit, getters }, id) {
    const article = await db.articles.get(id)

    commit('insert', article)
    return getters.current
  },

  async new ({ commit, state, getters }) {
    const id = uuidv4()
    const timestamp = new Date().getTime()
    const article = {
      id,
      doc: '',
      text: '',
      createdAt: timestamp,
      updatedAt: timestamp
    }

    await db.articles.add(article)

    commit('insert', article)
    commit('pushIndexed', [article.id])
    commit('setCount', state.total + 1)
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
  },

  async updateQuery ({ dispatch, commit }, query) {
    const words = query.split(' ').filter(item => item)

    const queriedCount = await db.articles
      .where('textWords')
      .startsWithAnyOfIgnoreCase(words)
      .distinct()
      .count()

    commit('setQueryCount', queriedCount)
    commit('setQuery', query)
    dispatch('search')
  }
}

export default actions
