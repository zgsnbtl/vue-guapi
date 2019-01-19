<template>
    <div>
            <div class="mvlu">
        <div class="paixu">
            <p><span>共{{zjlist.length}}章</span><span @click="show"><span v-if="flag">倒序</span><span v-else>正序</span></span></p>
        </div>
       <ul class="mui-table-view" v-for="item in zjlist" :key="item.id">
				 <router-link  class="mui-table-view-cell" :to="{name:'read',params:{link:item.link,id:booksid}}" tag="li">{{item.title}}</router-link>
			</ul>
    </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            flag:true
        }
    },
    props:['zjlist','booksid'],
    methods:{
                // 目录倒叙
        show(){
            this.flag=!this.flag;
            this.zjlist.reverse()
        },
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
