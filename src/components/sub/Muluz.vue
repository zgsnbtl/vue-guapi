<template>
    <div>
            <div class="mvlu">
        <div class="paixu">
            <p><span>共{{zjlist.length}}章</span><span @click="show"><span v-if="flag">倒序</span><span v-else>正序</span></span></p>
        </div>
       <ul class="mui-table-view" v-for="(item,i) in zjlist" :key="item.id">
				 <li @click="getmulu(item.link,booksid,i)" class="mui-table-view-cell" >{{item.title}}</li>
			</ul>
    </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data () {
        return {
            flag:true
        }
    },
    props:['zjlist','booksid'],
         computed: {
            ...mapState([
         'calbook'
     ])
        },
    methods:{
                // 目录倒叙
        show(){
            this.flag=!this.flag;
            this.zjlist.reverse()
        },
   
        getmulu(link,id,i){  
             this.$router.push({name:'read',params:{link,id}});
             var carbook = JSON.parse(window.localStorage.getItem('book'))
             carbook[this.calbook._id] = {
            cover: this.calbook.cover,
            flag:!this.flag,
            title: this.calbook.title,
            lastChapter:this.calbook.lastChapter,
            id: this.calbook._id,
            author:this.calbook.author,
            chapterIndexCache: i,
            bookSource: 0,
            pageIndexCache: 0,
          };
 window.localStorage.setItem('book', JSON.stringify(carbook))
        }
    }
}
</script>
<style lang="scss" scoped>
.mvlu{
        li{
            font-size: 13px;
            color: #333;
        }
        .paixu{
            p{
            display: flex;
            justify-content: space-between;
            padding: 0px 20px;
            color: #00BC79;
            font-size: 15px;
        }
        }
}
</style>
