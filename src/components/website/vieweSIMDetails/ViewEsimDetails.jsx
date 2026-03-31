"use client";


import qrCode from "@/assests/qrCode.svg";
import simThumb from "@/assests/simThumb.svg";
import gb from "@/assests/gb.svg";
import chating from "@/assests/chating.svg";
import call from "@/assests/call.svg";
import calenderIcon from "@/assests/calenderIcon.svg";
import Image from "next/image";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ban from "@/assests/ban.png";
import nepal from "@/assests/nepal.png";
import australia from "@/assests/australia.png";
import canada from "@/assests/canada.png";
import germany from "@/assests/germany.png";
import bahrain from "@/assests/bahrain.png";
import japan from "@/assests/japan.png";
import morocco from "@/assests/morocco.png";
import newZealand from "@/assests/newZealand.png";
import portugal from "@/assests/portugal.png";
import southKorea from "@/assests/southKorea.png";
import turkey from "@/assests/turkey.png";
import uk from "@/assests/uk.png";
import usa from "@/assests/usa.png";
import { LucideCopy } from "lucide-react";
import ShortBanner from "@/components/shared/ShortBanner";
import { ScrollArea } from "@/components/ui/scroll-area";

const countries = [
  {
    label: "Bangladesh",
    flag: ban,
  },
  {
    label: "Nepal",
    flag: nepal,
  },
  {
    label: "Australia",
    flag: australia,
  },
  {
    label: "USA",
    flag: usa,
  },
  {
    label: "UK",
    flag: uk,
  },
  {
    label: "Canada",
    flag: canada,
  },
  {
    label: "Germany",
    flag: germany,
  },
  {
    label: "Bahrain",
    flag: bahrain,
  },
  {
    label: "Japan",
    flag: japan,
  },
  {
    label: "Morocco",
    flag: morocco,
  },
  {
    label: "Portugal",
    flag: portugal,
  },
  {
    label: "New Zealand",
    flag: newZealand,
  },
  {
    label: "South Korea",
    flag: southKorea,
  },
  {
    label: "Turkey",
    flag: turkey,
  },
];

