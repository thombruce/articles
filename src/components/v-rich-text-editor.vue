<template lang="pug">
div.mb-4
  VLabel(v-if="label") {{ label }}

  VCard
    EditorMenuBar(v-if="editable" :editor="editor" v-slot="{ commands, isActive }")
      VToolbar(color="primary" dark dense flat)
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

    VContainer
      EditorMenuBubble(v-if="editable" :editor="editor" keep-in-bounds v-slot="{ commands, isActive, getMarkAttrs, menu }")
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

      EditorFloatingMenu(v-if="editable" :editor="editor" v-slot="{ commands, isActive, getMarkAttrs, menu }")
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

      EditorContent.rte-content(:editor="editor" v-model="inputVal")
</template>

<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble, EditorFloatingMenu } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HorizontalRule,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  // TodoItem, // [1]
  // TodoList, // [1]
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TrailingNode
} from 'tiptap-extensions'

export default {
  props: {
    label: String,
    value: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
    EditorFloatingMenu
  },
  data () {
    return {
      editor: null,
      linkUrl: null,
      linkMenuIsActive: false
    }
  },
  computed: {
    inputVal: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
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
  },
  mounted () {
    this.editor = new Editor({
      editable: this.editable,
      extensions: [
        new Blockquote(),
        new CodeBlock(),
        new HorizontalRule(),
        new Heading({ levels: [1, 2, 3] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        // new TodoItem(), // [1]
        // new TodoList(), // [1]
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
        new Image(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new TrailingNode({
          node: 'paragraph',
          notAfter: ['heading', 'paragraph']
        })
      ],
      onUpdate: ({ getJSON, getHTML }) => {
        // const json = getJSON()
        const html = getHTML()
        // const newValue = { json, html }
        this.$emit('input', html)
      },
      content: this.inputVal
    })
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
// TODO: Add table support
// TODO: Add image upload support
// TODO: Add formatting to display for better previewing
//       - blockquote
// NOTE: Todo list support pending on resolution of [1]
// [1] Todo list fails for some reason.
//     Possibly... runtime-only build issue? But... we definitely have Vue setup for both... locally, anyway.
//     Initial error is: "TypeError: h.hasAttribute is not a function"
//
//     Possibly related issues:
//     - https://github.com/scrumpy/tiptap/issues/69
//     - https://github.com/scrumpy/tiptap/issues/428
//
//     Possible solution:
//     - https://github.com/scrumpy/tiptap/pull/576
</script>

<style lang="scss">
@import 'node_modules/vuetify/src/styles/settings/_variables.scss';
@import 'node_modules/vuetify/src/styles/elements/_blockquote.sass';
.ProseMirror[contenteditable]:focus {
  outline: 0px solid transparent;
}
.rte-content {
  pre > code {
    padding:10px;
    &:before, &:after {
      content: "";
    }
  }
  img {
    max-width: 100%;
  }
  table {
    width: 100%;
    text-align: center;
    th {
      // color: #eee;
      // background-color: #333;
    }
    td {
      // background-color: #eee;
    }
  }
  blockquote {
    @extend .blockquote;
  }
  // ul[data-type="todo_list"] {
  //   padding-left: 0;
  //   li[data-type="todo_item"] {
  //     display: flex;
  //     flex-direction: row;
  //     .todo-checkbox {
  //       border: 2px solid black;
  //       height: 0.9em;
  //       width: 0.9em;
  //       box-sizing: border-box;
  //       margin-right: 10px;
  //       margin-top: 0.3rem;
  //       user-select: none;
  //       -webkit-user-select: none;
  //       cursor: pointer;
  //       border-radius: 0.2em;
  //       background-color: transparent;
  //       transition: 0.4s background;
  //     }
  //     .todo-content {
  //       flex: 1;
  //       > p:last-of-type {
  //         margin-bottom: 0;
  //       }
  //       > ul[data-type="todo_list"] {
  //         margin: .5rem 0;
  //       }
  //     }
  //     &[data-done="true"] {
  //       > .todo-content {
  //         > p {
  //           text-decoration: line-through;
  //         }
  //       }
  //       > .todo-checkbox {
  //         background-color: black;
  //       }
  //     }
  //     &[data-done="false"] {
  //       text-decoration: none;
  //     }
  //   }
  // } // [1]
}
.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: black;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
  &.is-active {
    opacity: 1;
    visibility: visible;
  }
  // &__button {
  //   display: inline-flex;
  //   background: transparent;
  //   border: 0;
  //   color: white;
  //   padding: 0.2rem 0.5rem;
  //   margin-right: 0.2rem;
  //   border-radius: 3px;
  //   cursor: pointer;
  //   &:last-child {
  //     margin-right: 0;
  //   }
  //   &:hover {
  //     background-color: rgba(white, 0.1);
  //   }
  //   &.is-active {
  //     background-color: rgba(white, 0.2);
  //   }
  // }
  // &__form {
  //   display: flex;
  //   align-items: center;
  // }
  // &__input {
  //   font: inherit;
  //   border: none;
  //   background: transparent;
  //   color: white;
  // }
}
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
