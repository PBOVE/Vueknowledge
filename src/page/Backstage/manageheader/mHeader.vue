/**
*
*  @author ZTiger
*
*/


<template>
   <div class="know-header">
        <div class="know-header-left">
            <span class="know-header-left-logo"></span>
            <span class="know-header-left-title">Knowledge Graph</span>
        </div>
        <div class="know-header-right">
           <span class="know-header-right-search ivu-icon"></span>
           <span class="know-header-right-user-logo" ref='userLogo'></span>
           <span class="know-header-right-user">{{username}}</span>
        </div>
   </div>
</template>


<script>
    // import Avatars from '@dicebear/avatars';
    // import sprites from '@dicebear/avatars-identicon-sprites';
   export default {
       data() {
           return {
               //用户名称
               username:JSON.parse(sessionStorage.getItem('user')).username,
               //随机背景颜色
                color:['#ff4e50','#84B1ED','00dffc','#0080ff','#f9d423','#5A9367'],
           }
       },
       methods:{
           //创建用户 色彩 头像
           createUserLogo(){
               this.$refs.userLogo.innerHTML = this.username.charAt(0).toUpperCase();
               this.$refs.userLogo.style.backgroundColor = this.color[Math.floor(Math.random()*6)];
           }
       },
       mounted(){
           this.createUserLogo();
       }
   }
</script>


<style scoped>
    .know-header{
        display: flex;
        justify-content:space-between;
        align-items: center;
        height: 70px;
    }
    .know-header-left-logo{
        display: inline-block;
        background-image: url(../../../assets/images/logo.png);
        background-size: 20px 20px;
        background-repeat: no-repeat;
        background-position: 0 5px;
        height: 25px;
        width: 25px;
    }
    .know-header-left-title{
        display: inline-block;
        font-family:Georgia;
        font-size: 20px;
        text-indent: 0.2em;
    }
    .know-header-right-user{
        height: 20px;
        font-family:Georgia;
        text-transform:capitalize;
        font-size: 18px;
    }
    .know-header-right-user-logo{
        margin: 0 10px;
        color: #fff;
        font-family:Georgia;
        display: inline-block;
        width: 26px;
        border-radius: 50%;
        text-align: center;
        line-height: 25px;
        font-size: 15px;
        user-select: none;
        
    }
    .know-header-right-search{
        font-size: 18px;
        width: 20px;
        height: 20px;
        
    }
    .know-header-right-search::before{
        content: "\f2a7";
    }
    @media screen and (max-width: 800px){
        .know-header{
            justify-content: space-around;
        }
        .know-header-right{
            display: none;
        }
     }
</style>