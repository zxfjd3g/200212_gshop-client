/* 
路由器对象
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import stote from '@/store'

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

// 创建路由器对象
const router = new VueRouter({
  mode: 'history', // 不带#
  routes,

  // 路由跳转后, 滚动条停留在最上面(0,0)
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})

// 注册全局前置守卫
/* 
to: 目标路由对象
from: 当前路由对象  对应的就$route
next: 控制路由跳转的函数
  不执行: 不放行, 不会跳转到目标路由
  next(): 放行, 请求的路由组件才能显示
  next(path): 强制跳转到指定路由去
*/

// 访问这些路由路径必须检查其已经登陆
const checkPaths = ['/trade', '/pay', '/center' ]  // /paysuccess /center/myorder
/* 
功能: 只有登陆了, 才能查看交易/支付/个人中心界面
*/
router.beforeEach((to, from, next) => { // 监视的回调函数
  console.log('全局beforeEach()', to, from)
  // 得到目标路径
  const targetPath = to.path  // /center/myorder
  // 判断是目标路径是否需要检查
  const needCheck = !!checkPaths.find(path => targetPath.indexOf(path)===0)
  // 如果需要检查
  // if (checkPaths.indexOf(targetPath)>=0)  // 请求路径可能是 /center/myorder
  if (needCheck) {
    // 已经登陆(state中的userInfo中有数据), 放行
    const token = stote.state.user.userInfo.token
    if (token) {
      next()
    } else {
      // 如果没有登陆, 强制跳转到login界面, 携带上目标路径的redirect query参数
      next('/login?redirect=' + targetPath)
    }
  } else { // 如果是不需要检查的, 直接放行
    // 放行
    next()
  }
})

// 向外暴露路由器对象
export default router