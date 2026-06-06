"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { useGetTopHeaderQuery } from "@/helpers/topHeaderApi";

const MarqueeSlider = () => {
  const { data, isLoading } = useGetTopHeaderQuery();
  const banners = data?.data ?? [];

  if (isLoading || banners.length === 0) {
    return null;
  }

  return (
    <div>
      <Marquee
        className="bg-[#FBC02D]"
        speed={100}
        gradient={false}
        autoFill={true}
        direction="left"
      >
        {banners.map((text, index) => (
          <p key={`${text}-${index}`} className="py-2 pr-40">
            {text}
          </p>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeSlider;
