/**
*
*  @author ZTiger
*
*/


<template>
  <div class="k-s-c-aside">
    <!-- <div class="k-s-c-aside-title">{{showTitle}}</div> -->
    <force-chart class="k-s-c-aside" :RightWeight="RightWeight" ref="forcechart"></force-chart>
  </div>
</template>

<script>
// 力导向组件
import forceChart from "../../../components/forceChart";
export default {
  components: { forceChart },
  props: ["reqShowData"],
  data() {
    return {
      // 向用户展示 标题
      showTitle: "",
      //设置right宽度
      RightWeight: 20
    };
  },
  methods: {
    // 回调函数
    CAsideCallback(type, val) {
      const statusMap = {
        1: () => {
          this.showTitle = this.reqShowData[val].node.name;
          this.handleInfo(
            this.reqShowData[val].info,
            this.reqShowData[val].node
          );
          // window.console.log(val);
        }
      };
      statusMap[type]();
    },
    handleInfo(data, mynode) {
      let child = data.child;
      let parent = data.parent;
      let nodes = [],
        links = [];
      nodes.push({
        Tid: mynode.id,
        name: mynode.name,
        Pid: mynode.parentNodeId
      });
      child.forEach((item, index) => {
        nodes.push({
          Tid: item.id,
          name: item.name,
          Pid: item.parentNodeId
        });
        links.push({
          relation: "child-relation",
          source: 0,
          target: index + 1
        });
      });
      let start = 0;
      parent.forEach((item, index) => {
        nodes.push({
          Tid: item.id,
          name: item.name,
          Pid: item.parentNodeId
        });
        links.push({
          relation: "parent-relation",
          source: start,
          target: index + child.length + 1
        });
        start = index + child.length + 1;
      });
      window.console.log(nodes, links);
      this.$refs.forcechart.handleforceData(nodes, links);
    }
  }
};
</script>

<style  scoped>
.k-s-c-aside {
  height: 100%;
  width: 100%;
}
</style>