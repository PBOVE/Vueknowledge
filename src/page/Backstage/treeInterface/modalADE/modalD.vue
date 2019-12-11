/**
*
*  @author ZTiger
*
*/


<template>
    <Modal v-model="modalFlag" width="360">
        <p slot="header" class="know-modal-header">
            <Icon type="ios-information-circle"></Icon>
            <span>&nbsp;&nbsp;删&nbsp;除&nbsp;节&nbsp;点</span>
        </p>
        <div class="know-modal-text">
            <p>你确定要此删除节点吗?</p>
            <p><strong>{{selectNodeName.length>20?selectNodeName.substr(0,20):selectNodeName}}</strong></p>
            <!-- <p class="Tips">按&nbsp;<strong>ctrl&nbsp;+&nbsp;enter</strong>&nbsp;接受并关闭面板</p> -->
        </div>
        <div slot="footer">
            <Button type="primary" size="large" @click='modalFlag=false'>取&nbsp;消</Button>
            <Button type="error" size="large" @click.stop="userDelfun" >删&nbsp;除</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props:['DelModalFlag','selectNodeName'],
        data() {
            return {
                modalFlag:false
            };
        },
        watch:{
            //监听 treelist 传过来的标志符
            DelModalFlag(){
                this.modalFlag = true;
            }
        },
        methods:{
            //点击 删除 按键
            userDelfun(){
                this.modalFlag = false;
                window.console.log(12312);
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
    .know-modal-text{
        text-align:center;
    }
    .Tips{
        color: #c5c8ce;
    }
</style>