import ShortBanner from "@/components/shared/ShortBanner";
import Country from "@/components/website/home/Country";
import React from "react";

const page = () => {
  return (
    <div>
      <ShortBanner text={"Find Your Destinations"} />
      <Country />
    </div>
  );
};

export default page;
