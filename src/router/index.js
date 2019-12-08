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
import helloWorld from '../components/HelloWorld.vue'

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
            name:'helloWorld',
            component:helloWorld
        }
    ]
})

export default  router