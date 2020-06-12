/* 
管理搜索模块相关数据的vuex子模块
*/
import {reqProductList} from '@/api'

const state = {
  // 包含搜索得到的商品列表相关信息的对象
  productList: {}, // 包含 trademarkList / attrsList / goodsList / total的对象
}
const mutations = {
  RECEIVE_PRODUCT_LIST (state, productList) {
    state.productList = productList
  }
}
const actions = {
  /* 
  请求获取商品列表数据的异步action
  */
  async getProductList ({commit}, options) {
    // 为了不删除search组件中的options内部的属性
    options = {...options}  // 对options实现了一个浅拷贝

    // 删除options中属性值为空串或者空数组的属性
    Object.keys(options).forEach(key => {
      if (options[key]==='' || (Array.isArray(options[key]) && options[key].length===0)) {
        delete options[key]
      }
    })

    const result = await reqProductList(options)
    if (result.code===200) {
      const productList = result.data
      commit('RECEIVE_PRODUCT_LIST', productList)
    }
  }

  /* 
  obj1 = {m: 1}
  obj2 = obj1

  delete obj2.m
  obj1.m

  */
}

const getters = {
  /* 
  品牌列表
  */
  trademarkList (state) {
    return state.productList.trademarkList || []
  },

  /* 
  属性列表
  */
 attrsList (state) {
   return state.productList.attrsList || []
 }
}

export default {
  state,
  mutations,
  actions,
  getters
}