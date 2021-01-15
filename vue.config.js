module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'Notes',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html',
      exclude: [
        '_redirects'
      ]
    }
  }
}
