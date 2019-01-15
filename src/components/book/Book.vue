<template>
  <div class="book">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;" class>
          <img class="mui-media-object mui-pull-left" :src="books.cover">
          <div class="mui-media-body">
            {{books.title}}
            <p class="mui-ellipsis">
              <span>{{books.author}}</span>
              <span class="span2">{{books.cat}}</span>
              <span>{{wordCount}}字</span>
            </p>
            <p>
              <span>{{books.isSerial?'连载中':'完结'}}</span>
              <span>{{books.minorCateV2}}</span>
            </p>
          </div>
        </a>
        <!-- 加入书架阅读 -->
        <yuedu :booklinks="aa"></yuedu>
      </li>
    </ul>

    <ul class="mui-table-view mui-grid-view">
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <div class="mui-media-body">
          <p>追人气</p>
        </div>
        <div class="mui-media-body">
          <p class="body-p">{{latelyFollower}}</p>
        </div>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <div class="mui-media-body">
          <p>读者留存率</p>
        </div>
        <div class="mui-media-body">
          <p class="body-p">{{books.retentionRatio}}%</p>
        </div>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <div class="mui-media-body">
          <p>日更新字数/天</p>
        </div>
        <div class="mui-media-body">
          <p class="body-p">{{books.serializeWordCount}}</p>
        </div>
      </li>
    </ul>
    <!--  -->
    <div class="long" @click="el">
      <p class="pop" ref="pl">{{books.longIntro}}</p>
      <span ref="span" :flag="flag" class="mui-icon mui-icon-arrowdown"></span>
    </div>
    <!-- 目录 -->
    <div>
      <router-link :to="{name:'mvlu',params:{id:this.books._id}}" class="mulu" tag="p">
        <span>目录</span>
        <span>{{ books.updated | formatDate }}</span>
        <span>{{books.lastChapter}}</span>
      </router-link>
    </div>
    <!-- 评论 -->
    <pinglun :plid="books._id"></pinglun>
  </div>
</template>
<script>
import { formatDate } from "../time/time.js";
import yuedu from "../sub/Yuedu";
import pinglun from "../sub/Pinglun";
import { book, bookmulu } from "../api/api.js";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      books: {},
      flag: true,
      limit: 5,
      // zjlist: {},
      aa:'',
      booklinks:[],
      booktitle:[]
    };
  },
  components: {
    pinglun,
    yuedu
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  created() {
    this.getlist();
    this.getbook();
    // this.getmulu();
  },
  computed: {
    wordCount() {
      return this.books.wordCount > 10000
        ? parseInt(this.books.wordCount / 10000) + "万"
        : this.books.wordCount;
    },
    latelyFollower() {
      return this.books.latelyFollower > 1000
        ? parseInt(this.books.latelyFollower / 1000) + "k"
        : this.books.latelyFollower;
    }
  },
  methods: {
    getlist() {
      Toast('加载中');
      this.$axios.get("/api/book/" + this.$route.params.id).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.books = this.imguRl(res.data);
          this.getbook(this.books._id);
        }
      });
    },
    getbook(id) {
      // 根据书籍信息id获取目录
      var list = [];
      //    书籍信息
      book(id).then(res => {
            //  console.log(res);
   for (let i = 0; i < res.data.length; i++) {          
        list.push(res.data[i]._id);
        this.aa =list[0];
                // console.log( this.aa);
        // this.getmulu(this.aa)
   }
      });
    },
    // getmulu(id) {
    //   //  目录
    //   // var arr=[];
    //   bookmulu(id).then(res => {
    //     console.log(res)
    //     for(let i=0;i<res.data.chapters.length; i++){
    //       this.booktitle.push(res.data.chapters[i].title);
    //       this.booklinks.push(encodeURIComponent(res.data.chapters[i].link))
    //       // this.booklinks.push({titlt:res.data.chapters[i].title,link:encodeURIComponent(res.data.chapters[i].link)})
    //       // console.log(this.booklinks)
    //     // this.zjlist = res.data.chapters;
    //     // console.log(arr);
    //     }
    //   });
    // },
    imguRl(arr) {
      arr.cover = unescape(arr.cover);
      arr.cover = arr.cover.replace("/agent/", "");
      return arr;
    },
    el() {
      if (this.flag) {
        this.$refs.pl.className = "";
        this.$refs.span.className = "mui-icon mui-icon-arrowup";
        this.flag = false;
      } else {
        this.$refs.pl.className = "pop";
        this.$refs.span.className = "mui-icon mui-icon-arrowdown";
        this.flag = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.book {
  .mui-table-view {
    .mui-media-body {
      font-size: 14px;
    }
    img {
      max-width: 64px;
      height: 100px;
    }
    .span2 {
      border-right: 1px solid #666;
      border-left: 1px solid #666;
      padding: 0px 5px;
    }
    span {
      font-size: 12px;
      color: #666;
      margin-right: 5px;
    }
  }
  .body-p {
    color: #333;
  }
  .long {
    padding: 10px;
    p {
      color: #333;
      font-size: 12px;
    }
    .pop {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    span {
      margin-top: -25px;
      display: flex;
      justify-content: flex-end;
    }
  }
  .mulu {
    padding: 10px;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    :nth-child(1) {
      font-size: 14px;
      color: #333;
    }
    :nth-child(2) {
      padding: 0px 10px;
    }
  }
}
</style>
