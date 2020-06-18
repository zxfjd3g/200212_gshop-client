/* 
收集所有的vuex模块, 并暴露出去
*/
import search from './search'
import home from './home'
import user from './user'
import detail from './detail'
import shopCart from './shopCart'
import order from './order'

export default {
  search,
  home,
  user,
  detail,
  shopCart,
  order
}