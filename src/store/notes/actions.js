import { v4 as uuidv4 } from 'uuid'

import { Database } from '@/database.js'

const db = new Database()

const actions = {
  async init ({ dispatch, commit }, params) {
    const notesCount = await db.notes.count()

    commit('setCount', notesCount)
    return dispatch('index', params)
  },

  async index ({ dispatch, commit, state, getters }, params) {
    if (state.query !== '') return dispatch('search', params)

    const offset = (params && params.offset) || 0
    const limit = (params && params.limit) || 10

    const notes = await db.notes
      .orderBy('updatedAt')
      .reverse()
      .offset(offset)
      .limit(limit)
      .toArray()

    commit('push', notes)

    const ids = notes.map(note => note.id)
    commit('pushIndexed', ids)

    return getters.all
  },

  async search ({ state, commit, getters }, params) {
    const offset = (params && params.offset) || 0
    const limit = (params && params.limit) || 10
    const words = state.query.split(' ').filter(item => item)

    const notes = words.length > 0 ? await db.searchNotes(words, offset, limit) : []

    commit('push', notes)
    const ids = notes.map(note => note.id)
    commit('pushQueried', ids)

    return getters.queried
  },

  async show ({ commit, getters }, id) {
    const note = await db.notes.get(id)

    commit('insert', note)
    return getters.current
  },

  async new ({ commit, state, getters }) {
    const id = uuidv4()
    const timestamp = new Date().getTime()
    const note = {
      id,
      doc: '',
      text: '',
      createdAt: timestamp,
      updatedAt: timestamp
    }

    await db.notes.add(note)

    commit('insert', note)
    commit('pushIndexed', [note.id])
    commit('setCount', state.total + 1)
    return getters.current
  },

  async update ({ dispatch, commit, state, getters }, note) {
    const timestamp = new Date().getTime()
    note = {
      ...getters.current,
      ...note,
      ...{ updatedAt: timestamp }
    }

    commit('update', note)
    return getters.current
  },

  async save ({ state, getters }) {
    if (getters.current) await db.notes.update(state.currentId, getters.current)
  },

  async destroy ({ commit }, id) {
    await db.notes.delete(id)

    commit('delete', id)
    return true
  },

  async updateQuery ({ dispatch, commit }, query) {
    const words = query.split(' ').filter(item => item)

    const queriedCount = await db.notes
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
