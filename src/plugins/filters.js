import Vue from 'vue'

Vue.filter('formatDate', val => new Date(val).toLocaleDateString())

Vue.filter('textPreview', val => {
  const doc = new DOMParser().parseFromString(val, 'text/html')
  if (doc.body.children[0]) {
    return doc.body.children[0].textContent || 'Untitled Note'
  } else {
    return 'Untitled Note'
  }
})
