module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'Articles',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html',
      exclude: [
        '_redirects'
      ]
    }
  }
}
