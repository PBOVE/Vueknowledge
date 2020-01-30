/**
*
*  @author ZTiger
*
*/


<template>
  <div>
    <public-header
      class="know-manage-header"
      :RouterFlag="true"
      :itemName="itemName"
      :TitleShow="false"
    ></public-header>
    <div class="know-manage-split" :style="{height:ClientHeight}">
      <Split v-model="splitinit" :min="splitMin" :max="splitMax">
        <div slot="left" class="know-manage-split-pane">
          <tree-list
            ref="treelist"
            :InnerHeight="InnerHeight - headerHeight"
            :itemId="itemId"
            :itemExitFlag="itemExitFlag"
            @MangageCallback="MangageCallback"
          ></tree-list>
        </div>
        <div slot="right" class="know-manage-split-pane know-manage-split-pane-right">
          <operate-main
            ref="operatemain"
            :InnerHeight="InnerHeight - headerHeight"
            :treeNode="treeNode"
            :itemId="itemId"
            :itemExitFlag="itemExitFlag"
            @MangageCallback="MangageCallback"
          ></operate-main>
        </div>
      </Split>
    </div>
  </div>
</template>


<script>
//导入tree 模板
import treeList from "./treeInterface/treelist";
//导入 header 模板
import publicHeader from "../../components/publicHeader";
// 导入 操作 模板
import operateMain from "./operate/operateMain";
import { mapState } from "vuex";

export default {
  components: { treeList, publicHeader, operateMain },
  data() {
    return {
      // 初始化 面板分割
      splitinit: 0.5,
      // 获取 innerHeight
      InnerHeight: "",
      // 获取 innerWidth
      InnerWidth: "",
      // Split 最小宽度
      splitMin: "300px",
      //Split 最大宽度
      splitMax: "500px",
      //树节点
      treeNode: "",
      // 项目id
      itemId: parseInt(this.$route.params.itemId),
      // 项目名称
      itemName: "",
      // 项目编辑 标志位
      itemExitFlag: false
    };
  },
  created() {},
  computed: {
    ...mapState(["headerHeight", "user",'nickName']),
    ClientHeight() {
      return this.InnerHeight - this.headerHeight + "px";
    }
  },
  watch: {
    InnerWidth(val) {
      if (val < 800) {
        this.splitMax = "40px";
        this.splitinit = 1;
      } else {
        this.splitMax = "500px";
        this.splitinit = (parseInt(this.splitMin) + 50) / this.InnerWidth;
      }
    }
  },
  mounted() {
    this.InnerHeight = window.innerHeight;
    this.InnerWidth = window.innerWidth;
    this.getItem();
    window.addEventListener("resize", this.getInner);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getInner);
  },
  methods: {
    // 获取 浏览器 高度
    getInner() {
      this.InnerHeight = window.innerHeight;
      this.InnerWidth = window.innerWidth;
    },
    // 获取项目
    getItem() {
      const url = "item/" + this.itemId;
      this.get(url)
        .then(res => {
          const data = res.data;
          const user = data.author.userName;
          const usetWeb = this.$route.params.user;
          if (user === usetWeb) {
            this.itemName = data.name;
            if (JSON.parse(this.user).username === user) {
              this.itemExitFlag = true;
              this.$refs.treelist.TLCallback(15);
            } else if (data.share) {
              this.itemExitFlag = false;
              this.$refs.treelist.TLCallback(15);
            }
          } else {
            this.itemName = "错误";
          }
        })
        .catch(() => {});
    },
    // 子组件 调用函数
    MangageCallback(type, val) {
      const statusMap = {
        1: () => {
          this.treeNode = val;
        },
        //名称改变
        2: () => {
          this.$refs.treelist.TLCallback(3, val);
        },
        //  添加,删除,编辑 重新获取节点
        3: () => {
          this.$refs.operatemain.oMainCallback(3, val);
        },
        // 名称 改变 details 发送数据
        4: () => {
          this.$refs.operatemain.oMainCallback(4, val);
        }
      };
      statusMap[type]();
    }
  }
};
</script>


<style >
.know-manage-default {
  background-color: #fff;
}
.know-manage-header {
  min-width: 300px;
  height: 60px;
  padding: 0 55px;
}
.know-manage-split {
  height: 200px;
  border: 1px solid #dcdee2;
  background-color: #f5f7f9;
}
.know-manage-split-pane {
  padding: 0px;
  height: 100%;
}
.know-manage-split-pane-right {
  padding-left: 6px;
}
@media screen and (max-width: 800px) {
  .know-manage-split-pane-right {
    display: none;
  }
  .right-pane.ivu-split-pane {
    display: none;
  }
  .ivu-split-trigger-con {
    display: none;
  }
}
</style>
