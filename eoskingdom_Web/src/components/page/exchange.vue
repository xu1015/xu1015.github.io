
<template>
  <div>
    <div id="exchanges" style="width:21rem;height:16rem; cursor: pointer;position:relative;"></div>
  </div>
</template>

<script>
var echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/radar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/legendScroll");
import { setInterval } from "timers";
import bgconn from "@/assets/js/bgconn.js";
export default {
  name: "exchange",
  data() {
    return {
      rawData: [
        "0.000200",
        "0.000208",
        "0.000218",
        "0.000208",
        "0.000228",
        "0.000218",
        "0.000228",
        "0.000208",
        "0.000200",
        "0.000210",
        "0.000225",
        "0.000235",
        "0.000221",
        "0.000211",
        "0.000215",
        "0.000218"
      ],
      time: [
        "12:15",
        "12:30",
        "12:15",
        "12:30",
        "12:45",
        "13:00",
        "13:15",
        "13:30",
        "13:45",
        "12:15",
        "12:30",
        "12:45",
        "13:00",
        "13:15",
        "13:30",
        "13:45"
      ],
      start: 70,
      end: 100
    };
  },
  mounted() {
    this.config2();
  },
  methods: {
    config() {
      var myChart = echarts.init(document.getElementById("exchanges"));
      app.title = "";
      var option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.time,
          axisTick: {
            show: false
          },
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#9ca1ad"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#9ca1ad"
            }
          }
        },
        yAxis: {
          type: "value",
          minInterval: 0.0005,
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#9ca1ad"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#9ca1ad"
            }
          }
        },
        series: [
          {
            data: this.rawData,
            type: "line",
            symbol: "circle",
            symbolSize: 6,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#ddf8f6" },
                  { offset: 0.5, color: "#e9fbfa" },
                  { offset: 1, color: "#fcfefe" }
                ])
              }
            },
            itemStyle: {
              normal: {
                color: "#0bcbcc",
                lineStyle: {
                  color: "#ddf8f6"
                }
              }
            }
          }
        ],
        grid: {
          left: 45,
          top: 10,
          height:$(window).height()/5,
          width:$(window).width()/2.2
        }
      };
      // 绘制图表
      myChart.setOption(option);
    },
    config2() {
      this.config();
      this.rawData = [];
      this.time = [];
      this.$http.get(bgconn.EXCHANGEQUOTATIONS).then(rs => {
        for (var i = rs.data.page.list.length - 1; i >= 0; i--) {
          this.time.push(rs.data.page.list[i].createTime.substring(11, 16));
          this.rawData.push(rs.data.page.list[i].last);
        }
        this.config();
        this.$emit(
          "ekdusdt",
          rs.data.page.list[0].last,
          rs.data.page.list[0].price
        );
      });
      setInterval(() => {
        this.$http.get(bgconn.EXCHANGEQUOTATIONS).then(rs => {
          if (this.rawData.length >= 16) {
            var m = this.rawData.slice(0);
            m.shift();
            this.rawData = m;
            m = this.time.slice(0);
            m.shift();
            this.time = m;
          }
          // console.log('this.rawData==='+this.rawData)
          this.time.push(rs.data.page.list[0].createTime.substring(11, 16));
          this.rawData.push(
            rs.data.page.list[0].last,
            rs.data.page.list[0].price
          );
          this.config();
        });
      }, 900000);
    }
  }
};
</script>

<style scoped>

</style>
