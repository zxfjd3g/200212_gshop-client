<template>
  <a href="javascript:" :title="title">
    <!-- 
      问题1: 需要传递给<el-button>的属性是不定(属性个数及属性值), 
              ==> 都在$attrs中  ==> 使用v-bind将$attrs中的所有属性传递给el-button
      问题2: 需要给<el-button>绑定什么事件监听不定  
              ==> 都在$listeners中  ==> 使用v-on给el-button绑定所有$listeners包含的所有监听回调
    -->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name: 'HintButton',
  props: {
    title: String
  },

  mounted () {
    console.log('---', this.$attrs, this.$listeners)
  }
}
</script>

