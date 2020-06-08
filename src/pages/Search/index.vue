<template>
  <div>
    <TypeNav />
    
    <h2>Search</h2>

    <h3>keyword: {{$route.params.keyword}}</h3>
    <h3>categoryName: {{$route.query.categoryName}}</h3>
    <h3>category1Id: {{$route.query.category1Id}}</h3>
    <h3>category2Id: {{$route.query.category2Id}}</h3>
    <h3>category3Id: {{$route.query.category3Id}}</h3>
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
