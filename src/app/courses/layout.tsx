import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
}
