"use client";

import { GoArrowRight } from "react-icons/go";
import React, { useEffect, useMemo, useState } from "react";
import featureImage from "@/assests/sellesBg.svg";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetMyProfileQuery } from "@/helpers/authApi";
import { AUTH_CHANGE_EVENT } from "@/helpers/authEvents";

/** Fallback when not logged in or profile has no code yet. */
const DEFAULT_REFERRAL_CODE = "719087";

function buildSignupReferralUrl(referralCode) {
  if (typeof window === "undefined") return "";
  const url = new URL("/sign-up", window.location.origin);
  url.searchParams.set("refferal_code", referralCode);
  return url.toString();
}

const Features = () => {
  const [copied, setCopied] = useState(false);
  const [linkToCopy, setLinkToCopy] = useState("");
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const syncToken = () => setHasToken(!!localStorage.getItem("token"));
    syncToken();
    window.addEventListener(AUTH_CHANGE_EVENT, syncToken);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, syncToken);
  }, []);

  const { data: profileResponse } = useGetMyProfileQuery(undefined, {
    skip: !hasToken,
  });

  const referralCode = useMemo(() => {
    const raw = profileResponse?.data?.refferal_code;
    if (raw != null && String(raw).trim() !== "") {
      return String(raw).trim();
    }
    return DEFAULT_REFERRAL_CODE;
  }, [profileResponse]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setLinkToCopy(buildSignupReferralUrl(referralCode));
  }, [referralCode]);

  const handleCopy = async () => {
    if (typeof window === "undefined") return;
    if (!navigator.clipboard) {
      toast.error("Clipboard API not supported in your browser.");
      return;
    }

    const href =
      linkToCopy || buildSignupReferralUrl(referralCode);

    try {
      await navigator.clipboard.writeText(href);
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
                <span className="text-[#1E90FF] text-sm break-all">
                  {linkToCopy || "…"}
                </span>
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
