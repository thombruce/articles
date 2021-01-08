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
              strong {{ article.content | textPreview }}
              div
                time(:datetime="article.updatedAt") {{ article.updatedAt | formatDate }}

    VContainer.col-8.offset-4.col-md-9.offset-md-3.col-lg-10.offset-lg-2
      RouterView
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('articles', {
      articles: 'all'
    })
  },

  methods: {
    ...mapActions('articles', [
      'index'
    ])
  },

  mounted () {
    this.index()
  }
}
</script>
