"use client";
import { Fragment, useEffect, useMemo, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "../firebaseConfig";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  Bars3Icon,
  EllipsisHorizontalIcon,
  PlusSmallIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  TvIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AirScaleModel } from "../model";
import BarChart from "../Component/chart";
import AreaChart from "../Component/AreaChart";
import GridInfo from "../Component/grid";
import DropDown from "../Component/dropdown";
import Image from "next/image";
import RoomCard from "../Component/RoomCard";
import Office from "../Component/office";
import RoomCard2 from "../Component/RoomCard2";
import BreadCrums from "../Component/BreadCrums";
import { progressChart } from "../Component/AQIMeter";
import { MyComponent } from "../Component/comp";

const navigation = [{ name: "", href: "#" }];
const secondaryNavigation = [
  { name: "Last 7 days", href: "#", current: true },
  { name: "Last 30 days", href: "#", current: false },
  { name: "All-time", href: "#", current: false },
];

const days = [
  {
    date: "Today",
    dateTime: "2023-03-22",
    transactions: [
      {
        id: 1,
        invoiceNumber: "00012",
        href: "#",
        amount: "$7,600.00 USD",
        tax: "$500.00",
        status: "Paid",
        client: "Reform",
        description: "Website redesign",
        icon: ArrowUpCircleIcon,
      },
      {
        id: 2,
        invoiceNumber: "00011",
        href: "#",
        amount: "$10,000.00 USD",
        status: "Withdraw",
        client: "Tom Cook",
        description: "Salary",
        icon: ArrowDownCircleIcon,
      },
      {
        id: 3,
        invoiceNumber: "00009",
        href: "#",
        amount: "$2,000.00 USD",
        tax: "$130.00",
        status: "Overdue",
        client: "Tuple",
        description: "Logo design",
        icon: ArrowPathIcon,
      },
    ],
  },
  {
    date: "Yesterday",
    dateTime: "2023-03-21",
    transactions: [
      {
        id: 4,
        invoiceNumber: "00010",
        href: "#",
        amount: "$14,000.00 USD",
        tax: "$900.00",
        status: "Paid",
        client: "SavvyCal",
        description: "Website redesign",
        icon: ArrowUpCircleIcon,
      },
    ],
  },
];
const clients = [
  {
    id: 1,
    name: "Tuple",
    imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
    lastInvoice: {
      date: "December 13, 2022",
      dateTime: "2022-12-13",
      amount: "$2,000.00",
      status: "Overdue",
    },
  },
  {
    id: 2,
    name: "SavvyCal",
    imageUrl: "https://tailwindui.com/img/logos/48x48/savvycal.svg",
    lastInvoice: {
      date: "January 22, 2023",
      dateTime: "2023-01-22",
      amount: "$14,000.00",
      status: "Paid",
    },
  },
  {
    id: 3,
    name: "Reform",
    imageUrl: "https://tailwindui.com/img/logos/48x48/reform.svg",
    lastInvoice: {
      date: "January 23, 2023",
      dateTime: "2023-01-23",
      amount: "$7,600.00",
      status: "Paid",
    },
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [data, setData] = useState<AirScaleModel[]>();
  const [refresh, setRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [period, setPeriod] = useState("Last 7 days");
  const stats1 = useMemo(() => {
    if (data) {
      return [
        {
          name: "Temparature",
          value: `${data[0].Temperature.toFixed(2)}°C`,
          change: "+4.75%",
          changeType: "positive",
          desp: "20-24°C (68-75°F) for comfort, but adjustable based on preference and activities.",
        },
        {
          name: "Humidity",
          value: `${data[0].Humidity.toFixed(2)} % r.H`,
          change: "+10.18%",
          changeType: "negative",
          desp: "30-60% RH for comfort and to prevent mold growth",
        },
        {
          name: "CO2",
          value: `${data[0].CO2} ppm`,
          change: "1.39%",
          changeType: "positive",
          desp: "Below 1000 parts per million (ppm) for optimal indoor air quality.",
        },

        {
          name: "Barometric Pressure",
          value: `${data[0].Pressure.toFixed(2)} hPa`,
          change: "+54.02%",
          changeType: "negative",
          desp: "Typically ranges around 1013 millibars (mb)",
        },
      ];
    } else {
    }
    return [];
  }, [data]);

  const stats2 = useMemo(() => {
    if (data) {
      return [
        {
          name: "VOC",
          value: `${data[0].VOC} ppm`,
          change: "+4.75%",
          changeType: "positive",
          desp: "Below 0.3 mg/m^3 for most VOCs to ensure good air quality.",
        },

        {
          name: "Noise Level",
          value: `${data[0].Noise} dB`,
          change: "+10.18%",
          changeType: "negative",
          desp: "Below 45-55 decibels (dB) for indoor environments, although acceptable levels can vary based on the activity and preference of occupants.",
        },

        {
          name: "Ambient Light",
          value: `${data[0].Light.toFixed(2)} Klx`,
          change: "1.39%",
          changeType: "positive",
          desp: "500-1000 lux for general indoor spaces.",
        },
        {
          name: "Altitude",
          value: data[0].Altitude,
          change: "+54.02%",
          changeType: "negative",
        },
      ];
    } else {
    }
    return [];
  }, [data]);

  const stats3 = useMemo(() => {
    if (data) {
      return [
        {
          name: "AQI",
          value: `${data[0].AQI}`,
          change: "+4.75%",
          changeType: "positive",
          desp: "Ideally Below 50.",
        },

        {
          name: "NOx",
          value: `${data[0].NOx}`,
          change: "+10.18%",
          changeType: "negative",
          desp: "Below 0.05 ppm for comfort and health.",
        },
      ];
    } else {
    }
    return [];
  }, [data]);

  const stats4 = useMemo(() => {
    if (data) {
      return [
        {
          name: "PM1",
          value: `${data[0].PM1.toFixed(3)} µg/m³`,
          change: "+4.75%",
          changeType: "positive",
          desp: "Below 10 µg/m³",
        },
        {
          name: "PM10",
          value: `${data[0].PM10.toFixed(3)} µg/m³`,
          change: "+10.18%",
          changeType: "negative",
          desp: "Below 20 µg/m³",
        },

        {
          name: "PM2_5",
          value: `${data[0].PM2_5.toFixed(3)} µg/m³`,
          change: "1.39%",
          changeType: "positive",
          desp: "Below 12 µg/m³ (for optimal health)",
        },
        {
          name: "PM4",
          value: `${data[0].PM4.toFixed(3)} µg/m³`,
          change: "+54.02%",
          changeType: "negative",
          desp: "Below 15 µg/m³",
        },
      ];
    } else {
    }
    return [];
  }, [data]);

  useEffect(() => {
    if (refresh) {
      setTimeout(function () {
        const usersRef = ref(database);

        get(usersRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log("snapshot", snapshot);
              const usersArray = Object.entries(snapshot.val()).map(
                ([id, data]: any) => ({
                  id,
                  ...data,
                })
              );
              setData(usersArray);
              console.log("snapshot", usersArray);
            }
          })
          .catch((errors) => {
            console.log("errors", errors);
          });
        setRefresh(false);
        setLastUpdated(formatDateTime());
      }, 2000);
    }
  }, [refresh]);

  const [historic, setHistoric] = useState(false);
  function formatDateTime() {
    const date = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 12 instead of 0
    minutes = minutes < 10 ? 0 + minutes : minutes;

    const formattedDateTime = `${month} ${day} ${year}, ${hours}:${minutes} ${ampm}`;
    return formattedDateTime;
  }
  return (
    <>
      {refresh && (
        <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
          <div className="flex justify-center items-center mt-[50vh]">
            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
              <ArrowPathIcon className={`-ml-1.5 h-5 w-5`} aria-hidden="true" />
            </svg>
            <div className="fas fa-circle-notch fa-spin fa-5x text-violet-600"></div>
          </div>
        </div>
      )}
      {data && (
        <div>
          <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex flex-1 items-center gap-x-6">
                {/* <button
                  type="button"
                  className="-m-3 p-3 md:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    className="h-5 w-5 text-gray-900"
                    aria-hidden="true"
                  />
                </button> */}
                <Image
                  src="/image1.png"
                  alt="My Image"
                  className="h-10 w-auto"
                  width={500} // Adjust width as needed
                  height={500} // Adjust height as needed
                />
                {/* <h1 className="text-lg font-semibold leading-7 text-gray-900">
                  Dashboard
                </h1> */}
                {/* <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
              </div>
              <nav className="hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-700">
                {navigation.map((item, itemIdx) => (
                  <a key={itemIdx} href={item.href}>
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="flex flex-1 items-center justify-end gap-x-8">
                <button
                  onClick={() => {
                    setHistoric(!historic);
                  }}
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your profile</span>
                  <Image
                    src="/CompanyLogo.png"
                    alt="My Image"
                    className="h-8 w-auto rounded-full bg-white"
                    width={500} // Adjust width as needed
                    height={500} // Adjust height as needed
                  />
                  {/* <img
                className="h-8 w-8 rounded-full bg-gray-800"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              /> */}
                </a>
              </div>
            </div>
            <Dialog
              as="div"
              className="lg:hidden"
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
            >
              <div className="fixed inset-0 z-50" />
              <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
                <div className="-ml-0.5 flex h-16 items-center gap-x-6">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="-ml-0.5">
                    <a href="#" className="-m-1.5 block p-1.5">
                      <span className="sr-only">Your Company</span>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </Dialog.Panel>
            </Dialog>
          </header>

          <main>
            {/* <div className="relative isolate overflow-hidden pt-16"> */}
            {/* Secondary navigation */}
            <div className="pt-16">
              <header className="pb-4 pt-6 sm:pb-6">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8 justify-between">
                  <div>
                    <BreadCrums />
                    {/* <div className="flex flex-row items-center">
                      <h1 className="text-base font-semibold leading-7 mr-2 text-gray-900">
                        Office 1
                      </h1>
                      
                    </div>

                    <div className="flex flex-row items-center">
                      <h1 className="text-base font-semibold leading-7 mr-2 text-gray-900">
                        Updated at
                      </h1>
                      <div className="order-last cursor-pointer flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                        24 Mar 2024, 12:47 PM
                      </div>
                    </div> */}
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <p className="text-xs text-gray-400 pt-3 items-baseline">
                      Last updated: {lastUpdated}
                    </p>
                    <div
                      onClick={() => {
                        setRefresh(true);
                      }}
                      className="ml-auto flex cursor-pointer items-center gap-x-1 rounded-md bg-primary-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    >
                      <ArrowPathIcon
                        className={`-ml-1.5 h-5 w-5 ${
                          refresh ? "animate-spin" : ""
                        }`}
                        aria-hidden="true"
                      />
                      Refresh
                    </div>
                    <DropDown />
                  </div>
                </div>
              </header>

              <dl className="mx-auto grid max-w-7xl mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-6 xl:px-8 gap-8 ">
                {stats1.map((stat, statIdx) => (
                  <RoomCard key={stat.name} stat={stat} />
                ))}
              </dl>
              <dl className="mx-auto grid max-w-7xl mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-6 xl:px-8 gap-8 ">
                {stats2.map((stat, statIdx) => (
                  <RoomCard key={stat.name} stat={stat} />
                ))}
              </dl>
              <dl className="mx-auto grid max-w-7xl mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:px-6 xl:px-8 gap-8 ">
                <div className="flex flex-col gap-8">
                  <div className="grid grid-cols-2 gap-8">
                    {stats3.map((stat, statIdx) => (
                      <RoomCard key={stat.name} stat={stat} />
                    ))}{" "}
                  </div>
                  <RoomCard
                    key={"Structural"}
                    stat={{
                      name: "Structural",
                      value: `${data[0].Structural} g`,
                      change: "+4.75%",
                      changeType: "positive",
                      desp: "",
                    }}
                  />
                </div>

                <MyComponent />
              </dl>

              {/* <div id="main" className="w-96 h-96"></div> */}
              {/* <div className="flex flex-col gap-8 h-full bg-black items-center justify-between">*/}
              <div className="flex-1 bg-white shadow border border-slate-100 rounded-md py-4 mt-8">
                <p className="pb-4 -p-2 text-center font-medium text-black">
                  Particulate Matter
                </p>
                <dl className="mx-auto grid max-w-7xl mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-6 xl:px-8 gap-8 ">
                  {stats4.map((stat, statIdx) => (
                    <RoomCard key={stat.name} stat={stat} />
                  ))}
                </dl>
              </div>
              {/* </div> */}
            </div>
            {historic && (
              <div>
                <div className="w-full">
                  <header className="pb-4 pt-6 mt-20 sm:pb-6 bg-[#f3f3f7]">
                    <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8 justify-between">
                      <h1 className="text-base font-semibold leading-7 text-gray-900">
                        Historical Information
                      </h1>
                      <div className="order-last flex w-full gap-x-8 text-sm cursor-pointer font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                        {secondaryNavigation.map((item) => (
                          <div
                            key={item.name}
                            onClick={() => {
                              setPeriod(item.name);
                            }}
                            className={
                              item.name === period
                                ? "text-primary-800"
                                : "text-gray-700"
                            }
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </header>
                </div>
                <header className="pb-4 pt-6 sm:pb-6">
                  <div className="mx-auto flex max-w-7xl md:flex-row flex-col items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
                    <div className="flex-1">
                      <AreaChart />
                    </div>
                    <div className="flex-1">
                      <BarChart />
                    </div>
                  </div>
                </header>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
}
