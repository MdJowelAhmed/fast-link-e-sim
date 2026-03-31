"use client";

import GoBackButton from "@/components/shared/GoBackButton";
import { config } from "@/config/env-config";
import { useGetBlogByIdQuery } from "@/helpers/blogsApi";
import React from "react";

const getImageUrl = (path) => {
  if (!path) return "/blogImg.png";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!config.BASE_URL) return path;
  return `${config.BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

const page = ({ params }) => {
  const { data, isLoading } = useGetBlogByIdQuery(params?.id);
  const blog = data?.data;

  return (
    <div className="mt-20 pt-6 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative mb-[110px]">
      {isLoading ? (
        <div className="text-center py-20 text-sm text-[#5C5C5C]">
          Loading blog...
        </div>
      ) : blog ? (
        <>
          <img
            src={getImageUrl(blog.thumbnail)}
            alt={blog.title || "Blog Image"}
            className="w-full h-[456px] object-cover rounded-[10px]"
          />
          <h2 className="my-6 text-[#222222] text-3xl xl:leading-[62px] tracking-[1.08px]">
            {blog.title}
          </h2>
          <p className="text-[#6B6B6B] leading-6 tracking-[0.48px] whitespace-pre-line">
            {blog.content}
          </p>
        </>
      ) : (
        <div className="text-center py-20 text-sm text-[#5C5C5C]">
          Blog not found.
        </div>
      )}
      <div className="absolute top-6 -left-16">
        <GoBackButton />
      </div>
    </div>
  );
};

export default page;
