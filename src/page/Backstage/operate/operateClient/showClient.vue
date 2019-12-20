/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-Showclient">
    <div v-show="showSelectNum === 1">
      <details-show 
        :treeNode="treeNode"
        :showSelectNum = 'showSelectNum'
        ></details-show>
    </div>
    <div v-show="showSelectNum === 2">
      <force-diagram
        :InnerHeight='InnerHeight'
        :treeNode="treeNode"
        :showSelectNum = 'showSelectNum'></force-diagram>
    </div>
    <div v-show="showSelectNum === 3">
      <tree-diagram
        :treeNode="treeNode"
        :showSelectNum = 'showSelectNum'></tree-diagram>
    </div>
    <div v-show="showSelectNum === 4">
			<journal-show
        :treeNode="treeNode"
        :showSelectNum = 'showSelectNum'></journal-show>
		</div>
    <div v-show="showSelectNum === 5">5</div>
  </div>
</template>

<script>
//导入详情界面
import detailsShow from "./interface/details"
//导入 日志
import journalShow from './interface/journal'
//导入 树图
import treeDiagram from './interface/treeDiagram'
//导入力导图
import forceDiagram from './interface/forceDiagram'
export default {
  props: ["treeNode", "showSelectNum",'InnerHeight'],
  components: { detailsShow ,journalShow,treeDiagram,forceDiagram},
  data() {
    return {};
  },
  methods: {},
  watch: {
  }
};
</script>

<style  scoped>
.know-Showclient{
  height: 100%;
}
</style>