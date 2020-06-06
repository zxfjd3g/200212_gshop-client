/* 
Vuex最核心的管理对象: store(仓库)
*/
import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import user from './modules/user'

// 声明使用vue插件
Vue.use(Vuex)

// const state = {}
const mutations = {
  test2 (state) {// 当前state是总state

  }
}
const actions = {}
const getters = {}

// 向外暴露store对象
export default new Vuex.Store({
  // state,
  mutations, // 总mutations
  actions, // 总actions
  getters, // 总getters
  modules: { // 指定vuex管理所有子模块
    home,  // 标识名称: vuex子模块
    user
  }
})

/* 
vuex管理的总state的结构:
  {
    home:{
      categoryList: [], // 分类列表
      xxx: {},
      yyy: 'atguigu'
    }
    user: {
      userInfo: {}
    }
  }
*/