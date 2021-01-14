<template lang="pug">
  VApp
    VArticlesDrawer

    VEditorAppBar(v-if="editor")
    VAppBar(v-else app flat dense clipped-left)
      VAppBarNavIcon(@click.stop="toggleDrawer()")

    VMain
      RouterView(v-if="$route.params.id")
      VContainer.pa-0(v-else fluid fill-height)
        VSheet(width="100%" height="100%" @click="newArticle()")
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import VEditorAppBar from '@/components/local/VEditorAppBar.vue'
import VArticlesDrawer from '@/components/local/VArticlesDrawer'

export default {
  components: {
    VEditorAppBar,
    VArticlesDrawer
  },

  computed: {
    ...mapGetters('articles', {
      latest: 'latest'
    }),
    ...mapState('editor', {
      editor: 'editor'
    })
  },

  methods: {
    ...mapMutations('ui', [
      'toggleDrawer'
    ]),
    ...mapActions('articles', [
      'init',
      'new'
    ]),
    async newArticle () {
      const article = await this.new()
      this.$router.push({ name: 'EditArticle', params: { id: article.id } })
    }
  },

  async created () {
    await this.init()
  }
}
</script>
