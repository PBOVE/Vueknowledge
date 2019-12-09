/**
*
*  @author ZTiger
*
*/

import {baseUrl} from './http'
import axios from 'axios'
import store from '../store'
import qs from 'qs'
// 请求时间设置
axios.defaults.timeout = 10000;
// 设置默认请求接口
axios.defaults.baseURL = baseUrl;


/**
 * 封装 get 方法
 */
export function get(url,params={}){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err);
        })
    })
}
/**
 * 封装 post 方法
 */
export function post_json(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, (params),{headers:{'Content-Type':'application/json'}})
        .then(res => {
          resolve(res.data);
        })
        .catch(err =>{
          reject(err)
        })
    });
}
/**
 *  封装 post 方法
 */
export function post_string(url, params) {
    window.console.log(qs.stringify(params))
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(params),{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(res => {
          resolve(res.data);
        })
        .catch(err =>{
          reject(err.data)
        })
    });
  }


/**
 * 请求拦截
 */
axios.interceptors.request.use(
    // 在发送请求之前做些什么
  config => {
    if (store.state.token) {
        // window.console.log(store.state.token.token)
        config.headers.Authorization = store.state.token;
    }
    
    return config;
  },
    // 对请求错误做些什么
  error => {
    return Promise.error(error);
  })