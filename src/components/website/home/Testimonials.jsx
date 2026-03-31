"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import userImg from "@/assests/user.svg";
import Image from "next/image";
import { ConfigProvider, Rate } from "antd";
import { useGetReviewsQuery } from "@/helpers/reviewApi";
import { imageUrl } from "@/components/shared/getImageUrl";

const Testimonials = () => {
  const { data, isLoading } = useGetReviewsQuery({
    page: 1,
    limit: 10,
  });
  const reviews = data?.data ?? [];

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
          {isLoading ? (
            <SwiperSlide className="xl:!w-[1200px] bg-[#FDFDFD] h-full flex items-center justify-center rounded-lg transition-opacity duration-300 mb-2">
              <div
                className="h-full w-full shadow-md rounded-lg px-14 py-10 text-center text-sm text-[#767676]"
                style={{
                  boxShadow: "2px 2px 6px 2px rgba(0, 0, 0, 0.07)",
                }}
              >
                Loading reviews...
              </div>
            </SwiperSlide>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <SwiperSlide
                key={review._id}
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
                    <Rate
                      disabled={true}
                      allowHalf
                      value={Number(review.rating) || 0}
                    />
                  </ConfigProvider>

                  <p className="text-[#767676] max-w-[950px] pt-4">
                    {review.comment}
                  </p>
                  <div className="flex items-center gap-5 mt-4">
                    <img
                      src={imageUrl(review?.user?.image) || userImg.src}
                      alt={review?.user?.name || "User Image"}
                      className="w-11 h-11 rounded-full p-0.5 border-2 object-cover"
                    />
                    <div>
                      <p className="text-[#333333] font-semibold">
                        {review?.user?.name || "Anonymous User"}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#009A54]" />
                        <p className="text-[#767676]">
                          {review?.user?.email || "Verified customer"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="xl:!w-[1200px] bg-[#FDFDFD] h-full flex items-center justify-center rounded-lg transition-opacity duration-300 mb-2">
              <div
                className="h-full w-full shadow-md rounded-lg px-14 py-10 text-center text-sm text-[#767676]"
                style={{
                  boxShadow: "2px 2px 6px 2px rgba(0, 0, 0, 0.07)",
                }}
              >
                No reviews found.
              </div>
            </SwiperSlide>
          )}
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
