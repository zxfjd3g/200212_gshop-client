## 今日任务: 商品详情
    解决search组件中的2个小问题
	Detail静态路由组件
	Detail组件的动态显示
	ImageList组件
	Zoom组件
	添加到购物车

## 解决search组件中的2个小问题
	问题: 点击搜索按钮后, 页面刷新了且地址栏也不正确
	原因: 提交了表单  ==> 页面就会刷新
	解决: 使用.prevent来阻止事件的默认行为

	问题: 搜索的多个参数数据值如果是""或者空数组, 没有必要提交  ==> 优化减少没必要的请求参数
	原因: 当前的后台接口不需要空串参数或空数组参数
	解决: 在提交请求前, 将""参数数据删除

## Detail静态路由组件
	定义Detail静态组件
	注册路由
	从Search跳转Detail组件: router-link/push()
	问题: 路由跳转后, 滚动条没有停留在最上面(0,0)
		scrollBehavior (to, from, savedPosition) {
	    	// return 期望滚动到哪个的位置
	    	return { x: 0, y: 0 }
	  	}