import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AdminDetailsHeader,
  AdminDetailsCard,
} from "@/modules/admins";
import type { AdminDetails } from "@/modules/admins";

const MOCK_ADMINS: AdminDetails[] = [
  { id: "1", username: "admin", email: "admin@Flow.com", addedAt: "1-12-2025", lastActive: "1-2-2026" },
  { id: "2", username: "maria_admin", email: "maria@example.com", addedAt: "15-12-2025", lastActive: "31-1-2026" },
  { id: "3", username: "john_super", email: "john@gmail.com", addedAt: "20-12-2025", lastActive: "30-1-2026" },
  { id: "4", username: "sarah_ops", email: "sarah.smith@email.com", addedAt: "5-1-2026", lastActive: "29-1-2026" },
  { id: "5", username: "alex_support", email: "alex.j@company.com", addedAt: "10-1-2026", lastActive: "28-1-2026" },
];

function getAdmin(id: string): AdminDetails | null {
  return MOCK_ADMINS.find((a) => a.id === id) ?? null;
}

interface AdminDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminDetailsPage({ params }: AdminDetailsPageProps) {
  const { id } = await params;
  const admin = getAdmin(id);

  if (!admin) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminDetailsHeader title={admin.username} />
      <AdminDetailsCard admin={admin} />
      <div className="flex justify-end">
        <Link
          href="/admins"
          className="text-sm font-medium text-primary hover:underline"
        >
          Back to admins list
        </Link>
      </div>
    </div>
  );
}
