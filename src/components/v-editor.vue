<template lang="pug">
VCard
  VEditorMenuBar

  VContainer
    VEditorMenuBubble

    VEditorFloatingMenu

    VEditorContent.rte-content
</template>

<script>
import VEditorContent from './editor/v-editor-content.vue'
import VEditorMenuBar from './editor/v-editor-menu-bar.vue'
import VEditorMenuBubble from './editor/v-editor-menu-bubble.vue'
import VEditorFloatingMenu from './editor/v-editor-floating-menu.vue'

import { mapGetters } from 'vuex'

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
    ...mapGetters('editor', {
      content: 'content'
    })
  },

  watch: {
    content () {
      this.$emit('input', this.content)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/v-editor';
</style>
