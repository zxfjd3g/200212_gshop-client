/* 
应用的所有路由配置的数组
*/
import Home from '../pages/Home'
import Search from '../pages/Search'
import Register from '../pages/Register'
// import Login from '../pages/Login'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

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
    }
  },

  {
    name: 'detail',  // 有了name后才可以用对象的写法进行跳转
    path: '/detail/:id', // 如果不写name配置, 必须使用字符串的写进行跳转
    component: Detail
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
]