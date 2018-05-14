// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import VueAMap from 'vue-amap'
import '@/assets/css/reset.css'

Vue.use(VueAMap)
Vue.config.productionTip = false

Vue.prototype.$ajax = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

// 设置rem
(function (doc, win) {
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return

    // 这里是假设在750px宽度设计稿的情况下，1rem = 50px；
    // 可以根据实际需要修改
    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '77cad132cc58265388f16dd13ba59a7b',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'Geocoder'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})