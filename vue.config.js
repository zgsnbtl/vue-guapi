module.exports = {
  baseUrl: './',
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'http://ctzl.top/api',
=======
        target: 'http://www.api.zhuishushenqi.com',
>>>>>>> 684ecf1d1c5b0e1f4e2fae3ab86d42503616ef05
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/content': {
        target: 'http://chapter2.zhuishushenqi.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/content': ''
        }
      }
    }
  }
}
