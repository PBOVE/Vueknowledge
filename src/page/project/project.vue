/**
*
*  @author ZTiger
*
*/


<template>
  <div class="project">
    <public-header :RouterFlag="true"></public-header>
    <div class="project-content" :style="{height:ClientHeight}">
      <project-aside class="project-aside" @Callback='Callback'></project-aside>
      <project-main class="project-main" ref="projectMain"></project-main>
    </div>
  </div>
</template>


<script>
//导入 header 模板
import publicHeader from "../../components/publicHeader";
import projectAside from "./projectaside/projectAside";
import projectMain from './projectmain/projectMain'
import { mapState } from "vuex";

export default {
  components: { publicHeader, projectAside, projectMain},
  data() {
    return {
      InnerHeight: "",
      InnerWidth: ""
    };
  },
  computed: {
    ...mapState(["headerHeight"]),
    // 可视区高度
    ClientHeight() {
      return this.InnerHeight - this.headerHeight + "px";
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
    },
    // 回调函数 
    Callback(type,val){
      const statusMap = {
        1 :() =>{
          this.$refs.projectMain.setStatus(val);
        }
      }
      statusMap[type]();
    }
  }
};
</script>


<style scoped>
.project-content {
  display: flex;
  padding: 30px;
}
.project-aside {
  width: 280px;
  margin: 0 40px 0 0;
}
.project-main {
  flex-grow: 1;
}
</style>
