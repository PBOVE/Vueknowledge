/**
*
*  @author ZTiger
*
*/


<template>
  <force-chart
    :style="{height:SetHeight}"
    :RightWeight="RightWeight"
    ref="forcechart"
    @callback="forceCallback"
  ></force-chart>
</template>


<script>
import forceChart from "../../../components/forceChart";
export default {
  components: { forceChart },
  props: ["showSelectNum", "InnerHeight",'nodeId'],
  data() {
    return {
      // 获取数据 标志位
      getDataFlag: false,
      //设置top高
      TopHeight: 120,
      //设置right宽度
      RightWeight: 0
    };
  },
  methods: {
    // 获取 服务器 数据
    getforceData() {
      if (this.getDataFlag || !this.nodeId) return;
      this.getDataFlag = true;
      
      let url = "node/" + this.nodeId + "/graph";
      this.get(url)
        .then(res => {
          if (this.showSelectNum === 1) {
            this.$refs.forcechart.handlecomponentsforceData(res.data);
          }
        })
        .catch(() => {});
    },
    forceCallback(d) {
      if(d.Tid === this.nodeId)
        return;
      this.$router.push({
        path:'/search',
        query:{
          name:d.name,
          id:d.Tid,
          q:3
        }
      })
 
    }
  },
  watch: {
    showSelectNum: {
      handler(val) {  
        if (val !== 1) return;
        this.getforceData();
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    },
    nodeId(){
      this.getDataFlag =false;
      if(this.showSelectNum===1){
        this.getforceData();
      }
    }
  },
  computed: {
    //设置  可视区 高度
    SetHeight() {
      return this.InnerHeight - this.TopHeight + "px";
    }
  }
};
</script>


<style scoped>
</style>