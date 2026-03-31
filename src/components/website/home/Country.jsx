"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import ban from "@/assests/ban.png";
import nepal from "@/assests/nepal.png";
import china from "@/assests/china.png";
import australia from "@/assests/australia.png";
import canada from "@/assests/canada.png";
import germany from "@/assests/germany.png";
import bahrain from "@/assests/bahrain.png";
import japan from "@/assests/japan.png";
import maleysia from "@/assests/maleysia.png";
import morocco from "@/assests/morocco.png";
import newZealand from "@/assests/newZealand.png";
import portugal from "@/assests/portugal.png";
import southKorea from "@/assests/southKorea.png";
import turkey from "@/assests/turkey.png";
import uk from "@/assests/uk.png";
import usa from "@/assests/usa.png";
import stateMap from "@/assests/stateMap.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoFilterOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoArrowLeft } from "react-icons/go";
import SimCard from "@/components/shared/SimCard";

const states = [
  { label: "Popular", value: "Popular" },
  { label: "Asia", value: "Asia" },
  { label: "Europe", value: "Europe" },
  { label: "North America", value: "North America" },
  { label: "South America", value: "South America" },
  { label: "Caribbean", value: "Caribbean" },
  { label: "Africa", value: "Africa" },
  { label: "Oceania", value: "Oceania" },
  { label: "Middle East", value: "Middle East" },
];

const regionState = [
  {
    label: "Asia",
    value: "Asia",
    icon: (
      <Image
        className="w-[42px] h-[30px]"
        src={stateMap}
        alt="state map icon"
      />
    ),
  },
  {
    label: "Europe",
    value: "Europe",
    icon: (
      <Image
        className="w-[42px] h-[30px]"
        src={stateMap}
        alt="state map icon"
      />
    ),
  },
  {
    label: "North America",
    value: "North America",
    icon: (
      <Image
        className="w-[42px] h-[30px]"
        src={stateMap}
        alt="state map icon"
      />
    ),
  },
  {
    label: "South America",
    value: "South America",
    icon: (
      <Image
        className="w-[42px] h-[30px]"
        src={stateMap}
        alt="state map icon"
      />
    ),
  },
  {
    label: "Caribbean",
    value: "Caribbean",
    icon: (
      <Image
        className="w-[42px] h-[30px]"
        src={stateMap}
        alt="state map icon"
      />
    ),
  },
  {
    label: "Africa",
    value: "Africa",
    icon: (
      <Image
        className="w-[42px] h-[30px]"
        src={stateMap}
        alt="state map icon"
      />
    ),
  },
  {
    label: "Oceania",
    value: "Oceania",
    icon: (
      <Image
        className="w-[42px] h-[30px]"
        src={stateMap}
        alt="state map icon"
      />
    ),
  },
  {
    label: "Middle East",
    value: "Middle East",
    icon: (
      <Image
        className="w-[42px] h-[30px]"
        src={stateMap}
        alt="state map icon"
      />
    ),
  },
];

