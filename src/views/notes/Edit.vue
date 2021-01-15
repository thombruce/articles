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
      note: null
    }
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    })
  },

  methods: {
    ...mapActions('notes', [
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
    this.note = await this.show(this.$route.params.id)
    this.initializeEditor(this.note.doc)
    this.editor.focus()
  },

  watch: {
    $route (to, from) {
      this.editor.focus()
    }
  },

  async beforeRouteUpdate (to, from, next) {
    await this.save()
    this.note = await this.show(to.params.id)
    this.resetEditor(this.note.doc)
    next()
  },

  beforeDestroy () {
    this.teardownEditor()
  }
}
</script>
