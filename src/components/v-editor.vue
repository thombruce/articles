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

import { mapState, mapGetters } from 'vuex'

export default {
  props: [
    'value'
  ],

  components: {
    VEditorContent,
    VEditorMenuBar,
    VEditorMenuBubble,
    VEditorFloatingMenu
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    }),
    ...mapGetters('editor', {
      content: 'content'
    })
  },

  watch: {
    content () {
      if (this.content !== this.value) {
        this.$emit('input', this.content)
      }
    }
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