const countries = [
  { label: "Bangladesh", value: "Bangladesh", flag: ban },
  { label: "Nepal", value: "Nepal", flag: nepal },
  { label: "China", value: "China", flag: china },
  { label: "Australia", value: "Australia", flag: australia },
  { label: "Canada", value: "Canada", flag: canada },
  { label: "Germany", value: "Germany", flag: germany },
  { label: "Bahrain", value: "Bahrain", flag: bahrain },
  { label: "Japan", value: "Japan", flag: japan },
  { label: "Malaysia", value: "Malaysia", flag: maleysia },
  { label: "Morocco", value: "Morocco", flag: morocco },
  { label: "New Zealand", value: "New Zealand", flag: newZealand },
  { label: "Portugal", value: "Portugal", flag: portugal },
  { label: "South Korea", value: "South Korea", flag: southKorea },
  { label: "Turkey", value: "Turkey", flag: turkey },
  { label: "UK", value: "UK", flag: uk },
  { label: "USA", value: "USA", flag: usa },
  { label: "Bangladesh", value: "Bangladesh", flag: ban },
  { label: "Nepal", value: "Nepal", flag: nepal },
  { label: "China", value: "China", flag: china },
  { label: "Australia", value: "Australia", flag: australia },
  { label: "Canada", value: "Canada", flag: canada },
  { label: "Germany", value: "Germany", flag: germany },
  { label: "Bahrain", value: "Bahrain", flag: bahrain },
  { label: "Japan", value: "Japan", flag: japan },
  { label: "Malaysia", value: "Malaysia", flag: maleysia },
  { label: "Morocco", value: "Morocco", flag: morocco },
  { label: "New Zealand", value: "New Zealand", flag: newZealand },
  { label: "Portugal", value: "Portugal", flag: portugal },
  { label: "South Korea", value: "South Korea", flag: southKorea },
  { label: "Turkey", value: "Turkey", flag: turkey },
  { label: "UK", value: "UK", flag: uk },
  { label: "USA", value: "USA", flag: usa },
  { label: "Bangladesh", value: "Bangladesh", flag: ban },
  { label: "Nepal", value: "Nepal", flag: nepal },
  { label: "China", value: "China", flag: china },
  { label: "Australia", value: "Australia", flag: australia },
  { label: "Canada", value: "Canada", flag: canada },
  { label: "Germany", value: "Germany", flag: germany },
  { label: "Bahrain", value: "Bahrain", flag: bahrain },
  { label: "Japan", value: "Japan", flag: japan },
  { label: "Malaysia", value: "Malaysia", flag: maleysia },
  { label: "Morocco", value: "Morocco", flag: morocco },
  { label: "New Zealand", value: "New Zealand", flag: newZealand },
  { label: "Portugal", value: "Portugal", flag: portugal },
  { label: "South Korea", value: "South Korea", flag: southKorea },
  { label: "Turkey", value: "Turkey", flag: turkey },
  { label: "UK", value: "UK", flag: uk },
  { label: "USA", value: "USA", flag: usa },
  { label: "Bangladesh", value: "Bangladesh", flag: ban },
  { label: "Nepal", value: "Nepal", flag: nepal },
  { label: "China", value: "China", flag: china },
  { label: "Australia", value: "Australia", flag: australia },
  { label: "Canada", value: "Canada", flag: canada },
  { label: "Germany", value: "Germany", flag: germany },
  { label: "Bahrain", value: "Bahrain", flag: bahrain },
  { label: "Japan", value: "Japan", flag: japan },
  { label: "Malaysia", value: "Malaysia", flag: maleysia },
  { label: "Morocco", value: "Morocco", flag: morocco },
  { label: "New Zealand", value: "New Zealand", flag: newZealand },
  { label: "Portugal", value: "Portugal", flag: portugal },
  { label: "South Korea", value: "South Korea", flag: southKorea },
  { label: "Turkey", value: "Turkey", flag: turkey },
  { label: "UK", value: "UK", flag: uk },
  { label: "USA", value: "USA", flag: usa },
];

const categories = [
  {
    label: "Date",
    value: "Date",
  },
  {
    label: "Date/Call/Texts",
    value: "Date/Call/Texts",
  },
];

