<template>
  <div>
    <div class="mvlu">
      <mt-header fixed :title="title.title">
        <div @click="getBack" slot="left">
          <mt-button icon="back">返回</mt-button>
        </div>
        <mt-button slot="right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shudan"></use>
          </svg>
        </mt-button>
      </mt-header>
      <div class="paixu-p">
        <span>共{{ list.length }}章</span>
        <span @click="show">
          <span v-if="flag">倒序</span>
          <span v-else>正序</span>
        </span>
      </div>
      <div class="paixu"></div>
      <ul class="mvlu-ul" v-for="item in list" :key="item.id">
        <li @click="onCatalogue(item.order - 1)">{{ item.title }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { book, bookCatalogue } from "../api/api.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      list: [],
      bookId: this.id,
      booksId: null,
      flag: true,
      title: {},
      aa: "",
    };
  },
  computed: {
    ...mapState(["calbook"]),
  },
  props: ["id"],
  created() {
    console.log("???????????????");
    this.getCatalogue();
    this.title = JSON.parse(window.localStorage.getItem("SHEFLBOOK")) || {};
  },
  methods: {
    getBack() {
      this.$emit("readShow");
    },
    // 根据书籍信息id获取目录
    getCatalogue() {
      Toast("加载中");
      var list = [];
      //    书籍信息
      book(this.bookId).then((res) => {
        list.push(res);
        this.aa = list[0].data[0];
        //  目录
        bookCatalogue(this.aa._id).then((res) => {
          this.list = res.data.chapters;
          this.booksId = res.data._id;
        });
      });
    },
    // 目录倒叙
    show() {
      this.flag = !this.flag;
      this.list.reverse();
    },
    onCatalogue(i) {
      this.$emit("readShow", i);
    },
  },
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
  .mvlu-ul {
    line-height: 24px;
    margin-left: 10px;
    li {
      line-height: 40px;
      border-bottom: 1px solid #c8c7cc;
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
