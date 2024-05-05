import { Component } from "react";
import { TemparatureChart } from "./TempratureMeter";

interface TemperatureChartUIProps {
  value: number; // Or whatever type 'value' represents
}

export class TemparatureChartUI extends Component<TemperatureChartUIProps> {
  componentDidMount() {
    TemparatureChart(this.props.value ?? 0);
  }

  render() {
    return (
      <div className="w-auto h-[350px]  bg-white border border-gray-300 rounded-2xl flex flex-col flex-1">
        <div id="main2" className="w-96 h-96 mx-auto items-center flex-1"></div>
        <p className="font-bold text-gray-500 text-lg mx-auto mb-2 -mt-12">
          Temperature Meter
        </p>
      </div>
    );
  }
}
