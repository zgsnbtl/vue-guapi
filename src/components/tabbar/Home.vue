<template>
  <div class="home">
    <!-- 轮播 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, i) in bookBanner" :key="i"
        ><img @click="goBanner(item.link)" :src="item.img" alt
      /></mt-swipe-item>
    </mt-swipe>
    <!-- 搜索 -->
    <search></search>
    <!-- 分类 -->
    <div class="con" v-for="item in newList" :key="item.id">
      <p class="p1">{{ item.title }}</p>
      <mei-wen :bookListId="{ id: item._id }"></mei-wen>
      <div class="shux">
        <router-link :to="{ name: 'list', params: { id: item._id } }" tag="p">
          加载更多
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import "../../font/fonts-user";
import search from "../sub/search";
import { getBanner, update, info } from "../api/api.js";
export default {
  data() {
    return {
      bookTitle: {},
      newList: [
        {
          _id: "ce7c9687a995458d8be640adc749afce",
          title: "都市情缘",
        },
        {
          _id: "a973be5595e94841a15ca3764c93a111",
          title: "古色古香",
        },
        {
          _id: "b0a1def6f18c475d909d43924aea8777",
          title: "玄幻魔法",
        },
        {
          _id: "9f4ea00db3a04637b5b8c30e4c5986df",
          title: "小众精品",
        },
        {
          _id: "3276f21329404640a8d542679286ebd8",
          title: "重磅推荐，不可错过",
        },
        {
          _id: "af9f96a23d0f44649057266a16eeb13d",
          title: "都市休闲，精品好书",
        },
        {
          _id: "81bf66de04664d7480ca0036567fd328",
          title: "热血玄幻，王者归来",
        },
        {
          _id: "9bb738775d6146b5a1bd42f274f98832",
          title: "奇闻推理，科幻末世",
        },
        {
          _id: "b7115776e58c43419f4e69820bea2ac6",
          title: "小众冷门，大胆尝鲜",
        },
      ],
      bookBanner: {},
      bookList: {},
    };
  },
  components: { search },
  created() {
    this.getBook();
    this.updateBook();
  },
  methods: {
    async getBook() {
      const data = await getBanner();
      this.bookBanner = data.data.data;
    },
    goBanner(id) {
      this.$router.push({ name: "book", params: { id: id } });
    },
    // 解决图片加载问题
    imgUrl(arr) {
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
