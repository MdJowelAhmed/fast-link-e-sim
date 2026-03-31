import React from "react";
import img24 from "@/assests/24_7.svg";
import affordable from "@/assests/affordable.svg";
import connectivity from "@/assests/connectivity.svg";
import customized from "@/assests/customized.svg";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";

const Benefits = () => {
  return (
    <section className="py-10 lg:py-16 relative">
      <div
        className="w-[500px] h-[500px] rounded-full absolute -top-10 -left-60 bg-[#B0E0CA] -z-10"
        style={{
          filter: "blur(104.75px)",
          opacity: 0.4,
        }}
      />

      <div
        className="w-[500px] h-[500px] rounded-full absolute -bottom-80 -right-32 bg-[#B0E0CA] -z-10"
        style={{
          filter: "blur(104.75px)",
          opacity: 0.4,
        }}
      />

      <div className="text-center">
        <p className="text-primary">Benefits</p>
        <h2 className="text-3xl font-medium leading-[36px] pt-6">
          Why Use LinkFast ?
        </h2>
      </div>

      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-16">
        <Dialog>
          <DialogTrigger asChild>
            <div className="bg-[#F4F4F4] p-4 rounded-lg cursor-pointer">
              <Image src={connectivity} alt="Connectivity" height={65} />
              <h4 className="mt-3 mb-4 font-medium leading-5">
                Instant Connectivity
              </h4>
              <p className="text-[#767676] pr-5 text-sm">
                You can travel to a remote country where you’d spend hundreds of
                dollars
              </p>
            </div>
          </DialogTrigger>

          <DialogTrigger asChild>
            <div className="bg-[#F4F4F4] p-4 rounded-lg cursor-pointer">
              <Image src={affordable} alt="Connectivity" height={65} />
              <h4 className="mt-3 mb-4 font-medium leading-5">
                Affordable and Transparent
              </h4>
              <p className="text-[#767676] pr-5 text-sm">
                No hidden fees and entirely prepaid.app is incredibly useful for
                when you are going to travel.
              </p>
            </div>
          </DialogTrigger>

          <DialogTrigger asChild>
            <div className="bg-[#F4F4F4] p-4 rounded-lg cursor-pointer">
              <Image src={img24} alt="Connectivity" height={65} />
              <h4 className="mt-3 mb-4 font-medium leading-5">24/7 Support</h4>
              <p className="text-[#767676] pr-5 text-sm">
                Our support team is available every day across all time zones No
                more finding.
              </p>
            </div>
          </DialogTrigger>

          <DialogTrigger asChild>
            <div className="bg-[#F4F4F4] p-4 rounded-lg cursor-pointer">
              <Image src={customized} alt="Connectivity" height={65} />
              <h4 className="mt-3 mb-4 font-medium leading-5">
                Customized plans
              </h4>
              <p className="text-[#767676] pr-5 text-sm">
                Adjust the amount of data and the duration of the plans
                according to your needs.
              </p>
            </div>
          </DialogTrigger>

          <DialogContent className="p-3 bg-[#F4F4F4]">
            <VisuallyHidden asChild>
              <DialogTitle>SIM Card Details</DialogTitle>
            </VisuallyHidden>
            <div className="bg-[#F4F4F4] p-4 rounded-lg flex flex-col items-center">
              <Image src={connectivity} alt="Connectivity" height={80} />
              <h4 className="mt-3 mb-4 text-xl font-medium leading-5">
                Instant Connectivity
              </h4>
              <p className="text-[#767676]">
                You can travel to a remote country where you’d spend hundreds of
                dollars You can travel to a remote country where you’d spend
                hundreds of dollars You can travel to a remote country where
                you’d spend hundreds of dollars You can travel to a remote
                country where you’d spend hundreds of dollars You can travel to
                a remote country where you’d spend hundreds of dollars You can
                travel to a remote country where you’d spend hundreds of dollars
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Benefits;
