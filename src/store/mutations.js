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
  setShowType(state, type) {
    state.userShowType = type;
    localStorage.setItem('user_showType', type);
  },
  delToken(state) {
    state.token = '';
    state.user = '';
    sessionStorage.clear();
  },
  setUserData(state, data) {
    const { user } = data;
    const { token } = data._csrf;
    state.token = token;
    state.user = user;
    sessionStorage.setItem('user_roles', JSON.stringify(user));
    sessionStorage.setItem('access_token', token);

  },
  modify(state, data) {
    const user = data;
    state.user = user;
    sessionStorage.setItem('user_roles', JSON.stringify(user));
  },
}