"use client";

import ShortBanner from "@/components/shared/ShortBanner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { useGetFaqsQuery } from "@/helpers/faqApi";

const page = () => {
  const { data, isLoading } = useGetFaqsQuery();
  const faqs = data?.data ?? [];

  return (
    <section>
      <ShortBanner text="FAQ" />
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-[60px] mt-20">
        <div className="text-center">
          <h2 className="text-4xl font-medium leading-[40px]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#5C5C5C] leading-[150%] max-w-[820px] mx-auto mt-6">
            Lorem ipsum dolor sit amet consectetur. Amet morbi sit suspendisse
            dui ut donec vel id. Viverra urna cras nulla elementum. Risus orci
            dolor euismod in fringilla adipiscing eu condimentum.
          </p>
        </div>
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full pt-10 space-y-2"
          >
            {isLoading ? (
              <div className="text-center py-10 text-sm text-[#5C5C5C]">
                Loading FAQs...
              </div>
            ) : faqs.length > 0 ? (
              faqs.map((faq, idx) => (
                <AccordionItem
                  value={`item-${faq._id ?? idx}`}
                  key={faq._id ?? idx}
                >
                  <AccordionTrigger className="leading-[104.4%] hover:no-underline bg-[#E6F5EE] text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="border border-[#5555551F]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="text-center py-10 text-sm text-[#5C5C5C]">
                No FAQs found.
              </div>
            )}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default page;
