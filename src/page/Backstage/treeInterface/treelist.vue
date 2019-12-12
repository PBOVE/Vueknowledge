/**
*
*  @author ZTiger
*
*/


<template>
    <div id="know-tree-list">
        <div class="know-tree-list-header-title">类层次结构</div>
        <Layout>
            <Header class="know-tree-default know-tree-header-select">
                <Tooltip content='添加'>
                    <div class="know-tree-header-button know-tree-header-button-add" @click="buttonFlagFun(1)">
                        <Icon type="ios-add" />
                    </div>
                </Tooltip>
                <Tooltip content='删除'>
                    <div class="know-tree-header-button know-tree-header-button-del" @click="buttonFlagFun(2)">
                        <Icon type="ios-remove" />
                    </div>
                </Tooltip>
                <Tooltip content='编辑'>
                    <div class="know-tree-header-button know-tree-header-button-exit" @click="buttonFlagFun(3)">
                        <Icon type="md-create" />
                    </div>
                </Tooltip>

            </Header>
            <Content class="know-tree-default know-tree-main-content" :style="{height:setTreeClientHeight}">
                <tree-z></tree-z>
            </Content>
        </Layout>
        <modal-a :AddModalFlag='buttonAddFlag'></modal-a>
        <modal-d :DelModalFlag='buttonDelFlag' :selectNodeName='selectNodeName'></modal-d>
        <modal-e :ExitModalFalg='buttonExitFlag' :selectNodeName='selectNodeName'></modal-e>
    </div>
</template>

<script>
    // 导入 删除 modal
    import modalD from './modalADE/modalD'
    // 导入 添加 modal
    import modalA from './modalADE/modalA'
    // 导入 编辑 modeal
    import modalE from './modalADE/modalE'
    // 导入 树
    import treeZ from './tree/treeJquery'
    export default {
        components:{modalD,modalA,modalE,treeZ},
        props:['InnerHeight'],
        data() {
            return {
                // 点击 添加标志 位
                buttonAddFlag:'',
                // 点击 删除标志 位
                buttonDelFlag:'',
                // 点击 编辑标志 位
                buttonExitFlag:'',
                // 删除 节点
                selectNodeName:'<h1>24322342333</h1>',
                // 设置top高度
                TopHeight:126
            };
        },
        methods:{
            //modal 层 标志位
            buttonFlagFun(val){
                switch(val){
                    case 1:
                        this.buttonAddFlag = Math.random();
                        break;
                    case 2:
                        this.buttonDelFlag = Math.random();
                        break;
                    case 3:
                        this.buttonExitFlag = Math.random();
                }
            }
        },
        computed:{
            //设置 树 可视区 高度
            setTreeClientHeight(){
                return this.InnerHeight - this.TopHeight + 'px';
            }
        }
    }
</script>

<style  scoped>
    .know-tree-list-header-title{
        text-indent: 0.5em;
        font-family: 楷体;
        font-size: 25px;
        line-height: 30px;
        border-radius: 5px;
    }
    .know-tree-default{
        background-color:#f5f7f9;
        border-radius: 5px;
    }
    .know-tree-header-select{
        height: 50px;
        padding: 0;
        line-height: 50px;
        /* box-shadow: 0 0 5px #e8eaec; */
    }
    .know-tree-header-button{
        text-align: center;
        font-size: 20px;
        line-height: 30px;
        margin:0 15px;
        box-sizing: border-box;
        height: 32px;
        width: 32px;
        border-radius: 5px;
        border-width: 1px;
        outline: none;
        cursor: pointer;
    }
    .know-tree-header-button-add{
        color: #f2f2f2;
        border-style: solid;
        border-color: #2d8cf0;
        background-color: #2d8cf0;
    }
    .know-tree-header-button-add:focus{
        box-shadow: 0 0 0 2px rgba(45,140,240,.2);
    }
    .know-tree-header-button-add:hover{
        color: #ffffff;
        border-color: #57a3f3;
        background-color: #57a3f3;
    }
    .know-tree-header-button-del{
        color: #f2f2f2;
        border-style: solid;
        background-color: #ed4014;
        border-color: #ed4014;
    }
    .know-tree-header-button-del:hover{
        color: #ffffff;
        background-color: #f16643;
        border-color: #f16643;
    }
    .know-tree-header-button-del:active{
        box-shadow: 0 0 0 2px rgba(237,64,20,.2);
    }
    .know-tree-header-button-exit{
        color: #515a6e;
        background-color: #ffffff;
        border-color: #dcdee2;
        border-style: dashed;
    }
    .know-tree-header-button-exit:hover{
        color: #57a3f3;
        border-color: #57a3f3;
    }
    .know-tree-header-button-exit:focus{
        box-shadow: 0 0 0 2px rgba(45,140,240,.2);
    }
    .know-tree-main-content{
        box-shadow: 0 0 5px #e8eaec;
        padding: 10px;
        box-sizing: border-box;
    }
</style>