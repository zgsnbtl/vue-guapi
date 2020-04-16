<template>
  <div>
    <div class="mvlu">
      <mt-header fixed :title="title.title">
        <div @click="getback" slot="left">
          <mt-button icon="back">返回</mt-button>
        </div>
        <mt-button slot="right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shudan"></use>
          </svg>
        </mt-button>
      </mt-header>
      <div class="paixu-p">
        <span>共{{zjlist.length}}章</span>
        <span @click="show">
          <span v-if="flag">倒序</span>
          <span v-else>正序</span>
        </span>
      </div>
      <div class="paixu"></div>
      <ul class="mvlu-ul" v-for="(item) in zjlist" :key="item.id">
        <li @click="getmulu((item.order-1))">{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { book, bookmulu } from "../api/api.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      zjlist: [],
      bookid: this.id,
      booksid: null,
      flag: true,
      title: {},
      aa:''
    };
  },
  computed: {
    ...mapState(["calbook"])
  },
  props: ["id"],
  created() {
    this.getmvlu();
    this.title = JSON.parse(window.localStorage.getItem("SHEFLBOOK")) || {};
  },
  methods: {
    getback() {
      // this.$router.go(-1)
      this.$emit("readshow");
    },
    // 根据书籍信息id获取目录
    getmvlu() {
      Toast("加载中");
      var list = [];
      //    书籍信息
      book(this.bookid).then(res => {
        list.push(res);
        this.aa = list[0].data[0];
        //  目录
        bookmulu(this.aa._id).then(res => {
          this.zjlist = res.data.chapters;
          this.booksid = res.data._id;
        });
      });
    },
    // 目录倒叙
    show() {
      this.flag = !this.flag;
      this.zjlist.reverse();
    },
    getmulu(i) {
      this.$emit("readshow", i);
    }
  }
};
</script>
<style lang="scss" scoped>
.mvlu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
    height: 100%;
  overflow-y: auto;
  z-index: 9999;
  background-color: #fff;
  // transform: translateX(-100%);
  // transition: transform .15s;
  .mvlu-ul{
    line-height: 24px;
    margin-left: 10px;
    li{
      line-height: 40px;
      border-bottom: 1px solid #c8c7cc;;
    }
  }
  li {
    font-size: 13px;
    color: #333;
  }
  .paixu-p {
    position: fixed;
    top: 30px;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 110;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    color: #00bc79;
    font-size: 15px;
  }
  .paixu {
    margin-top: 60px;
  }
}
</style>
