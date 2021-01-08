const getters = {
  content: (state, _getters, _rootState, _rootGetters) => {
    if (state.editor) {
      return state.editor.getHTML()
    }
  }
}

export default getters
