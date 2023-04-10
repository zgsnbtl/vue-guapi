<template>
  <div>
    <section class="searchs"><search @setsearch="show"></search></section>
    <section ref="load" :style="{ height: boxHeight }" class="boxs">
      <!-- <moreBook :bookList='bookList'></moreBook> -->
      <mt-loadmore
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        ref="loadmore"
      >
        <moreBook :bookList="search"></moreBook>
      </mt-loadmore>
    </section>
  </div>
</template>
<script>
import { bookSearch } from "../api/api.js";
import search from "../sub/search";
import moreBook from "../sub/moreBook";
export default {
  data() {
    return {
      value: this.$route.params.val,
      search: [],
      count: 1,
      allLoaded: false,
      boxHeight: "",
    };
  },
  props: ["appref"],
  mounted() {
    // 获取当前列表的自适应高度
    const headerheight = this.appref.header.$el.offsetHeight;
    const tabbarHeight = this.appref.tabbar.$el.offsetHeight;
    this.boxHeight =
      document.documentElement.clientHeight - tabbarHeight + "px";
    console.log(this.boxHeight);
  },
  created() {
    this.getSearch();
    console.log(this.value);
  },
  watch: {
    $route: function () {
      bookSearch(this.value).then((res) => {
        this.search = res.data.books.slice(0, 15);
        console.log(this.search);
        //点击后重置滚动距离
        this.$refs.load.scrollTop = 0;
      });
    },
  },
  components: { search, moreBook },
  methods: {
    getSearch() {
      bookSearch(this.value).then((res) => {
        res.data.keywords.map((item) => {
          item._id = item.id;
        });
        this.search = res.data.keywords.slice(0, 15);
        //点击后重置滚动距离
        this.$refs.load.scrollTop = 0;
      });
    },
    show(data) {
      this.value = data;
    },
    // 下拉加载
    loadBottom() {
      this.allLoaded = true;
      bookSearch(this.value).then((res) => {
        if (this.search.length === res.data.books.length) {
          this.allLoaded = false;
        }
        this.search = res.data.books.slice(0, this.count * 15 + 15);
        this.count++;
        this.allLoaded = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.searchs {
  position: fixed;
  width: 100%;
  top: 25px;
  z-index: 100;
}
.boxs {
  margin-top: 60px;
  overflow-y: scroll;
}
</style>
