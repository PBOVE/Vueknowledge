/**
*
*  @author ZTiger
*
*/


<template>
  <div>
    <div class="title-h1">项目创建</div>
    <div class="title-tips">欢迎使用 “知识图谱构建平台” ,尝试新建一个项目给自己</div>
    <div class="item-create">
      <div class="create-box box dis-fixc" @click="statusSelect(1)">
        <Icon type="md-add" size="22" />
        <div class="create-box-title">创建项目</div>
      </div>
    </div>
    <div class="title-h1">我创建的</div>
    <item-list class="item-row" :itemData="itemData" @selectItem="selectItem" @selectDelete='selectDelete'></item-list>
    <div class="title-h1">成员分享的</div>
    <!-- <item-list class="item-row" ></item-list> -->
    <item-create ref="modalC" @addItem="addItem"></item-create>
    <item-setting ref="modalS" @updataItem="updataItem"></item-setting>
    <item-delete  ref="modalD"  @delItem="delItem"></item-delete>
  </div>
</template>


<script>
import itemList from "./operation/itemList";
import itemCreate from "./operation/itemCreate";
import itemSetting from "./operation/itemSetting";
import itemDelete from "./operation/itemDelete"

export default {
  components: { itemList, itemCreate, itemSetting,itemDelete },
  data() {
    return {
      // 项目数据
      itemData: "",
      // 选中的数据下标
      selectIndex: ""
    };
  },
  mounted() {
    this.getServeItem();
    // this.getServeShareItem();
  },
  methods: {
    // 获取服务器里面的项目
    getServeItem() {
      const url = "item";
      this.get(url)
        .then(res => {
          this.itemData = res.data;
        })
        .catch(() => {});
    },
    // 获取服务器里面分享的项目
    getServeShareItem() {
      const url = "item/share";
      this.get(url)
        .then(res => {
          window.console.log(res);
        })
        .catch(() => {});
    },
    // 状态选择
    statusSelect(type) {
      const statusMap = {
        // 点击创建
        1: () => {
          this.$refs.modalC.setModalStatus();
        }
      };
      statusMap[type]();
    },
    // 选中 项目设置
    selectItem(index) {
      this.selectIndex = index;
      this.$refs.modalS.showView(this.itemData[index]);
    },
    // 选中 项目删除
    selectDelete(index) {
      this.selectIndex = index;
      this.$refs.modalD.showView(this.itemData[index]);
    },
    // 创建成功 添加数据
    addItem(val) {
      this.itemData.push(val);
    },
    // 修改数据
    updataItem(val) {
      this.itemData.splice(this.selectIndex, 1, val);
    },
    // 删除项目
    delItem() {
      this.itemData.splice(this.selectIndex, 1);
    }
  }
};
</script>


<style scoped>
.title-h1 {
  font-size: 18px;
  color: #202124;
}
.title-tips {
  font-size: 13px;
}
.item-row,
.item-create {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
}
.box {
  width: 240px;
  height: 120px;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
}
.create-box {
  background: #f7f7f7;
}
.create-box:hover {
  background: #e8f0fe;
  color: #1b9aee;
  border: 1px solid #87d2ff;
  box-shadow: 0 8px 16px rgba(27, 154, 238, 0.2);
}
.create-box-title {
  font-size: 15px;
  letter-spacing: 0.1em;
}
</style>