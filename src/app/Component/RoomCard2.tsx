import {
    ArrowDownIcon,
    ArrowUpIcon,
    TvIcon,
  } from "@heroicons/react/24/outline";
  import React from "react";
  
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  
  const RoomCard2 = ({stat}:{stat: any}) => {

  
    return (
      <div
        key={stat.name}
        className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow sm:px-6 sm:pt-6 border border-slate-50"
      >
        <dt className="flex flex-row gap-4">
          {stat?.icon && <div className="rounded-md animate-pulse">
         {stat.icon}
            {/* <item.icon className="h-6 w-6 text-white" aria-hidden="true" /> */}
          </div>}
          <p className="truncate text-sm font-medium text-gray-500">
            {stat.name}
          </p>
        </dt>
        <dd className="flex items-baseline pb-2 sm:pb-4">
          <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
        </dd>
       {stat.description && <p className="truncate text-xs font-medium text-gray-500 pb-4">
            {stat.description}
          </p>}
      </div>
    );
  };
  
  export default RoomCard2;
  