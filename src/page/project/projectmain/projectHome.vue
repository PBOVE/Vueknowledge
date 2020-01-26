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
    <item-list class="item-row" :itemData='itemData' @selectItem='selectItem'></item-list>
    <div class="title-h1">成员分享的</div>
    <!-- <item-list class="item-row" ></item-list> -->
    <item-create ref="modalC"></item-create>
    <item-setting ref='modalS'></item-setting>
  </div>
</template>


<script>
import itemList from "./itemList";
import itemCreate from './itemCreate'
import itemSetting from './itemSetting'
export default {
  components: { itemList ,itemCreate,itemSetting},
  data() {
    return {
      itemData:''
    };
  },
  mounted() {
    this.getServeItem();
  },
  methods: {
    // 获取服务器里面的项目
    getServeItem() {
      const url = "item";
      this.get(url)
        .then(res => {
          this.itemData = res.data;
        })
        .catch(() => {
        });
    },
    // 状态选择 
    statusSelect(type){
      const statusMap = {
        // 点击创建
        1:()=>{
          this.$refs.modalC.setModalStatus();
        }
      };
      statusMap[type]();
    },
    // 选中 项目设置
    selectItem(val){
      this.$refs.modalS.showView(val);
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