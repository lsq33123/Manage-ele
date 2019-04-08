/** 
 * api接口统一管理
 */
import { get, post } from './myHttp'

// 获取 商务概念菜单树
export const getConceptTree = p => post('com.hs.manager.impl.Business.BusinessConcept_Tree.biz.ext', p);

// 获取 商务概念表格数据
export const getConceptGridData = p => post('com.hs.manager.impl.Business.BusinessConcept.biz.ext', p);

// 保存 商务概念 form 接口
export const saveConceptForm = p => post('com.hs.manager.impl.Business.BusinessConcept_edit.biz.ext', p);

//  商务概念启用/禁用
export const isConceptUse = p => post('com.hs.manager.impl.Business.BusinessConcept_status.biz.ext', p);


