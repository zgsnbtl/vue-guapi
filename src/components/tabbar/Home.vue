<template>
  <div class="home">
    <!-- 轮播 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, i) in bookBanner" :key="i"
        ><img @click="banner(item.link)" :src="item.img" alt
      /></mt-swipe-item>
    </mt-swipe>
    <!-- 搜索 -->
    <search></search>
    <!-- 分类 -->
    <div class="con" v-for="item in bookTitle" :key="item.id">
      <p class="p1">{{ item.title }}</p>
      <mei-wen :bookListId="{ id: item._id }"></mei-wen>
      <div class="shux">
        <router-link :to="{ name: 'list', params: { id: item._id } }" tag="p">
          加载更多
          <!-- <span class="el-icon-refresh"></span> -->
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import "../../font/fonts-user";
import search from "../sub/search";
export default {
  data() {
    return {
      bookTitle: {},
      newList: {},
      bookBanner: {},
      bookList: {},
    };
  },
  components: { search },
  created() {
    this.getBook();
  },
  methods: {
    getBook() {
      // 首页分类数据
      this.$axios
        .get("/api/recommendPage/nodes/5910018c8094b1e228e5868f")
        .then((res) => {
          var arr = res.data.data;
          if (res.data.ok) {
            //  this.bookList=this.imgurl(res.data.data.book)
            this.bookTitle = arr.filter((item) => {
              //  return arrs.includes(item.order!=2);
              return item.title != "m站顶部banner";
            });
          }
        });
      this.$axios.get("/api/ranking/54d43437d47d13ff21cad58b").then((res) => {
        if (res.data.ok) {
          this.newList = this.imgurl(res.data.ranking.books.slice(8, 12));
        }
      });
      // 轮播数据
      this.$axios
        .get("/api/recommendPage/node/spread/575f74f27a4a60dc78a435a3?pl=ios")
        .then((res) => {
          if (res.data.ok) {
            this.bookBanner = res.data.data.slice(0, 5);
          }
        });
    },
    banner(id) {
      this.$router.push({ name: "book", params: { id: id } });
    },
    // 解决图片加载问题
    imgurl(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].cover = unescape(arr[i].cover);
        arr[i].cover = arr[i].cover.replace("/agent/", "");
      }
      return arr;
    },
  },
};
</script>
<style lang="scss" scope>
.home {
  .mint-swipe {
    height: 120px;
  }
  .con {
    margin-top: 10px;
  }
  .p1 {
    font-size: 13px;
    color: #333;
    border-left: 2px solid #00c98c;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  img {
    width: 100%;
  }
  .shux {
    //   border-top: 1px solid #EAEAEA;
    height: 44px;
    text-align: center;
    line-height: 44px;
    box-shadow: 0px 2px 1px #eaeaea;
    p {
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
