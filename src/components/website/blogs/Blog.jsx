import Image from "next/image";
import Link from "next/link";
import React from "react";

const Blog = ({ img, text, id }) => {
  return (
    <Link href={`/blogs/${id}`} className="relative w-full">
      <Image src={img} alt="Blog Image" className="brightness-[60%] w-full" />
      <p className="absolute bottom-9 left-4 text-[#FAFAFA] text-2xl font-semibold leading-[32px] max-w-[350px]">
        {text}
      </p>
    </Link>
  );
};

export default Blog;
