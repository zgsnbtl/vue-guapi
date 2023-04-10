<template>
  <div class="clyList">
    <div
      class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
    >
      <div class="mui-scroll">
        <a
          @click="setList(item.value)"
          v-for="(item, i) in typeList"
          :key="item.name"
          :class="['mui-control-item', i === 0 ? 'mui-active' : '']"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div
      v-show="mins.length > 0"
      class="clss mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
    >
      <div class="mui-scroll">
        <a
          @click="setLists(item, i)"
          v-for="(item, i) in mins"
          :key="i"
          :class="['mui-control-item', i === 0 ? 'mui-active' : '']"
          >{{ item }}</a
        >
      </div>
    </div>
    <!-- 下拉加载 minui 需要添加这个参数:auto-fill="false"-->
    <div ref="load" :style="{ height: boxHeight }" class="mt">
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        ref="loadmore"
      >
        <moreBook :isLoadMore="isLoadMore" :bookList="clyList"></moreBook>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
import { Toast, instance } from "mint-ui";
import { bookClyInfo, bookClyList } from "../api/api.js";
import moreBook from "../sub/moreBook";
export default {
  data() {
    return {
      gender: this.$route.params.gender,
      major: this.$route.params.major,
      type: "hot",
      minor: "",
      start: 0,
      limit: 15,
      boxHeight: "",
      clyList: {},
      allLoaded: false,
      isLoadMore: false,
      typeList: [
        {
          value: "hot",
          name: "热门",
        },
        {
          value: "new",
          name: "新书",
        },
        {
          value: "reputation",
          name: "好评",
        },
        {
          value: "over",
          name: "完结",
        },
        {
          value: "monthly",
          name: "包月",
        },
      ],
      mins: [],
    };
  },
  props: ["appRef"],
  components: { moreBook },
  mounted: function () {
    this.mui(".mui-scroll-wrapper").scroll({
      //mui 滑块
      deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      scrollX: true,
      indicators: true,
      scrollY: false,
    });
    // 获取当前列表的自适应高度
    const headerheight = this.appRef.header.$el.offsetHeight;
    const tabbarHeight = this.appRef.tabbar.$el.offsetHeight;
    this.boxHeight =
      document.documentElement.clientHeight - tabbarHeight + "px";
  },
  created() {
    // this.gender=this.$route.params.gender;
    // this.major=this.$route.params.major,
    //  this.getClyList(this.gender, this.type, this.major, minor = "", start = 0, limit = 20)
  },
  methods: {
    setList(item) {
      if (this.type === item) {
        return;
      }
      this.type = item;
      this.getClyList(this.gender, this.type, this.major, this.minor);
      //点击后重置滚动距离
      this.$refs.load.scrollTop = 0;
    },
    //   点击列表获取分类书籍
    setLists(item, i) {
      if (this.minor === item) {
        return;
      }
      if (item === "" || item === "全部") {
        this.minor = "";
      } else {
        this.minor = item;
      }
      this.start = 1;
      this.getClyList(this.gender, this.type, this.major, this.minor);
      //点击后重置滚动距离
      this.$refs.load.scrollTop = 0;
    },
    // 获取书籍数据
    getClyList(gender, type, major, minor = "", start = 0, limit = 20) {
      bookClyInfo(gender, type, major, minor, start, limit).then((res) => {
        this.clyList = res.data.books;
      });
    },
    // 加载更多
    loadBottom() {
      this.isLoadMore = true;
      Toast({ message: "加载中", iconClass: "mui-spinner", duration: 500 });
      bookClyInfo(
        this.gender,
        this.type,
        this.major,
        this.minor,
        this.start * 15,
        15
      ).then((res) => {
        if (res.data.ok) {
          this.clyList = this.clyList.concat(res.data.books);
          this.isLoadMore = true;
          // setTimeout(()=>{

          //      instance.close();
          // },350);
          this.start++;
        }
      });
      this.$refs.loadmore.onBottomLoaded();
    },
    loadTop() {
      // 下拉加载
      bookClyInfo(this.gender, this.type, this.major, this.minor, 0, 15).then(
        (res) => {
          if (res.data.ok) {
            this.clyList = res.data.books;
          }
        }
      );
      this.$refs.loadmore.onTopLoaded();
    },
  },
  beforeRouteEnter(to, from, next) {
    //   获取大类中的小类
    next((vm) => {
      bookClyList().then((res) => {
        res.data[vm.$route.params.gender].forEach((item) => {
          if (item.major === vm.$route.params.major) {
            vm.mins = item.mins;
            if (item.mins.length > 0) {
              vm.mins.unshift("全部");
            }
          }
        });
      });
      vm.getClyList(vm.$route.params.gender, vm.type, vm.$route.params.major);
    });
  },
};
</script>
<style lang="scss" scoped>
.clyList {
  .mt {
    overflow: scroll;
    // height: 600px;
  }
  .clss {
    border-top: 1px solid #f0f0f0;
  }
  * {
    touch-action: pan-y;
  }
  .mui-scroll {
  }
}
.mui-segmented-control.mui-segmented-control-inverted
  .mui-control-item.mui-active-active {
  color: #00c98c;
}
</style>
