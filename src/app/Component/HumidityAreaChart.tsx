import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

const HumidityAreaChart = () => {
  let base = +new Date(1968, 9, 3);
  let oneDay = 24 * 36;
  let date = [];
  let data = [Math.random() * 30];
  for (let i = 1; i < 200; i++) {
    var now = new Date((base += oneDay));
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }
  const option = {
    tooltip: {
      trigger: "axis",
      position: function (pt: any) {
        return [pt[0], "10%"];
      },
    },
    toolbox: {
      feature: {
        // dataZoom: {
        //   yAxisIndex: "none",
        // },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: date,
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        name: "Humidity",
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "rgb(255, 70, 131)",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 158, 68)",
            },
            {
              offset: 1,
              color: "rgb(255, 70, 131)",
            },
          ]),
        },
        data: data,
      },
    ],
  };
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-md py-2 flex-1 w-full">
      <div className="px-4">
        <p className="font-medium">Humidity Reading</p>
        <p className="text-xs text-gray-500">
          Reading the Humidity of the room in ra.H
        </p>
      </div>
      <ReactECharts option={option} />
    </div>
  );
};

export default HumidityAreaChart;
