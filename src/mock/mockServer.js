/* 
使用mockjs来mock接口
*/
import Mock from 'mockjs'
import banners from './banners.json' // 引入的是json文件(json数组), 得到的是对应的js的数组
import floors from './floors.json'
import recommends from './recommends.json'

// 模拟返回banners数据接口
Mock.mock('/mock/banners', {code: 200, data: banners})

// 模拟返回floors数据的接口
Mock.mock('/mock/floors', {code: 200, data: floors})

// 模拟返回recommends数据的接口
Mock.mock('/mock/recommends', {code: 200, data: recommends})

// export default xxx  // 不需要
console.log('mockserver...')