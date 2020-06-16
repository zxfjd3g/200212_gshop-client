/* 
管理用户数据的vuex子模块
*/
import {getUserTempId} from '@/utils'

export default {
  state: {
    userInfo: {}, // 登陆用户的信息
    userTempId: getUserTempId()
  },
  mutations: {},
  actions: {},
  getters: {}
}