import { v4 as uuidv4 } from 'uuid'

import { Database } from '@/database.js'

const db = new Database()

const actions = {
  async index ({ commit, getters }) {
    const articles = await db.getArticles()
    commit('init', articles)

    return getters.all
  },

  async show ({ commit, getters }, id) {
    return await db.getArticle(id).then((article) => {
      commit('insert', article)
      return getters.find(id)
    })
  },

  async new ({ commit }) {
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
      return article
    })
  },

  async update ({ dispatch, commit, state, getters }, article) {
    const timestamp = new Date().getTime()
    article = {
      ...getters.find(article.id),
      ...article,
      ...{ updatedAt: timestamp }
    }

    commit('update', article)
    return getters.find(article.id)
  },

  async destroy ({ commit }, id) {
    return await db.deleteArticle(id).then(() => {
      commit('delete', id)
      return true
    })
  }
}

export default actions
