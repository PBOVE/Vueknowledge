/**
*
*  @author ZTiger
*
*/


<template>
  <div id="loginBox">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="know-login-box">
      <div class="know-login-title">
        <div class="know-login-title-en">
          <span class="kown-login-title-logo"></span>
          <span>Knowledge&nbsp;Graph</span>
        </div>
        <div class="know-login-title-cn">
          <span>知识图谱构建平台</span>
        </div>
      </div>
      <div class="know-login-user-select">
        <span
          :class="{'know-login-user-select-span':true,'know-login-user-select-border':showLoginRegister}"
          @click="loginRegister(1)"
        >
          <span class="know-login-user-select-event">登&nbsp;录</span>
        </span>
        <span
          :class="{'know-login-user-select-span':true,'know-login-user-select-border':!showLoginRegister}"
          @click="loginRegister(2)"
        >
          <span class="know-login-user-select-event">注&nbsp;册</span>
        </span>
      </div>
      <div v-show="showLoginRegister">
        <div class="know-login-user-input">
          <div class="know-login-user">
            <Input
              v-model="formlogin.username"
              :class="{'know-login-error':showuserwarn}"
              prefix="ios-paw-outline"
              placeholder="用户名"
              size="large"
              @on-change="checkIswarn(1)"
              @on-blur="blurIswarn(1)"
              @on-enter="Submitlanding"
            />
            <transition name="knowerror">
              <div class="know-login-warn" v-show="showuserwarn">
                <Icon type="ios-information-circle" size="17" color="#f5222d" />请输入用户名!
              </div>
            </transition>
          </div>
          <div class="know-login-user">
            <Input
              v-model="formlogin.password"
              :class="{'know-login-error':showpasswordwarn}"
              prefix="ios-lock-outline"
              type="password"
              password
              placeholder="密   码"
              size="large"
              @on-change="checkIswarn(2)"
              @on-blur="blurIswarn(2)"
              @on-enter="Submitlanding"
            />
            <transition name="knowerror">
              <div class="know-login-warn" v-show="showpasswordwarn">
                <Icon type="ios-information-circle" size="17" color="#f5222d" />请输入密码!
              </div>
            </transition>
          </div>
          <div class="know-login-user">
            <Checkbox v-model="formlogin.remeberMe" class="know-login-check-select-an">自动登录</Checkbox>
          </div>
        </div>
        <div class="know-login-user-land">
          <Button
            type="primary"
            class="know-login-user-land-button"
            size="large"
            @click="Submitlanding"
          >登&nbsp;录</Button>
        </div>
      </div>

      <div v-show="!showLoginRegister">
        <div class="know-login-user-input">
          <div class="know-login-user">
            <Input
              v-model="formRegister.username"
              placeholder="账号"
              prefix="ios-paw-outline"
              size="large"
              :class="{'know-login-error':registerusername}"
              @on-change="checkIswarn(3)"
              @on-blur="blurIswarn(3)"
              @on-enter="SubmitRegister"
            />
            <transition name="knowerror">
              <div class="know-login-warn" v-show="registerusername">
                <Icon type="ios-information-circle" size="17" color="#f5222d" />请输入账号!
              </div>
            </transition>
          </div>
          <div class="know-login-user">
            <Input
              type="password"
              autocomplete="off"
              v-model="formRegister.password"
              prefix="ios-lock-outline"
              placeholder="密码"
              size="large"
              :class="{'know-login-error':registerPassword}"
              maxlength="32"
              @on-change="checkIswarn(4)"
              @on-focus="registerPasswordShowTips = true,registerPassword = false"
              @on-blur="blurIswarn(4)"
              @on-enter="SubmitRegister"
            />
            <transition name="knowTips">
              <div class="know-login-user-password-tips" v-show="registerPasswordShowTips">
                <div :class="{'know-login-user-password-tips-d':true}">
                  <Icon :type="regexPassword.space" size="17" :color="regexPassword.Scolor" />&nbsp;&nbsp;&nbsp; 不能包括空格
                </div>
                <div :class="{'know-login-user-password-tips-d':true}">
                  <Icon :type="regexPassword.number" size="17" :color="regexPassword.Ncolor" />&nbsp;&nbsp;&nbsp;长度为6-32个字符
                </div>
                <div :class="{'know-login-user-password-tips-d':true}">
                  <Icon :type="regexPassword.different" size="17" :color="regexPassword.Dcolor" />&nbsp;&nbsp;&nbsp;必须包含字母、数字、符号中至少2种
                </div>
              </div>
            </transition>
            <transition name="knowLoginShowTips">
              <div class="know-login-warn know-login-show-tips" v-show="registerPassword">
                <Icon type="ios-information-circle" size="17" color="#f5222d" />
                &nbsp;&nbsp;&nbsp;{{registerShowPassword}}
              </div>
            </transition>
          </div>
          <div class="know-login-user">
            <Input
              type="password"
              v-model="formRegister.RepeatPassword"
              prefix="ios-lock-outline"
              placeholder="确认密码"
              size="large"
              :class="{'know-login-error':registerRepeatPassword}"
              maxlength="32"
              autocomplete="off"
              @on-change="checkIswarn(5)"
              @on-blur="blurIswarn(5)"
              @on-enter="SubmitRegister"
            />
            <transition name="knowerror">
              <div class="know-login-warn" v-show="registerRepeatPassword">
                <Icon type="ios-information-circle" size="17" color="#f5222d" />
                &nbsp;&nbsp;&nbsp;
                {{registerRepeatPasswordFalg?'两次输入的密码不匹配!':'请确认密码!'}}
              </div>
            </transition>
          </div>
        </div>
        <div class="know-login-user-land">
          <Button
            type="primary"
            class="know-login-user-land-button"
            size="large"
            @click="SubmitRegister"
          >注&nbsp;册</Button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      //设置免密登录加载
      spinShow: true,
      // 登陆 和 注册 之间 跳转
      showLoginRegister: true,
      // 用户名 警告 标志位
      showuserwarn: false,
      // 密码 警告标志位
      showpasswordwarn: false,
      //注册 用户名 警告 标志位
      registerusername: false,
      //注册 密码 警告 标志位
      registerPassword: false,
      //注册 密码 显示 语句
      registerShowPassword: "请输入密码!",
      //注册 密码 显示 提示
      registerPasswordShowTips: false,
      //注册 密码 正则 标志位
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
      //注册 重复 密码  警告 标志位
      registerRepeatPassword: false,
      //注册 重复 密码  警告 信息 标志位
      registerRepeatPasswordFalg: false,
      //登陆 上传 的 信息
      formlogin: {
        username: "",
        password: "",
        remeberMe: false
      },
      //注册 信息
      formRegister: {
        username: "",
        password: "",
        RepeatPassword: ""
      },
      //防止 多次注册提交
      submitFlag: false,
      //防止 多次登陆错误信息
      repeatFrom: {
        username: "",
        password: "",
        remeberMe: false
      }
    };
  },
  methods: {
    //登录 注册 切换 函数
    loginRegister(val) {
      this.showuserwarn = false;
      this.showpasswordwarn = false;
      this.registerusername = false;
      this.registerPassword = false;
      this.registerRepeatPassword = false;
      switch (val) {
        case 1:
          this.formlogin = {
            username: "",
            password: "",
            remeberMe: false
          };
          this.repeatFrom = {
            username: "",
            password: "",
            remeberMe: false
          };
          this.showLoginRegister = true;
          break;
        case 2:
          this.formRegister = {
            username: "",
            password: "",
            RepeatPassword: ""
          };
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
          this.registerShowPassword = "请输入密码!";
          this.showLoginRegister = false;
          break;
      }
    },
    //登录
    Submitlanding() {
      if (this.formlogin.username === "" && this.formlogin.password === "") {
        this.showuserwarn = true;
        this.showpasswordwarn = true;
        return;
      } else if (this.formlogin.username === "") {
        this.showuserwarn = true;
        return;
      } else if (this.formlogin.password === "") {
        this.showpasswordwarn = true;
        return;
      }
      if (
        this.repeatFrom.username === this.formlogin.username &&
        this.repeatFrom.password === this.formlogin.password &&
        this.repeatFrom.remeberMe === this.formlogin.remeberMe
      ) {
        this.$Message.warning({
          content: "请不要重复提交!",
          duration: 2
        });
        return;
      }
      this.repeatFrom = {
        username: this.formlogin.username,
        password: this.formlogin.password,
        remeberMe: this.formlogin.remeberMe
      };
      let register = {
        username: this.formlogin.username,
        password: this.formlogin.password,
        "remember-me": this.formlogin.remeberMe ? "on" : "off"
      };
      let url = "user/login";
      this.post_string(url, register)
        .then(res => {
          if (res.code === 0 && res.msg === "Success") {
            // this.$store.getters.getToken
            return Promise.resolve();
          }
        })
        .then(() => {
          this.get("user/me").then(res => {
            let data = res.data;
            this.$store.commit("setUserData", data);
          });
        }).catch(()=>{

        });
    },
    // 注册
    SubmitRegister() {
      if (this.formRegister.username === "") {
        this.registerusername = true;
      }
      if (this.formRegister.password === "") {
        this.registerPassword = true;
      }
      if (this.formRegister.RepeatPassword === "") {
        this.registerRepeatPassword = true;
        this.registerRepeatPasswordFalg = false;
      }
      if (
        this.registerusername ||
        this.registerPassword ||
        this.registerRepeatPassword
      )
        return;
      if (this.submitFlag) return;
      this.submitFlag = true;
      this.post_json("register", {
        userName: this.formRegister.username,
        password: this.formRegister.password
      })
        .then(res => {
          this.submitFlag = false;
          if (res.code === 0 && res.msg === "Success") {
            this.showLoginRegister = !this.showLoginRegister;
          }
        })
        .catch(() => {
          this.submitFlag = false;
        });
    },
    //检测 信息 有误 change
    checkIswarn(val) {
      if (val === 1) {
        if (this.formlogin.username !== "") {
          this.showuserwarn = false;
        }
      } else if (val === 2) {
        if (this.formlogin.password !== "") {
          this.showpasswordwarn = false;
        }
      } else if (val === 3) {
        if (this.formRegister.username !== "") {
          this.registerusername = false;
        }
      } else if (val === 4) {
        let password = this.formRegister.password;
        if (password !== "") {
          this.registerPassword = false;
          if (this.formRegister.RepeatPassword !== "") {
            if (this.formRegister.RepeatPassword === password) {
              this.registerRepeatPassword = false;
            } else {
              this.registerRepeatPassword = true;
            }
          }
        }
        //空格正则
        let regSpace = /(^\s+)|(\s+$)|\s+/g;
        //密码强度正则  包含字母、数字、符号中至少2种
        let regDifferent = /(?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[-+=|,!@#$%^&*?_`.~/(){}[\]<>])|(?=.*\d)(?=.*[-+=|,!@#$%^&*?_`.~/(){}[\]<>])/;
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
      } else if (val === 5) {
        if (this.formRegister.RepeatPassword !== "") {
          this.registerRepeatPassword = false;
          let strRPass = this.formRegister.RepeatPassword;
          let strPass = this.formRegister.password.substr(0, strRPass.length);
          if (strPass !== strRPass) {
            this.registerRepeatPassword = true;
            this.registerRepeatPasswordFalg = true;
          }
        }
      }
    },
    //失去 焦点
    blurIswarn(val) {
      if (val === 1) {
        if (this.formlogin.username === "") {
          this.showuserwarn = true;
        } else {
          this.showuserwarn = false;
        }
      } else if (val === 2) {
        if (this.formlogin.password === "") {
          this.showpasswordwarn = true;
        } else {
          this.showpasswordwarn = false;
        }
      } else if (val === 3) {
        if (this.formRegister.username === "") {
          this.registerusername = true;
        } else {
          this.registerusername = false;
        }
      } else if (val === 4) {
        this.registerPasswordShowTips = false;
        if (this.formRegister.password === "") {
          this.registerPassword = true;
          this.registerShowPassword = "请输入密码!";
        } else {
          if (!this.regexPassword.Sflag) {
            this.registerPassword = true;
            this.registerShowPassword = "不能包括空格!";
          } else if (!this.regexPassword.Nflag) {
            this.registerPassword = true;
            this.registerShowPassword = "长度为6-32个字符";
          } else if (!this.regexPassword.Dflag) {
            this.registerPassword = true;
            this.registerShowPassword = "必须包含字母、数字、符号中至少2种";
          } else this.registerPassword = false;
        }
      } else if (val === 5) {
        if (this.formRegister.RepeatPassword === "") {
          this.registerRepeatPassword = true;
          this.registerRepeatPasswordFalg = false;
        } else {
          this.registerRepeatPassword = false;
          if (this.formRegister.RepeatPassword !== this.formRegister.password) {
            this.registerRepeatPassword = true;
            this.registerRepeatPasswordFalg = true;
          }
        }
      }
    },
    // 获取  token
    getuserToken() {
      this.get("user/me").then(res => {
        // window.console.log(res);
        this.spinShow = false;
        // this.$store.commit('setToken',res.data._csrf.token);
        if (!res.data.me) {
          this.$store.commit("setToken", res.data._csrf.token);
        } else {
          let data = res.data;
          this.$store.commit("setUserData", data);
        }
      }).catch(()=>{});
    }
  },
  mounted() {
    this.getuserToken();
  }
};
</script>


<style >
#loginBox {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: url("../../assets/images/backgroudLogin.svg");
  background-color: #f0f2f5;
}
#loginBox .know-login-box {
  display: inline-block;
  width: 500px;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  height: 550px;
}
#loginBox .know-login-title-en {
  text-align: center;
  font-family: Georgia;
}
#loginBox .know-login-title-en span:nth-of-type(2) {
  /* font-weight: lighter; */
  user-select: none;
  height: 45px;
  line-height: 45px;
  font-size: 33px;
  color: #000;
  text-align: center;
}
#loginBox .know-login-title-cn {
  margin-top: 15px;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}
