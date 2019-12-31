/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-searchshow-select">
    <div
      class="know-searchshow-Button"
      :class="{'know-searchshow-Button-select':selectNum === 1}"
      @click="clickButton(1,selectNum)"
    >
      <i class="icon-lidaotu iconfont know-searchshow-Button-icon"></i>
      <div class="know-searchshow-Button-titlt">力导图</div>
    </div>
    <div
      class="know-searchshow-Button"
      :class="{'know-searchshow-Button-select':selectNum === 2}"
      @click="clickButton(2,selectNum)"
    >
      <i class="icon-shutu iconfont know-searchshow-Button-icon"></i>
      <div class="know-searchshow-Button-titlt">树图</div>
    </div>
    <div
      class="know-searchshow-Button"
      :class="{'know-searchshow-Button-select':selectNum === 3}"
      @click="clickButton(3,selectNum)"
    >
      <Icon type="ios-paper-outline " size="20" class="know-searchshow-Button-icon" />
      <div class="know-searchshow-Button-titlt">节点知识</div>
    </div>
  </div>
</template>


<script>
import "../../assets/css/font.css";
export default {
  props: [""],
  data() {
    return {
      // 选中的视图
			selectNum:parseInt(this.$route.query.q)||1,
    };
  },
  methods: {
    // 按钮点击事件
    clickButton(newval, oldval) {
      
      if (newval === oldval) return;
      this.selectNum = newval;
      this.$emit("searchIdCallback", 1, newval);
    },
    //设置按键颜色
    setselectNum(val){
      this.selectNum = val;
    }
  }
};
</script>


<style scoped>
.know-searchshow-select {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.know-searchshow-Button {
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 0 10px;
  cursor: pointer;
}
.know-searchshow-Button-titlt {
  display: inline;
  font-size: 16px;
  padding-left: 5px;
}
.know-searchshow-Button:hover .know-searchshow-Button-icon {
  color: #2d8cf0;
}
.know-searchshow-Button-select {
  color: #2d8cf0;
}
</style>