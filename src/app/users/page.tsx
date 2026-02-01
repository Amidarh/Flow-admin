"use client";

import { useState, useMemo } from "react";
import {
  UsersPageHeader,
  UsersSearchBar,
  UsersTable,
  UsersPagination,
} from "@/modules/users";
import type { UserListItem } from "@/modules/users";

const SEED_USERS: Omit<UserListItem, "id">[] = [
  { fullName: "Delight Emmanuel", email: "ikechukwudelightemmanuel@gmail.com", country: "Nigeria", dateJoined: "31-1-2026", lastLogin: "1-2-2026, 9:00 AM", status: "Active" },
  { fullName: "John Doe", email: "john@gmail.com", country: "United States", dateJoined: "15-12-2025", lastLogin: "31-1-2026, 2:30 PM", status: "Active" },
  { fullName: "Melinda Smith", email: "melinda@example.com", country: null, dateJoined: "10-12-2025", lastLogin: null, status: "Inactive" },
  { fullName: "Sarah Smith", email: "sarah.smith@email.com", country: "United Kingdom", dateJoined: "8-12-2025", lastLogin: "30-1-2026, 11:15 AM", status: "Active" },
  { fullName: "Alex Johnson", email: "alex.j@company.com", country: "Canada", dateJoined: "5-12-2025", lastLogin: "29-1-2026, 4:45 PM", status: "Active" },
  { fullName: "Emma Wilson", email: "emma.wilson@gmail.com", country: "Australia", dateJoined: "1-12-2025", lastLogin: "28-1-2026, 8:20 AM", status: "Pending" },
  { fullName: "Michael Brown", email: "mbrown@outlook.com", country: "Germany", dateJoined: "28-11-2025", lastLogin: "27-1-2026, 1:00 PM", status: "Active" },
  { fullName: "Lisa Anderson", email: "lisa.a@yahoo.com", country: "Sweden", dateJoined: "25-11-2025", lastLogin: null, status: "Inactive" },
  { fullName: "David Lee", email: "david.lee@mail.com", country: "Japan", dateJoined: "20-11-2025", lastLogin: "26-1-2026, 6:30 PM", status: "Active" },
  { fullName: "Rachel Green", email: "rachel.g@example.com", country: "France", dateJoined: "15-11-2025", lastLogin: "25-1-2026, 10:00 AM", status: "Active" },
];

const TOTAL_MOCK = 56;
const MOCK_USERS: UserListItem[] = Array.from({ length: TOTAL_MOCK }, (_, i) => {
  const seed = SEED_USERS[i % SEED_USERS.length];
  return { ...seed, id: String(i + 1) };
});

const PER_PAGE = 10;

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return MOCK_USERS;
    const q = search.trim().toLowerCase();
    return MOCK_USERS.filter(
      (u) =>
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [search]);

  const total = filteredUsers.length;
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filteredUsers.slice(start, start + PER_PAGE);
  }, [filteredUsers, page]);

  return (
    <div className="space-y-6">
      <UsersPageHeader />
      <UsersSearchBar value={search} onChange={setSearch} />
      <UsersTable users={paginatedUsers} />
      <UsersPagination
        page={page}
        perPage={PER_PAGE}
        total={total}
        onPageChange={setPage}
      />
    </div>
  );
}
