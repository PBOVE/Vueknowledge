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
                <Dropdown @on-click='clickListevent'>
                    <span class="know-header-right-user-name">{{username}}</span>
                    <DropdownMenu slot="list" class="know-header-right-list">
                        <DropdownItem name='1'>密码修改</DropdownItem>
                        <DropdownItem name='0' divided>退出登录</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
           </div>
        </div>
        <change-password :modalCFalg='changePasswordFlag'></change-password>
   </div>
</template>


<script>
    import changePassword from './modalChangPassword'
   export default {
       components:{changePassword},
       data() {
           return {
               //用户名称
                username:JSON.parse(sessionStorage.getItem('user')).username,
               //随机背景颜色
                color:['#ff4e50','#84B1ED','#00dffc','#0080ff','#f9d423','#5A9367','#56A902'],
                // 修改密码 遮罩层 标志位
                changePasswordFlag:''
           }
       },
       methods:{
           //创建用户 色彩 头像
           createUserLogo(){
               this.$refs.userLogo.innerHTML = this.username.charAt(0).toUpperCase();
               this.$refs.userLogo.style.backgroundColor = this.color[Math.floor(Math.random()*7)];
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
           },
           //点击菜单事件
           clickListevent(name){
                // window.console.log(typeof name);
                switch(name){
                    case '0':
                       this.post_json('user/logout').then(()=>{
                           this.$store.commit('delToken');
                           this.$router.push({path:'/'});
                       })
                       break;
                    case '1':
                        this.changePasswordFlag=Math.random();
                        break;
               }
           }
       },
       mounted(){
           this.createUserLogo();
       }
   }
</script>


<style>
    .know-header{
        display: flex;
        justify-content:space-between;
        align-items: center;
        height: 60px;
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
        line-height: 60px;
    }
    .know-header-right-user{
        display: inline-block;
        height: 60px;
        padding: 0 20px;
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
        margin-right: 20px;
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
    .ivu-select-dropdown{
        margin:5px 0 5px -35px; 
    }
    .ivu-select-dropdown .ivu-dropdown-item{
        color: #000;
        font-family: 微软雅黑;
        letter-spacing: 0.5em;
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