/**
*
*  @author ZTiger
*
*/


<template>
  <Modal v-model="modalFlag" :width="modalWidth" :mask-closable="false">
    <p slot="header" class="know-modal-header">
      <Icon type="ios-information-circle"></Icon>
      <span>&nbsp;&nbsp;删&nbsp;除&nbsp;节&nbsp;点</span>
    </p>
    <div class="know-modal-text">
      <p v-show="selectNodesFlag">
        你确定要此&nbsp;&nbsp;
        <strong>删除</strong>&nbsp;&nbsp;节点吗?
      </p>
      <p v-show="!selectNodesFlag">
        你确定要&nbsp;&nbsp;
        <strong>删除</strong>&nbsp;&nbsp;这些节点吗?
      </p>
      <p
        class="know-modal-text-center"
        v-show="selectNodesFlag"
      >{{selectNodeName.length>20?selectNodeName.substr(0,15)+'...':selectNodeName}}</p>
      <p
        class="know-modal-text-nodes"
        v-show="!selectNodesFlag"
        v-for="(item,index) in Nodes"
        :key="item.sortId"
      >{{index + 1}}.&nbsp;{{item.name}}</p>
    </div>
    <div slot="footer">
      <Button type="info" @click="modalFlag=false">取&nbsp;消</Button>
      <Button type="text" @click.stop="userDelfun" class="know-modal-footer-del">删&nbsp;除</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  props: ["DelModalFlag", "selectNodeName", "treeNodeId", "selectNodes"],
  data() {
    return {
      // modal标志位
      modalFlag: false,
      // 多节点按下 标志位
      selectNodesFlag: false,
      // modal 宽度
      modalWidth: 300,
      // 多节点
      Nodes: "",
      // 多节点 id
      NodeId: ""
    };
  },
  watch: {
    //监听 treelist 传过来的标志符
    DelModalFlag() {
      this.modalFlag = true;
      let NodesLen = this.selectNodes.length;
      // 判断 是ctrl 按下 还是 单个节点
      if (NodesLen) {
        // 多节点
        let arr = [];
        let arrId = [];
        this.selectNodes.forEach(item => {
          arr.push({
            name: item.name,
            id: item.id
          });
          arrId.push(item.id);
        });
        this.NodeId = arrId;
        this.Nodes = arr.sort(this.sortId);
        this.selectNodesFlag = false;
        this.modalWidth =
          this.Nodes[NodesLen - 1].name.length * 2 * 30 < 400
            ? 400
            : this.Nodes[NodesLen - 1].name.length * 2 * 30;
      } else {
        this.selectNodesFlag = true;
        this.modalWidth = 300;
      }
    },
    // 监听 modalflag = true
    modalFlag(val) {
      if (val) {
        document.addEventListener("keyup", this.upCtrlEnter);
      } else {
        document.removeEventListener("keyup", this.upCtrlEnter);
      }
    }
  },
  methods: {
    //点击 删除 按键
    userDelfun() {
      this.modalFlag = false;
      if (this.selectNodesFlag) {
        let url = "node/" + this.treeNodeId;
        this.delete_string(url)
          .then(res => {
            if (res.data) {
              this.$emit("addNameS", 8, Math.random());
            } else {
              this.$Message.error("删除失败");
            }
          })
          .catch(() => {
            this.$Message.error("删除失败");
          });
      } else {
				let url = "node";
				let obj = this.NodeId
				window.console.log(obj);
        this.delete_json(url, obj)
          .then(res => {
            window.console.log(res);
          })
          .catch(() => {
            this.$Message.error("删除失败");
          });
      }
    },
    //监听 ctrl + ender 按键 执行函数
    upCtrlEnter(e) {
      if (e.ctrlKey && e.keyCode == 13) {
        this.userDelfun();
      }
    },
    // 排序
    sortId(ObjA, ObjB) {
      let valA = ObjA.name.length;
      let valB = ObjB.name.length;
      if (valA < valB) return -1;
      else if (valA > valB) return 1;
      else return 0;
    }
  }
};
</script>

<style  scoped>
.know-modal-header {
  color: #f60;
  text-align: center;
  user-select: none;
}
/* .know-modal-text p:nth-of-type(2){
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    } */
.know-modal-text-center {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
.know-modal-text-nodes {
  display: inline-block;
  margin-right: 10px;
}
.Tips {
  color: #c5c8ce;
}
.know-modal-footer-del:hover {
  color: #ed4014;
}
.know-modal-footer-del:focus {
  box-shadow: 0 0 0 2px rgba(237, 64, 20, 0.2);
}
.know-modal-footer-del:active {
  color: #ed4014;
}
</style>