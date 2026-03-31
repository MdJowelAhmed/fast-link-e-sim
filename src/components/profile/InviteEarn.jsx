import React from "react";
import ShortBanner from "../shared/ShortBanner";
import { cn } from "@/lib/utils";

const data = [
  {
    label: "Total Share",
    value: "2555",
  },
  {
    label: "Total Earn",
    value: "$1108",
  },
  {
    label: "collected money",
    value: "$1000",
  },
  {
    label: "Monthly Balance",
    value: "$108",
  },
];

const InviteEarn = () => {
  return (
    <div className="bg-[#F7F7F7]">
      <ShortBanner text={"Invite & Earn"} />
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 min-h-[76vh] py-10 px-4">
        {data?.map((singleData, idx) => (
          <div
            key={idx}
            className="w-[270px] h-[160px] bg-[#FDFDFD] flex flex-col justify-center items-center rounded-3xl"
            style={{
              boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.07)",
            }}
          >
            <p className="text-[#222222] capitalize">{singleData?.label}</p>
            <p
              className={cn(
                "text-[#7F7F7F] text-2xl font-medium pt-2",
                singleData?.label === "Monthly Balance" && "text-primary"
              )}
            >
              {singleData?.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InviteEarn;
