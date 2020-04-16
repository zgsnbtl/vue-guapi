<template>
  <div class="user">
    <div class="user-header">
      <div class="user-img">
        <img src="../../assets/a.jpg" alt>
      </div>
      <div class="user-name">
        <p>这个少年不太冷</p>
      </div>
      <div class="mui-card">
        <div class="mui-card-header mui-card-media"></div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p>此项目为学习vue写的因为平时喜欢看小说所以写这个比较有意思些</p>
            <p>使用技术栈及ui：vue vue-cli3 vue-x vue-router axios mint-ui mui javaScript es6 sass</p>
            <p>本地服务器跨域在vue-config.js中配置代理接口</p>
            <p>生产环境使用nginx反向代理即可</p>
            <p>api接口为追书神器接口.</p>
            <p>后续会优化整理一些思路和难点</p>
            <p>阅读时小说需要vip时点击换源即可免费阅读</p>
            <p>
              <a
                href="https://github.com/zgsnbtl/vue-guapi/blob/master/src/components/api/api.js"
              >查看接口点击这里</a>
            </p>
            <p>项目源码已上传至
              <a href="https://github.com/zgsnbtl/vue-guapi">GitHub</a>
            </p>
            <p>浏览地址<a href="http://39.96.55.152">39.96.55.152</a></p>
            <p>欢迎大家GitHub Star</p>
            <p>项目中一些bug见谅~…~</p>
          </div>
        </div>
        <div class="mui-card-footer">
          <p>优化及bug联系qq1635942033</p>
          <!-- <a class="mui-card-link">Like</a>
          <a class="mui-card-link">Read more</a>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import imgss from 'src/assets/a.jpg'
// export default {
//     data () {
//         return {
//             imgs:imgss

//         }
//     }
// }
</script>
<style lang="scss" scope>
.user {
  position: relative;
  background-image: url(../../assets/b.jpg);
  top: 0;
  width: 100%;
  min-height: 100%;
  background-size: 100% 100%;
  overflow-y: auto;
  .user-header {
    .user-img {
      text-align: center;
      // margin-top: 30px;
      padding-top: 50px;
      img {
        width: 80px;
        border-radius: 50%;
      }
    }
    .user-name {
      text-align: center;
      p {
        font-size: 14px;
        color: #333;
      }
    }
    .mui-card-header.mui-card-media {
      background-image: url(../../assets/c.jpg);
      background-size: 100% 100%;
      height: 200px;
    }
  }
}
</style>
