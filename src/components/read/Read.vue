<template>
  <div ref='dvtop' @click="getshow" class="read" :style="{backgroundColor:getcolor.background}">
    <div v-if="datashow" class="readheader">
      <span @click="getspan" class="mui-icon mui-icon-arrowleft read-span"></span>
      <span class="readspan">{{getBook.title}}</span>
      <span @click="gethuanyuan" class="readspan">换源</span>
    </div>
    <div  v-if="datashow" @click.stop="getsj" class="readheaders">{{getshujia?'加入书架':'撤出书架'}}</div>
    <div v-if="datashow" class="readbottom">
      <ul class="readbottom-color">
        <li v-for="(item,i) in datacolor" @click.stop="setcolor(item)" 
        :class="{'mui-icon mui-icon-checkmarkempty':item.background===getcolor.background}" :style="{backgroundColor:item.background}" :key="i"></li>
      </ul>
           <div class="readbottom-dv">
                   <p @click.stop="setfont('red')" class="readbottom-font">A-</p>
                         <p @click="gethuanyuan" class="read-ss">换源</p>
                           <p @click.stop="setfont('add')" class="readbottom-font">A+</p>
              </div>
      <div class="readbottom-dv">
  
        <p @click.stop="before" class="readbottom-font">阅读上一章</p>
        <p class="read-ss" @click.stop='getmulushow'>目录</p>
        <p @click.stop="page" class="readbottom-font">阅读下一章</p>

      </div>
    </div>
    <!-- <h3>{{booktitle}}</h3> -->
    <!-- <div v-for="item in con" :key="item.id"> -->
      <div>
      <h1 class="read-h1">{{con.title}}</h1>
      <div  v-for="(item,i) in con.cpContent" :key="i">
        <p class="read-text" :style="{ fontSize: getfonts + 'px' }" v-html="item"></p>
      </div>
      </div>
    <!-- </div> -->
    <div class="btn">
       <mt-button type="danger" size="small" @click.stop="before" plain>阅读上一章</mt-button>
       <div style="margin:0px 10px;"></div>
      <mt-button type="danger" size="small" @click.stop="page" plain>阅读下一章</mt-button>
    </div>
    <div class="read-hy" @click="gethuanyuan" v-show="datahy">
<div class="mui-card" style="margin-bottom: 35px;">
				<ul class="mui-table-view">
					<li @click.stop="gethy(item,i)" v-for="(item,i) in bookhylist" :key="i" class="mui-table-view-cell">
						<a :class="['mui-navigate-right',{'active':hyindex===i}]">
              <!-- <a :class="{'active':hyindex===i}"> -->
							{{item.name}}
               <p :class="['yh-p',{'active':hyindex===i}]">最后更新：{{item.lastChapter}}</p>
						</a>
           
					</li>
				</ul>
			</div>
      </div>
      <!-- 目录 -->
