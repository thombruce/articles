<script>
import { mapActions } from 'vuex'

export default {
  render: () => null,

  methods: {
    ...mapActions('articles', [
      'new'
    ])
  },

  async created () {
    const article = await this.new()
    this.$router.replace({ name: 'EditArticle', params: { id: article.id } })
  }
}
</script>
