<template>
  <div class="read">
    <!-- <h3>{{booktitle}}</h3> -->
    <div v-for="item in con" :key="item.id">
    <h1>{{item.title}}</h1>
    <div v-for="(item,i) in item.cpContent" :key="i">
        <p v-html="item"></p>

    </div>
    </div>
        <div class="btn"><mt-button type="danger" size="small" @click="page" plain>阅读下一章</mt-button></div>
  </div>
</template>
<script>
import {bookcontent,bookmulu} from '../api/api.js'
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            con:[],
            id:this.$route.params.id,
            link:this.$route.params.link,
            flags:false,
            iss:'0',
            booklinkss:[],
            booktitle:[]
        }
    },
    created(){
        this.getmulu(this.id)
        this.getcontent(this.link)
    },
    methods:{
               // 
         getmulu(id) {
      //  目录
       var booklinks=[];
      bookmulu(id).then(res => {
        //   将目录中的标题和链接拿出来
              res.data.chapters.forEach(item=> {
                     this.booklinkss.push(item.link)
                     this.booktitle.push(item.title)
                });
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
                    cpContent:datas.isVip ? ['vip章节，请到正版网站阅读'] : datas.cpContent.split('\n'),
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
        page(){
            // var s='http://vip.zhuishushenqi.com/chapter/5aa6383cc624847a86b981a6?cv=1520842812928'
            //      this.getcontent(s)
            // console.log(this.$route.params.par)
       this.iss++
       this. getmulu(this.id)
       console.log(this.iss)
  
    //  this.getcontent(this.$route.params.par[a])
    //           console.log(this.$route.params.par[a])
        }
    }
    
}
</script>
<style lang="scss" scoped>
.read {
  min-height: 600px;
  background-color: #c4b395;
  padding: 20px;
  line-height: 24px;
  letter-spacing: 2px;
  h1 {
    font-size: 16px;
    color: #222;
  }
  p {
    color: #222;
    text-indent: 2em;
    overflow-x: hidden;
  }
    .btn{
     display: flex;
     justify-content: center;
  }
}
</style>
