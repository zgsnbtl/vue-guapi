<template>
  <div class="yuedu">
    <mt-button type="primary" size="small" plain>加入书架</mt-button>
    <mt-button type="danger" size="small" @click="getyuedu"  plain>立即阅读</mt-button>
  </div>
</template>
<script>
import {chapterContent,bookcontent} from '../api/api.js'
export default {
    data () {
        return {
        }
    },
    props:['booklinks'],
    created(){
    },
    methods:{
        getyuedu(){
            this.$router.push({name:'read',params:{id:this.booklinks}});
        },
    }
}
</script>
<style lang="scss" scoped>
.yuedu {
  display: flex;
  justify-content: space-around;
  padding: 15px 10px 10px;
  .mint-button--small {
    padding: 8px 33px;
    height: 100%;
  }
}
</style>
