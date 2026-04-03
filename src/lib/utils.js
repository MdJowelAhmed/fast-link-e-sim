import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** API responses sometimes return a non-array for list fields; normalize safely. */
export function asArray(value) {
  if (value == null) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "object") {
    if (Array.isArray(value.items)) return value.items;
    if (Array.isArray(value.packages)) return value.packages;
    if (Array.isArray(value.list)) return value.list;
    if (Array.isArray(value.results)) return value.results;
    if (Array.isArray(value.data)) return value.data;
    // Envelope: { data: { packages | items | ... } } (common for GET /esim/packages/:slug)
    if (value.data != null && typeof value.data === "object") {
      return asArray(value.data);
    }
  }
  return [];
}
