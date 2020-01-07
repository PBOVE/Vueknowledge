/**
*
*  @author ZTiger
*
*/

export default {
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

    }
}