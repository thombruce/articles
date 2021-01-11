import Vue from 'vue'

import { findAllByKey, truncate } from './functions'

Vue.filter('formatDate', val => new Date(val).toLocaleDateString())

Vue.filter('textPreviewFromHTML', html => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const firstNode = doc.body.children[0]
  const text = firstNode ? firstNode.textContent : null

  if (text) return truncate(text, 50)
  return 'Untitled Note'
})

Vue.filter('textPreviewFromJSON', json => {
  const text = findAllByKey(json, 'text').join(' ')

  if (text) return truncate(text, 50)
  return 'Untitled Note'
})
