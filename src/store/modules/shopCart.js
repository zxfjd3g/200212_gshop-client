/* 
管理购物车相关数据的vuex子模块
*/
import {reqShopCart, reqAddToCart} from '@/api'

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
  },

  /* 
  添加到购物车的异步action
  */
  async addToCart ({commit}, {skuId, skuNum, callback}) {
    const result = await reqAddToCart(skuId, skuNum)
    if (result.code===200) {
      // 通知组件成功了
      callback()  // 不传参数
    } else {
      // 通知组件失败了
      callback('添加购物车失败')
    }
  },

  /* 
  添加到购物车的异步action
  */
  async addToCart2 ({commit}, {skuId, skuNum}) {
    const result = await reqAddToCart(skuId, skuNum)
    // 如果请求的结果不正确, 抛出一个错误
    if (result.code!==200) {
      // 通知组件失败了
      throw new Error('添加购物车失败')  // action函数的promise失败了, reason为error
    }
  },

  /* 
  添加到购物车的异步action
  */
  async addToCart3 ({commit}, {skuId, skuNum}) {
    const result = await reqAddToCart(skuId, skuNum)
    // 如果请求的结果不正确, 抛出一个错误
    if (result.code!==200) {
      // 通知组件失败了
      return '添加购物车失败'   // action的promise是成功的, value是errorMsg
    } else {  // 这个else完全可以不用写
      return undefined   // action的promise是成功的, value是undefined
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
