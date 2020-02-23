/**
*
*  @author ZTiger
*
*/

<template>
  <div class="g-node-show">
    <search-header  />
    <div class="g-content" :style="{'height':clientHeight}">
      <div class="g-node-show-titlte">
        <span>{{nodeName}}</span>
      </div>
      <node-select
        @searchIdCallback="searchIdCallback"
        ref="searchidselect"
        :selectNum="showSelectNum"
      ></node-select>
      <node-content
        :showSelectNum="showSelectNum"
        :InnerHeight="InnerHeight - topHeight"
        :nodeId="nodeId"
        ref="searchcontent"
      ></node-content>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// 导入头
import searchHeader from '@/components/searchHeader.vue';
import nodeSelect from './nodeshowButton.vue';
import nodeContent from './nodeContent.vue';
export default {
  components: { searchHeader, nodeSelect, nodeContent },
  data() {
    return {
      // 节点名称
      nodeName: this.$route.query.name,
      // 选中的按钮
      showSelectNum: '',
      // 选中的节点 id
      nodeId: '',
      // 获取 innerHeight
      InnerHeight: '',
      // 获取 innerWidth
      InnerWidth: '',
      // 路由跳转地址
      routerTO: '/project',
      //TopHeigh高度
    };
  },
  computed: {
    ...mapGetters({
      topHeight: 'getTopHeigt',
    }),
    clientHeight() {
      return `${this.InnerHeight - this.topHeight}px`;
    },
  },
  watch: {
    $route: {
      handler(to) {
        this.nodeName = to.params.name;
        this.nodeId = to.params.id;
        this.setTitleLabel(this.nodeName);
        if (to.query.q) {
          this.showSelectNum = parseInt(to.query.q);
        } else {
          this.showSelectNum = 1;
        }
        //  to , from 分别表示从哪跳转到哪，都是一个对象
        // to.path   ( 表示的是要跳转到的路由的地址 eg:  /home );
        // to.query.id 提取id进行http请求数据更新页面
      },
      immediate: true,
    },
  },
  mounted() {
    this.InnerHeight = window.innerHeight;
    this.InnerWidth = window.innerWidth;
    window.addEventListener('resize', this.getInner);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getInner);
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
        },
      };
      statusMap[type]();
    },
    // 设置title标签
    setTitleLabel(title) {
      document.title = `${title} ● Knowledge Graph`;
    },
  },
};
</script>

<style  scoped>
.g-content {
  background-color: #f0f2f5;
}
.g-node-show {
  overflow: hidden;
}
.g-node-show-titlte {
  overflow: hidden;
  padding: 0px 10px;
  margin: 0 10px;
  height: 40px;
  font-weight: bold;
  font-size: 18px;
  line-height: 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.g-tip-icon {
  margin: 0 10px;
}
.g-router-a {
  color: #515a6e;
}
</style>