/**
*
*  @author ZTiger
*
*/

export default {
    setToken(state, token) {
        state.token = token;
    },
    setUser(state, data) {
        state.user = data;
        state.nickName = JSON.parse(state.user).nickName;
        state.updateTime = JSON.parse(state.user).updateTime;
    },
    delToken(state) {
        state.token = '';
        state.user = '';
        state.images = '';
        sessionStorage.clear();
    },
    setUserData(state, data) {
        const user = {
            id: data.user.id,
            username: data.user.userName,
            nickName: data.user.nickName,
            images: data.user.images,
            enabled: data.user.enabled,
            authorities: data.user.authorities,
            createTime: data.user.createTime,
            updateTime: data.user.updateTime
        };
        let token = data._csrf.token;
        state.token = token;
        state.user = JSON.stringify(user);
        state.nickName = data.user.nickName;
        state.images = data.user.images;
        state.updateTime = data.user.updateTime
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);

    },
    modify(state, data) {
        let user = JSON.parse(state.user);
        user['nickName'] = data.nickName;
        user['images'] = data.images;
        state.user = JSON.stringify(user);
        state.nickName = data.nickName;
        state.images = data.images;
        state.updateTime = data.updateTime;
    },
}