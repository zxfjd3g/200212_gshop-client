<template>
  <div>
    <TypeNav />
    
    <h2>Search</h2>

    <h3>keyword: {{$route.params.keyword}}</h3>
    <h3>keyword2: {{$route.query.keyword2}}</h3>
    <h3>keyword3: {{keyword3}}</h3>
    <h3>keyword4: {{keyword4}}</h3>
  </div>
</template>

<script>
export default {
  name: 'Search',
  // 接收props属性必须声明
  props: ['keyword3', 'keyword4']
}
</script>

<style lang="less" scoped>

</style>
