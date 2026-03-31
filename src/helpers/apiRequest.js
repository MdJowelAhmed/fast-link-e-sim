// "use server"; -- REMOVE this line, it's only for server actions in Next.js

import { config } from "@/config/env-config";
import { getAccessToken } from "./getAccessToken";

// Optional: You can keep this for documentation purposes
// FetchResponse: { success, message?, data?, pagination?, error?, meta? }

export const apiRequest = async (
  url,
  {
    method = "GET",
    body,
    tags,
    token,
    headers = {},
    cache = "force-cache",
  } = {}
) => {
  const accessToken = await getAccessToken();

  const isFormData = body instanceof FormData;
  const hasBody = body !== undefined && method !== "GET";

  const reqHeaders = {
    Accept: "application/json",
    ...headers,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `${token}` } : {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  try {
    const response = await fetch(`${config.BASE_URL}${url}`, {
      method,
      headers: reqHeaders,
      ...(hasBody && { body: isFormData ? body : JSON.stringify(body) }),
      ...(tags && { next: { tags } }), // This only works in server actions; can be removed in client code
      ...(!(method === "GET") ? { cache: "no-store" } : { cache }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: data?.success ?? true,
        message: data?.message,
        data: data?.data,
        pagination: data?.pagination,
        error: null,
        meta: data?.meta,
      };
    }

    return {
      success: false,
      message: data?.message,
      data: null,
      error: data?.errorMessages || "Request failed",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Network error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
