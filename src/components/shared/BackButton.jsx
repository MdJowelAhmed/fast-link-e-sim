"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const routesWithBack = [
  "/invite-earn",
  "/my-eSIMs",
  "/setting",
  "/faq",
  "/privacy-policy",
  "/terms-and-condition",
  "/view-eSIM-details",
  "/secure-checkout",
];

const BackButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (!routesWithBack.includes(pathname)) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className="flex items-center gap-1 text-[#767676] hover:text-primary hover:bg-transparent"
    >
      <ArrowLeft className="h-6 w-6" /> Back
    </Button>
  );
};

export default BackButton;
