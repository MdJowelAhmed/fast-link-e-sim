"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import authImg from "@/assests/authImg.png";
import logo from "@/assests/logo.svg";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useResendVerificationEmailMutation,
  useVerifyEmailMutation,
} from "@/helpers/authApi";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const flow = searchParams.get("flow") ?? "signup";

  const [otp, setOtp] = useState("");
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendOtp, { isLoading: isResending }] =
    useResendVerificationEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email?.trim()) {
      toast.error("Email is missing. Please start again.");
      return;
    }

    if (otp.length < 4) {
      toast.error("Please enter the verification code", { id: "verify" });
      return;
    }

    const oneTimeCode = parseInt(otp, 10);
    if (Number.isNaN(oneTimeCode)) {
      toast.error("Invalid code", { id: "verify" });
      return;
    }

    toast.loading("Verifying...", { id: "verify" });

    const payload = {
      email: email.trim(),
      oneTimeCode,
    };

    try {
      const res = await verifyEmail(payload).unwrap();

      if (!res?.success) {
        toast.error(res?.message || "Verification failed", { id: "verify" });
        return;
      }

      toast.success(res.message || "Verification successful", { id: "verify" });

      if (flow === "forgot") {
        const token =
          typeof res?.data === "string" ? res.data : res?.data?.resetToken;
        if (token) {
          localStorage.setItem("resetToken", token);
        } else {
          toast.error("Reset token not received. Please try again.");
          return;
        }
        router.push("/change-password");
        return;
      }

      router.push("/login");
    } catch (err) {
      const errors = err?.data?.errorMessages ?? err?.data?.errors;
      const firstValidation =
        Array.isArray(errors) && errors[0]?.message
          ? errors[0].message
          : null;
      const message =
        firstValidation ??
        err?.data?.message ??
        err?.data?.error ??
        err?.error ??
        "Something went wrong. Please try again.";
      toast.error(
        typeof message === "string" ? message : "Verification failed",
        { id: "verify" }
      );
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    if (!email?.trim()) {
      toast.error("Email is missing.");
      return;
    }
    toast.loading("Sending...", { id: "resend" });
    try {
      const res = await resendOtp({ email: email.trim() }).unwrap();
      if (res?.success) {
        toast.success(res.message || "Code sent", { id: "resend" });
        return;
      }
      toast.error(res?.message || "Could not resend", { id: "resend" });
    } catch (err) {
      const message =
        err?.data?.message ??
        err?.data?.error ??
        err?.error ??
        "Could not resend code";
      toast.error(
        typeof message === "string" ? message : "Could not resend",
        { id: "resend" }
      );
    }
  };

  return (
    <div
      className={cn(
        " flex items-center justify-center overflow-hidden"
      )}
    >
      <div className="hidden min-h-screen lg:block w-1/2 2xl:pl-28 relative overflow-hidden">
        <Image src={authImg} alt="Background Image" />
        <div
          className="h-[860px] w-[860px] rounded-full absolute -bottom-[670px] left-1/2 -translate-x-1/2 bg-[#B0E0CA] opacity-35"
          style={{
            filter: "blur(104.75px)",
          }}
        />
      </div>
      <div className="w-full lg:w-1/2  p-6">
        <div
          className="bg-[#F7F7F7] h-full flex justify-center items-center rounded-xl"
          style={{
            boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.07)",
          }}
        >
          <Card className="py-16 bg-transparent xl:px-[100px] shadow-none border-none">
            <CardHeader className="text-center mb-10">
              <figure className="flex justify-center mb-7">
                <Image src={logo} alt="logo" height={85} />
              </figure>
              <CardTitle className="text-2xl">Verification code</CardTitle>
              <CardDescription className="pt-4 text-[#5C5C5C]">
                {flow === "forgot"
                  ? `We sent a code to ${email}. Enter the digits from your email.`
                  : `We sent a verification email to ${email}. Enter the code from your email.`}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-6">
                    <div className="flex flex-col items-center justify-center gap-1 mb-10">
                      <InputOTP
                        maxLength={4}
                        pattern={REGEXP_ONLY_DIGITS}
                        value={otp}
                        onChange={setOtp}
                      >
                        <InputOTPGroup className="w-full justify-center gap-2 md:gap-6">
                          <InputOTPSlot
                            className={`shadow-none border-none w-[55px] h-[50px] rounded-md`}
                            style={{
                              boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                            }}
                            index={0}
                          />
                          <InputOTPSlot
                            className={`shadow-none border-none w-[55px] h-[50px] rounded-md`}
                            style={{
                              boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                            }}
                            index={1}
                          />
                          <InputOTPSlot
                            className={`shadow-none border-none w-[55px] h-[50px] rounded-md`}
                            style={{
                              boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                            }}
                            index={2}
                          />
                          <InputOTPSlot
                            className={`shadow-none border-none w-[55px] h-[50px] rounded-md`}
                            style={{
                              boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                            }}
                            index={3}
                          />
                          {/* <InputOTPSlot
                            className={`shadow-none border-none w-[55px] h-[50px] rounded-md`}
                            style={{
                              boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.12)",
                            }}
                            index={4}
                          /> */}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-10"
                      disabled={isLoading}
                    >
                      Verify Code
                    </Button>
                  </div>

                  <div className="text-center text-sm mt-10">
                    You have not received the email?{" "}
                    <Link
                      href="#"
                      onClick={handleResend}
                      className="font-medium text-primary hover:underline underline-offset-4"
                      aria-disabled={isResending}
                    >
                      Resend
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
