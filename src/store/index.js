import Vue from 'vue'
import Vuex from 'vuex'

import ui from './ui'
import notes from './notes'
import editor from './editor'

import autosave from './plugins/autosave'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    notes,
    editor
  },
  plugins: [autosave]
})
