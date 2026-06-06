"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { AUTH_CHANGE_EVENT } from "@/helpers/authEvents";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const hasToken =
        typeof window !== "undefined" && Boolean(localStorage.getItem("token"));

      if (!hasToken) {
        setIsAuthorized(false);
        setIsChecking(false);
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      setIsAuthorized(true);
      setIsChecking(false);
    };

    checkAuth();
    window.addEventListener(AUTH_CHANGE_EVENT, checkAuth);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, checkAuth);
  }, [pathname, router]);

  if (isChecking) {
    return <Loading />;
  }

  if (!isAuthorized) {
    return null;
  }

  return children;
};

export default PrivateRoute;
