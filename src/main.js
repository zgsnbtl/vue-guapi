import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './components/store/index'
// import './api/api.js'
// 应用mintui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './font/fonts.js'
import './font/fonts.css'
// mui
import './components/lib/mui/css/mui.css'
import mui from './components/lib/mui/js/mui.min.js'
import './components/lib/mui/fonts/mui.ttf'
// 全局组件
import fenlei from './components/sub/Fenlei.vue'
import meiwen from './components/sub/Meiwen.vue'
// axios
import axios from 'axios'
axios.defaults.headers.post['Content-type'] = 'application/json'
Vue.prototype.$axios = axios
Vue.prototype.mui = mui
Vue.component('fen-lei', fenlei)
Vue.component('mei-wen', meiwen)
<<<<<<< HEAD
=======
// Vue.use(ElementUI)
>>>>>>> 684ecf1d1c5b0e1f4e2fae3ab86d42503616ef05
Vue.use(Mint)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
