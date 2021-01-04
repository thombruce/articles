<template lang="pug">
  div(class="templates")
    VContainer
      h2 Articles

      RouterLink(:to="{ name: 'NewArticle' }") New article

      VDataTable(:headers="headers" :items="articles" :items-per-page="5")
        template(v-slot:item.content="{ item }")
          // VRichTextEditor(v-model="item.content" :editable="false")
          | {{ item.content }}

        template(v-slot:item.actions="{ item }")
          VBtn(icon :to="{ name: 'EditArticle', params: { id: item.id } }")
            VIcon(small) mdi-pencil

          VBtn(icon @click="destroy(item)")
            VIcon(small) mdi-delete
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

// import VRichTextEditor from '@/components/v-rich-text-editor'

export default {
  // components: {
  //   VRichTextEditor
  // },
  data () {
    return {
      headers: [
        { text: 'Content', value: 'content' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters('articles', {
      articles: 'all'
    })
  },
  methods: {
    ...mapActions('articles', [
      'destroy'
    ])
  }
}
</script>
