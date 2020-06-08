## 今日任务
    1). Home组件及其子组件(静态)
    2). 后台接口与使用postman测试接口
    3). ajax与后台进行交互
    4). 使用vuex管理组件状态数据
    5). TypeNavx组件动态展现

## Home组件及其子组件(静态)
    // 我来做
    1.TypeNav: 3级分类导航
    2.ListContainer: 包含轮播列表的容器
    // 大家自己做
    3.TodayRecommend: 今日推荐
    4.Rank: 排行
    5.Like: 猜你喜欢
    6.Floor: 楼层
    7.Brand: 品牌
    注意: 图片

## 后台接口与使用postman测试接口
    1). 启动 ===> 选择登陆==> cancel ===> 进入主界面
    2). 输入url/参数进行请求测试
    3). 注意post请求体参数需要指定为json格式(后台只支持json格式, 不支持urlencoding)
    4). 保存测试接口 ==> 后面可以反复使用

## ajax与后台进行交互
    1). 下载依赖包: npm install -S axios nprogress
    2). axios的二次封装(axios本身就是对XHR原生ajax的封装)     面试必说
        1. 配置通用的基础路径和超时
            const intance = axios.create({baseURL, timeout})  // intance是一个能发ajax请求的函数
            向外暴露的必须是instance
        2. 显示请求进度条
            显示: 在请求拦截器回调中执行: NProgress.start()
            隐藏: 在请求完成后的成功或失败回调中执行: NProgress.done()
        3. 成功返回的数据不再是response, 而直接是响应体数据response.data
            在响应拦截器成功回调中: return response.data
        4. 统一处理请求错误, 具体请求也可以选择处理或不处理
            在响应拦截器失败的回调中: 提法错误信息, 抛出error或返回失败的promise

    3). 接口请求函数模块
        包含项目中所有接口对应的ajax请求函数
        函数的返回值是promise, 函数内部调用ajax模块发请求
        需要掌握一个技能: 根据接口文档, 定义接口请求函数
    
    4). 测试调用接口请求函数获取数据
        出404错误
            axios配置请求地址: /api/product/getBaseCategoryList
            发请求所在的基础url: http://localhost:8080
            http://localhost:8080/api/product/getBaseCategoryList(没有处理, 就404)
            后台接口的地址: http://182.92.128.115/api/product/getBaseCategoryList(没有处理)
        解决办法1: 使用CORS解决ajax请求跨域
            给axios指定正确的地址: baseURL: http://182.92.128.115/api
            这样ajax请求就跨域了: 服务器返回特别的响应头
                Access-Control-Allow-Credentials: true
                Access-Control-Allow-Origin: http://localhost:8080
        解决办法2: 使用代理服务器   开发中用得比较多
            配置代理服务器: 
                devServer: {
                  proxy: {
                    '/api': { // 只对请求路由以/api开头的请求进行代理转发
                      target: 'http://182.92.128.115', // 转发的目标url
                      changeOrigin: true // 支持跨域
                    }
                  }
                },
            baseURL: baseURL: '/api'

## 使用vuex管理组件状态数据
    vuex用来做什么?
        vuex用来管理多个组件共享的状态数据
        从后台动态获取数据
    vuex的基本使用
        store相关: index / state / mutations / actions / getters 
        注册store: vm中注册store  ==> 组件中通过$store得到store对象
        组件:  通过$store来读取或更新vuex管理的state数据
              也可以通过mapState() / mapGetters() / mapMutations() / mapActions()
    vuex的多模块编程的必要性
        vuex单模块问题: 需要的管理状态数据比较多, 那对应的mutations/actions模块就会变得比较大
            如果添加新的数据管理, 需要修改现在文件(不断向其添加内容) 
        vuex多模块编程: 对各个功能模块的数据分别进行管理, 这样更加具有扩展性
        什么时候需要用vuex多模块编程?  需要vuex管理的数据比较多时使用
    多模块编程的总state结构:
        {
            home:{
                categoryList: [], // 分类列表
                xxx: {},
                yyy: 'atguigu'
            }
            user: {
                userInfo: {}
            }
        }
    针对三级分类使用vuex管理
        api: reqCategoryList
        vuex: home.js中编写
            异步action: 
                调用接口请求函数发异步ajax请求
                请求成功后, 取出数据, 提交给mutation保存
            mutation: 
                根据接收的数据参数更新当前模块的state中的状态数据
            state: {categoryList, ...}
        组件:
            分发异步action请求获取数据到state: 数据从接口===> vuex的state
            读取vuex的state中的数据到组件的计算属性: 数据从vuex的state ===> 组件的计算属性
            在模板中动态显示: 插值 / 指令