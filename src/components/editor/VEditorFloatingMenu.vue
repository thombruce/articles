<template lang="pug">
EditorFloatingMenu(:editor="editor" v-slot="{ commands, isActive, getMarkAttrs, menu }")
  .floating-menu(
    :class="{ 'is-active': menu.isActive }"
    :style="`top: ${menu.top}px`"
  )
    VBtn(icon small :input-value="isActive.heading({ level: 1 })" @click="commands.heading({ level: 1 })")
      VIcon mdi-format-header-1

    VBtn(icon small :input-value="isActive.heading({ level: 2 })" @click="commands.heading({ level: 2 })")
      VIcon mdi-format-header-2

    VBtn(icon small :input-value="isActive.heading({ level: 3 })" @click="commands.heading({ level: 3 })")
      VIcon mdi-format-header-3

    VDivider.mx-2(vertical)

    VBtn(icon :input-value="isActive.horizontal_rule()" @click="commands.horizontal_rule")
      VIcon mdi-minus

    VBtn(icon :input-value="isActive.blockquote()" @click="commands.blockquote")
      VIcon mdi-format-quote-close

    VDivider.mx-2(vertical)

    // rte-image-dialog(:command="commands.image")

    // VDivider.mx-2(vertical)

    VBtn(icon :input-value="isActive.code_block()" @click="commands.code_block")
      VIcon mdi-code-brackets
</template>

<script>
import { EditorFloatingMenu } from 'tiptap'

import { mapState } from 'vuex'

export default {
  components: {
    EditorFloatingMenu
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    })
  }
}
</script>

<style lang="scss">
.floating-menu {
  position: absolute;
  z-index: 1;
  margin-top: -0.25rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
  &.is-active {
    opacity: 1;
    visibility: visible;
  }
}
</style>
