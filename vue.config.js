module.exports = {
  baseUrl: './',
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://api.zhuishushenqi.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/category': {
        target: 'http://b.zhuishushenqi.com',
        ws: true,
        changeOrigin: true,
      },
      '/books': {
        target: 'http://b.zhuishushenqi.com',
        ws: true,
        changeOrigin: true,
      },
      '/btoc': {
        target: 'http://bookapi03.zhuishushenqi.com',
        ws: true,
        changeOrigin: true,
      },
      '/chapter2': {
        target: 'http://chapter3.zhuishushenqi.com',
        changeOrigin: true,
        ws: true,
      },
      '/book': {
        target: 'http://newbookstoreapi.shuqireader.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/book': ''
        }
      },
      '/ta': {
        target: 'https://book.eayue.com',
        changeOrigin: true,
        ws: true,
      },
      '/openapi': {
        target: 'https://c-100.11222.cn',
        changeOrigin: true,
        ws: true,
      }
    }
  }
}
