"use client";

import { useState, useEffect } from "react";
import { UserDetailsHeader } from "./UserDetailsHeader";
import { UserDetailsActions } from "./UserDetailsActions";
import { UserDetailsTabs, type UserDetailsTabId } from "./UserDetailsTabs";
import { UserDetailsStatsCards } from "./UserDetailsStatsCards";
import { UserDetailsProfileCard } from "./UserDetailsProfileCard";
import { UserDetailsLoginHistoryCard } from "./UserDetailsLoginHistoryCard";
import { UserDetailsNotesTab } from "./UserDetailsNotesTab";
import { UserDetailsCoursesTab } from "./UserDetailsCoursesTab";
import { UserDetailsSkeleton } from "./UserDetailsSkeleton";
import { useUsersService } from "@/modules/users/services";
import { cn } from "@/lib/utils";

export function UserDetailsView() {
  const {
    user,
    loading,
    getAUser,
    blockUser,
    unblockUser,
    blockLoading,
  } = useUsersService({});
  const [activeTab, setActiveTab] = useState<UserDetailsTabId>("details");

  useEffect(() => {
    getAUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fetch user once on mount
  }, []);

  const handleBlock = async () => {
    await blockUser();
  };

  const handleUnblock = async () => {
    await unblockUser();
  };

  if (loading) {
    return <UserDetailsSkeleton />;
  }

  return (
    <div
      className={cn(
        "space-y-6",
        "animate-in fade-in-0 duration-300 ease-out"
      )}
    >
      <UserDetailsHeader
        title={user?.firstName + " " + user?.lastName}
        backHref="/users"
        backLabel="Back to users"
        actions={
          <UserDetailsActions
            isBlocked={user?.isBlocked ?? false}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            isLoading={blockLoading}
          />
        }
      />

      <UserDetailsStatsCards stats={user ?? {
        coursesCount: 0,
        standardCoursesCount: 0,
        flexibleCoursesCount: 0,
      }} />
      <UserDetailsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div
        id="panel-details"
        role="tabpanel"
        aria-labelledby="tab-details"
        hidden={activeTab !== "details"}
        className="pt-2 space-y-6"
      >
        {activeTab === "details" && (
          <>
            <UserDetailsProfileCard user={user ?? null} />
            <UserDetailsLoginHistoryCard loginHistory={user?.loginHistory} />
          </>
        )}
      </div>

      <div
        id="panel-notes"
        role="tabpanel"
        aria-labelledby="tab-notes"
        hidden={activeTab !== "notes"}
        className="pt-2"
      >
        {activeTab === "notes" && <UserDetailsNotesTab notes={[]} />}
      </div>

      <div
        id="panel-courses"
        role="tabpanel"
        aria-labelledby="tab-courses"
        hidden={activeTab !== "courses"}
        className="pt-2"
      >
        {activeTab === "courses" && <UserDetailsCoursesTab courses={user?.courses ?? []} />}
      </div>
    </div>
  );
}
