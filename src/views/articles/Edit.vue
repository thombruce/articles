<template lang="pug">
div
  VContainer
    h2 Edit Article

    ArticleForm(:article="article" :submit="update")

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
      'update'
    ])
  }
}
</script>
