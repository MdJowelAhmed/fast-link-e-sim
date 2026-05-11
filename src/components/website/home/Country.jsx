"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { asArray, cn } from "@/lib/utils";
import { Search } from "lucide-react";
import stateMap from "@/assests/stateMap.svg";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import Pagination from "@/components/shared/Pagination";
import {
  useGetCountriesBasedOnRegionQuery,
  useGetRegionsQuery,
} from "@/helpers/regionsApi";
import { useGetEsimsQuery, useGetEsimRegionsQuery } from "@/helpers/eSimApi";
import Loading from "@/app/loading";

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

/** Items per page in the UI (pagination is client-side only). */
const PACKAGES_PAGE_SIZE = 12;
/** Ask the API for one large page so we can slice in the browser. */
const ESIM_FETCH_LIMIT = 5000;

const TAB_QUERY_KEY = "tab";

const REGION_FROM_TAB = {
  local: "Local",
  regional: "Regional",
  global: "Global",
};

const TAB_FROM_REGION = {
  Local: "local",
  Regional: "regional",
  Global: "global",
};

function regionFromSearchParams(searchParams) {
  const raw = searchParams.get(TAB_QUERY_KEY)?.toLowerCase();
  if (raw && REGION_FROM_TAB[raw]) return REGION_FROM_TAB[raw];
  return "Local";
}

const CountryContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = pathname;

  const region = useMemo(
    () => regionFromSearchParams(searchParams),
    [searchParams]
  );
  const [stateStatus, setStateStatus] = useState("");
  const [categoryState, setCategoryState] = useState("Date");

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegionalSlug, setSelectedRegionalSlug] = useState(null);
  const [selectedRegionalName, setSelectedRegionalName] = useState("");

  const [searchText, setSearchText] = useState("");
  const [debouncedCountryName, setDebouncedCountryName] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedCountryName(searchText);
    }, 400);
    return () => clearTimeout(t);
  }, [searchText]);
  const [packageSearch, setPackageSearch] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");

  const [localPackagesPage, setLocalPackagesPage] = useState(1);
  const [regionalPackagesPage, setRegionalPackagesPage] = useState(1);
  const [globalPackagesPage, setGlobalPackagesPage] = useState(1);

  const { data: regionsResponse, isLoading: isRegionsLoading } =
    useGetRegionsQuery();
  const localTabs = asArray(regionsResponse?.data?.countrysRegions);
  const regionalItems = asArray(regionsResponse?.data?.subregions);

  useEffect(() => {
    if (!localTabs.length) return;
    if (!localTabs.includes(stateStatus)) {
      setStateStatus(localTabs[0]);
    }
  }, [localTabs, stateStatus]);

  useEffect(() => {
    setLocalPackagesPage(1);
  }, [selectedCountry?.cca2]);

  useEffect(() => {
    setRegionalPackagesPage(1);
  }, [selectedRegionalSlug]);

  useEffect(() => {
    setLocalPackagesPage(1);
    setRegionalPackagesPage(1);
  }, [packageSearch]);

  useEffect(() => {
    setGlobalPackagesPage(1);
  }, [globalSearch]);

  const {
    data: countriesResponse,
    isLoading: isCountriesLoading,
    isFetching: isCountriesFetching,
  } = useGetCountriesBasedOnRegionQuery(
    { region: stateStatus, countryName: debouncedCountryName },
    { skip: region !== "Local" || !stateStatus }
  );

  const countries = useMemo(
    () => asArray(countriesResponse?.data),
    [countriesResponse?.data]
  );

  const shortList = countries?.slice(0, 16);
  const filteredRegionalItems = useMemo(
    () =>
      regionalItems.filter((item) =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase())
      ),
    [regionalItems, searchText]
  );

  const {
    data: localPackagesResponse,
    isLoading: isLocalPackagesLoading,
    isFetching: isLocalPackagesFetching,
  } = useGetEsimsQuery(
    {
      type: "local",
      country: selectedCountry?.cca2,
      page: 1,
      limit: ESIM_FETCH_LIMIT,
    },
    { skip: region !== "Local" || !selectedCountry?.cca2 }
  );

  const {
    data: regionalPackagesResponse,
    isLoading: isRegionalPackagesLoading,
    isFetching: isRegionalPackagesFetching,
  } = useGetEsimRegionsQuery(
    {
      slug: selectedRegionalSlug,
      page: 1,
      limit: ESIM_FETCH_LIMIT,
    },
    { skip: region !== "Regional" || !selectedRegionalSlug }
  );

  const {
    data: globalPackagesResponse,
    isLoading: isGlobalPackagesLoading,
    isFetching: isGlobalPackagesFetching,
  } = useGetEsimsQuery(
    { type: "global", page: 1, limit: ESIM_FETCH_LIMIT },
    { skip: region !== "Global" }
  );

  const localPackages = useMemo(() => {
    const list = asArray(localPackagesResponse?.data);
    return list.filter((item) =>
      `${item?.operatorName || ""} ${item?.countryName || ""} ${
        item?.packageId || ""
      }`
        .toLowerCase()
        .includes(packageSearch.toLowerCase())
    );
  }, [localPackagesResponse?.data, packageSearch]);

  const regionalPackages = useMemo(() => {
    const list = asArray(regionalPackagesResponse?.data);
    return list.filter((item) =>
      `${item?.operatorName || ""} ${item?.countryName || ""} ${
        item?.packageId || ""
      }`
        .toLowerCase()
        .includes(packageSearch.toLowerCase())
    );
  }, [regionalPackagesResponse?.data, packageSearch]);

  const globalPackages = useMemo(() => {
    const list = asArray(globalPackagesResponse?.data);
    return list.filter((item) =>
      `${item?.operatorName || ""} ${item?.countryName || ""} ${
        item?.packageId || ""
      }`
        .toLowerCase()
        .includes(globalSearch.toLowerCase())
    );
  }, [globalPackagesResponse?.data, globalSearch]);

  const localTotalPages = useMemo(
    () => Math.max(1, Math.ceil(localPackages.length / PACKAGES_PAGE_SIZE)),
    [localPackages.length]
  );

  const regionalTotalPages = useMemo(
    () => Math.max(1, Math.ceil(regionalPackages.length / PACKAGES_PAGE_SIZE)),
    [regionalPackages.length]
  );

  const globalTotalPages = useMemo(
    () => Math.max(1, Math.ceil(globalPackages.length / PACKAGES_PAGE_SIZE)),
    [globalPackages.length]
  );

  const displayedLocalPackages = useMemo(() => {
    const start = (localPackagesPage - 1) * PACKAGES_PAGE_SIZE;
    return localPackages.slice(start, start + PACKAGES_PAGE_SIZE);
  }, [localPackages, localPackagesPage]);

  const displayedRegionalPackages = useMemo(() => {
    const start = (regionalPackagesPage - 1) * PACKAGES_PAGE_SIZE;
    return regionalPackages.slice(start, start + PACKAGES_PAGE_SIZE);
  }, [regionalPackages, regionalPackagesPage]);

  const displayedGlobalPackages = useMemo(() => {
    const start = (globalPackagesPage - 1) * PACKAGES_PAGE_SIZE;
    return globalPackages.slice(start, start + PACKAGES_PAGE_SIZE);
  }, [globalPackages, globalPackagesPage]);

  useEffect(() => {
    setLocalPackagesPage((p) =>
      Math.min(Math.max(1, p), localTotalPages)
    );
  }, [localTotalPages]);

  useEffect(() => {
    setRegionalPackagesPage((p) =>
      Math.min(Math.max(1, p), regionalTotalPages)
    );
  }, [regionalTotalPages]);

  useEffect(() => {
    setGlobalPackagesPage((p) =>
      Math.min(Math.max(1, p), globalTotalPages)
    );
  }, [globalTotalPages]);

  const resetSelections = () => {
    setSelectedCountry(null);
    setSelectedRegionalSlug(null);
    setSelectedRegionalName("");
    setPackageSearch("");
    setLocalPackagesPage(1);
    setRegionalPackagesPage(1);
    setGlobalPackagesPage(1);
  };

  const handleRegionChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(TAB_QUERY_KEY, TAB_FROM_REGION[value]);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    resetSelections();
    setSearchText("");
    setGlobalSearch("");
    if (value === "Local") {
      setStateStatus(localTabs[0] ?? "");
    }
  };

  const renderSearchInput = (
    value,
    onChange,
    className = "py-1.5 px-4 focus:outline-none"
  ) => (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
            {selectedCountry ? (
              <div>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 border-b-2 pb-5 border-[#EEEEEE]">
                  <button
                    onClick={() => {
                      setSelectedCountry(null);
                      setPackageSearch("");
                      setLocalPackagesPage(1);
                    }}
                    className="cursor-pointer text-[#6B6B6B] font-semibold flex items-center gap-2"
                  >
                    <GoArrowLeft className="text-xl" />{" "}
                    <span>{selectedCountry?.name}</span>
                  </button>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <div
                      className="flex items-center rounded-full px-2 w-[70%] md:w-[280px]"
                      style={{
                        boxShadow: "0px 1px 4px 0px rgba(208, 208, 208, 0.50)",
                      }}
                    >
                      <button type="button">
                        <Search className="text-primary" />
                      </button>
                      {renderSearchInput(packageSearch, setPackageSearch)}
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-6 mt-6">
                  {isLocalPackagesLoading || isLocalPackagesFetching ? (
                    <div className="col-span-full flex justify-center items-center w-full">
                      <Loading />
                    </div>
                  ) : localPackages.length ? (
                    displayedLocalPackages.map((pkg, index) => (
                      <SimCard
                        key={`${pkg.packageId}-${pkg.slug ?? "pkg"}-${index}`}
                        packageData={pkg}
                      />
                    ))
                  ) : (
                    <p className="col-span-full text-sm text-[#767676]">
                      No packages found for {selectedCountry?.name}.
                    </p>
                  )}
                </div>

                {localTotalPages > 1 ? (
                  <Pagination
                    currentPage={localPackagesPage}
                    totalPages={localTotalPages}
                    onPageChange={setLocalPackagesPage}
                    isLoading={
                      isLocalPackagesLoading || isLocalPackagesFetching
                    }
                  />
                ) : null}
              </div>
            ) : (
              <div>
                <div className="flex flex-col lg:flex-row justify-center lg:items-center gap-6 lg:gap-2 border-b-2 pb-5 border-[#EEEEEE]">
                  <div className="flex items-center flex-wrap gap-2">
                    {localTabs?.map((state) => (
                      <button
                        onClick={() => {
                          setStateStatus(state);
                          setSelectedCountry(null);
                          setLocalPackagesPage(1);
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
                    <button type="button">
                      <Search className="text-primary" />
                    </button>
                    {renderSearchInput(searchText, setSearchText)}
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mt-6">
                  {isRegionsLoading ||
                  isCountriesLoading ||
                  isCountriesFetching ? (
                    <div className="col-span-full flex justify-center items-center w-full">
                      <Loading />
                    </div>
                  ) : (url?.includes("shop") ? countries : shortList).length ? (
                    (url?.includes("shop") ? countries : shortList).map(
                      (country, idx) => (
                        <div
                          onClick={() => setSelectedCountry(country)}
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
            {selectedRegionalSlug ? (
              <div>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 border-b-2 pb-5 border-[#EEEEEE] max-w-s">
                  <button
                    onClick={() => {
                      setSelectedRegionalSlug(null);
                      setSelectedRegionalName("");
                      setPackageSearch("");
                      setRegionalPackagesPage(1);
                    }}
                    className="cursor-pointer text-[#6B6B6B] font-semibold flex items-center gap-2"
                  >
                    <GoArrowLeft className="text-xl" />{" "}
                    <span>{selectedRegionalName}</span>
                  </button>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <div
                      className="flex items-center rounded-full px-2 w-[70%] md:w-[280px]"
                      style={{
                        boxShadow: "0px 1px 4px 0px rgba(208, 208, 208, 0.50)",
                      }}
                    >
                      <button type="button">
                        <Search className="text-primary" />
                      </button>
                      {renderSearchInput(packageSearch, setPackageSearch)}
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-6 mt-6">
                  {isRegionalPackagesLoading || isRegionalPackagesFetching ? (
                    <div className="col-span-full flex justify-center items-center w-full">
                      <Loading />
                    </div>
                  ) : regionalPackages.length ? (
                    displayedRegionalPackages.map((pkg, index) => (
                      <SimCard
                        key={`${pkg.packageId}-${pkg.slug ?? "pkg"}-${index}`}
                        packageData={pkg}
                      />
                    ))
                  ) : (
                    <p className="col-span-full text-sm text-[#767676]">
                      No packages found for this region.
                    </p>
                  )}
                </div>

                {regionalTotalPages > 1 ? (
                  <Pagination
                    currentPage={regionalPackagesPage}
                    totalPages={regionalTotalPages}
                    onPageChange={setRegionalPackagesPage}
                    isLoading={
                      isRegionalPackagesLoading || isRegionalPackagesFetching
                    }
                  />
                ) : null}
              </div>
            ) : (
              <div className="border-t-2 border-[#EEEEEE] pt-6 grid grid-cols-2 lg:grid-cols-3 items-center justify-center gap-2 md:gap-6">
                {isRegionsLoading ? (
                  <div className="col-span-full flex justify-center items-center w-full">
                    <Loading />
                  </div>
                ) : filteredRegionalItems.length ? (
                  filteredRegionalItems?.map((state) => (
                    <div
                      onClick={() => {
                        setSelectedRegionalSlug(state?.slugname);
                        setSelectedRegionalName(state?.name);
                        setPackageSearch("");
                        setRegionalPackagesPage(1);
                      }}
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

              <div className="flex items-center gap-2 w-full md:w-auto">
                <div
                  className="flex items-center rounded-full px-2 w-[70%] md:w-[280px]"
                  style={{
                    boxShadow: "0px 1px 4px 0px rgba(208, 208, 208, 0.50)",
                  }}
                >
                  <button type="button">
                    <Search className="text-primary" />
                  </button>
                  {renderSearchInput(globalSearch, setGlobalSearch)}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-6 mt-6">
              {isGlobalPackagesLoading || isGlobalPackagesFetching ? (
                <div className="col-span-full flex justify-center items-center w-full">
                  <Loading />
                </div>
              ) : globalPackages.length ? (
                displayedGlobalPackages.map((pkg, index) => (
                  <SimCard
                    key={`${pkg.packageId}-${pkg.slug ?? "pkg"}-${index}`}
                    packageData={pkg}
                  />
                ))
              ) : (
                <p className="col-span-full text-sm text-[#767676]">
                  No global packages found.
                </p>
              )}
            </div>

            {globalTotalPages > 1 ? (
              <Pagination
                currentPage={globalPackagesPage}
                totalPages={globalTotalPages}
                onPageChange={setGlobalPackagesPage}
                isLoading={
                  isGlobalPackagesLoading || isGlobalPackagesFetching
                }
              />
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
};

const Country = () => (
  <Suspense
    fallback={
      <section className="bg-[#F7F7F7]">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex justify-center items-center min-h-[280px]">
          <Loading />
        </div>
      </section>
    }
  >
    <CountryContent />
  </Suspense>
);

export default Country;
