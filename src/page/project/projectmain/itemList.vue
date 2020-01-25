/**
*
*  @author ZTiger
*
*/


<template>
  <div>
    <div class="item-box box">
      <div class="dis-fix item-box-f">
        <Tooltip
          max-width="280"
          placement="top"
          content="知识图谱（Knowledge Graph），在图书情报界称为知识域可视化或知识领域映射地图，是显示知识发展进程与结构关系的一系列各种不同的图形，用可视化技术描述知识资源及其载体，挖掘、分析、构建、绘制和显示知识及它们之间的相互联系"
        >
          <div class="item-box-name">知识图谱</div>
        </Tooltip>
        <Tooltip content="打开项目设置" placement="top">
          <Icon type="ios-settings" class="item-box-icon" />
        </Tooltip>
      </div>
      <div class="item-box-title">知识图谱（Knowledge Graph），在图书情报界称为知识域可视化或知识领域映射地图....</div>
    </div>

    <div class="item-box box">
      <div class="dis-fix item-box-f">
        <Tooltip
          max-width="280"
          placement="top"
          content="本书从初学者的角度出发，紧密结合Java项目开发过程中的技术要求，通过丰富的代码示例、清晰的讲解图例、大量的编程练习详细介绍了Java开发的实用基础知识，旨在培养学生的实际动手能力和学习自主性。"
        >
          <div class="item-box-name">Java 程序设计</div>
        </Tooltip>
        <Tooltip content="打开项目设置" placement="top">
          <Icon type="ios-settings" class="item-box-icon" />
        </Tooltip>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  }
};
</script>


<style scoped>
.box {
  width: 240px;
  height: 120px;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
}
.item-box {
  background: url("../../../assets/images/itembg.jpg");
  background-size: 100% 100%;
  margin: 0 20px 0 0;
  padding: 5px 10px;
  transition: all 0.2s;
}
.item-box:hover{
  box-shadow: 0 6px 12px rgba(38,38,38,0.1);
  transform: translateY(-4px);
}
.item-box-f {
  align-items: center;
}
.item-box-name {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}
.item-box-icon {
  color: #fff;
  font-size: 16px;
}
.item-box-title {
  color: #fff;
  font-size: 13px;
  overflow: hidden;
}
</style>