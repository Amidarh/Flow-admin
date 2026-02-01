import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full place-items-center bg-background px-4 py-12">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="flex w-full max-w-[400px] flex-col items-center gap-10">
        <div className="text-center">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Flow Admin
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
