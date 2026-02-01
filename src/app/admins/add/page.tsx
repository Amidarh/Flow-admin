"use client";

import { AddAdminForm } from "@/modules/admins";

export default function AddAdminPage() {
  const handleAddAdmin = async (_data: { username: string; email: string }) => {
    // TODO: Call API to add admin. On success, redirect is handled in AddAdminForm.
  };

  return <AddAdminForm onSubmit={handleAddAdmin} />;
}
