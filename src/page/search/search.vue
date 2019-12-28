/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-search">
    <header class="know-search-header">
      <Icon type="md-apps" class="know-search-header-icon" />
      <router-link to="/login" v-show="!userStatusFlag">
        <span class="know-search-header-login">登录</span>
      </router-link>
      <span class="know-search-header-user-logo" ref="userLogo" v-show="userStatusFlag"></span>
    </header>
    <main class="know-search-main">
      <div class="know-search-box">
        <div></div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 判断用户是否登录 标志位
      userStatusFlag: false,
      //用户信息
      userName: "",
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
      window.console.log(username);
    }
  },
  mounted() {
    this.judgementUser();
  }
};
</script>

<style  scoped>
.know-search-header {
  height: 60px;
  padding: 0 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.know-search-header-login {
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
.know-search-header-login:hover {
  background-color: RGBA(45, 140, 240, 0.8);
}
.know-search-header-icon {
  font-size: 24px;
  margin-right: 15px;
  color: #808695;
}
.know-search-header-user-logo {
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
</style>