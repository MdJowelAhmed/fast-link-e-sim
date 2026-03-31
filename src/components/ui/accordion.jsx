"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { MdKeyboardArrowDown } from "react-icons/md";

import { cn } from "@/lib/utils";

function Accordion({ ...props }) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b", className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, iconClass, icon, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group bg-[#EBEBEB] focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 py-5 text-left text-base text-[#5C5C5C] transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 pl-5 pr-12 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
        <MdKeyboardArrowDown
          className={cn(
            "text-2xl min-w-7 max-w-7 transition-transform duration-200 group-data-[state=open]:scale-125 group-[data-state=open]:scale-125",
            iconClass
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm text-[#767676]"
      {...props}
    >
      <div className={cn("pl-5 pr-10 py-6", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
