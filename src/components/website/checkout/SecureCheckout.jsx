import React from "react";
import Image from "next/image";
import simThumb from "@/assests/simThumb.svg";
import Link from "next/link";
import ShortBanner from "@/components/shared/ShortBanner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const SecureCheckout = () => {
  return (
    <div className="bg-[#F7F7F7]">
      <ShortBanner text="Secure Checkout" />
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col md:flex-row lg:gap-[90px] mt-10 bg-[#E6F5EE] py-6 md:py-10 lg:px-[124px] rounded-2xl px-4"
          style={{
            boxShadow: "1px 1px 12px 6px rgba(96, 96, 96, 0.05)",
          }}
        >
          {/* Left Side - Image */}
          <div className="flex items-center justify-center">
            <Image
              src={simThumb}
              alt="Fatafati eSIM"
              className="rounded-md w-full h-full lg:h-[293px] lg:w-[464px]"
            />
          </div>

          {/* Right Side - Info */}
          <div className="pt-10 md:px-10 w-full md:w-1/2  lg:w-[337px]">
            <div>
              <h2 className="text-xl font-medium leading-5 text-[#333333]">
                Fatafati
              </h2>
              <p className="text-primary text-sm leading-5 mt-5 font-normal">
                Bangladesh
              </p>
              <ul className="mt-8 text-sm space-y-4">
                <li className="flex justify-between items-center">
                  <p className="text-[#5C5C5C] leading-5 opacity-80">Data</p>{" "}
                  <p className="text-[#333333] font-medium leading-5 opacity-80">
                    2 GB
                  </p>
                </li>
                <hr style={{ borderColor: "#C0C0C0" }} />
                <li className="flex justify-between items-center">
                  <p className="text-[#5C5C5C] leading-5 opacity-80">
                    Validity
                  </p>{" "}
                  <p className="text-[#333333] font-medium leading-5 opacity-80">
                    7 Day
                  </p>
                </li>
                <hr style={{ borderColor: "#C0C0C0" }} />
                <li className="flex justify-between items-center">
                  <p className="text-[#5C5C5C] leading-5 opacity-80">Price</p>{" "}
                  <p className="text-[#333333] font-semibold leading-5 opacity-80">
                    $2.00 USD
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full py-10 xl:py-20">
          <h4 className="text-[#000000] text-xl leading-6 pb-3">
            Choose Payment Method
          </h4>
          <p className="text-[#A1A1A1] text-sm leading-6 pb-6">
            You can choose or change the payment method to complete your order.
          </p>
          <Select>
            <SelectTrigger
              className="w-full !h-[68px] bg-[#FDFDFD]"
              style={{
                boxShadow: "0px 8px 7px 2px rgba(96, 96, 96, 0.05)",
              }}
            >
              <SelectValue placeholder="Choose Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Google Pay">Google Pay</SelectItem>
              <SelectItem value="Binance">Binance</SelectItem>
              <SelectItem value="Apple Pay">Apple Pay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pb-6">
          <h4 className="text-[#000000] text-xl leading-6 pb-3">
            Order Summary
          </h4>
          <p className="text-[#A1A1A1] text-sm leading-6 pb-6">
            You can review your order summary.
          </p>
          <div className="pt-6 mb-5 xl:mb-16 flex flex-col md:flex-row  justify-between border-t">
            <h3 className="mb-4 text-sm text-[#BBBBBB]">
              Enter your coupon code :
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="email"
                className="w-[250px] h-10 bg-white px-6 py-3 rounded-lg placeholder:text-[#EEEEEE] placeholder:text-sm"
                placeholder="Enter your code"
              />

              <button className="bg-[#FBC02D] text-[#333333] px-6 py-2.5 rounded-lg text-sm font-medium w-full md:w-auto">
                Confirm
              </button>
            </div>
          </div>

          <div className="w-full flex justify-between md:justify-end items-center gap-[118px] pt-3">
            <p className="text-[#5C5C5C] text-sm leading-6">Sub Total:</p>
            <p className="text-[#000000] text-sm md:text-xl font-medium leading-6">
              $9.00 USD
            </p>
          </div>
          <div className="w-full flex justify-between md:justify-end items-center gap-[118px] py-6">
            <p className="text-[#5C5C5C] text-sm leading-6">Discount:</p>
            <p className="text-[#D32F2F] text-sm md:text-xl font-medium leading-6">
              $9.00 USD
            </p>
          </div>
          <div className="w-full flex justify-between md:justify-end items-center gap-[118px] py-6 border-t border-b">
            <p className="text-[#5C5C5C] text-sm leading-6">Total Price:</p>
            <p className="text-[#000000] text-sm md:text-xl font-medium leading-6">
              $9.00 USD
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center pb-[55px]">
          <div className="flex  lg:items-center gap-2 lg:mb-0 mb-10">
            <Checkbox />
            <p className="text-[#818181] text-sm">
              Before completing this order, please confirm your device is eSIM
              compatible and network-unlocked.
            </p>
          </div>
          <Link href="/view-eSIM-details">
            <Button className="h-12 w-[344px] text-base text-[#F4F4F4] leading-6">
              COMPLETE ORDER
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SecureCheckout;
