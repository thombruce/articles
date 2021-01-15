import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = () => ({
  list: {},
  indexed: [],
  total: 0,
  query: '',
  queried: [],
  queryTotal: 0,
  currentId: null
})

const notes = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default notes
