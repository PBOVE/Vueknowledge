/**
*
*  @author ZTiger
*
*/


<template>
    <div id="loginBox">
        <div class="know-login-box">
            <div class="know-login-title">
                知&nbsp;识&nbsp;图&nbsp;谱
            </div>
            <div class="know-login-user-select ">
                <span  :class="{'know-login-user-select-span':true,'know-login-user-select-border':showLoginRegister}" @click="showLoginRegister=true">
                    <Icon type="md-person" /><span class="know-login-user-select-event ">登&nbsp;陆</span>
                </span>
                <span :class="{'know-login-user-select-span':true,'know-login-user-select-border':!showLoginRegister}" @click="showLoginRegister=false">
                    <Icon type="md-create" /><span class="know-login-user-select-event">注&nbsp;册</span>
                </span>
            </div>
            <div v-show="showLoginRegister" >
                <div class="know-login-user-input">
                    <div class="know-login-user">
                        <Input v-model="formlogin.username" :class="{'know-login-error':showuserwarn}"  prefix="ios-paw-outline" placeholder="用户名"  size="large" @on-change='checkIswarn(1)' @on-blur='blurIswarn(1)' />
                        <transition name="knowerror">
                            <div class="know-login-warn" v-show="showuserwarn">请输入用户名!</div>
                        </transition>
                    </div>
                    <div class="know-login-user">
                        <Input v-model="formlogin.password" :class="{'know-login-error':showpasswordwarn}" prefix="ios-lock-outline" type="password" password  placeholder="密   码"  size="large"  @on-change='checkIswarn(2)'  @on-blur='blurIswarn(1)'/>
                        <transition name="knowerror">
                            <div class="know-login-warn" v-show="showpasswordwarn">请输入密码!</div>
                        </transition>
                    </div>
                </div>
                <div class="know-login-user-land">
                    <Button type="primary" class="know-login-user-land-button" size="large" @click="Submitlanding">登&nbsp;陆</Button>
                </div>
            </div>

            <div  v-show="!showLoginRegister" >
                <div class="know-login-user-input">
                    <div class="know-login-user">
                        <Input   placeholder="账号"  size="large" />
                    </div>
                    <div class="know-login-user">
                        <Input type="password"   placeholder="至少6位密码 区分大小写"  size="large"/>
                    </div>
                    <div class="know-login-user">
                        <Input  type="password" placeholder="确认密码"  size="large"/>
                    </div>
                </div>
                <div class="know-login-user-land">
                    <Button type="primary" class="know-login-user-land-button" size="large">注&nbsp;册</Button>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                // 登陆 和 注册 之间 跳转
                showLoginRegister:true,
                // 用户名 警告 标志位
                showuserwarn:false,
                // 密码 警告标志位
                showpasswordwarn:false,
                //登陆 上传 的 信息
                formlogin:{
                    username:'',
                    password:''
                },
            }
        },
        methods:{
            //登陆
            Submitlanding(){
                this. post_string('user/login',this.formlogin).then(res=>{
                    window.console.log(res);
                })
            },
            //检测 信息 有误
            checkIswarn(val){
                if(val === 1){
                    if(this.formlogin.user !== ''){
                        this.showuserwarn = false;
                    }
                }else if(val === 2){
                    if(this.formlogin.password !== ''){
                        this.showpasswordwarn = false;
                    }
                }
            },
            //失去 焦点
            blurIswarn(val){
                if(val === 1){
                    if(this.formlogin.user === ''){
                        this.showuserwarn = true;
                    }else{
                        this.showuserwarn = false;
                    }
                }else if(val === 2){
                    if(this.formlogin.password === ''){
                        this.showpasswordwarn = true;
                    }else{
                        this.showpasswordwarn = false;
                    }
                }
            },
            // 获取  token
            getuserToken(){
                this.get('user/me').then(res=>{
                    window.console.log(res)
                    this.$store.commit('setToken',res.data._csrf);
                    window.console.log(this.$store.getters.getToken);
                })
            }
        },
        mounted(){
            this.getuserToken();
        }
    }
</script>


<style >
    #loginBox{
        position: relative;
        height: 100vh;
        width: 100vw;
        background-image: url("../../assets/images/backgroudLogin.svg");
        background-color: #f0f2f5;
    }
    #loginBox .know-login-box{
        display: inline-block;
        width: 500px;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%,-50%);
        height: 400px;
    }
    #loginBox .know-login-title{
        height: 30px;
        line-height: 30px;
        font-size: 45px;
        color: #000;
        text-align: center;
        font-family: 华文行楷;
    }
    #loginBox .know-login-user-select{

        font-size: 16px;
        text-align: center;
        margin-top: 30px;

    }
    #loginBox .know-login-user-select .know-login-user-select-span{

        display: inline-block;
        text-align: center;
        cursor: pointer;
        width: 100px;
    }
    #loginBox .know-login-user-select .know-login-user-select-span:first-of-type{
        margin-right: 50px;
    }
    #loginBox .know-login-user-select-border{
        border-bottom: 1px solid #2d8cf0;
    }
    #loginBox .know-login-user-select-border .know-login-user-select-event {
        color: #2d8cf0;
    }
    #loginBox .know-login-user-select-event{
        width: 60px;
        display: inline-block;
        text-align: center;
        user-select:none;
    }
    #loginBox .know-login-user-select-event:hover{
        color: #2d8cf0;
    }
    #loginBox .know-login-warn{
        margin-top: 1px;
        font-size: 12px;
        color: #f5222d;
    }
    #loginBox .know-login-user{
        margin: 0 auto;
        margin-top: 30px;
        width: 300px;
    }
    #loginBox .know-login-user-land{
        text-align:  center;
    }
    #loginBox .know-login-user-land-button{
        width: 300px;
        margin-top: 30px;

    }
    #loginBox .know-login-error .ivu-input{

        border-color: #f5222d;
    }
    #loginBox .know-login-error .ivu-input:focus{
        border-color: #f5222d;
        box-shadow: 0 0 0 2px rgba(245,34,45,0.2);
    }
    #loginBox .know-login-error .ivu-input:hover{
        border-color: #f5222d;
    }
    #loginBox .knowerror-enter-active{
        animation: namepasswordWarn 1s;
    }
    #loginBox .bounce-leave-active {
        animation: namepasswordWarn 1s reverse;
    }
    @keyframes namepasswordWarn {
        0%{
            transform: translateY(-5px);
            opacity: 0;
        }
        100%{
            transform: translateY(0);
            opacity: 1;
        }
    }
    @media screen and (max-width: 500px){
        #loginBox .know-login-box{
            width: 100%;
        }
        #loginBox .know-login-user{
            width: 100%;
        }
        #loginBox .know-login-user-land-button{
            width: 100%;
        }
    }
    @media screen and (max-width: 300px){
        #loginBox .know-login-box{
            width: 300px;
        }
    }
    @media screen and (max-height: 650px){
        #loginBox .know-login-box{
            top: 10%;
            transform: translate(-50%,0%);
        }
    }
</style>
