"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <div className="ml-0 flex min-h-0 flex-1 flex-col min-w-0 lg:ml-[240px]">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="min-h-0 flex-1 overflow-auto bg-background p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </>
  );
}