const Country = () => {
  const pathname = usePathname();
  const url = pathname;

  const [region, setRegion] = useState("Local");
  const [stateStatus, setStateStatus] = useState("Popular");
  const [categoryState, setCategoryState] = useState("Date");
  const [showCard, setShowCard] = useState("");
  console.log(showCard);

  const shortList = countries?.slice(0, 16);

  return (
    <section className="bg-[#F7F7F7]">
      <div
        className={`max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-10 ${
          url?.includes("shop") && region === "Regional" && "pb-40 md:pb-80"
        }`}
      >
        <div className="flex justify-center items-center mb-8 gap-2 md:gap-6">
          {[
            { label: "Local eSIMs", value: "Local" },
            { label: "Regional eSIMs", value: "Regional" },
            { label: "Global eSIMs", value: "Global" },
          ].map((btn, idx) => (
            <div
              key={idx}
              className="bg-white px-5 py-2.5 rounded-full shadow hover:shadow-md transition-shadow cursor-pointer"
            >
              <button
                onClick={() => setRegion(btn.value)}
                className={cn(
                  "text-xs md:text-lg cursor-pointer",
                  region === btn.value ? "text-[#333333]" : "text-[#A1A1A1]"
                )}
              >
                {btn.label}
              </button>
            </div>
          ))}
        </div>

        {region === "Local" && (
          <div>
            {showCard ? (
              <div>
                {/* state category & search bar */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 border-b-2 pb-5 border-[#EEEEEE]">
                  <button
                    onClick={() => setShowCard("")}
                    className="cursor-pointer text-[#6B6B6B] font-semibold flex items-center gap-2"
                  >
                    <GoArrowLeft className="text-xl" /> <span>{showCard}</span>
                  </button>

                  {/* search bar and filter button */}
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <div
                      className="flex items-center rounded-full px-2 w-[70%] md:w-[280px]"
                      style={{
                        boxShadow: "0px 1px 4px 0px rgba(208, 208, 208, 0.50)",
                      }}
                    >
                      <button>
                        <Search className="text-primary" />
                      </button>
                      <input
                        type="text"
                        placeholder="Search your Choice"
                        className="py-1.5 px-4 focus:outline-none"
                      />
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-10 w-full md:w-[94px] bg-[#EEEEEE] text-[#5C5C5C] rounded-full flex items-center justify-center gap-2">
                        <IoFilterOutline className="text-xl" />{" "}
                        <span>Filter</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* sim cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-6 mt-6">
                  <SimCard />
                  <SimCard />
                  <SimCard />
                  <SimCard />
                  <SimCard />
                  <SimCard />
                  <SimCard />
                  <SimCard />
                </div>
              </div>
            ) : (
              <div>
                {/* state category & search bar */}
                <div className="flex flex-col lg:flex-row justify-center lg:items-center gap-6 lg:gap-2 border-b-2 pb-5 border-[#EEEEEE]">
                  <div className="flex items-center flex-wrap gap-2">
                    {states?.map((state) => (
                      <button
                        onClick={() => setStateStatus(state.value)}
                        className={cn(
                          "px-3 py-1.5 rounded cursor-pointer text-xs md:text-sm",
                          stateStatus === state.value
                            ? "bg-primary text-white"
                            : "bg-[#EEEEEE] text-[#767676]"
                        )}
                        key={state.value}
                      >
                        {state.label}
                      </button>
                    ))}
                  </div>
                  <div
                    className="flex items-center rounded-full px-2"
                    style={{
                      boxShadow: "0px 1px 4px 0px rgba(208, 208, 208, 0.50)",
                    }}
                  >
                    <button>
                      <Search className="text-primary" />
                    </button>
                    <input
                      type="text"
                      placeholder="Search your Choice"
                      className="py-1.5 px-4 focus:outline-none"
                    />
                  </div>
                </div>

                {/* country cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mt-6">
                  {url?.includes("shop")
                    ? countries.map((country, idx) => (
                        <div
                          onClick={() => setShowCard(country?.label)}
                          key={idx}
                          className="flex items-center gap-3 py-4 px-7 rounded-full cursor-pointer"
                          style={{
                            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                          }}
                        >
                          <Image
                            className="h-5 w-8 object-contain"
                            height={20}
                            width={32}
                            src={country.flag}
                            alt={country.label}
                          />
                          <p className="text-[#767676] text-base">
                            {country.label}
                          </p>
                        </div>
                      ))
                    : shortList.map((country, idx) => (
                        <div
                          onClick={() => setShowCard(country?.label)}
                          key={idx}
                          className="flex items-center gap-3 py-4 px-7 rounded-full cursor-pointer"
                          style={{
                            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                          }}
                        >
                          <Image
                            className="h-5 w-8 object-contain"
                            height={20}
                            width={32}
                            src={country.flag}
                            alt={country.label}
                          />
                          <p className="text-[#767676] text-xs md:text-base">
                            {country.label}
                          </p>
                        </div>
                      ))}
                </div>

                {!url?.includes("shop") && (
                  <div className="flex justify-center items-center mt-10">
                    <Link
                      href="/shop"
                      className="text-[#5C5C5C] px-5 py-2.5 rounded-lg border border-[#5C5C5C] cursor-pointer"
                    >
                      View all country
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {region === "Regional" && (
          <div>
            {showCard ? (
              <div>
                {/* state category & search bar */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 border-b-2 pb-5 border-[#EEEEEE] max-w-s">
                  <button
                    onClick={() => setShowCard("")}
                    className="cursor-pointer text-[#6B6B6B] font-semibold flex items-center gap-2"
                  >
                    <GoArrowLeft className="text-xl" /> <span>{showCard}</span>
                  </button>

                  {/* search bar and filter button */}
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <div
                      className="flex items-center rounded-full px-2 w-[70%] md:w-[280px]"
                      style={{
                        boxShadow: "0px 1px 4px 0px rgba(208, 208, 208, 0.50)",
                      }}
                    >
                      <button>
                        <Search className="text-primary" />
                      </button>
                      <input
                        type="text"
                        placeholder="Search your Choice"
                        className="py-1.5 px-4 focus:outline-none"
                      />
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-10 w-full md:w-[94px] bg-[#EEEEEE] text-[#5C5C5C] rounded-full flex items-center justify-center gap-2">
                        <IoFilterOutline className="text-xl" />{" "}
                        <span>Filter</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* sim cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-6 mt-6">
                  <SimCard />
                  <SimCard />
                  <SimCard />
                  <SimCard />
                  <SimCard />
                  <SimCard />
                  <SimCard />
                  <SimCard />
                </div>
              </div>
            ) : (
              <div className="border-t-2 border-[#EEEEEE] pt-6 grid grid-cols-2 lg:grid-cols-3 items-center justify-center gap-2 md:gap-6">
                {regionState?.map((state) => (
                  <div
                    onClick={() => setShowCard(state?.label)}
                    key={state?.value}
                    className="flex items-center gap-3 px-7 rounded-full cursor-pointer lg:w-[364px] h-16 md:h-20 bg-[#FDFDFD] hover:bg-[#e6f5ee]"
                    style={{
                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                    }}
                  >
                    {state?.icon}{" "}
                    <p className="text-xs md:text-base">{state?.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {region === "Global" && (
          <div>
            {/* state category & search bar */}
            <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-6 md:gap-2 border-b-2 pb-5 border-[#EEEEEE] max-w-screen">
              <div className="flex items-center gap-2">
                {categories?.map((category) => (
                  <button
                    onClick={() => setCategoryState(category.value)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded cursor-pointer",
                      categoryState === category.value
                        ? "bg-primary text-white"
                        : "bg-[#EEEEEE] text-[#767676]"
                    )}
                    key={category.value}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* search bar and filter button */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div
                  className="flex items-center rounded-full px-2 w-[70%] md:w-[280px]"
                  style={{
                    boxShadow: "0px 1px 4px 0px rgba(208, 208, 208, 0.50)",
                  }}
                >
                  <button>
                    <Search className="text-primary" />
                  </button>
                  <input
                    type="text"
                    placeholder="Search your Choice"
                    className="py-1.5 px-4 focus:outline-none"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger className="h-10 w-full md:w-[94px] bg-[#EEEEEE] text-[#5C5C5C] rounded-full flex items-center justify-center gap-2">
                    <IoFilterOutline className="text-xl" /> <span>Filter</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* sim cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-6 mt-6">
              <SimCard />
              <SimCard />
              <SimCard />
              <SimCard />
              <SimCard />
              <SimCard />
              <SimCard />
              <SimCard />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Country;
