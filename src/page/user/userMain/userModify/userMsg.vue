/**
*
*  @author ZTiger
*
*/


<template>
  <div>
    <div class="main-content-msg-title">
      <div class="user-main-header-name">个人资料</div>
      <div class="user-main-header-title">知识图谱构建平台</div>
    </div>
    <div class="main-content-msg-row">
      <div class="msg-row-content">
        <div class="msg-row-name">头像</div>
        <div></div>
      </div>
    </div>
    <div class="main-content-msg-row">
      <div class="msg-row-content">
        <div class="msg-row-name">名称</div>
        <div class="msg-row-title">{{user.username}}</div>
      </div>
    </div>
    <div class="main-content-msg-row">
      <div class="msg-row-content dis-flex" @click="selectRow(2)">
        <div class="dis-flex-left">
          <div class="msg-row-name">昵称</div>
          <div class="msg-row-title">{{this.$store.state.nickName}}</div>
        </div>
        <div class="dis-flex-right">
          <Icon type="ios-arrow-forward" size="20" />
        </div>
      </div>
    </div>
    <div class="main-content-msg-row">
      <div class="msg-row-content">
        <div class="msg-row-name">创建时间</div>
        <div class="msg-row-title">{{TimeConversion(user.createTime)}}</div>
      </div>
    </div>
    <div class="main-content-msg-row">
      <div class="msg-row-content">
        <div class="msg-row-name">更新时间</div>
        <div class="msg-row-title">{{TimeConversion(this.$store.state.updateTime)}}</div>
      </div>
    </div>
    <div class="main-content-msg-row">
      <div class="msg-row-content dis-flex" @click="selectRow(3)">
        <div class="dis-flex-left">
          <div class="msg-row-name">密码</div>
          <div class="msg-row-title">••••••••</div>
        </div>
        <div class="dis-flex-right">
          <Icon type="ios-arrow-forward" size="20" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      user: JSON.parse(this.$store.state.user)
    };
  },
  methods: {
    // 时间转换函数
    TimeConversion(time) {
      const date = new Date(time);
      const completion = num => {
        return num.toString().padStart(2, "0");
      };
      return (
        date.getFullYear() +
        "年" +
        completion(date.getMonth() + 1) +
        "月" +
        completion(date.getDate()) +
        "日"
      );
    },
    // 选择行
    selectRow(val){
      this.$emit('userMainCallback',1,val);
    }
  }
};
</script>


<style scoped>
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
.main-content-msg-title {
  padding: 20px;
}
.main-content-msg-row {
  cursor: pointer;
  font-size: 0;
}
.main-content-msg-row:hover,
.main-content-msg-row:hover + .main-content-msg-row {
  border-top: 1px solid #dadce0;
}
.main-content-msg-row:hover {
  background: #f5f5f5;
}

.main-content-msg-row:active {
  background: #e1e1e1;
  transform-origin: center right;
  transition: all 1s;
}
.main-content-msg-row:hover .msg-row-content,
.main-content-msg-row:hover + .main-content-msg-row .msg-row-content {
  border-width: 0;
}
.msg-row-content {
  padding: 20px 20px 20px 0;
  margin: 0 0 0 20px;
  border-top: 1px solid #dadce0;
}
.main-content-msg-row:hover:nth-of-type(2),
.main-content-msg-row:nth-of-type(2) .msg-row-content {
  border-width: 0px;
}
.msg-row-name,
.msg-row-title {
  display: inline-block;
}
.msg-row-name {
  width: 150px;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  letter-spacing: 0.1em;
}
.msg-row-title {
  height: 25px;
  line-height: 25px;
  font-size: 16px;
  color: #202124;
}
.dis-flex {
  display: flex;
  align-items: center;
}
.dis-flex-left {
  flex-grow: 1;
}
</style>