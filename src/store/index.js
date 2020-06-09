/* 
Vuex最核心的管理对象: store(仓库)
*/
import Vue from 'vue'
import Vuex from 'vuex'
// import home from './modules/home'
// import user from './modules/user'
// import search from './modules/search'
import modules from './modules'

// 声明使用vue插件
Vue.use(Vuex)

// const state = {}
const mutations = {
  test2 (state) {// 当前state是总state

  }
}
const actions = {
  xxx ({commit, state}) {
    
  }
}
const getters = {}

// 向外暴露store对象
export default new Vuex.Store({
  // state,
  mutations, // 总mutations
  actions, // 总actions
  getters, // 总getters
  modules
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