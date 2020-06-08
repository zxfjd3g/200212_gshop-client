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
## 优化减少组件对象数量: 使用编程式导航代替声明式导航
## 优化事件处理效率: 利用事件委托
## 利用标签自定义属性携带动态数据
## 控制一级列表的显示与隐藏
## 一级列表显示隐藏的过渡效果
## 优化请求执行的位置, 减少请求次数
## 合并分类query参数与搜索的关键字params参数

数据驱动: 只需要更新数据, 界面就会自动更新  vue是一个数据驱动的库