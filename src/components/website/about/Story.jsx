import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Story = ({ img, heading, text1, text2, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row justify-center items-end gap-9 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="w-full lg:w-1/2">
        <p className="text-3xl text-[#151515] font-medium leading-[20px] mb-10">
          {heading}
        </p>
        <p className="text-base text-[#5C5C5C]">
          {text1}
          <br />
          <br />
          {text2}
        </p>
      </div>
      <div className="w-full lg:w-1/2">
        <Image src={img} alt="about image" className="w-full" />
      </div>
    </div>
  );
};

export default Story;
