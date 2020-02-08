/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-selectid-content scroll" :style="{height:setClientHeight}">
    <div v-show="showSelectNum === 1">
      <force-diagram :InnerHeight="InnerHeight" :showSelectNum="showSelectNum" :nodeId='nodeId'></force-diagram>
    </div>
    <div v-show="showSelectNum===2">
      <tree-diagram :InnerHeight="InnerHeight" :showSelectNum="showSelectNum" :nodeId='nodeId'></tree-diagram>
    </div>
    <div v-show="showSelectNum===3">
      <rich-text :InnerHeight="InnerHeight" :showSelectNum="showSelectNum" :nodeId='nodeId'></rich-text>
    </div>
  </div>
</template>


<script>
//导入力导图
import forceDiagram from "./interface/forceDiagram";
//导入 树图
import treeDiagram from "./interface/treeDiagram";
//导入 富文本
import richText from "./interface/richText";

export default {
  components: { forceDiagram, treeDiagram ,richText},
  props: ["InnerHeight", "showSelectNum",'nodeId'],
  data() {
    return {
      //设置top高
      TopHeight: 100
    };
  },
  computed: {
    //设置  可视区 高度
    setClientHeight() {
      return this.InnerHeight - this.TopHeight + "px";
    }
  }
};
</script>


<style scoped>
.know-selectid-content {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  overflow: auto;
}
</style>