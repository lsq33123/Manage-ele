import {post,get} from './myHttp'

const baseUrl = 'https://easy-mock.com/mock/5cb07ee7feb02568367811ed';//easyMock地址

//获取用户列表
export const bdbUserList = p =>post('com.hsapi.bdb.background.getUserList.biz.ext',p);
//获取投保地区
export const getInsurCity = p =>post('com.hsapi.bdb.common.getInsurCity.biz.ext',p);
//获取 事故车产值占比统计
export const getAccidentReport = p =>post('com.hsapi.bdb.Quote_Area.getAccidentReport_Area.biz.ext',p);
//获取 公共接口
export const getBySQL = p =>post('com.hs.commons.unify.intfc.biz.ext',p);
//获取 门店分布（按省份显示的接口）
export const queryCompProvince = p =>post('com.saas.compdevelop.expand.tProjectReport.QueryExandCompTypeWithProvince.biz.ext',p);
//获取 门店分布（按区域显示的接口）
export const queryCompArea  = p =>post(baseUrl + '/manage-ele/getCompGroupByArea',p);
//export const queryCompArea  = p =>post('com.saas.compdevelop.expand.tProjectReport.QueryExandCompType.biz.ext',p);
//获取 省份 城市 地区
export const queryAddress  = p =>post('com.hs.commons.region.getRegin.biz.ext',p);




