"use client";

import { GoArrowRight } from "react-icons/go";
import React, { useState } from "react";
import featureImage from "@/assests/sellesBg.svg";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Features = () => {
  const [copied, setCopied] = useState(false);

  const linkToCopy =
    "https://www.search?sca_esv=891adaa60c792029&udm=2&biw=1920&bih=945&sxsrf";

  const handleCopy = async () => {
    if (typeof window === "undefined") return;
    if (!navigator.clipboard) {
      toast.error("Clipboard API not supported in your browser.");
      return;
    }

    try {
      await navigator.clipboard.writeText(linkToCopy);
      setCopied(true);
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Failed to copy the link.");
    }
  };

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
      {/* Overlay for darkening the background */}
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
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex justify-center items-center gap-1.5 bg-[#FBC02D] mt-2 py-[14px] px-5 text-[#414141] rounded-lg cursor-pointer">
              <span className="leading-[20px]">Share now</span>{" "}
              <GoArrowRight className="text-2xl" />
            </button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-[95vw] md:min-w-[674px] px-4 md:px-8 pt-16 pb-10">
            <DialogHeader>
              <DialogTitle className="text-xl font-normal leading-8 text-[#333333]">
                Share link
              </DialogTitle>
              <DialogDescription className="flex flex-col gap-4">
                <span className="text-sm text-[#767676] leading-[32px]">
                  Help your friends save and get rewarded together! Share your
                  link with friends. Once they join and make a purchase, you’ll
                  both receive rewards like bonus data or store credit
                  automatically
                </span>
                <span className="text-[#1E90FF] text-sm break-all">{linkToCopy}</span>
                <Button
                  onClick={handleCopy}
                  type="button"
                  variant="outline"
                  className="w-[177px] mx-auto mt-4 h-12 text-primary leading-5 border-primary hover:bg-transparent hover:text-primary"
                >
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Features;
