"use client";
import { Fragment, useEffect, useMemo, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "./firebaseConfig";
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
import { AirScaleModel } from "./model";
import BarChart from "./Component/chart";
import AreaChart from "./Component/AreaChart";
import GridInfo from "./Component/grid";
import DropDown from "./Component/dropdown";
import Image from "next/image";
import RoomCard from "./Component/RoomCard";
import Office from "./Component/office";
import RoomCard2 from "./Component/RoomCard2";
import BreadCrums from "./Component/BreadCrums";

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
  const [period, setPeriod] = useState("Last 7 days");
  const stats = useMemo(() => {
    if (data) {
      return [
        {
          name: "AQI",
          value: data[0].AQI,
          change: "+4.75%",
          changeType: "positive",
        },
        {
          name: "Noise Level",
          value: data[0].Noise,
          change: "+10.18%",
          changeType: "negative",
        },

        {
          name: "CO2",
          value: data[0].CO2,
          change: "1.39%",
          changeType: "positive",
        },
        {
          name: "NOX",
          value: data[0].NOx,
          change: "+54.02%",
          changeType: "negative",
        },
      ];
    } else {
    }
    return [];
  }, [data]);

  const stat1 = useMemo(() => {
    if (data) {
      return [
        {
          id: 1,
          name: "NOx",
          value: data[0].NOx,
          // change: "+4.75%",
          // changeType: "positive",
        },
        {
          id: 2,
          name: "NOx",
          value: data[0].NOx,
        },
        {
          id: 3,
          name: "Noise",
          value: data[0].Noise,
        },
        {
          id: 4,
          name: "Pressure",
          value: data[0].Pressure,
        },
      ];
    } else {
    }
    return [];
  }, [data]);

  const stat2 = useMemo(() => {
    if (data) {
      return [
        {
          id: 1,
          name: "PM1",
          value: data[0].PM1,
        },
        {
          id: 2,
          name: "PM10",
          value: data[0].PM10,
        },
        {
          id: 3,
          name: "PM2_5",
          value: data[0].PM2_5,
        },
        {
          id: 4,
          name: "PM4",
          value: data[0].PM4,
        },
      ];
    } else {
    }
    return [];
  }, [data]);
  console.log(data);

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
      }, 2000);
    }
  }, [refresh]);

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
                <button
                  type="button"
                  className="-m-3 p-3 md:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    className="h-5 w-5 text-gray-900"
                    aria-hidden="true"
                  />
                </button>
                <Image
                  src="/AirscaleLogo.png"
                  alt="My Image"
                  className="h-8 w-auto"
                  width={500} // Adjust width as needed
                  height={500} // Adjust height as needed
                />
                <h1 className="text-base font-semibold leading-7 text-gray-900">
                  Airscale
                </h1>
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

              {/* Stats */}
              {/* <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5"> */}
              <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-6 xl:px-8 gap-8 ">
                {stats.map((stat, statIdx) => (
                  <RoomCard key={stat.name} stat={stat} />
                ))}
              </dl>
            </div>

            <header className="pb-4 pt-8 sm:pb-6">
              <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
                <div className="flex-1 ">
                  {
                    <div className="flex flex-col gap-8 h-full  items-center justify-between">
                      <div className="flex-1 bg-[#f3f3f7] rounded-md md:p-4 px-20 py-4">
                        <p className="pb-4 -p-2 text-center font-medium text-black">
                          Particulate Matter Details
                        </p>
                        <div className="flex md:flex-row flex-col gap-4">
                          <RoomCard2
                            stat={{
                              name: "PM1",
                              value: `${data[0].PM1.toFixed(2)} µg/m³`,
                            }}
                          />
                          <RoomCard2
                            stat={{
                              name: "PM10",
                              value: `${data[0].PM10.toFixed(2)} µg/m³`,
                            }}
                          />
                          <RoomCard2
                            stat={{
                              name: "PM2_5",
                              value: `${data[0].PM2_5.toFixed(2)} µg/m³`,
                            }}
                          />
                          <RoomCard2
                            stat={{
                              name: "PM4",
                              value: `${data[0].PM4.toFixed(2)} µg/m³`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row gap-4 justify-between w-full">
                        <div className="flex-1">
                          <RoomCard2
                            stat={{
                              name: "Altitude",
                              value: `${data[0].Altitude.toFixed(2)} KM`,
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <RoomCard2
                            stat={{
                              name: "Structural health",
                              value: `${data[0].Structural} g`,
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <RoomCard2
                            stat={{
                              name: "VOC",
                              value: `${data[0].VOC} ppm`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  }
                </div>
                <div className="flex-1 bg-[#f3f3f7] rounded-md md:p-4 p-1">
                  <div className="flex flex-row  gap-4">
                    <div className="bg-primary-800 rounded-md relative">
                      <Image
                        src="/office.png"
                        alt="My Image"
                        className="h-full w-auto relative rounded-md"
                        width={500} // Adjust width as needed
                        height={500} // Adjust height as needed
                      />
                    </div>

                    <div className="flex flex-col  gap-8 items-center">
                      <div className="justify-between">
                        <p className="text-black font-medium float-left">
                          Environment Details
                        </p>
                        <p></p>
                      </div>
                      <div className="flex flex-row  gap-4 justify-between">
                        <RoomCard2
                          stat={{
                            name: "Temparature",
                            value: `${data[0].Temperature.toFixed(2)}°C`,
                            description: "",
                            icon: (
                              <Image
                                src="/temp.png"
                                alt="My Image"
                                className="h-6 w-4 opacity-50 relative rounded-md"
                                width={500} // Adjust width as needed
                                height={500} // Adjust height as needed
                              />
                            ),
                          }}
                        />
                        <RoomCard2
                          stat={{
                            name: "Humidity",
                            value: `${data[0].Humidity.toFixed(2)} % r.H`,
                            description: "",
                            icon: (
                              <Image
                                src="/hum.png"
                                alt="My Image"
                                className="h-6 w-6 opacity-50 relative rounded-md"
                                width={500} // Adjust width as needed
                                height={500} // Adjust height as needed
                              />
                            ),
                          }}
                        />
                      </div>
                      <div className="flex flex-row gap-4 justify-between">
                        <RoomCard2
                          stat={{
                            name: "Ambient Light",
                            value: `${data[0].Light.toFixed(2)} Klx`,
                            description: "",
                            icon: (
                              <Image
                                src="/light2.png"
                                alt="My Image"
                                className="h-6 w-8 opacity-50 relative rounded-md"
                                width={500} // Adjust width as needed
                                height={500} // Adjust height as needed
                              />
                            ),
                          }}
                        />
                        <RoomCard2
                          stat={{
                            name: "Barometric Pressure",
                            value: `${data[0].Pressure.toFixed(2)} hPa`,
                            icon: (
                              <Image
                                src="/baro.webp"
                                alt="My Image"
                                className="h-6 w-8 opacity-50 relative rounded-md"
                                width={500} // Adjust width as needed
                                height={500} // Adjust height as needed
                              />
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
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
                          item.name === period ? "text-primary-800" : "text-gray-700"
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
          </main>
        </div>
      )}
    </>
  );
}
