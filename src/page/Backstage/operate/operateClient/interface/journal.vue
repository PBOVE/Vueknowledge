/**
*
*  @author ZTiger
*
*/


<template>
  <div class="">23213123</div>
</template>


<script>
export default {
	props:['treeNode'],
  data() {
    return {};
	},
	methods:{

	},
	watch: {
		treeNode: {
      handler: function(val) {
				if(val === ''){
					return;
				}
        window.console.log(val);
      },
      deep: true
    }
  }
};
</script>


<style scoped>
</style>