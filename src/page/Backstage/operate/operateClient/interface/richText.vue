/**
*
*  @author ZTiger
*
*/


<template>
  <div id="froala-editor"></div>
</template>

<script>
import FroalaEditor from "froala-editor";
require("froala-editor/js/languages/zh_cn");
require("froala-editor/css/froala_editor.pkgd.min.css");
import 'froala-editor/js/plugins/align.min.js'

export default {
  props: ["treeNode", "showSelectNum", "InnerHeight"],
  data() {
    return {
      getDataFlag: false,
      //设置top高
      TopHeight: 190
    };
  },
  methods: {
    //获取服务器数据
    getExitText() {
      if (this.getDataFlag) return;
      this.getDataFlag = true;
      new FroalaEditor("#froala-editor", {
        height: this.InnerHeight - this.TopHeight,
        language: "zh_cn",
        toolbarButtons:[['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'], ['fontFamily', 'fontSize', 'textColor', 'backgroundColor'], ['inlineClass', 'inlineStyle', 'clearFormatting']]
      });
    }
  },
  mounted() {},
  watch: {
    treeNode: {
      handler: function(newval, oldval) {
        if (newval === "" || newval.id === oldval.id) return;
        this.getDataFlag = false;
        if (this.showSelectNum === 5) {
          this.getExitText();
        }
      },
      deep: true
    },
    showSelectNum(val) {
      if (val !== 5) return;
      this.getExitText();
    }
  }
};
</script>

<style>
.fr-box.fr-basic .fr-element {
  padding: 10px;
  min-height: 0 !important;
}
.fr-box.fr-basic.fr-top .fr-wrapper {
  box-sizing: border-box;
}
.fr-box.fr-basic.fr-top .fr-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.fr-box.fr-basic.fr-top .fr-wrapper::-webkit-scrollbar-thumb {
  background-color: #c5c8ce;
  border-radius: 5px;
}
</style>