<template>
  <div @click="getshow" class="read">
    <div v-if="datashow" class="readheader">
      <span @click="getspan" class="mui-icon mui-icon-arrowleft read-span"></span>
      <span>{{getBook.title}}</span>
      <span></span>
    </div>
    <div v-if="datashow" class="readbottom">
      <p class="readbottom-ml">
        <router-link :to="{name:'mvlu',params:{id:getBook._id}}">目录</router-link>
      </p>
    </div>
    <!-- <h3>{{booktitle}}</h3> -->
    <div v-for="item in con" :key="item.id">
      <h1>{{item.title}}</h1>
      <div v-for="(item,i) in item.cpContent||item.body" :key="i">
        <p v-html="item"></p>
      </div>
    </div>
    <div class="btn">
      <mt-button type="danger" size="small" @click="page" plain>阅读下一章</mt-button>
    </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import { MessageBox } from 'mint-ui'
import {bookcontent,bookmulu} from '../api/api.js'
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            con:[],
            id:this.$route.params.id,
            link:this.$route.params.link,
            flags:false,
            datashow:false,
            iss:'0',
            booklinkss:[],
            booktitle:[],
            getBook:{} 
        }
    },
     computed:{
     ...mapState([
      'shuajiabook','calbook'
     ])
    },  
     destroyed(){
      this.getread(true)
    },
    created(){
        this.getBook=JSON.parse(window.localStorage.getItem('SHEFLBOOK'))
        console.log(this.getBook)
        this.getmulu(this.id)
        this.getcontent(this.link)
        this.getread(false)
    },
    methods:{
         ...mapMutations({
        setbook:'BOOK_UPDATE'
      }),
        getread(data){
            this.$emit('fangfa',data)
        },
        getspan(){
   
     var carbook = JSON.parse(window.localStorage.getItem('book'))
     if(!this.shuajiabook){
         this.$router.go(-1)
        
     }else{
            MessageBox.confirm('是否要加入书架').then(action => {
this.$router.go(-1)
 carbook[this.getBook._id] = {
            cover: this.getBook.cover,
            flag:!this.flag,
            title: this.getBook.title,
            lastChapter:this.getBook.lastChapter,
            id: this.getBook._id,
            author:this.getBook.author,
            chapterIndexCache: this.iss,
            bookSource: 0,
            pageIndexCache: 0,
          };
           this.setbook(false)
 window.localStorage.setItem('book', JSON.stringify(carbook))
}).catch(()=>{
    this.$router.go(-1);
    delete carbook[this.getBook._id]
    window.localStorage.setItem('book', JSON.stringify(carbook))
    this.setbook(true)
});
     }        
        },
               // 
         getmulu(id) {
      //  目录
  
     var carbook = JSON.parse(window.localStorage.getItem('book'))
     console.log(this.getBook)
       var booklinks=[];
      bookmulu(id).then(res => {
        //   将目录中的标题和链接拿出来
              res.data.chapters.forEach(item=> {
                     this.booklinkss.push(item.link)
                     this.booktitle.push(item.title)
                });
                  this.iss=carbook && carbook[this.getBook._id]?carbook[this.getBook._id].chapterIndexCache : this.iss;            
                console.log(this.iss)
                // console.log(this.booklinkss.index())
                this.getcontent(this.booklinkss[this.iss])
                
      });
    },
             getcontent(link){
            //    Toast('加载中')  
                 var content=[];
                //  将上一章的内容拼接到下一章中
                 bookcontent(link).then(res=>{
                      if(res.status===200){
                var datas=res.data.chapter;
                content.push({
                    cpContent:datas.isVip ? ['vip章节，请尝试换源阅读'] : datas.cpContent.split('\n'),
                    title:datas.title})
                // this.con=content[0]
                var cont=content[0]
                // console.log(cont)
                this.con=this.con.concat(cont)
                console.log(this.con)
            }
                 })
        },
// 点击加载下一章
        page(e){
             // 取消父级事件冒泡
   if ( e && e.stopPropagation )
      //因此它支持W3C的stopPropagation()方法
      e.stopPropagation();
  else
  //否则，我们需要使用IE的方式来取消事件冒泡
    window.event.cancelBubble = true;
 
var carbook = JSON.parse(window.localStorage.getItem('book')||'{}')
       this.iss++
       carbook[this.getBook._id] = {
            cover: this.getBook.cover,
            flag:!this.flag,
            title: this.getBook.title,
            lastChapter:this.getBook.lastChapter,
            id: this.getBook._id,
            author:this.getBook.author,
            chapterIndexCache: this.iss,
            bookSource: 0,
            pageIndexCache: 0,
          };
 window.localStorage.setItem('book', JSON.stringify(carbook))
       this. getmulu(this.id)
       console.log(this.iss)
        },
        getshow(){
        this.datashow=!this.datashow
        }
    }
    
}
</script>
<style lang="scss" scoped>
.read {
  z-index: 101;
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100%;
  background-color: #c4b395;
  padding: 20px;
  line-height: 24px;
  letter-spacing: 2px;
  .readheader {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 35px;
    background-color: rgba($color: #000000, $alpha: 0.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 6px;
    :nth-child(1) {
      font-size: 20px;
      color: #fff;
    }
    :nth-child(2) {
      color: #fff;
      font-size: 14px;
    }
  }
  .readbottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100px;
    background-color: rgba($color: #000000, $alpha: 0.5);
    .readbottom-ml {
      color: #fff;
      text-align: center;
      font-size: 15px;
    }
  }
  h1 {
    font-size: 16px;
    color: #222;
  }
  p {
    color: #222;
    text-indent: 2em;
    overflow-x: hidden;
  }
  .btn {
    display: flex;
    justify-content: center;
  }
}
</style>
