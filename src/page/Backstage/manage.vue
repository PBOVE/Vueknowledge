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
            <Split v-model="splitinit" min='300px' max='500px' >
                <div slot="left" class="know-manage-split-pane">
                    <tree-list :InnerHeight='InnerHeight-HeaderHeight'></tree-list>
                </div>
                <div slot="right" class="know-manage-split-pane">
                    右
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
    export default {
        components:{treeList,mHeader},
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
                // window.console.log(val)
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
        height: 70px; 
        padding: 0 50px;
    }
    .know-manage-split{
        height: 200px;
        border: 1px solid #dcdee2;
        background-color: #f5f7f9;
    }
    .know-manage-split-pane{
        padding: 10px;
        height: 100%;
    }
    
</style>
