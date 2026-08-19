"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";
import { useGetFaqsQuery } from "@/helpers/faqApi";
import Loading from "@/app/loading";

const FAQ = () => {
  const { data, isLoading } = useGetFaqsQuery();
  console.log(data);
  const faqs = data?.data ?? [];

  return (
    <section className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-10 xl:py-[100px]">
      <div className="text-center">
        <h2 className="text-3xl font-medium leading-[40px]">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-[#5C5C5C] leading-[150%] max-w-[820px] mx-auto mt-6">
        Here you will find answers to common questions about LinkFast eSIMs and how to use them. If you have any other questions, please contact us.
        </p>
      </div>
      <div>
        <Accordion
          type="single"
          collapsible
          className="w-full pt-[53px] space-y-2"
        >
          {isLoading ? (
              <div className="col-span-full flex justify-center items-center w-full">
              <Loading />
            </div>
          ) : faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <AccordionItem
                key={faq._id ?? index}
                value={`item-${faq._id ?? index}`}
                className="border border-[#5555551F]"
              >
                <AccordionTrigger className="leading-[104.4%] hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center w-full">
              No FAQs found.
            </div>
          )}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
