<template lang="pug">
VForm(ref="form" :model="article" @submit.prevent="onSubmit()")
  VEditor(v-model="article.content")

  VBtn(color="primary" type="submit") Submit
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
      this.$router.push({ name: 'Articles' })
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
