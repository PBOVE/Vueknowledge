/**
*
*  @author ZTiger
*
*/


<template>
  <div class="know-treeDiagram" ref="knowtree" :style="{height:SetHeight}"></div>
</template>

<script>
//导入 d3 数据 包
import * as d3 from "d3";
export default {
  props: ["treeNode", "showSelectNum", "InnerHeight"],
  data() {
    return {
      getDataFlag: false,
      //设置top高
      TopHeight: 120,
      //设置right宽度
      RightWeight:20
    };
  },
  methods: {
    // 获取服务器数据
    getTreeData() {
      if (this.getDataFlag) return;
      this.getDataFlag = true;

      let url = "node/" + this.treeNode.id + "/child";
      this.get(url)
        .then(res => {
          let child = this.ChildNodeProcessing(res.data);
          return Promise.resolve(child);
        })
        .then(childdata => {
          let url = "node/" + this.treeNode.id + "/link";
          this.get(url).then(res => {
            let treeData = this.parentNodeProcessing(childdata,res.data.parent);
            if (this.$refs.knowtree.firstChild)
              this.$refs.knowtree.removeChild(this.$refs.knowtree.firstChild);
            this.CreateD3jsTree(treeData);
          });
        }).catch(()=>{})
    },
    //子节点处理
    ChildNodeProcessing(child) {
      //遍历数据
      let nodeBFS = data => {
        let Arr = [];
        data.forEach(item => {
          let obj = {
            name: item.name,
            sortId: item.sortId
          };
          if (item.childNodes.length) {
            obj.children = nodeBFS(item.childNodes);
          }
          Arr.push(obj);
        });
        return Arr.sort(this.sortId);
      };
      return nodeBFS(child);
    },
    //父亲节点处理
    parentNodeProcessing(childdata, parent) {
      let treeData = {
        name: this.treeNode.name,
        children: childdata
      };
      parent.forEach(item => {
        treeData = {
          name: item.name,
          children: [treeData]
        };
      });
      return treeData;
    },
    // sord 排序
    sortId(ObjA, ObjB) {
      let valA = ObjA.sortId;
      let valB = ObjB.sortId;
      if (valA < valB) return -1;
      else if (valA > valB) return 1;
      else return 0;
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
      Updata(root);

      //更新布局
      function Updata(source) {
        let Nodes = tree(root).descendants();
        let Links = tree(root).links();
        Nodes[0].y = Nodes[0].Strlen + 10;
        // console.log(Nodes);
        // console.log(Links);
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
            // if (d.parent != null && d.x == d.parent.x) {
            //   if (d.Strlen > d.y - d.parent.y + 20) {
            //     return d.data.name.substr(0, 5) + "...";
            //   }
            // }
             return d.data.name.length>5?d.data.name.substr(0, 5) + "...":d.data.name;
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
      }
    },
    //设置 数据重新获取
    //从新获取数据
    setForce() {
      this.getDataFlag = false;
      if (this.showSelectNum !== 3) return;
      this.getTreeData();
    }
  },
  watch: {
    treeNode: {
      handler: function(newval, oldval) {
        if (newval === "" || newval.id === oldval.id) return;
        this.getDataFlag = false;
        if (this.showSelectNum === 3) {
          this.getTreeData();
        }
      },
      deep: true
    },
    showSelectNum(val) {
      if (val !== 3) return;
      this.getTreeData();
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
</style>