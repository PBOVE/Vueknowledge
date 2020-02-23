/**
*
*  @author ZTiger
*
*/


<template>
  <tree-chart
    :TopHeight="TopHeight"
    :RightWeight="RightWeight"
    :style="{height:SetHeight}"
    ref="treechart"
  ></tree-chart>
</template>


<script>
import treeChart from "../../../components/treeChart";
export default {
  components: { treeChart },
  props: ["showSelectNum", "InnerHeight", "nodeId"],
  data() {
    return {
      // 获取数据 标志位
      getDataFlag: false,
      //设置top高
      TopHeight: 120,
      //设置right宽度
      RightWeight: 0
    };
  },
  methods: {
    // 获取 服务器 数据
    getforceData() {
      if (this.getDataFlag || !this.nodeId) return;
      this.getDataFlag = true;
      let url = "node/" + this.nodeId + "/link";
      this.get(url)
        .then(res => {
          if (this.showSelectNum === 2) {
            this.$refs.treechart.handletreeData(res.data);
          }
        })
        .catch(() => {});
    }
  },
  watch: {
    showSelectNum: {
      handler(val) {
        if (val !== 2) return;
        this.getforceData();
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    },
    nodeId() {
      this.getDataFlag = false;
      if (this.showSelectNum === 2) {
        this.getforceData();
      }
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


<style scoped>
</style>