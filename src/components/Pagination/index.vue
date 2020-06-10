<template>
  <div class="pagination">
    <!-- 当前页码等于1就不可操作 -->
    <button :disabled="mcPage===1" @click="changeCurrentPage(mcPage-1)">上一页</button>
    <!-- 只有start大于1 -->
    <button v-if="startEnd.start>1" @click="changeCurrentPage(1)">1</button>
    <!-- 只有start大于2 -->
    <button disabled v-if="startEnd.start>2">···</button>

    <!-- 连续页码 -->
    <button v-for="item in startEnd.end" v-if="item>=startEnd.start" :key="item"
      @click="changeCurrentPage(item)" :class="{active: mcPage===item}">
      {{item}}
    </button>
    <!-- 只有end<totalPages-1才显示  -->
    <button disabled v-if="startEnd.end<totalPages-1">···</button>
    <!-- 只有end<totalPages才显示 -->
    <button v-if="startEnd.end<totalPages" @click="changeCurrentPage(totalPages)">{{totalPages}}</button>
    <!-- 当前页码等于总页码就不可操作 -->
    <button :disabled="mcPage===totalPages" @click="changeCurrentPage(mcPage+1)">下一页</button>
    <!-- 总记录数 -->
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",

    props: {
      currentPage: { // 当前页码
        type: Number,
        default: 1
      },
      pageSize: { // 每页数量
        type: Number,
        default: 5
      },
      total: { // 总数量
        type: Number,
        default: 0
      },
      showPageNo: { // 连续页码数
        type: Number,
        default: 5
      }
    },

    data () {
      return {
        mcPage: this.currentPage  // 保存自己的当前页码
      }
    },

    computed: {

      /* 
      总页码数
      依赖数据: 
        总数量: total    
        每页数量: pageSize  
      */
      totalPages () {
        // 取出依赖数据   31 5 ==> 7
        const {total, pageSize} = this
        // 返回计算后的结果
        return Math.ceil(total/pageSize)
      },

      /* 
      返回连续页码的开始页码(start)与结束页码(end): 
      比如: {start: 3, end: 7}
      依赖数据:
          当前页码: mcPage
          最大连续页码数: showPageNo
          总页码数: totalPages
      注意:
          start的最小值为1
          end的最大值为totalPages
          start与end之间的最大差值为showPageNo-1
      */
      startEnd () {
        const {mcPage, showPageNo, totalPages} = this

        // 计算start
        /* 
        mcPage showPageNo totalPages     start到end
          4        5          10           23[4]56
        */
        let start = mcPage - Math.floor(showPageNo/2)  // 4 - 2
        /* 
        mcPage showPageNo totalPages  start到end
          2        5          10         1[2]345
        但start上面计算得到是: 0
        */
        // start的最小值是1, 如果小于1, 修正为1
        if (start<1) {
          start = 1
        }

        // 计算end
        /* 
        mcPage showPageNo totalPages     start到end
          4        5          10           23[4]56
        */
        // start与end之间的最大差值为showPageNo-1
        let end = start + showPageNo - 1    // 2 + 5 -1


        /* 
        mcPage showPageNo totalPages     start到end
          4        5          5           123[4]5
        但上面计算的end为6, 应该为5    ==> end = totalPages
                   start为2, 应该为1  ==> start = end - showPageNo + 1
        */
        // 如果end超过了totalPages, 修正为totalPages
        if (end > totalPages) {
          end = totalPages
          // 根据最大连续页码修正start
          start = end - showPageNo + 1

          /* 
           mcPage showPageNo totalPages     start到end
              4        5          4           123[4]
            上面计算
                start为0  应该为1
                end为4   没问题
          */
          // start不能小于最小值1
          if (start<1) {
            start = 1
          }
        }

        return {start, end}
      }
    },

    watch: {
      /*
      当接收的currentPage发生改变时调用 
       */
      currentPage (value) {
        // 将当前页码指定为外部传入的值
        this.mcPage = value
      }
    },

    methods: {

      /* 
      将当前页码改为指定页码
      */
      changeCurrentPage (page) {
        // 修改当前页码
        this.mcPage = page
        // 通知外部父组件
        this.$emit('currentChange', page)
      }
    },
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
