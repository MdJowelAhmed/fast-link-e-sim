import React from "react";
import bg from "@/assests/funcBg.svg";
import phoneImg from "@/assests/phone1.svg";
import download from "@/assests/download.svg";
import choose from "@/assests/choose.svg";
import install from "@/assests/install.svg";
import activeSIM from "@/assests/activeSIM.svg";
import Image from "next/image";

const WorkFunc = () => {
  const rightContents = [
    {
      key: 1,
      title: "Download the app",
      description:
        "Download the LinkFast eSIM app or visit our website to get started. Browse eSIM plans for over 190 destinations worldwide!",
      icon: <Image src={download} alt="Download" />,
    },
    {
      key: 2,
      title: "Choose your destination and package",
      description:
        "Select your travel destination and pick a data package that suits your trip. Choose from local, regional or global plans with flexible data and validity options.",
      icon: <Image src={choose} alt="Phone" />,
    },
    {
      key: 3,
      title: "Install your eSIM",
      description:
        "Scan the QR code provided after purchase to instantly install your eSIM. No physical SIM card needed, setup takes just a few minutes!",
      icon: <Image src={install} alt="Download" />,
    },
    {
      key: 4,
      title: "Activate your eSIM",
      description:
        "Activate your eSIM before you travel using WIFI or your existing data connection. Enjoy fast, reliable data connectivity the moment you arrive at your destination!",
      icon: <Image src={activeSIM} alt="Download" />,
    },
  ];
  return (
    <section
      className="py-10"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center">
        <p className="text-primary">Work Functionality</p>
        <h2 className="text-3xl font-medium leading-[36px] pt-6">
          How Does eSIM From LinkFast Work
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6 mt-16 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 xl:pb-10">
        <div className="flex-1 flex justify-center items-center">
          <Image src={phoneImg} alt="Phone" height={475} />
        </div>
        <div className="flex-1 space-y-6">
          {rightContents.map((content) => (
            <div key={content.key} className="flex flex-col md:flex-row items-center gap-6">
              <h2 className="text-[#000000] opacity-25 text-[32px] hidden md:flex">
                {content?.key}.
              </h2>
              {content?.icon}
              <div className="pl-2 pt-2">
                <h3 className="text-[#000000] text-xl pb-2.5">
                  {content?.title}
                </h3>
                <p className="text-[#767676] text-sm">{content?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkFunc;
