<template>
  <div class="recom">
    <ul class="mui-table-view mui-grid-view">
      <p class="recom-s"></p>
      <p class="recom-p">
        <span>同类推荐</span>
        <router-link :to="{name:'list',params:{id:recid}}" tag="span">
          更多
          <i class="mui-icon mui-icon-arrowright"></i>
        </router-link>
      </p>
      <router-link
        :to="{name:'book',params:{id:item._id}}"
        class="mui-table-view-cell mui-media mui-col-xs-4"
        v-for="(item,i) in recommentlist"
        v-if="i < 6"
        :key="item.id"
      >
        <a href="#">
          <img @click="show" class="mui-media-object" :src="item.cover|setcover">
          <div class="mui-media-body">{{item.title}}</div>
        </a>
      </router-link>
    </ul>
  </div>
</template>
<script>
import { bookrecommend } from "../api/api.js";
import { coverimg } from "../time/time.js";
export default {
  data() {
    return {
      recommentlist: {}
    };
  },
  props: ["recid"],
  created() {
    this.getcommend();
  },
  filters: {
    setcover(cover) {
      return coverimg + cover;
    }
  },
  watch: {
    "$route.params": "getcommend"
  },
  methods: {
    getcommend() {
      bookrecommend(this.$route.params.id).then(res => {
        if (res.status === 200) {
          this.recommentlist = res.data.books;
        }
      });
    },
    show() {
      //   点击刷新更新页面
      // window.location.reload()
      this.$emit("book-top");
    }
  }
};
</script>
<style lang="scss" scoped>
.recom {
  .recom-s {
    height: 5px;
  }
  .recom-p {
    border-left: 2px solid #00c98c;
    font-size: 15px;
    color: #333;
    padding-left: 15px;
    margin-left: 5px;
    display: flex;
    justify-content: space-between;
    :nth-child(2) {
      padding-right: 20px;
      color: #00c98c;
      i {
        font-size: 18px;
      }
    }
  }
  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    width: 80px;
  }
  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
    font-size: 12px;
  }
}
</style>
