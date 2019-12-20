/**
*
*  @author ZTiger
*
*/


<template>
  <div>
    <div class="know-operate-details-default">
      <div class="know-operate-details-title">属性&nbsp;:</div>
    </div>
    <div class="know-operate-details-default">
      <div class="know-operate-details-title">关系&nbsp;:</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["treeNode", "showSelectNum"],
  data() {
    return {
      //请求数据标志位
      getDataFlag: false
    };
  },
  methods: {
    // 获取 服务器 节点属性 节点关系
    getAttriBute() {
      if (this.getDataFlag) return;
      this.getDataFlag = true;
      let url = "node/" + this.treeNode.id;
      this.get(url).then(res => {
        window.console.log(res);
      });
    }
  },
  watch: {
    treeNode: {
      handler: function(newval,oldval) {
        if (newval === "" ||newval.id === oldval.id) return;
        this.getDataFlag = false;
        if (this.showSelectNum === 1) {
          this.getAttriBute();
        }
      },
      deep: true
    },
    showSelectNum(val) {
      if (val !== 1) return;
      this.getAttriBute();
    }
  }
};
</script>

<style  scoped>
.know-operate-details-default {
  margin-bottom: 10px;
}
.know-operate-details-title {
  font-size: 16px;
  text-indent: 1em;
}
</style>