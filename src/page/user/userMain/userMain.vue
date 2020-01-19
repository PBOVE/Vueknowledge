/**
*
*  @author ZTiger
*
*/


<template>
  <div class="user-main">
    <div class="user-main-header user-bottom">
      <div class="user-main-header-name">个人信息</div>
      <div class="user-main-header-title">您在 “知识图谱构建平台” 中使用的基本信息，例如您的昵称和头像</div>
    </div>
    <div class="user-main-content">
      <user-msg
        class="user-main-content-msg"
        v-show="viewSeletctFlag === 1"
        @userMainCallback="userMainCallback"
      ></user-msg>
      <name-modify
        class="user-main-content-msg"
        v-show="viewSeletctFlag === 2"
        @userMainCallback="userMainCallback"
      ></name-modify>
      <password-modify
        class="user-main-content-msg"
        v-show="viewSeletctFlag === 3"
        @userMainCallback="userMainCallback"
        :viewSeletctFlag="viewSeletctFlag"
      ></password-modify>
    </div>
  </div>
</template>


<script>
import nameModify from "./userModify/nameModify";
import userMsg from "./userModify/userMsg";
import passwordModify from "./userModify/passwordModify";

export default {
  components: { nameModify, userMsg, passwordModify },
  data() {
    return {
      // 视图选择 标志位
      viewSeletctFlag: 1,
      
    };
  },
  methods: {
    // 回调函数
    userMainCallback(type, val) {
      const stateMap = {
        // 视图选择
        1: () => {
          this.viewSeletctFlag = val;
        }
      };
      stateMap[type]();
    }
  }
};
</script>


<style scoped>
.user-main {
  padding: 30px;
  overflow: auto;
}
.user-main-header {
  text-align: center;
  letter-spacing: 0.1em;
}
.user-bottom {
  margin: 0 0 30px 0;
}
.user-main-header-name {
  font-size: 23px;
  color: #202124;
}
.user-main-header-title {
  margin: 10px 0 0px 0;
  font-size: 12px;
  font-weight: 520;
  color: #5f6368;
}
.user-main-content-msg {
  overflow: hidden;
  margin: 0 auto;
  width: 800px;
  border: 1px solid #dadce0;
  border-radius: 8px;
}
</style>