<template>
<el-row type="flex" class="row-bg" >
  <el-col v-for="item in booklist" :key="item.id" :span="6">
    <div class="grid-content bg-purple">
      <img :src="item.cover" alt>
      <p class="pl1">{{item.title}}</p>
      <p class="pl2">{{item.author}}</p>
    </div>
  </el-col>
    </el-row>
</template>
 <script>
export default {
  data() {
    return {
      booklist:{}
    }
  },
  created(){
   this.getlist()
  },
  methods:{
   getlist(){
      this.$axios.get('/api/recommendPage/books/'+this.booklistid.id).then(res=>{
           var data=res.data.data
          //  console.log(data)
           if(res.data.ok){
            //  this.booklist=this.imgurl(res.data.data.book)
            this.booklist=data.map(item=>{
              return item.book
            })
              //  console.log("00000"+this.booklist)
           }
        });
   }
  },
  props: ["booklistid"]
};
</script>
<style lang="scss" scoped>
.grid-content {
  margin: 0px 10px;
  background-color: #fff;
  p {
    font-size: 13px;
    color: #333;
  }
  img {
    height: 100px;
  }
  p {
    //             display: -webkit-box;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 1;
    // overflow: hidden;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .pl2 {
    color: #999;
  }
}
</style>
