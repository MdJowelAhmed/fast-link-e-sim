"use client";
import React from "react";
import bg from "@/assests/banner_bg.svg";
import bg1 from "@/assests/shortBannerBg.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
// import playStore from "@/assests/playStoreBlack.svg";
// import appStore from "@/assests/appStoreBlack.svg";
// import Image from "next/image";
// import Link from "next/link";

const Banner = () => {
  // Example images array (replace with your own images)
  const bannerImages = [bg, bg1];

  return (
    <section
      className="h-[30vh] md:h-[55vh] lg:h-[65vh] bg-center bg-no-repeat w-full bg-[#F7F7F7] relative overflow-hidden flex items-center justify-center mt-5"
      // style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          speed={1000}
          className="w-full h-full"
        >
          {bannerImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={typeof img === "string" ? img : img.src}
                alt={`Banner ${idx + 1}`}
                className="object-cover w-full h-full"
                style={{ height: "100%", width: "100%" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* SVG curve at the bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 180"
        height={100}
        width="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ zIndex: 2 }}
      >
        <path
          d="M0,140 Q720,200 1440,140 L1440,180 L0,180 Z"
          fill="#F7F7F7"
          className="block lg:hidden"
        />
        <path
          d="M0,60 Q720,320 1440,60 L1440,180 L0,180 Z"
          fill="#F7F7F7"
          className="hidden lg:block"
        />
      </svg>
    </section>
  );
};

export default Banner;

{
  /* <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-white text-[40px] font-semibold">
          Thrive with Global Connectivity
        </h1>
        <h2 className="text-primary text-3xl">
          Stay Connected Anywhere with LinkFast
        </h2>
        <p className="text-white mt-4">
          Our eSIMs are trusted by over 10,000,000 people worldwide
        </p>
        <div className="flex justify-center items-center gap-6 mt-8">
          <Link href={"#"} className="cursor-pointer">
            <Image src={playStore} alt="Play Store" height={44} />
          </Link>
          <Link href={"#"} className="cursor-pointer">
            <Image src={appStore} alt="App Store" height={44} />
          </Link>
        </div>
      </div> */
}
