import Vue from 'vue'

Vue.filter('formatDate', val => new Date(val).toLocaleDateString())
