<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowMoney1(100)">找小明借钱100</button><br>
    <button @click="borrowMoney2(150)">找小红借钱150</button><br>
    <button @click="borrowMoney3(200)">找所有孩子借钱200</button><br>
    
    <br>
    <Son ref="son"/>

    <br>
    <Daughter ref="daughter"/>
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data () {
    return {
      money: 1000
    }
  },

  methods: {

    /* 
    找小明借钱
    */
    borrowMoney1 (count) {
      // 得到儿子组件对象
      const son = this.$refs.son
      // 取出它的count块钱
      // son.money -= count   // 父组件直接更新子组件数据
      son.spendMoney(count)   // 父组件通过调用子组件对象的方法来更新其数据
      // 添加到的money中
      this.money += count
    },

    /* 
    找小红借钱
    */
    borrowMoney2 (count) {
      // 得到女儿组件对象
      const daughter = this.$refs.daughter
      // 取出它的count块钱
      // daughter.money -= count   // 父组件直接更新子组件数据
      daughter.spendMoney(count)   // 父组件通过调用子组件对象的方法来更新其数据
      // 添加到的money中
      this.money += count
    },

    /* 
    找所有孩子借钱
    */
    borrowMoney3 (count) {
      // 得到所有子组件对象的数组
      const children = this.$children
      // 调用每个子组件对象借钱的方法
      children.forEach(child => {
        child.spendMoney(count)
        // 同时更新自己的money
        this.money += count
      })
    }
  },

  components: {
    Son,
    Daughter
  }
}
</script>

<style>

</style>
