import { reqTradeInfo, reqPayInfo } from "@/api"

/* 
管理订单支付相关数据的vuex子模块
*/
export default {
  state: {
    tradeInfo: {}, // 交易信息对象
    payInfo: {}, // 支付信息对象
  },
  mutations: {
    RECEIVE_TRADE_INFO (state, {tradeInfo}) { // 这里必须用解构的写法取出对象中的数据
      state.tradeInfo = tradeInfo
    },
    RECEIVE_PAY_INFO (state, {payInfo}) {
      state.payInfo = payInfo
    },
  },
  actions: {
    /* 
    请求获取交易信息的异步action
    */
    async getTradeInfo ({commit}) {
      const result = await reqTradeInfo()
      if (result.code===200) {
        const tradeInfo = result.data
        commit('RECEIVE_TRADE_INFO', {tradeInfo}) // 提交给mutation的是包含数据的对象
      }
    },

    /* 
    请求获取支付信息的异步action
    */
    async getPayInfo ({commit}, orderId) {
      const result = await reqPayInfo(orderId)
      if (result.code===200) {
        const payInfo = result.data
        commit('RECEIVE_PAY_INFO', {payInfo}) // 提交给mutation的是包含数据的对象
      }
    },
  },
  getters: {},
}