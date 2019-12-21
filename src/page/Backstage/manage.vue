/**
*
*  @author ZTiger
*
*/


<template>
    <div>
        <div class="know-manage-header">
            <m-header></m-header>
        </div>
        <div class="know-manage-split" id='knowManageSplit'>
            <Split v-model="splitinit" :min='splitMin' :max='splitMax'>
                <div slot="left" class="know-manage-split-pane">
                    <tree-list
                        ref='treelist'
                        :InnerHeight='InnerHeight-HeaderHeight'
                        @MangageCallback='MangageCallback'
                    ></tree-list>
                </div>
                <div slot="right" class="know-manage-split-pane know-manage-split-pane-right" >
                    <operate-main
                        :InnerHeight='InnerHeight-HeaderHeight'
                        :treeNode='treeNode'
                        @MangageCallback='MangageCallback'
                    ></operate-main>
                </div>
            </Split>
        </div>
    </div>
</template>


<script>
    //导入tree 模板
    import treeList from './treeInterface/treelist'
    //导入 header 模板
    import mHeader from './manageheader/mHeader'
    // 导入 操作 模板
    import operateMain from './operate/operateMain'
    export default {
        components:{treeList,mHeader,operateMain},
        data() {
            return {
                // 初始化 面板分割
                splitinit: 0.25,
                // 获取 innerHeight
                InnerHeight:'',
                // 获取 innerWidth
                InnerWidth:'',
                // header 高度
                HeaderHeight:61,
                // Split 最小宽度
                splitMin: '300px',
                //Split 最大宽度
                splitMax: '500px',
                //树节点
                treeNode:''
            }
        },
        methods:{
            //获取 浏览器 高度
            getInner(){
                this.InnerHeight = window.innerHeight;
                this.InnerWidth= window.innerWidth;
            },
            // 子组件 调用函数
            MangageCallback(type,val){
                const statusMap ={
                    1:()=>{
                        this.treeNode = val;
                    },
                    2: () =>{
                        this.$refs.treelist.TLCallback(3,val);
                    }
                };
                statusMap[type]();
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
              document.getElementById('knowManageSplit').style.height = val - this.HeaderHeight + 'px';
            },
            InnerWidth(val){
                if(val<800){
                    this.splitMax = '40px';
                    this.splitinit = 1;
                }else{
                     this.splitMax = '500px';
                     this.splitinit = 0.25;
                }
            }
        }
    }
</script>


<style >
    .know-manage-default{
        background-color:#fff;
    }
    .know-manage-header{
        min-width:300px;
        height: 60px;
        padding: 0 50px;
    }
    .know-manage-split{
        height: 200px;
        border: 1px solid #dcdee2;
        background-color: #f5f7f9;
    }
    .know-manage-split-pane{
        padding: 0px;
        height: 100%;
    }
    .know-manage-split-pane-right{
        padding-left: 6px;
    }
    @media screen and (max-width: 800px){
        .know-manage-split-pane-right{
            display: none;
        }
        .right-pane.ivu-split-pane{
            display: none;
        }
        .ivu-split-trigger-con{
            display: none;
        }
    }
</style>
