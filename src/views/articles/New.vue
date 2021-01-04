<template lang="pug">
div
  VContainer
    h2 New Article

    ArticleForm(:article="article" :submit="create")

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
      article: {
        title: '',
        content: null
      }
    }
  },
  methods: {
    ...mapActions('articles', [
      'create'
    ])
  }
}
</script>
