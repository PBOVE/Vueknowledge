/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-header">
    <div class="know-header-left">
      <span class="know-header-left-logo"></span>
      <span class="know-header-left-title">Knowledge Graph</span>
    </div>
    <div class="know-header-right">
      <router-link to="/" class="know-header-right-link">
        <Icon type="md-apps" class="know-header-right-user-icon"/>
      </router-link>
      <Dropdown @on-click="clickListevent">
        <span class="know-header-right-user-logo" ref="userLogo"></span>
        <!-- <span class="know-header-right-user-name">{{username}}</span> -->
        <DropdownMenu slot="list" class="know-header-right-list">
          <DropdownItem name="2">个人中心</DropdownItem>
          <DropdownItem name="1">密码修改</DropdownItem>
          <DropdownItem name="0" divided>退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <change-password :modalCFalg="changePasswordFlag"></change-password>
  </div>
</template>


<script>
import changePassword from "./modalChangPassword";
import { mapGetters } from "vuex";
export default {
  components: { changePassword },
  data() {
    return {
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
      // 修改密码 遮罩层 标志位
      changePasswordFlag: ""
    };
  },
  computed: mapGetters(["getUser"]),
  methods: {
    //创建用户 色彩 头像
    createUserLogo() {
      let username = JSON.parse(this.getUser).username;
      this.$refs.userLogo.innerHTML = username.charAt(0).toUpperCase();
      this.$refs.userLogo.style.backgroundColor = this.color[
        Math.floor(Math.random() * 7)
      ];
    },
    //点击菜单事件
    clickListevent(name) {
      // window.console.log(typeof name);
      switch (name) {
        case "0":
          this.post_json("user/logout")
            .then(() => {
              this.$store.commit("delToken");
              this.$router.push({ path: "/login" });
            })
            .catch(() => {});
          break;
        case "1":
          this.changePasswordFlag = Math.random();
          break;
      }
    }
  },
  mounted() {
    this.createUserLogo();
  }
};
</script>


<style>
.know-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.know-header-left-logo {
  display: inline-block;
  background-image: url(../../../assets/images/logo.png);
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: 0 5px;
  height: 25px;
  width: 25px;
}
.know-header-left-title {
  display: inline-block;
  font-family: Georgia;
  font-size: 20px;
  text-indent: 0.2em;
}
.know-header-right {
  line-height: 60px;
  display: flex;
  align-items: center;
  height: 60px;
  /* padding: 0 20px;  */
  transition: background-color 0.5s;
}

know-header-right-list .know-header-right-user:hover {
  background-color: #e8eaec;
}
.know-header-right-user-name {
  height: 20px;
  font-family: Georgia;
  text-transform: capitalize;
  font-size: 18px;
}
.know-header-right-user-logo {
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
.know-header-right-user-icon {
  margin-right: 15px;
  font-size: 24px;
  color: #808695;
  transition: color 0.5s;
  cursor: pointer;
}
.know-header-right-user-icon:hover {
  color: rgba(128,134,149,0.8);
}
.k-h-r-s-d {
  display: inline-block;
  width: 0px;
  border-bottom: 1px solid #e8eaec;
  margin-left: 0px;
  transform-origin: bottom right;
  transition: all 0.5s;
}
.ivu-select-dropdown {
  margin: 5px 0 5px -35px;
}
.ivu-select-dropdown .ivu-dropdown-item {
  color: #000;
  font-family: 微软雅黑;
  letter-spacing: 0.5em;
}
.know-header-right-link {
  color: #808695;
}
@media screen and (max-width: 800px) {
  .know-header {
    justify-content: space-around;
  }
  .know-header-right {
    display: none;
  }
}
</style>