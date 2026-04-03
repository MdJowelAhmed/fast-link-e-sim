"use client";

import { GoArrowRight } from "react-icons/go";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetMyProfileQuery } from "@/helpers/authApi";
import { AUTH_CHANGE_EVENT } from "@/helpers/authEvents";
import { cn } from "@/lib/utils";

/** Fallback when not logged in or profile has no code yet. */
const DEFAULT_REFERRAL_CODE = "719087";

export function buildSignupReferralUrl(referralCode) {
  if (typeof window === "undefined") return "";
  const url = new URL("/sign-up", window.location.origin);
  url.searchParams.set("refferal_code", referralCode);
  return url.toString();
}

/**
 * Share sign-up link with referral query (same flow as home Features).
 * @param {{ triggerClassName?: string, triggerLabel?: string }} props
 */
export default function ReferralSharePanel({
  triggerClassName,
  triggerLabel = "Share now",
}) {
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

    const href = linkToCopy || buildSignupReferralUrl(referralCode);

    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Failed to copy the link.");
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setCopied(false);
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex justify-center items-center gap-1.5 bg-[#FBC02D] py-[14px] px-5 text-[#414141] rounded-lg cursor-pointer",
            triggerClassName
          )}
        >
          <span className="leading-[20px]">{triggerLabel}</span>{" "}
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
              Help your friends save and get rewarded together! Share your link
              with friends. Once they join and make a purchase, you’ll both
              receive rewards like bonus data or store credit automatically
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
  );
}
