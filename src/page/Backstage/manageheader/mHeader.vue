/**
*
*  @author ZTiger
*
*/


<template>
   <div class="know-header">
        <div class="know-header-left">
            <span class="know-mange-header-logo"></span>
            <span class="know-header-left-title">Knowledge Graph</span>
        </div>
        <div class="know-header-right">
            <span class="know-header-right-span know-header-right-span-search"></span>
            <span   class="know-header-right-span know-header-right-span-svg" v-html="svg"></span>
            <span class="know-header-right-username know-header-right-span">{{username}}</span>
        </div>
   </div>
</template>


<script>
    import Avatars from '@dicebear/avatars';
    import sprites from '@dicebear/avatars-identicon-sprites';
   export default {
       data() {
           return {
               //用户名称
               username:JSON.parse(sessionStorage.getItem('user')).username,
               //用户头像
               svg:''
           }
       },
       methods:{
            createUserSvg(){
                let options = {
                    padding: 0,
                    background: '#e8eaec',
                };
                let avatars = new Avatars(sprites(options));
                this.svg = avatars.create(this.username);
           }
       },
       mounted(){
           this.createUserSvg();
       }
   }
</script>


<style >
    .know-header{
        margin-top: 15px;
        height: 30px;
    }
    .know-mange-header-logo{
        background-image: url('../../../assets/images/logo.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: inline-block;
        width: 25px;
        height: 25px;
        margin-right:20px; 
    }
    .know-header-left{
        display: inline;
    }
    .know-header-left-title{
        font-size: 20px;
        height: 25px;
        font-family:Georgia;
        user-select: none;
    }
    .know-header-right{
        display: inline-block;
        float: right;
        
        height: 25px;
    }
    .know-header-right-span{
        margin-left:10px; 
    }
    .know-header-right-username{
        display: inline;
        font-family: Georgia;
        font-size: 19px;
        text-transform:capitalize;
        cursor: pointer;
        position: relative;
    }
    .know-header-right-username::before{
        content: "";
        position: absolute;
        background-color: #2db7f5;
        top: 100%;
        left: 50%;
        height: 2px;    
        width: 0;
        transition: all 0.5s;
    }
    .know-header-right-username:hover::before{
        width: 100%;
        left: 0%;
    }
    .know-header-right-span-search{
        margin-right:15px; 
    }
    .know-header-right-span-svg{
        margin-top: 10px;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 2px
        /* vertical-align: bottom; */
    }

</style>