/**
*
*  @author ZTiger
*
*/


<template>
  <Modal v-model="delmodal" width="260"  :styles="{top: '200px'}" >
    <p slot="header" style="color:#f60;text-align:center">
      <span>删除 {{ItemName}} 项目</span>
    </p>
    <div style="text-align:center;">
      <p>您确定要删除此项目吗?</p>
    </div>
    <div slot="footer">
      <Button type="text" @click="delmodal = false">取消</Button>
      <Button type="error" @click="delItem">删除</Button>
    </div>
  </Modal>
</template>


<script>
export default {
  data() {
    return {
      // 删除模态框标志位
      delmodal: false,
      // 项目名称
      ItemName:'',
      // 项目 id
      ItemId:''
    };
  },
  methods: {
    showView(val){
      this.delmodal = true;
      this.ItemName = val.name;
      this.ItemId = val.id
    },
    // 删除项目
    delItem() {
      const url = "item/" + this.ItemId;
      this.delete_string(url)
        .then(() => {
          this.$Message.success("删除成功");
          this.delmodal = false;
          this.$emit("delItem");
        })
        .catch(() => {});
    }
  },
};
</script>


<style scoped>
</style>