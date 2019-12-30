/**
*
*  @author ZTiger
*
*/

//  {{ $route.params.id}}
//         <div>this.$route.params.id</div>
<template>
  <div class="know-searchid">
    <public-header></public-header>
    <div class="know-searchid-titlte">名称&nbsp;:&nbsp;{{nodeName}}</div>
    <searchid-select @searchIdCallback="searchIdCallback"></searchid-select>
    <search-content :showSelectNum="showSelectNum" :InnerHeight='InnerHeight'></search-content>
  </div>
</template>

<script>
// 导入头
import publicHeader from "../../components/publicHeader";
import searchidSelect from "./searchidSelect";
import searchContent from "./searchContent";
export default {
  components: { publicHeader, searchidSelect, searchContent },
  data() {
    return {
      // 节点名称
      nodeName: "d",
      // 选中的按钮
      showSelectNum: 1,
      // 获取 innerHeight
      InnerHeight: "",
      // 获取 innerWidth
      InnerWidth: ""
    };
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
        }
      };
      statusMap[type]();
    }
  },

  mounted() {
    this.InnerHeight = window.innerHeight;
    this.InnerWidth = window.innerWidth;
    window.addEventListener("resize", this.getInner);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getInner);
  }
};
</script>

<style  scoped>
.know-searchid {
  height: 100vh;

  background-color: #f5f7f9;
}
.know-searchid-titlte {
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