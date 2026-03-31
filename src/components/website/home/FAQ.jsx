import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";

const FAQ = () => {
  return (
    <section className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-10 xl:py-[100px]">
      <div className="text-center">
        <h2 className="text-3xl font-medium leading-[40px]">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-[#5C5C5C] leading-[150%] max-w-[820px] mx-auto mt-6">
          Lorem ipsum dolor sit amet consectetur. Amet morbi sit suspendisse dui
          ut donec vel id. Viverra urna cras nulla elementum. Risus orci dolor
          euismod in fringilla adipiscing eu condimentum.
        </p>
      </div>
      <div>
        <Accordion
          type="single"
          collapsible
          className="w-full pt-[53px] space-y-2"
        >
          <AccordionItem value="item-1" className="border border-[#5555551F]">
            <AccordionTrigger className="leading-[104.4%] hover:no-underline">
              Do you offer online shopping and home delivery?
            </AccordionTrigger>
            <AccordionContent>
              Yes! You can shop online and have your order delivered straight to
              your home.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-[#5555551F]">
            <AccordionTrigger className="leading-[104.4%] hover:no-underline">
              Do you carry organic or gluten-free products?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we offer a variety of organic and gluten-free options. Just
              look for labels or use filters while shopping.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-[#5555551F]">
            <AccordionTrigger className="leading-[104.4%] hover:no-underline">
              Can I place a special order for a product you don’t usually carry?
            </AccordionTrigger>
            <AccordionContent>
              Yes, just contact us and we’ll do our best to get it for you.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-[#5555551F]">
            <AccordionTrigger className="leading-[104.4%] hover:no-underline">
              Do you offer curbside pickup?
            </AccordionTrigger>
            <AccordionContent>
              Yes, curbside pickup is available. Place your order online and
              we’ll bring it out to your car when you arrive.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border border-[#5555551F]">
            <AccordionTrigger className="leading-[104.4%] hover:no-underline">
              Can I use multiple coupons in one transaction?
            </AccordionTrigger>
            <AccordionContent>
              We allow one coupon per order, unless otherwise stated in the
              offer terms.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border border-[#5555551F]">
            <AccordionTrigger className="leading-[104.4%] hover:no-underline">
              Can I place a special order for a product you don’t usually carry?
            </AccordionTrigger>
            <AccordionContent>
              Yes, just contact us and we’ll do our best to get it for you.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-7" className="border border-[#5555551F]">
            <AccordionTrigger className="leading-[104.4%] hover:no-underline">
              Can I use multiple coupons in one transaction?
            </AccordionTrigger>
            <AccordionContent>
              We allow one coupon per order, unless otherwise stated in the
              offer terms.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
