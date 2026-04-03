"use client";

import ShortBanner from "@/components/shared/ShortBanner";
import React from "react";
import { useGetDisclaimerQuery } from "@/helpers/disclaimer";
import Loading from "@/app/loading";

const page = () => {
  const { data, isLoading } = useGetDisclaimerQuery("privacy");
  const content = data?.data ?? "";

  return (
    <div>
      <ShortBanner text="Privacy Policy" />
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="text-[#575757] leading-6">
            <div className="col-span-full flex justify-center items-center w-full">
              <Loading />
            </div>
          </div>
        ) : content ? (
          <div
            className="text-[#575757] leading-6 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_p]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2 [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div className="text-[#575757] leading-6">No privacy policy found.</div>
        )}
      </div>
    </div>
  );
};

export default page;
