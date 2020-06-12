<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="options.categoryName">
              {{options.categoryName}}<i @click="removeCategory">×</i>
            </li>
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="options.trademark">
              {{options.trademark}}<i @click="removeTrademark">×</i>
            </li>

            <li class="with-x" v-for="(prop, index) in options.props" :key="prop">
              {{prop}}<i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        
        <!--selector-->
        <SearchSelector :setTrademark="setTrademark" @addProp="addProp"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: isActive('1')}" @click="setOrder('1')">
                  <a href="javascript:">
                    综合
                    <i class="iconfont" v-if="isActive('1')"
                      :class="iconClass"></i>
                  </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{active: isActive('2')}" @click="setOrder('2')">
                  <a href="javascript:">
                    价格
                    <i class="iconfont" v-if="isActive('2')"
                      :class="iconClass"></i>
                  </a>
                </li>
               <!--  <li>
                  <a href="#">价格⬇</a>
                </li> -->
              </ul>
            </div>
          </div>

          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for=" item in productList.goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`">
                      <img :src="item.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{item.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/search/${item.id}`">{{item.title}}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <Pagination 
            :currentPage="options.pageNo"
            :pageSize="options.pageSize"
            :total="productList.total"
            :showPageNo="5"
            @currentChange="getProductList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',

    data () {
      return {
        // 用于发搜索请求的条件参数的对象
        options: {
          category1Id: '', // 一级分类ID
          category2Id: '', // 二级分类ID
          category3Id: '', // 三级分类ID
          categoryName: '', // 分类名称
          keyword: '', // 搜索关键字

          props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] ["2:6.0～6.24英寸:屏幕尺寸"]
          // trademark: '', // 品牌: "ID:品牌名称" "1:苹果"
          order: '1:desc', // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  "1:desc"

          pageNo: 1, // 页码
          pageSize: 2, //	每页数量
        }
      }
    },

    /* 
    常用的就是在mounted()/create()发ajax请求
    */
    created () {
      // 需要根据分类的query参数和关键字的params参数来搜索
      // 1. 根据query和params参数更新options
      this.updateOptions()
      // 2. 发搜索请求
      this.getProductList()
    },

    computed: {
      ...mapState({
        productList: state => state.search.productList
      }),

      iconClass () {
        return this.options.order.split(':')[1]==='asc' ? 'iconup' : 'icondown'
      }
    },

    watch: {
      // 监视路由参数的变化
      $route(to, from) {
        // 1. 根据query和params参数更新options
        this.updateOptions()
        // 2. 发搜索请求
        this.getProductList()
      }
    },

    methods: {

      /* 
      设置新的排序
      */
      setOrder (flag) { // '1' / '2'

        // 取出原本的orderFlag和orderType
        let [orderFlag, orderType] = this.options.order.split(':')  // [orderFlag, orderType]

        // 点击当前排序项: 切换排序方式(排序项不变)
        if (flag===orderFlag) {
          orderType = orderType==='asc' ? 'desc' : 'asc'
        } else { // 点击非当前排序项: 切换排序项, 排序方式为降序
          orderFlag = flag
          orderType = 'desc'
        }

        // 更新order
        this.options.order = orderFlag + ':' + orderType

        // 重新请求获取数据显示
        this.getProductList()
      },

      /* 
      判断指定的flag对应的项是否选中
      */
      isActive (orderFlag) { // '1' / '2'
        return this.options.order.indexOf(orderFlag)===0
      },

      /* 
      删除属性条件
      */
      removeProp (index) {
        // 删除对应的属性条件
        this.options.props.splice(index, 1)
        // 重新请求获取列表数据显示
        this.getProductList()
      },

      /* 
      添加一个属性条件
      */
      addProp (prop) {
        // 如果这个属性条件已经存在, 直接结束
        if (this.options.props.indexOf(prop)>=0) return

        // 向props添加prop
        this.options.props.push(prop)

        // 重新请求获取列表数据显示
        this.getProductList()
      },

      /* 
      移除品牌条件
      */
      removeTrademark () {
        // 清除品牌数据
        // this.options.trademark = ''
        // delete this.options.trademark  // 不可以

        // this.$delete(this.options, 'trademark')
        Vue.delete(this.options, 'trademark')

        // 重新请求获取列表数据显示
        this.getProductList()
      },

      /* 
      设置新的品牌数据
      */
      setTrademark (trademark) {
        // 如果已经有当前品牌的条件数据, 直接结束
        if (this.options.trademark===trademark) return

        // 更新品牌数据
        // 直接通过.添加新属性  ==> 不会自动更新界面
        // this.options.trademark = trademark

        // 直接通过$set添加新属性  ==> 会自动更新界面
        // this.$set( this.options, 'trademark', trademark )
        Vue.set( this.options, 'trademark', trademark )

        // 重新请求获取列表数据显示
        this.getProductList()
      },

      /* 
      删除分类条件
      */
      removeCategory () {
        // 重置相关数据
        this.options.categoryName = ''
        this.options.category1Id = ''
        this.options.category2Id = ''
        this.options.category3Id = ''

        // 重新请求列表数据   这样不好
        // this.getProductList()
        // 重新跳转到当前Search, 干掉分类的query参数
        // this.$router.push({name: 'search', params: this.$route.params})
        this.$router.replace({name: 'search', params: this.$route.params})
      },

      /* 
      删除关键字条件
      */
      removeKeyword () {
        // 重置相关数据
        this.options.keyword = ''
        // 重新请求列表数据  这样不好
        // this.getProductList()
        // 重新跳转到当前Search, 干掉关键字的params参数
        // this.$router.push({name: 'search', query: this.$route.query})
        this.$router.replace({name: 'search', query: this.$route.query})

        // 在Search中: 通过事件总线对象分发自定义事件
        this.$bus.$emit('removeKeyword')
      },

      /* 
      根据query和params参数更新options
      */
      updateOptions () {
        // 取出参数数据
        const {categoryName='', category1Id='', category2Id='', category3Id=''} = this.$route.query
        const {keyword=''} = this.$route.params

        // 更新options
        this.options = {
          ...this.options,
          categoryName,
          category1Id,
          category2Id,
          category3Id,
          keyword,
        } // 同名属性覆盖, 非同名属性保留
      },

      /* 
      获取指定页码的商品列表
      pageNo的默认值是1
      */
      getProductList (pageNo=1) {
        // 更新页码数据
        this.options.pageNo = pageNo
        // 分发异步action, 请求获取数据显示
        this.$store.dispatch('getProductList', this.options)
      },
    },

    components: {
      SearchSelector
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>