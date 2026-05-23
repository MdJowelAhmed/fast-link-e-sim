"use client";

import Loading from "@/app/loading";
import { imageUrl } from "@/components/shared/getImageUrl";
import GoBackButton from "@/components/shared/GoBackButton";
import RichHtmlContent from "@/components/shared/RichHtmlContent";
import { useGetBlogByIdQuery } from "@/helpers/blogsApi";
import React from "react";

const page = ({ params }) => {
  const { data, isLoading } = useGetBlogByIdQuery(params?.id);
  const blog = data?.data;

  return (
    <div className="mt-20 pt-6 max-w-[1222px] mx-auto px-4 sm:px-6 lg:px-8 relative mb-[110px]">
      {isLoading ? (
        <div className="col-span-full flex justify-center items-center w-full">
          <Loading />
        </div>
      ) : blog ? (
        <>
          <img
            src={imageUrl(blog.thumbnail)}
            alt={blog.title || "Blog Image"}
            className="w-full h-[456px] object-cover rounded-[10px]"
          />
          <h2 className="my-6 text-[#222222] text-3xl xl:leading-[62px] tracking-[1.08px]">
            {blog.title}
          </h2>
          <RichHtmlContent
            html={blog.content}
            className="text-[#6B6B6B] text-base leading-7 tracking-[0.48px] [&_a]:text-primary"
          />
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
