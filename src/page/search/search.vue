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
    <div class="know-search-box" ref="knowSearchBox">
      <div class="know-search-title-en" ref="knowSearchBoxEn">
        <span class="kown-search-title-logo"></span>
        <span>Knowledge&nbsp;Graph</span>
      </div>
      <div class="know-search-box-title-cn" ref="knowSearchBoxCn">知识图谱搜索</div>
      <div class="know-search-box-input">
        <AutoComplete
          v-model="InSearchMeg"
          :data="searchData"
          icon="ios-search"
          @on-focus="SearchInFocus"
          size="large"
        ></AutoComplete>
      </div>
    </div>
    <div class="know-search-header-logo" ref='knowSearchHeaderLogo'>
      <span></span>
      <span>Knowledge&nbsp;Graph</span>
    </div>
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
      ],
      //联想 请求的数据
      searchData: [1, 2, 3],
      //用户输入的数据
      InSearchMeg: ""
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
    },
    // 搜索框 获取焦点触发的函数
    SearchInFocus() {
      this.$refs.knowSearchBoxCn.style.display = "none";
      this.$refs.knowSearchBoxEn.style.display = "none";
      this.$refs.knowSearchBox.classList.add("know-search-box-focus");
      this.$refs.knowSearchHeaderLogo.classList.add('know-search-header-logo-focus');
    }
  },
  mounted() {
    this.judgementUser();
  }
};
</script>

<style>
.know-search {
  height: 100vh;
  width: 100vw;
  position: relative;
}
.know-search-header {
  height: 60px;
  padding: 0 55px;
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
  transition: color 0.5s;
  cursor: pointer;
}
.know-search-header-icon:hover {
  color: rgba(128, 134, 149, 0.8);
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
.know-search-box {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #000; */
}
.know-search-box-focus {
  transition: all 0.5s;
  top: 10px;
  left: 220px;
  transform: translate(0%, 0%);
  flex-direction: row;
}

.know-search-title-en {
  text-align: center;
  font-family: Georgia;
}
.kown-search-title-logo {
  background-image: url("../../assets/images/logo.png");
  background-repeat: no-repeat;
  background-position: 0px 12px;
  background-size: 70% 70%;
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.know-search-title-en span:nth-of-type(2) {
  /* font-weight: lighter; */
  user-select: none;
  height: 45px;
  line-height: 45px;
  font-size: 33px;
  color: #000;
  text-align: center;
}
.know-search-box-input {
  width: 100%;
}
.know-search-box-input .ivu-select-dropdown.ivu-auto-complete {
  margin-left: 0px;
}
.know-search-box-title-cn {
  margin-top: 20px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 15px;
  margin-bottom: 50px;
}
.know-search-header-logo {
  position: absolute;
  font-family: Georgia;
  left: 20px;
  top:40px;
  opacity: 0;
}
.know-search-header-logo-focus{
  transition: top 0.5s;
  top: 15px;
  opacity: 1;
  
}
.know-search-header-logo span:nth-of-type(1) {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url("../../assets/images/logo.png");
  background-size: 100% 100%;
}

.know-search-header-logo span:nth-of-type(2) {
  font-size: 20px;
  margin-left: 10px;

}
</style>