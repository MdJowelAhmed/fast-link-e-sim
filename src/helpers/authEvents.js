/** Fired after login/logout so client nav (same tab) can refresh auth UI. */
export const AUTH_CHANGE_EVENT = "linkfast-auth-change";

export function notifyAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }
}