#loginBox .kown-login-title-logo {
  background-image: url("../../assets/images/logo.png");
  background-repeat: no-repeat;
  background-position: 0px 12px;
  background-size: 70% 70%;
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
#loginBox .know-login-user-select {
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
  height: 30px;
}
#loginBox .know-login-check-select-an {
  width: 300px;
  user-select: none;
}
#loginBox .know-login-user-select .know-login-user-select-span {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  width: 100px;
  padding: 4px;
}
#loginBox .know-login-user-select .know-login-user-select-span:first-of-type {
  margin-right: 50px;
}
#loginBox .know-login-user-select-border {
  border-bottom: 2px solid #1890ff;
  border-radius: 1px;
}
#loginBox .know-login-user-select-border .know-login-user-select-event {
  color: #1890ff;
}
#loginBox .know-login-user-select-event {
  width: 60px;
  display: inline-block;
  text-align: center;
  user-select: none;
}
#loginBox .know-login-user-select-event:hover {
  color: #2d8cf0;
}
#loginBox .know-login-warn {
  margin-top: 1px;
  font-size: 14px;
  color: #f5222d;
}
#loginBox .know-login-user {
  margin: 0 auto;
  margin-top: 30px;
  width: 400px;
}
/* #loginBox .know-login-user:nth-of-type(3){
        margin-top: 30px;
    } */
