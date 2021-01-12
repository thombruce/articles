<template lang="pug">
VContainer.pa-0(fluid fill-height)
  VEditor
</template>

<script>
import VEditor from '@/components/VEditor'

import { mapActions } from 'vuex'

export default {
  components: {
    VEditor
  },

  data () {
    return {
      article: null
    }
  },

  methods: {
    ...mapActions('articles', [
      'show',
      'save'
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
    await this.save()
    this.article = await this.show(to.params.id)
    this.setEditorContent(this.article.content)
    next()
  },

  beforeDestroy () {
    this.teardownEditor()
  }
}
</script>
