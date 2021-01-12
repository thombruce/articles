<template lang="pug">
  VNavigationDrawer(
    v-model="drawer"
    app
    clipped
    :mobile-breakpoint="$vuetify.breakpoint.thresholds.sm"
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
          @click="toggleOnMobile()"
        )
          VListItemContent
            strong(v-if="article.text !== ''") {{ article.text | truncate(50) }}
            strong(v-else) Untitled Note
            div
              time(:datetime="article.updatedAt") {{ article.updatedAt | formatDate }}

    template(v-slot:append)
      .row.pa-2
        .col.d-flex.justify-center
          VDarkmodeToggle
        .col.d-flex.justify-center(v-if="!isElectron")
          VFullscreenToggle
</template>

<script>
import isElectron from 'is-electron'

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import { createHelpers } from 'vuex-map-fields'

import VDarkmodeToggle from '@/components/controls/VDarkmodeToggle'
import VFullscreenToggle from '@/components/controls/VFullscreenToggle'

const { mapFields } = createHelpers({
  getterType: 'ui/getField',
  mutationType: 'ui/updateField'
})

export default {
  components: {
    VDarkmodeToggle,
    VFullscreenToggle
  },

  data () {
    return {
      busy: false
    }
  },

  computed: {
    ...mapState('articles', {
      total: 'count'
    }),
    ...mapGetters('articles', {
      articles: 'all'
    }),
    ...mapFields([
      'drawer'
    ]),
    count () {
      return this.articles.length
    },
    isElectron () {
      return isElectron()
    }
  },

  created () {
    this.toggleOnMobile()
  },

  methods: {
    ...mapMutations('ui', [
      'toggleDrawer'
    ]),
    ...mapActions('articles', [
      'index'
    ]),
    async loadMore () {
      if (this.count < this.total) {
        this.busy = true
        await this.index({ offset: this.count })
        this.busy = false
      }
    },
    toggleOnMobile () {
      if (this.$vuetify.breakpoint.smAndDown) this.toggleDrawer()
    }
  }
}
</script>
