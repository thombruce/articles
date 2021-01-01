<template lang="pug">
v-btn(@click="$vuetify.theme.dark = !$vuetify.theme.dark" icon)
  v-icon(v-if="$vuetify.theme.dark") mdi-weather-sunny
  v-icon(v-else) mdi-weather-night
</template>

<script></script>
