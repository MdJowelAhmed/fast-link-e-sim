import SimCard from "@/components/shared/SimCard";
import React from "react";

const ESimCard = () => {
  return (
    <section className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-10 xl:py-20">
      <div>
        <p className="text-primary">eSIM Offers</p>
        <h2 className="text-3xl font-medium leading-[36px] pt-3">
          Best Deals For You
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SimCard discount={true} />
        <SimCard discount={true} />
        <SimCard discount={true} />
        <SimCard discount={true} />
      </div>
    </section>
  );
};

export default ESimCard;
