<template lang="pug">
EditorMenuBubble(:editor="editor" keep-in-bounds v-slot="{ commands, isActive, getMarkAttrs, menu }")
  .menububble(
    :class="{ 'is-active': menu.isActive }"
    :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
  )
    VBtn(icon dark :input-value="isActive.bold()" @click="commands.bold")
      VIcon mdi-format-bold

    VBtn(icon dark :input-value="isActive.italic()" @click="commands.italic")
      VIcon mdi-format-italic

    VBtn(icon dark :input-value="isActive.strike()" @click="commands.strike")
      VIcon mdi-format-strikethrough

    VBtn(icon dark :input-value="isActive.code()" @click="commands.code")
      VIcon mdi-code-tags

    VForm(v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)")
      VTextField.ma-0.pa-0(
        label="URL"
        dark
        dense
        hide-details
        single-line
        clearable
        v-model="linkUrl"
        @keydown.esc="hideLinkMenu"
        @click:clear="setLinkUrl(commands.link, null)"
      )

    template(v-else)
      VBtn(icon dark :input-value="isActive.link()" @click="showLinkMenu(getMarkAttrs('link'))")
        VIcon mdi-link
</template>

<script>
import { EditorMenuBubble } from 'tiptap'

import { mapState } from 'vuex'

export default {
  components: {
    EditorMenuBubble
  },

  data () {
    return {
      linkUrl: null,
      linkMenuIsActive: false
    }
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    })
  },

  methods: {
    showLinkMenu (attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu () {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl (command, url) {
      command({ href: url })
      this.hideLinkMenu()
    }
  }
}
</script>
