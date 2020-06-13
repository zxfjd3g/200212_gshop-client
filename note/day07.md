## 今日任务
	1). 加入购物车
	2). AddCartSuccess路由组件
	3). ShopCart路由组件

## 加入购物车
	api: reqAddToCart()
	vuex: addToCart()
	component:
		收集数据
		dispatch()
		如果成功了, 跳转到成功的路由
		如果失败了, 提示

## 如何实现: dispatch异步action完成(成功/失败)后, 再去做某些操作(提示/跳转)
	方式一: 使用回调函数数据
		component:
			dispatch('addToCart', {callback: this.callback}) 
			callback(errorMsg) {// 根据errorMsg是否有值来做相应处理}
		action:
			发异步ajax请求
			如果成功了, 执行callback()
			如果失败了, 执行callback('错误提示文本')
	方式二: 利用dispatch()的返回值是promise
		async函数执行的返回是promise, promise的结果由什么决定?
			函数体执行抛出了异常  ==> 失败, reason就是抛出的异常
			函数体执行返回一个失败的promise ==> 失败, reason就是返回的promise的reason
			函数体执行返回一个成功的promise ==> 成功, value就是返回的promise的value
			函数体执行返回其它任意值 ==> 成功, value就是返回的值
		dispatch()的返回值是promise, 就是异步action执行返回的promise