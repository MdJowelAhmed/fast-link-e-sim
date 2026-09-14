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
import { LucideCopy, Check, ExternalLink } from "lucide-react";
import ShortBanner from "@/components/shared/ShortBanner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getSelectedEsim } from "@/helpers/selectedEsim";
import { useGetMyESimByIdQuery } from "@/helpers/myESimApi";
import Loading from "@/app/loading";

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
  const id = searchParams.get("id");
  const code = searchParams.get("code");

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [selectedOsTab, setSelectedOsTab] = useState("ios");

  useEffect(() => {
    const stored = getSelectedEsim();
    if (stored) {
      setSelectedPackage(stored);
    }
  }, [packageId, id]);

  const {
    data: orderByIdData,
    isLoading: isOrderLoading,
  } = useGetMyESimByIdQuery(id, { skip: !id });

  const esimData = useMemo(() => {
    const responseData = orderByIdData?.data;

    let orderObj = null;
    let realTimeObj = null;
    let guidelinesObj = null;

    if (responseData) {
      if (responseData.order) {
        orderObj = responseData.order;
        realTimeObj = responseData.realTimeUses;
        guidelinesObj = responseData.guidelines;
      } else if (Array.isArray(responseData)) {
        orderObj =
          responseData.find(
            (item) =>
              (packageId && item.packageId === packageId) ||
              (id && (item._id === id || item.id == id)) ||
              (code && item.code === code)
          ) || responseData[0];
      } else {
        orderObj = responseData;
      }
    }

    const raw = orderObj || selectedPackage || {};
    const simObj =
      Array.isArray(raw?.sims) && raw.sims.length > 0 ? raw.sims[0] : {};
    const operatorObj = raw?.oparator_info || raw?.operator_info || {};

    let remainingData = raw?.data || raw?.dataAmount || "N/A";
    let dataProgressVal = null;

    if (
      realTimeObj &&
      typeof realTimeObj.remaining === "number" &&
      typeof realTimeObj.total === "number" &&
      realTimeObj.total > 0
    ) {
      const remainingGB = (realTimeObj.remaining / 1024).toFixed(1);
      const totalGB = (realTimeObj.total / 1024).toFixed(1);
      remainingData = `${remainingGB} GB / ${totalGB} GB`;
      dataProgressVal = Math.min(
        100,
        Math.max(0, (realTimeObj.remaining / realTimeObj.total) * 100)
      );
    }

    return {
      _id: raw?._id || raw?.id || simObj?.id || "",
      code: raw?.code || "",
      packageId: raw?.packageId || "",
      packageName:
        raw?.package_name ||
        raw?.operatorName ||
        operatorObj?.name ||
        raw?.packageId ||
        "",
      operatorName:
        operatorObj?.name ||
        raw?.operatorName ||
        raw?.package_name ||
        "eSIM Package",
      operatorImage: operatorObj?.image || raw?.operatorImage || simThumb.src,
      country:
        raw?.country || operatorObj?.country_code || raw?.countryName || "",
      dataAmount: remainingData,
      rawTotalData: raw?.data || raw?.dataAmount || "N/A",
      dataProgressVal,
      validity: raw?.validity
        ? `${raw.validity} Days`
        : raw?.duration || "N/A",
      price: raw?.net_price ?? raw?.price ?? raw?.priceUSD ?? 0,
      startDate: raw?.startDate || null,
      endDate: raw?.endDate || null,
      status: raw?.status || realTimeObj?.status || "",
      qr_installation: raw?.qr_installation || "",
      manual_installation: raw?.manual_installation || "",
      installation_guides: raw?.installation_guides || "",
      supported_countries: raw?.supported_countries || [],
      sims: raw?.sims || [],

      // Sim specific details
      iccid: simObj?.iccid || "",
      lpa: simObj?.lpa || "",
      matching_id: simObj?.matching_id || "",
      qrcode: simObj?.qrcode || "",
      qrcode_url:
        simObj?.qrcode_url ||
        simObj?.qr_code_url ||
        raw?.qrcode_url ||
        raw?.qr_code_url ||
        guidelinesObj?.ios?.[0]?.installation_via_qr_code?.qr_code_url ||
        guidelinesObj?.android?.[0]?.installation_via_qr_code?.qr_code_url ||
        "",
      direct_apple_installation_url:
        simObj?.direct_apple_installation_url ||
        guidelinesObj?.ios?.[0]?.direct_apple_installation_url ||
        "",
      apn_type: simObj?.apn_type || "",
      apn_value: simObj?.apn_value || "",
      is_roaming: simObj?.is_roaming ?? null,

      // Extra objects
      realTimeUses: realTimeObj,
      structuredGuidelines: guidelinesObj,
    };
  }, [orderByIdData, selectedPackage, packageId, id, code]);

  const qrCodeImageUrl = useMemo(() => {
    if (esimData?.qrcode_url) {
      return esimData.qrcode_url;
    }
    if (esimData?.qrcode) {
      return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
        esimData.qrcode
      )}`;
    }
    if (esimData?.lpa && esimData?.matching_id) {
      const lpaString = `LPA:1$${esimData.lpa}$${esimData.matching_id}`;
      return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
        lpaString
      )}`;
    }
    return null;
  }, [
    esimData?.qrcode_url,
    esimData?.qrcode,
    esimData?.lpa,
    esimData?.matching_id,
  ]);

  const dataGb = useMemo(
    () => parseDataGb(esimData?.rawTotalData),
    [esimData?.rawTotalData]
  );
  const durationDays = useMemo(
    () => parseDurationDays(esimData?.validity),
    [esimData?.validity]
  );

  const dataProgress =
    esimData?.dataProgressVal !== null
      ? esimData.dataProgressVal
      : dataGb == null
      ? 100
      : Math.min(100, (dataGb / 30) * 100);

  const durationProgress =
    durationDays == null ? 100 : Math.min(100, (durationDays / 30) * 100);

  const handleCopy = (text, fieldName) => {
    if (!text) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const isInitialLoading = isOrderLoading && !selectedPackage && !orderByIdData;

  if (isInitialLoading) {
    return (
      <div className="bg-[#F7F7F7] min-h-[70vh] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  const activeGuidelines = esimData?.structuredGuidelines?.[selectedOsTab];

  return (
    <div className="bg-[#F7F7F7] pb-16">
      <ShortBanner text="View eSIM Details" />

      <div className="pt-6 pb-[30px] max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* top content */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          {/* left side */}
          <div
            className="bg-[#FDFDFD] p-6 rounded-2xl w-full lg:w-[610px] flex flex-col justify-between"
            style={{
              boxShadow: "1px 1px 12px 6px rgba(96, 96, 96, 0.05)",
            }}
          >
            <div>
              <div className=" pb-5 border-b border-gray-100">
                <img
                  className="w-[180px] h-[115px] rounded-xl object-cover bg-gray-50 border border-gray-100"
                  src={esimData.operatorImage}
                  alt={esimData.operatorName}
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[#333333]">
                    {esimData.operatorName}
                  </h2>
                  {esimData.packageName &&
                    esimData.packageName !== esimData.operatorName && (
                      <p className="text-xs text-[#767676] mt-1 font-medium">
                        {esimData.packageName}
                      </p>
                    )}
                  <p className="text-primary text-sm mt-3 font-semibold flex items-center gap-1">
                    {esimData.country}
                  </p>
                </div>
              </div>

              {/* Progress items grid */}
              <div className="grid grid-cols-2 gap-3 py-4 border-b border-gray-100">
                <div className="flex justify-between items-center bg-[#EEEEEE] rounded-xl px-4 py-3">
                  <div>
                    <Image className="w-5 h-5" src={gb} alt="Data Icon" />
                    <p className="text-lg font-bold leading-5 mt-2 text-[#333333]">
                      {esimData.dataAmount}
                    </p>
                    <p className="text-[11px] text-[#767676] mt-0.5 font-medium">
                      Data
                    </p>
                  </div>
                  <div>
                    <CircularProgressbar
                      styles={buildStyles({
                        rotation: 0.25,
                        pathColor: "#008C4C",
                        trailColor: "#A3A3A3",
                        strokeLinecap: "butt",
                      })}
                      strokeWidth={14}
                      value={dataProgress}
                      className="w-14 h-14"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center bg-[#EEEEEE] rounded-xl px-4 py-3">
                  <div>
                    <Image
                      className="w-5 h-5"
                      src={calenderIcon}
                      alt="Calendar Icon"
                    />
                    <p className="text-lg font-bold leading-5 mt-2 text-[#333333]">
                      {esimData.validity}
                    </p>
                    <p className="text-[11px] text-[#767676] mt-0.5 font-medium">
                      Validity
                    </p>
                  </div>
                  <div>
                    <CircularProgressbar
                      styles={buildStyles({
                        rotation: 0.25,
                        pathColor: "#FF4040",
                        trailColor: "#A3A3A3",
                        strokeLinecap: "butt",
                      })}
                      strokeWidth={14}
                      value={durationProgress}
                      className="w-14 h-14"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center bg-[#EEEEEE] rounded-xl px-4 py-3">
                  <div>
                    <Image className="w-5 h-5" src={call} alt="Voice Icon" />
                    <p className="text-lg font-bold leading-5 mt-2 text-[#333333]">
                      N/A
                    </p>
                    <p className="text-[11px] text-[#767676] mt-0.5 font-medium">
                      Voice
                    </p>
                  </div>
                  <div>
                    <CircularProgressbar
                      styles={buildStyles({
                        rotation: 0.25,
                        pathColor: "#008C4C",
                        trailColor: "#A3A3A3",
                        strokeLinecap: "butt",
                      })}
                      strokeWidth={14}
                      value={0}
                      className="w-14 h-14"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center bg-[#EEEEEE] rounded-xl px-4 py-3">
                  <div>
                    <Image className="w-5 h-5" src={chating} alt="SMS Icon" />
                    <p className="text-lg font-bold leading-5 mt-2 text-[#333333]">
                      N/A
                    </p>
                    <p className="text-[11px] text-[#767676] mt-0.5 font-medium">
                      SMS
                    </p>
                  </div>
                  <div>
                    <CircularProgressbar
                      styles={buildStyles({
                        rotation: 0.25,
                        pathColor: "#008C4C",
                        trailColor: "#A3A3A3",
                        strokeLinecap: "butt",
                      })}
                      strokeWidth={14}
                      value={0}
                      className="w-14 h-14"
                    />
                  </div>
                </div>
              </div>
            </div>

            <ScrollArea className="h-[320px] pr-2 mt-2">
              <ul className="text-sm space-y-3">
                <li className="flex justify-between items-center">
                  <span className="text-[#5C5C5C] font-medium">Data</span>
                  <span className="text-[#333333] font-semibold">
                    {esimData.dataAmount}
                  </span>
                </li>

                <li className="flex justify-between items-center">
                  <span className="text-[#5C5C5C] font-medium">Validity</span>
                  <span className="text-[#333333] font-semibold">
                    {esimData.validity}
                  </span>
                </li>

                <li className="flex justify-between items-center">
                  <span className="text-[#5C5C5C] font-medium">Price</span>
                  <span className="text-[#333333] font-semibold">
                    ${Number(esimData.price || 0).toFixed(2)} USD
                  </span>
                </li>

                {esimData.code && (
                  <li className="flex justify-between items-center">
                    <span className="text-[#5C5C5C] font-medium">Order Code</span>
                    <span className="text-[#333333] font-mono text-xs font-semibold">
                      {esimData.code}
                    </span>
                  </li>
                )}

                {esimData.packageId && (
                  <li className="flex justify-between items-center">
                    <span className="text-[#5C5C5C] font-medium">Package ID</span>
                    <span className="text-[#333333] font-mono text-xs font-semibold">
                      {esimData.packageId}
                    </span>
                  </li>
                )}

                {esimData.status && (
                  <li className="flex justify-between items-center">
                    <span className="text-[#5C5C5C] font-medium">Status</span>
                    <span className="uppercase text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold tracking-wide">
                      {esimData.status}
                    </span>
                  </li>
                )}

                {esimData.startDate && (
                  <li className="flex justify-between items-center">
                    <span className="text-[#5C5C5C] font-medium">Start Date</span>
                    <span className="text-[#333333] text-xs font-medium">
                      {new Date(esimData.startDate).toLocaleString()}
                    </span>
                  </li>
                )}
              </ul>

              <hr className="my-4 border-[#EEEEEE]" />

              <div>
                <h3 className="text-base text-[#333333] font-bold mb-3">
                  Supported Countries ({esimData.supported_countries.length})
                </h3>
                {esimData.supported_countries.length > 0 ? (
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {esimData.supported_countries.map((country, cIdx) => (
                      <li
                        key={`${country?.country_code ?? "c"}-${cIdx}`}
                        className="flex items-center gap-2.5 p-2 rounded-lg bg-gray-50 border border-gray-100"
                      >
                        {country?.image?.url ||
                        typeof country?.image === "string" ? (
                          <img
                            src={country?.image?.url || country?.image}
                            className="w-6 h-4 object-cover rounded-sm border border-gray-200"
                            alt={country?.title || country?.name || "flag"}
                          />
                        ) : null}
                        <p className="text-xs text-[#444] font-medium truncate">
                          {country?.title || country?.name || country?.country_code}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500">
                    No country information specified.
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* right side */}
          <div
            className="lg:w-[570px] bg-[#FDFDFD] p-6 rounded-2xl flex flex-col justify-between"
            style={{
              boxShadow: "1px 1px 12px 6px rgba(96, 96, 96, 0.05)",
            }}
          >
            <div>
              <h3 className="text-xl text-[#333333] font-bold mb-4">
                Install eSIM
              </h3>

              <div className="bg-[#FFF8E1] border border-[#FFE082] p-4 rounded-xl mb-5">
                <p className="text-[#8D6E63] text-xs leading-5 font-medium">
                  <span className="font-bold text-[#E65100]">WARNING!</span> Most eSIMs can only be installed once. If you remove the eSIM from your device, you cannot install it again.
                </p>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col justify-center items-center gap-4 bg-[#F7F7F7] p-6 rounded-xl border border-gray-100">
                {qrCodeImageUrl ? (
                  <img
                    className="w-[180px] h-[180px] object-contain rounded-lg p-2 bg-white shadow-sm border border-gray-100"
                    src={qrCodeImageUrl}
                    alt="eSIM QR Code"
                  />
                ) : (
                  <div className="w-[180px] h-[180px] flex items-center justify-center bg-gray-100 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-500 font-medium">
                      QR Code is not available for this package.
                    </p>
                  </div>
                )}

                {esimData.direct_apple_installation_url && (
                  <a
                    href={esimData.direct_apple_installation_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 px-4 py-2 bg-black text-white text-xs rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center gap-2 shadow-sm"
                  >
                    Direct iOS Installation <ExternalLink size={14} />
                  </a>
                )}

                {esimData.qr_installation ? (
                  <div
                    className="text-xs text-[#5C5C5C] leading-5 text-left w-full mt-2 space-y-2 [&_ol]:list-decimal [&_ol]:pl-4 [&_ul]:list-disc [&_ul]:pl-4 [&_p]:mb-1 [&_b]:font-semibold text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: esimData.qr_installation,
                    }}
                  />
                ) : (
                  <p className="text-center text-[#A1A1A1] text-xs leading-5">
                    Scan the QR code by printing it out or displaying it on another device to install your eSIM. Make sure your device has a stable internet connection before installation.
                  </p>
                )}
              </div>

              {/* Manual Installation Copy Boxes */}
              <div className="bg-[#F7F7F7] p-4 mt-4 rounded-xl space-y-3 border border-gray-100">
                <h4 className="text-sm font-bold text-[#333333]">
                  Manual Installation Details
                </h4>

                {/* SM-DP+ Address (LPA) */}
                {esimData.lpa && (
                  <div className="p-3 bg-[#FDFDFD] rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[#A1A1A1] text-[10px] uppercase font-bold tracking-wider">
                        SM-DP+ Address (LPA)
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCopy(esimData.lpa, "LPA")}
                        className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1 text-xs"
                      >
                        {copiedField === "LPA" ? (
                          <span className="text-emerald-600 font-bold text-xs flex items-center gap-0.5">
                            <Check size={14} /> Copied!
                          </span>
                        ) : (
                          <LucideCopy size={16} />
                        )}
                      </button>
                    </div>
                    <p className="text-[#333333] text-xs font-mono select-all break-all">
                      {esimData.lpa}
                    </p>
                  </div>
                )}

                {/* Activation Code (matching_id) */}
                {esimData.matching_id && (
                  <div className="p-3 bg-[#FDFDFD] rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[#A1A1A1] text-[10px] uppercase font-bold tracking-wider">
                        Activation Code
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCopy(esimData.matching_id, "matching_id")}
                        className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1 text-xs"
                      >
                        {copiedField === "matching_id" ? (
                          <span className="text-emerald-600 font-bold text-xs flex items-center gap-0.5">
                            <Check size={14} /> Copied!
                          </span>
                        ) : (
                          <LucideCopy size={16} />
                        )}
                      </button>
                    </div>
                    <p className="text-[#333333] text-xs font-mono select-all break-all">
                      {esimData.matching_id}
                    </p>
                  </div>
                )}

                {/* ICCID */}
                {esimData.iccid && (
                  <div className="p-3 bg-[#FDFDFD] rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[#A1A1A1] text-[10px] uppercase font-bold tracking-wider">
                        ICCID
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCopy(esimData.iccid, "iccid")}
                        className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1 text-xs"
                      >
                        {copiedField === "iccid" ? (
                          <span className="text-emerald-600 font-bold text-xs flex items-center gap-0.5">
                            <Check size={14} /> Copied!
                          </span>
                        ) : (
                          <LucideCopy size={16} />
                        )}
                      </button>
                    </div>
                    <p className="text-[#333333] text-xs font-mono select-all break-all">
                      {esimData.iccid}
                    </p>
                  </div>
                )}

                {/* Package ID */}
                {esimData.packageId && (
                  <div className="p-3 bg-[#FDFDFD] rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[#A1A1A1] text-[10px] uppercase font-bold tracking-wider">
                        Package ID
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCopy(esimData.packageId, "packageId")}
                        className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1 text-xs"
                      >
                        {copiedField === "packageId" ? (
                          <span className="text-emerald-600 font-bold text-xs flex items-center gap-0.5">
                            <Check size={14} /> Copied!
                          </span>
                        ) : (
                          <LucideCopy size={16} />
                        )}
                      </button>
                    </div>
                    <p className="text-[#333333] text-xs font-mono select-all break-all">
                      {esimData.packageId}
                    </p>
                  </div>
                )}

                <p className="text-[#A1A1A1] text-xs leading-4 mt-2">
                  Copy this information and enter details manually to install your eSIM. Make sure your device has a stable internet connection before installing.
                </p>
              </div>

              {/* Manual Installation HTML */}
              {/* {esimData.manual_installation && (
                <div
                  className="mt-4 text-xs text-[#5C5C5C] leading-5 space-y-2 [&_ol]:list-decimal [&_ol]:pl-4 [&_ul]:list-disc [&_ul]:pl-4 [&_p]:mb-1 [&_b]:font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: esimData.manual_installation,
                  }}
                />
              )} */}
            </div>
          </div>
        </div>

        {/* bottom content */}
        <div
          className="p-6 bg-[#FDFDFD] rounded-2xl mt-6"
          style={{
            boxShadow: "1px 1px 12px 6px rgba(96, 96, 96, 0.05)",
          }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 border-b border-gray-100 pb-4">
            <h3 className="text-xl text-[#333333] font-bold">
              Direction & Guidelines
            </h3>
            {esimData.installation_guides && (
              <a
                href={esimData.installation_guides}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-white text-xs rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center gap-2 shadow-sm"
              >
                Official Help Guide <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* If structured guidelines exist, render tabs for iOS / Android */}
          {esimData.structuredGuidelines && (
            <div className="mb-6 border-b border-gray-200">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedOsTab("ios")}
                  className={`pb-2 px-1 text-sm font-semibold border-b-2 transition-colors ${
                    selectedOsTab === "ios"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  iOS Instructions
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOsTab("android")}
                  className={`pb-2 px-1 text-sm font-semibold border-b-2 transition-colors ${
                    selectedOsTab === "android"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Android Instructions
                </button>
              </div>
            </div>
          )}

          {activeGuidelines && activeGuidelines.length > 0 ? (
            <div className="space-y-6 text-xs text-[#5C5C5C]">
              {activeGuidelines.map((guide, gIdx) => (
                <div
                  key={gIdx}
                  className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4"
                >
                  {guide.version && (
                    <span className="inline-block px-2.5 py-1 bg-gray-200 text-gray-700 font-bold rounded-md text-[11px]">
                      iOS / Version: {guide.version}
                    </span>
                  )}

                  {/* QR Code Steps */}
                  {guide.installation_via_qr_code?.steps && (
                    <div>
                      <h4 className="font-bold text-[#333333] text-sm mb-2">
                        Installation via QR Code
                      </h4>
                      <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-5">
                        {Object.entries(
                          guide.installation_via_qr_code.steps
                        ).map(([stepNum, stepText]) => (
                          <li key={stepNum}>
                            <span className="font-medium text-gray-800">
                              {stepText}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Manual Steps */}
                  {guide.installation_manual?.steps && (
                    <div className="pt-2 border-t border-gray-200">
                      <h4 className="font-bold text-[#333333] text-sm mb-2">
                        Manual Installation Steps
                      </h4>
                      <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-5">
                        {Object.entries(
                          guide.installation_manual.steps
                        ).map(([stepNum, stepText]) => (
                          <li key={stepNum}>
                            <span className="font-medium text-gray-800">
                              {stepText}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Network Setup */}
                  {guide.network_setup?.steps && (
                    <div className="pt-2 border-t border-gray-200">
                      <h4 className="font-bold text-[#333333] text-sm mb-2">
                        Network & Data Access Setup
                      </h4>
                      <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-5">
                        {Object.entries(
                          guide.network_setup.steps
                        ).map(([stepNum, stepText]) => (
                          <li key={stepNum}>
                            <span className="font-medium text-gray-800">
                              {stepText}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[#767676] text-xs leading-6 space-y-4">
              <p>
                For information on the terms and conditions for maintaining your
                eSIM, it’s best to check with the specific provider from whom you
                purchased the eSIM. Different providers have varying policies
                regarding usage, renewals, and maintenance. Based on general
                practices, some key points to consider include:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-1">
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

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-2 space-y-3">
                <h4 className="font-bold text-[#333333] text-sm">
                  Step 1/2 - Install eSIM
                </h4>
                <p>
                  Do not interrupt the eSIM installation process and ensure your
                  device has a stable internet connection before starting.
                </p>
                <ol className="list-decimal list-inside pl-2 space-y-1">
                  <li>
                    Tap "Install eSIM", tap "Continue" twice, and wait for a
                    while. Your eSIM will connect to the network; this may take a
                    few minutes. Then tap "Done".
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

                <h4 className="font-bold text-[#333333] text-sm pt-2">
                  Step 2/2 - Access Data
                </h4>
                <p>
                  Once the eSIM is installed, you will need to enable data access
                  to start using your plan. Follow the instructions provided to
                  ensure your device is properly configured for data usage.
                </p>

                <h4 className="font-bold text-[#333333] text-sm pt-2">
                  Additional Information
                </h4>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>
                    If you encounter any issues during installation, ensure your
                    device is connected to a stable internet connection and try
                    again.
                  </li>
                  {esimData.installation_guides && (
                    <li>
                      For detailed guides and troubleshooting, visit:{" "}
                      <a
                        href={esimData.installation_guides}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline font-medium"
                      >
                        {esimData.installation_guides}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEsimDetails;


