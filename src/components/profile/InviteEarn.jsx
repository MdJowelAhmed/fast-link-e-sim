"use client";

import React, { useMemo } from "react";
import ShortBanner from "../shared/ShortBanner";
import { cn } from "@/lib/utils";
import { useGetInviteEarnQuery } from "@/helpers/inviteEarnApi";
import ReferralSharePanel from "@/components/shared/ReferralSharePanel";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";

function formatMoney(value) {
  if (value == null || Number.isNaN(Number(value))) return "$0.00";
  return `$${Number(value).toFixed(2)}`;
}

const InviteEarn = () => {
  const { data, isLoading, isError, refetch } = useGetInviteEarnQuery();

  const stats = data?.data;
  console.log(stats);

  const cards = useMemo(() => {
    if (!stats) return [];
    return [
      {
        label: "Total Share",
        value: String(stats.total_share ?? 0),
        highlight: false,
      },
      {
        label: "Total Earn",
        value: formatMoney(stats.total_earnings),
        highlight: false,
      },
      {
        label: "collected money",
        value: formatMoney(stats.collected_money),
        highlight: false,
      },
      {
        label: "Monthly Balance",
        value: formatMoney(stats.monthly_earnings),
        highlight: true,
      },
    ];
  }, [stats]);

  return (
    <div className="bg-[#F7F7F7]">
      <ShortBanner text={"Invite & Earn"} />
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-10 min-h-[76vh] py-10">
        {isLoading ? (
          <div className="flex min-h-[40vh] items-center justify-center w-full">
            <Loading />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center gap-4 py-16">
            <p className="text-[#5C5C5C]">Could not load referral stats.</p>
            <Button type="button" variant="secondary" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 w-full flex-wrap">
              {cards.map((singleData, idx) => (
                <div
                  key={idx}
                  className="w-full max-w-[270px] min-h-[160px] mx-auto md:mx-0 bg-[#FDFDFD] flex flex-col justify-center items-center rounded-3xl px-4 py-6"
                  style={{
                    boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.07)",
                  }}
                >
                  <p className="text-[#222222] capitalize text-center">
                    {singleData?.label}
                  </p>
                  <p
                    className={cn(
                      "text-[#7F7F7F] text-2xl font-medium pt-2 text-center",
                      singleData?.highlight && "text-primary"
                    )}
                  >
                    {singleData?.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full max-w-[640px] rounded-3xl bg-[#FDFDFD] p-8 border border-[#EEEEEE] shadow-sm flex flex-col items-center gap-4 text-center">
              <h2 className="text-lg font-semibold text-[#222222]">
                Share your invite link
              </h2>
              <p className="text-sm text-[#5C5C5C] leading-relaxed">
                Help your friends save and get rewarded together. Copy your link
                and share it — when they sign up and purchase, you both earn.
              </p>
              <ReferralSharePanel triggerClassName="mt-2" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InviteEarn;
