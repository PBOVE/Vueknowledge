/**
*
*  @author ZTiger
*
*/


<template>
    <Modal v-model="modalFlag" width="360" :mask-closable='false'>
        <p slot="header" class="know-modal-header">
            <Icon type="ios-information-circle"></Icon>
            <span>&nbsp;&nbsp;编&nbsp;辑&nbsp;节&nbsp;点</span>
        </p>
        <div class="know-modal-text">
            <p>编&nbsp;辑&nbsp;:&nbsp;<strong>{{selectNodeName.length>20?selectNodeName.substr(0,20):selectNodeName}}</strong></p>
            <p><Input type="text" ref="modalExitInput" autofocus/></p>
            <p class="Tips">按&nbsp;<strong>ctrl&nbsp;+&nbsp;enter</strong>&nbsp;接受并关闭面板</p>
        </div>
        <div slot="footer">
            <Button type="text"  @click='modalFlag=false'>取&nbsp;消</Button>
            <Button type="primary"  @click.stop="userExitfun" >编&nbsp;辑</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props:['ExitModalFalg','selectNodeName'],
        data() {
            return {
                 // modal标志位
                modalFlag:false
            };
        },
        methods:{
            // 点击 编辑 节点
            userExitfun(){
                this.modalFlag = false;
            },
            //监听 ctrl + ender 按键 执行函数
            upCtrlEnter(e){
                if (e.ctrlKey && e.keyCode == 13){
                    this.userExitfun()
                }
            }
        },
        watch:{
             // 监听 treelist 事件
            ExitModalFalg(){
                this.modalFlag = true;
                this.$nextTick(() => {
                    this.$refs.modalExitInput.focus();
                })
            },
            // 监听 modalflag = true
            modalFlag(val){
                if(val){
                    document.addEventListener('keyup',this.upCtrlEnter);
                }else{
                    document.removeEventListener('keyup',this.upCtrlEnter);
                }
            }
        }
    }
</script>

<style  scoped>
    .know-modal-header{
        text-align: center;
    }
    .Tips{
        color: #c5c8ce;
    }
</style>