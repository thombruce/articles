<template lang="pug">
  div(class="templates")
    VNavigationDrawer.col-4.col-md-3.col-lg-2.pa-0(
      absolute
      clipped
      permanent
    )
      VList
        VListItemGroup
          VListItem(
            to="/articles/new"
            link
          )
            VListItemContent
              VListItemTitle New Article

          VListItem(
            v-for="article in articles"
            :key="article.id"
            :to="{ name: 'EditArticle', params: { id: article.id } }"
            two-line
            link
          )
            VListItemContent
              strong {{ htmlToString(article.content) }}
              div
                time(:datetime="article.updatedAt") {{ article.updatedAt | formatDate }}
                small.grey--text(v-if="article.updatedAt !== article.createdAt") (Edited)

    VContainer.col-8.offset-4.col-md-9.offset-md-3.col-lg-10.offset-lg-2
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
      return doc.body.children[0].textContent || 'Untitled Note'
      // TODO: Refactor to consider documents which begin with non-text element.
      //       Iterate over the `children` collection to find first node with textContent.
    }
  }
}
</script>
