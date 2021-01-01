<template lang="pug">
  VApp

    VNavigationDrawer(app temporary v-model="drawer")
      VList(nav)
        VListItemGroup(v-model="group")
          VListItem(to="/" link)
            VListItemContent
              VListItemTitle Home
          VListItem(to="/about" link)
            VListItemContent
              VListItemTitle About

    VAppBar(
      app
      color="primary"
      dark
    )
      VAppBarNavIcon(@click.stop="drawer = !drawer")

      VToolbarTitle
        | Articles

      VSpacer

      VDarkmodeToggle
      VFullscreenToggle

    VMain
      RouterView
</template>

<script>
import VDarkmodeToggle from './components/controls/v-darkmode-toggle'
import VFullscreenToggle from './components/controls/v-fullscreen-toggle'

export default {
  name: 'App',

  components: {
    VDarkmodeToggle,
    VFullscreenToggle
  },

  data () {
    return {
      drawer: false,
      group: null
    }
  },

  watch: {
    group () {
      this.drawer = false
    }
  }
}
</script>
