## 今日任务
	1). 根据mock的接口实现动态ListContainer与Floor组件
	2). 抽取一个轮播组件Carousel
	3). Search组件

	4). 自己mock一下今日推荐的接口并动态显示(自己独立完成)

## 实现静态组件的swiper效果
	下载swiper
	引入: js/css
	模板页面: 层次结构与类名
	创建一个swiper对象并配置:  必须在轮播列表显示之后创建才有效  ==> 在mounted()中 

## 问题: 为广告轮播创建的swiper对象也影响到了楼层的轮播页面
	原因: new Swiper('.swiper-container'), 类名选择器也匹配了楼层的轮播页面 ==> 也产生了轮播的效果
	解决: 使用vue的ref技术 new Swiper(this.$refs.swiper) ===> 不会再影响到其它组件的轮播页面

## ListContainer与Floor组件动态展现
	api: 
		reqBanners()
		reqFloors()
	vuex: 
		banners / floors
		getBanners() / getFloors()
	组件:
		dispatch()
		mapState()
		模板中显示

## 问题: 动态组件轮播有问题(没有轮播效果)
	原因: 创建swiper对象的时间太早(在列表显示之前)
	解决:  在列表显示之后创建swiper对象
		办法一: 使用setTimeout延迟执行  ==> 不合适(因为请求获取数据的时间不确定)
		办法二: watch + nextTick()
			watch的回调: 在数据发生改变后执行(banners有数据了)
			nextTick(callback): 这次数据改变对应界面更新已经完成
			
		理解: 更新数据 / 调用监视的回调 / 更新界面 的流程
			我们更新数据 ==> vue自动调用监视的回调(界面还没更新) ==> vue自动更新界面

		理解: nextTick()
			2个API: Vue.nextTick( callback )
					vm.$nextTick( callback )
			我们什么时候调用nextTick()? 在数据更新之后, 界面更新之前
			Vue什么时候回调callback? 在界面更新后执行

## 抽取轮播组件: Carousel
	声明接收属性: props: carouselList /autoplay
	模板: 根据接收的carouselList显示轮播列表
	创建Swiper对象: watch + nextTick()

## 问题: Listainer中的轮播没有问题, 但2个Floor的轮播不可以
	原因: 
		基础理解: 
			给组件标签传入的属性值是undefined/空数组, 组件对象会创建
			如果组件标签的v-for遍历的值是undefined/空数组, 组件对象不会创建
			watch的回调默认什么时候调用: 在监视的数据发生改变时才调用, 初始显示时不调用
		得到结果:
			banners对应的<Carsoursel>有经历数据更新的过程 ===> 调用监视回调  ==> 创建swiper对象
			floors对应的2个<Caroursel>没有经历数据更新的过程 ==> 没有调用监视回调  ==> 不会创建swiper对象
		详细过程:
			<ListContainer />
				<Carousel :carouselList="banners"/>
			banners的变化: 
				[] ===> [...]
				创建Carousel组件对象 ==> 更新组件对象 ==> 调用监视回调创建Swiper对象

			<Floor v-for="floor in floors" :key="floor.id" :floor="floor"/>
				<Carousel :carouselList="floor.carouselList"/>
			floors的变化: 
				[] ===> [{carouselList: []}, {carouselList: []}]
				不创建Carousel组件对象  ==> 创建Carousel组件对象 ==> 不会调用监视的回调
			
	解决:
		办法1: 给watch添加immediate配置, 让监视回调在初始时就会执行一次, 只有当有数据时才创建
		办法2: 如果初始时已经有数据了, 就创建一个对应的swiper对象


## 组件对象是否创建相关的情况
	a = []
	b = undefined
	<T :a="a">  会创建组件对象  属性值是多少完全不影响组件对象的创建
	<T v-for="item in a"> 不会创建  只有数组中有元素时才会创建
	<T v-if="a"> 会创建  []转换为boolean是true   只有是true才会创建, fale不创建
	<T v-if="b"> 不会创建 undefined转换为boolean是false
	<T v-show="b"> 会创建, 只是通过样式来隐藏组件对象对应的界面   无论是true/false都会创建