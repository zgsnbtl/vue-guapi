<template>
  <el-row type="flex" class="row-bg">
    <el-col v-for="item in bookList" :key="item.id" :span="6">
      <div class="grid-content bg-purple">
        <img :src="item.cover" alt />
        <p class="pl1">{{ item.title }}</p>
        <p class="pl2">{{ item.author }}</p>
      </div>
    </el-col>
  </el-row>
</template>
 <script>
export default {
  data() {
    return {
      bookList: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .get("/api/recommendPage/books/" + this.bookListId.id)
        .then((res) => {
          var data = res.data.data;
          if (res.data.ok) {
            this.bookList = data.map((item) => {
              return item.book;
            });
          }
        });
    },
  },
  props: ["bookListId"],
};
</script>
<style lang="scss" scoped>
.grid-content {
  margin: 0px 10px;
  background-color: #fff;
  p {
    font-size: 13px;
    color: #333;
  }
  img {
    height: 100px;
  }
  p {
    //             display: -webkit-box;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 1;
    // overflow: hidden;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .pl2 {
    color: #999;
  }
}
</style>
