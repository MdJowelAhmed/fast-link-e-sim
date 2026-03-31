"use client"; // Important: useRouter is a client-side hook

import { useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="cursor-pointer text-[#6B6B6B] font-semibold flex items-center gap-2"
    >
      <GoArrowLeft className="text-xl" /> <span>Back</span>
    </button>
  );
}
