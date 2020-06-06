module.exports = {
  // lintOnSave: false, // 完全的关闭
  lintOnSave: 'warning', // 输出提示错误, 但项目继续运行

  devServer: {
    proxy: {
      '/api': { // 只对请求路由以/api开头的请求进行代理转发
        target: 'http://182.92.128.115', // 转发的目标url
        changeOrigin: true, // 支持跨域
        /* pathRewrite: { // 如果后台接口没有/api就需要写
          '^/api': ''
        } */
      }
    }
  },
}