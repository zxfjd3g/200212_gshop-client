## 今日任务
	订单交易
	支付

## 相关接口函数
	reqTradeInfo()
	reqSubmitOrder (tradeNo, orderInfo)
	reqPayInfo (orderId)
	reqPayStatus (orderId)

## vuex
	order.js
	state: tradeInfo / payInfo
	mutations:
	actions:

## 订单交易
	动态获取交易信息显示
	选中收货地址功能
		默认选中的是默认的收货地址: 使用watch监视 'tradeInfo.userAddressList'
		点击指定某个收货地址
	提交订单
		收集数据
		调用接口请求函数发请求
		如果成功了, 跳转到支付路由并携带获取orderId
		如果失败, 提示

## 支付
	动态获取支付信息: 金额 + 二维码图片url
	显示二维码图片: 利用element-ui
		实现element-ui的按需引入打包
		2种UI组件
		  标签组件  ==> 写对应的标签产生对应的界面效果   <el-pagination>
		  函数/对象组件  ==> 执行函数或调用对象的方法出现对应的效果
		理解对话框:
		  this.$msgbox(): 通用的显示对话框的函数
		  this.$alert(): $msgbox的包装函数, 专门用来显示alert框
		  this.$confirm(): $msgbox的包装函数, 专门用来显示confirm框
		
		  axios()
		  axios.get() 内部都是调用axios()发的get请求
		  axios.post() 内部都是调用axios()发的post请求













## 功能编码任务列表
	功能1--实现: 动态显示订单交易
	功能2--实现: 收件地址选择功能
	功能3--实现: 提交订单
	功能4--实现: 获取支付信息, 生成二维码图片
	功能5--实现: 利用element-ui显示二维码图片
	功能6--实现: 完成支付交互功能
	功能7--实现: 路由组件懒加载与图片懒加载