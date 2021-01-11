import { v4 as uuidv4 } from 'uuid'

import { Database } from '@/database.js'

const db = new Database()

const actions = {
  async index ({ commit, getters }, params) {
    const offset = params && params.offset
    const limit = params && params.limit

    const articles = await db.getArticles(offset, limit)
    commit('push', articles)

    return getters.all
  },

  async show ({ commit, getters }, id) {
    return await db.getArticle(id).then((article) => {
      commit('insert', article)
      return getters.current
    })
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

    return await db.addArticle(article).then(() => {
      commit('insert', article)
      return getters.current
    })
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

  async destroy ({ commit }, id) {
    return await db.deleteArticle(id).then(() => {
      commit('delete', id)
      return true
    })
  }
}

export default actions
