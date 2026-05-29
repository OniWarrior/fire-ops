// src/app/(auth)/login/page.tsx
import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Login | Fire Alarm Ops" };

export default function LoginPage() {
  return <LoginForm />;
}
