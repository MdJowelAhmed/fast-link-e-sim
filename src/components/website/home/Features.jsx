"use client";

import React from "react";
import featureImage from "@/assests/sellesBg.svg";
import ReferralSharePanel from "@/components/shared/ReferralSharePanel";

const Features = () => {
  return (
    <section
      className="bg-[#151515] text-white relative"
      style={{
        backgroundImage: `url(${featureImage.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none z-0"></div>
      <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-[84px] h-full flex flex-col justify-center items-start gap-6">
        <h1 className="text-3xl font-semibold text-[#FDFDFD]">
          Invite & Earn
        </h1>
        <p className="text-[#EEEEEE] max-w-[472px] leading-[200%]">
          Help your friends save and get rewarded together! Share your link with
          friends. Once they join and make a purchase, you’ll both receive
          rewards like bonus data or store credit automatically
        </p>
        <ReferralSharePanel triggerClassName="mt-2" />
      </div>
    </section>
  );
};

export default Features;
