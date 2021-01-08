import Vue from 'vue'
import Vuex from 'vuex'

import articles from './articles'
import editor from './editor'

import autosave from './plugins/autosave'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    articles,
    editor
  },
  plugins: [autosave]
})
