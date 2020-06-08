## 今日任务
	1). TypeNav的交互(与用户)效果
	2). mock数据接口
	3). ListContainer组件动态显示
	4). Floor组件动态显示

## 事件控制二三级分类列表的显示与隐藏
	设计状态数据: currentIndex: 标识哪个下标的分类项需要显示子分类列表 
	定义显示子分类的样式类名: item_on
	绑定事件监听, 更新状态数据currentIndex
		mouseenter: 在每个分类项上, currentIndex更新为对应的下标
		mouseleave: 给包含h2和分类div的父元素绑定监听, 但又不能包含<nav> ==> 需要修改页面结构
					更新currentIndex为-1

## 优化高频事件触发处理: 利用lodash进行函数节流处理
	问题: 在快速滑动时, mouseenter事件高频触发, 导致currentIndex高频更新  ===> 界面在高频更新(不必要)
	解决: 利用lodash库的throttle来进行函数节流处理

## 优化减小打包文件: 对lodash库实现按需引入 
	问题: import _ from 'lodash'  // 引入整个lodash为, 还没有使用的工具函数也被打包了
	解决: import throttle from 'lodash/throttle' // 只引入需要的工具函数 ==> 打包文件变小了1.4M

## 解决快速移出后可能显示第一个分类的子分类列表的bug
	原因: 在进入第一个分类项后0.2s才真正更新currentIndex为0
		但在0.2s内, 已经移出了整体div
	解决: 设计currentIndex有3种值
		-2: 出了整个div
		-1: 进入了整个div, 但还没有进入分类项上
		>=0: 光标在某个分类项上(只有当不为-2才更新)

## 优化减少组件对象数量: 使用编程式导航代替声明式导航
	需求: 点击某个分类项, 跳转到Search路由, 并携带categoryName & category1Id/category2Id/category3Id
	实现: 使用声明路由导航<router-link>
	问题: 每个分类都要创建一个RouterLink组件对象(非常多), 显示缓慢
	解决: 使用编程式路由导航, 不用创建RouterLink组件对象, 显示更快  
		绑定点击监听, 在回调函数中通过push()/replace()来跳转
		如何标识3分分类? 通过不同的属性名
	
## 优化事件处理效率: 利用事件委托
	问题: 每个分类项都需要绑定点击监听, 监听数量太多了, 效率不高
	解决: 利用事件委托, 绑定一个点击监听来搞定所有分类项的点击响应

## 利用标签自定义属性携带动态数据
	问题: 如何得到对应的分类项的数据
	解决: 利用标签的data自定义属性 (H5的语法)
		给a标签指定data自定义属性: <a :data-categoryName="c1.categoryName">
		在事件回调函数读取data自定义属性值: const {categoryname} = event.target.dataset


## 控制一级列表的显示与隐藏
## 一级列表显示隐藏的过渡效果
## 优化请求执行的位置, 减少请求次数
## 合并分类query参数与搜索的关键字params参数

数据驱动: 只需要更新数据, 界面就会自动更新  vue是一个数据驱动的库