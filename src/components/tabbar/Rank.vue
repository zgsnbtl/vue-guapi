<template>
  <div>
    <div class="ran-k">
      <div class="rankbtn">
        <button
          @click="setSex('male')"
          :class="{ rbtn: this.rankTitle === 'male' }"
        >
          男生
        </button>
        <button
          @click="setSex('female')"
          :class="{ rbtn: this.rankTitle === 'female' }"
        >
          女生
        </button>
      </div>
    </div>
    <div class="rank">
      <section class="rank-left">
        <ul
          v-show="rankTitle === 'male'"
          v-for="item in maleRank"
          :key="item.id"
          class="mui-table-view"
        >
          <li
            @click="getRankid(item._id)"
            :class="['mui-table-view-cell', { active: item._id === rankId }]"
          >
            {{ item.shortTitle }}
          </li>
        </ul>
        <ul
          v-show="rankTitle === 'female'"
          v-for="item in femaleRank"
          :key="item.id"
          class="mui-table-view"
        >
          <li
            @click="getRankid(item._id)"
            :class="['mui-table-view-cell', { active: item._id === rankId }]"
          >
            {{ item.shortTitle }}
          </li>
        </ul>
      </section>
      <section :style="{ height: boxHeight }" class="rank-right">
        <!-- <moreBook :bookList='bookList'></moreBook> -->
        <mt-loadmore
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          :auto-fill="false"
          ref="loadmore"
        >
          <moreBook :bookList="bookList"></moreBook>
        </mt-loadmore>
      </section>
    </div>
  </div>
</template>
<script>
import moreBook from "../sub/moreBook";
import { bookRanks } from "../api/api.js";
import { Navbar } from "mint-ui";
import { bookRank } from "../api/api.js";
export default {
  data() {
    return {
      femaleRank: {},
      maleRank: {},
      rankId: "",
      rankTitle: "male",
      bookList: [],
      count: 1,
      allLoaded: false,
      boxHeight: "",
    };
  },
  props: ["appRef"],
  components: { moreBook },
  mounted() {
    // 获取当前列表的自适应高度
    const headerheight = this.appRef.header.$el.offsetHeight;
    const tabbarHeight = this.appRef.tabbar.$el.offsetHeight;
    this.boxHeight =
      document.documentElement.clientHeight - tabbarHeight + "px";
  },
  created() {
    this.getRank();
  },
  watch: {
    rankId: function () {
      this.bookList = [];
      bookRanks(this.rankId).then((res) => {
        this.bookList = res.data.ranking.books.slice(0, 15);
      });
    },
  },
  methods: {
    // 下拉加载
    loadBottom() {
      this.allLoaded = true;
      bookRanks(this.rankId).then((res) => {
        this.bookList = res.data.ranking.books.slice(0, this.count * 15 + 15);
        this.count++;
        this.allLoaded = false;
      });
    },
    getRank() {
      bookRank().then((res) => {
        if (res.data.ok) {
          this.femaleRank = res.data.female;
          this.maleRank = res.data.male;
          this.rankId = this.maleRank[0]._id;
        }
      });
    },
    // 男女分类数据的判断
    setSex(rankTitle) {
      if (rankTitle === "male") {
        this.rankTitle = rankTitle;
        this.rankId = this.maleRank[0]._id;
        console.log(this.rankId);
      } else if (rankTitle === "female") {
        this.rankTitle = rankTitle;
        this.rankId = this.femaleRank[0]._id;
      }
    },
    getRankid(id) {
      this.rankId = id;
    },
  },
};
</script>
<style lang="scss" scoped>
.ran-k {
  z-index: 100;
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
}
.rankbtn {
  display: flex;
  height: 30px;
  line-height: 30px;
  button {
    // margin: 0px 50px;
  }
  .rbtn {
    border: 1px solid #00c98c;
    color: #00c98c;
  }
}
.rank {
  display: flex;
  justify-content: space-between;
  li {
    font-size: 13px;
  }
  .rank-left {
    width: 25%;
    position: fixed;
    position: fixed;
    top: 40px;
    left: 0;
    bottom: 60px;
    background-color: #f6f7f9;
    overflow-y: scroll;
  }
  .rank-right {
    overflow: scroll;
    height: 600px;
    position: relative;
    margin: 10px 0 0px 25%;
    background-color: #fff;
    width: 75%;
  }
  .active {
    color: #00c98c;
    border-left: #00c98c 2px solid;
  }
}
</style>
