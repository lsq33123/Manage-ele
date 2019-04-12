import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './routes'
import 'font-awesome/css/font-awesome.min.css'
import store from './vuex/store'
import Vuex from 'vuex'
// import Mock from './mock'
// Mock.bootstrap()
Vue.use(ElementUI)
Vue.use(Vuex)
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
    let user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');
    if (!token && to.path !== '/login') {
        Vue.prototype.$message({
            type: "error",
            message: "登录过期，请重新登录"
         });
        next({
            path: '/login'
        })
    } else {
        next()
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
