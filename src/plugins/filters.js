import Vue from 'vue'

Vue.filter('formatDate', val => new Date(val).toLocaleDateString())

Vue.filter('textPreview', val => {
  const doc = new DOMParser().parseFromString(val, 'text/html')
  const firstNode = doc.body.children[0]
  const textContent = firstNode ? firstNode.textContent : null

  if (textContent && textContent.length > 50) {
    return textContent.substring(0, 50) + '...'
  } else if (textContent) {
    return textContent
  }
  return 'Untitled Note'
})
