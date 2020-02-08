/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-searchshow-text" ref="eixtText"></div>
</template>


<script>
export default {
  props: ["showSelectNum", "nodeId"],
  data() {
    return {
      // 获取数据 标志位
      getDataFlag: false
    };
  },
  methods: {
    // 获取 服务器 数据
    getforceData() {
      if (this.getDataFlag || !this.nodeId) return;
      this.getDataFlag = true;
      let url = "storage/text/" + this.nodeId;
      this.get(url)
        .then(res => {
          if (this.showSelectNum === 3) {
            this.handlerTextData(res.data);
          }
        })
        .catch(() => {});
    },
    //处理富文本数据
    handlerTextData(data) {
      if (data) {
        this.$refs.eixtText.innerHTML = data;
      } else {
        this.$refs.eixtText.innerHTML = "作者没有再此节点编辑任何信息。";
      }
    }
  },
  watch: {
    showSelectNum: {
      handler(val) {
        if (val !== 3) return;
        this.getforceData();
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    },
    nodeId() {
      this.getDataFlag = false;
      if (this.showSelectNum === 3) {
        this.getforceData();
      }
    }
  }
};
</script>


<style scoped>
</style>