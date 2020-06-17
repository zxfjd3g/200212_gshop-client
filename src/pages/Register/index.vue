<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="mobile"
          v-validate="{required: true,regex: /^1\d{10}$/}" name="phone"
          :class="{invalid: errors.has('phone')}">
        <span class="error-msg">{{ errors.first('phone') }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code"
          name="code" v-validate="{required: true, regex: /^\d{4}$/}"
          :class="{invalid: errors.has('code')}">
        <img ref="code" src="/api/user/passport/code" alt="code" @click="updateCode">
        <span class="error-msg">{{ errors.first('code') }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="text" placeholder="请输入你的登录密码" v-model="password"
           name="密码" v-validate="{required: true, min: 6, max: 10}"
          :class="{invalid: errors.has('密码')}">
        <span class="error-msg">{{ errors.first('密码') }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" v-model="password2"
          name="确认密码" v-validate="{required: true, is: password}"
          :class="{invalid: errors.has('确认密码')}">
        <span class="error-msg">{{ errors.first('确认密码') }}</span>
      </div>
      <div class="controls">
        <input type="checkbox" v-model="isAgree"
          name="协议" v-validate="{agree: true}">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first('协议') }}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',

    data () {
      return {
        mobile: '', // 手机号
        code: '', // 验证码
        password: '', // 密码
        password2: '', // 确认密码
        isAgree: false, // 是否同意协议
      }
    },

    methods: {
      /* 
      更新验证码图片 ==> 让浏览器再发一次请求获取新的图片
      */
      updateCode () {
        // 重新指定img的src值  (如果在移动端, 需要携带一个时间戳的参数)
        // this.$refs.code.src = '/api/user/passport/code?time=' + Date.now()
        this.$refs.code.src = '/api/user/passport/code'
      },

      /* 
      注册
      */
      async register () {
        // 先进行前台表单校验, 如果不通过提示并结束
        const success = await this.$validator.validateAll() // 对所有表单项进行验证
        // success如果是true, 代表校验成功, 否则失败
        if (success) {
          // 取出相关数据
          const {mobile, code, password} = this
          try {
            // 分发给注册的异步action请求注册
            await this.$store.dispatch('register', {mobile, code, password})
            // 如果成功了, 自动跳转到登陆界面
            this.$router.replace('/login')
          } catch (error) {
            // 如果失败, 提示并更新验证码
            this.updateCode()
            this.code = ''  // 清除输入验证码
            alert(error.message)
          }
        } else { // else可以不写
          console.log('校验没通过')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
          &.invalid {
            border: solid 1px red;
          }
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>