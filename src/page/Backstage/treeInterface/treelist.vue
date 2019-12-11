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
                    <Button type="primary" icon="ios-add" class="know-tree-header-button"></Button>
                </Tooltip>
                <Tooltip content='删除'>
                    <Button type="error"  icon="ios-remove"  class="know-tree-header-button" @click="buttonFlagFun"></Button>
                </Tooltip>
                <Tooltip content='编辑'>
                    <Button type="dashed"  icon='md-create'  class="know-tree-header-button"></Button>
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
                selectNodeName:'<h1>243223423333</h1>'
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
        margin:0 15px;
    }
</style>