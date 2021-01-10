const getters = {
  all: (state, _getters, _rootState, _rootGetters) => {
    return Object.values(state.list).sort((a, b) => {
      return b.updatedAt - a.updatedAt
    })
  },

  find: (state, _getters, _rootState, _rootGetters) => (id) => {
    return state.list[id]
  },

  latest: (_state, getters, _rootState, _rootGetters) => {
    return getters.all[0]
  }
}

export default getters
