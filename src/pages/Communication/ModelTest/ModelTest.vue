<template>
  <div>
    <h2>深入v-model</h2>
    <!-- 
      原生标签上的v-model的本质: 动态value属性和原生input事件监听
    -->
    <input type="text" v-model="name1">
    <span>{{name1}}</span>
    <br><br>

    <input type="text" :value="name2" @input="name2=$event.target.value">
    <span>{{name2}}</span>
    <br><br>

    <!-- 
      组件标签上的v-model的本质: 动态value属性和自定义input事件监听
    -->
    <CustomInput v-model="name3"/>
    <span>{{name3}}</span>
    <br><br>

    <CustomInput :value="name4" @input="name4=$event"/>
    <span>{{name4}}</span>
    <br><br>

  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',

    data () {
      return {
        name1: 'atguigu',
        name2: 'atguigu22',
        name3: 'atguigu33',
        name4: 'atguigu44',
      }
    },

    components: {
      CustomInput
    }
  }
</script>
