/**
*
*  @author ZTiger
*
*/


<template>
  <div class>
		<div v-show="showSelectNum === 1">
			<details-show></details-show>
		</div>
		<div v-show="showSelectNum === 2">2</div>
		<div v-show="showSelectNum === 3">3</div>
		<div v-show="showSelectNum === 4">4</div>
		<div v-show="showSelectNum === 5">5</div>
	</div>
</template>

<script>
//导入详情界面
import detailsShow from './interface/details'
export default {
	props:['treeNode','showSelectNum'],
	components:{detailsShow},
  data() {
    return {};
	},
	methods:{
		// 获取 服务器 节点属性 节点关系
		getAttriBute(Id){
			let url =  'node/' + Id
			this.get(url).then(res=>{
				window.console.log(res);
			})
		}
	},
  watch: {
    treeNode: {
      handler: function(val) {
				if(val === ''){
					return;
				}
				window.console.log(val);
				// this.getAttriBute(val.id);
      },
      deep: true
    }
  }
};
</script>

<style  scoped>
</style>