const ViewEsimDetails = () => {
  return (
    <div className="bg-[#F7F7F7]">
      <ShortBanner text="View eSIM Details" />

      <div className="pt-6 pb-[30px] max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* top content */}
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* left side */}
          <div
            className="bg-[#FDFDFD] p-6 rounded-2xl w-full lg:w-[610px]"
            style={{
              boxShadow: "1px 1px 12px 6px rgba(96, 96, 96, 0.05)",
            }}
          >
            <div className="flex items-end gap-[30px] pb-3">
              <Image
                className="w-[201px] h-[127px] rounded-lg"
                src={simThumb}
                alt="Sim thumbnail"
              />
              <div className="pb-1">
                <h2 className="text-xl leading-5 text-[#333333]">Fatafati</h2>
                <p className="text-primary text-sm leading-5 mt-5 font-normal">
                  Bangladesh
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 pb-3 border-b">
              <div className="flex justify-between items-center bg-[#EEEEEE] rounded-lg px-5 pt-3 pb-5">
                <div className="w-1/2">
                  <Image className="w-5 h-5" src={gb} alt="Data Icon" />
                  <p className="text-xl leading-5 mt-3">18 GB</p>
                </div>
                <div>
                  <CircularProgressbar
                    styles={buildStyles({
                      rotation: 0.25,
                      pathColor: "#008C4C",
                      trailColor: "##A3A3A3",
                      strokeLinecap: "butt",
                    })}
                    strokeWidth={16}
                    value={66}
                    className="w-16 h-16"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#EEEEEE] rounded-lg px-5 pt-3 pb-5">
                <div className="w-1/2">
                  <Image
                    className="w-5 h-5"
                    src={calenderIcon}
                    alt="Data Icon"
                  />
                  <p className="text-xl leading-5 mt-3">3 Day</p>
                </div>
                <div>
                  <CircularProgressbar
                    styles={buildStyles({
                      rotation: 0.25,
                      pathColor: "#FF4040",
                      trailColor: "##A3A3A3",
                      strokeLinecap: "butt",
                    })}
                    strokeWidth={16}
                    value={66}
                    className="w-16 h-16"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#EEEEEE] rounded-lg px-5 pt-3 pb-5">
                <div className="w-1/2">
                  <Image className="w-5 h-5" src={call} alt="Data Icon" />
                  <p className="text-xl leading-5 mt-3">5 Min</p>
                </div>
                <div>
                  <CircularProgressbar
                    styles={buildStyles({
                      rotation: 0.25,
                      pathColor: "#008C4C",
                      trailColor: "##A3A3A3",
                      strokeLinecap: "butt",
                    })}
                    strokeWidth={16}
                    value={66}
                    className="w-16 h-16"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#EEEEEE] rounded-lg px-5 pt-3 pb-5">
                <div className="w-1/2">
                  <Image className="w-5 h-5" src={chating} alt="Data Icon" />
                  <p className="text-xl leading-5 mt-3">8 SMS</p>
                </div>
                <div>
                  <CircularProgressbar
                    styles={buildStyles({
                      rotation: 0.25,
                      pathColor: "#008C4C",
                      trailColor: "##A3A3A3",
                      strokeLinecap: "butt",
                    })}
                    strokeWidth={16}
                    value={66}
                    className="w-16 h-16"
                  />
                </div>
              </div>
            </div>

            <ScrollArea className="h-[350px] pr-2">
              <ul className="mt-3 text-sm space-y-4">
                <li className="flex justify-between items-center max-w-[170px]">
                  <p className="text-[#5C5C5C] leading-5 opacity-80">Data</p>{" "}
                  <p className="text-[#333333] leading-5 opacity-80">2 GB</p>
                </li>

                <li className="flex justify-between items-center max-w-[170px]">
                  <p className="text-[#5C5C5C] leading-5 opacity-80">
                    Validity
                  </p>{" "}
                  <p className="text-[#333333] leading-5 opacity-80">7 Day</p>
                </li>

                <li className="flex justify-between items-center">
                  <div className="flex justify-between items-center max-w-[170px] w-full">
                    <p className="text-[#5C5C5C] leading-5 opacity-80">Price</p>{" "}
                    <p className="text-[#333333] leading-5 opacity-80">
                      $2.00 USD
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-1">
                    <p className="text-[#5C5C5C] leading-5 opacity-80">
                      Start date:
                    </p>{" "}
                    <p className="text-[#5C5C5C] leading-5 opacity-80">
                      27 Apr, 2025
                    </p>
                  </div>
                </li>
                <hr style={{ borderColor: "#C0C0C0" }} />
              </ul>

              <div>
                <h3 className="text-lg text-[#333333] leading-5 font-medium my-6">
                  Supported Country
                </h3>
                <ul className="grid grid-cols-2 md:grid-cols-4">
                  {countries?.map((country) => (
                    <li
                      key={country?.label}
                      className="flex items-center gap-3 px-2 py-3"
                    >
                      <Image
                        src={country?.flag}
                        className="w-5 h-3"
                        alt="Bangladesh Flag"
                      />{" "}
                      <p className="text-xs text-[#767676] leading-5">
                        {country?.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollArea>
          </div>

          {/* right side */}
          <div
            className="lg:w-[515px] bg-[#FDFDFD] p-4 rounded-2xl h-full"
            style={{
              boxShadow: "1px 1px 12px 6px rgba(96, 96, 96, 0.05)",
            }}
          >
            <h3 className="text-lg text-[#333333] leading-5 font-medium mb-7 md:mt-7">
              Install eSIM.
            </h3>

            <div className="bg-[#FFC107] p-4 rounded-md mb-4">
              <p className="text-[#5C5C5C] text-xs leading-5">
                WARNING! Most eSIMs can only be installed once. If you remove
                the eSIM from your device, you cannot install it again.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center gap-4 bg-[#F7F7F7] p-6 rounded-md">
              <Image
                className="w-[163px] h-[157px]"
                src={qrCode}
                alt="QR Code"
              />
              <p className="text-center text-[#A1A1A1] text-xs leading-5">
                Scan the QR code by printing it out or displaying it on another
                device to install your eSIM. "Make sure your device has a stable
                internet connection before installation.
              </p>
            </div>

            <div className="bg-[#F7F7F7] p-5 mt-2 rounded-md space-y-2">
              <div className="p-3 bg-[#FDFDFD] rounded-md">
                <div className="flex justify-between">
                  <p className="text-[#A1A1A1] text-[10px] leading-3">
                    SM-DP+ ADDRESS
                  </p>
                  <LucideCopy size={20} className="cursor-pointer" />
                </div>
                <p className="text-[#5C5C5C] text-sm leading-5">
                  sin.prod.ondemandconnectivity.com
                </p>
              </div>

              <div className="p-3 bg-[#FDFDFD] rounded-md">
                <div className="flex justify-between">
                  <p className="text-[#A1A1A1] text-[10px] leading-3">
                    Activation Code
                  </p>
                  <LucideCopy size={20} className="cursor-pointer" />
                </div>
                <p className="text-[#5C5C5C] text-sm leading-5 pr-5 break-all">
                  05A094A18461E8C918413C8DDFC7DAC025141102150B88F15C5282C6A6ED98E8
                </p>
              </div>
              <p className="text-[#A1A1A1] text-xs leading-4 mt-4">
                "Copy this information and enter details manually to install
                your eSIM. *Make sure your device has a stable internet
                connection before installing."
              </p>
            </div>
          </div>
        </div>

        {/* bottom content */}
        <div
          className="p-6 bg-[#FDFDFD] rounded-2xl mt-4"
          style={{
            boxShadow: "1px 1px 12px 6px rgba(96, 96, 96, 0.05)",
          }}
        >
          <h3 className="text-xl text-[#333333] leading-5 font-medium mb-4">
            Direction
          </h3>
          <div className="text-[#767676] text-xs leading-5">
            <p>
              For information on the terms and conditions for maintaining your
              eSIM, it’s best to check with the specific provider from whom you
              purchased the eSIM. Different providers have varying policies
              regarding usage, renewals, and maintenance. Based on general
              practices, some key points to consider include:
            </p>
            <ul className="list-disc list-inside pl-1">
              <li>
                Most eSIMs remain on your device even after the plan expires or
                credit is used up, but they may not be reactivated without a new
                purchase.
              </li>
              <li>
                Some providers limit the number of times an eSIM can be
                installed (e.g., only once), and removal might prevent
                reinstallation.
              </li>
              <li>
                Usage is typically restricted to personal or legitimate business
                purposes, and you’re responsible for ensuring your device
                supports eSIM functionality.
              </li>
            </ul>
            <p>
              For the exact terms and conditions, including details on renewals,
              support, or fair usage policies, please visit the website of the
              eSIM provider you used or contact their customer support directly.
              This will ensure you get the most accurate and up-to-date
              information tailored to your purchase.
            </p>
            <br />
            <p>
              Step 1/2 - Install eSIM <br />
              Do not interrupt the eSIM installation process and ensure your
              device has a stable internet connection before starting.
            </p>
            <ol className="list-decimal list-inside pl-1">
              <li>
                Tap "Install eSIM", tap "Continue" twice, and wait for a while.
                Your eSIM will connect to the network; this may take a few
                minutes. Then tap "Done".
              </li>
              <li>
                Choose a label for your new eSIM plan, then tap "Continue".
              </li>
              <li>
                Choose the "Primary" you want to use with iMessage and FaceTime
                for your Apple ID, then tap "Continue".
              </li>
              <li>
                Choose your new eSIM plan for cellular/mobile data, then tap
                "Continue".
              </li>
            </ol>
            <p>
              Step 2/2 - Access Data <br />
              Once the eSIM is installed, you will need to enable data access to
              start using your plan. Follow the instructions provided in the
              next step to ensure your device is properly configured for data
              usage.
            </p>
            <p>Additional Information</p>
            <ul className="list-disc list-inside pl-1">
              <li>
                If you encounter any issues during installation, ensure your
                device is connected to a stable internet connection and try
                again.
              </li>
              <li>
                For further assistance, tap the chat icon in the app to contact
                Airalo support.
              </li>
              <li>
                To review these steps in a visual format, tap "Show Step-by-Step
                Guide" at the bottom of the screen.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEsimDetails;
