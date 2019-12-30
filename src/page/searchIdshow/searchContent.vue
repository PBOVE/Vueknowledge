/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-selectid-content" :style="{height:setClientHeight}">
    <div v-show="showSelectNum===1">132</div>
    <div v-show="showSelectNum===2">1323242</div>
    <div v-show="showSelectNum===3">123423132</div>
  </div>
</template>


<script>
export default {
  props: ["InnerHeight", "showSelectNum"],
  data() {
    return {
      //设置top高
      TopHeight: 170
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
}
</style>