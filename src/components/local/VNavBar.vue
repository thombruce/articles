<template lang="pug">
VAppBar(app flat dense clipped-left)
  VAppBarNavIcon(@click.stop="toggleDrawer()")

  VBtn(icon @click="newNote()")
    VIcon mdi-plus-box

  VSpacer

  template(v-if="editor")
    VEditorMenuBar(v-if="editor")

    VSpacer.d-none.d-sm-block

  VConfirmBtn(v-if="currentNote" :action="destroyNote")
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
        | If you delete this note, you won't be able to retrieve it.
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import VEditorMenuBar from '@/components/editor/VEditorMenuBar'
import VConfirmBtn from '@/components/local/VConfirmBtn'

export default {
  components: {
    VEditorMenuBar,
    VConfirmBtn
  },

  computed: {
    ...mapGetters('notes', {
      latest: 'latest'
    }),
    ...mapState('editor', {
      editor: 'editor'
    }),
    ...mapState('notes', {
      currentNote: 'currentId'
    })
  },

  methods: {
    ...mapMutations('ui', [
      'toggleDrawer'
    ]),
    ...mapActions('notes', [
      'new',
      'destroy'
    ]),
    async newNote () {
      const note = await this.new()
      this.$router.push({ name: 'EditNote', params: { id: note.id } })
    },
    async destroyNote () {
      await this.destroy(this.$route.params.id)
      const note = this.latest || await this.new()
      this.$router.push({ name: 'EditNote', params: { id: note.id } })
    }
  }
}
</script>

<style lang="scss">
.editor-menu-container {
  height: 100%;

  > .v-btn {
    margin-top: -32px;
  }
}
</style>
