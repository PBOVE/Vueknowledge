/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-s-c" v-show="searchFocus">
    <div class="know-s-c-m">
      <div class="know-s-c-m-h">
        <div class="know-s-c-m-ht">
          <div class="know-s-c-m-htt">{{ShowSMeg}}</div>
          <div class="know-s-c-m-htt-s">实体</div>
        </div>
        <div class="know-s-c-m-htn" title="总数据量">{{totalElements}}</div>
      </div>
      <div class="know-s-c-m-attr">
        <div class="know-s-c-m-attr-tittle">属性</div>
        <div class="know-s-c-m-attr-d know-s-c-m-attr-c">
          <span v-for="item in LabelData" :key="item" class="know-s-c-m-attr-d-list">
            “
            <span>{{item}}</span>”
          </span>
        </div>
      </div>
    </div>
    <div class="know-s-c-a">sdfasd</div>
  </div>
</template>


<script>
export default {
  props: ["reqShowDataFlag", "InSearchMeg"],
  data() {
    return {
      //用户输入的数据
      ShowSMeg: "",
      // 分页 可以展示的总页数
      totalPages: "",
      // 当前请求的第几页
      pageNum: 0,
      // 一页可以展示的数据有多少
      pageSize: 10,
      // 总的数据有多少
      totalElements: "",
      // 请求的数据
      reqShowData: [],
      // 获取焦点标志位
      searchFocus: false,
      // 请求的数据属性
      LabelData: [],
      // 防止请求的属性重复
      LabelDataFlag: new Set()
    };
  },
  methods: {
    // 请求 服务器数据
    getServerData() {
      let url = "search";
      let obj = {
        q: this.InSearchMeg,
        page: this.pageNum
      };
      this.get(url, obj)
        .then(res => {
          this.handleServerData(res.data);
        })
        .catch(() => {});
    },
    // 处理请求的数据
    handleServerData(data) {
      this.searchFocus = true;
      this.totalElements = data.totalElements;
      this.ShowSMeg = this.InSearchMeg;
      let content = data.content;

      content.forEach(item => {
        window.console.log(item);
        Object.keys(item).forEach(val => {
          let labels = item[val].node.labels;
          this.handleServerLabel(labels);
        });
      });
    },
    // 处理属性 数据
    handleServerLabel(data) {
      // 合并数组
      data.forEach(val => {
        if (!this.LabelDataFlag.has(val)) {
          this.LabelDataFlag.add(val);
          this.LabelData.push(val);
        }
      });
    }
  },
  watch: {
    reqShowDataFlag() {
      this.pageNum = 0;
      this.LabelData = [];
      this.LabelDataFlag.clear();
      this.getServerData();
    }
  }
};
</script>


<style scoped>
.know-s-c {
  height: 100%;
  padding: 10px 50px 10px 50px;
  display: flex;
  overflow: auto;
}
.know-s-c::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.know-s-c::-webkit-scrollbar-thumb {
  background-color: #c5c8ce;
  border-radius: 5px;
}
.know-s-c-m {
  border: 1px solid #dcdee2;
  border-radius: 5px;
  width: 670px;
  padding: 8px;
}
.know-s-c-m-h {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dcdee2;
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
</style>