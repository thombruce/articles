import { Editor } from 'tiptap'

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

const actions = {
  initializeEditor ({ dispatch, commit }) {
    const editor = new Editor({
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
      onUpdate: ({ state, getJSON }) => {
        dispatch('articles/update', { doc: getJSON(), text: state.doc.textContent }, { root: true })
      }
    })
    commit('init', editor)
  },

  setEditorContent ({ state }, doc) {
    state.editor.setContent(doc)
  },

  teardownEditor ({ commit }) {
    commit('deinit')
  }
}

export default actions
