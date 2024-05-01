import * as echarts from "echarts/core";
import {
  DatasetComponent,
  PolarComponent,
  TooltipComponent,
} from "echarts/components";
import { CustomChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";

export const TemparatureChart = () => {
  echarts.use([
    DatasetComponent,
    PolarComponent,
    TooltipComponent,
    CustomChart,
    SVGRenderer,
  ]);

  var ROOT_PATH = "https://echarts.apache.org/examples";

  var chartDom = document.getElementById("main2");
  var myChart = echarts.init(chartDom, null, {
    renderer: "svg",
  });
  var option: any;

  var _panelImageURL = ROOT_PATH + "/data/asset/img/custom-gauge-panel.png";
  var _animationDuration = 1000;
  var _animationDurationUpdate = 1000;
  var _animationEasingUpdate = "quarticInOut";
  var _valOnRadianMax = 100;
  var _outerRadius = 20;
  var _innerRadius = 60;
  var _pointerInnerRadius = 20;
  var _insidePanelRadius = 70;
  var _currentDataIndex = 0;
  function renderItem(params: any, api: any) {
    var valOnRadian = api.value(1);
    var coords = api.coord([api.value(0), valOnRadian]);
    var polarEndRadian = coords[3];
    var imageStyle = {
      image: _panelImageURL,
      x: params.coordSys.cx - _outerRadius,
      y: params.coordSys.cy - _outerRadius,
      width: _outerRadius * 2,
      height: _outerRadius * 2,
    };
    return {
      type: "group",
      children: [
        {
          type: "image",
          style: imageStyle,
          clipPath: {
            type: "sector",
            shape: {
              cx: params.coordSys.cx,
              cy: params.coordSys.cy,
              r: _outerRadius,
              r0: _innerRadius,
              startAngle: 0,
              endAngle: -polarEndRadian,
              transition: "endAngle",
              enterFrom: { endAngle: 0 },
            },
          },
        },
        {
          type: "image",
          style: imageStyle,
          clipPath: {
            type: "polygon",
            shape: {
              points: makePionterPoints(params, polarEndRadian),
            },
            extra: {
              polarEndRadian: polarEndRadian,
              transition: "polarEndRadian",
              enterFrom: { polarEndRadian: 0 },
            },
            during: function (apiDuring: any) {
              apiDuring.setShape(
                "points",
                makePionterPoints(params, apiDuring.getExtra("polarEndRadian"))
              );
            },
          },
        },
        {
          type: "circle",
          shape: {
            cx: params.coordSys.cx,
            cy: params.coordSys.cy,
            r: _insidePanelRadius,
          },
          style: {
            fill: "#fff",
            shadowBlur: 25,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: "rgba(76,107,167,0.4)",
          },
        },
        {
          type: "text",
          extra: {
            valOnRadian: valOnRadian,
            transition: "valOnRadian",
            enterFrom: { valOnRadian: 0 },
          },
          style: {
            text: makeText(valOnRadian),
            fontSize: 10,
            fontWeight: 700,
            x: params.coordSys.cx,
            y: params.coordSys.cy,
            fill: "#0168FA",
            align: "center",
            verticalAlign: "middle",
            enterFrom: { opacity: 0 },
          },
          during: function (apiDuring: any) {
            apiDuring.setStyle(
              "text",
              makeText(apiDuring.getExtra("valOnRadian"))
            );
          },
        },
      ],
    };
  }
  function convertToPolarPoint(
    renderItemParams: any,
    radius: any,
    radian: any
  ) {
    return [
      Math.cos(radian) * radius + renderItemParams.coordSys.cx,
      -Math.sin(radian) * radius + renderItemParams.coordSys.cy,
    ];
  }
  function makePionterPoints(renderItemParams: any, polarEndRadian: any) {
    return [
      convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
      convertToPolarPoint(
        renderItemParams,
        _outerRadius,
        polarEndRadian + Math.PI * 0.03
      ),
      convertToPolarPoint(
        renderItemParams,
        _pointerInnerRadius,
        polarEndRadian
      ),
    ];
  }
  function makeText(valOnRadian: any) {
    // Validate additive animation calc.
    if (valOnRadian < -10) {
      alert("illegal during val: " + valOnRadian);
    }
    return ((valOnRadian / _valOnRadianMax) * 100).toFixed(0) + "%";
  }
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
            value: 20
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
            value: 20
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
