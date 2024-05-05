import { Component } from "react";
import { HumidityChart } from "./HumidityMeter";
interface HumidityChartUIProps {
  value: number; // Or whatever type 'value' represents
}

export class HumidityChartUI extends Component<HumidityChartUIProps> {
  componentDidMount() {
    HumidityChart(this.props.value);
  }

  render() {
    return (
      <div className="w-auto h-[350px]  bg-white border border-gray-300 rounded-2xl flex flex-col flex-1">
        <div id="main1" className="w-96 h-96 mx-auto items-center flex-1"></div>
        <p className="font-bold text-gray-500 text-lg mx-auto mb-2 -mt-12">
          Humidity Meter
        </p>
        {/* <p className="text-gray-800 text-xs mx-auto pb-4">
          30-60% RH for comfort and to prevent mold growth
        </p> */}
      </div>
    );
  }
}
