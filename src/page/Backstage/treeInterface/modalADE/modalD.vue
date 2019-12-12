/**
*
*  @author ZTiger
*
*/


<template>
    <Modal v-model="modalFlag" width="360" :mask-closable='false'>
        <p slot="header" class="know-modal-header">
            <Icon type="ios-information-circle"></Icon>
            <span>&nbsp;&nbsp;删&nbsp;除&nbsp;节&nbsp;点</span>
        </p>
        <div class="know-modal-text">
            <p>你确定要此删除节点吗?</p>
            <p>{{selectNodeName.length>20?selectNodeName.substr(0,20):selectNodeName}}</p>
        </div>
        <div slot="footer">
            <Button type="text"  @click='modalFlag=false'>取&nbsp;消</Button>
            <Button type="error"  @click.stop="userDelfun" >删&nbsp;除</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props:['DelModalFlag','selectNodeName'],
        data() {
            return {
                // modal标志位
                modalFlag:false
            };
        },
        watch:{
            //监听 treelist 传过来的标志符
            DelModalFlag(){
                this.modalFlag = true;
            },
            // 监听 modalflag = true
            modalFlag(val){
                if(val){
                    document.addEventListener('keyup',this.upCtrlEnter);
                }else{
                    document.removeEventListener('keyup',this.upCtrlEnter);
                }
            }
        },
        methods:{
            //点击 删除 按键
            userDelfun(){

                this.modalFlag = false;
                window.console.log(12312);
            },
            //监听 ctrl + ender 按键 执行函数
            upCtrlEnter(e){
                if (e.ctrlKey && e.keyCode == 13){
                    this.userDelfun()
                }
            }
        }
    }
</script>

<style  scoped>
    .know-modal-header{
        color:#f60;
        text-align:center;
        user-select: none;
    }
    .know-modal-text p:nth-of-type(2){
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
    .know-modal-text p:nth-of-type(3){
        text-align: center;
    }
    .Tips{
        color: #c5c8ce;
    }
</style>