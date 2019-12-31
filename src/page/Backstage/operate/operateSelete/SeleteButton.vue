/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-operate-header">
      <div class="know-operate-header-button"
        @click="clickButton(1,selectNum)"
        :class="{'know-operate-header-button-select':selectNum === 1}">
          <div  class="know-operate-header-button-icon">
            <Icon type="ios-list-box-outline" size='20'/>
          </div>
          <div class="know-operate-header-button-title">详情</div>
      </div>

      <div class="know-operate-header-button"
        @click="clickButton(2,selectNum)"
        :class="{'know-operate-header-button-select':selectNum === 2}">
        <div  class="know-operate-header-button-icon">
          <i class="icon-lidaotu iconfont"></i>
        </div>
        <div class="know-operate-header-button-title">
          力导图
        </div>
      </div>
      <div class="know-operate-header-button"
        @click="clickButton(3,selectNum)"
        :class="{'know-operate-header-button-select':selectNum === 3}">
        <div  class="know-operate-header-button-icon">
          <i class="icon-shutu iconfont"></i>
        </div>
        <div class="know-operate-header-button-title">
          树图
        </div>

      </div>

      <div class="know-operate-header-button"
        @click="clickButton(4,selectNum)" 
        :class="{'know-operate-header-button-select':selectNum === 4}">
        <div  class="know-operate-header-button-icon">
          <Icon type="ios-time-outline" size='20' />
        </div>
        <div class="know-operate-header-button-title">
          日志
        </div>

      </div>

      <div class="know-operate-header-button"
        @click="clickButton(5,selectNum)"
        :class="{'know-operate-header-button-select':selectNum === 5}">
        <div  class="know-operate-header-button-icon">
          <Icon type="ios-paper-outline" size='20' />
        </div>
        <div class="know-operate-header-button-title">
          富文本
        </div>
      </div>

  </div>
</template>

<script>
export default {
  props:['showClientFlag'],
  data() {
    return {
      selectNum:0
    };
  },
  methods:{
    // 按钮点击事件
    clickButton(newval,oldval){
      if(newval === oldval||!this.showClientFlag)
        return;
      this.selectNum = newval;
      this.$emit('oMainCallback',1,newval);
    },
    // 设置按钮 数值
    setSelectNum(val){
      this.selectNum = val;
    }
  },
  watch:{
    showClientFlag(val){
      if(!val){
        this.selectNum = 0;
      }
    }
  }
};
</script>

<style  scoped>
@font-face {font-family: "iconfont";
  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAPoAAsAAAAAB/QAAAOcAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqDWIMnATYCJAMMCwgABCAFhG0HORvwBlGUDUqL7EdCVRndhTPqKEdOTUkdGo+Ggc965zcR0K/99sndF0waJNHE0L15Eo1400oj4i0TCiEx3Uu4/6vLfo1wiuwK4A6gmshLurHyDb7lZf/XNCUWshGqJKuQxvYwB5S+NH8gtNrB5fRb4vOAcpl7YIBxQAGNtSlKtEgS8oaxC1riYQKaBtlDS7vLBzRl5qiAcBGHDjQzCrkhPagLyoqFObw0r1CPE/E+8BB8P/zDdGiCqEhgHrVxtPVh8RW/xiRSEftpyP10OrBlJEwBmXBYadhWiQJT+JqqoNocX8qCOJW7qggYGq+0/vCIAqEEM7UVjCFX5MthJMIYyLpq5sOJShR6A7Y+NETqwU8hKCIsFFKltGfTI+YJeUw/NJRNnj6/Hyi3cQxDaJo1VcDdgQtn5PLGHJbNQAqazoC3c1wmx6QrkerYpXvyHppOW65RdJSNvk2bbGEiTvmV7wc5Nzi3YyzOlbfcimU7d549uu3SrTsHdNY/Lj/5VPVsasIFhVmySW/qkKEKlR7wyazoyDwO/OTY/iZRbJ1s5W7wuv2c9lUTe53/JiTau1gSGFZiU31qPJGY/NexN72ifa79daLYKtkab/qm/Vw4ystFEf+NZLgmF/OwsIhC2KJ6VizEvMI7Zdjov8nUt90m4PGHhKHsbAjLwpma65V2ZMivsGZtGj76c8LAYK2xIibj7KkiP2+ZfWVs3bwsDOW0kwpD+zi7XHz8ndq1ppv6rpSks4skPdnaMmHKrmym7dI1NFozEAknzwf+l50bP99Kj4b7LdgAVV/1AX+oWqi6qpDufuZpnnt1YqyB/7+6XADwadqbBYxutO4pqIt3JvTrZPl+A7LI0dimPGUl8QNk1QIOJxtqL6ZcUxMVYEu3t8Mlfa9HF9QzTAZRzQAkdUOojJuCQosZKNXNQtOkqOUtejSrCFkKTBgBEHQ6BFG7d0g6PUBl3Bso9PsGpc5QgabNoLZhi5EQt8OEHCUfS/6wyuMisNXaDtPfKDSZI2l2gP8iecZudHF0zof3VJBMMaXlO5y1aoCUcI6R4DjKMsZG4YQ8HVWqPuZOTlTVi0alnEPbIkEcivhQiT+oiocVAq+5ahc+/4aEjIxDGuqqlF+IeIrbRy4cOXdA7QVFp7pbeabFt9BMKxVAFMFyKBLoSGYFGGqs7pcgHjVSOcD3MOeEGlFdBaPlRfn7bYEmc+cUeIiPBFBcRkZNozb2HVYDAA==') format('woff2');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-shutu:before {
  content: "\e649";
}
.icon-lidaotu:before {
  content: "\e602";
}
.know-operate-header{
  display: flex;
  justify-content: flex-start;
  align-items:center;
  height: 50px;
}
.know-operate-header-button{
  box-sizing: border-box;
  height: 40px;
  width: 80px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;
}
.know-operate-header-button:hover{
  transition: background-color 0.5s;
  background-color:#e8eaec;
}
.know-operate-header-button:hover .ivu-icon,.know-operate-header-button:hover .iconfont{
  color: #2d8cf0;
}
.know-operate-header-button-title{
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-indent: 0.3em;
}
.know-operate-header-button-icon{
  display: inline-block;
}
.know-operate-header-button-select{
  color: #2d8cf0;
}
</style>