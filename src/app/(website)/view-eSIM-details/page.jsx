import ViewEsimDetails from "@/components/website/vieweSIMDetails/ViewEsimDetails";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<p className="p-6 text-sm text-[#767676]">Loading...</p>}>
        <ViewEsimDetails />
      </Suspense>
    </div>
  );
};

export default page;
