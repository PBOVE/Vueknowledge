/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-operate-details">
    <div class="know-operate-details-default">
      <div class="know-operate-details-title">属性 :</div>
      <div class="know-details-name">
        <div class="know-details-left">
          <Icon type="md-list" color="#19be6b" />
          <input type="text" class="k-d-i" @click="CShowInput" v-model="NodeName" @blur="changName" />
        </div>
      </div>

      <div class="know-details-name" v-for="(item,index) in AttrButeData" :key="index">
        <div class="know-details-left">
          <Icon type="md-list" color="#19be6b" />
          <input
            type="text"
            class="k-d-i exitAttr"
            @click="CShowInput"
            @blur="LossFocusA('exit',index)"
            :value="item"
          />
        </div>
        <div class="know-details-right">
          <Icon type="ios-close" class="know-datails-del" @click="delAttrData(index)" size="20" />
        </div>
      </div>

      <div class="know-details-name">
        <div class="know-details-left">
          <Icon type="md-list-box" color="#808695" />
          <input
            type="text"
            placeholder="请输入属性"
            class="k-d-i"
            v-model="labelsInput"
            @click="CShowInput"
            @focus="CShowInput"
            @blur="LossFocusA('add')"
          />
        </div>
      </div>
    </div>

    <div class="know-operate-details-default">
      <div class="know-operate-details-title">关系 :</div>
      <div class="know-details-relation" v-for="(key,index) in relationData" :key="index">
        <div class="know-details-relation-I">
          <Icon type="md-funnel" color="#19be6b" />
          <input
            type="text"
            class="k-d-i"
            @click="CShowInput"
            @focus="CShowInput"
            @blur="LossFocusR('name',key,index)"
            :value="key.name"
          />
        </div>
        <div class="know-details-relation-II">
          <Icon type="md-list" color="#19be6b" />
          <input
            type="text"
            class="k-d-i"
            @click="CShowInput"
            @focus="CShowInput"
            @blur="LossFocusR('title',key,index)"
            :value="key.title"
          />
        </div>
        <div class="know-details-relation-III">
          <Icon
            type="ios-close"
            class="know-datails-del"
            size="20"
            @click="delRelationData(key,index)"
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
            class="k-d-i"
            v-model="InputNodeName"
            @click="CShowInput"
            @focus="CShowInput"
            @blur="LossFocusR('add')"
          />
        </div>
        <div class="know-details-relation-II">
          <Icon type="md-git-commit" color="#808695" />
          <AutoComplete
            v-model.lazy="RaNodeinput"
            class="relationInput-II"
            :data="searchdata"
            @on-change="ChangeSearch"
            @on-focus="CSerachshowInput"
            @on-blur="CSerchBlurInput"
            placeholder="请输入节点名称 "
            element-id="relationadd-id"
            size="default"
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
      // 节点名称
      NodeName: "",
      // 属性 输入
      labelsInput: "",
      // 获取 输入框node数据
      RaNodeinput: "",
      //节点关系名称输入
      InputNodeName: "",
      //请求数据标志位
      getDataFlag: false,
      // 点击inpul 获取val 防止输入空格
      oldAttrInputVal: "",
      // 获取 服务器数据
      AttrButeData: [],
      relationData: [],
      // 服务器 获取的数据 格式不变
      relationformat: {},
      AttrButeformat: [],
      // 请求联想框数据
      searchdata: []
    };
  },
  methods: {
    // 获取 服务器 节点属性 节点关系
    getAttriBute() {
      if (this.getDataFlag) return;
      this.getDataFlag = true;
      this.NodeName = this.treeNode.name;
      let url = "node/" + this.treeNode.id;
      this.get(url)
        .then(res => {
          window.console.log(res);
          let labels = JSON.stringify(res.data.labels || []);
          this.AttrButeformat = JSON.parse(labels);
          this.AttrButeData = JSON.parse(labels);
          const property = res.data.property;
          this.relationformat = property;
          this.relationData = [];
          for (let item in property) {
            property[item].forEach(element => {
              this.relationData.push({
                name: item,
                title: element
              });
            });
          }
        })
        .catch(() => {});
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
    CSerachshowInput(e) {
      let target = e.target;
      let Ptarget = target.parentNode.parentNode.parentNode.parentNode;
      target.style.borderBottom = "1px solid #2db7f5";
      Ptarget.style.outline = "1px solid #2db7f5";
      this.searchdata = [];
    },
    // 搜索框失去焦点事件
    CSerchBlurInput(e) {
      let target = e.target;
      let Ptarget = target.parentNode.parentNode.parentNode.parentNode;
      target.style.borderBottom = "1px solid #e8eaec";
      Ptarget.style.outline = "none";
      this.$nextTick(() => {
        this.addrelation();
      });
    },
    // 属性失去焦点
    LossFocusA(type, index) {
      let target = event.target;
      let Ptarget = target.parentNode;
      let inputVal = target.value.replace(/^\s+|\s+$/g, "");
      const statusMap = {
        // 添加 属性
        add: () => {
          this.addLabels();
        },
        // 编辑 属性
        exit: () => {
          this.changExit(inputVal, index);
        }
      };
      Ptarget.style.outline = "none";
      if (inputVal === "" || (index && inputVal === this.AttrButeData[index])) {
        target.value = index !== undefined ? this.AttrButeData[index] : "";
        return;
      }

      statusMap[type]();
    },
    // 关系 失去 焦点
    LossFocusR(type, val, index) {
      const target = event.target;
      const Ptarget = target.parentNode;
      const statusMap = {
        // 修改关系属性,
        name: () => {
          this.putRelationName(inputVal, val, index);
        },
        // 修改关系名称
        title: () => {
          this.putRelationTitle(inputVal, val, index);
        },
        // 添加 关系属性
        add: () => {
          this.addrelation();
        }
      };
      let inputVal = target.value.replace(/^\s+|\s+$/g, "");
      Ptarget.style.outline = "none";
      if (inputVal === "" || (val && target.value === val[type])) {
        target.value = val ? val[type] : "";
        return;
      }
      statusMap[type]();
    },
    // 改变名称 进入的函数
    changName() {
      let target = event.target;
      let Ptarget = target.parentNode;
      Ptarget.style.outline = "none";
      if (this.NodeName === this.treeNode.name) {
        return;
      }
      this.putServerName(this.NodeName);
    },
    // 向 服务器发送 改变的名称
    putServerName(name) {
      let url = "node/" + this.treeNode.id;
      let obj = this.ObjData();
      obj["name"] = name;
      this.put_json(url, obj)
        .then(res => {
          this.NodeName = res.data.name;
          // 重新 获取日志
          // this.$emit("SClientCallback", 4)
          this.$emit("SClientCallback", 1, res.data.name);
        })
        .catch(() => {});
    },
    // 添加 属性
    addLabels() {
      let url = "node/" + this.treeNode.id;
      let obj = this.ObjData();
      obj["labels"].push(this.labelsInput);
      this.put_json(url, obj)
        .then(res => {
          let labels = res.data.labels;
          this.AttrButeformat = labels;
          this.AttrButeData.push(this.labelsInput);
        })
        .catch(() => {});
    },
    //改变属性名称
    changExit(inputVal, index) {
      let url = "node/" + this.treeNode.id;
      let obj = this.ObjData();
      obj["labels"][index] = inputVal;
      this.put_json(url, obj)
        .then(res => {
          let labels = res.data.labels;
          this.AttrButeformat = labels;
          this.$set(this.AttrButeData, index, inputVal);
          this.labelsInput = "";
          //       // 重新 获取日志
          //       this.$emit("SClientCallback", 4);
        })
        .catch(() => {});
    },
    // 删除属性数据
    delAttrData(index) {
      let url = "node/" + this.treeNode.id;
      let obj = this.ObjData();
      obj["labels"].splice(index, 1);
      this.put_json(url, obj)
        .then(res => {
          let labels = res.data.labels;
          this.AttrButeformat = labels;
          this.AttrButeData.splice(index, 1);
          //       // 重新 获取日志
          //       this.$emit("SClientCallback", 4);
        })
        .catch(() => {});
    },
    // 添加 关系 数据
    addrelation() {
      let name = this.InputNodeName.replace(/^\s+|\s+$/g, "");
      let title = this.RaNodeinput.replace(/^\s+|\s+$/g, "");
      if (name === "" || title === "") {
        return;
      }
      let url = "node/" + this.treeNode.id;
      let obj = this.ObjData();
      if (!obj["property"].hasOwnProperty(name)) {
        obj["property"][name] = [];
      }
      obj["property"][name].push(title);
      this.put_json(url, obj)
        .then(res => {
          const property = res.data.property;
          this.relationformat = property;
          this.relationData.push({
            name,
            title
          });
          this.InputNodeName = this.RaNodeinput = "";
          // // 力导图 树图 从新请求数据
          // this.$emit("SClientCallback", 2);
          // // 重新 获取日志
          // this.$emit("SClientCallback", 4);
        })
        .catch(() => {});
    },
    // 删除 关系 数据
    delRelationData(val, inputIndex) {
      let obj = this.ObjData();
      let index = obj["property"][val.name].indexOf(val.title);
      obj["property"][val.name].splice(index, 1);
      if (!obj["property"][val.name].length) {
        delete obj["property"][val.name];
      }
      this.poshServerR("", inputIndex, obj);
    },
    // 更新 关系 属性
    putRelationName(inputVal, val, inputIndex) {
      let obj = this.ObjData();
      let index = obj["property"][val.name].indexOf(val.title);
      if (!obj["property"].hasOwnProperty(inputVal)) {
        obj["property"][inputVal] = [];
      }
      obj["property"][inputVal].push(val.title);
      obj["property"][val.name].splice(index, 1);
      if (!obj["property"][val.name].length) {
        delete obj["property"][val.name];
      }
      this.poshServerR(inputVal, inputIndex, obj, "name");
    },
    // 更新 关系 键值
    putRelationTitle(inputVal, val, inputIndex) {
      let obj = this.ObjData();
      let index = obj["property"][val.name].indexOf(val.title);
      obj["property"][val.name][index] = inputVal;
      this.poshServerR(inputVal, inputIndex, obj, "title");
    },
    // 向服务器发送 关系数据
    poshServerR(inputVal, inputIndex, obj, updataKey) {
      const url = "node/" + this.treeNode.id;
      this.put_json(url, obj)
        .then(res => {
          const property = res.data.property;
          this.relationformat = property;
          if (updataKey) {
            this.relationData[inputIndex][updataKey] = inputVal;
          } else {
            this.relationData.splice(inputIndex, 1);
          }
          //       // 力导图 树图 从新请求数据
          //       this.$emit("SClientCallback", 2);
          //       // 重新 获取日志
          //       this.$emit("SClientCallback", 4);
        })
        .catch(() => {});
    },
    //   向服务器发送 obj 关系
    ObjData() {
      let obj = {
        name: this.treeNode.name,
        labels: this.AttrButeformat,
        itemId: parseInt(this.$route.query.itemId),
        property: { ...this.relationformat }
      };
      return obj;
    },
    // 根据节点 name 模糊匹配返回节点列表
    getVagueName(val) {
      let url = "node/name";
      let obj = {
        query: val,
        itemId: parseInt(this.$route.query.itemId)
      };
      this.get(url, obj)
        .then(res => {
          let data = res.data;
          this.searchdata = [];
          data.forEach((item, index) => {
            if (index > 5) {
              return;
            }
            this.searchdata.push(item.name);
          });
        })
        .catch(() => {});
    },
    // 搜索框change事件时调用
    ChangeSearch() {
      let Ival = this.RaNodeinput.replace(/^\s+|\s+$/g, "");
      if (Ival === "") return;
      this.getVagueName(Ival);
    },
    // 查询该节点是否存在
    queryNode(NodeName){
      let url = "node/name";
      let obj = {
        query: NodeName,
        itemId: parseInt(this.$route.query.itemId)
      };
      this.get(url, obj)
        .then(res => {
          window.console.log(res)
        })
        .catch(() => {});
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
    }
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
.relationInput-II .ivu-select-dropdown.ivu-auto-complete {
  margin-left: -15px;
}
#relationadd-id {
  font-size: 13px;
  box-sizing: border-box;
  height: 25px;
  border-width: 0px;
  border-radius: 0;
  /* margin-bottom: 1px; */
  border-bottom: 1px solid #e8eaec;
}
#relationadd-id:focus {
  box-shadow: none;
}
.ivu-select-dropdown.ivu-auto-complete {
  max-width: 80%;
}
.ivu-select-dropdown.ivu-auto-complete .ivu-select-item {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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