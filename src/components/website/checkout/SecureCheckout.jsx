"use client";

import React, { useMemo, useState } from "react";
import simThumb from "@/assests/simThumb.svg";
import { useCouponCheckMutation, useEsimCheckoutMutation } from "@/helpers/eSimApi";
import {
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
} from "@/helpers/cartApi";
import ShortBanner from "@/components/shared/ShortBanner";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { IoTrashOutline } from "react-icons/io5";
import Link from "next/link";

const SecureCheckout = () => {
  const [couponInput, setCouponInput] = useState("");
  const [submittedCoupon, setSubmittedCoupon] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const { data: cartResponse, isLoading: isCartLoading } = useGetCartQuery();
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [esimCheckout] = useEsimCheckoutMutation();
  const [couponCheck, { isLoading: isCouponChecking }] = useCouponCheckMutation();

  const cartItems = cartResponse?.data?.data ?? [];
  const priceBreakDown = cartResponse?.data?.priceBreakDown ?? { subTotal: 0, total: 0, discount: 0 };

  const effectiveCouponCode = useMemo(() => {
    const code = submittedCoupon || couponInput;
    return code.trim();
  }, [couponInput, submittedCoupon]);

  const handleQuantityChange = async (id, direction) => {
    try {
      await updateCart({ id, quantity: direction }).unwrap();
    } catch {
      // silently fail
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCart(id).unwrap();
    } catch {
      // silently fail
    }
  };

  const handleConfirmCoupon = async () => {
    const code = couponInput.trim();
    if (!code || cartItems.length === 0) return;
    setSubmitError("");

    try {
      const res = await couponCheck({
        code,
        amount: Number(priceBreakDown.total || 0),
      }).unwrap();

      setSubmittedCoupon(res?.data?.code || code);
      setCouponData(res?.data ?? null);
    } catch {
      setCouponData(null);
      setSubmittedCoupon("");
      setSubmitError("Invalid coupon code.");
    }
  };

  const handleCompleteOrder = async () => {
    if (cartItems.length === 0) return;
    setSubmitError("");
    setIsCheckoutLoading(true);

    try {
      for (const item of cartItems) {
        const esim = item?.esim?.esim ?? item?.esim ?? {};
        const netPrice = effectiveCouponCode
          ? couponData?.total_price ?? esim.priceUSD
          : esim.priceUSD;

        const orderBody = {
          package_id: esim.packageId,
          type: esim.type,
          country: esim.countryName,
          supported_countries: esim.supported_countries ?? [],
          net_price: netPrice,
          ...(effectiveCouponCode ? { coupon: effectiveCouponCode } : {}),
          rawData: esim,
        };

        const checkoutResult = await esimCheckout(orderBody).unwrap();
        const checkoutUrl = checkoutResult?.data;

        if (checkoutUrl) {
          window.location.href = checkoutUrl;
          return;
        }
      }

      setSubmitError("Checkout URL not found in API response.");
    } catch {
      setSubmitError("Checkout failed. Please try again.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const displayTotal = couponData?.current_price ?? priceBreakDown.total;
  const displaySubTotal = priceBreakDown.subTotal;
  const displayDiscount = couponData?.discount ?? priceBreakDown.discount;

  if (isCartLoading) {
    return (
      <div className="bg-[#F7F7F7] min-h-screen">
        <ShortBanner text="Secure Checkout" />
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
          <p className="text-[#767676]">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#F7F7F7] min-h-screen">
        <ShortBanner text="Secure Checkout" />
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center gap-6">
          <p className="text-[#767676] text-lg">Your cart is empty.</p>
          <Link href="/shop">
            <Button className="h-12 px-8">Browse eSIMs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F7]">
      <ShortBanner text="Secure Checkout" />
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Cart Items */}
        <h4 className="text-[#000000] text-xl leading-6 mb-5">Your Cart</h4>

        {/* Table Header - desktop */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-4 py-3 bg-white rounded-xl mb-3 text-sm text-[#BBBBBB] font-medium shadow-sm">
          <span>Product</span>
          <span className="text-center">Data / Duration</span>
          <span className="text-center">Quantity</span>
          <span className="text-center">Price</span>
          <span className="w-8" />
        </div>

        {/* Cart Rows */}
        <div className="flex flex-col gap-3">
          {cartItems.map((item) => {
            const esim = item?.esim?.esim ?? item?.esim ?? {};
            return (
              <div
                key={item._id}
                className="bg-white rounded-xl px-4 py-4 shadow-sm"
                style={{ boxShadow: "1px 1px 8px 2px rgba(96,96,96,0.06)" }}
              >
                {/* Mobile layout */}
                <div className="flex md:hidden gap-4">
                  <img
                    src={esim?.operatorImage || simThumb.src}
                    alt={esim?.operatorName}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#333333] truncate">{esim?.operatorName}</p>
                    <p className="text-primary text-xs mt-0.5">{esim?.countryName}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[#767676]">
                      <span>{esim?.dataAmount}</span>
                      <span>·</span>
                      <span>{esim?.duration}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 border border-[#E0E0E0] rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(item._id, -1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-[#333333] text-lg font-medium hover:bg-[#F7F7F7] disabled:opacity-30 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-[#333333]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#333333] text-lg font-medium hover:bg-[#F7F7F7] transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-semibold text-[#333333]">
                        ${Number((esim?.priceUSD || 0) * item.quantity).toFixed(2)} USD
                      </p>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-[#FF4040] hover:text-[#D32F2F] transition-colors p-1"
                      >
                        <IoTrashOutline className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center">
                  {/* Product */}
                  <div className="flex items-center gap-3">
                    <img
                      src={esim?.operatorImage || simThumb.src}
                      alt={esim?.operatorName}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <p className="font-medium text-[#333333] text-sm">{esim?.operatorName}</p>
                      <p className="text-primary text-xs mt-0.5">{esim?.countryName}</p>
                    </div>
                  </div>

                  {/* Data / Duration */}
                  <div className="text-center">
                    <p className="text-sm text-[#333333] font-medium">{esim?.dataAmount}</p>
                    <p className="text-xs text-[#767676] mt-0.5">{esim?.duration}</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-center">
                    <div className="flex items-center gap-1 border border-[#E0E0E0] rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center text-[#333333] text-lg font-medium hover:bg-[#F7F7F7] disabled:opacity-30 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-[#333333]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#333333] text-lg font-medium hover:bg-[#F7F7F7] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <p className="text-sm font-semibold text-[#333333]">
                      ${Number((esim?.priceUSD || 0) * item.quantity).toFixed(2)} USD
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-[#BBBBBB] mt-0.5">
                        ${Number(esim?.priceUSD || 0).toFixed(2)} each
                      </p>
                    )}
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-[#FF4040] hover:text-[#D32F2F] transition-colors p-1"
                  >
                    <IoTrashOutline className="text-xl" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="py-6 mt-4">
          <h4 className="text-[#000000] text-xl leading-6 pb-3">Order Summary</h4>

          <div className="pt-6 mb-5 xl:mb-10 flex flex-col md:flex-row justify-between">
            <h3 className="mb-4 text-sm text-[#BBBBBB]">Enter your coupon code :</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-[250px] h-[45px] bg-white px-6 py-3 rounded-lg placeholder:text-[#000000c] border placeholder:text-sm"
                  placeholder="Enter your coupon "
                />
                <button
                  type="button"
                  onClick={handleConfirmCoupon}
                  disabled={!couponInput.trim()}
                  className="bg-[#FBC02D] text-[#333333] px-6 py-2.5 rounded-lg text-sm font-medium w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCouponChecking ? "Checking..." : "Confirm"}
                </button>
              </div>
              {!!submitError && (
                <p className="mt-1 text-sm text-[#FF4040]">{submitError}</p>
              )}
              {isCouponChecking && (
                <p className="mt-1 text-sm text-[#767676]">Checking coupon...</p>
              )}
            </div>
          </div>

          <div className="w-full flex justify-between md:justify-end items-center gap-[118px] pt-3">
            <p className="text-[#5C5C5C] text-sm leading-6">Sub Total:</p>
            <p className="text-[#000000] text-sm md:text-xl font-medium leading-6">
              ${Number(displaySubTotal).toFixed(2)} USD
            </p>
          </div>

          <div className="w-full flex justify-between md:justify-end items-center gap-[118px] py-6">
            <p className="text-[#5C5C5C] text-sm leading-6">Discount:</p>
            <p className="text-[#D32F2F] text-sm md:text-xl font-medium leading-6">
              -${Number(displayDiscount).toFixed(2)} USD
            </p>
          </div>

          <div className="w-full flex justify-between md:justify-end items-center gap-[118px] py-6 border-t border-b">
            <p className="text-[#5C5C5C] text-sm leading-6">Total Price:</p>
            <p className="text-[#000000] text-sm md:text-xl font-medium leading-6">
              ${Number(displayTotal).toFixed(2)} USD
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center pb-[55px]">
          <div className="flex lg:items-center gap-2 lg:mb-0 mb-10">
            <Checkbox />
            <p className="text-[#818181] text-sm">
              Before completing this order, please confirm your device is eSIM
              compatible and network-unlocked.
            </p>
          </div>
          <Button
            type="button"
            disabled={cartItems.length === 0 || isCheckoutLoading}
            onClick={handleCompleteOrder}
            className="h-12 w-[344px] text-base text-[#F4F4F4] leading-6 disabled:opacity-50"
          >
            {isCheckoutLoading ? "Processing..." : "COMPLETE ORDER"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecureCheckout;
