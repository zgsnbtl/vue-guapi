<template>
<div>
<mumluz :zjlist="zjlist" :booksid="booksid"></mumluz>
    </div>
</template>
<script>
import {book,bookmulu} from '../api/api.js'
import mumluz from '../sub/Muluz'
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
    //   list:{},
    //   aa:'' ,
      zjlist:[],
      bookid:this.$route.params.id,
      booksid:null,
      flag:true
        }
    },
    components:{mumluz},
    created(){
   this.getmvlu();
//    this.selectlistid()
    },
    // props:['zjlist'],
    methods:{
        // 根据书籍信息id获取目录
        getmvlu(){
             Toast('加载中');
           var  list=[];
        //    书籍信息
           book(this.bookid).then(res=>{
             list.push(res);
                 this.aa=list[0].data[0]
                //  目录
                 bookmulu(this.aa._id).then(res=>{
                   this.zjlist= res.data.chapters
                   this.booksid=res.data._id
                   console.log(this.booksid)
                 })
        })
        },

        // selectlistid(){
        //   this.$emit('select-list',this.zllist.id)
        // }
    }
}
</script>
<style lang="scss" scoped>

</style>
