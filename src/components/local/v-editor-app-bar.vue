<template lang="pug">
EditorMenuBar(:editor="editor" v-slot="{ commands, isActive }")
  VAppBar.d-flex.justify-center(app flat dense clipped-left)
    VBtn(icon @click="newArticle()")
      VIcon mdi-plus-box

    VDivider.mx-2(vertical)

    VMenu
      template(v-slot:activator="{ on }")
        VBtn(
          icon
          v-on="on"
          :input-value="isActive.heading()"
        )
          VIcon mdi-format-title

      VList
        VListItem(
          :input-value="isActive.heading({ level: 1 })"
          @click="commands.heading({ level: 1 })"
        )
          VListItemTitle Heading 1

        VListItem(
          :input-value="isActive.heading({ level: 2 })"
          @click="commands.heading({ level: 2 })"
        )
          VListItemTitle Heading 2

        VListItem(
          :input-value="isActive.heading({ level: 3 })"
          @click="commands.heading({ level: 3 })"
        )
          VListItemTitle Heading 3

    VDivider.mx-2(vertical)

    VBtn(icon :input-value="isActive.bold()" @click="commands.bold")
      VIcon mdi-format-bold

    VBtn(icon :input-value="isActive.italic()" @click="commands.italic")
      VIcon mdi-format-italic

    VBtn(icon :input-value="isActive.strike()" @click="commands.strike")
      VIcon mdi-format-strikethrough

    VDivider.mx-2(vertical)

    VBtn(icon :input-value="isActive.horizontal_rule()" @click="commands.horizontal_rule")
      VIcon mdi-minus

    VBtn(icon :input-value="isActive.blockquote()" @click="commands.blockquote")
      VIcon mdi-format-quote-close

    VBtn(icon :input-value="isActive.bullet_list()" @click="commands.bullet_list")
      VIcon mdi-format-list-bulleted

    VBtn(icon :input-value="isActive.ordered_list()" @click="commands.ordered_list")
      VIcon mdi-format-list-numbered

    //VBtn(icon :input-value="isActive.todo_list()" @click="commands.todo_list") // [1]
    //  VIcon mdi-format-list-checkbox // [1]

    // VDivider.mx-2(vertical)

    //VBtn(icon :input-value="isActive.table()" @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })")
    //  VIcon mdi-table

    // rte-image-dialog(:command="commands.image")

    //VBtn(icon :input-value="isActive.image()" @click="commands.image")
    //  VIcon mdi-image

    //VBtn(icon :input-value="isActive.link()" @click="commands.link")
    //  VIcon mdi-link

    VDivider.mx-2(vertical)

    VBtn(icon :input-value="isActive.code()" @click="commands.code")
      VIcon mdi-code-tags

    VBtn(icon :input-value="isActive.code_block()" @click="commands.code_block")
      VIcon mdi-code-brackets

    VDivider.mx-2(vertical)

    VBtn(icon @click="commands.undo")
      VIcon mdi-undo

    VBtn(icon @click="commands.redo")
      VIcon mdi-redo

    VDivider.mx-2(vertical)

    VConfirmBtn(:action="destroyArticle")
      template(#button="{ on, attrs }")
        VBtn.error--text(
          icon
          v-bind="attrs"
          v-on="on"
        )
          VIcon mdi-delete
      template(#dialog)
        VCardTitle.headline
          | Are you sure?
        VCardText
          | If you delete this article, you won't be able to retrieve it.
</template>

<script>
import { EditorMenuBar } from 'tiptap'

import { mapState, mapGetters, mapActions } from 'vuex'

import VConfirmBtn from './v-confirm-btn.vue'

export default {
  components: {
    EditorMenuBar,
    VConfirmBtn
  },

  computed: {
    ...mapState('editor', {
      editor: 'editor'
    }),
    ...mapGetters('articles', {
      latest: 'latest'
    })
  },

  methods: {
    ...mapActions('articles', [
      'new',
      'destroy'
    ]),
    async newArticle () {
      const article = await this.new()
      this.$router.push({ name: 'EditArticle', params: { id: article.id } })
    },
    async destroyArticle () {
      await this.destroy(this.$route.params.id)
      const article = this.latest || await this.new()
      this.$router.push({ name: 'EditArticle', params: { id: article.id } })
    }
  }
}
</script>
