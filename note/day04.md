## 今日任务
    1). 根据mock的接口实现动态ListContainer与Floor组件
	2). 抽取一个轮播组件Carousel
	3). Search组件

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
		办法二: 