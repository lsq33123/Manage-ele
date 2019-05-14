import {post,get} from './myHttp'

const easyUrl = 'https://easy-mock.com/mock/5cb07ee7feb02568367811ed/manage-ele';//easyMock地址

//获取用户列表
export const bdbUserList = p =>post('com.hsapi.bdb.background.getUserList.biz.ext',p);
//获取投保地区
export const getInsurCity = p =>post('com.hsapi.bdb.common.getInsurCity.biz.ext',p);
//获取 事故车产值占比统计
export const getAccidentReport = p => post('com.hsapi.bdb.Quote_Area.getAccidentReport_Area.biz.ext', p);

//=====================渠道管理===================================
//获取 公共接口
export const getBySQL = p =>post('com.hs.commons.unify.intfc.biz.ext',p);
//获取 门店分布（按省份显示的接口）
export const queryCompProvince = p =>post('com.saas.compdevelop.expand.tProjectReport.QueryExandCompTypeWithProvince.biz.ext',p);
//获取 门店分布（按区域显示的接口）
export const queryCompArea  = p =>post(easyUrl + '/comp/getCompGroupByArea',p);
//export const queryCompArea  = p =>post('com.saas.compdevelop.expand.tProjectReport.QueryExandCompType.biz.ext',p);
//获取 省份 城市 地区
export const queryAddress  = p =>post('com.hs.commons.region.getRegin.biz.ext',p);
//获取 门店地理位置分布坐标
//export const getCompAddressInfo  = p =>get('http://wechat.harsons.cn/api.php?m=ApiErp&s=getCity&sign=hrs2Nis_da32w45fba',p);
export const getCompAddressInfo = p => post(easyUrl + '/comp/getCompAddressInfo', p);

//获取 区域列表
export const getAreaList  = p =>post('build/tzCompExpand/com.saas.commons.model.orgcomponent.getAreaByBI.biz.ext',p);

//获取 区域列表
const areaUrl = 'http://124.172.221.179/vapp/com.saas.commons.model.orgcomponent.getAreaByBI.biz.ext';
//获取 门店列表
const compUrl = 'http://124.172.221.179/vapp/com.saas.commons.model.orgcomponent.getUserCompGover.biz.ext';
var vappToken = '?token='+'45ab118c-9c2d-3fc9-bb03-dece99906f1a';
export const getVappArea = p => post(areaUrl + vappToken,p);
export const getVappComp = p => post(compUrl + vappToken, p);

//获取 正在拓展的门店数量
export const getCompTzNum = p => post(easyUrl + '/comp/getCompTzNum',p)
//获取 正在拓展的门店数量 按区域维度
export const getCompTzByArea = p => post(easyUrl + '/comp/getCompTzByArea',p)
//获取 正在拓展的门店数量 按省份维度
export const getCompTzByPro = p => post(easyUrl + '/comp/getCompTzByPro',p)

//获取 分店面积及车间工位数
export const getCompWorkShop = p => post('com.saas.compdevelop.expand.workShopEfficacyExpand.searchData.biz.ext',p)
//获取 门店拓展进度列表
//export const getCompFollowList = p => post('com.saas.compdevelop.expand.tProjectReport.Follow.biz.ext',p)
const followUrl = 'http://124.172.221.179/vapp/com.saas.compdevelop.expand.tProjectReport.Follow.biz.ext';
export const getCompFollowList = p => post(followUrl + vappToken, p);

//=====================渠道管理===================================
//获取 公共接口 （运营检核模板）
const sCheckModelUrl = 'http://124.172.221.179/vapp/com.hs.commons.unify.intfc.biz.ext';
//export const getIntfc = p => post(sCheckModelUrl + vappToken, p);
export const getIntfc = p => post('com.hs.commons.unify.intfc.biz.ext', p);

//获取 保存（运营检核模板）
export const getMenuSave = p => post('com.hsweb.management.OperatingCheck.getMenuSave.biz.ext', p);