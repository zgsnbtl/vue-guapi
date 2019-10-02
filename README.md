# vue-book

代码为实习时写的觉得不错点个star~·~ wx => 1635942033 

## 技术栈
```
vue vue-cli3 vue-router vuex es6 webpack axios sass mint-ui javaScript

```

## 源码地址

[https://github.com/zgsnbtl/vue-guapi](https://github.com/zgsnbtl/vue-guapi)


## 访问地址

[http://www.wj007.top/book/index.html](http://www.wj007.top/book/index.html)

### 第三方接口跨域在本地vue-cli3脚手架中的vue.config.js中配置如下代码
```
devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://www.api.zhuishushenqi.com',
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
```

### 打包后路径问题vue.config.js中配置
```
baseUrl: './'
```

### 部署服务器时使用nginx代理

### 截图
![](https://github.com/zgsnbtl/vue-guapi/blob/master/screenshot/q1.png)
![](https://github.com/zgsnbtl/vue-guapi/blob/master/screenshot/q2.png)
![](https://github.com/zgsnbtl/vue-guapi/blob/master/screenshot/q3.png)
![](https://github.com/zgsnbtl/vue-guapi/blob/master/screenshot/q4.png)
![](https://github.com/zgsnbtl/vue-guapi/blob/master/screenshot/q5.png)
![](https://github.com/zgsnbtl/vue-guapi/blob/master/screenshot/q6.png)
![](https://github.com/zgsnbtl/vue-guapi/blob/master/screenshot/q7.png)
![](https://github.com/zgsnbtl/vue-guapi/blob/master/screenshot/q8.png)
![](https://github.com/zgsnbtl/vue-guapi/blob/master/screenshot/q9.png)
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
