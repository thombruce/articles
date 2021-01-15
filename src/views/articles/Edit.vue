<template lang="pug">
VContainer.pa-0(fluid fill-height)
  VEditor
</template>

<script>
import VEditor from '@/components/VEditor'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    VEditor
  },

  data () {
    return {
      article: null
    }
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    })
  },

  methods: {
    ...mapActions('articles', [
      'show',
      'save'
    ]),
    ...mapActions('editor', [
      'initializeEditor',
      'resetEditor',
      'teardownEditor'
    ])
  },

  async mounted () {
    this.article = await this.show(this.$route.params.id)
    this.initializeEditor(this.article.doc)
    this.editor.focus()
  },

  watch: {
    $route (to, from) {
      this.editor.focus()
    }
  },

  async beforeRouteUpdate (to, from, next) {
    await this.save()
    this.article = await this.show(to.params.id)
    this.resetEditor(this.article.doc)
    next()
  },

  beforeDestroy () {
    this.teardownEditor()
  }
}
</script>
