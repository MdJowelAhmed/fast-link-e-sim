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
import { EyeIcon, EyeOffIcon, X, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useMemo, useEffect } from "react";
import authImg from "@/assests/authImg.png";
import logo from "@/assests/logo.svg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { useSignupMutation, useGoogleLoginMutation } from "@/helpers/authApi";
import { useGetDisclaimerQuery } from "@/helpers/disclaimer";
import { config } from "@/config/env-config";
import PhoneInput, { getCountries, getCountryCallingCode } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";
import "react-phone-number-input/style.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CustomCountrySelect = ({ value, onChange, options, iconComponent: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const countryList = useMemo(() => {
    const rawOptions = options || getCountries();
    return rawOptions
      .map((opt) => {
        const code = typeof opt === "string" ? opt : opt?.value;
        const label = typeof opt === "string" ? en[opt] || opt : opt?.label;
        const callingCode = code ? `+${getCountryCallingCode(code)}` : "";
        return { value: code, label, callingCode };
      })
      .filter((c) => c.value);
  }, [options]);

  const filtered = useMemo(() => {
    if (!search.trim()) return countryList;
    const q = search.toLowerCase();
    return countryList.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.callingCode.includes(q) ||
        c.value.toLowerCase().includes(q)
    );
  }, [countryList, search]);

  const selected = countryList.find((c) => c.value === value) || countryList[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0 flex items-center" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-transparent py-1 text-xs md:text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
      >
        {Icon && <Icon country={selected?.value} label={selected?.label} />}
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-xl z-[9999] py-1 scrollbar-hide">
          <div className="p-2 sticky top-0 bg-white border-b border-gray-100 flex items-center gap-1.5 z-10">
            <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs px-2 py-1 border border-gray-200 rounded focus:outline-none focus:border-[#009a54]"
              autoFocus
            />
          </div>
          <div>
            {filtered.map((c) => {
              const isSelected = c.value === value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => {
                    onChange(c.value);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#009a54] text-white font-medium"
                      : "text-gray-700 hover:bg-[#009a54] hover:text-white"
                  }`}
                >
                  <span className="truncate mr-2">{c.label}</span>
                  <span className={`shrink-0 ${isSelected ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                    {c.callingCode}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [contact, setContact] = useState("");
  const [modalType, setModalType] = useState(null); // 'terms' | 'privacy' | null
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = "/verify-email";
  const [signup, { isLoading }] = useSignupMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const { data: disclaimerData, isLoading: isDisclaimerLoading } = useGetDisclaimerQuery(
    modalType || "terms",
    { skip: !modalType }
  );
  const modalContent = disclaimerData?.data ?? "";

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
        toast.success(res.message || "Google login successful", { id: "google-login" });
        router.push("/");
        return;
      }

      const baseUrl = config.API_V1_BASE || `${process.env.NEXT_PUBLIC_API_URL || ""}/api/v1`;
      window.location.href = `${baseUrl}/auth/google-sign-in`;
    } catch (err) {
      const baseUrl = config.API_V1_BASE || `${process.env.NEXT_PUBLIC_API_URL || ""}/api/v1`;
      window.location.href = `${baseUrl}/auth/google-sign-in`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("userName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const contactValue = contact || String(formData.get("contact") ?? "").trim();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { id: "signUp" });
      return;
    }

    toast.loading("Signing up...", { id: "signUp" });

    const refferalFromQuery =
      searchParams.get("refferal_code")?.trim() ||
      searchParams.get("referral_code")?.trim() ||
      "";

    const payload = { name, email, password, contact: contactValue };
    if (refferalFromQuery) {
      payload.refferal_code = refferalFromQuery;
    }

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
          className="bg-[#F7F7F7] h-full py-10 xl:px-[100px] shadow-none border-none relative"
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
                      placeholder="Enter Your Name"
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
                      placeholder="Enter Your Email"
                      required
                      className="bg-white shadow-none h-10"
                    />
                  </div>

                  {/* contact */}
                  <div className="grid gap-2">
                    <Label htmlFor="contact">Contact (phone)</Label>
                    <PhoneInput
                      international
                      defaultCountry="AU"
                      value={contact}
                      onChange={setContact}
                      countrySelectComponent={CustomCountrySelect}
                      placeholder="Enter Your Contact"
                      className="bg-white rounded-md border border-input px-3 h-10 flex items-center shadow-none text-sm focus-within:ring-1 focus-within:ring-[#009a54] [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:w-full [&_.PhoneInputInput]:h-full [&_.PhoneInputCountry]:mr-2"
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
                      <Checkbox required id="terms" className="size-5 border-primary shrink-0" />
                      <label
                        htmlFor="terms"
                        className="text-xs md:text-sm leading-snug peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree with{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setModalType("terms");
                          }}
                          className="font-medium text-primary underline underline-offset-2 hover:underline cursor-pointer"
                        >
                          terms of service
                        </button>{" "}
                        and{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setModalType("privacy");
                          }}
                          className="font-medium text-primary underline underline-offset-2 hover:underline cursor-pointer"
                        >
                          privacy policy
                        </button>
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
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading || isLoading}
                    className={`bg-transparent hover:bg-transparent h-10 px-10 shadow-none`}
                    style={{
                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                    }}
                  >
                    <FcGoogle />
                    <span className="text-[#606060]">Google</span>
                  </Button>
                  {/* <Button
                    type="button"
                    onClick={() => toast.error("Facebook login is coming soon.", { id: "fb-login" })}
                    className={`bg-[#1E90FF] hover:bg-[#1E90FF] h-10 px-5 shadow-none`}
                    style={{
                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                    }}
                  >
                    <FaFacebookF />
                    <span className="text-[#F1F1F1]">Facebook</span>
                  </Button> */}
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

      {/* Terms & Privacy Disclaimer Modal */}
      <Dialog open={Boolean(modalType)} onOpenChange={(open) => !open && setModalType(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 border-b pb-3">
              {modalType === "privacy" ? "Privacy Policy" : "Terms of Service"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-2">
            {isDisclaimerLoading ? (
              <div className="py-12 text-center text-gray-500 text-sm">
                Loading {modalType === "privacy" ? "privacy policy" : "terms"}...
              </div>
            ) : modalContent ? (
              <div
                className="text-[#575757] text-sm leading-relaxed [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:mb-3 [&_h1]:text-gray-900 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-gray-900 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-2 [&_p]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:mb-1 [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: modalContent }}
              />
            ) : (
              <div className="py-8 text-center text-gray-500 text-sm">
                No content available.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUp;
