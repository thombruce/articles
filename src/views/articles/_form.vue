<template lang="pug">
VForm(ref="form" :model="article" @submit.prevent="onSubmit()")
  VTextField(label="Title" v-model="article.title")

  VRichTextEditor(v-model="article.content" :editable="true")

  VBtn(color="primary" type="submit") Submit
</template>

<script>
import VRichTextEditor from '@/components/v-rich-text-editor'

export default {
  props: [
    'article',
    'submit'
  ],
  components: {
    VRichTextEditor
  },
  methods: {
    onSubmit () {
      this.submit({ id: this.article.id, data: this.article })
      this.$router.push({ name: 'Articles' })
    }
  }
}
</script>
