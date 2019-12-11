/**
*
*  @author ZTiger
*
*/

<template>
    <Layout>
        <Header class="know-manage-default know-manage-header"><Icon type="ios-analytics" />&nbsp;&nbsp;知识图谱</Header>
        <div class="know-manage-split" id='knowManageSplit'>
            <Split v-model="splitinit" min='300px' max='500px' >
                <div slot="left" class="know-manage-split-pane">
                    <tree-list></tree-list>
                </div>
                <div slot="right" class="know-manage-split-pane">
                    右
                </div>
            </Split>
        </div>
    </Layout>
</template>


<script>
    //导入tree 模板
    import treeList from './treeInterface/treelist'
    export default {
        components:{treeList},
        data() {
            return {
                // 初始化 面板分割
                splitinit: 0.25,
                // 获取 innerHeight
                InnerHeight:'',
                // 获取 innerWidth
                InnerWidth:'',
                // header 高度
                HeaderHeight:70
            }
        },
        methods:{
            //获取 浏览器 高度
            getInner(){
                this.InnerHeight = window.innerHeight;
                this.InnerWidth= window.innerWidth;
            }
        },
        mounted(){

            this.InnerHeight = window.innerHeight;
            this.InnerWidth= window.innerWidth;
            window.addEventListener('resize',this.getInner);
        },
        beforeDestroy(){
            window.removeEventListener('resize',this.getInner);
        },
        watch:{
            InnerHeight(val){
                // window.console.log(this.$refs.knowManageSplit)
              document.getElementById('knowManageSplit').style.height = val - this.HeaderHeight + 'px';
            }
        }
    }
</script>


<style >
    .know-manage-default{
        background-color:#fff;
    }
    .know-manage-header{
        font-size: 40px;
        font-family: 华文行楷;
        user-select: none;
        height: 70px;
        line-height: 75px
    }
    .know-manage-split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .know-manage-split-pane{
        padding: 10px;
        height: 100%;
    }
</style>
