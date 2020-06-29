<template>
  <div class="test2">
    <h2 class="t2">t2--Test2</h2>
    <h2 class="t22">t22--Test2</h2>
    
    <h2>
      <span>Test2</span>
    </h2>
    
    <br>
    <Test3></Test3>
    <br>
    <Test4/>
  </div>
</template>

<script>
import Test3 from './Test3'
import Test4 from './Test4'
export default {
  name: 'Test2',
  components: {
    Test3,
    Test4
  }
}
</script>

<style>
  /* 不声明scoped, 样式是全局的, 可以匹配影响所有的组件 */
  /* h2 {
    color: red;
  } */
  .test2 .t2 {
    color: blue;
  }
</style>

<style lang="less">
  /* 
  .test2 .t2 {
    color: blue;
  }
  */
  .test2 .t2 {
    color: green;
  }
</style> 

<style scoped>
  /* 声明scoped, 就不会影响到子组件内部样式 */
  /* 
  标签的变化:
    当前组件的所有标签都增加一个data自定义属性: data-v-2e8d0da5 => 用来标识当前组件的
    子组件的根标签也会有此data属性, 子标签没有
  样式的选择器变化: 选择器的最右边添加了当前组件data属性的选择  
    .test2 .t2[data-v-2e8d0da5] {
      color: red;
    }
    ==> 能匹配当前组件的所有元素
    ==> 还能匹配子组件根标签, 但不可能匹配其子标签
  */
  .test2 .t2 {
    color: red;
  }

  /* 
  .test2 .test4[data-v-2e8d0da5] {
      color: red;
  }
   */
  .test2 .test4 {
    color: red;
  }

  /* 
  加了scoped后, 如何能够修改子组件内部的任意标签样式  ==> 使用深度选择器
    没用深度
      .test2 .t2[data-v-2e8d0da5] {
        color: red;
      }
    用了深度
      .test2[data-v-2e8d0da5] .t22 {
        font-size: 30px;
      }
    ==> 属性选择从最右边转移到了左边  ==> 此选择对目标元素没有当前data属性的要求 ==> 可以子组件任意标签
   */
  .test2 >>> .t22 {
    font-size: 30px;
  }
</style>

<style lang="less" scoped>
  .test2 {
    /deep/ .t22 {
      color: hotpink;
    }
  }
</style> 

