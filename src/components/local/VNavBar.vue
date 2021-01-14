<template lang="pug">
VAppBar(app flat dense clipped-left)
  VAppBarNavIcon(@click.stop="toggleDrawer()")

  VBtn(icon @click="newArticle()")
    VIcon mdi-plus-box

  VSpacer

  template(v-if="editor")
    VEditorMenuBar(v-if="editor")

    VSpacer

  VConfirmBtn(v-if="currentArticle" :action="destroyArticle")
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import VEditorMenuBar from '@/components/editor/VEditorMenuBar'
import VConfirmBtn from '@/components/local/VConfirmBtn'

export default {
  components: {
    VEditorMenuBar,
    VConfirmBtn
  },

  computed: {
    ...mapGetters('articles', {
      latest: 'latest'
    }),
    ...mapState('editor', {
      editor: 'editor'
    }),
    ...mapState('articles', {
      currentArticle: 'currentId'
    })
  },

  methods: {
    ...mapMutations('ui', [
      'toggleDrawer'
    ]),
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

<style lang="scss">
.editor-menu-container {
  height: 100%;

  > .v-btn {
    margin-top: -32px;
  }
}
</style>
