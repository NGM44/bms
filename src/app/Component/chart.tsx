import ReactECharts from "echarts-for-react";
import * as _ from "lodash";
import React from "react";

const BarChart = () => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: "value",
      axisTick: {
        inside: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        inside: true,
        formatter: "{value}\n",
      },
      z: 10,
    },

      tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      top: 110,
      left: 15,
      right: 15,
      height: 160,
    },
    series: [
      {
        color: "#4F46E5",
        data: [120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };
 
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-md px-4 py-2" >
      <div>
        <p className="font-medium">AQI Reading</p>
        <p className="text-xs text-gray-500">AQI is pollutant in air which level should not cross 100</p>
      </div>
      <ReactECharts option={option} />
    </div>
  );
};

export default BarChart;
