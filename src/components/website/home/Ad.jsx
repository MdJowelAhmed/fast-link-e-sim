import React from "react";
import phone2 from "@/assests/phone2.svg";
import phone3 from "@/assests/phone3.svg";
import Image from "next/image";
import playStore from "@/assests/playStoreBlack.svg";
import appStore from "@/assests/appStoreBlack.svg";

const Ad = () => {
  return (
    <section
      className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col lg:flex-row items-center justify-between rounded-[56px] relative"
      style={{
        background: "linear-gradient(90deg, #F4F4F4 0%, #EEE 90.87%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden z-0 rounded-[56px]">
        <div
          className="w-[535px] h-[535px] rounded-full bg-[#B0E0CA] absolute -top-14 -left-[67px] opacity-35"
          style={{
            filter: "blur(104.75px)",
          }}
        />
        <div
          className="w-[335px] h-[335px] rounded-full bg-[#FBC02D] absolute top-24 -right-8 opacity-[0.17]"
          style={{
            filter: "blur(104.75px)",
          }}
        />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:pl-[72px] pt-[62px] pb-[72px]">
        <div className="lg:w-[400px] z-10">
          <h2 className="text-[24px] font-semibold leading-[128%] mb-6">
            Ready to try eSIMs and change the way you stay connected?
          </h2>
          <p className="text-sm text-[#767676] mb-8">
            Download the LinkFast eSIM app to purchase manage, <br /> and top
            you eSIMs anytime.
          </p>

          <div className="flex items-center gap-6">
            <button className="cursor-pointer">
              <Image src={playStore} alt="Play Store" height={44} />
            </button>
            <button className="cursor-pointer">
              <Image src={appStore} alt="App Store" height={44} />
            </button>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 flex justify-center z-10">
        <Image src={phone2} alt="Phone" className="h-[250px] md:h-[363px] -ml-10 md:ml-0" />
        <Image
          src={phone3}
          alt="Phone"
          className="-mt-16 -ml-[75px] h-[270px] md:h-[345px]"
        />
      </div>
    </section>
  );
};

export default Ad;
