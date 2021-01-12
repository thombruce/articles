<template lang="pug">
  VApp
    VArticlesDrawer

    VEditorAppBar(v-if="editor")

    VMain
      RouterView
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

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
    ...mapActions('articles', [
      'init',
      'new'
    ])
  },

  async created () {
    await this.init()

    if (!this.$route.params.id) {
      const article = this.latest || await this.new()
      this.$router.replace({ name: 'EditArticle', params: { id: article.id } })
    }
  }
}
</script>
