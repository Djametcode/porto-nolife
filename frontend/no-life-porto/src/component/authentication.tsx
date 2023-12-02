import React from "react";
import Cookies from "js-cookie";

export default function AuthenticationProvider(
  {
    auth,
    signup,
  }: {
    auth: React.ReactNode;
    signup: React.ReactNode;
  },
  { ...rest }
) {
  const token = Cookies.get("token");
  return token ? auth : signup;
}
