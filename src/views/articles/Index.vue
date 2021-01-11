<template lang="pug">
  VApp
    VNavigationDrawer(
      app
      clipped
      permanent
    )
      VList
        VListItemGroup
          VListItem(
            v-for="article in articles"
            :key="article.id"
            :to="{ name: 'EditArticle', params: { id: article.id } }"
            two-line
            link
          )
            VListItemContent
              strong {{ article.content | textPreview }}
              div
                time(:datetime="article.updatedAt") {{ article.updatedAt | formatDate }}

      template(v-slot:append)
        .row.pa-2
          .col-6.d-flex.justify-center
            VDarkmodeToggle
          .col-6.d-flex.justify-center
            VFullscreenToggle

    VEditorAppBar(v-if="editor")

    VMain
      RouterView
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import VDarkmodeToggle from '@/components/controls/v-darkmode-toggle'
import VFullscreenToggle from '@/components/controls/v-fullscreen-toggle'
import VEditorAppBar from '@/components/local/v-editor-app-bar.vue'

export default {
  components: {
    VDarkmodeToggle,
    VFullscreenToggle,
    VEditorAppBar
  },

  computed: {
    ...mapGetters('articles', {
      articles: 'all',
      latest: 'latest'
    }),
    ...mapState('editor', {
      editor: 'editor'
    })
  },

  methods: {
    ...mapActions('articles', [
      'index',
      'new'
    ])
  },

  async created () {
    await this.index()

    if (!this.$route.params.id) {
      const article = this.latest || await this.new()
      this.$router.replace({ name: 'EditArticle', params: { id: article.id } })
    }
  }
}
</script>
