import {
  ArrowDownIcon,
  ArrowUpIcon,
  TvIcon,
} from "@heroicons/react/24/outline";
import React from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const RoomCard = ({stat}:{stat: any}) => {
  console.log("stat", stat);

  return (
    <div
      key={stat.name}
      className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow sm:px-6 sm:pt-6 border border-slate-50"
    >
      <dt>
        {stat?.icon && <div className="absolute rounded-md bg-primary-500 p-3">
       {stat.icon}
          {/* <item.icon className="h-6 w-6 text-white" aria-hidden="true" /> */}
        </div>}
        <p className="truncate text-sm font-medium text-gray-500">
          {stat.name}
        </p>
      </dt>
      <dd className="flex items-baseline pb-2 sm:pb-4">
        <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
        <p
          className={classNames(
            stat.changeType === "positive" ? "text-green-600" : "text-red-600",
            "ml-2 flex items-baseline text-sm font-semibold"
          )}
        >
          {stat.changeType === "positive" ? (
            <ArrowUpIcon
              className="h-5 w-5 flex-shrink-0 self-center text-green-500"
              aria-hidden="true"
            />
          ) : (
            <ArrowDownIcon
              className="h-5 w-5 flex-shrink-0 self-center text-red-500"
              aria-hidden="true"
            />
          )}

          <span className="sr-only">
            {" "}
            {stat.changeType === "positive" ? "Increased" : "Decreased"} by{" "}
          </span>
          {stat.change}
        </p>
      </dd>
      <p className="truncate text-xs font-medium text-gray-500 pb-4">
          Ideal: below 200
        </p>
    </div>
  );
};

export default RoomCard;
