import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative grid min-h-screen w-full place-items-center bg-background px-4 py-8 sm:py-12">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle className="h-10 w-10 sm:h-9 sm:w-9" />
      </div>
      <div className="flex w-full max-w-[420px] flex-col items-center gap-6 sm:gap-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Flow Admin
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Admin dashboard
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
