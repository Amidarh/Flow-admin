"use client";

import { useState } from "react";
import { AdminsPageHeader, AdminsTable } from "@/modules/admins";
import type { AdminListItem } from "@/modules/admins";

const MOCK_ADMINS: AdminListItem[] = [
  { id: "1", username: "admin", email: "admin@Flow.com", addedAt: "1-12-2025" },
  { id: "2", username: "maria_admin", email: "maria@example.com", addedAt: "15-12-2025" },
  { id: "3", username: "john_super", email: "john@gmail.com", addedAt: "20-12-2025" },
  { id: "4", username: "sarah_ops", email: "sarah.smith@email.com", addedAt: "5-1-2026" },
  { id: "5", username: "alex_support", email: "alex.j@company.com", addedAt: "10-1-2026" },
];

export default function AdminsPage() {
  const [admins, setAdmins] = useState<AdminListItem[]>(MOCK_ADMINS);

  return (
    <div className="space-y-6">
      <AdminsPageHeader />
      <AdminsTable admins={admins} />
    </div>
  );
}
