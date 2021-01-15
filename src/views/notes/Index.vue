<template lang="pug">
  VApp
    VNavDrawer

    VNavBar

    VMain
      RouterView(v-if="$route.params.id")
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import VNavBar from '@/components/local/VNavBar.vue'
import VNavDrawer from '@/components/local/VNavDrawer'

export default {
  components: {
    VNavBar,
    VNavDrawer
  },

  computed: {
    ...mapGetters('notes', {
      latest: 'latest'
    }),
    ...mapState('editor', {
      editor: 'editor'
    })
  },

  methods: {
    ...mapActions('notes', [
      'init',
      'new'
    ]),
    async newNote () {
      const note = await this.new()
      this.$router.push({ name: 'EditNote', params: { id: note.id } })
    }
  },

  async created () {
    await this.init()

    if (!this.$route.params.id) {
      const note = this.latest || await this.new()
      this.$router.replace({ name: 'EditNote', params: { id: note.id } })
    }
  }
}
</script>
