import { Component } from "react";
import { progressChart } from "./AQIMeter";
import { SparklesIcon } from "@heroicons/react/20/solid";
import { TemparatureChart } from "./TempratureMeter";

export class TemparatureChartUI extends Component {
  componentDidMount() {
    TemparatureChart();
  }

  render() {
    return (
      <div className="w-auto h-[350px]  bg-white border border-gray-300 rounded-lg flex flex-col flex-1">
        <div id="main2" className="w-96 h-96 mx-auto items-center flex-1"></div>
        <p className="font-bold text-gray-500 text-lg mx-auto mb-2 -mt-12">
          Temperature Meter
        </p>
        {/* <p className="text-gray-800 text-xs mx-auto pb-4">
          20-24°C (68-75°F) for comfort, but adjustable based on preference and
          activities.
        </p>{" "} */}
      </div>
    );
  }
}
