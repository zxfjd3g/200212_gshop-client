/* 
管理购物车相关数据的vuex子模块
*/
import {reqShopCart} from '@/api'

const state = {
  cartList: [], // 购物车购物项的列表
}

const mutations = {
  /* 
  接收保存购物项列表
  */
  RECEIVE_CART_LIST (state, cartList) {
    state.cartList = cartList
  }
}

const actions = {
  /* 
  获取购物车列表数据的异步action
  */
  async getCartList ({commit}) {
    const result = await reqShopCart()
    if (result.code===200) {
      const cartList = result.data
      commit('RECEIVE_CART_LIST', cartList)
    }
  }
}

const gettters = {

}

export default {
  state,
  mutations,
  actions,
  gettters
}
