/**
 *
 * @author ZTiger
 *
 */


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {get,post_json, post_string,patch_string} from './request/api'

Vue.prototype.get = get;
Vue.prototype.post_json = post_json;
Vue.prototype. post_string =  post_string;
Vue.prototype.patch_string = patch_string;


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
