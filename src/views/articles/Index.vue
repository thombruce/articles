<template lang="pug">
  div(class="templates")
    VNavigationDrawer.col-4.col-md-3.col-lg-2.pa-0(
      absolute
      clipped
      permanent
      width="100%"
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
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      articles: null
    }
  },

  methods: {
    ...mapActions('articles', [
      'index'
    ]),
    htmlToString (htmlString) {
      const doc = new DOMParser().parseFromString(htmlString, 'text/html')
      if (doc.body.children[0]) {
        return doc.body.children[0].textContent || 'Untitled Note'
      } else {
        return 'Untitled Note'
      }
    }
  },

  async mounted () {
    this.articles = await this.index()
  }
}
</script>
