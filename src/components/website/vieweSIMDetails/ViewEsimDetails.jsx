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
import { LucideCopy } from "lucide-react";
import ShortBanner from "@/components/shared/ShortBanner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getSelectedEsim } from "@/helpers/selectedEsim";

function parseDataGb(dataAmount) {
  if (!dataAmount) return null;
  const lower = String(dataAmount).toLowerCase();
  if (lower.includes("unlimited")) return null;
  const match = lower.match(/([\d.]+)\s*gb/);
  if (!match) return null;
  return Number(match[1]);
}

function parseDurationDays(duration) {
  if (!duration) return null;
  const match = String(duration).match(/(\d+)/);
  if (!match) return null;
  return Number(match[1]);
}

const ViewEsimDetails = () => {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const stored = getSelectedEsim();
    if (stored && (!packageId || stored.packageId === packageId)) {
      setSelectedPackage(stored);
    }
  }, [packageId]);

  const supportedCountries = selectedPackage?.supported_countries ?? [];

  const dataGb = useMemo(
    () => parseDataGb(selectedPackage?.dataAmount),
    [selectedPackage?.dataAmount]
  );
  const durationDays = useMemo(
    () => parseDurationDays(selectedPackage?.duration),
    [selectedPackage?.duration]
  );

  const dataProgress = dataGb == null ? 100 : Math.min(100, (dataGb / 30) * 100);
  const durationProgress =
    durationDays == null ? 100 : Math.min(100, (durationDays / 30) * 100);

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
              <img
                className="w-[201px] h-[127px] rounded-lg object-cover"
                src={selectedPackage?.operatorImage || simThumb.src}
                alt={selectedPackage?.operatorName || "Sim thumbnail"}
              />
              <div className="pb-1">
                <h2 className="text-xl leading-5 text-[#333333]">
                  {selectedPackage?.operatorName || "No package selected"}
                </h2>
                <p className="text-primary text-sm leading-5 mt-5 font-normal">
                  {selectedPackage?.countryName || "Select a package first"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 pb-3 border-b">
              <div className="flex justify-between items-center bg-[#EEEEEE] rounded-lg px-5 pt-3 pb-5">
                <div className="w-1/2">
                  <Image className="w-5 h-5" src={gb} alt="Data Icon" />
                  <p className="text-xl leading-5 mt-3">
                    {selectedPackage?.dataAmount || "N/A"}
                  </p>
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
                    value={dataProgress}
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
                  <p className="text-xl leading-5 mt-3">
                    {selectedPackage?.duration || "N/A"}
                  </p>
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
                    value={durationProgress}
                    className="w-16 h-16"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#EEEEEE] rounded-lg px-5 pt-3 pb-5">
                <div className="w-1/2">
                  <Image className="w-5 h-5" src={call} alt="Data Icon" />
                  <p className="text-xl leading-5 mt-3">N/A</p>
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
                    value={0}
                    className="w-16 h-16"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#EEEEEE] rounded-lg px-5 pt-3 pb-5">
                <div className="w-1/2">
                  <Image className="w-5 h-5" src={chating} alt="Data Icon" />
                  <p className="text-xl leading-5 mt-3">N/A</p>
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
                    value={0}
                    className="w-16 h-16"
                  />
                </div>
              </div>
            </div>

            <ScrollArea className="h-[350px] pr-2">
              <ul className="mt-3 text-sm space-y-4">
                <li className="flex justify-between items-center max-w-[170px]">
                  <p className="text-[#5C5C5C] leading-5 opacity-80">Data</p>{" "}
                  <p className="text-[#333333] leading-5 opacity-80">
                    {selectedPackage?.dataAmount || "N/A"}
                  </p>
                </li>

                <li className="flex justify-between items-center max-w-[170px]">
                  <p className="text-[#5C5C5C] leading-5 opacity-80">
                    Validity
                  </p>{" "}
                  <p className="text-[#333333] leading-5 opacity-80">
                    {selectedPackage?.duration || "N/A"}
                  </p>
                </li>

                <li className="flex justify-between items-center">
                  <div className="flex justify-between items-center max-w-[170px] w-full">
                    <p className="text-[#5C5C5C] leading-5 opacity-80">Price</p>{" "}
                    <p className="text-[#333333] leading-5 opacity-80">
                      $
                      {selectedPackage
                        ? Number(selectedPackage.priceUSD || 0).toFixed(2)
                        : "0.00"}{" "}
                      USD
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-1">
                    <p className="text-[#5C5C5C] leading-5 opacity-80">
                      Package ID:
                    </p>{" "}
                    <p className="text-[#5C5C5C] leading-5 opacity-80">
                      {selectedPackage?.packageId || "N/A"}
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
                  {supportedCountries?.map((country, cIdx) => (
                    <li
                      key={`${country?.country_code ?? "c"}-${cIdx}`}
                      className="flex items-center gap-3 px-2 py-3"
                    >
                      <img
                        src={country?.image?.url}
                        className="w-5 h-3 object-cover"
                        alt={country?.title}
                      />{" "}
                      <p className="text-xs text-[#767676] leading-5">
                        {country?.title}
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
              {selectedPackage?.qr_installation && (
                <div
                  className="text-xs text-[#5C5C5C] leading-5 text-left w-full"
                  dangerouslySetInnerHTML={{
                    __html: selectedPackage.qr_installation,
                  }}
                />
              )}
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
                    Manual installation
                  </p>
                  <LucideCopy size={20} className="cursor-pointer" />
                </div>
                <p className="text-[#5C5C5C] text-sm leading-5">
                  See instructions below
                </p>
              </div>

              <div className="p-3 bg-[#FDFDFD] rounded-md">
                <div className="flex justify-between">
                  <p className="text-[#A1A1A1] text-[10px] leading-3">
                    Package ID
                  </p>
                  <LucideCopy size={20} className="cursor-pointer" />
                </div>
                <p className="text-[#5C5C5C] text-sm leading-5 pr-5 break-all">
                  {selectedPackage?.packageId || "N/A"}
                </p>
              </div>
              <p className="text-[#A1A1A1] text-xs leading-4 mt-4">
                "Copy this information and enter details manually to install
                your eSIM. *Make sure your device has a stable internet
                connection before installing."
              </p>
            </div>

            {selectedPackage?.manual_installation && (
              <div
                className="mt-4 text-xs text-[#767676] leading-5"
                dangerouslySetInnerHTML={{
                  __html: selectedPackage.manual_installation,
                }}
              />
            )}
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
