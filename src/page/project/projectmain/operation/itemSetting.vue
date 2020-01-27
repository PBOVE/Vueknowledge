/**
*
*  @author ZTiger
*
*/


<template>
  <Modal v-model="ModalFalg" width="600">
    <p slot="header" class="header center">
      <span>项目设置</span>
    </p>
    <div class="item-modal-main scroll">
      <div class="item-modal-title">项目封面</div>
      <div class="item-modal-cover">
        <div class="item-modal-upload item-upload-default"></div>
        <Button class="modal-cover-button">上传新的封面</Button>
      </div>

      <div class="item-modal-title">项目名称</div>
      <Input placeholder="项目名称" ref="NameI" v-model="submitMsg.name" @on-change="changeEvent" maxlength="20" />
      <div class="item-modal-title">项目描述</div>
      <Input
        class="textarea-i"
        type="textarea"
        placeholder="项目描述"
        v-model="submitMsg.description"
        :autosize="{minRows: 2,maxRows: 6}"
        maxlength="3000"
        show-word-limit
        @on-change="changeEvent"
      />
      <div class="item-modal-title">项目公开性</div>
      <Select v-model="submitMsg.share" @on-change="changeEvent">
        <Option v-for="item in shareList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <div class="item-modal-title">项目创建时间</div>
      <div>{{TimeConversion(submitMsg.createTime)}}</div>
      <div class="item-modal-title">项目修改时间</div>
      <div>{{TimeConversion(submitMsg.updateTime)}}</div>
    </div>
    <div slot="footer" class="item-modal-footer">
      <Button type="text" @click="ModalFalg = false">取消</Button>
      <Button type="primary" @click="keepSetting" :disabled="allowFlag">保存</Button>
    </div>
  </Modal>
</template>


<script>
export default {
  data() {
    return {
      // 模态框展示标志位
      ModalFalg: false,
      // 允许发送标志位
      allowFlag: true,
      shareList: [
        {
          value: "false",
          label: "私有项目 (仅项目成员可查看和编辑)"
        },
        {
          value: "true",
          label: "公开项目 (所有成员可见，仅项目成员可编辑)"
        }
      ],
      // 向服务器上传信息
      submitMsg: {
        share: "",
        name: "",
        description: "",
        updateTime: "",
        createTime: "",
        id: ""
      },
      // 检测数据是否一样
      oldMsg: {
        share: "",
        name: "",
        description: ""
      }
    };
  },
  methods: {
    // chang 事件触发的函数
    changeEvent() {
      let flag = true;
      if (this.submitMsg.name !== this.oldMsg.name) {
        flag = false;
      }
      if (this.submitMsg.share !== this.oldMsg.share) {
        flag = false;
      }
      if (this.submitMsg.description !== this.oldMsg.description) {
        flag = false;
      }
      this.allowFlag = flag;
    },
    // 时间转换函数
    TimeConversion(time) {
      const date = new Date(time);
      const completion = num => {
        return num.toString().padStart(2, "0");
      };
      return (
        date.getFullYear() +
        " 年 " +
        completion(date.getMonth() + 1) +
        " 月 " +
        completion(date.getDate()) +
        " 日 "
      );
    },
    // 展示 设置modal
    showView(val) {
      this.ModalFalg = true;
      this.submitMsg = {
        name: val.name,
        share: val.share ? "true" : "false",
        description: val.description,
        createTime: val.createTime,
        updateTime: val.updateTime,
        id: val.id
      };
      this.oldMsg = {
        name: val.name,
        share: val.share ? "true" : "false",
        description: val.description
      };
    },
    // 保存设置 并向服务器发送数据
    keepSetting() {
      const url = "item/" + this.submitMsg.id;
      const obj = {
        share: this.submitMsg.share === "true" ? true : false,
        name: this.submitMsg.name,
        description: this.submitMsg.description
      };
      this.put_json(url, obj)
        .then(res => {
          this.$Message.success("保存成功");
          this.ModalFalg = false;
          this.$emit("updataItem", res.data);
        })
        .catch(() => {});
    }
  }
};
</script>


<style scoped>
.header {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.1em;
}
.item-modal-title:first-of-type {
  margin: 0px 0 5px;
}
.item-modal-title {
  margin: 20px 0 5px;
  font-weight: 600;
  letter-spacing: 0.1em;
}
.main-img {
  width: 100px;
  height: 100px;
  user-select: none;
}

.ivu-radio-default {
  margin-right: 20px;
}
.item-modal-footer button {
  margin-left: 20px;
}
.item-modal-footer button:last-of-type {
  width: 88px;
}
.item-modal-cover {
  display: flex;
}
.modal-cover-button {
  margin: 0 0 0 30px;
}
.item-modal-upload {
  width: 240px;
  height: 120px;
  border-radius: 8px;
}
.item-upload-default {
  background: url("../../../../assets/images/itembg.jpg");
  background-size: 100% 100%;
}
.item-modal-main {
  max-height: calc(100vh - 308px);
  overflow: auto;
}
</style>
