<template>
  <ul>
    <li v-for="(item, index) in data" :key="index">
      <!-- 
        利用作用域插槽可以子组件向父组件传递数据
        通过<slot>的所有属性都会传递给父组件
       -->
      <slot :row="item" :$index="index"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    data: Array
  }
}
</script>