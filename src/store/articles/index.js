import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = () => ({
  list: {},
  currentId: null,
  count: 0
})

const articles = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default articles
