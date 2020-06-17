/* 
专门用来做表单验证的模块
*/
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN' // 引入中文message

Vue.use(VeeValidate) 
// 内部定义了一个v-validate的指令及$validator的对象他errors对象

// 提示文本信息本地化
VeeValidate.Validator.localize('zh_CN', {
  // messages: zh_CN.messages, // 指定中文的message列表
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`  // 修改内置规则的message
  },
  attributes: { // 给校验的field属性名映射中文名称
    phone: '手机号',
    code: '验证码',
  }
})
  
// 自定义验证规则
VeeValidate.Validator.extend('agree', {
  validate: value => {// 校验函数, 如果返回值为true代表通过, 返回false代表不通过
    return value
  },
  getMessage: field => field + '必须同意'
})