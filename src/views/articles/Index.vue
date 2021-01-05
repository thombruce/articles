<template lang="pug">
  div(class="templates")
    VNavigationDrawer.col-2(absolute clipped permanent)
      VList
        VListItemGroup
          VListItem(to="/articles/new" link)
            VListItemContent
              VListItemTitle New Article

          VListItem(v-for="article in articles" :key="article.id" :to="{ name: 'EditArticle', params: { id: article.id } }" link)
            VListItemContent
              VListItemTitle {{ htmlToString(article.content) }}

    VContainer.col-10.offset-2
      RouterView
</template>

<script>
import { mapGetters } from 'vuex'

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
    htmlToString (htmlString) {
      const doc = new DOMParser().parseFromString(htmlString, 'text/html')
      return doc.body.textContent || ''
    }
  }
}
</script>
