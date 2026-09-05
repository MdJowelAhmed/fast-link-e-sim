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
import { EyeIcon, EyeOffIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useGuestLoginMutation, useLoginMutation, useGoogleLoginMutation } from "@/helpers/authApi";
import { notifyAuthChange } from "@/helpers/authEvents";
import { config } from "@/config/env-config";
import authImg from "@/assests/authImg.png";
import logo from "@/assests/logo.svg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, { isLoading }] = useLoginMutation();
  const [guestLogin, { isLoading: isGuestLoading }] = useGuestLoginMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();

  const getRedirectPath = () => {
    const redirect = searchParams.get("redirect");
    if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
      return redirect;
    }
    return "/";
  };

  useEffect(() => {
    const token = searchParams.get("token") || searchParams.get("accessToken");
    if (token) {
      localStorage.setItem("token", token);
      notifyAuthChange();
      toast.success("Google login successful", { id: "google-login" });
      router.push(getRedirectPath());
    }
  }, [searchParams]);

  const handleGoogleLogin = async () => {
    toast.loading("Connecting to Google...", { id: "google-login" });
    try {
      const res = await googleLogin({}).unwrap();

      const redirectUrl =
        (typeof res === "string" && res) ||
        (typeof res?.data === "string" && res.data) ||
        res?.url ||
        res?.data?.url ||
        res?.redirectUrl ||
        res?.data?.redirectUrl;

      if (redirectUrl && typeof redirectUrl === "string" && (redirectUrl.startsWith("http://") || redirectUrl.startsWith("https://"))) {
        window.location.href = redirectUrl;
        return;
      }

      if (res?.success && res?.data?.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        notifyAuthChange();
        toast.success(res.message || "Google login successful", { id: "google-login" });
        router.push(getRedirectPath());
        return;
      }

      // Direct window redirect if endpoint performs standard OAuth redirect
      const baseUrl = config.API_V1_BASE || `${process.env.NEXT_PUBLIC_API_URL || ""}/api/v1`;
      window.location.href = `${baseUrl}/auth/google-sign-in`;
    } catch (err) {
      const baseUrl = config.API_V1_BASE || `${process.env.NEXT_PUBLIC_API_URL || ""}/api/v1`;
      window.location.href = `${baseUrl}/auth/google-sign-in`;
    }
  };

  const handleGuestLogin = async () => {
    toast.loading("Logging in as guest...", { id: "guest-login" });

    try {
      const res = await guestLogin({}).unwrap();

      if (res?.success && res?.data?.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        notifyAuthChange();
        toast.success(res.message || "Guest login successful", { id: "guest-login" });
        router.push(getRedirectPath());
        return;
      }

      toast.error(res?.message || "Guest login failed", { id: "guest-login" });
    } catch (err) {
      const data = err?.data;
      const message =
        (typeof data === "string" && data) ||
        (typeof data?.message === "string" && data.message) ||
        (typeof data?.error === "string" && data.error) ||
        (Array.isArray(data?.errors) && String(data.errors[0])) ||
        (typeof err?.error === "string" && err.error) ||
        "Guest login failed. Please try again.";
      toast.error(String(message), { id: "guest-login" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Logging in...", { id: "login" });
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const res = await login({
        email: email.trim(),
        password,
      }).unwrap();

      if (res?.success && res?.data?.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        notifyAuthChange();
        toast.success(res.message || "Login successful", { id: "login" });
        router.push(getRedirectPath());
        return;
      }

      toast.error(res?.message || "Login failed", { id: "login" });
    } catch (err) {
      const data = err?.data;
      let message =
        (typeof data === "string" && data) ||
        (typeof data?.message === "string" && data.message) ||
        (typeof data?.error === "string" && data.error) ||
        (Array.isArray(data?.errors) && String(data.errors[0])) ||
        (typeof err?.error === "string" && err.error) ||
        "Login failed. Check your email and password.";
      toast.error(String(message), { id: "login" });
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
        <Card
          className="bg-[#F7F7F7]  h-full xl:py-16 xl:px-[100px] shadow-none border-none relative"
          style={{
            boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.07)",
          }}
        >
          {/* Close button */}
          <Link
            href="/"
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-200/70"
            title="Close"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </Link>
          <CardHeader className="text-center">
            <figure className="flex justify-center mb-7">
              <Image src={logo} alt="logo" height={85} />
            </figure>
            <CardTitle className="text-2xl">Log in to your account</CardTitle>
            <CardDescription className="py-6 text-[#5C5C5C]">
              Please enter your email and password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-6">
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

                  {/* remember checkbox */}
                  <div className="flex justify-between gap-2 items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" className="size-5 border-primary" />
                      <label
                        htmlFor="terms"
                        className="text-xs md:text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember Password
                      </label>
                    </div>
                    <Link
                      href="forgot-password"
                      className="text-xs md:text-sm text-[#FF4040] font-medium underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  {/* submit button */}
                  <Button
                    type="submit"
                    className="w-full mt-5 h-10"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Log In"}
                  </Button>
                </div>

                {/* social button */}
                <div className="flex justify-center items-center gap-4 md:mt-10">
                  <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading || isLoading || isGuestLoading}
                    className={`bg-transparent hover:bg-transparent h-10 px-5 shadow-none`}
                    style={{
                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                    }}
                  >
                    <FcGoogle />
                    <span className="text-[#606060]">Google</span>
                  </Button>
                  <Button
                    type="button"
                    onClick={() => toast.error("Facebook login is coming soon.", { id: "fb-login" })}
                    className={`bg-[#1E90FF] hover:bg-[#1E90FF] h-10 px-5 shadow-none`}
                    style={{
                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                    }}
                  >
                    <FaFacebookF />
                    <span className="text-[#F1F1F1]">Facebook</span>
                  </Button>
                </div>

                {/* guest login button */}
                <div className="flex justify-center">
                  <Button
                    type="button"
                    className="w-1/2 h-10"
                    onClick={handleGuestLogin}
                    disabled={isGuestLoading || isLoading}
                  >
                    {isGuestLoading ? "Signing in..." : "Guest Login"}
                  </Button>
                </div>

                {/* separator */}
                <div className="flex justify-center items-center gap-3 md:mt-10">
                  <Separator className={`!w-[145px]`} />
                  <p>OR</p>
                  <Separator className={`!w-[145px]`} />
                </div>

                {/* link to sign up */}
                <div className="text-center text-sm">
                  Don&apos;t have any account?{" "}
                  <Link
                    href="/sign-up"
                    className="font-medium text-primary hover:underline underline-offset-4"
                  >
                    Sign Up
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

export default Login;
