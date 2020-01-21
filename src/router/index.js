/**
 *
 *  @author ZTiger
 *
 */


import Vue from 'vue'
import vueRouter from 'vue-router';

/**
 *  引入 view UI
 */
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

/**
 * 引入 vuex
 */
import Vuex from 'vuex';
import store from '../store';

/**
 *  引入 axios
 */
import axios from 'axios';

/**
 * 导入自定义 ui
 */
import '../assets/css/default.css';
/**
 * 引入路由组件
 */
const loginmain = () => import('../page/login/main');
const manage = () => import('../page/Backstage/manage');
const nofound = () => import('../page/noFound/nofound');
const search = () => import('../page/search/search');
const searchshow = () => import('../page/searchshow/searchshow');
const user = () => import('../page/user/user');

Vue.use(Vuex);
Vue.use(ViewUI);
Vue.use(vueRouter);
Vue.prototype.axios = axios;

/**
 * 页面刷新的时候重新获取token
 */
if (sessionStorage.getItem('token')) {
    store.commit('setToken', sessionStorage.getItem('token'));
    store.commit('setUser', sessionStorage.getItem('user'));
}



/**
 * 路由 跳转
 */
let router = new vueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'search',
            component: search,
        },
        {
            path: '/login',
            name: 'login',
            component: loginmain,
        },
        {
            path: '/manage',
            name: 'manage',
            component: manage,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/user',
            name: 'user',
            component: user,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/search',
            name: 'searchid',
            component: searchshow,
        },
        {
            path: '*',
            name: 'nofound',
            component: nofound
        }
    ]
})


/**
 *  路由 守卫 函数
 */
router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next();
    } else {
        let token = sessionStorage.getItem('token');
        if (to.matched.some(r => r.meta.requireAuth)) {
            if (token) {
                next();
            } else {
                next('/login');
            }
        } else {
            // 不允许 去 searchshow 不带参数去
            if (to.path === '/search' && !to.query.id && !to.query.name) {
                next('/');
            } else {
                next();
            }

        }
    }
})


export default router