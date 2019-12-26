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
          {{item.Time}}&nbsp;
          <span class="know-journal-strong">{{treeNode.name}}</span>
          &nbsp;节点&nbsp;&nbsp;{{item.operator}}
        </div>
        <div class="know-journal-content-user">
          <span class="know-journal-strong">{{item.nickName}}</span>
          &nbsp;{{item.dateValue}}前&nbsp;操作此节点
        </div>
        <div class="know-journal-content-green">{{item.operator}}</div>
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
      //请求 数据 类型操作
      Logtype: {
        UPDATE_NODE_PROPER: "更新 属性",
        ADD_NODE: "添加 新属性",
        UPDATE_NODE_NAME: "更新节点名称"
      },
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

          // data.forEach(item => {
          //   if (item.operator !== "UPDATE_NODE_NAME") {
          //     let msg = item.message;
          //     // window.console.log(item)
          //     window.console.log(JSON.parse(msg.match(/\[.+\]/g)));
          //   }
          // });

          this.handleJournalData(res.data.content);
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    // 设置重新获取数据
    setJournal() {
      window.console.log(3432);
      this.getDataFlag = false;
      this.JournalData = [];
    },
    // 处理并且渲染 数据
    handleJournalData(data) {
      data.forEach(item => {
        let dateStart = new Date(item.createTime);
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
        let msg;
        if (item.operator !== "UPDATE_NODE_NAME") {
          msg = item.message;
          // msgBObj = JSON.parse(msg.match(/\[.+\]/g));
          msg = '更新节点'
        }else {
          msg = '更新节点名称'
        }

        this.JournalData.push({
          randomId: Math.random(),
          dateLog: YY + "-" + MM + "-" + DD,
          dateValue: dateValue,
          Time:
            DateFlite(dateStart.getHours()) +
            ":" +
            DateFlite(dateStart.getMinutes()) +
            ":" +
            DateFlite(dateStart.getSeconds()),
          operator: msg,
          nickName: item.nickName
        });
        function DateFlite(date) {
          return date < 10 ? "0" + date : date;
        }
      });
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
}
</style>