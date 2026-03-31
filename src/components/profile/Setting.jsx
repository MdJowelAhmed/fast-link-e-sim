"use client";

import React, { useState } from "react";
import ShortBanner from "../shared/ShortBanner";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Setting = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleSubmit = () => {};

  return (
    <div className="bg-[#F7F7F7] min-h-[90vh] pb-16">
      <ShortBanner text="Account Setting" />
      <div
        className="max-w-[1220px] mx-4 xl:mx-auto px-4 sm:px-6 lg:px-16 py-16 bg-[#FDFDFD] rounded-b-3xl rounded-tl-3xl mt-28 flex flex-col gap-7 relative"
        style={{
          boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.07)",
        }}
      >
        <div className="max-w-[508px] mx-auto">
          <p className="text-[#5C5C5C] mb-6">
            Your new password must be different from previous passwords.
          </p>
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
                      id="password"
                      name="password"
                      type={`${isPasswordVisible ? "text" : "password"}`}
                      placeholder="Enter password"
                      required
                      className="bg-white shadow-none h-12"
                    />
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="text-slate-400 absolute right-5 top-1.5 cursor-pointer"
                    >
                      {!isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </span>
                  </div>
                </div>

                {/* new password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="newPassword">New Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={`${isNewPasswordVisible ? "text" : "password"}`}
                      placeholder="Enter new password"
                      required
                      className="bg-white shadow-none h-12"
                    />
                    <span
                      onClick={() =>
                        setIsNewPasswordVisible(!isNewPasswordVisible)
                      }
                      className="text-slate-400 absolute right-5 top-1.5 cursor-pointer"
                    >
                      {!isNewPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </span>
                  </div>
                </div>

                {/* confirm password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={`${isConfirmPasswordVisible ? "text" : "password"}`}
                      placeholder="Enter confirm password"
                      required
                      className="bg-white shadow-none h-12"
                    />
                    <span
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                      className="text-slate-400 absolute right-5 top-1.5 cursor-pointer"
                    >
                      {!isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </span>
                  </div>
                </div>

                {/* submit button */}
                <Button
                  type="submit"
                  className="w-full mt-5 h-12 text-[#F6F6F6]"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </form>
        </div>
        <Link
          href={"#"}
          className="absolute -top-12 right-0 text-[#222222] font-medium px-6 py-3 bg-[#B0E0CA] rounded-t-lg"
        >
          Change Password
        </Link>
      </div>
    </div>
  );
};

export default Setting;
