<template lang="pug">
div
  VContainer
    h2 {{ article.title }}

    div {{ article.content }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('articles', {
      find: 'find'
    }),
    article () {
      return this.find(this.$route.params.id)
    }
  }
}
</script>
