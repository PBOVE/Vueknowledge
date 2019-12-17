/**
 *
 * @author ZTiger
 *
 */

 import Vue from 'vue'
 import Vuex from 'vuex'
 import router from '../router'

 Vue.use(Vuex);

 const store = new Vuex.Store({
        state:{
            token:'',
            user:''
        },
        getters:{
            getToken:(state)=>{
                return state.token;
            }
        },
        mutations:{
            setToken(state,token){
                state.token = token;
            },
            setUser(state,data){
                state.user = data;
            },
            delToken(state){
                state.token = '';
                state.user = '';
                sessionStorage.clear();
            },
            setUserData(state,data){
                let user ={
                    id:data.user.id,
                    username:data.user.username,
                    enabled:data.user.enabled,
                    authorities:data.user.authorities,
                    createTime:data.me.createTime,
                    updateTime:data.me.updateTime
                }
                let token = data._csrf.token;
                state.token = token;
                state.user = JSON.stringify(user)
                sessionStorage.setItem('user',JSON.stringify(user));
                sessionStorage.setItem('token',token);
                router.push({path:'/manage'})
            }
        }
 })


 export default store
