"use client";

import LoginPage from "@/components/features/auth/login-page";

export default function Login() {
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
  };

  return (
    <LoginPage
      onGoogleLogin={handleGoogleLogin}
      onAppleLogin={handleAppleLogin}
    />
  );
}
