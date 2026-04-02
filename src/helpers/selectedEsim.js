"use client";

const SELECTED_ESIM_KEY = "selected-esim-package";

export function saveSelectedEsim(esimPackage) {
  if (typeof window === "undefined" || !esimPackage) return;
  window.sessionStorage.setItem(
    SELECTED_ESIM_KEY,
    JSON.stringify(esimPackage)
  );
}

export function getSelectedEsim() {
  if (typeof window === "undefined") return null;

  const rawValue = window.sessionStorage.getItem(SELECTED_ESIM_KEY);
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}
