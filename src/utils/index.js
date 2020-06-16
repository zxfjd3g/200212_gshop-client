/* 
包含一些工具函数的模块
*/

import { v4 as uuidv4 } from 'uuid'

/* 
得到一个用户临时ID
1. 从localStorage中读取, 如果有返回它
2. 如果没有, 使用uuid生成一个新的, 保存到localStorage中, 返回它
*/
export function getUserTempId () {
  // 1. 从localStorage中读取, 如果有返回它
  let userTempId = localStorage.getItem('USER_TEMP_ID_KEY')
  // 2. 如果没有, 使用uuid生成一个新的, 保存到localStorage中, 返回它
  if (!userTempId) {
    userTempId = uuidv4()
  }
  // 返回它
  return userTempId
}