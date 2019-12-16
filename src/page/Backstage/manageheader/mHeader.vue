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
           <span class="know-header-right-search ivu-icon" @click="clickShowSearch">
               <div class="k-h-r-s-d" ref='headerSearchD'>
                   <input type="text" class="know-header-right-search-input" ref='headerSearchIput' @blur="hiddenSearch">
               </div>
               
           </span>
           <div class="know-header-right-user">
                <span class="know-header-right-user-logo" ref='userLogo'></span>
                <span class="know-header-right-user-name">{{username}}</span>
           </div>
          
        </div>
   </div>
</template>


<script>
   export default {
       data() {
           return {
               //用户名称
               username:JSON.parse(sessionStorage.getItem('user')).username,
               //随机背景颜色
                color:['#ff4e50','#84B1ED','00dffc','#0080ff','#f9d423','#5A9367'],
                //
           }
       },
       methods:{
           //创建用户 色彩 头像
           createUserLogo(){
               this.$refs.userLogo.innerHTML = this.username.charAt(0).toUpperCase();
               this.$refs.userLogo.style.backgroundColor = this.color[Math.floor(Math.random()*6)];
           },
           //展开 search 框
           clickShowSearch(){
                this.$refs.headerSearchD.style.width='150px';
                this.$refs.headerSearchD.style.marginLeft='10px';
                this.$refs.headerSearchIput.focus();
           },
           //失去焦点隐藏 搜索框
           hiddenSearch(){
                this.$refs.headerSearchD.style.width='0px';
                this.$refs.headerSearchD.style.marginLeft='0px';
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
    .know-header-right{
        line-height: 70px;
    }
    .know-header-right-user{
        display: inline-block;
        height: 70px;
        padding: 0 10px;
        transition:  background-color 0.5s;
        cursor: pointer;
    }
    .know-header-right-user:hover{
        background-color: #e8eaec;
    }
    .know-header-right-user-name{
        height: 20px;
        font-family:Georgia;
        text-transform:capitalize;
        font-size: 18px;
    }
    .know-header-right-user-logo{
        margin: 0 10px 0 0;
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
        display: inline-block;
        font-size: 18px;
        height: 20px;
        cursor: pointer;
        margin-right: 10px;
    }
    .know-header-right-search::before{
        content: "\f2a7";
    }
    .k-h-r-s-d{
        display: inline-block;
        width: 0px;
        border-bottom: 1px solid #e8eaec;
        margin-left: 0px;
        transform-origin:  bottom right;
        transition: all 0.5s;
    }
    .know-header-right-search-input{
        border-width: 0;
        height: 20px;
        outline: none;
        padding-left: 3px;
        width: 100%;
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