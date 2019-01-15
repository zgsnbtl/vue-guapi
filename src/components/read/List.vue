<template>
    <div>
        <!-- <h1>{{booklistid}}</h1> -->
        <lmeiwen :booklist="booklist"></lmeiwen>
    </div>
</template>
<script>
import {bookList} from '../api/api.js'
import lmeiwen from '../sub/Lmeiwen'
export default {
    data () {
        return {
            page:1,
            id:this.$route.params.id,
            booklistid:[],
            booklist:[]
        }
    },
    components:{
        lmeiwen
    },
    created(){
     this.getlist(this.id)
    },
    methods:{
       getlist(id){
           bookList(id,this.page).then(res=>{
              console.log(res) 
              if (res.data.data.length === 0) {
							return [];
			}
             if(res.status===200){
                  console.log(res) 
                 res.data.data.forEach(item => {
                     this.booklist.push(item.book)
                 });
                //   this.booklistid=res.data.data[0].book   
                   console.log(this.booklist) 
             }           
           })
       }
    }
}
</script>