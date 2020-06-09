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
    const result = await reqProductList(options)
    if (result.code===200) {
      const productList = result.data
      commit('RECEIVE_PRODUCT_LIST', productList)
    }
  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}