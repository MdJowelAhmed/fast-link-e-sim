import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** API responses sometimes return a non-array for list fields; normalize safely. */
export function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    if (Array.isArray(value.items)) return value.items;
    if (Array.isArray(value.packages)) return value.packages;
    if (Array.isArray(value.list)) return value.list;
  }
  return [];
}
