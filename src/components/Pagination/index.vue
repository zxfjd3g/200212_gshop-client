<template>
  <div class="pagination">
    <!-- 当前页码是1时不能操作 -->
    <button :disabled="myCurrentPage===1" @click="setCurrentPage(myCurrentPage-1)">上一页</button>
    <!-- 当start大于1时显示 -->
    <button v-if="startEnd.start>1" @click="setCurrentPage(1)">1</button>
    <!-- 当start大于2时显示 -->
    <button v-if="startEnd.start>2" disabled>···</button>

    <!-- 显示从start到end的页码 -->
    <!-- 
      v-for与v-if谁的优先级高? 
      v-for的优先级高
      v-for在遍历每个元素的过程中, 才都去解析v-if的判断
    -->
    <button v-for="item in startEnd.end" v-if="item>=startEnd.start" 
      :class="{active: item===myCurrentPage}" @click="setCurrentPage(item)">{{item}}</button>
    
    <!-- 当end小于总页码减1 -->
    <button v-if="startEnd.end<totalPages-1" disabled>···</button>
    <!-- 当end小于总页码 -->
    <button v-if="startEnd.end<totalPages" @click="setCurrentPage(totalPages)">{{totalPages}}</button>
    <!-- 当前页码等于总页码不能操作 -->
    <button :disabled="myCurrentPage===totalPages" @click="setCurrentPage(myCurrentPage+1)">下一页</button>
    
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

    watch: {
      // 监视父组件传入的当前页码
      currentPage (value) {
        // 更新内部的当前页码
        this.myCurrentPage = value
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

        // 取出依赖数据
        const {myCurrentPage, showPageNo, totalPages} = this

        // 计算start
        /* 
        myCurrentPage, showPageNo, totalPages
            4              5           8         23[4]56
        */
        start = myCurrentPage - Math.floor(showPageNo/2) // 4 - 2

        // 如果start的值小于1, 修正为1
        /* 
        myCurrentPage, showPageNo, totalPages
            2              5           8         1[2]345
        上面计算出的start为 0, 应该为1
        */
        if (start<1) {
          start = 1
        }

        // 计算end
        // 从start到end的数量为showPageNo
        /* 
        myCurrentPage, showPageNo, totalPages
            4              5           8         23[4]56
        */
        end = start + showPageNo -1  // 2 + 5 -1

        // 如果end大于了totalPages, 修正为totalPages
        /* 
        myCurrentPage, showPageNo, totalPages
            7              5           8        456[7]8 

          上面的算法: start为5, end为9
          应该: start为4, end为8

        */
        if (end>totalPages) {
          end = totalPages
          // 修正start: 从start到end的数量为showPageNo
          start = end - showPageNo + 1  // 8 - 5 + 1

          /* 
          myCurrentPage, showPageNo, totalPages
              2              5          3        1[2]3
            上面计算的end为3 没问题, start为-1 不对, 应该1
          */
          if (start<1) {
            start = 1
          }
        }

        // 返回start和end的对象
        return {start, end}
      }
    },

    methods: {
      /* 
      设置新的当前页码
      */
      setCurrentPage (page) {
        // 如果指定的页码等于当前页码, 直接结束
        if (page==this.myCurrentPage) return

        // 更新当前页码
        this.myCurrentPage= page

        // 通知父组件当前页码变化了  ==> 使用什么技术? 自定义事件/函数props
        this.$emit('currentChange', page)
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