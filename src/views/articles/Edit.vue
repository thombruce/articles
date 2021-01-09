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
    ...mapActions('editor', [
      'initializeEditor',
      'setEditorContent',
      'teardownEditor'
    ]),
    onDestroy () {
      this.destroy(this.article.id)
      this.$router.push({ name: 'Articles' })
    }
  },

  created () {
    this.initializeEditor()
  },

  async mounted () {
    this.article = await this.show(this.$route.params.id)
    this.setEditorContent(this.article.content)
  },

  async beforeRouteUpdate (to, from, next) {
    this.article = await this.show(to.params.id)
    this.setEditorContent(this.article.content)
    next()
  },

  beforeDestroy () {
    this.teardownEditor()
  }
}
</script>
