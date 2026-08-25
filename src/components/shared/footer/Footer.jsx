"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assests/footerLogo.svg";
import playStore from "@/assests/playStore.svg";
import appStore from "@/assests/appStore.svg";
import Link from "next/link";
import facebook from "@/assests/facebook.svg";
import instagram from "@/assests/insta.svg";
import linkedin from "@/assests/in.svg";
import tiktok from "@/assests/tiktok.png";
import X from "@/assests/X.svg";
import toast from "react-hot-toast";
import { useCreateNewsletterMutation } from "@/helpers/newsletterApi";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [createNewsletter, { isLoading }] = useCreateNewsletterMutation();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error("Please enter your email", { id: "newsletter" });
      return;
    }

    try {
      toast.loading("Subscribing...", { id: "newsletter" });
      const res = await createNewsletter({ email: trimmedEmail }).unwrap();

      if (res?.success) {
        toast.success(
          typeof res?.message === "string"
            ? res.message
            : "Subscribed successfully",
          { id: "newsletter" }
        );
        setEmail("");
        return;
      }

      toast.error(res?.message || "Something went wrong", {
        id: "newsletter",
      });
    } catch (err) {
      const message =
        err?.data?.message ??
        err?.data?.error ??
        err?.error ??
        "Something went wrong. Please try again.";

      toast.error(
        typeof message === "string" ? message : "Something went wrong",
        { id: "newsletter" }
      );
    }
  };

  return (
    <footer className="bg-[#151515]">
      <div className="flex flex-col md:flex-row justify-between xl:gap-[30px] flex-wrap w-full max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div>
          <Image src={logo} alt="logo" />

          <p className="max-w-[300px] text-[#EBEBEB] mt-4 text-sm">
            Stay connected wherever you travel with fast, reliable eSIM data. Easy to activate, flexible to use, and no physical SIM required.
          </p>

          <div className="flex items-center gap-6 mt-8">
            <button className="cursor-pointer">
              <Image src={playStore} alt="Play Store" height={40} />
            </button>
            <button className="cursor-pointer">
              <Image src={appStore} alt="App Store" height={40} />
            </button>
          </div>
        </div>

        <div className="flex justify-between gap-8">
          <div className="text-[#EEEEEE] flex flex-col pt-16 gap-8 text-sm">
            <Link href="/shop">Shop</Link>
            <Link href="/about">About Us</Link>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="text-[#EEEEEE] flex flex-col pt-16 gap-8 text-sm">
            <Link href="/terms-and-condition">Terms and Conditions</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-4 text-sm text-[#BBBBBB]">
            Subscribe To Our Email Alerts
          </h3>
          <form onSubmit={handleSubscribe} className="flex items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[250px] h-10 bg-white px-6 py-3 rounded-lg placeholder:text-[#BBBBBB] placeholder:text-sm"
              placeholder="Enter your email"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#009A54] text-[#F4F4F4] px-6 py-3 rounded-lg cursor-pointer text-sm font-medium w-full sm:w-auto disabled:opacity-70"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <p className="text-sm text-[#A1A1A1] pt-9 pb-4">Follow us</p>
          <div className="flex items-center gap-8">
            <Link href="https://www.facebook.com/profile.php?id=61576894494119" target="_blank">
              <Image src={facebook} alt="Facebook" width={32} />
            </Link>

            <Link href="https://www.instagram.com/linkfastesims?utm_source=qr" target="_blank">
              <Image src={instagram} alt="Instagram" width={32} />
            </Link>

            <Link href="https://www.tiktok.com/@linkfast.esim" target="_blank">
              <Image src={tiktok} alt="Tiktok" width={40} className="rounded-full" />
            </Link>
            {/* <Link href="#">
              <Image src={linkedin} alt="LinkedIn" width={32} />
            </Link>

            <Link href="#">
              <Image src={X} alt="X" width={32} />
            </Link> */}
          </div>
        </div>
      </div>

      <div className="border-t border-[#767676] py-4 text-center">
        <p className="text-[#EEEEEE] text-sm">
          © Copyright  {new Date().getFullYear()} LinkFast
        </p>
      </div>
    </footer>
  );
};

export default Footer;
