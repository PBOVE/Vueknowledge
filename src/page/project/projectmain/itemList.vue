/**
*
*  @author ZTiger
*
*/


<template>
  <div>
    <div class="item-box box" v-for="(item,index) in itemData" :key="item.id">
      <div class="dis-fix item-box-f">
        <Tooltip max-width="280" placement="top" :content="item.description.length?item.description:item.name">
          <div class="item-box-name">{{item.name}}</div>
        </Tooltip>
        <Tooltip content="打开项目设置" placement="top">
          <Icon type="ios-settings" class="item-box-icon" @click.stop="selectItemSetting(index)" />
        </Tooltip>
      </div>
      <!-- <div
        class="item-box-title"
      >{{item.description.length>60?item.description.substr(0,60)+'...':item.description}}</div> -->
    </div>
  </div>
</template>


<script>

export default {
  components:{},
  props: ["itemData"],
  data() {
    return {
      modalFlag:false
    };
  },
  watch: {
    
  },
  methods: {
    // 选中 项目设置
    selectItemSetting(val){
      this.$emit('selectItem',this.itemData[val]);
    }
  },
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
  margin: 0 20px 20px 0;
  padding: 5px 10px;
  transition: all 0.2s;
  color: #fff;
}
.item-box:hover {
  box-shadow: 0 6px 12px rgba(38, 38, 38, 0.1);
  transform: translateY(-4px);
}
.item-box-f {
  align-items: center;
}
.item-box-name {
  font-size: 16px;
  font-weight: 600;
}
.item-box-icon {
  font-size: 20px;
}
.item-box-title {
  font-size: 13px;
  overflow: hidden;
}
</style>