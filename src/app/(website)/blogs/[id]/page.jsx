import React from "react";
import blogImg from "@/assests/blogImg.png";
import Image from "next/image";
import GoBackButton from "@/components/shared/GoBackButton";

const page = () => {
  return (
    <div className="mt-20 pt-6 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative mb-[110px]">
      <Image
        src={blogImg}
        alt="Blog Image"
        className="w-full h-[456px] object-cover"
      />
      <h2 className="my-6 text-[#222222] text-3xl xl:leading-[62px] tracking-[1.08px]">
        eSIM Adoption Soars: 20 Million Airalo Users Help
      </h2>
      <p className="text-[#6B6B6B] leading-6 tracking-[0.48px]">
        Marriage is an eternal concept. It is meant to be a loving, intimate,
        selfless relationship between a man and a woman that lasts through
        eternity.
        <br />
        <br />
        A relationship of love The Bible teaches, “Husbands, love your wives”
        (Ephesians 5:25) and “teach the young women … to love their husbands”
        (Titus 2:4). Love in marriage can be deeper and more selfless than in
        any other relationship. It is this type of love that Jesus expects of
        His followers, and it is the virtue that couples need the most.
        <br />
        <br />
        A relationship of intimacy Marriage involves spiritual, emotional, and
        physical closeness. In the Old Testament, we are taught, “Therefore
        shall a man leave his father and his mother, and shall cleave unto his
        wife: and they shall be one flesh” (Genesis 2:24). Married couples are
        meant to be unified in every possible way.
        <br />
        <br />
        A relationship of selflessness The Savior taught, “Greater love hath no
        man than this, that a man lay down his life for his friends” (John
        15:13). Couples can learn a powerful lesson from this teaching. As a
        spouse, you are expected to essentially lay down your old life and to
        sacrifice many of your personal desires for your closest friend—your
        husband or wife. The more you are able to put your spouse first and keep
        your focus on the success of your partnership, the stronger your
        marriage will be.
        <br />
        <br />
        Marriage can last forever Your life on earth is not the beginning nor
        the end of your existence. After you die, your spirit will continue to
        live in the world of spirits and await the day when your spirit and
        physical body will be joined together eternally in the resurrection. God
        wants our treasured, loving relationships to also continue for eternity.
        This eternal union is possible when a man and a woman and families are
        sealed in holy temples, where those with proper authority from God
        fulfill Jesus’ promise that “whatsoever thou shalt bind on earth shall
        be bound in heaven” (Matthew 16:19).
      </p>
      <div className="absolute top-6 -left-16">
        <GoBackButton />
      </div>
    </div>
  );
};

export default page;
