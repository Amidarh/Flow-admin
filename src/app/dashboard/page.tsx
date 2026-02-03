"use client";

import { Suspense } from "react";
import { Preloader } from "@/core/components/preloaders";
import { DashboardContent } from "@/modules/dashboard/layouts";

export default function DashboardPage() {
    return (
        <Suspense fallback={<Preloader />}>
            <DashboardContent />
        </Suspense>
    )
}