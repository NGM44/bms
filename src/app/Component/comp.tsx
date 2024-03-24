import { Component } from "react";
import { progressChart } from "./AQIMeter";
import { SparklesIcon } from "@heroicons/react/20/solid";

export class MyComponent extends Component {
  componentDidMount() {
    progressChart();
  }

  render() {
    return (
      <div className="w-auto h-auto  bg-white border rounded-sm shadow flex flex-row">
        <div id="main" className="w-64 h-64 items-center flex-1"></div>
        <div className="w-72 py-12 px-4">
          <p className="font-bold text-gray-500 text-lg pb-4">Productivity Meter</p>
          <p className="text-gray-800 text-xs pb-8">The Productivity Meter assesses air quality (AQI, PM levels), noise, light, and other environmental factors to provide a score indicating how conducive your workspace is to productivity and well-being.</p>
          <div
                      onClick={() => {
                       
                      }}
                      className="ml-auto flex cursor-pointer w-fit items-center gap-x-1 rounded-md bg-primary-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    >
                      <SparklesIcon
                        className={`-ml-1.5 h-5 w-5 animate-pulse`}
                        aria-hidden="true"
                      />
                      Analyze with AI
                    </div>
        </div>
      </div>
    );
  }
}
