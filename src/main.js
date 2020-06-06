import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './components/TypeNav'

// 注册全局组件(所有组件都可以使用了)
Vue.component('TypeNav', TypeNav)

new Vue({
  // el: '#app',
  render: h => h(App),
  router, // 配置路由器  ==> 所有的组件都可以通过$router属性得到路由器对象
}).$mount('#app')

/* eslint-disable no-unused-vars */
var a = 3