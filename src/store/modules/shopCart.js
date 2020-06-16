/* 
管理购物车相关数据的vuex子模块
*/
import {reqShopCart, reqAddToCart, reqCheckCartItem} from '@/api'

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
  },

  /* 
  勾选/不勾选某个购物项商品
  skuId: 商品的ID
  isChecked: 商品选中状态, '0'代表不选中, '1'代表选中
  */
  async checkCartItem ({commit}, {skuId, isChecked}) {
    // 调用接口请求函数, 提交异步ajax请求
    const result = await reqCheckCartItem(skuId, isChecked)
    // 请求处理如果没有成功, 返回一个error对象
    if (result.code!==200) {
      throw new Error(result.message || '选中商品失败')
    }
  }
}

const getters = {
  /* 
  选中的总数量
  */
  totalCount (state) {
    /* 
    let total = 0
    state.cartList.forEach(item => {
      total += item.skuNum
    })
    return total 
    */
    return state.cartList.reduce((preTotal, item, index) => preTotal + (item.isChecked===1?item.skuNum:0) , 0) 
  },

  /* 
  选中的总价格
  */
  totalPrice (state) {
    return state.cartList.reduce((pre, item, index) => pre + item.skuNum*item.cartPrice , 0) 
  },


  /* 
  是否全部选中了
  */
  isCheckAll (state) {
    // 如果数组中每个都选中就返回true, 否则是false
    return state.cartList.length>0 && state.cartList.every((item, index) => item.isChecked===1)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
