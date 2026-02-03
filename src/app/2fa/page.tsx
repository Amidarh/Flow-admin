"use client"

import TwoFactorForm from "@/modules/2fa/layouts";
import { Suspense } from "react";
import { Preloader } from "@/core/components/preloaders";

export default function TwoFactorAuthenticationPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <TwoFactorForm />
    </Suspense>
  );
}