/**
*
*  @author ZTiger
*
*/


<template>
  <!-- <div class="know-treeDiagram" ref="knowtree" ></div> -->
  <tree-chart 
    :TopHeight='TopHeight'
    :RightWeight='RightWeight'
    :style="{height:SetHeight}" 
    ref="treechart"></tree-chart>
</template>

<script>
import treeChart from '../../../../../components/treeChart'
export default {
  components:{treeChart},
  props: ["treeNode", "showSelectNum", "InnerHeight"],
  data() {
    return {
      getDataFlag: false,
      //设置top高
      TopHeight: 120,
      //设置right宽度
      RightWeight: 20
    };
  },
  methods: {
    // 获取服务器数据
    getTreeData() {
      if (this.getDataFlag) return;
      this.getDataFlag = true;

      let url = "node/" + this.treeNode.id + "/child";
      this.get(url)
        .then(res => {
          let child = this.ChildNodeProcessing(res.data);
          return Promise.resolve(child);
        })
        .then(childdata => {
          let url = "node/" + this.treeNode.id + "/link";
          this.get(url).then(res => {
            if (this.showSelectNum === 3) {
              let treeData = this.parentNodeProcessing(
                childdata,
                res.data.parent
              );
              // this.CreateD3jsTree(treeData);
              this.$refs.treechart.handletreeData(treeData);
            }
          });
        })
        .catch(() => {});
    },
    //子节点处理
    ChildNodeProcessing(child) {
      //遍历数据
      let nodeBFS = data => {
        let Arr = [];
        data.forEach(item => {
          let obj = {
            name: item.name,
            sortId: item.sortId
          };
          if (item.childNodes.length) {
            obj.children = nodeBFS(item.childNodes);
          }
          Arr.push(obj);
        });
        return Arr.sort(this.sortId);
      };
      return nodeBFS(child);
    },
    //父亲节点处理
    parentNodeProcessing(childdata, parent) {
      let treeData = {
        name: this.treeNode.name,
        children: childdata
      };
      parent.forEach(item => {
        treeData = {
          name: item.name,
          children: [treeData]
        };
      });
      return treeData;
    },
    // sord 排序
    sortId(ObjA, ObjB) {
      let valA = ObjA.sortId;
      let valB = ObjB.sortId;
      if (valA < valB) return -1;
      else if (valA > valB) return 1;
      else return 0;
    },
    
    //设置 数据重新获取
    //从新获取数据
    setForce() {
      this.getDataFlag = false;
      if (this.showSelectNum !== 3) return;
      this.getTreeData();
    }
  },
  watch: {
    treeNode: {
      handler: function(newval, oldval) {
        if (newval === "" || newval.id === oldval.id) return;
        this.getDataFlag = false;
        if (this.showSelectNum === 3) {
          this.getTreeData();
        }
      },
      deep: true
    },
    showSelectNum(val) {
      if (val !== 3) return;
      this.getTreeData();
    }
  },
  computed: {
    //设置  可视区 高度
    SetHeight() {
      return this.InnerHeight - this.TopHeight + "px";
    }
  }
};
</script>

<style  scoped>
</style>