/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-Showclient">
    <div v-show="showSelectNum === 1">
      <details-show
        ref="detailsShow"
        :treeNode="treeNode"
        :showSelectNum="showSelectNum"
        @SClientCallback="SClientCallback"
        class="know-Showclient-default"
      ></details-show>
    </div>
    <div v-show="showSelectNum === 2">
      <force-diagram
        ref="forcediagram"
        :InnerHeight="InnerHeight"
        :treeNode="treeNode"
        :showSelectNum="showSelectNum"
        class="know-Showclient-default"
      ></force-diagram>
    </div>
    <div v-show="showSelectNum === 3">
      <tree-diagram
        ref="treediagram"
        :InnerHeight="InnerHeight"
        :treeNode="treeNode"
        :showSelectNum="showSelectNum"
        class="know-Showclient-default"
      ></tree-diagram>
    </div>
    <div v-show="showSelectNum === 4">
      <journal-show
        ref="journalog"
        :treeNode="treeNode"
        :showSelectNum="showSelectNum"
        :InnerHeight="InnerHeight"
        class="know-Showclient-default"
      ></journal-show>
    </div>
    <div v-show="showSelectNum === 5">
      <rich-text :InnerHeight="InnerHeight" :treeNode="treeNode" :showSelectNum="showSelectNum"></rich-text>
    </div>
  </div>
</template>

<script>
//导入详情界面
import detailsShow from "./interface/details";
//导入 日志
import journalShow from "./interface/journal";
//导入 树图
import treeDiagram from "./interface/treeDiagram";
//导入力导图
import forceDiagram from "./interface/forceDiagram";
//导入富文本
import richText from "./interface/richText";
export default {
  props: ["treeNode", "showSelectNum", "InnerHeight"],
  components: { detailsShow, journalShow, treeDiagram, forceDiagram, richText },
  data() {
    return {};
  },
  methods: {
    SClientCallback(type, val) {
      const statusMap = {
        // 名称 改变
        1: () => {
          this.$emit("oMainCallback", 2, val);
          this.$refs.forcediagram.setForce();
          this.$refs.treediagram.setForce();
        },
        // 关系节点添加
        2: () => {
          this.$refs.forcediagram.setForce();
        },
        //  添加,删除,编辑 重新获取节点
        3: () => {
          this.$refs.forcediagram.setForce();
          this.$refs.treediagram.setForce();
        },
        // 添加属性 重新获取日志
        4: () => {
          this.$refs.journalog.setJournal();
        },
        // 名称 改变 details 发送数据
        5: () => {
           this.$refs.detailsShow.putServerName(val);
        }
      };
      statusMap[type]();
    }
  },
  watch: {}
};
</script>

<style  scoped>
.know-Showclient {
  height: 100%;
}
.know-Showclient-default {
  padding: 10px;
}
</style>