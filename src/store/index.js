/**
 *
 * @author ZTiger
 *
 */

 import Vue from 'vue'
 import Vuex from 'vuex'

 Vue.use(Vuex);

 const store = new Vuex.Store({
        state:{
            token:''
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
            delTkoken(state){
                state.token = ''
            }
        }
 })


 export default store
