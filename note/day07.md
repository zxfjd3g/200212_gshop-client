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
		
		方式2.1: 
			component:
				const promise = dispatch('addToCart', {})
				如果promise是成功的, 做成功的处理
				如果promise是失败的, 做失败的处理
			action:
				发异步ajax请
				请求操作失败抛出错误  ===> 请求操作失败时action的promise是失败的, 请求操作成功action的promise是成功的
	
		方式2.2:
			component:
				const errorMsg = await dispatch('addToCart', {})
				如果errorMsg有值, 做失败的处理
				如果errorMsg没值, 做成功的处理
			action:
				发异步ajax请求
				请求操作失败返回错误信息  ===> 请求操作成功/失败时action的promise都是成功, 只是看有没有errorMsg值

## AddCartSuccess路由组件
	使用本地的iconfont
	跳转路由携带数据:
		query/params参数: 刷新数据还在, 不能携带对象数据
		vuex: 在跳转前保存到vuex的state中: 可以传递任意类型的数据, 刷新数据不在了
		sessionStorage与localStorage: 可能利用它们携带基本或对象类型数据, 刷新数据还存在

## sessionStorage与localStorage的区别
	相同点:
		都是window上的属性对象
		语法: setItem(key, value)/getItem(key)/removeItem(key)  key是标识名称, value是json字符串
		都纯浏览器端的存储, 请求时不会自动携带(区别于cookie)
	不同点:
		localStorage: 数据保存在浏览器管理的本地文件中, 刷新或关闭浏览器, 数据依然还在
		sessionStorage: 数据保存在浏览器的运行内存中, 刷新浏览器数据还在, 但关闭浏览器数据不在(浏览器关闭后可能在后台运行)

		