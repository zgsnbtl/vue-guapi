<template>
  <div class="app">
<mt-header fixed title="这个少年不太冷">
  <div @click="getback" v-show="flag" slot="left">
    <mt-button icon="back">返回</mt-button>
  </div>
  <mt-button slot="right">
    <svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-shudan"></use>
</svg>
  </mt-button>
</mt-header>
 <!-- 底部 -->
 <mt-tabbar fixed>
  <mt-tab-item>
    <router-link :to="{name:'home'}" tag="div">
    <svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-shouye"></use>
</svg>
    <h1>首页</h1>
    </router-link>
  </mt-tab-item>
  <mt-tab-item >
    <router-link :to="{name:'bookrack'}" tag="div">
<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon--"></use>
</svg>
    <h1>书架</h1>
    </router-link>
  </mt-tab-item>
  <mt-tab-item>
    <router-link :to="{name:'classify'}" tag="div">
<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-fenlei"></use>
</svg>
    <h1>分类</h1>
    </router-link>
  </mt-tab-item>
  <mt-tab-item>
    <router-link :to="{name:'rank'}" tag="div">
<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-paihangbang-"></use>
</svg>
    <h1>排行</h1>
    </router-link>
  </mt-tab-item>
</mt-tabbar>
<router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
    flag:false  
    }
  },
  methods:{
  getback(){
      this.$router.go(-1);
    }
  },
  watch:{
    '$route.path':function(newval){
      if(newval==='/home'){
       this.flag=false
      }else{
        this.flag=true
      }
    }
  }
  
}
</script>
<style lang="scss" scope>
*{margin: 0;padding: 0;}
body{
background-color: #fff;
}
.app{
background-color: #fff;
  margin-top: 40px;
  margin-bottom: 52px;
  .mint-header.is-fixed{
    z-index: 99;
  }
.mint-tabbar > .mint-tab-item.is-selected{
  color: #555;
  background-color: #EFEFF4;
}
.mint-header{
  background-color: #00C98C;
}
.mint-tab-item{
  padding: 0;
}
.mint-tab-item-label{
  h1{
    font-size: 14px;
  }
}
}

</style>
