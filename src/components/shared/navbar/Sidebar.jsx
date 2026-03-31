import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assests/logo_black.svg";

function Sidebar({ setOpen }) {
  // const navLinks = [
  //   { href: "/", label: "Home" },
  //   { href: "/shop", label: "Shop" },
  //   { href: "/about", label: "About Us" },
  //   { href: "/blogs", label: "Blogs" },
  //   { href: "/contact", label: "Contact" },
  // ];

  const navLinks = (
    <>
      <li
        onClick={() => setOpen(false)}
        className="text-[#fff] text-lg mt-10 font-medium leading-[150%]"
      >
        <Link href="/">Home</Link>
      </li>
      <li
        onClick={() => setOpen(false)}
        className="text-[#fff] text-lg mt-10 font-medium leading-[150%]"
      >
        <Link href="/shop">Shop</Link>
      </li>
      <li
        onClick={() => setOpen(false)}
        className="text-[#fff] text-lg mt-10 font-medium leading-[150%]"
      >
        <Link href="/about">About Us</Link>
      </li>
      <li
        onClick={() => setOpen(false)}
        className="text-[#fff] text-lg mt-10 font-medium leading-[150%]"
      >
        <Link href="/blogs">Blogs</Link>
      </li>
      <li
        onClick={() => setOpen(false)}
        className="text-[#fff] text-lg mt-10 font-medium leading-[150%]"
      >
        <Link href="/contact">Contact</Link>
      </li>
    </>
  );

  return (
    <div className="px-10 min-h-screen">
      <div className="mb-10">
        <Image className="w-28" src={logo} alt="Logo" />
      </div>
      <hr />
      <ul className="flex-col justify-center items-center space-y-2">
        {navLinks}
      </ul>
    </div>
  );
}

export default Sidebar;
