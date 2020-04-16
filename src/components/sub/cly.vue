<template>
<div>
    <div class="cly" >
 
        <ul v-for="items in arr" :key="items.id" class="mui-table-view">
               <p>{{items.title}}</p>
               <div class="dliss">
                   	<router-link tag="li" :to="{name:'clylist',params:{major:item.name,gender:items.gender}}" v-for="item in items.catList" :key="item.name" class="mui-table-view-cell"><h3>{{item.name}}</h3><h3>{{item.bookCount}}本</h3></router-link>
               </div>
		
		</ul>
    </div>
    </div>
</template>
<script>
export default {
    props:['arr']
}
</script>
<style lang="scss" scoped>
.cly{
    p{
        border-left: 2px solid #00C98C;
        padding-left: 10px;
        color: #333;
        font-size: 16px;
        margin: 5px 15px 5px 3px;
    }
    .dliss{
        display: flex;
        // justify-content: space-between;
        flex-wrap: wrap;
        padding: 0px 5px;
        li{
            color: #00C98C;
             width: 29%;
             border: 1px solid #00C98C;
             border-radius: 15px;
             text-align: center;
             font-size: 13px;
             padding: 2px 1px;
             margin:  2%;
             h3{
                 font-size: 13px;
             }
             :nth-child(2){
                 font-size: 12px;
             }
        }
    }
}
</style>
