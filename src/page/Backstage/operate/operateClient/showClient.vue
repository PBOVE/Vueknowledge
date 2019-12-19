/**
*
*  @author ZTiger
*
*/


<template>
  <div class>
    <div v-show="showSelectNum === 1">
      <details-show :treeNode="treeNode"></details-show>
    </div>
    <div v-show="showSelectNum === 2">2</div>
    <div v-show="showSelectNum === 3">3</div>
    <div v-show="showSelectNum === 4">
			<journal-show  :treeNode="treeNode"></journal-show>
		</div>
    <div v-show="showSelectNum === 5">5</div>
  </div>
</template>

<script>
//导入详情界面
import detailsShow from "./interface/details";
//导入 日志
import journalShow from './interface/journal'
export default {
  props: ["treeNode", "showSelectNum"],
  components: { detailsShow ,journalShow},
  data() {
    return {};
  },
  methods: {},
  watch: {
    // treeNode: {
    //   handler: function(val) {
    // 		if(val === ''){
    // 			return;
    // 		}
    // 		window.console.log(val);
    //   },
    //   deep: true
    // }
  }
};
</script>

<style  scoped>
</style>