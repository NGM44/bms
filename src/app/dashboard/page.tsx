"use client";
import { useEffect, useMemo, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "../firebaseConfig";
import { Dialog } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AirScaleModel, VayuGunaModel } from "../model";
import BarChart from "../Component/chart";
import AreaChart from "../Component/AreaChart";
import DropDown from "../Component/dropdown";
import Image from "next/image";
import RoomCard from "../Component/RoomCard";
import BreadCrums from "../Component/BreadCrums";
import { MyComponent } from "../Component/comp";
import Link from "next/link";

const navigation = [{ name: "", href: "#" }];
const secondaryNavigation = [
  { name: "Last 7 days", href: "#", current: true },
  { name: "Last 30 days", href: "#", current: false },
  { name: "Last 90 Days", href: "#", current: false },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [data, setData] = useState<VayuGunaModel[]>([
    {
      Temperature: 0,
      Humidity: 0,
    },
  ]);
  const [refresh, setRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [period, setPeriod] = useState("Last 7 days");
  const stats1 = useMemo(() => {
    if (data) {
      return [
        {
          name: "Temperature",
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
      ];
    } else {
    }
    return [];
  }, [data]);

  useEffect(() => {
    if (refresh) {
      setTimeout(function () {
        const usersRef = ref(database);

        // get(usersRef)
        //   .then((snapshot) => {
        //     if (snapshot.exists()) {
        //       console.log("snapshot", snapshot);
        //       const usersArray = Object.entries(snapshot.val()).map(
        //         ([id, data]: any) => ({
        //           id,
        //           ...data,
        //         })
        //       );
        //       setData(usersArray);
        //       console.log("snapshot", usersArray);
        //     }
        //   })
        //   .catch((errors) => {
        //     console.log("errors", errors);
        //   });
        setRefresh(false);
        setLastUpdated(formatDateTime());
      }, 500);
    }
  }, [refresh]);

  const [historic, setHistoric] = useState(true);
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
               
                <Link
                  href="/"
                  className="text-primary-800 font-bold text-lg -tracking-tight"
                >
                  Vayuguna
                </Link>
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
            <div className="pt-16">
              <header className="pb-4 pt-6 sm:pb-6">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8 justify-between">
                  <div>
                    <BreadCrums />
                  </div>
                  <div className="sm:block hidden flex flex-row items-center gap-4">
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
                  <div className="mx-auto w-full flex max-w-7xl md:flex-row flex-col items-center gap-6 px-0 sm:flex-nowrap sm:px-6 lg:px-8">
                    {/* <div className="flex-1"> */}
                      <AreaChart />
                    {/* </div> */}
                    {/* <div className="flex-1"> */}
                      <BarChart />
                    {/* </div> */}
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
