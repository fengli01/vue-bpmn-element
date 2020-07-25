module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          // target: 'http://127.0.0.1:8088', flowable
          target: 'http://127.0.0.1:8089', // activiti
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/'
          }
        }
      }
    }
  }
}
