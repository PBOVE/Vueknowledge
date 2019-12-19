/**
*
*  @author ZTiger
*
*/


<template>
  <div class>
    <Tooltip content="详情">
      <div class="know-operate-header-button"
        @click="clickButton(1,selectNum)"
        :class="{'know-operate-header-button-select':selectNum === 1}">
        <Icon type="ios-book-outline" size="25" />
      </div>
    </Tooltip>
    <Tooltip content="力导图">
      <div class="know-operate-header-button"
        @click="clickButton(2,selectNum)"
        :class="{'know-operate-header-button-select':selectNum === 2}">
        <Icon type="ios-git-pull-request" size="25" />
      </div>
    </Tooltip>
    <Tooltip content="树图">
      <div class="know-operate-header-button"
        @click="clickButton(3,selectNum)"
        :class="{'know-operate-header-button-select':selectNum === 3}">
        <Icon type="ios-git-branch" size="25" />
      </div>
    </Tooltip>
    <Tooltip content="日志">
      <div class="know-operate-header-button"
        @click="clickButton(4,selectNum)" 
        :class="{'know-operate-header-button-select':selectNum === 4}">
        <Icon type="ios-time-outline" size="25" />
      </div>
    </Tooltip>
    <Tooltip content="富文本">
      <div class="know-operate-header-button"
      @click="clickButton(5,selectNum)"
      :class="{'know-operate-header-button-select':selectNum === 5}">
        <Icon type="ios-create-outline" size="25" />
      </div>
    </Tooltip>
  </div>
</template>

<script>
export default {
  props:['showClientFlag'],
  data() {
    return {
      selectNum:0
    };
  },
  methods:{
    // 按钮点击事件
    clickButton(newval,oldval){
      if(newval === oldval||!this.showClientFlag)
        return;
      this.selectNum = newval;
      this.$emit('oMainCallback',1,newval);
    },
    // 设置按钮 数值
    setSelectNum(val){
      this.selectNum = val;
    }
  },
  watch:{
    showClientFlag(val){
      if(!val){
        this.selectNum = 0;
      }
    }
  }
};
</script>

<style  scoped>
.know-operate-header-button {
  width: 50px;
  height: 30px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 5px;
  line-height: 30px;
  font-size: 20px;
  color: #505050;
  margin: 0 15px;
  cursor: pointer;
}
.know-operate-header-button:hover .ivu-icon {
  font-weight: bold;
}
.know-operate-header-button:hover {
  background-color: #e0e0e0;
  color: #2d8cf0;
  transition: all 0.5s;
}
.know-operate-header-button-select{
  color: #2d8cf0;
}
.know-operate-header-button-select .ivu-icon {
  font-weight: bold;
}
</style>