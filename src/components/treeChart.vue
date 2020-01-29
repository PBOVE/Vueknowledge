/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-treeChart" ref="knowtree"></div>
</template>


<script>
//导入 d3 数据 包
import * as echarts from "echarts";
export default {
  props: ["RightWeight", "TopHeight"],
  data() {
    return {};
  },
  methods: {
    //处理传来的数据
    handletreeData(treeData) {
      // if (this.$refs.knowtree.firstChild)
      //   this.$refs.knowtree.removeChild(this.$refs.knowtree.firstChild);

      this.CreateD3jsTree(treeData);
    },
    //树图渲染数据
    CreateD3jsTree(dataset) {
      let option = {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },
        series: [
          {
            type: "tree",
            data: [dataset],
            top: "1%",
            left: "8%",
            bottom: "1%",
            right: "20%",
            symbolSize: 10,
            roam: true,
            label: {
              normal: {
                position: "left",
                verticalAlign: "middle",
                align: "right",
                fontSize: 14
              }
            },
            leaves: {
              label: {
                normal: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left"
                }
              }
            },
            itemStyle: {
              borderColor: "#9D85FB"
            },
            lineStyle: { color: "#fb767b" },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      };
      var myChart = echarts.init(this.$refs.knowtree);
      myChart.setOption(option);

      myChart.on("click", function(params) {
        // 控制台打印数据的名称
        window.console.log(params);
      });
    }
  }
};
</script>


<style scoped>
.know-treeChart {
  height: 100%;
  width: 100%;
}
</style>