<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userInfo.token">
            <span>{{userInfo.name}}</span> &nbsp;&nbsp;
            <a href="javascript:" @click="logout">退出</a>
          </p>
          <p v-else>
            <span>请</span>
            <!-- <router-link to="/login">登录</router-link> -->
            <router-link :to="{path: '/login'}">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/">
          <img src="./images/logo.png" alt="">
        </router-link>
      </h1>

      <div class="searchArea">
        <form action="/xxx" class="searchForm" @submit.prevent="search">
          <input type="text" id="autocomplete" class="input-error input-xxlarge"  v-model="keyword"/>
          <!-- <button class="sui-btn btn-xlarge btn-danger" @click.prevent="search">搜索</button> -->
          <button class="sui-btn btn-xlarge btn-danger">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Header',

    computed: {
      userInfo () {
        return this.$store.state.user.userInfo
      }
    },

    data () {
      return {
        keyword: ''
      }
    },

    mounted () {
      // 在Header中: 通过事件总线对象绑定自定义事件监听, 在回调中删除输入数据
      this.$bus.$on('removeKeyword', () => {
        this.keyword = ''
      })
    },

    methods: {
      /* 
      退出登陆
      */
      logout () {
        if (confirm('确定退出吗?')) {
          this.$store.dispatch('logout').then(() => {
            this.$router.push('/login')
          }).catch(error => {
            alert(error.message)
          })
        }
      },

      search () {
        const {keyword} = this
        // 编程式路由跳转/导航
        // push('')字符串语法
        // this.$router.push(`/search/${keyword}?keyword2=${keyword.toUpperCase()}`)
        
        // push({})对象语法: 在开发中用得比较多
        const location = {
          name: 'search'
        }
        // 只有当keyword有值, 才去指定params
        if (keyword) {
          location.params = {keyword}
        }

        // 如果当前路由已经有categoryName/cateory1Id/cateory2Id/cateory3Id, 携带上
        // 有什么带什么: 如果有就自然带上了, 如果没有就没携带上
        location.query = this.$route.query

        // this.$router.push(location)  // 重复跳转招聘错误

        // 使用的是vue-router3.1.0的语法(内部不会抛出错误的promise)
        /* this.$router.push(location, () => {
          console.log('跳转成功的回调')
        }) */
       
        // 使用的是vue-router新的语法, 返回的是promise
        /* this.$router.push(location).catch(() => {
          // console.log('出错了')
        }) */

        // 如果当前没有在search, 用push, 否则用replace
        // if (this.$route.name!=='search') {
        if (this.$route.path.indexOf('/search')!==0) {  // 可能是/search/xxx
          this.$router.push(location)
        } else {
          this.$router.replace(location)
        }
        
        // this.$router.push(location, ()=> {})
        // this.$router.replace(location, ()=> {})
      }
    }
  }
</script>

<style lang="less" scoped>
  .header {
    &>.top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
          float: left;

          p {
            float: left;
            margin-right: 10px;

            .register {
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
            }
          }
        }

        .typeList {
          float: right;

          a {
            padding: 0 10px;

            &+a {
              border-left: 1px solid #b3aeae;
            }
          }

        }

      }
    }

    &>.bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
        float: left;

        .logo {
          img {
            width: 175px;
            margin: 25px 45px;
          }
        }
      }

      .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
          overflow: hidden;

          input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #ea4a36;
            float: left;

            &:focus {
              outline: none;
            }
          }

          button {
            height: 32px;
            width: 68px;
            background-color: #ea4a36;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
</style>