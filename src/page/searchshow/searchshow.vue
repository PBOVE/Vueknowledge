/**
*
*  @author ZTiger
*
*/

//  {{ $route.params.id}}
//         <div>this.$route.params.id</div>
<template>
  <div class="know-searchshow">
    <public-header :routerTO="routerTO"></public-header>
    <div class="know-searchshow-titlte">名称&nbsp;:&nbsp;{{nodeName}}</div>
    <search-select
      @searchIdCallback="searchIdCallback"
      ref="searchidselect"
      :selectNum="showSelectNum"
    ></search-select>
    <search-content
      :showSelectNum="showSelectNum"
      :InnerHeight="InnerHeight-topHeight"
      :nodeId="nodeId"
      ref="searchcontent"
    ></search-content>
  </div>
</template>

<script>
// 导入头
import publicHeader from "../../components/publicHeader";
import searchSelect from "./searchshowButton";
import searchContent from "./searchContent";
export default {
  components: { publicHeader, searchSelect, searchContent },
  data() {
    return {
      // 节点名称
      nodeName: this.$route.query.name,
      // 选中的按钮
      showSelectNum: "",
      // 选中的节点 id
      nodeId: this.$route.query.id ? parseInt(this.$route.query.id) : "",
      // 获取 innerHeight
      InnerHeight: "",
      // 获取 innerWidth
      InnerWidth: "",
      // 路由跳转地址
      routerTO: "/project",
      //TopHeigh高度
      topHeight: this.$store.state.headerHeight
    };
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
    searchIdCallback(type, val) {
      const statusMap = {
        //点击按钮
        1: () => {
          this.showSelectNum = val;
        },
        //设置数据
        2: () => {
          this.$refs.searchidselect.setselectNum(this.showSelectNum);
        }
      };
      statusMap[type]();
    }
  },
  watch: {
    $route: {
      handler(to) {
        if (!to.query.id && !to.query.name) {
          this.$router.push({ path: "/" });
          return;
        }
        this.nodeName = to.query.name;
        this.nodeId = to.query.id;
        if (to.query.q) {
          this.showSelectNum = parseInt(to.query.q);
        } else {
          this.showSelectNum = 1;
        }
        //  to , from 分别表示从哪跳转到哪，都是一个对象
        // to.path   ( 表示的是要跳转到的路由的地址 eg:  /home );
        // to.query.id 提取id进行http请求数据更新页面
      },
      immediate: true
    }
  }
};
</script>

<style  scoped>
.know-searchshow {
  height: 100vh;

  background-color: #f5f7f9;
}
.know-searchshow-titlte {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  padding: 5px 10px 3px 10px;
  border-bottom: 1px solid #dcdee2;
  background-color: #dcdee2;
  height: 40px;
}
</style>