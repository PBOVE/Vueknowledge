/**
*
*  @author ZTiger
*
*/


<template>
  <div id="know-tree-list">
    <div class="know-tree-list-header-title">类层次结构</div>
    <Layout>
      <Header class="know-tree-default know-tree-header-select">
        <div class="know-tree-header-button know-tree-header-button-add" @click="TLCallback(4)">
          <Icon type="md-add" size="20" />
          <div class="know-tree-header-button-title">添加</div>
        </div>

        <div
          class="know-tree-header-button know-tree-header-button-del"
          :class="{'know-tree-header-button-no-selete':!SeleteNodeFlag}"
          @click="TLCallback(5)"
        >
          <Icon type="md-remove" size="20" />
          <div class="know-tree-header-button-title">删除</div>
        </div>

        <div
          class="know-tree-header-button know-tree-header-button-exit"
          :class="{'know-tree-header-button-no-selete':!SeleteNodeFlag}"
          @click="TLCallback(6)"
        >
          <Icon type="md-create" size="25" />
          <div class="know-tree-header-button-title">编辑</div>
        </div>
      </Header>
      <Content
        class="know-tree-default know-tree-main-content"
        :style="{height:setTreeClientHeight}"
      >
        <tree-z @selectNode="TLCallback" :treelistVal="treeZ"></tree-z>
      </Content>
    </Layout>

    <modal-a :AddModalFlag="buttonAddFlag" :treeNode="treeNode" @addNameS="TLCallback"></modal-a>
    <modal-d
      :DelModalFlag="buttonDelFlag"
      :selectNodeName="selectNodeName"
      :treeNodeId="treeNode.id"
      @addNameS="TLCallback"
    ></modal-d>
    <modal-e
      :ExitModalFalg="buttonExitFlag"
      :selectNodeName="selectNodeName"
      :treeNodeId="treeNode.id"
      @ExitNameS="TLCallback"
    ></modal-e>
  </div>
</template>

<script>
// 导入 删除 modal
import modalD from "./modalADE/modalD";
// 导入 添加 modal
import modalA from "./modalADE/modalA";
// 导入 编辑 modeal
import modalE from "./modalADE/modalE";
// 导入 树
import treeZ from "./tree/treeJquery";
export default {
  components: { modalD, modalA, modalE, treeZ },
  props: ["InnerHeight"],
  data() {
    return {
      // 点击 添加标志 位
      buttonAddFlag: "",
      // 点击 删除标志 位
      buttonDelFlag: "",
      // 点击 编辑标志 位
      buttonExitFlag: "",
      // 删除 节点
      selectNodeName: "",
      // 设置top高度
      TopHeight: 100,
      //  树节点 点击标志位
      SeleteNodeFlag: false,
      // 树节点 值\
      treeNode: "",
      //传给treeZ组件的值
      treeZ: {
        ExitName: "",
        addName: "",
        delName: ""
      },
      // 根节点数量
      rootNodeNum: ""
    };
  },
  methods: {
    //组件 传来的值标志位
    TLCallback(type, val) {
      const statusMap = {
        1: () => {
          //tree 点击
          this.SeleteNodeFlag = val;
        },
        //获取点击节点的名称
        2: () => {
          let node = {
            name: val.name,
            id: val.id
          };
          this.selectNodeName = val.name;
          this.treeNode = node;
          this.$emit("MangageCallback", 1, node);
        },
        //modal修改 触发
        3: () => {
          this.treeZ.ExitName = val;
          this.selectNodeName = val;
        },
        4: () => {
          this.buttonAddFlag = Math.random();
        },
        5: () => {
          if (this.SeleteNodeFlag) {
            this.buttonDelFlag = Math.random();
          }
        },
        6: () => {
          if (this.SeleteNodeFlag) {
            this.buttonExitFlag = Math.random();
          }
        },
        // modal 创建 触发
        7: () => {
          this.treeZ.addName = val;
        },
        // modal 删除 触发
        8: () => {
          this.selectNodeName = "";
          this.treeNode = "";
          this.$emit("MangageCallback", 1, "");
          this.treeZ.delName = val;
        },
        //根节点 数量 获取
        9: () => {
          this.rootNodeNum = val;
        }
      };
      statusMap[type]();
    }
  },
  computed: {
    //设置 树 可视区 高度
    setTreeClientHeight() {
      return this.InnerHeight - this.TopHeight + "px";
    }
  }
};
</script>

<style  scoped>
.ivu-layout-header{
  line-height: 0;
}
#know-tree-list {
  min-width: 300px;
}
.know-tree-list-header-title {
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  padding: 5px 10px 3px 10px;
  border-bottom: 1px solid #dcdee2;
  background-color: #dcdee2;
}
.know-tree-default {
  background-color: #f5f7f9;
  border-radius: 5px;
}
.know-tree-header-button-title{
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-indent: 0.3em;
}
.know-tree-header-select {
  display: flex;
  justify-content: flex-start;
  align-items:center;
  height: 50px;
  padding: 0;
}
.know-tree-header-button {
  box-sizing: border-box;
  height: 40px;
  width: 80px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;
  display: inline-block;
  color: #505050;
}
.know-tree-header-button:hover {
  background-color: #e8eaec;
  transition: all 0.5s;
}
.know-tree-header-button-add:hover .ivu-icon{
  color: #19be6b;
}
.know-tree-header-button-del:hover .ivu-icon{
  color: #f16643;
}
.know-tree-header-button-exit:hover .ivu-icon{
  color: #2d8cf0;
}
.know-tree-header-button-add:active{
  color: #19be6b;
}
.know-tree-header-button-del:active{
  color: #f16643;
}
.know-tree-header-button-exit:active{
  color: #2d8cf0;
}
.know-tree-main-content {
  box-shadow: 0 0 5px #e8eaec;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
}
.know-tree-main-content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.know-tree-main-content::-webkit-scrollbar-thumb {
  background-color: #c5c8ce;
  border-radius: 5px;
}
.know-tree-header-button-no-selete {
  color: #a0a0a0;
}
.know-tree-header-button-no-selete:hover {
  color: #a0a0a0;
}
</style>