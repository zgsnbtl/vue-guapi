<template>
  <div class="app">
    <mt-header v-if="fag" ref="header" fixed title="你今天真好看！">
      <div @click="getBack" v-show="flag" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
      <mt-button @click="getUser" slot="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yonghu1"></use>
        </svg>
      </mt-button>
    </mt-header>
    <!-- 底部 -->
    <mt-tabbar ref="tabbar" v-if="fag" fixed>
      <mt-tab-item>
        <router-link :to="{ name: 'home' }" tag="div">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouye"></use>
          </svg>
          <h1>首页</h1>
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link :to="{ name: 'bookrack' }" tag="div">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon--"></use>
          </svg>
          <h1>书架</h1>
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link :to="{ name: 'classify' }" tag="div">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenlei"></use>
          </svg>
          <h1>分类</h1>
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link :to="{ name: 'rank' }" tag="div">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-paihangbang-"></use>
          </svg>
          <h1>排行</h1>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>

    <keep-alive>
      <transition>
        <router-view
          v-if="$route.meta.keepAlive"
          :appRef="$refs"
          @method="show"
        ></router-view>
      </transition>
    </keep-alive>
    <transition>
      <router-view
        v-if="!$route.meta.keepAlive"
        :appRef="$refs"
        @method="show"
      ></router-view>
    </transition>
  </div>
</template>
<script>
import "./font/fonts-user";
export default {
  data() {
    return {
      flag: true,
      fag: true,
      boxHeight: "",
    };
  },
  mounted() {
    this.boxHeight = document.documentElement.clientHeight;
    console.log(this.boxHeight);
  },
  methods: {
    getBack() {
      this.$router.go(-1);
    },
    show(data) {
      this.fag = data;
    },
    getUser() {
      this.$router.push({ name: "user" });
    },
  },
  // watch:{
  //   '$route.path':function(newval){
  //     if(newval==='/home'){
  //      this.flag=false
  //     }else{
  //       this.flag=true
  //     }
  //   }
  // }
};
</script>
<style lang="scss" scope>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #fff;
}
.app {
  background-color: #fff;
  margin-top: 30px;
  margin-bottom: 52px;
  .mint-header.is-fixed {
    z-index: 99;
  }
  .mint-header {
    height: 30px;
  }
  .mint-tabbar > .mint-tab-item.is-selected {
    color: #555;
    background-color: #efeff4;
  }
  .mint-header {
    background-color: #00c98c;
  }
  .mint-tab-item {
    padding: 0;
  }
  .mint-tab-item-label {
    h1 {
      font-size: 12px;
    }
  }
  // 动画
  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.3s ease;
  }
}
</style>
