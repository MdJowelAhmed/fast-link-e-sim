"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/assests/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import UserDropdown from "./UserDropdown";
import MarqueeSlider from "./MarqueeSlider";
import Sidebar from "./Sidebar";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { AUTH_CHANGE_EVENT } from "@/helpers/authEvents";
import { useGetCartQuery } from "@/helpers/cartApi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About Us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: cartData } = useGetCartQuery(undefined, { skip: !isLoggedIn });
  const cartCount = cartData?.data?.data?.length ?? 0;

  useEffect(() => {
    const sync = () => {
      if (typeof window === "undefined") return;
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    sync();
    window.addEventListener(AUTH_CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        {pathname === "/" && !open && <MarqueeSlider />}

        <div className="h-20 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-2.5">
          <div>
            <Image src={logo} alt="Logo" height={60} />
          </div>

          <ul className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    pathname === link.href ? "text-primary" : "text-[#5C5C5C]",
                    "hover:text-gray-700 transition-colors"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex justify-center items-center gap-5">
            {isLoggedIn && (
              <Link href="/secure-checkout" className="relative">
                <IoBagOutline className="text-2xl text-[#5C5C5C] hover:text-primary transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            )}
            {isLoggedIn ? (
              <UserDropdown />
            ) : (
              <div>
                <Link className="text-[#333333]" href="/login">
                  Log In/Sign Up
                </Link>
              </div>
            )}
            <div className="lg:hidden" onClick={() => setOpen((prev) => !prev)}>
              {!open && <IoIosMenu className="text-3xl cursor-pointer" />}
            </div>
          </div>
        </div>

        <aside
          className={`lg:hidden fixed top-0 bg-primary w-screen h-screen py-6 duration-500 ${
            open ? "left-0" : "-left-[1000px]"
          }`}
        >
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="flex justify-end mr-4"
          >
            <IoIosClose className="text-4xl cursor-pointer text-white" />
          </div>
          <div className="-mt-6">
            <Sidebar setOpen={setOpen} />
          </div>
        </aside>
      </nav>
    </>
  );
};

export default Navbar;
