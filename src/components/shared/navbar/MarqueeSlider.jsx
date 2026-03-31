'use client'; // required for hooks in Next.js app directory
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

const MarqueeSlider = () => {
  const [direction, setDirection] = useState("left");

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDirection((prev) => (prev === "left" ? "right" : "left"));
//     }, 10000); // switch every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

  return (
    <div>
      <Marquee
        className="bg-[#FBC02D]"
        speed={100}
        gradient={false}
        autoFill={true}
        direction={direction}
      >
        <p className="py-2 pr-40">
          $10 bonus gift could on click and collect
        </p>
      </Marquee>
    </div>
  );
};

export default MarqueeSlider;
