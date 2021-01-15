<template lang="pug">
  VNavigationDrawer(
    v-model="drawer"
    app
    clipped
    :mobile-breakpoint="$vuetify.breakpoint.thresholds.sm"
  )
    template(v-slot:prepend)
      VNavSearch

    VList
      VListItemGroup(
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="50"
      )
        VListItem(
          v-for="note in notes"
          :key="note.id"
          :to="{ name: 'EditNote', params: { id: note.id } }"
          two-line
          link
          @click="toggleOnMobile()"
        )
          VListItemContent
            strong(v-if="note.text !== ''") {{ note.text | truncate(50) }}
            strong(v-else) Untitled Note
            div
              time(:datetime="note.updatedAt") {{ note.updatedAt | formatDate }}

    template(v-slot:append)
      .row.pa-2
        .col.d-flex.justify-center
          VDarkmodeToggle
        .col.d-flex.justify-center(v-if="!isElectron")
          VFullscreenToggle
</template>

<script>
import isElectron from 'is-electron'

import { mapGetters, mapActions, mapMutations } from 'vuex'

import { createHelpers } from 'vuex-map-fields'

import VNavSearch from '@/components/local/VNavSearch'

import VDarkmodeToggle from '@/components/controls/VDarkmodeToggle'
import VFullscreenToggle from '@/components/controls/VFullscreenToggle'

const { mapFields } = createHelpers({
  getterType: 'ui/getField',
  mutationType: 'ui/updateField'
})

export default {
  components: {
    VNavSearch,
    VDarkmodeToggle,
    VFullscreenToggle
  },

  data () {
    return {
      busy: false
    }
  },

  computed: {
    ...mapGetters('notes', {
      total: 'count',
      notes: 'all'
    }),
    ...mapFields([
      'drawer'
    ]),
    count () {
      return this.notes.length
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
    ...mapActions('notes', [
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
