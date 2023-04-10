<template>
  <div>
    <!-- <h1>{{bookListId}}</h1> -->
    <moreBook
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      :bookList="bookList"
    ></moreBook>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { BOOK_PAGE } from "../store/mutationsType.js";
import { bookList, bookRecommend, getBookList } from "../api/api.js";
import moreBook from "../sub/moreBook";
export default {
  data() {
    return {
      page: 1,
      id: this.$route.params.id,
      bookListId: [],
      bookList: [],
      st:1
    };
  },
  computed: {
    ...mapState(["header"]),
  },
  components: {
    moreBook,
  },
  created() {
    // this.getList(this.id);
  },
  methods: {
    getList(id) {
      if (this.header.headType === BOOK_PAGE) {
        bookRecommend(id).then((res) => {
          if (res.status === 200) {
            this.bookList = res.data.books;
          }
        });
      } else {
        const params = {
          node: id,
          st: this.st,
          size: 10,
        };
        getBookList(params).then((res) => {
          if (res.status === 200) {
            if ( res.data.book.length===0) {
              return false
            }
            console.log("bookbookbook", res.data.book);
            this.bookList.push(...res.data.book);
            console.log(' this.bookList this.bookList this.bookList', this.bookList)
            this.st = this.st+1
            // res.data.data.forEach((item) => {
            //   this.bookList.push(item.book);
            // });
          }
        });
      }
    },
    loadMore() {
      console.log('asdadad000-=')
      this.loading = true;
      this.getList(this.id);
      // setTimeout(() => {
      //   let last = this.list[this.list.length - 1];
      //   for (let i = 1; i <= 10; i++) {
      //     this.list.push(last + i);
      //   }
      //   this.loading = false;
      // }, 2500);
    },
  },
};
</script>