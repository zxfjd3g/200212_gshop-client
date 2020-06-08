<template>
  <div>
    <Header/>
    
    <!-- 一级路由组件显示区域 -->
    <router-view/>

    <Footer v-if="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
// import {reqCategoryList, reqFloors} from './api'

export default {
  name: 'App',

  async mounted () {
    // 测试调用接口请求函数获取数据
    // const result = await reqCategoryList()
    // console.log('result', result)
    // const result = await reqFloors()
    // console.log('result---', result)

    // 分发给异步action请求获取分类数据  / 在路由切换时不会重新执行
    this.$store.dispatch('getCategoryList')

  },

  // 注册组件(局部, 当前组件可用)
  components: {
    Header,
    Footer
  }

}
</script>

<style lang="less" scoped>

</style>
