/**
*
*  @author ZTiger
*
*/


export default {
    // token
    token: sessionStorage.getItem('access_token') || '',
    // 用户所有信息
    user: JSON.parse(sessionStorage.getItem('user_roles') )|| '',
    // 高度
    headerHeight: 60,
    // 设置用户视图状态
    userShowType: localStorage.getItem('user_showType') || '1',
}