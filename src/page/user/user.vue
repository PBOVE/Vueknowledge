/**
*
*  @author ZTiger
*
*/


<template>
  <div class="user-wrap">
    <public-header :RouterFlag='true'></public-header>
    <user-main :style="{height:ClientHeight}"></user-main>
  </div>
</template>


<script>
// 导入头
import publicHeader from "../../components/publicHeader";
// 导入内容
import userMain from "./userMain/userMain";
export default {
  components: { publicHeader, userMain },
  data() {
    return {
      //TopHeigh高度
      topHeight: this.$store.state.headerHeight,
      // 获取 innerHeight
      InnerHeight: "",
      // 获取 innerWidth
      InnerWidth: ""
    };
  },
  computed: {
    // 可视区高度
    ClientHeight(){
      return this.InnerHeight - this.topHeight + 'px';
    }
  },
  mounted() {
    this.InnerHeight = window.innerHeight;
    this.InnerWidth = window.innerWidth;
    window.addEventListener("resize", this.getInner);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getInner);
  },
  methods: {
    //获取 浏览器 高度
    getInner() {
      this.InnerHeight = window.innerHeight;
      this.InnerWidth = window.innerWidth;
    }
  },
};
</script>


<style scoped>
</style>
