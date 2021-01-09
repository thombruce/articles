<template lang="pug">
  VApp
    VNavigationDrawer(app temporary v-model="drawer")
      VList(nav)
        VListItemGroup(v-model="group")
          VListItem(to="/" link)
            VListItemContent
              VListItemTitle Home

          VListItem(@click="newArticle()" link)
            VListItemContent
              VListItemTitle New Article

    VEditorAppBar(v-if="editor")

    VAppBar(
      v-else
      app
      color="primary"
      dark
      flat
      dense
    )
      VAppBarNavIcon(@click.stop="drawer = !drawer")

      VToolbarTitle
        | Articles

      VSpacer

      VDarkmodeToggle

      VFullscreenToggle

    VMain
      RouterView
</template>

<script>
import VDarkmodeToggle from './components/controls/v-darkmode-toggle'
import VFullscreenToggle from './components/controls/v-fullscreen-toggle'

import VEditorAppBar from './components/local/v-editor-app-bar.vue'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    VDarkmodeToggle,
    VFullscreenToggle,
    VEditorAppBar
  },

  data () {
    return {
      drawer: false,
      group: null
    }
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    })
  },

  methods: {
    ...mapActions('articles', [
      'new'
    ]),
    async newArticle () {
      const article = await this.new()
      this.$router.push({ name: 'EditArticle', params: { id: article.id } })
    }
  },

  watch: {
    group () {
      this.drawer = false
    }
  }
}
</script>
