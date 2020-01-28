/**
*
*  @author ZTiger
*
*/


<template>
  <div>
    <ul id="ztreeDemo" class="ztree"></ul>
  </div>
</template>

<script>
import $ from "../../../../assets/jquery-vendor";
import "ztree";
import "ztree/css/metroStyle/metroStyle.css";
export default {
  props: ["treelistVal",'itemId'],
  data() {
    return {
      //设置 ztree 树
      selectTreeSetting: {
        view: {
          howLine: false,
          showIcon: false,
          selectedMulti: true,
          dblClickExpand: true,
          addDiyDom: this.addDiyDom
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          beforeDblClick: this.showChildClik,
          beforeExpand: this.showChildClik,
          onClick: this.zTreeOnClick
        }
      },
      //点击后ztree节点 id
      StreeId: "",
      // 点击后ztree 节点
      StreeNode: "",
      // 树
      zTree: ""
    };
  },
  mounted() {
    this.getTreeData();
  },
  methods: {
    //获取服务器数据
    getTreeData() {
      const url = "node";
      const obj = {
        itemId: this.itemId
      };
      this.get(url, obj)
        .then(res => {
          let data = res.data;
          let Arr = [];
          this.$emit("selectNode", 9, data.length);
          data.forEach(item => {
            let obj = {
              id: item.id,
              name: item.name,
              isParent: item.child
            };
            Arr.push(obj);
          });
          this.createTree(Arr);
        })
        .catch(() => {});
    },
    //添加节点 修改样式
    addDiyDom(treeId, treeNode) {
      let spaceWidth = 1.5;
      let switchObj = $("#" + treeNode.tId + "_switch");
      let icoObj = $("#" + treeNode.tId + "_ico");
      switchObj.remove();
      icoObj.before(switchObj);
      if (treeNode.level > 0) {
        let spaceStr =
          "<span style='display: inline-block;width:" +
          spaceWidth * treeNode.level +
          "em'></span>";
        switchObj.before(spaceStr);
      }
    },
    // sord 排序
    sortId(ObjA, ObjB) {
      var valA = ObjA.sortId;
      var valB = ObjB.sortId;
      if (valA < valB) return -1;
      else if (valA > valB) return 1;
      else return 0;
    },
    //创建 树图 修改样式
    createTree(nodes) {
      $.fn.zTree.init($("#ztreeDemo"), this.selectTreeSetting, nodes);
      this.zTree = $.fn.zTree.getZTreeObj("ztreeDemo");
    },
    //点击 节点 前 响应函数
    beforeMouseUp(treeId, treeNode) {
      if (!treeNode) return;
      this.StreeId = treeNode.tId;
      this.StreeNode = treeNode;
      this.$emit("selectNode", 1, true);
      this.$emit("selectNode", 2, treeNode);
    },
    // 双击 节点 展开 节点 函数
    showChildClik(treeId, treeNode) {
      if (!treeNode) return;
      if (!treeNode.isParent || treeNode.asyncParent) return 1;
      //异步加载 防止重复加载
      treeNode.asyncParent = true;
      let url = "node/" + treeNode.id + "/child";
      this.get(url)
        .then(res => {
          let data = res.data;
          let Arr = [];
          data.forEach(item => {
            Arr.push({
              id: item.id,
              name: item.name,
              isParent: item.child
            });
          });
          this.zTree.addNodes(treeNode, Arr, false);
        })
        .catch(() => {});
    },
    // 点击 节点 后
    zTreeOnClick(event, treeId, treeNode) {
      if (!treeNode) return;
      else if (event.ctrlKey) {
        this.$emit("selectNode", 10, this.zTree.getSelectedNodes());
      } else {
        this.StreeId = treeNode.tId;
        this.StreeNode = treeNode;
        this.$emit("selectNode", 1, true);
        this.$emit("selectNode", 2, treeNode);
        this.$emit("selectNode", 11, []);
      }
    }
  },
  watch: {
    "treelistVal.ExitName": {
      handler: function(val) {
        $("#" + this.StreeId + "_a").attr("title", val);
        $("#" + this.StreeId + "_span").text(val);
        this.StreeNode["name"] = val;
        this.$emit("selectNode", 2, this.StreeNode);
      }
    },
    "treelistVal.addName": {
      handler: function(val) {
        if (this.StreeNode) {
          //判断 是否双击 点击过
          if (this.showChildClik("", this.StreeNode) === 1) {
            this.StreeNode.asyncParent = true;
            this.zTree.addNodes(this.StreeNode, {
              id: val.id,
              name: val.name,
              isParent: false
            });
          }
        } else {
          this.zTree.addNodes(null, {
            id: val.id,
            name: val.name,
            isParent: false
          });
        }
      }
    },
    "treelistVal.delName": {
      handler: function() {
        this.zTree.removeNode(this.StreeNode, false);
        this.StreeNode = "";
        this.$emit("selectNode", 1, false);
      }
    },
    "treelistVal.delNodes": {
      handler: function() {
        let Nodes = this.zTree.getSelectedNodes();
        Nodes.forEach(item => {
          if (this.StreeNode.id === item.id) {
            this.StreeNode = "";
            this.$emit("selectNode", 1, false);
            this.$emit("selectNode", 13);
          }
          this.zTree.removeNode(item, false);
        });
        if (this.StreeNode) {
          this.zTree.selectNode(this.StreeNode);
          this.$emit("selectNode", 1, true);
        }
        this.$emit("selectNode", 11, []);
      }
    }
  }
};
</script>

<style>
.ztree * {
  font-size: 13px;
}
.ztree li {
  line-height: 30px;
}
.ztree li ul {
  margin: 0;
  padding: 0;
}

.ztree li a {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  height: 30px;
  padding-top: 0px;
  color: rgba(0, 0, 0, 0.65);
}

.ztree li a:hover {
  text-decoration: none;
  background-color: #eaf4fe;
}
.ztree.showIcon li a span.button.switch {
  visibility: visible;
}

.ztree li a.curSelectedNode {
  background-color: #d5e8fc;
  border: 0;
  height: 30px;
  color: #000;
}

.ztree li span {
  line-height: 30px;
}
.ztree li span.button.switch {
  width: 16px;
  height: 16px;
}

.ztree li span.button.switch.level0 {
  width: 20px;
  height: 20px;
}

.ztree li span.button.switch.level1 {
  width: 20px;
  height: 20px;
}
.ztree li span.button,
.ztree li ul.line {
  background-image: none;
}
.ztree li span.button {
  display: inline-block;
  font-family: Ionicons;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  text-rendering: optimizeLegibility;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: -0.125em;
  text-align: center;
}
.ztree li span.button.root_close::before,
.ztree li span.button.roots_close::before,
.ztree li span.button.bottom_close::before,
.ztree li span.button.center_close::before {
  content: "\f11f";
  font-size: 15px;
}
.ztree li span.button.root_open::before,
.ztree li span.button.roots_open::before,
.ztree li span.button.bottom_open::before,
.ztree li span.button.center_open::before {
  content: "\F116";
  font-size: 15px;
}
</style>