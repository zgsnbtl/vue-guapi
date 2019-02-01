<template>
  <div class="yuedu">
    <mt-button type="primary" @click="getbook" size="small" plain>{{flag?'加入书架':'撤出书架'}}</mt-button>
    <mt-button type="danger" size="small" @click="getyuedu">{{flag?'立即阅读':'继续阅读'}}</mt-button>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {chapterContent,bookcontent} from '../api/api.js'
export default {
    data () {
        return {
          flag:null
        }
    },
    props:['booklinks'],
  
    computed:{
     ...mapState([
       'calbook','shuajiabook'
     ])
    },
    watch:{
      '$route':'ifFlag'
    },
    created(){
      console.log(this.booklinks)
      // this.calbook
      this.ifFlag()
    },
    methods:{
      ...mapMutations({
        setbook:'BOOK_UPDATE'
      }),
        getyuedu(){
        //   var book=this.calbook
        //    var carbook = JSON.parse(window.localStorage.getItem('book')||'{}')
        //      carbook[book._id] = {
        //     cover: book.cover,
        //     flag:!this.flag,
        //     title: book.title,
        //     lastChapter:book.lastChapter,
        //     id: book._id,
        //     author:book.author,
        //     chapterIndexCache: 0,
        //     bookSource: 0,
        //     pageIndexCache: 0,
        //   };
        //  window.localStorage.setItem('book', JSON.stringify(carbook))
       this.$router.push({name:'read',params:{id:this.booklinks}});
        },

        ifFlag(){ //判断是否加入书架的处理
        var carbooks = JSON.parse(window.localStorage.getItem('SHEFLBOOK') || '{}')
          var carbook = JSON.parse(window.localStorage.getItem('book'))
          if(carbook && carbook[carbooks._id]){
            this.flag=false
       this.setbook(false)
          }else{
            this.flag=true
       this.setbook(true)
          }
        },
        getbook(){  // 加入书架 并做缓存处理
          var book= this.calbook;
          var carbook = JSON.parse(window.localStorage.getItem('book') || '{}')
          this.flag=!this.flag
          if(!this.flag){
        carbook[book._id] = {
            cover: book.cover,
            flag:!this.flag,
            title: book.title,
            lastChapter:book.lastChapter,
            id: book._id,
            author:book.author,
            chapterIndexCache: 0,
            bookSource: 0,
            pageIndexCache: 0,
          };
                     this.setbook(false)
         window.localStorage.setItem('book', JSON.stringify(carbook))

          }else{ // 移除书架清除缓存
          delete carbook[book._id]
                      this.setbook(true)
             window.localStorage.setItem('book', JSON.stringify(carbook))
          }

          // this.booklinks=this.calbook;
        //  let localShelf = JSON.parse(window.localStorage.getItem('book')) ? JSON.parse(window.localStorage.getItem('book')) : {};
        }
    }
}
</script>
<style lang="scss" scoped>
.yuedu {
    .mint-button--primary.is-plain{
    color: #00C98C;
    border: 1px solid #00C98C;
  }
  .mint-button--danger{
    background-color: #00C98C;
  }
  display: flex;
  justify-content: space-around;
  padding: 15px 10px 10px;
  .mint-button--small {
    padding: 8px 33px;
    height: 100%;
  }
}
</style>
