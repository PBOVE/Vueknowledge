/**
*
*  @author ZTiger
*
*/


<template>
  <div>
    <div
      class="item-box box"
      v-for="(item,index) in itemData"
      :key="item.id"
      @click.stop="selectItem(index)"
    >
      <div class="dis-fix item-box-f">
        <Tooltip
          max-width="280"
          placement="top"
          :content="item.description.length?item.description:item.name"
        >
          <div class="item-box-name">{{item.name}}</div>
        </Tooltip>
        <div class="dis-operation">
          <Tooltip content="打开项目设置" placement="top">
            <Icon type="ios-settings" class="item-box-icon" @click.stop="selectItemSetting(index)" />
          </Tooltip>
          <Tooltip content="项目删除" placement="top">
            <Icon type="ios-trash" class="item-box-icon" @click.stop="selectItemDelete(index)" />
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  props: ["itemData"],
  data() {
    return {
      modalFlag: false
    };
  },
  watch: {},
  methods: {
    // 选中 项目设置
    selectItemSetting(index) {
      this.$emit("selectItem", index);
    },
    // 选中 删除
    selectItemDelete(index) {
      this.$emit("selectDelete", index);
    },
    // 选中的项目
    selectItem(index) {
      this.$router.push({
        path: "/manage",
        query: {
          itemId: this.itemData[index].id,
          name: this.itemData[index].name
        }
      });
    }
  }
};
</script>


<style scoped>
.box {
  width: 240px;
  height: 120px;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
}
.item-box {
  background: url("../../../../assets/images/itembg.jpg");
  background-size: 100% 100%;
  margin: 0 20px 20px 0;
  padding: 5px 10px;
  transition: all 0.2s;
  color: #fff;
}
.item-box:hover {
  box-shadow: 0 6px 12px rgba(38, 38, 38, 0.1);
  transform: translateY(-4px);
}
.item-box-f {
  align-items: center;
}
.item-box-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px;
  font-weight: 600;
}
.item-box-icon {
  font-size: 20px;
}
.item-box-title {
  font-size: 13px;
  overflow: hidden;
}
.ivu-tooltip {
  margin: 0 0 0 5px;
}
</style>