#loginBox .know-login-user-land {
  text-align: center;
}
#loginBox .know-login-user-land-button {
  width: 400px;
  margin-top: 30px;
  background-color: #1890ff;
  border-color: #1890ff;
  /* text-shadow: 0 -1px 0 rgba(0,0,0,.12); */
}
#loginBox .know-login-error .ivu-input {
  border-color: #f5222d;
}
#loginBox .know-login-error .ivu-input:focus {
  border-color: #f5222d;
  box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);
}
#loginBox .know-login-error .ivu-input:hover {
  border-color: #f5222d;
}
#loginBox .knowerror-enter-active {
  animation: namepasswordWarn 1s;
}
#loginBox .knowerror-leave-active {
  animation: namepasswordWarn 1s reverse;
}
#loginBox .knowTips-enter-active {
  animation: passwordTips 0.5s;
}
#loginBox .knowTips-leave-active {
  animation: passwordTips 0.5s reverse;
}
#loginBox .know-login-user-password-tips {
  color: #000;
}
#loginBox .know-login-user-password-tips-d {
  margin-top: 2px;
}
#loginBox .knowLoginShowTips-enter-active {
  animation: passwordshowWarn 0.5s ease-in;
}
#loginBox .knowLoginShowTips-leave-active {
  animation: passwordshowWarn 0.2s reverse;
}
#loginBox .know-login-show-tips {
  background-color: #f0f2f5;
}
@keyframes namepasswordWarn {
  0% {
    transform: translateY(-5px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes passwordTips {
  0% {
    height: 0;
  }
  100% {
    height: 66px;
  }
}
@keyframes passwordshowWarn {
  0% {
    transform: translateY(-10px);
    opacity: 0;
    height: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    height: 22px;
  }
}

@media screen and (max-width: 500px) {
  #loginBox .know-login-box {
    width: 100%;
  }
  #loginBox .know-login-user {
    width: 100%;
  }
  #loginBox .know-login-user-land-button {
    width: 100%;
  }
}
@media screen and (max-width: 400px) {
  #loginBox .know-login-box {
    width: 400px;
  }
}
@media screen and (max-height: 650px) {
  #loginBox .know-login-box {
    top: 10%;
    transform: translate(-50%, 0%);
  }
}
</style>
