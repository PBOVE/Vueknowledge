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
  props: ["treeNode"],
  data() {
    return {};
  },
  methods: {
    // 获取 服务器 节点属性 节点关系
    getAttriBute(Id) {
      let url = "node/" + Id;
      this.get(url).then(res => {
        window.console.log(res);
      });
    }
  },
  watch: {
    treeNode: {
      handler: function(val) {
        if (val === "") {
          return;
        }
        window.console.log(val);
        this.getAttriBute(val.id);
      },
      deep: true
    }
  }
};
</script>

<style  scoped>
.know-operate-details-default{
  margin-bottom: 10px;
}
.know-operate-details-title {
  font-size: 16px;
  text-indent: 1em;
}
</style>