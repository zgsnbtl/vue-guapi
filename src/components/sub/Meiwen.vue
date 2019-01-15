<template>
  <div class="fenlei">
    <!-- <h1>{{booklistid._id}}</h1> -->
    <ul
      v-for="item in booklist"
      :key="item.id"
      class="mui-table-view mui-table-view-striped mui-table-view-condensed">
      <router-link :to="{name:'book',params:{id:item._id}}" class="mui-table-view-cell" tag="li">
        <div class="mui-table">
          <div class="mui-table-cell mui-col-xs-10">
            <img class="mui-media-object mui-pull-left" :src="item.cover" alt>
            <h4 class="mui-ellipsis">{{item.title}}</h4>
            <h5>{{item.author}}</h5>
            <p class="mui-h6 mss">{{item.shortIntro}}</p>
          </div>
          <div class="mui-table-cell mui-col-xs-2 mui-text-right">
            <p class="m-p1">{{item.isSerial?'连载中':'完结'}}</p>
            <p class="m-p2">{{item.majorCate}}</p>
            <p class="m-p1">{{item.minorCate}}</p>
            <p class="m-p2">
              <span>{{item.latelyFollower>1000?parseInt(item.latelyFollower/1000)+'k':item.latelyFollower}}</span>人气
            </p>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import {bootd} from '../api/api.js'
export default {
  data() {
    return {
      booklist: []
    };
  },
  props: ["booklistid"],
  mounted() {
    this.getlist(this.booklistid.id);
  },
  methods: {
    getlist(id) {
      bootd(id).then(res => {
          var data = res.data.data;
          if (res.data.ok) {
            this.booklist = data.map(item => {
              return item.book;
            });
          }
        });
    }
  },
  watch: {
		'booklistid': 'getlist'
	}
};
</script>
<style lang="scss" scoped>
.fenlei {
  margin-top: 10px;
  background-color: #fff;
  p {
    font-size: 13px;
    color: #333;
  }
  img {
    max-width: 66px;
    height: 100px;
  }
  .mss {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .p1 {
    font-size: 12px;
    color: #333;
    border-left: 2px solid #00c98c;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .grid-content {
    margin: 0px 10px;
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .pl2 {
      color: #999;
    }
  }
  .mui-table {
    h4 {
      color: #333;
      font-size: 14px;
    }
    p {
      font-size: 12px;
    }
    .mui-text-right {
      p {
        //  display: -webkit-box;
        // -webkit-line-clamp: 1;
        // -webkit-box-orient: vertical;
        // word-break: break-all;
        // text-overflow: ellipsis;
        // overflow: hidden;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .m-p1 {
        text-align: center;
        border: 1px solid #00c98c;
        border-radius: 3px;
        display: inline-block;
        padding: 0px 3px;
        color: #00c98c;
      }
      .m-p2 {
        text-align: center;
        border: 1px solid #666;
        border-radius: 3px;
        display: inline-block;
        padding: 0px 3px;
        color: #333;
        span {
          color: #dd4f42;
        }
      }
    }
  }
}
</style>
