import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="ml-[240px] flex min-h-0 flex-1 flex-col min-w-0">
        <Header />
        <main className="min-h-0 flex-1 overflow-auto bg-background p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
