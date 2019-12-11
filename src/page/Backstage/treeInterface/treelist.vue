/**
*
*  @author ZTiger
*
*/


<template>
    <div id="know-tree-list">
        <div class="know-tree-list-header-title">
            目录
        </div>
        <Layout>
            <Header class="know-tree-default know-tree-header-select">
                <Tooltip content='添加'>
                    <div class="know-tree-header-button know-tree-header-button-add">
                        <Icon type="ios-add" />
                    </div>
                </Tooltip>
                <Tooltip content='删除'>
                    <div class="know-tree-header-button know-tree-header-button-del" @click="buttonFlagFun">
                        <Icon type="ios-remove" />
                    </div>
                </Tooltip>
                <Tooltip content='编辑'>
                    <div class="know-tree-header-button know-tree-header-button-exit">
                        <Icon type="md-create" />
                    </div>
                </Tooltip>

            </Header>
            <Content class="know-tree-default">Content</Content>
        </Layout>
        <modal-d :DelModalFlag='buttonDelFlag' :selectNodeName='selectNodeName'></modal-d>
    </div>
</template>

<script>
    //导入 删除 遮罩层
    import modalD from './modalADE/modalD'
    export default {
        components:{modalD},
        data() {
            return {
                buttonDelFlag:'',
                selectNodeName:'<h1>24322342333</h1>'
            };
        },
        methods:{
            buttonFlagFun(){
                this.buttonDelFlag = Math.random();
            }
        }
    }
</script>

<style  scoped>
    .know-tree-list-header-title{
        letter-spacing: 0.5em;
        text-indent: 1em;
        font-family: 华文行楷;
        font-size: 25px;
        line-height: 30px;
        padding: 3px;
        background-color: #2d8cf0;
        color: #fff;
        border-radius: 5px;
    }
    .know-tree-default{
        background-color:#f8f8f9;
        border-radius: 5px;
        border: 1px solid #dcdee2;
        margin-top: 10px;
    }
    .know-tree-header-select{
        height: 50px;
        padding: 0;
        text-align: center;
        line-height: 50px;
        box-shadow: 0 0 5px #e8eaec;
    }
    .know-tree-header-button{
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
</style>