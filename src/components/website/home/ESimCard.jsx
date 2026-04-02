"use client";

import SimCard from "@/components/shared/SimCard";
import React from "react";
import { useGetEsimsQuery } from "@/helpers/eSimApi";
import { asArray } from "@/lib/utils";

const ESimCard = () => {
  const { data, isLoading, isFetching } = useGetEsimsQuery({
    type: "global",
    page: 1,
    limit: 4,
  });

  const packages = asArray(data?.data.slice(0, 4));

  return (
    <section className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-10 xl:py-20">
      <div>
        <p className="text-primary">eSIM Offers</p>
        <h2 className="text-3xl font-medium leading-[36px] pt-3">
          Best Deals For You
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading || isFetching ? (
          <p className="col-span-full text-sm text-[#767676]">
            Loading offers...
          </p>
        ) : packages.length ? (
          packages.map((pkg, index) => (
            <SimCard
              key={`${pkg.packageId}-${pkg.slug ?? "pkg"}-${index}`}
              packageData={pkg}
            />
          ))
        ) : (
          <p className="col-span-full text-sm text-[#767676]">
            No offers available right now.
          </p>
        )}
      </div>
    </section>
  );
};

export default ESimCard;
