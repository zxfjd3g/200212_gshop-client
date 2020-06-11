<template>
  <div class="pagination">
    <button>上一页</button>
    <button>1</button>
    <button>···</button>

    <button>3</button>
    <button>4</button>
    <button class="active">5</button>
    <button>6</button>
    <button>7</button>
    
    <button>···</button>
    <button>9</button>
    <button>上一页</button>
    
    <button disabled style="margin-left: 30px">共 60 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",

    props: {
      // currentPage: 当前页码
      currentPage: {
        type: Number,
        default: 1
      },
      // pageSize: 每页数量
      pageSize: {
        type: Number,
        default: 10
      },
      // total: 总数量
      total: {
        type: Number,
        default: 0
      },
      // showPageNo: 连续页码数 (一般是奇数)
      showPageNo: {
        type: Number,
        default: 5
      },
    },

    data () {
      return {
        // myCurrentPage: 组件内部维护的当前页码
        myCurrentPage: this.currentPage  // 由父组件来指定我的初始值
      }
    },

    computed: {
      /* 
      totalPages: 总页数
				依赖数据: total / pageSize   19 / 2  10
				算法: Math.ceil(total/pageSize)
      */
      totalPages () {
        // 依赖数据: total / pageSize   19 / 2  10
        const {total, pageSize} = this

        // 计算出总页数, 返回
        return Math.ceil(total/pageSize)
      },

      /* 
      start/end: 连续页码的开妈页码与结束页码: 返回值的结构 {start, end}
        依赖数据: myCurrentPage / showPageNo / totalPages

      对象容器与数组容器
        {start: 2, end: 5} // 属性名: 属性值
        [2, 5] // 下标: 元素值
      */
      startEnd () {
        let start, end

        

        // 返回start和end的对象
        return {start, end}
      }

    }


  }
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>