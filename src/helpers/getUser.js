// src/helpers/getProfile.js
"use client";

import userImg from "@/assests/profileImg.svg";

function readJwtPayload(token) {
  try {
    const part = token.split(".")[1];
    if (!part || typeof atob !== "function") return null;
    const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4 ? b64 + "=".repeat(4 - (b64.length % 4)) : b64;
    return JSON.parse(atob(pad));
  } catch {
    return null;
  }
}

const getProfile = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = readJwtPayload(token);
    const email = payload?.email ?? null;

    return {
      name: payload?.name ?? "User",
      email,
      role: payload?.role ?? null,
      image: userImg,
    };
  }

  return null;
};

export default getProfile;
