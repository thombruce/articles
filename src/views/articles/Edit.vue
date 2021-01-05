<template lang="pug">
div
  VContainer
    ArticleForm(:key="article.id" :article="article" :submit="update")

    .my-3
      VBtn(color="error" small @click="onDestroy()") Delete

    RouterLink(:to="{ name: 'Articles' }") Back
</template>

<script>
import ArticleForm from './_form.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ArticleForm
  },
  computed: {
    ...mapGetters('articles', {
      find: 'find'
    }),
    article () {
      return this.find(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions('articles', [
      'update',
      'destroy'
    ]),
    onDestroy () {
      this.destroy(this.article)
      this.$router.push({ name: 'Articles' })
    }
  }
}
</script>
