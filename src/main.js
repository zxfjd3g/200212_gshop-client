import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  // el: '#app',
  render: h => h(App),
  router, // 配置路由器  ==> 所有的组件都可以通过$router属性得到路由器对象
}).$mount('#app')

/* eslint-disable no-unused-vars */
var a = 3