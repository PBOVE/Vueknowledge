/**
*
*  @author ZTiger
*
*/


<template>
  <header class="know-public-header" ref="knowSearchHeader">
    <div class="know-public-header-left">
      <router-link to="/">
        <span class="know-public-logo"></span>
        <span class="know-public-title">Knowledge Graph</span>
      </router-link>
    </div>
    <div class="know-public-header-right">
      <router-link :to="routerTO?routerTO:'/project'">
        <Icon type="md-apps" class="know-public-header-icon" />
      </router-link>
      <router-link to="/login" v-if="!userStatusFlag&&userStatusLoadFlag">
        <span class="know-public-header-login">登录</span>
      </router-link>
      <drop-down v-else-if="userStatusFlag&&userStatusLoadFlag">
        <img :src="images" class="know-public-header-user-logo" v-if="images" />
        <div v-else class="Noimg">{{nickName.charAt(0).toUpperCase()}}</div>
      </drop-down>
      <Icon type="md-refresh" class="know-header-user-load" v-else-if="!userStatusLoadFlag" />
    </div>
  </header>
</template>


<script>
import dropDown from "./dropdown";
import { mapState } from "vuex";

export default {
  components: { dropDown },
  props: ["routerTO", "RouterFlag"],
  data() {
    return {
      // 判断用户是否登录 标志位
      userStatusFlag: false,
      // 判断 用户 登录 加载标志位
      userStatusLoadFlag: false
    };
  },
  computed: {
    ...mapState(["nickName", "images"])
  },
  mounted() {
    this.getUser();
  },
  methods: {
    // 获取token 判断用户登录
    getUser() {
      const url = "user/me";
      this.get(url)
        .then(res => {
          this.userStatusLoadFlag = true;
          if (res.data.user.id) {
            let data = res.data;
            this.userStatusFlag = true;
            this.$store.commit("setUserData", data);
          } else {
            this.userStatusFlag = false;
            this.$store.commit("delToken");
            if (this.RouterFlag) {
              this.$router.push({ path: "/login" });
            }
          }
        })
        .catch(() => {});
    }
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
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.08);
}
.know-public-logo {
  display: inline-block;
  background-image: url("../assets/images/logo.png");
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
  color: #515a6e;
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
  display: inline-block;
  width: 25px;
  border-radius: 50%;
  text-align: center;
  line-height: 25px;
  font-size: 15px;
  user-select: none;
  cursor: pointer;
}
.know-public-header-right,
.know-public-header-left {
  display: flex;
  justify-content: center;
  align-items: center;
}
.know-header-user-load {
  color: #2d8cf0;
  font-size: 20px;
  animation: ani-demo-load 2.5s linear infinite;
}
@keyframes ani-demo-load {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>