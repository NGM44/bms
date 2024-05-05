import * as echarts from "echarts/core";
import {
  DatasetComponent,
  PolarComponent,
  TooltipComponent,
} from "echarts/components";
import { CustomChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";

export const TemparatureChart = (value:any) => {
  echarts.use([
    DatasetComponent,
    PolarComponent,
    TooltipComponent,
    CustomChart,
    SVGRenderer,
  ]);


  var chartDom = document.getElementById("main2");
  var myChart = echarts.init(chartDom, null, {
    renderer: "svg",
  });
  var option: any;

  var _valOnRadianMax = 100;

  option = {
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        splitNumber: 12,
        itemStyle: {
          color: '#69B2F8'
        },
        progress: {
          show: true,
          width: 5
        },
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 30
          }
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 1,
            color: '#999'
          }
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        axisLabel: {
          distance: -10,
          color: '#999',
          fontSize: 12
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          width: '50%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          fontSize: 28,
          fontWeight: 'bolder',
          formatter: '{value} °C',
          color: 'inherit'
        },
        data: [
          {
            value: value ?? 0
          }
        ]
      },
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        itemStyle: {
          color: '#69B2F8'
        },
        progress: {
          show: true,
          width: 8
        },
        pointer: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        detail: {
          show: false
        },
        data: [
          {
            value: value
          }
        ]
      }
    ]
  };
  setInterval(function () {
    var nextSource = [[1, Math.round(Math.random() * _valOnRadianMax)]];
    myChart.setOption({
      dataset: {
        source: nextSource,
      },
    });
  }, 3000);

  option && myChart.setOption(option);
};
