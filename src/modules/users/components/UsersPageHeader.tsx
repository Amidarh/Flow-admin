export function UsersPageHeader() {
  return (
    <div className="space-y-1">
      <h1 className="text-xl font-bold tracking-tight text-foreground">
        Users
      </h1>
      <p className="text-sm text-muted-foreground">
        Manage all registered users. Admins are excluded from this list.
      </p>
    </div>
  );
}
