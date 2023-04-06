<template>
  <div class="reader">
    <mt-button type="primary" @click="getBook" size="small" plain>{{flag?'加入书架':'撤出书架'}}</mt-button>
    <mt-button type="danger" size="small" @click="getRead">{{flag?'立即阅读':'继续阅读'}}</mt-button>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {chapterContent,bookContent} from '../api/api.js'
export default {
    data () {
        return {
          flag:null
        }
    },
    props:['booklinks'],
  
    computed:{
     ...mapState([
       'calBook','bookrack'
     ])
    },
    watch:{
      '$route':'ifFlag'
    },
    created(){
      console.log(this.booklinks)
      // this.calBook
      this.ifFlag()
    },
    methods:{
      ...mapMutations({
        setBook:'BOOK_UPDATE'
      }),
        getRead(){
        //   var book=this.calBook
        //    var carBook = JSON.parse(window.localStorage.getItem('book')||'{}')
        //      carBook[book._id] = {
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
        //  window.localStorage.setItem('book', JSON.stringify(carBook))
       this.$router.push({name:'read',params:{id:this.booklinks}});
        },

        ifFlag(){ //判断是否加入书架的处理
        var carBooks = JSON.parse(window.localStorage.getItem('SHEFLBOOK') || '{}')
          var carBook = JSON.parse(window.localStorage.getItem('book'))
          if(carBook && carBook[carBooks._id]){
            this.flag=false
       this.setBook(false)
          }else{
            this.flag=true
       this.setBook(true)
          }
        },
        getBook(){  // 加入书架 并做缓存处理
          var book= this.calBook;
          var carBook = JSON.parse(window.localStorage.getItem('book') || '{}')
          this.flag=!this.flag
          if(!this.flag){
        carBook[book._id] = {
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
                     this.setBook(false)
         window.localStorage.setItem('book', JSON.stringify(carBook))

          }else{ // 移除书架清除缓存
          delete carBook[book._id]
                      this.setBook(true)
             window.localStorage.setItem('book', JSON.stringify(carBook))
          }

          // this.booklinks=this.calBook;
        //  let localShelf = JSON.parse(window.localStorage.getItem('book')) ? JSON.parse(window.localStorage.getItem('book')) : {};
        }
    }
}
</script>
<style lang="scss" scoped>
.reader {
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
