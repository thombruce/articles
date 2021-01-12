<template lang="pug">
  VApp
    VNavigationDrawer(
      v-model="drawer"
      app
      clipped
      :mobile-breakpoint="$vuetify.breakpoint.thresholds.sm"
    )
      VList
        VListItemGroup(
          v-model="group"
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

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

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
      busy: false,
      group: null
    }
  },

  computed: {
    ...mapState('ui', [
      'drawer'
    ]),
    ...mapState('articles', {
      total: 'count'
    }),
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
    ...mapMutations('ui', [
      'toggleDrawer'
    ]),
    ...mapActions('articles', [
      'init',
      'index',
      'new'
    ]),
    async loadMore () {
      if (this.count < this.total) {
        this.busy = true
        await this.index({ offset: this.count })
        this.busy = false
      }
    }
  },

  watch: {
    group () {
      if (this.$vuetify.breakpoint.smAndDown) this.toggleDrawer()
    }
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
