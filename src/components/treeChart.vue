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
import * as d3 from "d3";
export default {
  props: ["RightWeight", "TopHeight"],
  data() {
    return {};
  },
  methods: {
    //处理传来的数据
    handletreeData(treeData) {
      if (this.$refs.knowtree.firstChild)
        this.$refs.knowtree.removeChild(this.$refs.knowtree.firstChild);

      this.CreateD3jsTree(treeData);
    },
    //树图渲染数据
    CreateD3jsTree(dataset) {
      let width = this.$refs.knowtree.offsetWidth - this.RightWeight;
      let height = this.$refs.knowtree.offsetHeight;
      let root = d3.hierarchy(dataset);
      let duration = 750; //时间
      let Reg = /[0-9A-z]/;
      root.descendants().forEach((d, i) => {
        //获取name长度 ,达到更好的显示
        d.id = i; //设置id
        d.Strlen = 0; //name长度
        let rootname = d.data.name;
        for (let j = 0; j < rootname.length; j++) {
          let str = rootname.substr(j, 1);
          if (Reg.test(str)) {
            d.Strlen += 8;
          } else {
            d.Strlen += 18;
          }
        }
        if (d.children) {
          d._children = d.children;
        }
      });
      //定义边界
      let marge = {
        left: root.Strlen + 10,
        top: 50
      };
      let svg = d3
        .select(this.$refs.knowtree)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(
          d3.zoom().on("zoom", function() {
            g.attr("transform", d3.event.transform);
          })
        );
      width = width - marge.left - 100;
      let g = svg.append("g");

      let LinkAll = g.append("g");
      let NodeAll = g.append("g");
      //创建一个树状图
      let tree = d3
        .tree()
        .size([height, width])
        .separation(function(a, b) {
          return a.parent == b.parent ? 1 : 2;
        });
      //初始化树状图，也就是传入数据,并得到绘制树基本数据
      root.x0 = height / 2;
      root.y0 += 0;

      //创建一个贝塞尔生成曲线生成器
      let diagonal = d3
        .linkHorizontal()
        .x(d => d.y)
        .y(d => d.x);
      // 绘制节点

      //更新布局
      let Updata = source => {
        let Nodes = tree(root).descendants();
        let Links = tree(root).links();
        Nodes[0].y = Nodes[0].Strlen + 10;
        //有了节点和边集的数据后，我们就可以开始绘制了，
        //绘制边
        let link = LinkAll.selectAll("path").data(Links, function(d) {
          return d.target.id;
        });
        link
          .enter()
          .append("path")
          .attr("d", function(d) {
            let start = {
              x: d.source.x,
              y: d.source.y
            };
            let end = {
              x: d.target.x,
              y: d.target.y
            };
            return diagonal({
              source: start,
              target: end
            });
          })
          .attr("fill", "none")
          .attr("stroke", "#e4e4e4")
          .attr("stroke-width", 1);
        // 绘制节点
        let node = NodeAll.selectAll("g").data(Nodes, function(d) {
          return d.id;
        });
        let NodeEnter = node
          .enter()
          .append("g")
          .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")";
          });
        NodeEnter.append("circle")
          .attr("r", 6)
          .attr("fill", "white")
          .attr("stroke", "#666")
          .attr("stroke-width", 1.5)
          .attr("cursor", "pointer")
          .attr("fill", d => (d._children ? "#666" : "#fff"))
          .on("click", Click);
        NodeEnter.append("text")
          .attr("x", function(d) {
            return d._children ? -8 : 8;
          })
          .attr("text-anchor", function(d) {
            return d._children ? "end" : "start";
          })
          .attr("y", -5)
          .attr("dy", 10)
          .text(function(d) {
            return d.data.name;
          })
          .append("title")
          .text(function(d) {
            return d.data.name;
          });

        //更新
        link
          .transition()
          .duration(duration)
          .attr("d", diagonal);
        link
          .exit()
          .transition()
          .remove()
          .attr("d", diagonal)
          .attr("stroke-width", 0);
        //原来位置更新
        let NodeUpdata = node
          .transition()
          .duration(duration)
          .attr("transform", function(d) {
            return "translate(" + d.y + ", " + d.x + ")";
          });
        NodeUpdata.select("text").text(function(d) {
          if (d.parent != null && d.x == d.parent.x) {
            if (d.Strlen > d.y - d.parent.y + 20) {
              return d.data.name.substr(0, 5) + "...";
            }
          }
          return d.data.name;
        });
        //折叠原来的
        node
          .exit()
          .transition()
          .duration(duration)
          .remove()
          .attr("transform", function() {
            return "translate(" + source.y + ", " + source.x + ")";
          });

        function Click(d) {
          if (d.children) {
            d.children = null;
          } else {
            d.children = d._children;
          }
          Updata(d);
        }
      };
      Updata(root);
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