"use client";

import ShortBanner from "@/components/shared/ShortBanner";
import Blog from "@/components/website/blogs/Blog";
import React, { Suspense } from "react";
import Ad from "@/components/website/home/Ad";
import { useGetBlogsQuery } from "@/helpers/blogsApi";
import { useRouter, useSearchParams } from "next/navigation";

const BlogsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  const { data, isLoading } = useGetBlogsQuery({
    page: currentPage,
    limit: 10,
  });

  const blogs = data?.data ?? [];
  const totalPages = data?.pagination?.totalPage ?? 1;

  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNumber));
    router.push(`/blogs?${params.toString()}`);
  };

  return (
    <div>
      <ShortBanner text="LinkFast Blogs" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-[60px]">
        {isLoading ? (
          <div className="col-span-full text-center py-10 text-sm text-[#5C5C5C]">
            Loading blogs...
          </div>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <Blog
              key={blog._id}
              id={blog._id}
              img={blog.thumbnail}
              text={blog.title}
              content={blog.content}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-sm text-[#5C5C5C]">
            No blogs found.
          </div>
        )}
      </div>
      {totalPages > 1 ? (
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 mb-[60px]">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 rounded border border-[#5555551F] disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isActive = currentPage === pageNumber;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded border ${
                    isActive
                      ? "bg-primary text-white border-primary"
                      : "border-[#5555551F]"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 rounded border border-[#5555551F] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
      <div className="pt-1 mb-10">
        <Ad />
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-sm text-[#5C5C5C]">
          Loading blogs...
        </div>
      }
    >
      <BlogsContent />
    </Suspense>
  );
};

export default page;
