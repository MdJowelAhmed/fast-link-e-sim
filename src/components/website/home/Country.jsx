"use client";

import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
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
import {
  useGetCountriesBasedOnRegionQuery,
  useGetRegionsQuery,
} from "@/helpers/regionsApi";

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
  const [stateStatus, setStateStatus] = useState("Oceania");
  const [categoryState, setCategoryState] = useState("Date");
  const [showCard, setShowCard] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data: regionsResponse, isLoading: isRegionsLoading } =
    useGetRegionsQuery();
  const localTabs = regionsResponse?.data?.countrysRegions ?? [];
  const regionalItems = regionsResponse?.data?.subregions ?? [];

  useEffect(() => {
    if (!localTabs.length) return;
    if (!localTabs.includes(stateStatus)) {
      setStateStatus(localTabs.includes("Oceania") ? "Oceania" : localTabs[0]);
    }
  }, [localTabs, stateStatus]);

  const {
    data: countriesResponse,
    isLoading: isCountriesLoading,
    isFetching: isCountriesFetching,
  } = useGetCountriesBasedOnRegionQuery(stateStatus, {
    skip: region !== "Local" || !stateStatus,
  });

  const countries = useMemo(
    () =>
      (countriesResponse?.data ?? []).filter((country) =>
        country?.name?.toLowerCase().includes(searchText.toLowerCase())
      ),
    [countriesResponse?.data, searchText]
  );

  const shortList = countries?.slice(0, 16);
  const filteredRegionalItems = useMemo(
    () =>
      regionalItems.filter((item) =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase())
      ),
    [regionalItems, searchText]
  );

  const handleRegionChange = (value) => {
    setRegion(value);
    setShowCard("");
    setSearchText("");
    if (value === "Local") {
      setStateStatus(localTabs.includes("Oceania") ? "Oceania" : localTabs[0] ?? "Oceania");
    }
  };

  const renderSearchInput = (className = "py-1.5 px-4 focus:outline-none") => (
    <input
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Search your Choice"
      className={className}
    />
  );

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
                onClick={() => handleRegionChange(btn.value)}
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
                    {localTabs?.map((state) => (
                      <button
                        onClick={() => {
                          setStateStatus(state);
                          setShowCard("");
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded cursor-pointer text-xs md:text-sm",
                          stateStatus === state
                            ? "bg-primary text-white"
                            : "bg-[#EEEEEE] text-[#767676]"
                        )}
                        key={state}
                      >
                        {state}
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
                    {renderSearchInput()}
                  </div>
                </div>

                {/* country cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mt-6">
                  {isRegionsLoading || isCountriesLoading || isCountriesFetching ? (
                    <p className="col-span-full text-sm text-[#767676]">
                      Loading countries...
                    </p>
                  ) : (url?.includes("shop") ? countries : shortList).length ? (
                    (url?.includes("shop") ? countries : shortList).map(
                      (country, idx) => (
                        <div
                          onClick={() => setShowCard(country?.name)}
                          key={idx}
                          className="flex items-center gap-3 py-4 px-7 rounded-full cursor-pointer"
                          style={{
                            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                          }}
                        >
                          <img
                            className="h-5 w-8 object-contain"
                            src={country?.flag}
                            alt={country?.name}
                          />
                          <p className="text-[#767676] text-xs md:text-base">
                            {country?.name}
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <p className="col-span-full text-sm text-[#767676]">
                      No countries found for {stateStatus}.
                    </p>
                  )}
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
                {isRegionsLoading ? (
                  <p className="col-span-full text-sm text-[#767676]">
                    Loading regional eSIMs...
                  </p>
                ) : filteredRegionalItems.length ? (
                  filteredRegionalItems?.map((state) => (
                    <div
                      onClick={() => setShowCard(state?.name)}
                      key={state?.slugname}
                      className="flex items-center gap-3 px-4 md:px-7 rounded-full cursor-pointer lg:w-[364px] h-16 md:h-20 bg-[#FDFDFD] hover:bg-[#e6f5ee]"
                      style={{
                        boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      {state?.image ? (
                        <img
                          className="w-[42px] h-[30px] rounded object-cover"
                          src={state.image}
                          alt={state.name}
                        />
                      ) : (
                        <Image
                          className="w-[42px] h-[30px]"
                          src={stateMap}
                          alt="state map icon"
                        />
                      )}
                      <p className="text-xs md:text-base">{state?.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-sm text-[#767676]">
                    No regional data found.
                  </p>
                )}
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
