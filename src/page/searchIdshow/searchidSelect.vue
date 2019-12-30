/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-searchid-select">
    <div
      class="know-searchid-Button"
      :class="{'know-searchid-Button-select':selectNum === 1}"
      @click="clickButton(1,selectNum)"
    >
      <i class="icon-lidaotu iconfont know-searchid-Button-icon"></i>
      <div class="know-searchid-Button-titlt">力导图</div>
    </div>
    <div
      class="know-searchid-Button"
      :class="{'know-searchid-Button-select':selectNum === 2}"
      @click="clickButton(2,selectNum)"
    >
      <i class="icon-shutu iconfont know-searchid-Button-icon"></i>
      <div class="know-searchid-Button-titlt">树图</div>
    </div>
    <div
      class="know-searchid-Button"
      :class="{'know-searchid-Button-select':selectNum === 3}"
      @click="clickButton(3,selectNum)"
    >
      <Icon type="ios-paper-outline " size="20" class="know-searchid-Button-icon" />
      <div class="know-searchid-Button-titlt">富文本</div>
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
.know-searchid-select {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.know-searchid-Button {
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 0 10px;
  cursor: pointer;
}
.know-searchid-Button-titlt {
  display: inline;
  font-size: 16px;
  padding-left: 5px;
}
.know-searchid-Button:hover .know-searchid-Button-icon {
  color: #2d8cf0;
}
.know-searchid-Button-select {
  color: #2d8cf0;
}
</style>