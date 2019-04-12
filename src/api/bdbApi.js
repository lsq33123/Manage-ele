import {post,get} from './myHttp'

//获取用户列表
export const bdbUserList = p =>post('com.hsapi.bdb.background.getUserList.biz.ext',p);