import ContactForm from "@/components/website/contact/ContactForm";
import ShortBanner from "@/components/shared/ShortBanner";
import React from "react";
import Ad from "@/components/website/home/Ad";

const page = () => {
  return (
    <div className="bg-[#F7F7F7] mb-10">
      <ShortBanner text="Contact LinkFast eSIM" />
      <div className="pt-[60px] lg:pb-[60px] max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-center items-center gap-12">
        <div className="max-w-[510px] w-full lg:w-1/2">
          <h2 className="text-3xl lg:text-[40px] text-center lg:text-start text-[#414141] font-medium mb-6">
            Send us a message
          </h2>
          <p className="text-[#929292] text-center lg:text-start">
            Just Send us your details here and we will get back to you within a
            few hours
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <ContactForm />
        </div>
      </div>
      <Ad />
    </div>
  );
};

export default page;
