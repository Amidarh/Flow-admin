export function UsersPageHeader() {
  return (
    <div className="space-y-1">
      <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
        Users
      </h1>
      <p className="text-xs text-muted-foreground sm:text-sm">
        Manage all registered users. Admins are excluded from this list.
      </p>
    </div>
  );
}
