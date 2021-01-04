<template lang="pug">
div
  VContainer
    VRichTextEditor(v-model="article.content" :editable="false")
</template>

<script>
import { mapGetters } from 'vuex'

import VRichTextEditor from '@/components/v-rich-text-editor'

export default {
  components: {
    VRichTextEditor
  },
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
