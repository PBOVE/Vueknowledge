/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-force" ref="knowForce" :style="{height:SetHeight}"></div>
</template>

<script>
//导入 d3 数据 包
import * as d3 from "d3";
export default {
  props: ["treeNode", "showSelectNum", "InnerHeight"],
  data() {
    return {
      // 获取数据 标志位
      getDataFlag: false,
      //设置top高
      TopHeight: 120
    };
  },
  methods: {
    // 获取 服务器 数据
    getforceData() {
      if (this.getDataFlag) return;
      this.getDataFlag = true;
      let url = "node/" + this.treeNode.id + "/graph";
      this.get(url)
        .then(res => {
          if(this.$refs.knowForce.firstChild)
            this.$refs.knowForce.removeChild(this.$refs.knowForce.firstChild);
          this.handleforceData(res.data);
          window.console.log(res)
        })
        .catch(() => {
          this.$Message.error("数据获取失败");
        });
    },
    //处理 数据 并且 渲染
    handleforceData(data) {
      let hashMap = {}; //映射
      let hashnumI = 0; // 映射计数器
      let Nodes = [];
      let Links = [];
      data.nodes.forEach((item, i) => {
        Nodes.push({
          name: item.name,
          id: i,
          Tid: item.id
        });
        hashMap[item.id] = hashnumI++;
      });
      data.links.forEach(function(item) {
        Links.push({
          relation: item.property.type || item.property.relation,
          source: hashMap[item.source],
          target: hashMap[item.target]
        });
        if (item.property.relation) {
          Nodes[hashMap[item.target]]["Pid"] = item.source;
          Nodes[hashMap[item.target]]["PNid"] = hashMap[item.source];
        }
      });
      this.CreateDjsPower(Nodes, Links);
    },
    //创建 力导向图
    CreateDjsPower(nodes, edges) {
      let width = this.$refs.knowForce.offsetWidth;
      let height = this.$refs.knowForce.offsetHeight;
      let svg = d3
        .select(this.$refs.knowForce)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom().on("zoom", function () {
            g.attr("transform", d3.event.transform)
        }));
      let g = svg.append("g");
      //设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
      let colorScale = d3
        .scaleOrdinal()
        .domain(d3.range(nodes.length))
        .range([
          "#f9320c",
          "#00b9f1",
          "#f9c00c",
          "#71226e",
          "#c886e5",
          "#bd83ce",
          "#EC6A5C",
          "#2c7873",
          "#ffd800",
          "#fa697c",
          "#75D701",
          "#ef9e9f",
          "#a8dba8",
          "#df42d1",
          "#e26241",
          "#eea5f6"
        ]);
      //新建一个力导向图
      let forceSimulation = d3
        .forceSimulation()
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter());
      //生成节点数据
      forceSimulation.nodes(nodes).on("tick", ticked); //这个函数很重要，后面给出具体实现和说明
      //生成边数据
      forceSimulation
        .force("link")
        .links(edges)
        .distance(150);
      //设置图形的中心位置
      forceSimulation
        .force("center")
        .x(width / 2)
        .y(height / 2);
      //有了节点和边的数据后，我们开始绘制
      svg
        .append("marker")
        .attr("id", "resolved")
        .attr("markerUnits", "userSpaceOnUse")
        .attr("viewBox", "0 -5 10 10") //坐标系的区域
        .attr("refX", 33) //箭头坐标
        .attr("refY", 0)
        .attr("markerWidth", 10) //标识的大小
        .attr("markerHeight", 10)
        .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
        .attr("stroke-width", 10) //箭头宽度
        .append("path")
        .attr("d", "M0,-5L10,0L0,5") //箭头的路径
        .attr("fill", "#8B8989"); //箭头颜色
      svg
        .append("marker")
        .attr("id", "resolvedI")
        .attr("markerUnits", "userSpaceOnUse")
        .attr("viewBox", "0 -5 10 10") //坐标系的区域
        .attr("refX", -24) //箭头坐标
        .attr("refY", 0)
        .attr("markerWidth", 10) //标识的大小
        .attr("markerHeight", 10)
        .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
        .attr("stroke-width", 3) //箭头宽度
        .append("path")
        .attr("d", "M10,-5L10,5L0,0") //箭头的路径
        .attr("fill", "#8B8989"); //箭头颜色
      //绘制边
      let links = g
        .append("g")
        .selectAll("path")
        .data(edges)
        .enter()
        .append("path")
        .attr("id", function(d, i) {
          return "edgepath" + i;
        })
        .attr("stroke", "#8B8989")
        .style("pointer-events", "none")
        .attr("stroke-width", 1)
        .attr("marker-end", function(d) {
          return d.relation === "parent-relation" ? "" : "url(#resolved)";
        })
        .attr("marker-start", function(d) {
          return d.relation === "parent-relation" ? "url(#resolvedI)" : "";
        });
      //绘制边上的文字
      let linksText = g
        .append("g")
        .selectAll("text")
        .data(edges)
        .enter()
        .append("g")
        .attr("fill", "#fff")
        .append("text")
        .style("pointer-events", "none")
        .attr("dx", 50)
        .attr("dy", 8);

      linksText
        .append("textPath")
        .attr("class", "linksText")
        .attr("xlink:href", function(d, i) {
          return "#edgepath" + i;
        })
        .style("pointer-events", "none")
        .style("font-weight", 100)
        .style("font-size", "15px")
        .attr("fill", "#000")
        .text(function(d) {
          return d.relation === "child-relation"
            ? ""
            : d.relation === "parent-relation"
            ? "父节点"
            : d.relation.length > 5
            ? d.relation.substr(0, 5) + "..."
            : d.relation;
        })
        .attr("stroke", "#696969");
      //绘制节点
      //老规矩，先为节点和节点上的文字分组
      let gs = g
        .selectAll(".circleText")
        .data(nodes)
        .enter()
        .append("g")
        .attr("transform", function(d) {
          let cirX = d.x;
          let cirY = d.y;
          return "translate(" + cirX + "," + cirY + ")";
        })
        .call(
          d3
            .drag()
            .on("start", started)
            .on("drag", dragged)
            .on("end", ended)
        );
      //绘制节点
      gs.append("circle")
        .attr("r", function(d, i) {
          return i === 0 ? 30 : 24;
        })
        .attr("fill", function(d) {
          let randomColor = d.PNid !== undefined ? d.PNid + 1 : 0;
          return colorRgba(colorScale(randomColor), 1);
        })
        .style("stroke-width", 5)
        .style("cursor", "pointer")
        .attr("stroke", function(d) {
          let randomColor = d.PNid !== undefined ? d.PNid + 1 : 0;
          return colorRgba(colorScale(randomColor), 0.3);
        })
        .append("title")
        .text(function(d) {
          return d.name;
        });
      //文字
      gs.append("text")
        .attr("dy", 4)
        .attr("dx", function(d, j) {
          let lenStr = 0;
          for (let i = 0; i < d.name.length; i++) {
            let c = d.name.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f))
              lenStr = lenStr + 3;
            else lenStr += 10;
            if (i + 1 != d.name.length && i == 3) {
              if (lenStr > 20) lenStr -= 0;
              else {
                lenStr += 8;
              }
              break;
            }
          }

          return j === 0 ? (-1 * (lenStr + 10)) / 2 : (-1 * lenStr) / 2;
        })
        .style("fill", "#fdfdfd")
        .style("font-size", function(d, i) {
          return i === 0 ? "15px" : "10px";
        })
        .text(function(d) {
          return d.name.length > 4 ? d.name.substr(0, 3) + "..." : d.name;
        })
        .style("cursor", "pointer")
        .append("title")
        .text(function(d) {
          return d.name;
        });

      function ticked() {
        links.attr("d", function(d) {
          let sx = d.source.x;
          let sy = d.source.y;
          let tx = d.target.x;
          let ty = d.target.y;
          let path = "M " + sx + " " + sy + " L " + tx + " " + ty;
          return path;
        });

        linksText.attr("transform", function(d) {
          if (d.target.x < d.source.x) {
            let bbox = this.getBBox();
            let rx = bbox.x + bbox.width / 2;
            let ry = bbox.y + bbox.height / 2;
            return "rotate(180 " + rx + " " + ry + ")";
          } else {
            return "rotate(0)";
          }
        });

        gs.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      }

      function started(d) {
        if (!d3.event.active) {
          forceSimulation.alphaTarget(0.8).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function ended(d) {
        if (!d3.event.active) {
          forceSimulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      }
      // 16进制转rgba
      function colorRgba(sColor, Opacity) {
        sColor = sColor.toLowerCase();
        //十六进制颜色值的正则表达式
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        // 如果是16进制颜色
        if (sColor && reg.test(sColor)) {
          if (sColor.length === 4) {
            let sColorNew = "#";
            for (let i = 1; i < 4; i += 1) {
              sColorNew += sColor
                .slice(i, i + 1)
                .concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
          }
          //处理六位的颜色值
          let sColorChange = [];
          for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
          }
          return "RGBA(" + sColorChange.join(",") + "," + Opacity + ")";
        }
        return sColor;
      }
    },
    //从新获取数据
    setForce(){
      this.getDataFlag = false;
      if (this.showSelectNum !== 2) return;
      this.getforceData();
    }
  },
  watch: {
    treeNode: {
      handler: function(newval, oldval) {
        if (newval === "" || newval.id === oldval.id) return;
        this.getDataFlag = false;
        if (this.showSelectNum === 2) {
          this.getforceData();
        }
      },
      deep: true
    },
    showSelectNum(val) {
      if (val !== 2) return;
      this.getforceData();
    }
  },
  computed: {
    //设置  可视区 高度
    SetHeight() {
      return this.InnerHeight - this.TopHeight + "px";
    }
  }
};
</script>

<style  scoped>
.know-force {
  height: 100%;
}
</style>