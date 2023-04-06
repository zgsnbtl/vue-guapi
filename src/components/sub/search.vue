<template>
    <div class="search">
        <div class="sear">
    <input type="search" v-model="value"  @keyup.enter="getSearch" class="inputs" placeholder="请输入您要搜索的关键字">
    <span @click="getSearch" class="mui-icon mui-icon-search"></span>
</div>
    </div>
</template>
<script>
import {bookSearch} from '../api/api.js'
export default {
    data () {
        return {
            value:''
        }
    },
    created(){
    },
    methods:{
        getSearch(){
        this.$router.push({name:'search',params:{val:this.value}})
        this.$emit('setSearch',this.value)
        this.value=''
        }
        
    }
}
</script>
<style lang="scss" scoped>
.search{
    .sear{
        position: relative;
      .inputs{
    margin-top: 5px;
    background-color: #fff;
    border: 1px solid #999;
          padding-top: 10px;
  }
.mui-icon-search{
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 100;
}
}
}
</style>
