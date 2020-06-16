/* 
管理用户数据的vuex子模块
*/
import {reqRegister, reqLogout, reqLogin} from '@/api'
import {getUserTempId} from '@/utils'
import {saveUserInfo, getUserInfo, removeUserInfo} from '@/utils'

export default {
  state: {
    userInfo: getUserInfo(), // 登陆用户的信息  如果有数据就自动登陆上了
    userTempId: getUserTempId()
  },

  mutations: {
    RECEIVE_USER_INFO (state, userInfo) {
      state.userInfo = userInfo
    },

    RESET_USER_INFO (state) {
      state.userInfo = {}
    }
  },
  actions: {
    /* 
    注册的异步action
    register(): 请求注册的接口, 完成后不用更新state, 只需要将请求的结果通知给组件
    */
    async register ({commit}, userInfo) {
      const result = await reqRegister(userInfo)
      if (result.code!==200) {
        throw new Error(result.message || '注册失败')
      }
    },

    /* 
    登陆的异步action
    login(): 请求登陆接口成功后, 保存返回的用户信息	
			通过commit触发mutation调用 ==> 保存信息到state
			保存localStorage中  ===> 从而可以实现自动登陆的功能
    */
    async login ({commit}, {mobile, password}) {
      const result = await reqLogin(mobile, password)
      if (result.code==200) {
        const userInfo = result.data
        // 通过commit触发mutation调用 ==> 保存信息到state
        commit('RECEIVE_USER_INFO', userInfo)
        // 保存localStorage中  ===> 从而可以实现自动登陆的功能
        saveUserInfo(userInfo)
      } else {
        throw new Error(result.message || '登陆失败')
      }
    },

    /* 
    退出登陆
    logout(): 请求登出的接口成功后, 清除前台用户的信息数据
			state中的userInfo
			localStorage中的userInfo
    */
    async logout ({commit}) {
      const result = await reqLogout()
      if (result.code==200) {
        // 通过commit触发mutation调用 ==> 清除state中的userInfo
        commit('RESET_USER_INFO')
        // 删除local中保存的userInfo
        removeUserInfo()
      } else {
        throw new Error(result.message || '退出登陆失败')
      }
    },
  },
  getters: {}
}