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

## Detail组件的动态显示
	api: getDetailInfo()
	vuex: detail.js: state/mutations/actions/getters
	component: dispatch()/mapState()/mapGetters()/模板

## 错误: "TypeError: Cannot read property 'category1Name' of undefined"
	说明: 在undefined上读取了category1Name属性
	原因:  data/state中的数据初始值是一个空对象/空数组, 如果模板中直接写一个三层(a.b.c)表达式
	解决1: 想办法不让detailInfo.categoryView的结果是undefined, 利用getters
	解决2: 利用v-if来判断, 只有当有数据才解析显示,  ==> 不能使用v-show

## 销售属性列表功能 (大家自己做)
	功能: 
		二层嵌套列表 
		点击某一项就选中对应的项
	数据: 
		detailInfo中的spuSaleAttrList属性
		isChecked属性为'1'时代表是当前的

## ImageList组件
	使用swiper显示小图片轮播列表:
		slidesPerView: 5,  // 一次显示5页
      	slidesPerGroup: 5, // 每次翻动多少(5)页
	使用currentIndex标识当前图片下标, 点击时更新它
	
## Zoom组件
	根据传入的imgUrl和bigUrl来动态显示中图和大图
	放大镜效果的布局:
		左侧:
			<img>: 显示中图
			event的<div>: 用来绑定mousemove事件, 尺寸与<img>一样
			mask的<div>: 遮罩, 尺寸是<img>的1/4
		右侧:
			big的<div>: 包含<img>, 尺寸与左侧<img>一样
			<img>: 显示大图, 尺寸是左侧<img>的4倍  ==> 右侧只能看到大图的1/4部分
	放大镜的事件处理
		绑定什么事件监听?
			mousemove
		给谁绑定?
			左侧的event <div>
		回调函数中做什么?

			计算left与top值:
				依赖数据: 事件的offsetX/offsetY, mask <div>的宽度maskWidth
				算法:
					left = offsetX - maskWidth/2
					top = offsetY - maskWidth/2
					left和top必须在[0, maskWidth]区间内
	
			指定mask <div>的坐标值(left, top)
				maskDiv.style.left = left + 'px'
				maskDiv.style.top = top + 'px'
			指定大图 <img>的坐标值(left, top)
				bigImg.style.left = -2 * left + 'px'
				bigImg.style.top = -2 * top + 'px'

