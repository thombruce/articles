<template lang="pug">
  VDialog(v-model="dialog" width="500")
    template(v-slot:activator="{ on, attrs }")
      VBtn(
        icon
        v-bind="attrs"
        v-on="on"
      )
        VIcon mdi-delete

    VCard
      VCardTitle.headline
        | Are you sure?
      VCardText
        | If you delete this article, you won't be able to retrieve it.
      VDivider
      VCardActions
        VSpacer
        VBtn(
          color="primary"
          text
          @click="dialog = false"
        )
          | Cancel
        VBtn(
          color="error"
          text
          @click="deleteAction()"
        )
          | Confirm
</template>

<script>
export default {
  props: [
    'action'
  ],

  data () {
    return {
      dialog: false
    }
  },

  methods: {
    deleteAction () {
      this.action()
      this.dialog = false
    }
  }
}
</script>
