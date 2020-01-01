/**
*
*  @author ZTiger
*
*/


<template>
  <div class>
    <div class="s-c-m-b">
      <div class="know-s-c-m-h">
        <div class="know-s-c-m-ht">
          <div class="know-s-c-m-htt">{{ShowSMeg}}</div>
          <div class="know-s-c-m-htt-s">实体</div>
        </div>
        <div class="know-s-c-m-htn" title="总数据量">{{totalElements}}</div>
      </div>
      <div class="know-s-c-m-attr" v-show="(handleShowData.LabelData.length)>0">
        <div class="know-s-c-m-attr-tittle">属性</div>
        <folding-panel :InitHeight='foldingPanelFlag'>
            <span
              v-for="item in handleShowData.LabelData"
              :key="item"
              class="know-s-c-m-attr-d-list"
            >
              “
              <span>{{item}}</span>”
            </span>
        </folding-panel>
      </div>
    </div>
    <div class="know-s-c-m-c">
      <div v-for="(item) in reqShowData" :key="item.node.id" class="know-s-c-m-c-f">
        <router-link :to="{path:'/search', query: {id:item.node.id,name:item.node.name}}">
          <div class="s-c-m-c-title" v-html="item.nodeName"></div>
        </router-link>
        <div class="s-c-m-c-text" v-html="item.text?item.text+'...':'没有此节点信息。'"></div>
      </div>
    </div>
    <div
      class="know-s-c-m-footer"
      @click="getServerPage"
      v-show="loadFlag"
      :class="{'know-s-c-m-footer-load':loadMsg === '数据加载'}"
    >
      <div class="know-s-c-m-footer-title">{{loadMsg}}</div>
    </div>
  </div>
</template>

<script>
import foldingPanel from "../../../components/foldingPanel";
export default {
  components: { foldingPanel },
  props: [
    "ShowSMeg",
    "totalElements",
    "handleShowData",
    "reqShowData",
    "pageNum",
    "totalPages",
    "reqSuccessFlag"
  ],
  data() {
    return {
      //显示加载信息
      loadMsg: "加载更多",
      //显示加载标志位
      loadFlag: true,
      // 搜索结果发生变化 重新渲染 foldingPanel
      foldingPanelFlag:''
    };
  },
  methods: {
    // 点击加载数据请求分页
    getServerPage() {
      if (this.loadMsg !== "数据加载") {
        this.loadMsg = "数据加载";
        this.$emit("contentCallback", 1);
      }
    },
    // 点击获取节点信息
    getNodeInmes(index) {
      this.$emit("contentCallback", 2, index);
    }
  },
  watch: {
    reqSuccessFlag() {
      this.loadMsg = "加载更多";
      
      this.foldingPanelFlag = Math.random();
      // window.console.log(this.foldingPanelFlag);
      // window.console.log(this.reqShowData);
      if (this.pageNum + 1 === this.totalPages || this.totalPages === 0) {
        this.loadFlag = false;
      } else {
        this.loadFlag = true;
      }
    }
  }
};
</script>

<style >
.s-c-m-c-t-u {
  color: #2d8cf0;
}
.know-s-c-m-c-user {
  display: inline;
  color: #808695;
  font-size: 12px;
  margin-left: 20px;
}
</style>
<style  scoped>
.s-c-m-b {
  border: 1px solid #dcdee2;
  border-radius: 5px;
  padding: 8px;
}
.know-s-c-m-h {
  width: 100%;
  display: flex;
  align-items: center;
}
.know-s-c-m-ht {
  padding: 0px 0 5px 10px;
  flex: 1;
}
.know-s-c-m-htt {
  font-size: 18px;
  color: #17233d;
}
.know-s-c-m-htt-s {
  margin-top: 3px;
  font-size: 12px;
  color: #808695;
}
.know-s-c-m-htn {
  border: 2px solid #19be6b;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 25px;
  border-radius: 15px;
  cursor: Default;
  user-select: none;
}
.know-s-c-m-attr {
  border-top: 1px solid #dcdee2;
}
.know-s-c-m-attr-tittle {
  padding: 5px 0 5px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #14181c;
}
.know-s-c-m-attr-d-list {
  display: inline-block;
  font-size: 14px;

  margin: 5px 5px 2px 3px;
  cursor: default;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.know-s-c-m-attr-d-list span {
  display: inline-block;
  border-bottom: 1.2px solid #28a745;
  padding: 0 5px 2px 5px;
}
.know-s-c-m-attr-footr {
  text-align: center;
}

.know-s-c-m-attr-footr-icon {
  font-size: 16px;
  color: #808695;
  cursor: pointer;
}
.know-s-c-m-c {
  padding: 10px;
}
.s-c-m-c-title {
  display: inline;
  font-size: 18px;
  color: #14181c;
  cursor: pointer;
}

.s-c-m-c-text {
  margin-top: 8px;
  /* text-indent: 2em; */
}
.know-s-c-m-c-f:first-of-type {
  margin-top: 10px;
}
.know-s-c-m-c-f {
  margin-top: 25px;
}

.know-s-c-m-footer {
  background-color: #e8eaec;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 3px;
}
.know-s-c-m-footer:active {
  background-color: #f8f8f9;
}
.know-s-c-m-footer-load {
  background-color: #f8f8f9;
}
.know-s-c-m-footer-load .know-s-c-m-footer-title {
  color: #e8eaec;
}
.know-s-c-m-footer-title {
  text-align: center;
  font-size: 15px;
}
</style>
