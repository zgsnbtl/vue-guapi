<template>
  <div>
    <cly :arr="arr"></cly>
  </div>
</template>
<script>
import cly from "../sub/cly";
import { bookCly } from "../api/api.js";
export default {
  data() {
    return {
      bookCly: [],
      arr: [],
    };
  },
  components: {
    cly,
  },
  created() {
    this.getBookfly();
  },
  methods: {
    getBookfly() {
      bookCly().then((res) => {
        var data = res.data;
        if (res.status === 200) {
          //通过for of 重新遍历数组
          for (let [key, value] of Object.entries(data)) {
            // Object.entries方法返回一个数组
            let obj = null;
            if (key == "male") {
              obj = {
                title: "男生",
                gender: "male",
                catList: value,
              };
            } else if (key === "female") {
              obj = {
                title: "女生",
                gender: "female",
                catList: value,
              };
            } else if (key === "press") {
              obj = {
                title: "出版",
                gender: "press",
                catList: value,
              };
            }
            if (obj !== null) {
              this.arr.push(obj);
            }
          }
        }
      });
    },
  },
};
</script>