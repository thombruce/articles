<template lang="pug">
VEditor(v-model="article.content" @input="onSubmit()")
</template>

<script>
import VEditor from '@/components/v-editor'

export default {
  props: [
    'article',
    'submit'
  ],

  components: {
    VEditor
  },

  methods: {
    onSubmit () {
      this.submit(this.article)
    }
  }
}
</script>
