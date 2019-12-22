/**
*
*  @author ZTiger
*
*/


<template>
  <div id='froala-editor'>
   <editor id="tinymce" :init="init"></editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件

export default {
  props: ["treeNode", "showSelectNum", "InnerHeight"],
  components:{Editor},
  data() {
    return {
			getDataFlag: false,
      //设置top高
      TopHeight: 120
		};
	},
	methods:{
		//获取服务器数据
		getExitText(){
			if(this.getDataFlag)return;
			this.getDataFlag = true;
      window.console.log(132);
      // es modules
		}
  },
  mounted () {
    tinymce.init({})
  },
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

<style  scoped>
</style>