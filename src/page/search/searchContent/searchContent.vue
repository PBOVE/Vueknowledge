/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-s-c scroll" v-show="searchFocus">
    <div class="know-s-c-m">
      <content-mheader
        :reqSuccessFlag='reqSuccessFlag'
        :ShowSMeg="ShowSMeg"
        :totalElements="totalElements"
        :handleShowData="handleShowData"
        :reqShowData="reqShowData"
        :totalPages ='totalPages'
        :pageNum ='pageNum'
        @contentCallback = 'contentCallback'
      ></content-mheader>
    </div>
    <div class="know-s-c-a">
    </div>
  </div>
</template>


<script>
import contentMheader from "./contentMheader";
export default {
  props: ["reqShowDataFlag", "InSearchMeg",'InnerHeight'],
  components: { contentMheader },
  data() {
    return {
      //用户输入的数据
      ShowSMeg: "",
      //纪录用户输入的数据防止重复提交
      InOldSearchMeg:'',
      // 分页 可以展示的总页数
      totalPages: "",
      // 当前请求的第几页
      pageNum: 0,
      // 一页可以展示的数据有多少
      pageSize: 8,
      // 总的数据有多少
      totalElements: "",
      // 请求的数据
      reqShowData: [],
      // 获取焦点标志位
      searchFocus: false,
      // 处理过的请求数据
      handleShowData: {
        // 属性
        LabelData: []
      },
      // 防止请求的属性重复
      LabelDataFlag: new Set(),
      // 数据加载成功标志为
      reqSuccessFlag:''
    };
  },
  methods: {
    // 请求 服务器数据
    getServerData() {
      this.InOldSearchMeg = this.InSearchMeg;
      let url = "search";
      let obj = {
        size:this.pageSize,
        q: this.InSearchMeg,
        page: this.pageNum
      };
      this.get(url, obj)
        .then(res => {
          this.handleServerData(res.data);
          this.reqSuccessFlag  = Math.random();
        })
        .catch(() => {
     
        });
    },
    // 处理请求的数据
    handleServerData(data) {
      this.searchFocus = true;
      this.totalElements = data.totalElements;
      this.ShowSMeg = this.InSearchMeg;
      this.totalPages =  data.totalPages
      let content = data.content;
      let reg = new RegExp(this.ShowSMeg, "gi");
      content.forEach(item => {
        this.reqShowData.push({
          info: item.info,
          node: item.node,
          text:  this.html2Escape(item.text).replace(
            reg,
            '<span class="s-c-m-c-t-u">' + this.ShowSMeg + "</span>"
          ),
          user: item.user,
          nodeName: this.html2Escape(item.node.name).replace(
            reg,
            '<span class="s-c-m-c-t-u">' + this.ShowSMeg + "</span>"
          )+'<div class="know-s-c-m-c-user">编辑者: <span class="know-s-c-m-c-username">'+item.user+'</span></div>'
        });
        this.handleServerLabel(item.node.labels);
      });
    },
    // 处理属性 数据
    handleServerLabel(data) {
      // 合并数组
      data.forEach(val => {
        if (!this.LabelDataFlag.has(val)) {
          this.LabelDataFlag.add(val);
          this.handleShowData.LabelData.push(val);
        }
      });
    },
    //HTML标签转义（< -> &lt;）
    html2Escape(sHtml) {
      return sHtml.replace(/[<>&"]/g, c => {
        return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c];
      });
    },
    //content 回调函数
    contentCallback(type,val){
      const statusMap ={
        1: ()=>{
          this.pageNum++;
          this.getServerData();
        },
        2:()=>{
          this.$refs.contentaside.CAsideCallback(1,val)
        }
      }
      statusMap[type]();
    }
  },
  watch: {
    reqShowDataFlag() {
      this.pageNum = 0;
      this.handleShowData = {
        LabelData: []
      };
      this.reqShowData = [];
      this.LabelDataFlag.clear();
      this.getServerData();
    }
  }
};
</script>


<style scoped>
.know-s-c {
  height: 100%;
  padding: 10px 10px 10px 50px;
  display: flex;
  overflow: auto;
}
.know-s-c-m {
  width: 670px;
}
.know-s-c-a{
  flex:1;
  padding: 10px;
}
</style>