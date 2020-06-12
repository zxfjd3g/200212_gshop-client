## 今日任务: Search组件
	1). 根据分类/关键条件进行搜索
	2). 根据品牌进行搜索
	3). 根据平台属性进行搜索
	4). 排序搜索
	5). 响应式数据对象: 添加新属性和删除属性
	6). 自定义分页组件

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

	显示分类条件和关键字条件
	删除分类条件和关键字条件
		重置相关数据
		重新请求获取数据

	问题: 删除分类和关键字条件后, 地址栏还有这些参数数据
	解决: 删除分类和关键字条件, 去掉对应的参数数据
		删除分类: 重新跳转到Search, 不携带query参数, 需要携带params
		删除关键字: 重新跳转到Search, 不携带params参数, 需要携带query

	问题: 删除关键字条件后, Header中输入框的关键字文本还在
	解决: 在删除关键字的回调中通知Header中删除输入框数据  ==> 兄弟组件间通信
		使用技术: 全局事件总线
		1). 将全局事件总线对象(vm)保存到Vue原型对象上
		2). 在Search中: 通过事件总线对象分发自定义事件
		3). 在Header中: 通过事件总线对象绑定自定义事件监听, 在回调中删除输入数据
	
	问题: 在搜索界面再次反复搜索后, 一次性回退不到home页  ==> 目标是一次回到Home
	原因: 从Search ==> Search我们现在用的是push()
	解决: 从Search ==> Search, 使用replace()
	
## 根据品牌进行搜索
	品牌数据的结构: trademark "ID:品牌名称" "1:苹果"
	子组件向父组件: 函数类型props
	限制: 如果点击的的品牌已经在条件中了, 不发请求

## 根据属性进行搜索
	属性数据的结构: props: [], // ["属性ID:属性值:属性名"] ["2:6.0～6.24英寸:屏幕尺寸"]
	添加属性条件:		
		子组件向父组件: 自定义事件
		事件名: addProp
		数据: "属性ID:属性值:属性名"
	移除一个属性条件

## 排序搜索
	排序的数据结构: order: '1:desc', // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  "1:desc"
		oderFlag: '1' / '2'
		orderType: 'asc' / 'desc
		orderFlag:orderType
	当前排序项? 
		根据当前order的oderFlag来确定
	当前排序方式?
		根据当前order的orderType来确定
	点击排序项切换排序
		点击当前排序项: 切换排序方式(排序项不变)
		点击非当前排序项: 切换排序项, 排序方式为降序
	
	注意: 如果不想把模块中的表达写得太长: 需要定义对应的计算属性或者方法

## 响应式数据对象: 添加新属性和删除属性
	data或state中的所有层次的属性数据都是响应式的(属性值发生变化, 界面就会自动更新)
	响应式数据对象: data或state中对象类型的属性: 比如options
	给响应式数据对象添加新属性
		错误的写法：   不是响应式  ==> 不会自动更新界面
			options.xxx = 'abc' 
		正确的写法:  是响应式的 ==> 会自动更新界面
			Vue.set( target, key, value )
			vm.$set( target, key, value )
	删除属性响应式数据对象的属性
		错误的写法：   
			delete options.xxx   vue内部不知道, 界面不会自动更新
		正确的写法:  方法内部先删除属性, 再更新界面
			Vue.delete( target, key )
			vm.$delete( target, key )

## 自定义分页组件
	直接使用已定义好的组件
		<Pagination 
	        :currentPage="options.pageNo"
	        :pageSize="options.pageSize"
	        :total="productList.total"
	        :showPageNo="5"
	        @currentChange="getProductList"
        />
	封装一个高复用的组件: Pagination      应该面试时交流
		静态模板与样式  ===> 静态组件
		设计props: 从父组件接收的可变数据
			currentPage: 当前页码
			pageSize: 每页数量
			total: 总数量
			showPageNo: 连续页码数 (一般是奇数)
		
		设计data: 组件内部的可变数据
			myCurrentPage: 组件内部维护的当前页码
		
		设计computed: 根据props或data数据计算产生的数据
			totalPages: 总页数
				依赖数据: total / pageSize   19 / 2  10
				算法: Math.ceil(total/pageSize)
			start/end: 连续页码的开妈页码与结束页码
				依赖数据: myCurrentPage / showPageNo / totalPages
				算法:
					start的最小值是1
					end的最大值是totalPages
					从start到end的数量为showPageNo
		
		模板页面根据props/data/computed动态显示
			v-for/v-if/disabled
			v-for与v-if优先级问题    面试问

		当用户操作时更新数据  ==> 更新界面
			当当前组件更新数据后, 有可能需要通知父组件(使用什么技术? 自定义事件/函数props)
			当父组件的数据更新后, 有可能需要通知子组件
					父组件主动调用子组件的方法修改 ===> 当前不用(后面会用的)
					子组件主动监视父组件的变化  ===> 当前比较合适