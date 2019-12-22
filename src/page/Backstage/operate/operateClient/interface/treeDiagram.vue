/**
*
*  @author ZTiger
*
*/


<template>
  <div class='know-treeDiagram'>手动阀s</div>
</template>

<script>
//导入 d3 数据 包
// import * as d3 from 'd3';
export default {
  props:['treeNode','showSelectNum'],
  data() {
    return {
      getDataFlag:false
    };
  },
  methods:{
    // 获取服务器数据
    getTreeData(){
      if (this.getDataFlag) return;
      this.getDataFlag = true;
      let url = 'node/' + this.treeNode.id + '/link';
      this.get(url).then(res=>{
          window.console.log(res);
      }).catch(()=>{
        this.$Message.error("数据获取失败");
      })
    }
  },
  watch:{
    treeNode: {
      handler: function(newval,oldval) {
        if (newval === "" ||newval.id === oldval.id) return;
        this.getDataFlag = false;
        if (this.showSelectNum === 3) {
          this.getTreeData()
        }
      },
      deep: true
    },
    showSelectNum(val) {
      if (val !== 3) return;
      this.getTreeData()

    }
  }
};
</script>

<style  scoped>
</style>