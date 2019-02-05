<template>
  <div>
    <div class="ran-k">
      <div class="rankbtn">
        <button @click="setsex('male')" :class="{rbtn:this.ranktit==='male'}">男生</button>
        <button @click="setsex('female')" :class="{rbtn:this.ranktit==='female'}">女生</button>
      </div>
    </div>
    <div class="rank">
      <section class="rank-left">
        <ul
          v-show="ranktit==='male'"
          v-for="item in maleRank"
          :key="item.id"
          class="mui-table-view"
        >
          <li
            @click="getrankid(item._id)"
            :class="['mui-table-view-cell',{active:item._id===rankId}]"
          >{{item.shortTitle}}</li>
        </ul>
        <ul
          v-show="ranktit==='female'"
          v-for="item in femaleRank"
          :key="item.id"
          class="mui-table-view"
        >
          <li
            @click="getrankid(item._id)"
            :class="['mui-table-view-cell',{active:item._id===rankId}]"
          >{{item.shortTitle}}</li>
        </ul>
      </section>
      <section :style="{height:boxheight}" class="rank-right">
        <!-- <lmeiwen :booklist='bookList'></lmeiwen> -->
        <mt-loadmore
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          :auto-fill="false"
          ref="loadmore"
        >
          <lmeiwen :booklist="bookList"></lmeiwen>
        </mt-loadmore>
      </section>
    </div>
  </div>
</template>
<script>
import lmeiwen from '../sub/Lmeiwen'
import {bookranks} from '../api/api.js'
import { Navbar } from 'mint-ui'
import {bookrank} from '../api/api.js'
export default {
    data () {
        return {
            femaleRank:{},
            maleRank:{},
            rankId:'',
            ranktit:'male',
            bookList:[],
            count:1,
            allLoaded: false,
      boxheight:''
        }
    },
      props:['appref'],
    components:{lmeiwen},
    mounted(){
     // 获取当前列表的自适应高度
    const headerheight=this.appref.header.$el.offsetHeight
    const tabbarheight=this.appref.tabbar.$el.offsetHeight
    this.boxheight=document.documentElement.clientHeight  - tabbarheight +'px';
    },
    created(){
        this.getrank()
    },
    watch:{
     'rankId':function(){
         this.bookList = [];
         bookranks(this.rankId).then(res=>{
        this.bookList=res.data.ranking.books.slice(0,15);
         })
     }
    },
    methods:{
        // 下拉加载
        loadBottom(){
            this.allLoaded = true;
            bookranks(this.rankId).then(res=>{
        this.bookList=res.data.ranking.books.slice(0,this.count*15+15);
        this.count++
           this.allLoaded = false;
         })
        },
    getrank(){
        bookrank().then(res=>{
          if(res.data.ok){
              this.femaleRank=res.data.female;
              this.maleRank=res.data.male;
              this.rankId=this.maleRank[0]._id
          }
        })
    },
    // 男女分类数据的判断
    setsex(ranktit){
        if(ranktit==='male'){
        this.ranktit=ranktit;
        this.rankId=this.maleRank[0]._id;
          console.log(this.rankId)
        }else if(ranktit==='female'){
           this.ranktit= ranktit;
            this.rankId=this.femaleRank[0]._id;
        }
    },
    getrankid(id){
        this.rankId=id
    }
    }
}
</script>
<style lang="scss" scoped>
.ran-k {
  z-index: 100;
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
}
.rankbtn {
  display: flex;
  height: 30px;
  line-height: 30px;
  button {
    // margin: 0px 50px;
  }
  .rbtn {
    border: 1px solid #00c98c;
    color: #00c98c;
  }
}
.rank {
  display: flex;
  justify-content: space-between;
  li {
    font-size: 13px;
  }
  .rank-left {
    width: 25%;
    position: fixed;
    position: fixed;
    top: 40px;
    left: 0;
    bottom: 60px;
    background-color: #f6f7f9;
    overflow-y: scroll;
  }
  .rank-right {
    overflow: scroll;
    height: 600px;
    position: relative;
    margin: 10px 0 0px 25%;
    background-color: #fff;
    width: 75%;
  }
  .active {
    color: #00c98c;
    border-left: #00c98c 2px solid;
  }
}
</style>
