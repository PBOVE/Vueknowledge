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
        component: () => import('../page/search/search'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../page/login/main'),
    },
    {
        path: '/manage/:user/:itemId',
        name: 'manage',
        component: () => import('../page/Backstage/manage'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/project',
        name: 'project',
        component: () => import('../page/project/project'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('../page/user/user'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/search',
        name: 'searchid',
        component: () => import('../page/searchshow/searchshow'),
    },
    {
        path: '*',
        name: 'nofound',
        component: () => import('../page/noFound/nofound')
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
            if (to.name === 'searchid') {
                if (!to.query.id || !to.query.name) {
                    next('/')
                } else {
                    next();
                }
            } else {
                next();
            }
        }
    }
})


export default router