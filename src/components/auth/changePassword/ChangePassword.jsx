"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import authImg from "@/assests/authImg.png";
import logo from "@/assests/logo.svg";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "@/helpers/authApi";

const ChangePassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resetToken =
      typeof window !== "undefined"
        ? localStorage.getItem("resetToken")
        : null;

    if (!resetToken) {
      toast.error(
        "Your reset session expired or is missing. Please use forgot password again.",
        { id: "reset-pw" }
      );
      return;
    }

    const formData = new FormData(e.currentTarget);
    const newPassword = String(formData.get("newPassword") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", { id: "reset-pw" });
      return;
    }

    toast.loading("Updating password...", { id: "reset-pw" });

    try {
      const res = await resetPassword({
        newPassword,
        confirmPassword,
      }).unwrap();

      if (res?.success) {
        localStorage.removeItem("resetToken");
        toast.success(res.message || "Password updated", { id: "reset-pw" });
        router.push(redirect || "/login");
        return;
      }

      toast.error(res?.message || "Could not reset password", {
        id: "reset-pw",
      });
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
        typeof message === "string" ? message : "Could not reset password",
        { id: "reset-pw" }
      );
    }
  };

  return (
    <div
      className={cn(
        " flex items-center justify-center overflow-hidden"
      )}
    >
      <div className="hidden lg:flex lg:w-1/2 h-screen 2xl:pl-28 relative overflow-hidden">
        <Image className="object-cover" src={authImg} alt="Background Image" />
        <div
          className="h-[860px] w-[860px] rounded-full absolute -bottom-[670px] left-1/2 -translate-x-1/2 bg-[#B0E0CA] opacity-35"
          style={{
            filter: "blur(104.75px)",
          }}
        />
      </div>

      <div className="lg:w-1/2  w-full p-6">
        <div
          className="bg-[#F7F7F7] h-full flex justify-center items-center rounded-xl"
          style={{
            boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.07)",
          }}
        >
          <Card className="py-16 w-full bg-transparent xl:px-[100px] shadow-none border-none">
            <CardHeader className="text-center">
              <figure className="flex justify-center mb-7">
                <Image src={logo} alt="logo" height={85} />
              </figure>
              <CardTitle className="text-2xl">Set a new password</CardTitle>
              <CardDescription className="py-4 text-[#5C5C5C]">
                Create a new password. Ensure it differs from <br /> previous
                ones for security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    {/* password */}
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type={`${isPasswordVisible ? "text" : "password"}`}
                          placeholder="Enter new password"
                          required
                          className="bg-white shadow-none h-10"
                        />
                        <span
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                          className="text-slate-400 absolute right-5 top-1.5 cursor-pointer"
                        >
                          {!isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                        </span>
                      </div>
                    </div>

                    {/* confirmPassword */}
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                      </div>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={`${
                            isConfirmPasswordVisible ? "text" : "password"
                          }`}
                          placeholder="Enter password"
                          required
                          className="bg-white shadow-none h-10"
                        />
                        <span
                          onClick={() =>
                            setIsConfirmPasswordVisible(
                              !isConfirmPasswordVisible
                            )
                          }
                          className="text-slate-400 absolute right-5 top-1.5 cursor-pointer"
                        >
                          {!isConfirmPasswordVisible ? (
                            <EyeOffIcon />
                          ) : (
                            <EyeIcon />
                          )}
                        </span>
                      </div>
                    </div>

                    {/* submit button */}
                    <Button
                      type="submit"
                      className="w-full mt-5 h-10"
                      disabled={isLoading}
                    >
                      Reset password
                    </Button>
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

export default ChangePassword;
