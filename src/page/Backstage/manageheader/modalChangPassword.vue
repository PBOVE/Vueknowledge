/**
*
*  @author ZTiger
*
*/


<template>
  <Modal v-model="modalCPFalg" width="32%" :styles="{top: '25%'}" :mask-closable="false">
    <p slot="header" style="color:#2d8cf0;text-align:center">
      <Icon type="ios-information-circle"></Icon>
      <span>&nbsp;&nbsp;&nbsp;密码修改</span>
    </p>
    <div style="text-align:center">
      <div class="k-h-C-P">
        <Input
          v-model="fromCPass.oldPass"
          type="password"
          class="k-h-C-P-I"
          prefix="ios-unlock-outline"
          placeholder="旧密码"
          size="large"
          password
          maxlength="32"
          :class="{'K-H-C-P-I-W':changeoldPass}"
          @on-change="changeModalInput(1)"
          @on-blur="blurModalInput(1)"
          @on-enter="submitChange"
        />
        <div class="k-h-C-P-W" v-show="changeoldPass">
          <Icon type="ios-information-circle" size="17" color="#f5222d" />&nbsp;&nbsp;&nbsp;请输入旧密码!
        </div>
      </div>
      <div class="k-h-C-P">
        <Poptip trigger="focus" content="content" placement="right">
          <Input
            v-model="fromCPass.newPass"
            type="password"
            class="k-h-C-P-I"
            prefix="ios-lock-outline"
            placeholder="新密码"
            size="large"
            maxlength="32"
            @on-focus="changenewPass=false"
            :class="{'K-H-C-P-I-W':changenewPass}"
            @on-change="changeModalInput(2)"
            @on-blur="blurModalInput(2)"
            @on-enter="submitChange"
          />
          <div slot="content">
            <div class="k-h-C-P-I-C">
              <Icon :type="regexPassword.space" size="17" :color="regexPassword.Scolor" />&nbsp;&nbsp;&nbsp; 不能包括空格
            </div>
            <div class="k-h-C-P-I-C">
              <Icon :type="regexPassword.number" size="17" :color="regexPassword.Ncolor" />&nbsp;&nbsp;&nbsp;长度为6-32个字符
            </div>
            <div class="k-h-C-P-I-C">
              <Icon :type="regexPassword.different" size="17" :color="regexPassword.Dcolor" />&nbsp;&nbsp;&nbsp;必须包含字母、数字、符号中至少2种
            </div>
          </div>
        </Poptip>
        <div class="k-h-C-P-W" v-show="changenewPass">
          <Icon type="ios-information-circle" size="17" color="#f5222d" />
          &nbsp;&nbsp;&nbsp;{{changehowPassword}}
        </div>
      </div>
      <div class="k-h-C-P">
        <Input
          v-model="fromCPass.RepeatPass"
          type="password"
          class="k-h-C-P-I"
          prefix="ios-lock-outline"
          placeholder="确认新密码"
          size="large"
          maxlength="32"
          :class="{'K-H-C-P-I-W':changerepeatPassr}"
          @on-change="changeModalInput(3)"
          @on-blur="blurModalInput(3)"
          @on-enter="submitChange"
        />
        <div class="k-h-C-P-W" v-show="changerepeatPassr">
          <Icon type="ios-information-circle" size="17" color="#f5222d" />
          &nbsp;&nbsp;&nbsp;{{changeRepeatPasswordFalg?'两次输入的密码不匹配!':'请确认密码!'}}
        </div>
      </div>
    </div>
    <div slot="footer">
      <Button type="text" @click="modalCPFalg=false">取消</Button>
      <Button type="primary" @click="submitChange">确认</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  props: ["modalCFalg"],
  data() {
    return {
      //加载框标志信息
      spinShowTips: "Loading...",
      //修改密码 遮罩层 标志位
      modalCPFalg: false,
      //修改 旧密码 标志位
      changeoldPass: false,
      //修改 新密码 标志位
      changenewPass: false,
      //修改 确认密码 标志位
      changerepeatPassr: false,
      //修改 密码 正则 标志位
      regexPassword: {
        //空格
        space: "md-checkmark-circle",
        Scolor: "#19be6b",
        Sflag: true,
        //位数
        number: "ios-information-circle",
        Ncolor: "#87CEFA",
        Nflag: false,
        //不同
        different: "ios-information-circle",
        Dcolor: "#87CEFA",
        Dflag: false
      },
      //绿色
      successColor: "#19be6b",
      //蓝色
      primaryColor: "#87CEFA",
      //红色
      errorColor: "#f5222d",
      //感叹号
      information: "ios-information-circle",
      //对号
      checkmark: "md-checkmark-circle",
      //修改密碼 上传 的 信息
      fromCPass: {
        oldPass: "",
        newPass: "",
        RepeatPass: ""
      },
      //展示错误文字信息
      changehowPassword: "请输入新密码!",
      //展示 重复 密码 标志位
      changeRepeatPasswordFalg: false,
      // 防止重复 提交
      repeatFrom: {
        oldPass: "",
        newPass: "",
      }
    };
  },
  methods: {
    //上传修改
    submitChange() {
      if (this.fromCPass.oldPass === "") {
        this.changeoldPass = true;
      }
      if (this.fromCPass.newPass === "") {
        this.changenewPass = true;
      }
      if (this.fromCPass.RepeatPass === "") {
        this.changerepeatPassr = true;
        this.changeRepeatPasswordFalg = false;
      }
      if (this.changeoldPass || this.changenewPass || this.changerepeatPassr) {
        return;
      }
      if(this.repeatFrom.oldPass === this.fromCPass.oldPass && this.repeatFrom.newPass === this.fromCPass.newPass){
        this.$Message.warning({
          content:'请不要重复提交!',
          duration:2
        })
        return;
      }
      this. repeatFrom = {
        oldPass: this.fromCPass.oldPass,
        newPass: this.fromCPass.newPass,
      }
      let userJson = this.$store.state.user;
      let userId = JSON.parse(userJson).id;
      let url = "user/" + userId + "/password";
      let obj = {
        srcPassword: this.fromCPass.oldPass,
        password: this.fromCPass.newPass
      }
      this.patch_string(url, obj)
        .then(() => {
          this.modalCPFalg = false;
        }).catch(()=>{
        })
    },
    //change 事件改变
    changeModalInput(val) {
      //空格正则
      let regSpace = /(^\s+)|(\s+$)|\s+/g;
      //密码强度正则  包含字母、数字、符号中至少2种
      let regDifferent = /(?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[-+=|,!@#$%^&*?_`.~/(){}[\]<>])|(?=.*\d)(?=.*[-+=|,!@#$%^&*?_`.~/(){}[\]<>])/;
      let oldPass = this.fromCPass.oldPass;
      let password = this.fromCPass.newPass;
      let RepeatPass = this.fromCPass.RepeatPass;
      switch (val) {
        case 1:
          if (oldPass !== "") {
            this.changeoldPass = false;
          }
          break;
        case 2:
          if (password !== "") {
            this.changeoldPass = false;
            if (RepeatPass !== "") {
              if (RepeatPass === password) {
                this.changerepeatPassr = false;
              } else {
                this.changerepeatPassr = true;
              }
            }
          }
          // 匹配是否有空格
          if (regSpace.test(password)) {
            this.regexPassword.space = this.information;
            this.regexPassword.Scolor = this.errorColor;
            this.regexPassword.Sflag = false;
          } else {
            this.regexPassword.space = this.checkmark;
            this.regexPassword.Scolor = this.successColor;
            this.regexPassword.Sflag = true;
          }
          //判断输入的密码长度不小于6位
          if (password.length >= 6) {
            this.regexPassword.number = this.checkmark;
            this.regexPassword.Ncolor = this.successColor;
            this.regexPassword.Nflag = true;
          } else {
            this.regexPassword.number = this.information;
            this.regexPassword.Ncolor = this.primaryColor;
            this.regexPassword.Nflag = false;
          }
          //判断包含字母、数字、符号中至少2种
          if (regDifferent.test(password)) {
            this.regexPassword.different = this.checkmark;
            this.regexPassword.Dcolor = this.successColor;
            this.regexPassword.Dflag = true;
          } else {
            this.regexPassword.different = this.information;
            this.regexPassword.Dcolor = this.primaryColor;
            this.regexPassword.Dflag = false;
          }
          break;
        case 3:
          if (RepeatPass !== "") {
            this.changerepeatPassr = false;
            let strPass = password.substr(0, RepeatPass.length);
            if (strPass !== RepeatPass) {
              this.changerepeatPassr = true;
              this.changeRepeatPasswordFalg = true;
            }
          }
          break;
      }
    },
    //失去焦点
    blurModalInput(val) {
      if (val === 1) {
        if (this.fromCPass.oldPass === "") {
          this.changeoldPass = true;
        } else {
          this.changeoldPass = false;
        }
      } else if (val === 2) {
        this.changenewPass = false;
        if (this.fromCPass.newPass === "") {
          this.changenewPass = true;
          this.changehowPassword = "请输入新密码!";
        } else {
          if (!this.regexPassword.Sflag) {
            this.changenewPass = true;
            this.changehowPassword = "不能包括空格!";
          } else if (!this.regexPassword.Nflag) {
            this.changenewPass = true;
            this.changehowPassword = "长度为6-32个字符";
          } else if (!this.regexPassword.Dflag) {
            this.changenewPass = true;
            this.changehowPassword = "必须包含字母、数字、符号中至少2种";
          } else this.changenewPass = false;
        }
      } else if (val === 3) {
        if (this.fromCPass.RepeatPass === "") {
          this.changerepeatPassr = true;
          this.changeRepeatPasswordFalg = false;
        } else {
          this.changerepeatPassr = false;
          if (this.fromCPass.RepeatPass !== this.fromCPass.newPass) {
            this.changerepeatPassr = true;
            this.changeRepeatPasswordFalg = true;
          }
        }
      }
    }
  },
  watch: {
    modalCFalg() {
      this.modalCPFalg = true;
      this.regexPassword = {
        space: "md-checkmark-circle",
        Scolor: "#19be6b",
        Sflag: true,
        number: "ios-information-circle",
        Ncolor: "#87CEFA",
        Nflag: false,
        different: "ios-information-circle",
        Dcolor: "#87CEFA",
        Dflag: false
      };
      this.fromCPass = {
        oldPass: "",
        newPass: "",
        RepeatPass: ""
      };
      this.repeatFrom = {
        oldPass: "",
        newPass: "",
      };
      this.changeoldPass = false;
      this.changenewPass = false;
      this.changerepeatPassr = false;
      this.changehowPassword = "请输入新密码!";
    }
  }
};
</script>

<style >
.k-h-C-P:nth-of-type(1) {
  margin-top: 0px;
}
.k-h-C-P {
  margin-top: 20px;
}
.k-h-C-P .ivu-poptip,
.k-h-C-P .ivu-poptip-rel {
  width: 100%;
}
.k-h-C-P-I {
  width: 100%;
}
.k-h-C-P-I-C {
  text-align: left;
}
.k-h-C-P-W {
  margin-top: 3px;
  margin-left: 0px;
  font-size: 14px;
  color: #f5222d;
  text-align: left;
}
.K-H-C-P-I-W .ivu-input {
  border-color: #f5222d;
}
.K-H-C-P-I-W .ivu-input:focus {
  border-color: #f5222d;
  box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);
}
.K-H-C-P-I-W .ivu-input:hover {
  border-color: #f5222d;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>