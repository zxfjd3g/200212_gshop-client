/* 
路由器对象
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 声明使用vue插件
Vue.use(VueRouter)

/* 
VueRouter原型对象上的push()方法有问题: 当没有指定回调函数时, 重复跳转会抛出错误
1. 如果没有指定回调函数, 需要调用原本的push()后catch()来处理错误的promise
2. 如果传入了回调函数, 本身就没问题, 直接调用原本的push()就可以
*/
// 一定要先保存一下原本的push函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 给原型对象重新定义新的push方法
VueRouter.prototype.push = function (location, onComplete, onAbort) {

  console.log('push()', location, onComplete, onAbort)
  
  // 1. 如果没有指定回调函数, 需要调用原本的push()后catch()来处理错误的promise
  if (!onComplete && !onAbort) {
    /* 
    有2个特别
    1). 需要使用call来指定this
    2). 需要返回产生promise对象
    */
    return originPush.call(this, location).catch(error => {
      console.log('---push', error.message)
    })
  } else { // 2. 如果传入了回调函数, 本身就没问题, 直接调用原本的push()就可以
    originPush.call(this, location, onComplete, onAbort)
  }
}

VueRouter.prototype.replace = function (location, onComplete, onAbort) {

  if (!onComplete && !onAbort) {
    return originReplace.call(this, location).catch(error => {
      console.log('---replace', error.message)
    })
  } else {
    originReplace.call(this, location, onComplete, onAbort)
  }
}


// 向外暴露路由器对象
export default new VueRouter({
  mode: 'history', // 不带#
  routes,
})