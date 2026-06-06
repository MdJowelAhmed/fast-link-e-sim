import PrivateRoute from "@/components/auth/PrivateRoute";
import SecureCheckout from "@/components/website/checkout/SecureCheckout";
import React from "react";

const page = () => {
  return (
    <PrivateRoute>
      <SecureCheckout />
    </PrivateRoute>
  );
};

export default page;
