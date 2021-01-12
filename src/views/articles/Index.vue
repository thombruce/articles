<template lang="pug">
  VApp
    VNavigationDrawer(
      app
      clipped
      permanent
    )
      VList
        VListItemGroup(
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="50"
        )
          VListItem(
            v-for="article in articles"
            :key="article.id"
            :to="{ name: 'EditArticle', params: { id: article.id } }"
            two-line
            link
          )
            VListItemContent
              strong {{ article.content | textPreviewFromJSON }}
              div
                time(:datetime="article.updatedAt") {{ article.updatedAt | formatDate }}

      template(v-slot:append)
        .row.pa-2
          .col.d-flex.justify-center
            VDarkmodeToggle
          .col.d-flex.justify-center(v-if="!isElectron")
            VFullscreenToggle

    VEditorAppBar(v-if="editor")

    VMain
      RouterView
</template>

<script>
import isElectron from 'is-electron'

import { mapState, mapGetters, mapActions } from 'vuex'

import VDarkmodeToggle from '@/components/controls/VDarkmodeToggle'
import VFullscreenToggle from '@/components/controls/VFullscreenToggle'
import VEditorAppBar from '@/components/local/VEditorAppBar.vue'

export default {
  components: {
    VDarkmodeToggle,
    VFullscreenToggle,
    VEditorAppBar
  },

  data () {
    return {
      busy: false
    }
  },

  computed: {
    ...mapGetters('articles', {
      articles: 'all',
      latest: 'latest'
    }),
    ...mapState('editor', {
      editor: 'editor'
    }),
    count () {
      return this.articles.length
    },
    isElectron () {
      return isElectron()
    }
  },

  methods: {
    ...mapActions('articles', [
      'index',
      'new'
    ]),
    async loadMore () {
      this.busy = true
      await this.index({ offset: this.count })
      this.busy = false
    }
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
