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
	