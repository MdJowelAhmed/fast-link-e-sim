/**
 * Client-visible API origin.
 * In .env.local use (no spaces around =, no quotes, no semicolon):
 *   NEXT_PUBLIC_API_URL=http://10.10.7.9:5000
 */

function normalizeApiOrigin(value) {
  if (value == null || typeof value !== "string") return "";
  let s = value.trim();
  // Common mistakes: pasted JS — quotes, semicolons, surrounding junk
  s = s.replace(/^["'`]+|["'`;]+$/g, "").trim();
  s = s.replace(/;+$/g, "").trim();
  // Remove trailing slash (we add paths ourselves)
  return s.replace(/\/+$/, "");
}

const raw =
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  process.env.NEXT_PUBLIC_BASE_URL?.trim() ||
  "";

const origin = normalizeApiOrigin(raw);

export const config = {
  /** e.g. http://10.10.7.9:5000 */
  BASE_URL: origin,
  /** e.g. http://10.10.7.9:5000/api/v1 */
  API_V1_BASE: origin ? `${origin}/api/v1` : "",
};
