"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import userImg from "@/assests/user.svg";
import Image from "next/image";
import { ConfigProvider, Rate } from "antd";

const Testimonials = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <div className="bg-[#F7F7F7] py-10">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <p className="text-primary leading-[20px]">Feedback</p>
        <h2 className="text-3xl font-medium leading-[20px] pt-3">
          What Our Client Says
        </h2>
      </div>

      <div className="flex flex-col items-center">
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={60}
          loop={true}
          speed={1800}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
          }}
          modules={[Pagination, Autoplay]}
          className="w-full testimonials-swiper"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <SwiperSlide
              key={i}
              className="xl:!w-[1200px] bg-[#FDFDFD] h-full flex items-center justify-center rounded-lg transition-opacity duration-300 mb-2"
            >
              <div
                className="h-full w-full shadow-md rounded-lg px-14 py-10"
                style={{
                  boxShadow: "2px 2px 6px 2px rgba(0, 0, 0, 0.07)",
                }}
              >
                <ConfigProvider
                  theme={{
                    components: {
                      Rate: {
                        starColor: "#009A54",
                        starBg: "#EBEBEB",
                        starSize: 24,
                      },
                    },
                  }}
                >
                  <Rate disabled={true} allowHalf defaultValue={4.5} />
                </ConfigProvider>

                <p className="text-[#767676] max-w-[950px] pt-4">
                  gravida elementum tincidunt volutpat in Quisque urna
                  ullamcorper sed at, consectetur quis Donec turpis dui. Morbi
                  vitae urna. maximus venenatis nisl. vitae ac
                </p>
                <div className="flex items-center gap-5 mt-4">
                  <Image
                    src={userImg}
                    alt="User Image"
                    className="w-11 h-11 rounded-full p-0.5 border-2"
                  />
                  <div>
                    <p className="text-[#333333] font-semibold">
                      Winson Herry
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#009A54]" />
                      <p className="text-[#767676]">California</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination container below the slider */}
        <div className="custom-swiper-pagination mt-8 flex justify-center" />
        <style jsx global>{`
          .testimonials-swiper .swiper-slide {
            opacity: 0.4;
          }
          .testimonials-swiper .swiper-slide.swiper-slide-active {
            opacity: 1;
          }
          .custom-swiper-pagination .swiper-pagination-bullet {
            background: #ebebeb;
            opacity: 1;
            width: 12px;
            height: 12px;
            margin: 0 6px !important;
          }
          .custom-swiper-pagination .swiper-pagination-bullet-active {
            background: #009a54;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Testimonials;
