import Vue from 'vue'
import Router from 'vue-router'
// import Home from './components/tabbar/Home.vue'
// import Classify from './components/tabbar/Classify.vue'
// import Rank from './components/tabbar/Rank.vue'
// import Bookrack from './components/tabbar/Bookrack.vue'
// import Book from './components/book/Book.vue'
// import Read from './components/read/Read.vue'
// import Mvlu from './components/read/Mvlu.vue'
// import List from './components/read/List.vue'
// import Clylist from './components/read/Clylist.vue'
// import Search from './components/read/Search-list.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: resolve => require(['./components/tabbar/Home'], resolve)
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['./components/tabbar/Home'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/classify',
      name: 'classify',
      component: resolve => require(['./components/tabbar/Classify'], resolve)
    },
    {
      path: '/rank',
      name: 'rank',
      component: resolve => require(['./components/tabbar/Rank'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/bookrack',
      name: 'bookrack',
      component: resolve => require(['./components/tabbar/Bookrack'], resolve)
    },
    {
      path: '/book:id',
      name: 'book',
      // component: Book,
      component: resolve => require(['./components/book/Book'], resolve),
      meta: {
        keepAlive: true // 缓存
      }
    },
    {
      path: '/read:id',
      name: 'read',
      component: resolve => require(['./components/read/Read'], resolve)
    },
    {
      path: '/list:id',
      name: 'list',
      component: resolve => require(['./components/read/List'], resolve)
    },
    {
      path: '/clylist/:major:gender',
      name: 'clylist',
      component: resolve => require(['./components/read/Clylist'], resolve)
      // meta: {
      //   keepAlive: true // 缓存
      // }
    },
    {
      path: '/search:val',
      name: 'search',
      component: resolve => require(['./components/read/Search-list'], resolve)
    },
    {
      path: '/user',
      name: 'user',
      component: resolve => require(['./components/read/User'], resolve),
      meta: {
        keepAlive: true // 缓存
      }
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ],
  linkActiveClass: 'gaoliang'
})
