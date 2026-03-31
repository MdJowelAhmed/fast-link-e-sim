import Blog from "@/components/website/blogs/Blog";
import ShortBanner from "@/components/shared/ShortBanner";
import React from "react";
import blog1 from "@/assests/blogImg.png";
import Ad from "@/components/website/home/Ad";

const page = () => {
  return (
    <div>
      <ShortBanner text="LinkFast Blogs" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-[60px]">
        <Blog
          id="1"
          img={blog1}
          text="eSIM Adoption Soars: 20 Million Airalo Users Help"
        />
        <Blog
          id="2"
          img={blog1}
          text="eSIM Adoption Soars: 20 Million Airalo Users Help"
        />
        <Blog
          id="3"
          img={blog1}
          text="eSIM Adoption Soars: 20 Million Airalo Users Help"
        />
        <Blog
          id="4"
          img={blog1}
          text="eSIM Adoption Soars: 20 Million Airalo Users Help"
        />
        <Blog
          id="5"
          img={blog1}
          text="eSIM Adoption Soars: 20 Million Airalo Users Help"
        />
        <Blog
          id="6"
          img={blog1}
          text="eSIM Adoption Soars: 20 Million Airalo Users Help"
        />
      </div>
      <div className="pt-1 mb-10">
        <Ad />
      </div>
    </div>
  );
};

export default page;
