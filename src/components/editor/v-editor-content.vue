<template lang="pug">
EditorContent.rte-content(:editor="editor")
</template>

<script>
import { EditorContent } from 'tiptap'

import { mapState } from 'vuex'

export default {
  components: {
    EditorContent
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    })
  }
}
</script>
