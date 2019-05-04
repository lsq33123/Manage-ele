/** 
 * api接口统一管理
 */
import { get, post } from '@/api/myHttp';

var easyMockUrl = 'https://easy-mock.com/mock/5cb07ee7feb02568367811ed/manage-ele';

// 获取 用户列表  不分页
export const getTestUserList = p => post(easyMockUrl+'/userList', p);

// 获取 用户列表  分页
export const getTestUserListByPage = p => get(easyMockUrl+'/userListByPage', p);

// 获取 商务概念菜单树
export const getConceptTree = p => post('com.hs.manager.impl.Business.BusinessConcept_Tree.biz.ext', p);

// 获取 商务概念表格数据
export const getConceptGridData = p => post('com.hs.manager.impl.Business.BusinessConcept.biz.ext', p);

// 保存 商务概念 form 接口
export const saveConceptForm = p => post('com.hs.manager.impl.Business.BusinessConcept_edit.biz.ext', p);

//  商务概念启用/禁用
export const isConceptUse = p => post('com.hs.manager.impl.Business.BusinessConcept_status.biz.ext', p);

//http://tapi.hszb.harsons.cn/service/login
//  获取token 验证
export const getToken = p => post('http://tapi.hszb.harsons.cn/service/login', p);
//  获取 用户信息
export const getUserWorkInfo = p => post('com.saas.commons.model.orgcomponent.getSessionAttributes.biz.ext', p);

//获取工作计划列表
export const getPlanList = p => post('com.hs.plan.PerformanceAssessment.PA_List_Search_List.biz.ext', p);
//获取明细表一
export const getPlanDetailA= p => post('com.hs.plan.PerformanceAssessment.PA_Detail_Search.biz.ext', p);
//获取明细表二
export const getPlanDetailB = p => post('com.hs.plan.PerformanceAssessment.PA_Detail_Searchb.biz.ext', p);
//获取分店地图分布
export const getCompAddress = p => post('http://wechat.harsons.cn/api.php?m=ApiErp&s=getCity&sign=hrs2Nis_da32w45fba&_=1555598503499', p);
//获取分店地图分布
export const getHTML = p => get('https://www.cnblogs.com/leeshine-luo/p/5246076.html', p);
