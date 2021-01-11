<template lang="pug">
  VSheet.editor-sheet.pa-4(width="100%" height="100%" @click="setFocus()")
    VEditorMenuBubble

    VEditorFloatingMenu

    VEditorContent
</template>

<script>
import VEditorContent from './editor/v-editor-content.vue'
import VEditorMenuBar from './editor/v-editor-menu-bar.vue'
import VEditorMenuBubble from './editor/v-editor-menu-bubble.vue'
import VEditorFloatingMenu from './editor/v-editor-floating-menu.vue'

import { mapState } from 'vuex'

export default {
  components: {
    VEditorContent,
    VEditorMenuBar,
    VEditorMenuBubble,
    VEditorFloatingMenu
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    })
  },

  methods: {
    setFocus () {
      this.editor.focus()
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/v-editor';

.editor-sheet {
  cursor: text;
}
</style>
