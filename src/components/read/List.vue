<template>
  <div>
    <!-- <h1>{{bookListId}}</h1> -->
    <moreBook :bookList="bookList"></moreBook>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { BOOK_PAGE } from "../store/mutationsType.js";
import { bookList, bookRecommend } from "../api/api.js";
import moreBook from "../sub/moreBook";
export default {
  data() {
    return {
      page: 1,
      id: this.$route.params.id,
      bookListId: [],
      bookList: [],
    };
  },
  computed: {
    ...mapState(["header"]),
  },
  components: {
    moreBook,
  },
  created() {
    this.getList(this.id);
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
        bookList(id, this.page).then((res) => {
          if (res.data.data.length === 0) {
            return [];
          }
          if (res.status === 200) {
            res.data.data.forEach((item) => {
              this.bookList.push(item.book);
            });
          }
        });
      }
    },
  },
};
</script>