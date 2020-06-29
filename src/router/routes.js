/* 
应用的所有路由配置的数组
*/

// const Foo = () => import('./Foo.vue')

// import Home from '../pages/Home'
// import Search from '../pages/Search'
// import Detail from '@/pages/Detail'

/* 
1. import()引入的模块会被拆分出去单独打包: xxx.js
2. 配置的路由组件是一个返回import()动态打包模块函数, 
    函数只有当请求对应的路径时才会执行从而请求(只有第一次)加载对应打包文件
*/
const Home = () => import('@/pages/Home')
const Search = () => import('@/pages/Search')
const Detail = () => import('@/pages/Detail')

import Register from '../pages/Register'
// import Login from '../pages/Login'
import Login from '@/pages/Login'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupBuy from '@/pages/Center/GroupBuy'

import stote from '@/store'


export default [
  {
    path: '/',
    component: Home
  },
  {
    name: 'search', // 一旦有params参数, 想用push()的对象语法, 必须有name配置
    path: '/search/:keyword?',  // 带:的对应的部分就是params参数
    component: Search,
    // props: (route) => ({ query: route.query.q }) 
    // 将路由参数映射成props传递给路由组件对象
    props: route => ({keyword3: route.params.keyword, keyword4: route.query.keyword2})
  },
  {
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true
    },
    /* 功能: 只有没有登陆, 才能查看登陆界面 */
   /*  beforeEnter: (to, from, next) => { 
      // 如果已经登陆, 强制跳转到首页
      const token = stote.state.user.userInfo.token
      if (token) {
        next('/')
      } else { // 如果没有登陆就放行
        next()
      }
    } */
  },

  {
    name: 'detail',  // 有了name后才可以用对象的写法进行跳转
    path: '/detail/:id', // 如果不写name配置, 必须使用字符串的写进行跳转
    component: Detail
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    // 只有携带的skuNum以及sessionStorage中有skuInfo数据, 才能查看添加购物车成功的界面
    beforeEnter: (to, from, next) => { 
      // query参数skuNum
      const skuNum = to.query.skuNum
      // sessionStorage中有skuInfo数据
      const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
      // 只有2个条件都满足才放行
      if (skuNum && skuInfo instanceof Object) {
        next()
      } else { // 如果没有, 自动跳转到购物车
        next('/shopcart')
      }
    }
  },
  {
    path: '/shopcart',
    component: ShopCart
  },

  {
    path: '/trade',
    component: Trade,
    beforeEnter: (to, from, next) => { 
      // 必须是从购物车界面过来的才行
      if (from.path==='/shopcart') {
        next()
      } else { // 否则自动跳转到购物车界面
        next('/shopcart')
      }
    }
  },
  {
    path: '/pay',
    component: Pay,
    beforeEnter: (to, from, next) => { 
      // 必须是从trade界面过来的才行
      if (from.path==='/trade') {
        next()
      } else { // 否则自动跳转到trade界面
        next('/trade')
      }
    }
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    beforeEnter: (to, from, next) => { 
      // 必须是从pay界面过来的才行
      if (from.path==='/pay') {
        next()
      } else { // 否则自动跳转到pay界面
        next('/pay')
      }
    }
  },
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: '/center/myorder',
        component: MyOrder
      },
      {
        path: 'groupbuy',
        component: GroupBuy
      },
      // 自动跳转的路由
      {
        path: '',
        redirect: '/center/myorder'
      }
    ]
  },

  {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    children: [
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter: true
        },
      }
    ],
  },

  {
    path: '/scoped',
    component: () => import('@/pages/Scoped/Test1'),
    meta: {
      isHideFooter: true
    }
  },
]