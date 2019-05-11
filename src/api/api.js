import axios from 'axios'

let base = ''


export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data) }

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }) }

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }) }

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }) }

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }) }

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }) }

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }


export const getConceptTree = params => { return axios.get(`${base}/com.hs.manager.impl.Business.BusinessConcept_Tree.biz.ext`, { params: params }) }
export const getConceptGridData = params => { return axios.get(`${base}/com.hs.manager.impl.Business.BusinessConcept.biz.ext`, { params: params }) }
export const saveConceptForm = params => { return axios.get(`${base}/com.hs.manager.impl.Business.BusinessConcept_edit.biz.ext`, { params: params }) }
export const isConceptUse = params => { return axios.get(`${base}/com.hs.manager.impl.Business.BusinessConcept_status.biz.ext`, { params: params }) }

// // 获取 商务概念菜单树
// export const getConceptTree = p => post('com.hs.manager.impl.Business.BusinessConcept_Tree.biz.ext', p);

// // 获取 商务概念表格数据
// export const getConceptGridData = p => post('com.hs.manager.impl.Business.BusinessConcept.biz.ext', p);

// // 保存 商务概念 form 接口
// export const saveConceptForm = p => post('com.hs.manager.impl.Business.BusinessConcept_edit.biz.ext', p);

// //  商务概念启用/禁用
// export const isConceptUse = p => post('com.hs.manager.impl.Business.BusinessConcept_status.biz.ext', p);


