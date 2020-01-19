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
        state.nickName = JSON.parse(state.user).nickName;
        state.updateTime = JSON.parse(state.user).updateTime;
    },
    delToken(state){
        state.token = '';
        state.user = '';
        sessionStorage.clear();
    },
    setUserData(state,data){
        const user ={
            id:data.user.id,
            username:data.user.username,
            nickName:data.me.nickName,
            enabled:data.user.enabled,
            authorities:data.user.authorities,
            createTime:data.me.createTime,
            updateTime:data.me.updateTime
        };
        let token = data._csrf.token;
        state.token = token;
        state.user = JSON.stringify(user);
        state.nickName = data.me.nickName;
        state.updateTime = data.me.updateTime
        sessionStorage.setItem('user',JSON.stringify(user));
        sessionStorage.setItem('token',token);

    },
    modifyNickName(state,data){
        let user = JSON.parse(state.user);
        user['nickName'] = data.nickName;
        state.user = JSON.stringify(user);
        state.nickName = data.nickName;
        state.updateTime = data.updateTime;
    }
}