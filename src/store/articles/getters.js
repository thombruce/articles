const getters = {
  all: (state, getters, _rootState, _rootGetters) => {
    const articles = state.query !== '' ? getters.queried : getters.indexed

    return articles.sort((a, b) => {
      return b.updatedAt - a.updatedAt
    })
  },

  count: (state) => {
    return state.query !== '' ? state.queryTotal : state.total
  },

  indexed: (state) => {
    return Object.values(state.list).filter(
      article => state.indexed.includes(article.id)
    )
  },

  queried: (state) => {
    return Object.values(state.list).filter(
      article => state.queried.includes(article.id)
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
