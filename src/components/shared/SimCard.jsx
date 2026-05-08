"use client";

import simThumb from "@/assests/simThumb.svg";
import Image from "next/image";
import dataImg from "@/assests/data.svg";
import calenderImg from "@/assests/calender.svg";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { saveSelectedEsim } from "@/helpers/selectedEsim";
import { useCreateCartMutation } from "@/helpers/cartApi";
import { useRouter } from "next/navigation";
import { IoBagAddOutline } from "react-icons/io5";

const SimCard = ({ packageData }) => {
  const router = useRouter();
  const [createCart, { isLoading: isCartLoading }] = useCreateCartMutation();

  if (!packageData) return null;

  const supportedCountries = packageData?.supported_countries ?? [];

  const handleAddToCart = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      await createCart(packageData).unwrap();
    } catch {
      // silently fail - item may already be in cart
    }
  };

  const handleBuyNow = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      await createCart(packageData).unwrap();
    } catch {
      // silently fail
    }
    saveSelectedEsim(packageData);
    router.push("/secure-checkout");
  };

  return (
    <>
      <div
        className="rounded-2xl p-3 relative"
        style={{
          boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        <div className="flex gap-6 items-start mb-10">
          <img
            src={packageData?.operatorImage || simThumb.src}
            alt={packageData?.operatorName || "eSIM Card"}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div>
            <h4 className="text-xl font-medium text-[#333333] mb-3">
              {packageData?.operatorName}
            </h4>
            <p className="text-primary text-sm">{packageData?.countryName}</p>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-5">
          <div className="flex items-center gap-3">
            <Image src={dataImg} alt="eSIM Card" />
            <p className="text-sm">{packageData?.dataAmount}</p>
          </div>
          <p className="text-xl font-medium text-[#333333]">
            ${Number(packageData?.priceUSD || 0).toFixed(2)} USD
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <Image src={calenderImg} alt="eSIM Card" />
            <p className="text-sm">{packageData?.duration}</p>
          </div>
          {!!packageData?.originalPriceUSD && (
            <p className="text-[#FF4040] line-through text-xs">
              ${Number(packageData.originalPriceUSD).toFixed(2)} USD
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-transparent text-primary py-2 rounded-lg border-primary border cursor-pointer hover:bg-transparent">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="lg:min-w-[960px] min-h-[740px] p-3 bg-[#F4F4F4]">
              <VisuallyHidden asChild>
                <DialogTitle>SIM Card Details</DialogTitle>
              </VisuallyHidden>
              <div className="h-[740px] overflow-y-scroll scrollbar-hide">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left Side - Image */}
                  <div className="bg-gray-100 flex items-center justify-center">
                    <img
                      src={packageData?.operatorImage || simThumb.src}
                      alt={packageData?.operatorName || "eSIM"}
                      className="rounded-md h-[293px] w-[464px] object-cover"
                    />
                  </div>

                  {/* Right Side - Info */}
                  <div className="md:pt-10 pb-5 md:px-10 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-medium leading-5 text-[#333333]">
                        {packageData?.operatorName}
                      </h2>
                      <p className="text-primary text-sm leading-5 mt-2 font-normal">
                        {packageData?.countryName}
                      </p>
                      <ul className="mt-6 text-sm space-y-2">
                        <li className="flex justify-between items-center">
                          <p className="text-[#5C5C5C] leading-5 opacity-80">
                            Data
                          </p>{" "}
                          <p className="text-[#5C5C5C] leading-5 opacity-80">
                            {packageData?.dataAmount}
                          </p>
                        </li>
                        <hr style={{ borderColor: "#C0C0C0" }} />
                        <li className="flex justify-between items-center">
                          <p className="text-[#5C5C5C] leading-5 opacity-80">
                            Validity
                          </p>{" "}
                          <p className="text-[#5C5C5C] leading-5 opacity-80">
                            {packageData?.duration}
                          </p>
                        </li>
                        <hr style={{ borderColor: "#C0C0C0" }} />
                        <li className="flex justify-between items-center">
                          <p className="text-[#5C5C5C] leading-5 opacity-80">
                            Price
                          </p>{" "}
                          <p className="text-[#5C5C5C] leading-5 opacity-80">
                            ${Number(packageData?.priceUSD || 0).toFixed(2)} USD
                          </p>
                        </li>
                        <hr style={{ borderColor: "#C0C0C0" }} />
                      </ul>
                    </div>

                    <div className="flex flex-col gap-2 mt-16">
                      <Button
                        onClick={handleBuyNow}
                        disabled={isCartLoading}
                        className="w-full bg-primary hover:bg-primary h-12"
                      >
                        {isCartLoading ? "Adding..." : "BUY NOW"}
                      </Button>
                      <Button
                        onClick={handleAddToCart}
                        disabled={isCartLoading}
                        className="w-full bg-transparent text-primary border border-primary hover:bg-transparent h-12 flex items-center gap-2"
                      >
                        <IoBagAddOutline className="text-lg" />
                        {isCartLoading ? "Adding..." : "ADD TO CART"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm lg:mt-4">
                  {/* Additional Info */}
                  <Card className="py-0 shadow-none bg-[#FDFDFD] border-none">
                    <CardContent className="p-4">
                      <h3 className="text-lg text-[#333333] leading-5 font-medium mb-6">
                        Additional Information
                      </h3>
                      <ScrollArea className="h-[300px]">
                        <ul className="space-y-3">
                          <li className="flex flex-col gap-2">
                            <p className="text-xs text-[#C0C0C0] font-medium leading-5">
                              Plan Type
                            </p>{" "}
                            <p className="text-[#767676] text-xs leading-5">
                              {packageData?.planType || "N/A"}
                            </p>
                          </li>
                          <li className="flex flex-col gap-2">
                            <p className="text-xs text-[#C0C0C0] font-medium leading-5">
                              Package ID
                            </p>{" "}
                            <p className="text-[#767676] text-xs leading-5">
                              {packageData?.packageId}
                            </p>
                          </li>
                          <li className="flex flex-col gap-2">
                            <p className="text-xs text-[#C0C0C0] font-medium leading-5">
                              Top-Up Option
                            </p>{" "}
                            <p className="text-[#767676] text-xs leading-5">
                              Rechargeable online with no expiry.
                            </p>
                          </li>
                          <li className="flex flex-col gap-2">
                            <p className="text-xs text-[#C0C0C0] font-medium leading-5">
                              Fair Usage Policy
                            </p>
                            <p className="text-[#767676] text-xs leading-5">
                              {packageData?.fair_usage_policy ||
                                "No fair usage policy information available."}
                            </p>
                          </li>
                          {(packageData?.info ?? []).map((item, index) => (
                            <li key={index} className="flex flex-col gap-2">
                              <p className="text-xs text-[#C0C0C0] font-medium leading-5">
                                Info {index + 1}
                              </p>
                              <p className="text-[#767676] text-xs leading-5">
                                {item}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Supported Countries */}
                  <Card className="py-0 shadow-none bg-[#FDFDFD] border-none">
                    <CardContent className="p-4">
                      <h3 className="text-lg text-[#333333] leading-5 font-medium md:mb-4">
                        Supported Country
                      </h3>
                      <ScrollArea className="h-[300px]">
                        <ul className="space-y-2">
                          {supportedCountries?.map((country, cIdx) => (
                            <li
                              key={`${country?.country_code ?? "c"}-${cIdx}`}
                              className="flex items-center gap-3 px-2 py-3"
                            >
                              <img
                                src={country?.image?.url}
                                className="w-5 h-3"
                                alt={country?.title}
                              />
                              <p className="text-xs text-[#767676] leading-5">
                                {country?.title}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            onClick={handleBuyNow}
            disabled={isCartLoading}
            className="w-full bg-primary text-white py-2 rounded-lg uppercase cursor-pointer hover:bg-primary"
          >
            {isCartLoading ? "Adding..." : "Buy Now"}
          </Button>

          {/* <Button
            onClick={handleAddToCart}
            disabled={isCartLoading}
            className="w-full bg-transparent text-primary py-2 rounded-lg border-primary border cursor-pointer hover:bg-transparent flex items-center justify-center gap-2"
          >
            <IoBagAddOutline className="text-lg" />
            {isCartLoading ? "Adding..." : "Add to Cart"}
          </Button> */}
        </div>

        {!!packageData?.discountPercentage && (
          <div className="absolute -top-4 right-6 bg-[#FFABA9] px-4 py-1 rounded-full">
            <p className="text-white text-xs">
              {packageData.discountPercentage}% Off
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SimCard;
