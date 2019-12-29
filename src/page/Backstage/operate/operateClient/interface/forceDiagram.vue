/**
*
*  @author ZTiger
*
*/


<template>
  <!-- <div class="know-force" ref="knowForce" :style="{height:SetHeight}"></div> -->
  <force-chart  
    :style="{height:SetHeight}"
    :RightWeight='RightWeight'
    ref = 'forcechart'></force-chart>
</template>

<script>

// 力导向组件
import forceChart from '../../../../../components/forceChart'
export default {
  components:{forceChart},
  props: ["treeNode", "showSelectNum", "InnerHeight"],
  data() {
    return {
      // 获取数据 标志位
      getDataFlag: false,
      //设置top高
      TopHeight: 120,
      //设置right宽度
      RightWeight: 20
    };
  },
  methods: {
    // 获取 服务器 数据
    getforceData() {
      if (this.getDataFlag) return;
      this.getDataFlag = true;
      let url = "node/" + this.treeNode.id + "/graph";
      this.get(url)
        .then(res => {
          if (this.showSelectNum === 2) {
            this.handleforceData(res.data);
          }
        })
        .catch(() => {});
    },
    //处理 数据 并且 渲染
    handleforceData(data) {
      let hashMap = {}; //映射
      let hashnumI = 0; // 映射计数器
      let Nodes = [];
      let Links = [];
      data.nodes.forEach((item, i) => {
        Nodes.push({
          name: item.name,
          id: i,
          Tid: item.id
        });
        hashMap[item.id] = hashnumI++;
      });
      data.links.forEach(function(item) {
        Links.push({
          relation: item.property.type || item.property.relation,
          source: hashMap[item.source],
          target: hashMap[item.target]
        });
        if (item.property.relation) {
          Nodes[hashMap[item.target]]["Pid"] = item.source;
          Nodes[hashMap[item.target]]["PNid"] = hashMap[item.source];
        }
      });
      this.$refs.forcechart.handleforceData(Nodes, Links);
    },
    //从新获取数据
    setForce() {
      this.getDataFlag = false;
      if (this.showSelectNum !== 2) return;
      this.getforceData();
    }
  },
  watch: {
    treeNode: {
      handler: function(newval, oldval) {
        if (newval === "" || newval.id === oldval.id) return;
        this.getDataFlag = false;
        if (this.showSelectNum === 2) {
          this.getforceData();
        }
      },
      deep: true
    },
    showSelectNum(val) {
      if (val !== 2) return;
      this.getforceData();
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
.know-force {
  height: 100%;
}
</style>