/* 
管理购物车相关数据的vuex子模块
*/
import {reqShopCart, reqAddToCart, reqCheckCartItem, reqDeleteCartItem} from '@/api'

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
  },

  /* 
  全部勾选/不勾选
  checked: 是否勾选的布尔值
  1). 需要对所有购物项与checked不一致的购物项发送请求
  2). 针对每个需要发请求的item去触发checkCartItem()调用  ===> 调用dispatch()
  3). context对象的结构:
      {
        state,      // 等同于 `store.state`，若在模块中则为局部状态
        getters,    // 等同于 `store.getters`
        commit,     // 等同于 `store.commit`
        dispatch,   // 等同于 `store.dispatch`
      }
  4). 执行多个请求的异步操作, 只有当都成功时, 整体异步action才成功, 否则失败
      const promise = Promise.all([p1, p2, p3])
  */
  async checkAllCartItems ({commit, state, dispatch}, checked) {
    // 确定对应的isChecked值
    const isChecked = checked ? '1' : '0'
    let promises = []

    // 遍历每个购物项
    state.cartList.forEach(item => {
      // 购物项的状态与目标状态不一样
      if (item.isChecked!=isChecked) {
        // 分发给checkCartItem, 得到其返回的promise对象
        const promise = dispatch('checkCartItem', {skuId: item.skuId, isChecked})
        // 保存到数组中
        promises.push(promise)
      }
    })

    // 此时请求发出去没有? 已经发了
    // 返回promise对象(只有所有dispatch都成功了才成功, 否则就是失败的)
    return Promise.all(promises) 
  },

  /* 
  删除一个购物项的异步action
  */
  async deleteCartItem (context, skuId) {
    const result = await reqDeleteCartItem(skuId)
    if (result.code!==200) { // 失败
      throw new Error('删除购物项失败')   // async函数的promise就是失败的
    }
  },

  /* 
  删除所有勾选的购物项的异步action
  */
  async deleteCheckedCartItems ({state, dispatch}) {

    // 遍历每个勾选的购物项去分发deleteCartItem
    const promises = state.cartList.reduce((pre, item) => {
      if (item.isChecked===1) {
        pre.push(dispatch('deleteCartItem', item.skuId))
      }
      return pre
    }, [])

    return Promise.all(promises)
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
