## 今日任务  购物车
	1). 显示购物车数据
	2). 勾选/不勾选某个商品 / 改变某个购物项商品的勾选状态
	3). 全选或全选
	4). 修改商品数量
	5). 删除某个商品
	6). 删除所有选中商品

## 显示购物车数据
	api: reqShopCart()
	vuex: shopCart.js:
		state: cartList
		mutations:RECEIVE_CART_LIST()
		actions: getCartList()
		getters: 
	component:
		dispatch()
		mapState()
		模板
	问题: 请求获取不到购物列表数据
	疑问: 服务器端如何识别不同的浏览器
	解决: 通过用户临时ID的请求头标识

## 用户临时ID
	作用: 用来标识某个浏览器客户端的唯一标识字符串  'b2f79046-7ee6-4dbf-88d0-725b1045460b'
	特点:
		不同的浏览器访问产生的值肯定不一样, 同一个浏览器多次产生也不样
		浏览器端生成, 并保存在浏览器端, 每次请求都会通过请求头来携带给服务器端
		服务器端保存购物车数据时是以它为标识保存
	创建:
		使用uuid/uuidjs工具库生成
		import { v4 as uuidv4 } from 'uuid';
		uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
	保存:
		localStorage: 以USER_TEMP_ID_KEY为key保存  ==> 关闭浏览/电脑后再打开数据依然存在
		vuex的state中: 保存到user模块中的userTempId状态中  ==> 不用多次从localStorage中读取
	使用:
		每个请求自动携带userTempId的请求头: 在请求拦截器中实现

## 勾选/不勾选某个商品 / 改变某个购物项商品的勾选状态
	api: reqCheckCartItem (skuId, isChecked)
		skuId: 商品的ID
		isChecked: 商品选中状态, '0'代表不选中, '1'代表选中
	vuex: checkCartItem({commit}, {skuId, isChecked})
	component:
		在change事件回调中, 分发触发checkCartItem action调用  ===> 发请求
		如果失败了, 提示
		如果成功了, 重新获取购物车数据显示

## 全选或全选
	api: 没有对应的接口, 得使用reqCheckCartItem(skuId, isChecked)
	vuex: checkAllCartItems()
		1). 需要对所有购物项与checked不一致的购物项发送请求
		2). 针对每个需要发请求的item去触发checkCartItem()调用  ===> 调用dispatch()
		3). context对象的结构:
		  {
		    state,      // 等同于 `store.state`，若在模块中则为局部状态
		    getters,    // 等同于 `store.getters`
		    commit,     // 等同于 `store.commit`
		    dispatch,   // 等同于 `store.dispatch`
		  }
		4). 执行多个请求的异步操作, 只有当都成功时, 整体异步action才成功, 否则失败
		  const promise = Promise.all([p1, p2, p3])
	component:
		对应setter方法中, 分发触发checkAllCartItems action调用  ===> 发请求
		如果失败了, 提示
		如果成功了, 重新获取购物车数据显示