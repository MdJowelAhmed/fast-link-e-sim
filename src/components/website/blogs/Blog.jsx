import Link from "next/link";
import React from "react";
import { config } from "@/config/env-config";
import { imageUrl } from "@/components/shared/getImageUrl";



const Blog = ({ img, text, id, content }) => {
  return (
    <Link
      href={`/blogs/${id}`}
      className="relative w-full overflow-hidden rounded-[10px] block"
    >
      <img
        src={imageUrl(img)}
        alt={text || "Blog Image"}
        className="brightness-[60%] w-full h-[320px] object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <p className="text-[#FAFAFA] text-2xl font-semibold leading-[32px] max-w-[350px]">
          {text}
        </p>
        {content ? (
          <p className="text-[#FAFAFA]/90 mt-2 line-clamp-2 max-w-[500px]">
            {content}
          </p>
        ) : null}
      </div>
    </Link>
  );
};

export default Blog;
