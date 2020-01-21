/**
*
*  @author ZTiger
*
*/


<template>
  <div class="upload-box upload-box-c" v-if='uploadShowFlag'>
    <div class="upload-box-header dis-fix">
      <div class="upload-box-header-title">选择个人资料照片</div>
      <Tooltip content="关闭">
        <Icon type="md-close" size="16" class="upload-box-header-icon"  @click.stop="clickStatus(2)" />
      </Tooltip>
    </div>
    <div class="upload-box-main">
      <div class="box-main-header">
        <div class="box-main-header-button">上传照片</div>
      </div>
      <div class="box-main-main" @click.stop="clickStatus(1)">
        <Icon type="md-images" size="70" />
        <div class="box-main-main-title">选择您计算机的照片</div>
        <input type="file" class="box-main-main-button" ref="MMButton">
      </div>
      <div class="box-main-floor">
        <Button type="primary" disabled>设置为个人资料照片</Button>
        <Button type="text"  @click.stop="clickStatus(2)">取消</Button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // 上传层 展示 标志位
      uploadShowFlag:false
    };
  },
  methods: {
    // 状态选择函数
    clickStatus(type){
      const statusMap = {
        // 点击打开文件夹
        1: ()=>{
          this.$refs.MMButton.click();
        },
        // 关闭 上传视图
        2:() =>{
          this.uploadShowFlag = false;
        },
        // 打开 展示 标志位
        3: () =>{
          this.uploadShowFlag = true;
        }
      }
      statusMap[type]();
    }
  },
};
</script>


<style scoped>
.upload-box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: calc(70vw * 0.618);
  transition: all 1s;
}
.upload-box-c {
  border: 1px solid #acacac;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 0 4px 16px;
  user-select: none;
  z-index: 900;
}
.upload-box-header {
  padding: 10px 20px;
}
.upload-box-header-title {
  color: #000;
  font-size: 20px;
}
.upload-box-header-icon {
  cursor: pointer;
}
.dis-fix {
  display: flex;
  justify-content: space-between;
}
.upload-box-main {
  overflow: hidden;
  height: calc(100% - 50px);
}
.box-main-header {
  padding: 0 10px;
  box-shadow: 0 3px 5px 1px #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  box-sizing: border-box;
}
.box-main-header-button {
  display: inline-block;
  padding: 13px;
  border-bottom: 2px solid #4d90fe;
  font-weight: bold;
  color: #262626;
}
.box-main-main {
  height: calc(100% - 110px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #aaa;
  cursor: pointer;
}
.box-main-main-title{
  margin: 10px 0 0 0;
  padding: 4px 10px;
  font-size: 14px;
  background-color: #f5f5f5;
  border: 1px solid rgba(0,0,0,0.1);
  color: #444;
}
.box-main-floor{
  padding: 9px 30px;
}
.box-main-floor button{
  margin: 0 20px 0 0;
}
.box-main-main-button{
  display: none;
}
</style>