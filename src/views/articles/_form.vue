<template lang="pug">
VForm(ref="form" :model="article" @submit.prevent="onSubmit()")
  VTextField(label="Title" v-model="article.title")

  VTextarea(label="Content" v-model="article.content")

  VBtn(color="primary" type="submit") Submit
</template>

<script>
export default {
  props: [
    'article',
    'submit'
  ],
  methods: {
    onSubmit () {
      this.submit({ id: this.article.id, data: this.article })
      this.$router.push({ name: 'Articles' })
    }
  }
}
</script>
