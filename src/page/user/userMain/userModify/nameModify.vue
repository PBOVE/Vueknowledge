/**
*
*  @author ZTiger
*
*/


<template>
  <div class="msg-news-box">
    <div class="msg-news-box-msg-title">
      <div class="box-msg-header-name">
        <Icon type="md-arrow-round-back" class="box-msg-header-s curpoin" @click="selectBack" />
        <span>昵称</span>
      </div>
      <div class="box-msg-header-title">对您的昵称所做的更改将反映在您的 “知识图谱构建平台” 帐号中</div>
    </div>
    <div class="box-msg-row">
      <input type="text" class="box-msg-row-i" v-model="userName" />
      <div class="box-msg-row-confirm curpoin" @click="modifyServer">
        <Icon type="md-create" size="20" />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // 用户名称
      userName: this.$store.state.nickName,
      // 用户 Id
      userId: JSON.parse(this.$store.state.user).id,
      // 用户修改名称
      userRName: this.$store.state.nickName
    };
  },
  methods: {
    // 发送修改名称到服务器
    modifyServer() {
      if (this.userName === this.userRName) {
        return;
      }
      const url = "user/" + this.userId + "/nickName";
      const obj = {
        nickName: this.userName
      };
      this.patch_string(url, obj)
        .then(res => {
          const data = res.data;
          this.$store.commit("modifyNickName", data);
        })
        .catch(() => {});
    },
    // 选择回退
    selectBack(){
      this.$emit('userMainCallback',1,1);
    }
  }
};
</script>


<style scoped>
.msg-news-box {
}
.msg-news-box-msg-title {
  padding: 20px;
}
.box-msg-header-name {
  display: flex;
  align-items: center;
  height: 34px;
  font-size: 23px;
  color: #202124;
}
.box-msg-header-title {
  margin: 10px 0 0px 0;
  font-size: 12px;
  font-weight: 520;
  color: #5f6368;
}
.box-msg-header-s {
  margin: 0 10px 0 0;
  height: 34px;
  width: 34px;
  line-height: 34px;
}
.box-msg-header-s:active {
  border-radius: 50%;
  background: #dcdee2;
}
.box-msg-row {
  display: flex;
  align-items: center;
  padding: 0px 20px 20px 20px;
}
.box-msg-row-i {
  flex-grow: 1;
  height: 30px;
  outline: none;
  border: none;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.87);
}
.box-msg-row-confirm {
  padding: 0 0 0 10px;
}
.curpoin {
  cursor: pointer;
}
</style>