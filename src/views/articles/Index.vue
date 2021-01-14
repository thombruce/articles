<template lang="pug">
  VApp
    VArticlesDrawer

    VNavBar

    VMain
      RouterView(v-if="$route.params.id")
      VContainer.pa-0(v-else fluid fill-height)
        VSheet(width="100%" height="100%" @click="newArticle()")
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import VNavBar from '@/components/local/VNavBar.vue'
import VArticlesDrawer from '@/components/local/VArticlesDrawer'

export default {
  components: {
    VNavBar,
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
