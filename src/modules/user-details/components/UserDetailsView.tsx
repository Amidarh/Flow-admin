"use client";

import { useState, useEffect } from "react";
import { UserDetailsHeader } from "./UserDetailsHeader";
import { UserDetailsActions } from "./UserDetailsActions";
import { UserDetailsTabs, type UserDetailsTabId } from "./UserDetailsTabs";
import { UserDetailsStatsCards } from "./UserDetailsStatsCards";
import { UserDetailsProfileCard } from "./UserDetailsProfileCard";
import { UserDetailsNotesTab } from "./UserDetailsNotesTab";
import { UserDetailsCoursesTab } from "./UserDetailsCoursesTab";
import { UserDetailsSkeleton } from "./UserDetailsSkeleton";
import { useUsersService } from "@/modules/users/services";
import { cn } from "@/lib/utils";

export function UserDetailsView() {
  const { user, loading, getAUser } = useUsersService({});
  const [activeTab, setActiveTab] = useState<UserDetailsTabId>("details");
  const [blockAction, setBlockAction] = useState<boolean | null>(null);
  const isBlocked = blockAction !== null ? blockAction : (user?.isBlocked ?? false);

  useEffect(() => {
    getAUser();
  }, []);

  const handleBlock = () => {
    setBlockAction(true);
    // TODO: call API
  };

  const handleUnblock = () => {
    setBlockAction(false);
    // TODO: call API
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
            isBlocked={isBlocked}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
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
        className="pt-2"
      >
        {activeTab === "details" && <UserDetailsProfileCard user={user ?? null} />}
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
