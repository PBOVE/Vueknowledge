/**
*
*  @author ZTiger
*
*/


<template>
  <ul class="know-journal-ul">
    <li v-for="(item ,index) in JournalData" v-bind:key="item.randomId" class="know-journal-li">
      <div class="know-journal-title" v-if="index===0||item.dateLog!==JournalData[index-1].dateLog">
        <Icon type="ios-ionic" color="#19be6b
" />
        <span class="know-journal-title-span">时间&nbsp;:&nbsp;{{item.dateLog}}</span>
      </div>
      <div class="know-journal-content">
        <div class="know-journal-content-title">
         <span class="know-journal-strong">{{item.nickName}}</span>&nbsp;{{item.Time}}&nbsp;
          <span class="know-journal-strong">{{item.nodeName}}</span>
          &nbsp;节点&nbsp;,&nbsp;{{item.operator}}
        </div>
        <div class="know-journal-content-user">
          &nbsp;{{item.dateValue}}前&nbsp;操作此节点
        </div>
        <div class="know-journal-content-green">{{item.operatorCrux}}</div>
      </div>
    </li>
  </ul>
</template>


<script>
export default {
  props: ["treeNode", "showSelectNum"],
  data() {
    return {
      //请求数据标志位
      getDataFlag: false,
      //请求的日志数据
      JournalData: []
    };
  },
  methods: {
    // 获取 服务器 数据
    getJournalData() {
      if (this.getDataFlag) return;
      this.getDataFlag = true;
      let url = "record/node/" + this.treeNode.id;
      let obj = {
        size: 100
      };
      this.get(url, obj)
        .then(res => {
          let data = res.data.content;
          window.console.log(data);
          this.handleJournalData(res.data.content);
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    // 设置重新获取数据
    setJournal() {
      this.getDataFlag = false;
      this.JournalData = [];
    },
    // 处理并且渲染 数据
    handleJournalData(data) {
      let dataLen = data.length;
      data.forEach((item, index) => {
        let Dateobj = this.handleTime(item.createTime);
        let nodeitem = "";
        if (index < dataLen) {
          nodeitem = data[index + 1];
        }
        let Megobj = this.handleMessage(item.operator, item.content, nodeitem);

        this.JournalData.push({
          randomId: Math.random(),
          dateLog: Dateobj.YY + "-" + Dateobj.MM + "-" + Dateobj.DD,
          dateValue: Dateobj.dateValue,
          nodeName: Megobj.nodeName,
          Time:
            DateFlite(Dateobj.dateStart.getHours()) +
            ":" +
            DateFlite(Dateobj.dateStart.getMinutes()) +
            ":" +
            DateFlite(Dateobj.dateStart.getSeconds()),
          operator: Megobj.operator,
          nickName: item.nickName,
          operatorCrux: Megobj.operatorCrux
        });
        function DateFlite(date) {
          return date < 10 ? "0" + date : date;
        }
      });
    },
    // 处理响应 时间
    handleTime(dateVal) {
      let dateStart = new Date(dateVal);
      let dateEnd = new Date();
      let YY = dateStart.getFullYear();
      let MM = dateStart.getMonth() + 1;
      let DD = dateStart.getDate();
      let dateValue = dateEnd - dateStart;
      let DateValue = [1000, 60, 60, 24, 30, 12, Infinity];
      for (var i = 0; i < DateValue.length - 1; i++) {
        dateValue /= DateValue[i];
        if (dateValue < DateValue[i + 1]) {
          switch (i) {
            case 0:
              dateValue = parseInt(dateValue) + " 秒";
              break;
            case 1:
              dateValue = parseInt(dateValue) + " 分钟";
              break;
            case 2:
              dateValue = parseInt(dateValue) + " 小时";
              break;
            case 3:
              dateValue = parseInt(dateValue) + " 天";
              break;
            case 4:
              dateValue = parseInt(dateValue) + " 个月";
              break;
            case 5:
              dateValue = parseInt(dateValue) + " 年";
              break;
          }
          break;
        }
      }
      return {
        YY,
        MM,
        DD,
        dateStart,
        dateValue
      };
    },
    // 处理message 信息
    handleMessage(type, val, nextNodeData) {
      let contentObj, operator, operatorCrux, labels, nodeName, nextDataLabel;
      contentObj = JSON.parse(val);
      labels = contentObj.labels;
      nodeName = contentObj.name || this.treeNode.name;
      const statusMap = {
        UPDATE_NODE_NAME: () => {
          operator = "修改节点名称";
          operatorCrux = "修改 节点名称";
          if (nextNodeData) {
            let nextDataName = this.handleMessage(
              nextNodeData.operator,
              nextNodeData.content
            ).nodeName;
            operator =
              '" ' + nextDataName + ' "节点名称修改为" ' + nodeName + ' "';
          }

          return {
            operator,
            nodeName,
            operatorCrux
          };
        },
        ADD_NODE: () => {
          operator = "添加节点";
          operatorCrux = "添加 节点";

          return {
            operator,
            nodeName,
            operatorCrux
          };
        },
        UPDATE_NODE_PROPER: () => {
          operator = "更新节点属性";
          operatorCrux = "更新属性";
          if (nextNodeData) {
            nextDataLabel = this.handleMessage(
              nextNodeData.operator,
              nextNodeData.content
            ).labels;
            if (nextDataLabel) {
              let len = labels.length;
              let nextLen = nextDataLabel.length;
              let oldName , newName;
              if (nextDataLabel.length === labels.length) {
                for (let i = 0; i < len; i++) {
                  if (nextDataLabel[i] !== labels[i]) {
                    newName = labels[i];
                    oldName = nextDataLabel[i];
                    break;
                  }
                }
                if(oldName&&newName){
                   operatorCrux = "修改 属性";
                   operator = '"' + oldName + '"修改属性名称为" ' + newName + '"';
                }else{
                  operatorCrux = "更新属性";
                   operator = '更新属性';
                }
               
              } else if (nextDataLabel.length < labels.length) {
                operatorCrux = "添加 属性";
                newName = labels[len - 1];
                operatorCrux = "添加 属性";
                operator = '添加新的属性名称 " ' + newName + ' "';
              } else {
                operatorCrux = "删除 属性";
                for (let i = 0; i < nextLen; i++) {
                  if (nextDataLabel[i] !== labels[i]) {
                    oldName = nextDataLabel[i];
                    break;
                  }
                }
                operator = '属性 " ' + oldName + ' "被删除';
              }
            }
          }
          return {
            labels,
            operator,
            nodeName,
            operatorCrux
          };
        },
        ADD_NODE_PROPERTY: () => {
          operator = '" '+contentObj.startNode +' " 节点与 " '+contentObj.endNode+' " 节点产生新的关系,关系为: '+contentObj.property.type;
          operatorCrux = "添加节点关系";
          return {
            operator,
            nodeName,
            operatorCrux
          };
        },
        DELETE_NODE_RELATION: () => {
          operator = "删除节点关系";
          operatorCrux = "删除 节点关系";
          return {
            operator,
            nodeName,
            operatorCrux
          };
        },
        UPDATE_NODE_PROPERTY: () => {
          operator = '" '+contentObj.startNode +' " 节点与 " '+contentObj.endNode+' " 节点的关系值改变为 " '+contentObj.property.type +' "';
          operatorCrux = "修改 节点关系";
          window.console.log(contentObj);
          return {
            operator,
            nodeName,
            operatorCrux
          };
        }
      };
      return statusMap[type]();
    }
  },
  watch: {
    treeNode: {
      handler: function(newval, oldval) {
        if (newval === "" || newval.id === oldval.id) return;
        this.getDataFlag = false;
        this.JournalData = [];
        if (this.showSelectNum === 4) {
          this.getJournalData();
        }
      }
    },
    showSelectNum(val) {
      if (val === 4) this.getJournalData();
    }
  }
};
</script>


<style scoped>
.know-journal-ul {
  list-style: none;
}
.know-journal-title {
  color: #9a9a9a;
}
.know-journal-title-span {
  display: inline-block;
  text-indent: 1em;
  font-size: 16px;
}
.know-journal-content-title {
  margin-bottom: 5px;
  letter-spacing: 0.1em;
}
.know-journal-strong {
  color: #2395f1;
  cursor: pointer;
}
.know-journal-content {
  padding: 5px;
  margin-left: 5px;
  padding-left: 40px;
  border-left: 1px solid #f8f8f9;
  height: 100px;
}
.know-journal-content:hover {
  background-color: #f8f8f9;
  border-radius: 10px;
  box-shadow: 0 0 5px #f8f8f9;
  transition: all 0.5s;
}
.know-journal-content-user {
  color: #9a9a9a;
  margin-bottom: 5px;
}
.know-journal-content-green {
  border-top: 1px solid #f0f0f0;
  text-indent: 1em;
  letter-spacing: 0.1em;
}
</style>