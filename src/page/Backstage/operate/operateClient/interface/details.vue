/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-operate-details">
    <div class="know-operate-details-default">
      <div class="know-operate-details-title">属性&nbsp;:</div>
      <div class="know-details-name">
        <div class="know-details-left">
          <Icon type="md-list" color="#19be6b" />
          <input
            type="text"
            class="k-d-i treeNodeName"
            @click="CShowInput"
            @blur="BShowInput"
            :value="treeNode.name"
          />
        </div>
      </div>

      <div class="know-details-name" v-for="(item,index) in AttrButeData" :key="index">
        <div class="know-details-left">
          <Icon type="md-list" color="#19be6b" />
          <input
            type="text"
            class="k-d-i exitAttr"
            :id="'attr_'+ index"
            @click="CShowInput"
            @blur="BShowInput"
            :value="item"
          />
        </div>
        <div class="know-details-right">
          <Icon
            type="ios-close"
            class="know-datails-del"
            :id="'delAttr_'+index"
            @click="delAttrData"
            size="20"
          />
        </div>
      </div>

      <div class="know-details-name">
        <div class="know-details-left">
          <Icon type="md-list-box" color="#808695" />
          <input
            type="text"
            placeholder="请输入属性"
            class="k-d-i Ilabel"
            @click="CShowInput"
            @blur="BShowInput"
          />
        </div>
      </div>
    </div>
    <div class="know-operate-details-default">
      <div class="know-operate-details-title">关系&nbsp;:</div>
      <div class="know-details-relation" v-for="(item,index) in relationData" :key="index">
        <div class="know-details-relation-I">
          <Icon type="md-funnel" color="#19be6b" />
          <input
            type="text"
            :id="'relation'+index"
            class="k-d-i relationI"
            @click="CShowInput"
            @blur="BShowInput"
            :value="item.name"
          />
        </div>
        <div class="know-details-relation-II">
          <Icon type="md-list" color="#19be6b" />
          <input
            type="text"
            class="k-d-i"
            @click="CShowInput"
            @blur="BShowInput"
            :value="item.text"
          />
        </div>
        <div class="know-details-relation-III">
          <Icon
            type="ios-close"
            class="know-datails-del"
            size="20"
            :id="'relation_'+index"
            @click="delRelationData"
          />
        </div>
      </div>
      <div class="know-details-relation">
        <div class="know-details-relation-I">
          <Icon type="md-list-box" color="#808695" />
          <input
            type="text"
            ref="RII"
            placeholder="请输入关系"
            class="k-d-i relationadd"
            @click="CShowInput"
            @blur="BShowInput"
          />
        </div>
        <div class="know-details-relation-II">
          <Icon type="md-git-commit" color="#808695" />
          <AutoComplete
            v-model.lazy="RaNodeinput"
            class="relationInput-II"
            :data="searchdata"
            @on-change='ChangeSearch'
            @on-focus='CSerachshowInput'
            @on-blur = 'CSerchBlurInput'
            placeholder="请输入节点名称 "
            element-id='relationadd-id'
            size ='default'
          ></AutoComplete>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["treeNode", "showSelectNum"],
  data() {
    return {
      // 获取输入框node数据
      RaNodeinput: "",
      //节点名称输入
      InputNode: "",
      //请求数据标志位
      getDataFlag: false,
      // 点击inpul 获取val 防止输入空格
      oldAttrInputVal: "",
      // 获取 服务器数据
      AttrButeData: [],
      relationData: [],
      // 请求联想框数据
      searchdata:[],

    };
  },
  methods: {
    // 获取 服务器 节点属性 节点关系
    getAttriBute() {
      if (this.getDataFlag) return;
      this.getDataFlag = true;
      let url = "node/" + this.treeNode.id;
      this.get(url)
        .then(res => {
          this.AttrButeData = res.data.labels;
        })
        .then(() => {
          let url = "relation/start/name";
          let obj = {
            query: this.treeNode.name
          };
          this.get(url, obj).then(res => {
            let data = res.data;
            this.relationData = [];
            data.forEach(item => {
              this.relationData.push({
                id: item.id,
                name: item.property.type,
                text: item.node.name,
                textId: item.node.id
              });
            });
          });
        }).catch(()=>{
        })
    },
    //点击 事件
    CShowInput(e) {
      let target = e.target;
      let Ptarget = target.parentNode;
      target.focus();
      Ptarget.style.outline = "1px solid #2db7f5";
      this.oldAttrInputVal = target.value;
    },
    // 搜索框点击事件
    CSerachshowInput(e){
      let target = e.target;
      let Ptarget = target.parentNode.parentNode.parentNode.parentNode;
      target.style.borderBottom = '1px solid #2db7f5'
      Ptarget.style.outline = "1px solid #2db7f5";
      this.searchdata = [];
    },
    // 搜索框失去焦点事件
    CSerchBlurInput(e){
      let target = e.target;
      let Ptarget = target.parentNode.parentNode.parentNode.parentNode; 
      target.style.borderBottom = '1px solid #e8eaec'
      Ptarget.style.outline = "none";
      // this.addrelation();
       this.$nextTick(() => {
         this.addrelation()
       })
    },
    //失去焦点事件
    BShowInput(e) {
      let target = e.target;
      let Ptarget = target.parentNode;
      let Ival = target.value.replace(/^\s+|\s+$/g, "");
      Ptarget.style.outline = "none";
      if (Ival === "") {
        target.value = this.oldAttrInputVal;
        return;
      }
      if (target.classList.contains("treeNodeName")) {
        this.changName(Ival);
      } else if (target.classList.contains("Ilabel")) {
        this.addLabels(Ival, target);
      } else if (target.classList.contains("exitAttr")) {
        this.changExit(Ival, target);
      } else if (target.classList.contains("relationadd")) {
        this.addrelation();
      } else if (target.classList.contains("relationI")) {
        this.putRelationAttr(Ival, target);
      }
    },
    // 改变名称 进入的函数
    changName(Ival) {
      if (Ival !== this.treeNode.name) {
        let url = "node/" + this.treeNode.id + "/name";
        this.patch_json(url, { name: Ival })
          .then(res => {
            this.$emit("SClientCallback", 1, res.data.name);
          }).catch(()=>{
        })
      }
    },
    // 添加 属性
    addLabels(Ival, target) { 
      this.AttrButeData.push(Ival);
      let url = "node/" + this.treeNode.id;
      let obj = {
        name: this.treeNode.name,
        labels: this.AttrButeData
      };
      this.put_json(url, obj)
        .then(() => {
          target.value = ""; 
          // 重新 获取日志
          this.$emit("SClientCallback", 4)
        }).catch(()=>{
           this.AttrButeData.pop();
        })
    },
    //改变属性名称
    changExit(Ival, target) {
      let id = target.getAttribute("id").substring(5);
      let oldVal = this.AttrButeData[id];
      if (Ival === this.AttrButeData[id]) return;
      this.$set(this.AttrButeData, id, Ival);
      let url = "node/" + this.treeNode.id;
      let obj = {
        name: this.treeNode.name,
        labels: this.AttrButeData
      };
      this.put_json(url, obj)
        .then(() => { 
          // 重新 获取日志
          this.$emit("SClientCallback", 4)
        })
        .catch(() => {
         
          this.$set(this.AttrButeData, id, oldVal);
        });
    },
    // 删除属性数据
    delAttrData(e) {
      let target = e.target;
      let id = target.getAttribute("id").substring(8);
      let oldAttr = this.AttrButeData[id];
      this.AttrButeData.splice(id, 1);
      let url = "node/" + this.treeNode.id;
      let obj = {
        name: this.treeNode.name,
        labels: this.AttrButeData
      };
      this.put_json(url, obj)
        .then(() => {
          // 重新 获取日志
          this.$emit("SClientCallback", 4)
        })
        .catch(() => {
          
          this.AttrButeData.splice(id, 0, oldAttr);
        });
    },
    // 添加 关系 数据
    addrelation() {
      let RII = this.$refs.RII;
      let RIII = this.RaNodeinput;
      let Ival = RII.value.replace(/^\s+|\s+$/g, "");
      let IIval = RIII.replace(/^\s+|\s+$/g, "");
      if (Ival !== "" && IIval !== "") {
        let url = "relation";
        let obj = {
          startNode: this.treeNode.name,
          endNode: IIval,
          property: {
            type: Ival
          }
        };
        this.post_json(url, JSON.stringify(obj))
          .then(res => {
            let data = res.data;
            this.relationData.push({
              id: data.id,
              name: data.property.type,
              text: data.node.name,
              textId: data.node.id
            });
            RII.value = "";
            this.RaNodeinput = "";
            // 力导图 树图 从新请求数据
            this.$emit("SClientCallback", 2);
          }).catch(()=>{
        })
      }
    },
    // 删除 关系 数据
    delRelationData(e) {
      let target = e.target;
      let index = target.getAttribute("id").substring(9);
      let url = "relation/" + this.relationData[index].id;
      this.delete_string(url)
        .then(() => {
          this.relationData.splice(index, 1);
          // 力导图 树图 从新请求数据
          this.$emit("SClientCallback", 2);
        }).catch(()=>{})
    },
    // 更新 关系 属性
    putRelationAttr(Ival, target) {
      let index = target.getAttribute("id").substring(8);
      if (Ival === this.relationData[index].name) return;
      let url = "relation/" + this.relationData[index].id;
      let obj = {
        startNode: this.treeNode.name,
        endNode: this.relationData[index].text,
        property: {
          type: Ival
        }
      };
      this.put_json(url, obj)
        .then(res => {
          let data = res.data;
          this.$set(this.relationData, index, {
            id: data.id,
            name: data.property.type,
            text: data.node.name,
            textId: data.node.id
          });
          // 力导图 树图 从新请求数据
          this.$emit("SClientCallback", 2);
        }).catch(()=>{
        })
    },
    // 根据节点 name 模糊匹配返回节点列表
    getVagueName(val) {
      let url = "node/name";
      let obj = {
        query: val,
        size:6
      };
      this.get(url, obj).then(res => {
        let data =  res.data.content;
        this.searchdata = [];
        data.forEach(item=>{
          this.searchdata.push(item.name);
        })
      }).catch(()=>{
        });
    },
    // 搜索框change事件时调用
    ChangeSearch(){
      let Ival = this.RaNodeinput.replace(/^\s+|\s+$/g, "");
      if (Ival === "" ) return;
      this.getVagueName(Ival);
    }
  },
  watch: {
    treeNode: {
      handler: function(newval, oldval) {
        if (newval === "" || newval.id === oldval.id) return;
        this.getDataFlag = false;
        this.RaNodeinput = "";
        if (this.showSelectNum === 1) {
          this.getAttriBute();
        }
      },
      deep: true
    },
    showSelectNum(val) {
      if (val !== 1) return;
      this.getAttriBute();
    },
  }
};
</script>

