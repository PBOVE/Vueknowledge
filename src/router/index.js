/**
 *
 *  @author ZTiger
 *
 */


import Vue from 'vue'
import vueRouter from 'vue-router'

/**
 *  引入 view UI
 */
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

/**
 * 引入 vuex
 */
import Vuex from 'vuex'
import store from '../store'

/**
 *  引入 axios
 */
import axios from 'axios'

/**
 * 引入路由组件
 */
import login from '../page/login/login'
import manage from '../page/Backstage/manage'
import nofound from '../page/404/fourZeroFour.vue'

Vue.use(Vuex)
Vue.use(ViewUI);
Vue.use(vueRouter);
Vue.prototype.axios = axios;

/**
 * 页面刷新的时候重新获取token
 */
if (sessionStorage.getItem('token')) {
    store.commit('setToken', sessionStorage.getItem('token'));
    store.commit('setUser',sessionStorage.getItem('user'));
}



/**
 * 路由 跳转
 */
let router = new vueRouter({
    mode: 'history',
    routes:[
        {
            path:'/',
            name:'login',
            component:login
        },
        {
            path:'/manage',
            name:'manage',
            component:manage,
            meta:{requireAuth:true}
        },
        {
            path:'/nofound',
            name:'nofound',
            component:nofound
        },
        {
            path:'*',
            redirect: '/nofound',
            name:'nofound',
            component:nofound
        }
    ]
})


/**
 *  路由 守卫 函数
 */
router.beforeEach((to, from, next)=> {
    let token  = sessionStorage.getItem('token');
    if(to.matched.some(r => r.meta.requireAuth)){
        if(token){
            next();
        }else{
            next('/');
        }
    }else{
        next();
    }
})


export default  router
