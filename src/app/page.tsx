"use client";
import { useEffect, useMemo, useState } from "react";
import { Dialog } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { BellIcon, MapPinIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { VayuGunaModel } from "./model";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { TemparatureChartUI } from "./Component/TemparatureComp";
import { HumidityChartUI } from "./Component/HumidityComp";
import TemperatureAreaChart from "./Component/TemperatureAreaChart";
import HumidityAreaChart from "./Component/HumidityAreaChart";
import { useRouter } from 'next/navigation'; 

// export async function getServerSideProps() {
//   const querySnapshot = await getDocs(
//     collection(db, "/Brillio/HubRoom_Historical")
//   );
//   const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   console.log("data", data);
//   return {
//     props: {
//       dataValue: data,
//     },
//   };
// }

const navigation = [{ name: "", href: "#" }];
const secondaryNavigation = [
  { name: "Last 7 days", href: "#", current: true },
  { name: "Last 30 days", href: "#", current: false },
  { name: "Last 90 Days", href: "#", current: false },
];

export default function Example({ dataValue }: { dataValue: any }) {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [data, setData] = useState<VayuGunaModel[]>([
    {
      Temperature: 0,
      Humidity: 0,
    },
  ]);
  const [refresh, setRefresh] = useState(false);
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
          desp: "",
        },
        {
          name: "Humidity",
          value: `${data[0].Humidity.toFixed(2)} % r.H`,
          change: "+10.18%",
          changeType: "negative",
          desp: "",
        },
      ];
    } else {
    }
    return [];
  }, [data]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "/Brillio"));

      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLastUpdated(formatDateTime());
    
    } catch (e) {
     
    }
  };
  useEffect(() => {
    setInterval(fetchData, 5000);
  }, []);

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
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [refresh]);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    console.log(user);
    if (!user) {
      router.push("/login");
    }
  }, []);

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
          <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10 shadow-md">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex flex-1 items-center gap-x-6">
                <a href="#" className="-m-1.5 p-1.5">
                  <Image
                    src="/brillo.png"
                    alt="My Image"
                    className="h-6 w-auto bg-white"
                    width={500}
                    height={500}
                  />
                </a>
              </div>
              <nav className="hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-700">
                {navigation.map((item, itemIdx) => (
                  <a key={itemIdx} href={item.href}>
                    {item.name}
                  </a>
                ))}
              </nav>
              <div>
                <div className="flex flex-1 flex-row items-center justify-end gap-2">
                  <a href="#" className="">
                    <MapPinIcon className="h-4 w-4 text-primary-800" />
                  </a>
                  <p className="text-gray-700 text-sm font-semibold">Chennai</p>
                </div>
                <div className="flex flex-1 flex-row items-center justify-end">
                  <ArrowPathIcon
                    className={`h-4 w-4 mr-1 text-primary-800 ${
                      refresh ? "animate-spin" : ""
                    }`}
                    onClick={() => {
                      setRefresh(true);
                      setTimeout(() => {
                        setRefresh(false);
                      }, 2000);
                    }}
                  />

                  <p className="text-xs text-gray-800 items-baseline">
                    Last updated: {lastUpdated}
                  </p>
                </div>
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
            <div className="flex pt-16 flex-row justify-between lg:px-6 xl:px-8 gap-8 max-w-7xl mt-8 mx-auto">
              <TemparatureChartUI />
              <HumidityChartUI />
            </div>

            {historic && (
              <div>
                {/* <div className="w-full">
                  <header className="pb-4 pt-6 mt-20 sm:pb-6 bg-[#f3f3f7] border-t border-b border-gray-300 ">
                    <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8 justify-between">
                      <h1 className="text-base font-semibold leading-7 text-gray-500">
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
                </div> */}
                <header className="pb-4 pt-6 sm:pb-6">
                  <div className="h-[450px] mx-auto w-full flex max-w-7xl md:flex-row flex-col items-center gap-6 px-0 sm:flex-nowrap sm:px-6 lg:px-8">
                    <TemperatureAreaChart />
                  </div>
                </header>
              </div>
            )}
          </main>

          <footer className="flex flex-row justify-between lg:px-6 xl:px-8 gap-8 max-w-7xl mx-auto">
            <div className="bg-white border border-gray-300  rounded-md px-4 py-2 flex-1 w-full">
              <div className="justify-between flex flex-col items-start">
                <p className="font-medium px-4 sm:px-6">Map Location</p>
                <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
                  <img
                    src="./map.png"
                    alt=""
                    className="h-full w-full object-right md:object-center"
                  />
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
