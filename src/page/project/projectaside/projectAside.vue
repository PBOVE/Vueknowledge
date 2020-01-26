/**
*
*  @author ZTiger
*
*/


<template>
  <ul class="project-aside-ul">
    <li class="project-aside-li" @click="selectStatus(1,1)" :class="{'select-li':selectLI === 1}">
      <Icon type="ios-home" />首页
    </li>
    <li class="project-aside-li" @click="selectStatus(1,2)" :class="{'select-li':selectLI === 2}">
      <Icon type="logo-buffer" />项目
    </li>
    <li class="project-aside-li" @click="selectStatus(1,3)" :class="{'select-li':selectLI=== 3}">
      <Icon type="md-share" />分享
    </li>
  </ul>
</template>


<script>
export default {
  data() {
    return {
      // 选中的 li
      selectLI: 1
    };
  },
  methods: {
    // 获取选中 的 状态
    selectStatus(type, val) {
      const statusMap = {
        1: () => {
          this.selectLI = val;
          this.$emit("Callback", 1, val);
        }
      };
      statusMap[type]();
    }
  }
};
</script>


<style scoped>
.project-aside-ul {
  list-style: none;
}
.project-aside-li {
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  padding: 0 0 0 20px;
  border-radius: 4px;
  cursor: pointer;
}
.project-aside-li:hover {
  background: #f7f7f7;
}
.project-aside-li i {
  font-size: 25px;
  margin: 0 15px 0 0;
  color: #8c8c8c;
}
.project-aside-li.select-li {
  background: #e8f0fe;
  color: #1a73e8;
}
.select-li i {
  color: #1b9aee;
}
@media screen and (max-width: 1000px) {
  .project-aside-ul {
    display: flex;
  }
  .project-aside-li {
    padding: 0;
    flex-grow: 1;
    text-align: center;
  }
  .project-aside-li i {
    display: none;
  }
}
</style>