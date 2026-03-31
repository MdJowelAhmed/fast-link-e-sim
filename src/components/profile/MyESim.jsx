"use client";

import { useState } from "react";
import ShortBanner from "../shared/ShortBanner";
import { cn } from "@/lib/utils";
import thumb from "@/assests/simThumb.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const tabs = [
  {
    label: "Current eSIM",
    value: "Current eSIM",
  },
  {
    label: "Archived",
    value: "Archived",
  },
];

const CurrentESim = [
  {
    name: "Fatafati",
    country: "Bangladesh",
    startDate: "27 Apr, 2025",
    data: "2 GB",
    validity: "7 Day",
    price: "2.00",
    thumb: thumb,
  },
  {
    name: "Fatafati",
    country: "Bangladesh",
    startDate: "27 Apr, 2025",
    data: "2 GB",
    validity: "7 Day",
    price: "2.00",
    thumb: thumb,
  },
  {
    name: "Fatafati",
    country: "Bangladesh",
    startDate: "27 Apr, 2025",
    data: "2 GB",
    validity: "7 Day",
    price: "2.00",
    thumb: thumb,
  },
];

const MyESim = () => {
  const [selectedTab, setSelectedTab] = useState("Current eSIM");
  return (
    <div className="bg-[#F7F7F7] min-h-[90vh] pb-16">
      <ShortBanner text="My eSIMS" />

      {/* tabs */}
      <div className="flex items-center gap-2 mt-6 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        {tabs?.map((tab) => (
          <button
            onClick={() => setSelectedTab(tab.value)}
            className={cn(
              "px-3 py-1.5 text-sm rounded cursor-pointer",
              selectedTab === tab.value
                ? "bg-primary text-white"
                : "bg-[#EEEEEE] text-[#767676]"
            )}
            key={tab.value}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <hr
        className="max-w-[1155px] mx-auto px-4 sm:px-6 lg:px-8 mt-4"
        style={{ borderColor: "#EEEEEE", borderWidth: "1px" }}
      />

      {selectedTab === "Current eSIM" && (
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 space-y-2">
          {CurrentESim?.map((eSIM, idx) => (
            <Link
              href="/view-eSIM-details"
              key={idx}
              className="flex flex-col md:flex-row gap-20 w-full bg-[#FDFDFD] p-5 rounded-2xl"
              style={{
                boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.07)",
              }}
            >
              <Image
                className="h-[162px] w-full md:w-[256px]"
                src={eSIM?.thumb}
                alt="Thumbnail"
              />
              <div className="w-full">
                <div className="flex justify-between w-full border-b">
                  <div>
                    <h4 className="text-xl text-[#333333] font-medium leading-5 mb-4">
                      {eSIM?.name}
                    </h4>
                    <p className="text-[#009A54] text-sm leading-5">
                      {eSIM?.country}
                    </p>
                  </div>

                  <div className="w-1/2">
                    <div className="flex justify-between mb-5">
                      <p className="text-[#5C5C5C] leading-5">Data</p>
                      <p className="text-[#333333] font-medium leading-5">
                        {eSIM?.data}
                      </p>
                    </div>
                    <div className="flex justify-between mb-5">
                      <p className="text-[#5C5C5C] leading-5">validity</p>
                      <p className="text-[#333333] font-medium leading-5">
                        {eSIM?.validity}
                      </p>
                    </div>
                    <div className="flex justify-between mb-5">
                      <p className="text-[#5C5C5C] leading-5">Price</p>
                      <p className="text-[#5C5C5C] font-semibold leading-5">
                        ${eSIM?.data} USD
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-[#5C5C5C] leading-5">
                  Start date: {eSIM?.startDate}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {selectedTab === "Archived" && (
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 space-y-2">
          {CurrentESim?.map((eSIM, idx) => (
            <Link
              href="/view-eSIM-details"
              key={idx}
              className="flex flex-col md:flex-row gap-20 w-full bg-[#FDFDFD] p-5 rounded-2xl"
              style={{
                boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.07)",
              }}
            >
              <Image
                className="h-[162px] w-full md:w-[256px]"
                src={eSIM?.thumb}
                alt="Thumbnail"
              />
              <div className="w-full">
                <div className="flex justify-between w-full border-b">
                  <div>
                    <h4 className="text-xl text-[#333333] font-medium leading-5 mb-4">
                      {eSIM?.name}
                    </h4>
                    <p className="text-[#009A54] text-sm leading-5">
                      {eSIM?.country}
                    </p>
                  </div>

                  <div className="w-1/2">
                    <div className="flex justify-between mb-4">
                      <p className="text-[#5C5C5C] leading-5">Data</p>
                      <p className="text-[#333333] font-medium leading-5">
                        {eSIM?.data}
                      </p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <p className="text-[#5C5C5C] leading-5">validity</p>
                      <p className="text-[#333333] font-medium leading-5">
                        {eSIM?.validity}
                      </p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <p className="text-[#5C5C5C] leading-5">Price</p>
                      <p className="text-[#5C5C5C] font-semibold leading-5">
                        ${eSIM?.data} USD
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-[#5C5C5C] leading-5">
                    Start date: {eSIM?.startDate}
                  </p>
                  <Link href="/secure-checkout">
                    <Button
                      variant="outline"
                      className="border-[#333333] text-sm font-normal"
                    >
                      Buy Again
                    </Button>
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyESim;
