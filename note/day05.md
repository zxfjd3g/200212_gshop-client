## 今日任务: Search组件
	1). 根据分类/关键条件进行搜索
	2). 根据品牌进行搜索
	3). 根据属性进行搜索
	4). 排序搜索
	5). 自定义分页组件

## 使用已封装好的分页组件显示
	vue自定义事件: 实现子组件向父组件通信
	子组件: 分发自定义事件: this.$emit('eventName', data)
	父组件: 给子组件对象绑定事件监听 @eventName="getProductList", 并在回调函数中更新数据

## 根据分类/关键条件进行搜索
	分类条件数据: categoryName / category1Id / category2Id / category3Id
	关键字条件数据: keyword

	需要根据分类的query参数和关键字的params参数来搜索
		在created()中
		先根据query & params参数来更新options数据
		根据options数据发搜索的请求
	
	问题: 在搜索界面, 再通过点击分类或点击搜索跳转到搜索界面, 不会再发搜索的请求
	原因: 从A路由跳转到A路由, A路由组件对象不会重新创建(即使参数变化) ==> 不会再次调用初始勾子(created) ==> 没有发请求
	解决： 路由组件中如何监视路由参数数据变化?
		通过watch $route来监视路由参数的变化
		一旦路由参数变化了, 路由组件对象的$route属性值就是一个全新的