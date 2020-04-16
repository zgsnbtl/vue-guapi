<template>
  <div>
    <section class="searchs"><search @setsearch='show'></search></section>
    <section ref="load" :style="{height:boxheight}" class="boxs">
        <!-- <lmeiwen :booklist='bookList'></lmeiwen> -->
        <mt-loadmore
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          :auto-fill="false"
          ref="loadmore"
        >
          <lmeiwen :booklist="search"></lmeiwen>
        </mt-loadmore>
      </section>
  </div>
</template>
<script>
import {booksearch} from '../api/api.js'
import search from '../sub/search'
import lmeiwen from '../sub/Lmeiwen'
export default {
    data() {
        return {
            value:this.$route.params.val,
            search:[],
            count:1,
            allLoaded: false,
            boxheight:''
        }
    },
     props:['appref'],
     mounted(){
     // 获取当前列表的自适应高度
    const headerheight=this.appref.header.$el.offsetHeight
    const tabbarheight=this.appref.tabbar.$el.offsetHeight
    this.boxheight=document.documentElement.clientHeight  - tabbarheight +'px';
    console.log( this.boxheight)
    },
    created(){
       this.getsearchs() 
       console.log(this.value)
    },
    watch:{
        $route: function(){
            booksearch(this.value).then(res=>{
             this.search=res.data.books.slice(0,15)
             console.log(this.search)
                 //点击后重置滚动距离
        this.$refs.load.scrollTop = 0
            })
        }
    },
    components:{search,lmeiwen},
    methods:{
          getsearchs(){
        // var key=this.$route.params.val
           booksearch(this.value).then(res=>{
             this.search=res.data.books.slice(0,15);
            //  console.log(this.search)
            //点击后重置滚动距离
        this.$refs.load.scrollTop = 0
            })
        },
        show(data){
        this.value=data
        },
         // 下拉加载
        loadBottom(){
           this.allLoaded = true;
           booksearch(this.value).then(res=>{
        //   console.log(res);
        if(this.search.length===res.data.books.length){
            this.allLoaded = false;
        }
        this.search=res.data.books.slice(0,this.count*15+15);
        this.count++
           this.allLoaded = false;
        // console.log(    this.bookList);
         })
        },
    }
}
</script>
<style lang="scss" scoped>
.searchs{
    position: fixed;
    width: 100%;
    top: 25px;
    z-index: 100;
}
.boxs{
    margin-top: 60px;
    overflow-y: scroll
}
</style>
