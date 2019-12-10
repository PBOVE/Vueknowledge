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

/**
 *  引入 axios
 */
import axios from 'axios'

/**
 * 引入路由组件
 */
import login from '../page/login/login'
import manage from '../page/Backstage/manage'

Vue.use(Vuex)
Vue.use(ViewUI);
Vue.use(vueRouter);
Vue.prototype.axios = axios;


/**
 * 路由 跳转
 */
let router = new vueRouter({
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
        }
    ]
})

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
