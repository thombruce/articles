const getters = {
  all: (state, getters, _rootState, _rootGetters) => {
    const notes = state.query !== '' ? getters.queried : getters.indexed

    return notes.sort((a, b) => {
      return b.updatedAt - a.updatedAt
    })
  },

  count: (state) => {
    return state.query !== '' ? state.queryTotal : state.total
  },

  indexed: (state) => {
    return Object.values(state.list).filter(
      note => state.indexed.includes(note.id)
    )
  },

  queried: (state) => {
    return Object.values(state.list).filter(
      note => state.queried.includes(note.id)
    )
  },

  find: (state) => (id) => {
    return state.list[id]
  },

  latest: (_s, getters) => {
    return getters.all[0]
  },

  current: (state, getters) => {
    return getters.find(state.currentId)
  },

  offset: (state) => {
    return state.indexed.length
  },

  queriedOffset: (state) => {
    return state.queried.length
  }
}

export default getters
