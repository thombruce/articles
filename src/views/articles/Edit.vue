<template lang="pug">
div
  VContainer
    ArticleForm(v-if="article" :key="article.id" :article="article" :submit="update")

    .my-3
      VBtn(color="error" small @click="onDestroy()") Delete

    RouterLink(:to="{ name: 'Articles' }") Back
</template>

<script>
import ArticleForm from './_form.vue'

import { mapActions } from 'vuex'

export default {
  components: {
    ArticleForm
  },

  data () {
    return {
      article: null
    }
  },

  methods: {
    ...mapActions('articles', [
      'show',
      'update',
      'destroy'
    ]),
    onDestroy () {
      this.destroy(this.article.id)
      this.$router.push({ name: 'Articles' })
    }
  },

  async mounted () {
    this.article = await this.show(this.$route.params.id)
  },

  async beforeRouteUpdate (to, from, next) {
    this.article = null
    this.article = await this.show(to.params.id)
    next()
  }
}
</script>
