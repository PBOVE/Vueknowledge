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
    <div class="item-load" v-if="itemLoadFlag">
      <Icon type="md-ionic" class="item-load-icon" />
    </div>
    <item-list
      class="item-row"
      :itemData="itemData"
      @selectItem="selectItem"
      @selectDelete="selectDelete"
      status="true"
    ></item-list>
    <div class="title-h1">成员分享的</div>
    <div class="item-load" v-if="shareitemLoadFlag">
      <Icon type="md-ionic" class="item-load-icon" />
    </div>
    <item-list
      class="item-row"
      :itemData="itemShareData"
      @selectItem="selectItem"
      @selectDelete="selectDelete"
      status="false"
    ></item-list>
    <item-create ref="modalC" @addItem="addItem"></item-create>
    <item-setting ref="modalS" @updataItem="updataItem"></item-setting>
    <item-delete ref="modalD" @delItem="delItem"></item-delete>
  </div>
</template>


<script>
import itemList from "./operation/itemList";
import itemCreate from "./operation/itemCreate";
import itemSetting from "./operation/itemSetting";
import itemDelete from "./operation/itemDelete";

export default {
  components: { itemList, itemCreate, itemSetting, itemDelete },
  data() {
    return {
      // 项目数据
      itemData: "",
      // 分享项目数据
      itemShareData: "",
      // 选中的数据下标
      selectIndex: "",
      // 项目加载标志位
      itemLoadFlag: true,
      // 分享项目加载标志位
      shareitemLoadFlag: true
    };
  },
  mounted() {
    this.getServeItem();
    this.getServeShareItem();
  },
  methods: {
    // 获取服务器里面的项目
    getServeItem() {
      const url = "item";
      this.get(url)
        .then(res => {
          this.itemLoadFlag = false;
          this.itemData = res.data;
        })
        .catch(() => {});
    },
    // 获取服务器里面分享的项目
    getServeShareItem() {
      const url = "item/share";
      this.get(url)
        .then(res => {

          this.shareitemLoadFlag = false;
          this.itemShareData = res.data;
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
    selectItem(index, status) {
      this.selectIndex = index;
      if (status === "true") {
        this.$refs.modalS.showView(this.itemData[index], status);
      } else {
        this.$refs.modalS.showView(this.itemShareData[index], status);
      }
    },
    // 选中 项目删除
    selectDelete(index) {
      this.selectIndex = index;
      this.$refs.modalD.showView(this.itemData[index]);
    },
    // 创建成功 添加数据
    addItem(val) {
      this.itemData.push(val);
      this.getServeShareItem();
    },
    // 修改数据
    updataItem(val) {
      this.itemData.splice(this.selectIndex, 1, val);
      this.getServeShareItem();
    },
    // 删除项目
    delItem() {
      this.itemData.splice(this.selectIndex, 1);
      this.getServeShareItem();
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
.item-load {
  height: 120px;
  line-height: 120px;
  text-align: center;
  color: #2d8cf0;
  font-size: 30px;
}
.item-load-icon {
  animation: ani-demo-load 2.5s linear infinite;
}
</style>