<mulu :id="id" v-show="show" :booktitle='booktitle' @readshow='readshows'></mulu>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { MessageBox } from "mint-ui";
import mulu from '../read/Mvlu'
import { bookcontent, bookmulu,bookhy } from "../api/api.js";
import { Toast } from "mint-ui";
export default {
  components:{mulu},
  data() {
    return {
      con: [],
      id: this.$route.params.id,
      link: this.$route.params.link,
      flags: false,
      datashow: false,
      show:false,
      iss: "0",
      booklinkss: [],
      booktitle: [],
      getBook: {},
      datacolor:[{
        background: '#c4b395'
      },
      {
        background: '#c3d4e6'
      },
      {
        background: '#c8e8c8'
      },
      {
        background: '#F8C9C9'
      },
      {
        background: '#3E4349'
      }],
      getfonts:12,
      getcolor:{},
      datahy:false,
      bookhylist:{},
      hyindex:0,
      getshujia:null
    };
  },
  computed: {
    ...mapState(["shuajiabook", "calbook","usercolor","userfont"]),
    
  },
  destroyed() {
    this.getread(true);
  },
  watch:{
    'route':'getbookhy'
  },
  created() {
    this.getfonts = JSON.parse(window.localStorage.getItem("BOOK_USERFONT"))||14; //字体
    this.getcolor = JSON.parse(window.localStorage.getItem("BOOK_USERCOLOR")||'{}'); //背景颜色
    this.getBook = JSON.parse(window.localStorage.getItem("SHEFLBOOK")); // 书籍信息
    this.getshujia = JSON.parse(window.localStorage.getItem("BOOK_UPDATE")); //是否加入书架
    // this.getmulu(this.$route.params.id);
    // this.getcontent();
    console.log(this.booktitle)
    this.getread(false);
    this.getbookhy(this.getBook._id) // 换源
    if(this.$route.params.show){
      this.show=true
    }
  },
  methods: {
    ...mapMutations({
      setbook: "BOOK_UPDATE",
      setcolors: "BOOK_USERCOLOR",
      setfonts: "BOOK_USERFONT"
    }),
    getread(data) {
      this.$emit("fangfa", data);
    },
    getsj(){ // 阅读页面加入书架
      // this.getshujia=!this.getshujia
      // this.setbook(this.getshujia);
       if(this.getshujia){
          MessageBox.confirm("是否要加入书架")
          .then(action => {
            this.getshujia=!this.getshujia
            this.getBooks()
            this.setbook(false);
            this.getBookindex();
          })
          .catch(() => {
          this.getDelbook();
            this.getshujia=this.getshujia
            this.setbook(true);
          });
       }else{
         this.getDelbook();
          this.getshujia=true
          this.setbook(true);
       }
    },
    // 缓存阅读章节索引方法
    getBookindex(){
      var bookindex = JSON.parse(window.localStorage.getItem("bookindex") || "{}");
       bookindex[this.getBook._id]={
              bookindex:this.iss
        }
      window.localStorage.setItem("bookindex", JSON.stringify(bookindex));
    },
    // 缓存加入书架图书信息方法
    getBooks(){
        var carbook = JSON.parse(window.localStorage.getItem("book")||'{}');
         carbook[this.getBook._id] = {
              cover: this.getBook.cover,
              flag: !this.flag,
              title: this.getBook.title,
              lastChapter: this.getBook.lastChapter,
              id: this.getBook._id,
              author: this.getBook.author,
              bookSource: 0,
              pageIndexCache: 0
            };
         window.localStorage.setItem("book", JSON.stringify(carbook));
    },
    // 删除图书缓存方法
    getDelbook(){
       var carbook = JSON.parse(window.localStorage.getItem("book")||'{}');
      delete carbook[this.getBook._id];
            window.localStorage.setItem("book", JSON.stringify(carbook));
    },
    getspan() { // 加入书架将阅读章节位置数据缓存和图书缓存
      if (!this.shuajiabook) {
        this.$router.go(-1);
        this.getBookindex();
      } else {
        MessageBox.confirm("是否要加入书架")
          .then(action => {
            this.$router.go(-1);
            this.getBooks();
            this.setbook(false);
            this.getBookindex();
          })
          .catch(() => {
            this.$router.go(-1);
            this.getDelbook()
            this.setbook(true);
          });
      }
    },
    // 目录显示隐藏 切换  
    readshows(data){
      this.show=false;
      this.iss=data
      this.getBookindex();
      this.getcontent(this.booklinkss[this.iss]);
      this.$refs.dvtop.scrollTop=0;
    },
    getmulushow(){
      this.show=!this.show
    },
    getmulu(id) {
      //  目录
     this.booklinkss=[]
     this.booktitle=[] //push后数据叠加 现将数组数据清空
     var bookindexs = JSON.parse(window.localStorage.getItem("bookindex") || "{}");//章节位置
      var carbook = JSON.parse(window.localStorage.getItem("book"));
      // var booklinks = [];
      bookmulu(id).then(res => {
        //   将目录中的标题和链接拿出来
        res.data.chapters.forEach(item => {
          // this.booklinkss.splice(0,item.link.length);
          this.booklinkss.push(encodeURIComponent(item.link));
          this.booktitle.push(item.title);
          // console.log(this.booklinkss)
        });
        this.iss =
          bookindexs && bookindexs[this.getBook._id]
            ? bookindexs[this.getBook._id].bookindex
            : this.iss;
        this.getcontent(this.booklinkss[this.iss]);
      });
    },
    getcontent(link) {
        //  Toast('加载中')
      var content = [];
      // 获取内容
      bookcontent(link).then(res => {
        if (res.status === 200) {
          var datas = res.data.chapter;
        // datas.forEach((item,i)=>{
        //     item.title=this.booktitle[this.iss]
        //   })
          content.push({
            cpContent: datas.isVip
              ? ["vip章节，请点击换源即可免费阅读"]
              : datas.cpContent?datas.cpContent.split('\n'):datas.body.split('\n'),
            title:datas.title='.'? this.booktitle[this.iss]:datas.title
          });
          var cont = content[0];
          // this.con = this.con.concat(cont); //  将上一章的内容拼接到下一章中
          this.con=cont
        }
      });
    },
    // 加载上一章
    before(){
       this.$refs.dvtop.scrollTop=0;
         // 缓存章节数据
         if(this.iss<=0){
           this.iss=0
            Toast('已经是第一章了')
         }else{
           this.iss--
         }
      this.getBookindex();
       this.getmulu(this.bookhylist[this.hyindex]._id);
    },
    // 点击加载下一章
    page() {
  
      this.$refs.dvtop.scrollTop=0;
      // 缓存章节数据
      if(this.iss>=this.booktitle.length-1){
        this.iss=this.booktitle.length-1
        Toast('已经是最后一章了')
      }else{
        this.iss++
      }
      this.getBookindex()
      this.getmulu(this.bookhylist[this.hyindex]._id);
    },
    getshow() {
      this.datashow = !this.datashow;
    },
    // 字体设置
    setfont(fonts){
     if(fonts==='red'){
       if(this.getfonts<=10){
         return
       }else{
         this.getfonts--
         this.setfonts(this.getfonts)
       }
     }
     if(fonts==='add'){
       if(this.getfonts>=26){
         return
       }else{
        this.getfonts++
         this.setfonts(this.getfonts)
       }
     }
    },
    // 背景颜色
    setcolor(color){
     this.setcolors(color)
     this.getcolor = JSON.parse(window.localStorage.getItem("BOOK_USERCOLOR")); 
    },
    // 换源
    gethuanyuan(){
      this.datahy=!this.datahy
    },
    getbookhy(id){
      bookhy(id).then(res=>{
        this.bookhylist=res.data
         this.getmulu(this.bookhylist[0]._id)
      })
    },
    gethy(item,i){
     this.hyindex=i
     this.getmulu(this.bookhylist[this.hyindex]._id);
      this.datahy=!this.datahy
    }
  },
  beforeRouteEnter(to, from, next){
     var carbook = JSON.parse(window.localStorage.getItem("book") || "{}");
      next(vm => {
        if (!carbook[vm.getBook._id]) {
          // vm.tryRead();
        }
        vm.getbookhy(vm.getBook._id);
        // vm.getmulu(vm.$route.params.id);
      })

    }
};
</script>
<style lang="scss" scoped>
.read {
  overflow-y: auto;
  z-index: 101;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #c4b395;
  padding: 20px;
  line-height: 24px;
  letter-spacing: 2px;
      .read-h1{
      font-size: 20px;
    }
  .readheader {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 35px;
    background-color: rgba($color: #000000, $alpha: 0.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 6px;
    :nth-child(1) {
      font-size: 20px;
      color: #fff;
    }
    .readspan {
      color: #fff;
      font-size: 12px;
    }
  }
  .readheaders{
    position: fixed;
    top: 40px;
    right: 0;
     background-color: rgba($color: #000000, $alpha: 0.7);
     font-size: 14px;
     color: #fff;
     padding: 0px 5px;
     border-radius: 5px 0px 0px 5px;
  }
  .readbottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 110;
    background-color: rgba($color: #000000, $alpha: 0.7);
    .mui-icon{
      display: flex;
      justify-content: center;
      align-items: center;
    }
.readbottom-color{
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin-bottom: 20px;
  li{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
    .readbottom-dv {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .readbottom-ml {
        color: #fff;
        text-align: center;
        font-size: 14px;
      }
      .read-ss{
        color: #fff;
      }
      .readbottom-font {
        border: 1px solid #fff;
        padding: 5px 20px;
        border-radius: 3px;
        color: #fff;
      }
    }
  }
  h1 {
    font-size: 16px;
    color: #222;
  }
  .read-text {
    color: #222;
    text-indent: 2em;
  }
  .btn {
    display: flex;
    justify-content: center;
  }
  .read-hy{
    position: fixed;
  left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba($color: #000000, $alpha: 0.7);
    .mui-card{
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%,-50%);
     width: 80%;
     max-height: 60%;
     overflow-y: auto;
     .yh-p{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
     }
    }
  }
  .active{
    color: #00C98C;
  }
}
</style>
