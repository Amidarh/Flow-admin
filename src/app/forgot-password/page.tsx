"use client"
import ForgotPasswordForm from "@/modules/forget-password/layouts";
import { Suspense } from "react";
import { Preloader } from "@/core/components/preloaders";

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <ForgotPasswordForm />
    </Suspense>
  )
}