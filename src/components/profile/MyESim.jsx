"use client";

import { useMemo, useState } from "react";
import ShortBanner from "../shared/ShortBanner";
import { asArray, cn } from "@/lib/utils";
import thumb from "@/assests/simThumb.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useGetMyESimsQuery } from "@/helpers/myESimApi";
import { saveSelectedEsim } from "@/helpers/selectedEsim";
import Loading from "@/app/loading";

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

const MyESim = () => {
  const [selectedTab, setSelectedTab] = useState("Current eSIM");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: myEsimResponse, isLoading, isFetching } = useGetMyESimsQuery({
    page,
    limit,
  });

  const orders = asArray(myEsimResponse?.data);
  const pagination = myEsimResponse?.pagination;

  const filteredOrders = useMemo(() => {
    if (selectedTab === "Archived") {
      return orders.filter((o) => o?.status === "archived");
    }
    return orders.filter((o) => o?.status !== "archived");
  }, [orders, selectedTab]);

  const mapOrderToSelectedEsim = (order) => ({
    packageId: order?.packageId,
    operatorName: order?.package_name || order?.packageId,
    type: order?.type,
    slug: order?.country?.toLowerCase?.()?.replace?.(/\s+/g, "-") || "",
    countryName: order?.country,
    operatorImage: order?.oparator_info?.image || "",
    dataAmount: order?.data,
    duration: order?.validity ? `${order.validity} Days` : "",
    priceUSD: order?.net_price ?? order?.price ?? 0,
    originalPriceUSD: order?.price ?? order?.net_price ?? 0,
    qr_installation: order?.qr_installation || "",
    manual_installation: order?.manual_installation || "",
    supported_countries: order?.supported_countries ?? [],
    fair_usage_policy: order?.fair_usage_policy ?? null,
  });

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
          {isLoading || isFetching ? (
            <div className="col-span-full flex justify-center items-center w-full">
              <Loading />
            </div>
          ) : filteredOrders.length ? (
            filteredOrders?.map((order, idx) => (
              <Link
                href={`/view-eSIM-details?packageId=${order?.packageId || ""}`}
                onClick={() => saveSelectedEsim(mapOrderToSelectedEsim(order))}
                key={`${order?._id ?? "order"}-${idx}`}
              className="flex flex-col md:flex-row gap-20 w-full bg-[#FDFDFD] p-5 rounded-2xl"
              style={{
                boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.07)",
              }}
            >
              <Image
                className="h-[162px] w-full md:w-[256px]"
                src={order?.oparator_info?.image || thumb}
                alt="Thumbnail"
                width={256}
                height={162}
              />
              <div className="w-full">
                <div className="flex justify-between w-full border-b">
                  <div>
                    <h4 className="text-xl text-[#333333] font-medium leading-5 mb-4">
                      {order?.package_name || order?.packageId}
                    </h4>
                    <p className="text-[#009A54] text-sm leading-5">
                      {order?.country}
                    </p>
                  </div>

                  <div className="w-1/2">
                    <div className="flex justify-between mb-5">
                      <p className="text-[#5C5C5C] leading-5">Data</p>
                      <p className="text-[#333333] font-medium leading-5">
                        {order?.data}
                      </p>
                    </div>
                    <div className="flex justify-between mb-5">
                      <p className="text-[#5C5C5C] leading-5">validity</p>
                      <p className="text-[#333333] font-medium leading-5">
                        {order?.validity ? `${order.validity} Days` : "N/A"}
                      </p>
                    </div>
                    <div className="flex justify-between mb-5">
                      <p className="text-[#5C5C5C] leading-5">Price</p>
                      <p className="text-[#5C5C5C] font-semibold leading-5">
                        ${Number(order?.net_price ?? order?.price ?? 0).toFixed(2)} USD
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-[#5C5C5C] leading-5">
                  Start date: {order?.startDate ? new Date(order.startDate).toLocaleDateString() : "N/A"}
                </p>
              </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center w-full">
              <p className="text-sm text-[#767676] py-6">No eSIM found.</p>
            </div>
          )}
        </div>
      )}

      {selectedTab === "Archived" && (
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 space-y-2">
          {isLoading || isFetching ? (
            <div className="col-span-full flex justify-center items-center w-full">
              <Loading />
            </div>
          ) : filteredOrders.length ? (
            filteredOrders?.map((order, idx) => (
              <Link
                href={`/view-eSIM-details?packageId=${order?.packageId || ""}`}
                onClick={() => saveSelectedEsim(mapOrderToSelectedEsim(order))}
                key={`${order?._id ?? "order"}-${idx}`}
              className="flex flex-col md:flex-row gap-20 w-full bg-[#FDFDFD] p-5 rounded-2xl"
              style={{
                boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.07)",
              }}
            >
              <Image
                className="h-[162px] w-full md:w-[256px]"
                src={order?.oparator_info?.image || thumb}
                alt="Thumbnail"
                width={256}
                height={162}
              />
              <div className="w-full">
                <div className="flex justify-between w-full border-b">
                  <div>
                    <h4 className="text-xl text-[#333333] font-medium leading-5 mb-4">
                      {order?.package_name || order?.packageId}
                    </h4>
                    <p className="text-[#009A54] text-sm leading-5">
                      {order?.country}
                    </p>
                  </div>

                  <div className="w-1/2">
                    <div className="flex justify-between mb-4">
                      <p className="text-[#5C5C5C] leading-5">Data</p>
                      <p className="text-[#333333] font-medium leading-5">
                        {order?.data}
                      </p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <p className="text-[#5C5C5C] leading-5">validity</p>
                      <p className="text-[#333333] font-medium leading-5">
                        {order?.validity ? `${order.validity} Days` : "N/A"}
                      </p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <p className="text-[#5C5C5C] leading-5">Price</p>
                      <p className="text-[#5C5C5C] font-semibold leading-5">
                        ${Number(order?.net_price ?? order?.price ?? 0).toFixed(2)} USD
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-[#5C5C5C] leading-5">
                    Start date: {order?.startDate ? new Date(order.startDate).toLocaleDateString() : "N/A"}
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
            ))
          ) : (
            <p className="text-sm text-[#767676] py-6">No archived eSIM found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyESim;
