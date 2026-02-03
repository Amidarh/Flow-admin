"use client";

import { useState, useCallback, useEffect } from "react";
import {
  UsersPageHeader,
  UsersSearchBar,
  UsersTable,
  UsersPagination,
} from "@/modules/users";
import { useUsersService } from "@/modules/users/services";

const PER_PAGE = 10;
const SEARCH_DEBOUNCE_MS = 300;

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const { data, isLoading, error, pagination } = useUsersService({
    page,
    limit: Number(PER_PAGE),
    search:
      debouncedSearch.trim() === ""
        ? undefined
        : {
            email: debouncedSearch.trim(),
            fullname: debouncedSearch.trim(),
          },
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const users = data?.data?.users ?? [];
  const { total } = pagination;

  return (
    <div className="space-y-6">
      <UsersPageHeader />
      <UsersSearchBar
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by name or email..."
      />
      {isLoading ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Loading users…
        </div>
      ) : error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Failed to load users. Please try again.
        </div>
      ) : (
        <>
          <UsersTable users={users} />
          <UsersPagination
            page={page}
            perPage={PER_PAGE}
            total={total}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
