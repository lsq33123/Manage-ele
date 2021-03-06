import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/login',
            component: () => import('./views/Login.vue'),
            name: '',
            hidden: true
        },
        {
            path: '/404',
            component: () => import('./views/404.vue'),
            name: '',
            hidden: true
        },
        {
            path: '/',
            component: () => import('./views/Home.vue'),
            name: '',
            iconCls: 'fa fa-vimeo-square', // 图标样式class
            leaf: true,
            children: [{
                    path: '/main',
                    //component: () => import('./views/Main.vue'),
                    component: () => import('./views/charts/echarts.vue'),
                    name: '主页',
                    //hidden: true
                }
            ]
        },
        {
            path: '/',
            component: () => import('./views/Home.vue'),
            name: '门店信息',
            iconCls: 'fa fa-institution',
            //leaf: true,//只有一个节点
            children: [{
                path: '/compView',
                component: () => import('./views/compMgr/compView.vue'),
                name: '总体概览'
            },{
                path: '/compMap',
                component: () => import('./views/compMgr/compMap.vue'),
                name: '地图分布'
            },{
                path: '/compTzDetail',
                component: () => import('./views/compMgr/compTzDetail.vue'),
                name: '拓展概况'
            },{
                path: '/compTzPace',
                component: () => import('./views/compMgr/compTzPace.vue'),
                name: '拓展进度'
            },{
                path: '/compWorkshop',
                component: () => import('./views/compMgr/compWorkshop.vue'),
                name: '车间工位'
            },{
                path: '/compOpenApplication',
                component: () => import('./views/compMgr/compOpenApplication.vue'),
                name: '开通申请'
            }
            ]
        },
        {
            path: '/',
            component: () => import('./views/Home.vue'),
            name: '设计',
            iconCls: 'fa fa-map-o', // 图标样式class
            children: [{
                path: '/business',
                component: () => import('./views/myself/business/business.vue'),
                name: '商务概念'
            },{
                path: '/serviceCheckModel',
                component: () => import('./views/myself/business/serviceCheckModel.vue'),
                name: '运营检核模板'
            }]
        },
        {
            path: '/',
            component: () => import('./views/Home.vue'),
            name: 'Bing Bing Bing',
            iconCls: 'fa fa-bell-o',
            children: [{
                path: '/bdbUserList',
                component: () => import('./views/bdb/bdbUserList.vue'),
                name: '用户列表'
            }, {
                    path: '/companyMap',
                    component: () => import('./views/bdb/companyMap.vue'),//companyMap.vue
                name:'门店分布图'
                },{
                    path: "/firstPrice",
                    component: () => import('./views/bdb/firstPrice.vue'),
                    name:"报价管理"
                }, {
                    path: '/carAccidentAnaylsis',
                    component: () => import('./views/bdb/report/carAccidentAnaylsis.vue'),
                    name:"事故推送修分析"
            }
            ]
        },
        {
            path: '/',
            component: () => import('./views/Home.vue'),
            name: '导航二',
            iconCls: 'fa fa-id-card-o',
            children: [{
                    path: '/page4',
                    component: () => import('./views/nav2/Page4.vue'),
                    name: '页面4'
                },
                {
                    path: '/table',
                    component: () => import('./views/nav1/Table.vue'),
                    name: 'Table'
                },
                {
                    path: '/form',
                    component: () => import('./views/nav1/Form.vue'),
                    name: 'Form'
                },
                {
                    path: '/user',
                    component: () => import('./views/nav1/user.vue'),
                    name: '列表'
                },
                {
                    path: '/show',
                    component: () => import('./views/nav1/show.vue'),
                    name: '显示'
                }
            ]
        },
        {
            path: '/',
            component: () => import('./views/Home.vue'),
            name: 'Charts',
            iconCls: 'fa fa-bar-chart',
            children: [{
                path: '/echarts',
                component: () => import('./views/charts/echarts.vue'),
                name: 'echarts'
            }]
        },
        {
            path: '/',
            component:()=>import('./views/Home.vue'),
            name: '测试页面',
            iconCls: 'fa fa-recycle',
            children: [
                {
                    path: '/testMap',
                    component: () => import('./views/compMgr/testMap.vue'),
                    name: '地图测试'
                },{
                    path: "/selectDemo",
                    component: () => import('./views/test/selectDemoView.vue'),
                    name:'组件封装'
                },{
                    path: "/vuexTest",
                    component: () => import('./views/test/vuexTest.vue'),
                    name:'测试VUEX'
                }
            ]
        },
        {
            path: '*',
            hidden: true,
            redirect: {
                path: '/404'
            }
        }
    ]
})
