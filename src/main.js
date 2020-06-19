import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import 'swiper/css/swiper.min.css' // 如果查找不是包的主模块, 必须指定具体的路径
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'

// 引入api模块所有分别暴露的函数, 封装到API对象中
import * as API from '@/api'

import '@/mock/mockServer'  // 引入加载
import './validate' // 引入表单校验的配置模块
import './elements'
import loading from './assets/images/loading.gif'

// 配置vue的插件
Vue.use(VueLazyload, { // 内部自定义一个指令: lazy
  loading,  // 配置loading图片
})

// 注册全局组件(所有组件都可以使用了)
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)

// 将API对象保存到Vue的原型对象上 ===> 让所有组件对象都直接可见(不用再引入API)
Vue.prototype.$API = API

// Vue.prototype.$bus = new Vue()  // 也可以

new Vue({
  // el: '#app',
  render: h => h(App),
  router, // 配置路由器  ==> 所有的组件都可以通过$router属性得到路由器对象
  store, // 注册vuex的store ==> 所有的组件都可以通过$store来得到store对象

  beforeCreate () {// 尽量早些
    // 将全局事件总线对象(vm)保存到Vue原型对象上
    Vue.prototype.$bus = this
  }
}).$mount('#app')

/* eslint-disable no-unused-vars */
var a = 3