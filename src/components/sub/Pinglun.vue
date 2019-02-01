<template>
  <div class="pluns">
       <p class="rmpl">热门评论</p>
    <ul class="mui-table-view"  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="3">
      <li  v-for="item in pinglun" :key="item.id" class="mui-table-view-cell mui-media">
          <img class="mui-media-object mui-pull-left" :src="imgUrl+item.author.avatar">
          <div class="mui-media-body">
            <p><span>{{item.author.nickname}}</span><span>{{item.updated|formatDate}}</span></p>
            <p class="mui-ellipsis">{{item.title}}</p>
            <p>{{item.content}}</p>
          </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {bookpl} from '../api/api.js'
import {formatDate} from '../time/time.js'
export default {
    data () {
        return {
            pinglun:{},
            limit:5,
            sUrl:'http://statics.zhuishushenqi.com',
            loading:false,
            pageSize:5,
      bRequest: true,
        }
    },
    	filters: {
	formatDate(time) {
	            var date = new Date(time);
	            return formatDate(date, 'yyyy-MM-dd hh:mm');
	          }
	},
    watch:{
        '$route':'loadMore'
    },
    computed:{
     imgUrl() {
        return this.sUrl
      }
    },
    created(){
       this.loadMore()
    },
    methods:{
 loadMore(){
     bookpl(this.$route.params.id,this.limit).then(res => {
        if (res.status === 200) {
            this.pinglun = res.data.reviews
                this.limit+=5
        }
      })
      this.loading=false;
        },
    }
}
</script>
<style lang="scss" scoped>
.pluns{
    .rmpl{
        margin-left: 15px;
        color: #333;
    }
.mui-table-view{
    max-height: 400px;
    overflow-y: auto;
}
.mui-media-body{
   p{
font-size: 12px;
   } 
    :nth-child(1){
        display: flex;
        justify-content: space-between;
    }
    :nth-child(2){
        color: #333;
    }

}
.fenlei{
    height: 500px;
}
}
</style>
