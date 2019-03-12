# vue-book

## 技术栈
```
vue vue-cli3 vue-router vuex es6 webpack axios sass mint-ui nui javaScript
觉得不错点个star~·~
```

## 源码地址

[源码地址:https://github.com/zgsnbtl/vue-guapi](https://github.com/zgsnbtl/vue-guapi)


## 访问地址

[访问地址: 39.96.55.152](http://39.96.55.152)

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

location / {    
        root /www/server/nginx/html;
        index index.html;
        }    
                   
        location /api
        {
            rewrite  ^.+api/?(.*)$ /$1 break;
            include  uwsgi_params;
            proxy_pass http://api.zhuishushenqi.com/;
        }
        
        location /content/
        {
            proxy_pass http://chapter2.zhuishushenqi.com/;
        }

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
