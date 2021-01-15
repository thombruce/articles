module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'Articles',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      exclude: [
        '_redirects'
      ]
    }
  }
}
