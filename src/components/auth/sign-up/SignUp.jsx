"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import authImg from "@/assests/authImg.png";
import logo from "@/assests/logo.svg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { useSignupMutation } from "@/helpers/authApi";

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const router = useRouter();
  const redirect = "/verify-email";
  const [signup, { isLoading }] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("userName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const contact = String(formData.get("contact") ?? "").trim();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { id: "signUp" });
      return;
    }

    toast.loading("Signing up...", { id: "signUp" });

    const payload = { name, email, password, contact };

    try {
      const res = await signup(payload).unwrap();

      if (res?.success) {
        toast.success(res.message || "Sign up successful", { id: "signUp" });
        const params = new URLSearchParams({
          email,
          flow: "signup",
        });
        router.push(`${redirect}?${params.toString()}`);
        return;
      }

      toast.error(res?.message || "Sign up failed", { id: "signUp" });
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
        typeof message === "string" ? message : "Sign up failed",
        { id: "signUp" }
      );
    }
  };

  return (
    <div className={cn(" flex items-center justify-center lg:overflow-hidden")}>
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
        <Card
          className="bg-[#F7F7F7] h-full py-10 xl:px-[100px] shadow-none border-none"
          style={{
            boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.07)",
          }}
        >
          <CardHeader className="text-center">
            <figure className="flex justify-center mb-7">
              <Image src={logo} alt="logo" height={85} />
            </figure>
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription className="py-4 text-[#5C5C5C]">
              Please fill-up your account information
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-6">
                  {/* userName */}
                  <div className="grid gap-2">
                    <Label htmlFor="userName">User Name</Label>
                    <Input
                      id="userName"
                      name="userName"
                      type="text"
                      placeholder="Md. Atik"
                      required
                      className="bg-white shadow-none h-10"
                    />
                  </div>

                  {/* email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="me@example.com"
                      required
                      className="bg-white shadow-none h-10"
                    />
                  </div>

                  {/* contact */}
                  <div className="grid gap-2">
                    <Label htmlFor="contact">Contact (phone)</Label>
                    <Input
                      id="contact"
                      name="contact"
                      type="tel"
                      placeholder="3472646135"
                      required
                      className="bg-white shadow-none h-10"
                    />
                  </div>

                  {/* password */}
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={`${isPasswordVisible ? "text" : "password"}`}
                        placeholder="Enter password"
                        required
                        className="bg-white shadow-none h-10"
                      />
                      <span
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="text-slate-400 absolute right-5 top-1.5 cursor-pointer"
                      >
                        {!isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                      </span>
                    </div>
                  </div>

                  {/* confirmPassword */}
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                    </div>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={`${isConfirmPasswordVisible ? "text" : "password"}`}
                        placeholder="Enter password"
                        required
                        className="bg-white shadow-none h-10"
                      />
                      <span
                        onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        className="text-slate-400 absolute right-5 top-1.5 cursor-pointer"
                      >
                        {!isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                      </span>
                    </div>
                  </div>

                  {/* remember checkbox */}
                  <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox required id="terms" className="size-5 border-primary" />
                      <label
                        htmlFor="terms"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree with terms of service and privacy policy
                      </label>
                    </div>
                  </div>

                  {/* submit button */}
                  <Button
                    type="submit"
                    className="w-full mt-4 h-10"
                    disabled={isLoading}
                  >
                    Sign Up
                  </Button>
                </div>

                {/* social button */}
                <div className="flex justify-center items-center gap-4">
                  <Button
                    className={`bg-transparent hover:bg-transparent h-10 px-5 shadow-none`}
                    style={{
                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                    }}
                  >
                    <FcGoogle />
                    <span className="text-[#606060]">Google</span>
                  </Button>
                  <Button
                    className={`bg-[#1E90FF] hover:bg-[#1E90FF] h-10 px-5 shadow-none`}
                    style={{
                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                    }}
                  >
                    <FaFacebookF />
                    <span className="text-[#F1F1F1]">Facebook</span>
                  </Button>
                </div>

                <div className="flex justify-center items-center gap-3">
                  <Separator className={`!w-[145px]`} />
                  <p>OR</p>
                  <Separator className={`!w-[145px]`} />
                </div>

                {/* link to sign up */}
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary hover:underline underline-offset-4"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
