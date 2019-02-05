<template>
  <div class="fenlei">
    <ul
      v-for="(item,i) in books"
      :key="item.id"
      class="mui-table-view mui-table-view-striped mui-table-view-condensed"
    >  <span @click="getspan(item.id,i)" class="mui-icon mui-icon-trash spans"></span>
      <router-link :to="{name:'book',params:{id:item.id}}" class="mui-table-view-cell" tag="li">
        <div class="mui-table">
          <div class="mui-table-cell mui-col-xs-10">
            <img class="mui-media-object mui-pull-left" :src="item.cover" alt>
            <h4 class="mui-ellipsis">
              <span>{{item.title}}</span>
            </h4>
            <div class="cunliu">
              <h5>作者：{{item.author}}</h5>
            </div>
            <p>连载至：{{item.lastChapter}}</p>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
// import { book, bookmulu,bookrecommend } from "../api/api.js";
import { mapState, mapMutations } from "vuex";
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      books: [],
      getBook:{},
      bookstit:{}
    };
  },
  computed: {
    ...mapState(["calbook"])
  },
  created() {
    this.getbook();
  },
  methods: {
    ...mapMutations([
      'SET_BOOK'
		]),
    getbook() {
      // let bookidArray=[]
      var carbook = JSON.parse(window.localStorage.getItem("book") || "{}");
      for (let i in carbook) {
        this.books.push(carbook[i]);
      }
    },
    getspan(item,i) {
      var del = JSON.parse(window.localStorage.getItem("book") || "{}");
       MessageBox.confirm('确定要从书架中删除').then(action => {
      delete del[item]
      delete this.books[i]
  localStorage.setItem('book', JSON.stringify(del))
          window.location.reload() 
})
   },
  }
}
</script>
<style lang="scss" scoped>
.fenlei {
  margin-top: 10px;
  background-color: #fff;
  .spans{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }
  .cunliu {
    display: flex;
    justify-content: space-between;
    :nth-child(1) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    :nth-child(2) {
      font-size: 20px;
    }
  }
  .mui-ellipsis {
    display: flex;
    justify-content: space-between;
    .wordCount {
      font-size: 12px;
      color: #00c98c;
      padding-right: 5px;
    }
  }

  p {
    font-size: 13px;
    color: #333;
  }
  img {
    max-width: 66px;
    height: 70px;
  }
  .mss {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .p1 {
    font-size: 12px;
    color: #333;
    border-left: 2px solid #00c98c;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .grid-content {
    margin: 0px 10px;
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .pl2 {
      color: #999;
    }
  }
  .mui-table {
    h4 {
      color: #333;
      font-size: 14px;
    }
    p {
      font-size: 12px;
    }
  }
}
</style>
