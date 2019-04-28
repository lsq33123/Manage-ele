import {post,get} from './myHttp'

//获取用户列表
export const bdbUserList = p =>post('com.hsapi.bdb.background.getUserList.biz.ext',p);
//获取投保地区
export const getInsurCity = p =>post('com.hsapi.bdb.common.getInsurCity.biz.ext',p);