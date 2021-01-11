<template lang="pug">
VContainer.pa-0(fluid fill-height)
  ArticleForm(v-if="article" :key="article.id" :article="article" :submit="update")
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
      'update'
    ]),
    ...mapActions('editor', [
      'initializeEditor',
      'setEditorContent',
      'teardownEditor'
    ])
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
