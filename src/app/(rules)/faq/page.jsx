import ShortBanner from "@/components/shared/ShortBanner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const page = () => {
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
            {Array.from({ length: 15 }).map((_, idx) => (
              <AccordionItem value={`item-${idx + 1}`} key={idx}>
                <AccordionTrigger className="leading-[104.4%] hover:no-underline bg-[#E6F5EE]">
                  Do you offer online shopping and home delivery?
                </AccordionTrigger>
                <AccordionContent className="border border-[#5555551F]">
                  Yes! You can shop online and have your order delivered
                  straight to your home.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default page;
