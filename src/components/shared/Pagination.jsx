"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Build visible page slots with numeric pages and ellipsis gaps (1 … 4 5 6 … 20).
 * @param {number} currentPage - 1-based
 * @param {number} totalPages
 * @param {number} siblingCount - pages to show on each side of current
 */
function getPageSlots(currentPage, totalPages, siblingCount = 1) {
  if (totalPages <= 1) return [1];

  const delta = siblingCount;
  const left = currentPage - delta;
  const right = currentPage + delta;
  const range = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i <= right)) {
      range.push(i);
    }
  }

  const rangeWithDots = [];
  let last = 0;
  for (const i of range) {
    if (last) {
      if (i - last === 2) {
        rangeWithDots.push(last + 1);
      } else if (i - last > 2) {
        rangeWithDots.push("ellipsis");
      }
    }
    rangeWithDots.push(i);
    last = i;
  }
  return rangeWithDots;
}

/**
 * @param {object} props
 * @param {number} props.currentPage - 1-based
 * @param {number} props.totalPages
 * @param {(page: number) => void} props.onPageChange
 * @param {boolean} [props.isLoading]
 * @param {boolean} [props.disabled]
 * @param {string} [props.className]
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  disabled = false,
  className,
}) {
  if (totalPages <= 1) return null;

  const slots = getPageSlots(currentPage, totalPages);
  const busy = isLoading || disabled;

  return (
    <nav
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-8",
        className
      )}
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={busy || currentPage <= 1}
        className={cn(
          "inline-flex h-10 items-center gap-1 rounded-full border border-[#5555551F] px-3 text-sm text-[#333333]",
          "hover:bg-[#F4F4F4] disabled:cursor-not-allowed disabled:opacity-45"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {slots.map((slot, idx) =>
          slot === "ellipsis" ? (
            <span
              key={`e-${idx}`}
              className="px-2 text-sm text-[#767676]"
              aria-hidden
            >
              …
            </span>
          ) : (
            <button
              key={slot}
              type="button"
              onClick={() => onPageChange(slot)}
              disabled={busy}
              className={cn(
                "min-h-10 min-w-10 rounded-full border px-3 text-sm transition-colors",
                currentPage === slot
                  ? "border-primary bg-primary text-white"
                  : "border-[#5555551F] text-[#333333] hover:bg-[#F4F4F4]"
              )}
              aria-label={`Page ${slot}`}
              aria-current={currentPage === slot ? "page" : undefined}
            >
              {slot}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={busy || currentPage >= totalPages}
        className={cn(
          "inline-flex h-10 items-center gap-1 rounded-full border border-[#5555551F] px-3 text-sm text-[#333333]",
          "hover:bg-[#F4F4F4] disabled:cursor-not-allowed disabled:opacity-45"
        )}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
