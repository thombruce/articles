<template lang="pug">
  VTextField(
    label="Search"
    :value="query"
    @input="query = $event"
    single-line
    prepend-inner-icon="mdi-magnify"
  )
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    query: {
      get () {
        return this.$store.state.notes.query
      },
      set (val) {
        this.updateQuery(val)
      }
    }
  },

  methods: {
    ...mapActions('notes', [
      'updateQuery'
    ])
  }
}
</script>
