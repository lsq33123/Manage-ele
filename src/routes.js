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
            name: '导航一',
            iconCls: 'el-icon-message', // 图标样式class
            children: [{
                    path: '/main',
                    component: () => import('./views/Main.vue'),
                    name: '主页',
                    hidden: true
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
                }
            ]
        },
        {
            path: '/',
            component: () => import('./views/Home.vue'),
            name: '设计',
            iconCls: 'el-icon-message', // 图标样式class
            children: [{
                path: '/business',
                component: () => import('./views/myself/business/business.vue'),
                name: '商务概念'
            }]
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
                    path: '/page5',
                    component: () => import('./views/nav2/Page5.vue'),
                    name: '页面5'
                }
            ]
        },
        {
            path: '/',
            component: () => import('./views/Home.vue'),
            name: '',
            iconCls: 'fa fa-address-card',
            leaf: true,
            children: [{
                path: '/page6',
                component: () => import('./views/nav3/Page6.vue'),
                name: '导航三'
            }]
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
            component: () => import('./views/Home.vue'),
            name: 'Bing Bing Bing',
            iconCls: 'fa fa-vimeo-square',
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
