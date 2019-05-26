module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap(options =>
        Object.assign(options, {
          limit: '1000000'
        })
      )
  }
}
