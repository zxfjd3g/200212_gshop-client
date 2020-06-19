<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <HintButton title="添加用户" type="primary" icon="el-icon-plus" 
       @click="add" @xxx="test"/>

    <hint-button title="更新用户" type="info" icon="el-icon-edit" round size="small" 
      @click="update"></hint-button>

    <hint-button title="删除用户" type="danger" icon="el-icon-delete" circle size="mini" 
      @click="remove"></hint-button>

    
  </div>
</template>

<script type="text/ecmascript-6">
  import HintButton from './HintButton'
  export default {
    name: 'AttrsListenersTest',

    methods: {
      add () {
        alert('添加')
      },
      update () {
        alert('更新')
      },
      remove () {
        alert('删除')
      },

      test () {
        alert('test')
      }
    },

    components: {
      HintButton
    }
  }
</script>