<style>
.know-operate-details {
  position: relative;
}
.know-operate-details-default {
  margin-bottom: 20px;
  padding: 0 10px;
}
.know-operate-details-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}
.know-details-name {
  border-bottom: 1px solid #e8eaec;
  margin-left: 5px;
  display: flex;
  align-content: center;
  height: 25px;
}
.know-details-left {
  flex: 1;
  display: flex;
  box-sizing: border-box;
}
.know-details-name .ivu-icon {
  line-height: 25px;
}
.know-details-name-tree {
  flex: 1;
  font-size: 12px;
  padding-left: 10px;
  cursor: pointer;
}

.know-datails-del:hover {
  color: #ed4014;
  cursor: pointer;
}

.k-d-i {
  width: 100%;
  height: 25px;
  margin-left: 10px;
  font-size: 13px;
  box-sizing: border-box;
  border-width: 0px;
  outline: none;
  border-bottom: 1px solid #e8eaec;
  color: #657180;
  letter-spacing: 0.1em;
}
.k-d-i::placeholder {
  color: #c3cbd6;
}
.relationInput-II .ivu-select-dropdown.ivu-auto-complete{
  margin-left: -15px;
}
#relationadd-id{
  font-size: 13px;
  box-sizing: border-box;
  height: 25px;
  border-width: 0px;
  border-radius: 0;
  /* margin-bottom: 1px; */
  border-bottom: 1px solid #e8eaec;
}
#relationadd-id:focus{
  box-shadow:none;
}
.ivu-select-dropdown.ivu-auto-complete{
  max-width: 80%;
}
.ivu-select-dropdown.ivu-auto-complete .ivu-select-item{
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis; 
  overflow:hidden;
}
.know-details-relation {
  border-bottom: 1px solid #e8eaec;
  margin-left: 5px;
  display: flex;
  align-content: center;
  height: 25px;
}
.know-details-relation-I {
  display: flex;
}
.know-details-relation-II {
  display: flex;
  flex: 1;
}
.know-details-relation .ivu-icon {
  line-height: 25px;
}

</style>