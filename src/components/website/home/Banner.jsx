"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useGetBannersQuery } from "@/helpers/bannerApi";
import { imageUrl } from "@/components/shared/getImageUrl";
import Loading from "@/app/loading";

const Banner = () => {
  const { data, isLoading } = useGetBannersQuery();
  const banners = data?.data ?? [];

  return (
    <section className="h-[30vh] md:h-[55vh] lg:h-[65vh] bg-center bg-no-repeat w-full bg-[#F7F7F7] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loading />
          </div>
        ) : banners.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={banners.length > 1}
            speed={1000}
            className="w-full h-full"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner._id}>
                <img
                  src={imageUrl(banner.thumbnail)}
                  alt={banner.title || "Banner"}
                  className="object-cover w-full h-full"
                  style={{ height: "100%", width: "100%" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
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
