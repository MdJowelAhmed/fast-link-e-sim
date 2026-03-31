"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import authImg from "@/assests/authImg.png";
import logo from "@/assests/logo.svg";
import toast from "react-hot-toast";
import { useForgetPasswordMutation } from "@/helpers/authApi";

const ForgotPassword = () => {
  const router = useRouter();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Sending code...", { id: "send-code" });
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    try {
      const res = await forgetPassword({ email }).unwrap();

      if (res?.success) {
        toast.success(res.message || "Code sent", { id: "send-code" });
        const params = new URLSearchParams({
          email,
          flow: "forgot",
        });
        router.push(`/verify-email?${params.toString()}`);
        return;
      }

      toast.error(res?.message || "Could not send code", { id: "send-code" });
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
        typeof message === "string" ? message : "Could not send code",
        { id: "send-code" }
      );
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   toast.loading("Logging in...", {
  //     id: "login",
  //   });
  //   const formData = new FormData(e.currentTarget);
  //   const payload = {
  //     email: formData.get("email"),
  //   };
  //   console.log(payload);

  //   try {
  //     //! perform your api call here..

  //     toast.success("Login successful", { id: "login" });
  //     router.push(redirect);
  //   } catch (error) {
  //     console.log("Error fetching data:", error);
  //   }
  // };

  return (
    <div className={cn("flex items-center justify-center overflow-hidden")}>
      <div className="hidden min-h-screen lg:block lg:w-1/2 lg:2xl:pl-28 relative overflow-hidden">
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
          <Card className="py-16 w-full bg-transparent xl:px-[100px] shadow-none border-none">
            <CardHeader className="text-center">
              <figure className="flex justify-center mb-7">
                <Image src={logo} alt="logo" height={85} />
              </figure>
              <CardTitle className="text-2xl whitespace-nowrap">Forgot password ?</CardTitle>
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

                    {/* submit button */}
                    <Button
                      type="submit"
                      className="w-full mt-5 h-10"
                      disabled={isLoading}
                    >
                      Send Code
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

export default ForgotPassword;
