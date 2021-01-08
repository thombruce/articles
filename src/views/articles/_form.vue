<template lang="pug">
VForm(ref="form" :model="article" @submit.prevent)
  VEditor(v-model="article.content" @input="onSubmit()")
</template>

<script>
import { mapActions } from 'vuex'

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
    },
    ...mapActions('editor', [
      'initialize',
      'teardown'
    ])
  },

  mounted () {
    this.initialize(this.article.content)
  },

  beforeDestroy () {
    this.teardown()
  }
}
</script>
