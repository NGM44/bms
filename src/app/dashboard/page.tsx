'use client';
import { useEffect, useMemo, useState } from "react";
import { Dialog } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { MapPinIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { TemparatureChartUI } from "../Component/TemparatureComp";
import { HumidityChartUI } from "../Component/HumidityComp";
import TemperatureAreaChart from "../Component/TemperatureAreaChart";
import { useRouter } from 'next/navigation';

function sortDates(datesArray: any) {
  if (datesArray && datesArray.length > 1) {
    datesArray.sort((dataPointA: any, dataPointB: any) => {
      // Extract timestamps
      const timestampA = dataPointA.myTimestamp;
      const timestampB = dataPointB.myTimestamp;
      // datesArray.sort((dateA:any, dateB:any) => {
      // Split the date and time components
      const [datePartA, timePartA] = timestampA.split(", ");
      const [datePartB, timePartB] = timestampB.split(", ");

      // Split the date components into day, month, and year
      const [dayA, monthA, yearA] = datePartA.split("-");
      const [dayB, monthB, yearB] = datePartB.split("-");

      // Split the time components into hours and minutes
      const [hoursA, minutesA] = timePartA.split(":");
      const [hoursB, minutesB] = timePartB.split(":");

      // Create Date objects for comparison
      const dateObjectA: any = new Date(
        yearA,
        monthA - 1,
        dayA,
        hoursA,
        minutesA
      );
      const dateObjectB: any = new Date(
        yearB,
        monthB - 1,
        dayB,
        hoursB,
        minutesB
      );

      // Compare the Date objects and return the appropriate sorting order
      return dateObjectA - dateObjectB;
    });

    return datesArray;
  } else {
    return [];
  }
}

const navigation = [{ name: "", href: "#" }];
const secondaryNavigation = [
  { name: "Last 7 days", href: "#", current: true },
  { name: "Last 30 days", href: "#", current: false },
  { name: "Last 90 Days", href: "#", current: false },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [graphData, setGraphData] = useState<any>([]);
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "/Brillio"));

      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortedValues = sortDates(fetchedData);
      setGraphData(sortedValues);

      setLastUpdated(formatDateTime());
    } catch (e) {}
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
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/");
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
                <p className="text-gray-700 text-sm font-semibold">
                  Brillio, Chennai
                </p>
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
          <div className="flex pt-16 sm:flex-row flex-col justify-between lg:px-6 xl:px-8 gap-8 max-w-7xl mt-8 mx-auto">
            {graphData[graphData.length - 1] && (
              <TemparatureChartUI
                value={graphData[graphData.length - 1].Temperature}
              />
            )}
            {/* <Dummy /> */}
            {graphData[graphData.length - 1] && (
              <HumidityChartUI
                value={graphData[graphData.length - 1].Humidity}
              />
            )}
          </div>

          {historic && (
            <header className="pb-4 pt-6 sm:pb-6">
              <div className="h-[450px] mx-auto w-full flex max-w-7xl md:flex-row flex-col items-center gap-6 px-0 sm:flex-nowrap sm:px-6 lg:px-8">
                <TemperatureAreaChart sortedValues={graphData ?? []} />
              </div>
            </header>
          )}
        </main>

        <footer className="flex flex-row justify-between lg:px-6 xl:px-8 gap-8 max-w-7xl mx-auto">
          <div className="bg-white border border-gray-300  rounded-2xl px-4 py-2 flex-1 w-full">
            <div className="justify-between flex flex-col items-start">
              <p className="font-medium px-4 sm:px-4">Location</p>
              <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-5">
                <img
                  src="./map.png"
                  alt=""
                  className="h-full w-full rounded-2xl object-right md:object-center"
                />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
