import React, { useState } from "react";
import * as echarts from "echarts/core";
import ReactECharts from "echarts-for-react";
// import ReactECharts from "echarts-for-react";

const TemperatureAreaChart = ({ sortedValues }: { sortedValues: any }) => {
  let data = [];
  let data2 = [];
  for (let i = 0; i < sortedValues.length; i++) {
    data.push([sortedValues[i].myTimestamp, sortedValues[i].Humidity]);
    data2.push([sortedValues[i].myTimestamp, sortedValues[i].Temperature]);
  }
  // for (var i = 1; i < 10; i++) {
  //   var now = new Date((base += oneDay));
  //   var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join(
  //     "-"
  //   );
  //   valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
  //   valueBase <= 0 && (valueBase = Math.random() * 300);
  //   data.push([dayStr, valueBase]);
  //   valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
  //   valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
  //   data2.push([dayStr, valueBase2]);
  // }

  // const option = {
  //   legend: {
  //     top: "bottom",
  //     data: ["Intention"],
  //   },
  //   tooltip: {
  //     triggerOn: "none",
  //     position: function (pt: any) {
  //       return [pt[0], 130];
  //     },
  //   },
  //   xAxis: {
  //     type: "time",
  //   //   axisPointer: {
  //   //     value: "2016-10-7",
  //   //     snap: true,
  //   //     lineStyle: {
  //   //       color: "#7581BD",
  //   //       width: 1,
  //   //     },
  //   //     label: {
  //   //       show: true,
  //   //       formatter: function (params: any) {
  //   //         return echarts.format.formatTime("yyyy-MM-dd", params.value);
  //   //       },
  //   //       backgroundColor: "#7581BD",
  //   //     },
  //   //   },
  //   //   splitLine: {
  //   //     show: false,
  //   //   },
  //   },
  //   yAxis: {
  //     type: "value",
  //     axisTick: {
  //       inside: true,
  //     },
  //     splitLine: {
  //       show: false,
  //     },
  //     axisLabel: {
  //       inside: true,
  //       formatter: "",
  //     },
  //     z: 10,
  //   },
  //   grid: {
  //     top: 110,
  //     left: 15,
  //     right: 15,
  //     height: 160,
  //   },
  //   dataZoom: [
  //     {
  //       type: "inside",
  //       throttle: 50,
  //     },
  //   ],
  //   series: [
  //     {
  //       name: "Temperature",
  //       type: "line",
  //       smooth: true,
  //       symbol: "circle",
  //       symbolSize: 5,
  //       sampling: "average",
  //       itemStyle: {
  //         color: "#69B2F8",
  //         lineStyle: {
  //           width: 1, // Change this to a smaller value like 0.5 or 0.2
  //           color: "#7581BD",
  //         },
  //       },
  //       stack: "a",
  //       areaStyle: {
  //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //           {
  //             offset: 0,
  //             color: "rgb(105,178,248)",
  //           },
  //           {
  //             offset: 1,
  //             color: "rgb(209,230,250)",
  //           },
  //         ]),
  //       },
  //       data: data,
  //     },
  //     {
  //       name: "Temperature",
  //       type: "line",
  //       smooth: true,
  //       stack: "a",
  //       symbol: "circle",
  //       symbolSize: 5,
  //       sampling: "average",
  //       itemStyle: {
  //         color: "#D1E6FA",
  //       },
  //       areaStyle: {
  //         // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //         //   {
  //         //     offset: 0,
  //         //     color: "rgba(213,72,120,0.8)",
  //         //   },
  //         //   {
  //         //     offset: 1,
  //         //     color: "rgba(213,72,120,0.3)",
  //         //   },
  //         // ]),
  //       },
  //       data: data2,
  //     },
  //   ],
  // };

  const option = {
    color: ["#37A2FF", "#FFBF00"],
    // title: {
    //   text: 'Gradient Stacked Area Chart'
    // },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: data.map((ele) => ele[0]),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Humidity",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(55, 162, 255)",
            },
            {
              offset: 1,
              color: "rgb(255, 255, 255)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: data.map((ele) => ele[1]),
      },
      {
        name: "Temperature",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        label: {
          show: true,
          position: "top",
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 100, 0)",
            },
            {
              offset: 1,
              color: "rgb(255, 255, 255)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: data2.map((ele) => ele[1]),
      },
    ],
  };

  const [period, setPeriod] = useState("7 Days");
  return (
    <div className="bg-white border border-gray-300 h-96 rounded-2xl px-4 py-2 flex-1 w-full">
      <div className="justify-between flex flex-row items-center">
        <div className="px-4">
          <p className="font-medium">Data Monitoring</p>
          <p className="text-xs text-gray-500">
            Reading&apos;s of Temperature & Humidity
          </p>
        </div>
        <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <a
                  onClick={() => {
                    setPeriod("7 Days");
                  }}
                  className={`relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset  focus:z-20 focus:outline-offset-0  ${
                    period === "7 Days"
                      ? "bg-primary-800 text-white focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-gray-300 hover:bg-gray-50"
                  }`}
                >
                  7 Days
                </a>
                <a
                  onClick={() => {
                    setPeriod("30 Days");
                  }}
                  className={`relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset  focus:z-20 focus:outline-offset-0  ${
                    period === "30 Days"
                      ? "bg-primary-800 text-white focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-gray-300 hover:bg-gray-50"
                  }`}
                >
                  30 Days
                </a>
                <a
                  onClick={() => {
                    setPeriod("90 Days");
                  }}
                  className={`relative hidden  cursor-pointer items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset  focus:z-20 focus:outline-offset-0 md:inline-flex  ${
                    period === "90 Days"
                      ? "bg-primary-800 text-white focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-gray-300 hover:bg-gray-50"
                  }`}
                >
                  90 Days
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* <ReactECharts option={option} /> */}
    </div>
  );
};

export default TemperatureAreaChart;
