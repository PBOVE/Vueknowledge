/**
*
*  @author ZTiger
*
*/


<template>
  <div>
    <div v-if='selectStatus === 1'>
      <project-home></project-home> 
    </div>
    <div v-else-if="selectStatus === 2">
      project
    </div>
    <div v-else-if="selectStatus === 3">
      share
    </div>
  </div>
</template>


<script>
import projectHome from './projectHome'

export default {
  components:{projectHome},
  data() {
    return {
      // 状态选中
      selectStatus:1
    };
  },
  methods: {
    // 设置 选中 的状态
    setStatus(val){
      this.selectStatus = val;
    }
  },
};
</script>


<style scoped>
</style>
