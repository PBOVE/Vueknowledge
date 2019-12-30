/**
*
*  @author ZTiger
*
*/


<template>
  <header class="know-public-header" ref="knowSearchHeader">
    <div class="know-public-header-left">
      <span class="know-public-logo"></span>
      <span class="know-public-title">Knowledge Graph</span>
    </div>
    <div class="know-public-header-right">
      <router-link to="/manage">
        <Icon type="md-apps" class="know-public-header-icon" />
      </router-link>
      <router-link to="/login" v-show="!userStatusFlag">
        <span class="know-public-header-login">登录</span>
      </router-link>
      <span class="know-public-header-user-logo" ref="userLogo" v-show="userStatusFlag"></span>
    </div>
  </header>
</template>


<script>
export default {
  data() {
    return {
      // 判断用户是否登录 标志位
      userStatusFlag: false,
      //随机背景颜色
      color: [
        "#ff4e50",
        "#84B1ED",
        "#00dffc",
        "#0080ff",
        "#f9d423",
        "#5A9367",
        "#56A902"
      ]
    };
  },
  methods: {
    //判断用户是否登录
    judgementUser() {
      let user = this.$store.state.user;
      if (user === "") {
        this.userStatusFlag = false;
        return;
      }
      this.userStatusFlag = true;
      let username = JSON.parse(user).username;
      this.$refs.userLogo.innerHTML = username.charAt(0).toUpperCase();
      this.$refs.userLogo.style.backgroundColor = this.color[
        Math.floor(Math.random() * 7)
      ];
    }
  },
  mounted() {
    this.judgementUser();
  }
};
</script>


<style scoped>
.know-public-header {
  height: 60px;
  padding: 0 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dcdee2;
  background-color: #f8f8f9;
}
.know-public-logo {
  display: inline-block;
	background-image: url('../assets/images/logo.png');
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: 0 5px;
  height: 25px;
  width: 25px;
}
.know-public-title {
  display: inline-block;
  font-family: Georgia;
  font-size: 20px;
  text-indent: 0.2em;
}
.know-public-header-icon {
  font-size: 24px;
  margin-right: 15px;
  color: #808695;
  transition: color 0.5s;
  cursor: pointer;
}
.know-public-header-icon:hover {
  color: rgba(128, 134, 149, 0.8);
}
.know-public-header-login {
  display: inline-block;
  height: 30px;
  padding: 0 12px;
  line-height: 28px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #fff;
  background-color: #2d8cf0;
  transition: background-color 0.8s;
  font-weight: bold;
}
.know-public-header-login:hover {
  background-color: RGBA(45, 140, 240, 0.8);
}
.know-public-header-user-logo {
  margin: 0 10px 0 0;
  color: #fff;
  font-family: Georgia;
  display: inline-block;
  width: 25px;
  border-radius: 50%;
  text-align: center;
  line-height: 25px;
  font-size: 15px;
  user-select: none;
  cursor: pointer;
}
.know-public-header-right{
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>