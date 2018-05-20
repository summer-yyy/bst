import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: resolve => require(['@/pages/Index'], resolve)
    }, {
      path: '/address',
      component: resolve => require(['@/pages/address'], resolve),
      name: 'address'
    }, {
      path: '/login',
      component: resolve => require(['@/pages/login'], resolve),
      name: 'login'
    }, {
      path: '/agreement',
      component: resolve => require(['@/pages/agreement'], resolve),
      name: 'agreement'
    }, {
      path: '/resetPlace',
      component: resolve => require(['@/pages/resetPlace'], resolve),
      name: 'resetPlace'
    },
    {
      path: '/route',
      name: 'Route',
      component: resolve => require(['@/pages/Route'], resolve)
    },
    {
      path: '/route/routedetail',
      name: 'RouteDetail',
      component: resolve => require(['@/pages/Routedetail'], resolve)
    },
    {
      path: '/my',
      name: 'My',
      component: resolve => require(['@/pages/My'], resolve)
    },
    {
      path: '/my/newsList',
      name: 'NewsList',
      component: resolve => require(['@/pages/NewsList'], resolve)
    },
    {
      path: '/my/newsDetail',
      name: 'NewsDetail',
      component: resolve => require(['@/pages/NewsDetail'], resolve)
    },
    {
      path: '/mapDetail',
      name: 'mapDetail',
      component: resolve => require(['@/pages/mapDetail'], resolve)
    }
  ]
})
