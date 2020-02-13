/**
*
*  @author ZTiger
*
*/


<template>
  <div class="dis-fix g-header">
    <div class="g-left">
      <span class="g-left-select">
        <span class="g-title">全部项目</span>
        <Badge type="normal" :count="totalElements" />
      </span>
    </div>
    <Dropdown class="g-right" trigger="click" @on-click="dropdowdnChange">
      <span class="g-right-icon cup iconfont" :class="selectIcon" />
      <DropdownMenu slot="list">
        <DropdownItem class="df g-list-menu" name="1" :selected="getShowType==='1'">
          <span class="icon-card iconfont g-list-icon" />卡片视图
        </DropdownItem>
        <DropdownItem class="df g-list-menu" :selected="getShowType==='2'" name="2">
          <span class="icon-list iconfont g-list-icon" />列表视图
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: ['totalElements'],
  data() {
    return {
      // 展示方式
      TypeArr: ['icon-card', 'icon-list'],
      // 设置选中的图标
      selectIcon: '',
    };
  },
  created() {
    this.selectIcon = this.TypeArr[parseInt(this.getShowType, 10) - 1];
  },
  computed: {
    ...mapGetters(['getShowType']),
  },
  methods: {
    ...mapMutations(['setShowType']),
    // 下拉菜单change事件触发
    dropdowdnChange(select) {
      window.console.log();
      this.selectIcon = this.TypeArr[parseInt(select, 10) - 1];
      this.setShowType(select);
    },
  },
};
</script>


<style scoped>
.g-header {
  align-items: center;
  padding: 0 30px 0 0;
}
.g-title {
  font-size: 15px;
  margin: 0 10px 0 0;
  color: #000;
}
.g-right-icon {
  display: inline-block;
  height: 30px;
  width: 30px;
  text-align: center;
  font-size: 20px;
  line-height: 30px;
}
.g-right-icon:hover {
  background: #e8f5fd;
  border-radius: 5px;
  color: #1b9aee;
}
.g-left-select {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  border-bottom: 1.5px solid #1b9aee;
}
.g-list-menu {
  height: 40px;
}
.g-list-icon {
  margin: 0 10px 0 0;
  font-size: 18px;
}
</style>