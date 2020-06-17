/* 
axios的二次封装(axios本身就是对XHR原生ajax的封装)     面试必说
1. 配置通用的基础路径和超时
    const intance = axios.create({baseURL, timeout})  // intance是一个能发ajax请求的函数
    向外暴露的必须是instance
2. 显示请求进度条
    显示: 在请求拦截器回调中执行: NProgress.start()
    隐藏: 在请求完成后的成功或失败回调中执行: NProgress.done()
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
    在响应拦截器成功回调中: return response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
    在响应拦截器失败的回调中: 提法错误信息, 抛出error或返回失败的promise

5. 每个请求自动携带userTempId的请求头: 在请求拦截器中实现
6. 登陆后每个请求自动携带token的请求头: 在请求拦截器中实现
*/
import axios from 'axios'
import NProgress from 'nprogress'
import store from '@/store'

/* 1. 配置通用的基础路径和超时 */
// instance是一个与axios功能类似的ajax请求函数
const instance = axios.create({
  baseURL: '/api',  // 基础path
  // baseURL: 'http://182.92.128.115/api',
  timeout: 15000 // 请求超时时间
})

// 注册请求拦截器
// axios.interceptors.request.use(config => { // 不正确
instance.interceptors.request.use(config => { // 在真正发送请求前执行
  /* 2.1 在请求拦截器回调中执行: NProgress.start() */
  NProgress.start()

  /* 5. 每个请求自动携带userTempId的请求头: 在请求拦截器中实现 */
  // config.headers['userTempId'] = this.$store.state.user.userTempId  // 不可以, this不是组件对象
  config.headers['userTempId'] = store.state.user.userTempId 

  /* 6. 登陆后每个请求自动携带token的请求头: 在请求拦截器中实现 */
  const token = store.state.user.userInfo.token
  if (token) {
    config.headers['token'] = token
  }

  return config
})

// 注册响应拦截器
instance.interceptors.response.use(
  response => { // 请求成功后的回调
    /* 2.2 隐藏: 在请求完成后的成功或失败回调中执行 */
    NProgress.done()

    // return response
    /* 3. 成功返回的数据不再是response, 而直接是响应体数据response.data */
    return response.data
  },

  error => { // 请求失败后的回调
    /* 2.1 隐藏: 在请求完成后的成功或失败回调中执行 */
    NProgress.done()

    /* 4. 统一处理请求错误, 具体请求也可以选择处理或不处理 */
    // 显示一个统一的提示
    alert(error.message || '未知错误')

    // 要么抛出error 或者返回一个失败的promise
    // throw error
    return Promise.reject(error)

    // return error  // 不可以
  }
)



// 向外暴露的必须是这个instance, 不能是axios
export default instance
