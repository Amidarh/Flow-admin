"use client";

import { useState } from "react";
import { UserDetailsHeader } from "./UserDetailsHeader";
import { UserDetailsCard } from "./UserDetailsCard";
import { UserDetailsStatsCards } from "./UserDetailsStatsCards";
import { UserDetailsActions } from "./UserDetailsActions";
import { UserDetailsTabs, type UserDetailsTabId } from "./UserDetailsTabs";
import { UserDetailsNotesTab } from "./UserDetailsNotesTab";
import { UserDetailsCoursesTab } from "./UserDetailsCoursesTab";
import type { UserDetails, UserNote, UserCourse } from "../types";

interface UserDetailsViewProps {
  user: UserDetails;
  notes: UserNote[];
  courses: UserCourse[];
}

export function UserDetailsView({ user, notes, courses }: UserDetailsViewProps) {
  const [activeTab, setActiveTab] = useState<UserDetailsTabId>("details");
  const [isBlocked, setIsBlocked] = useState(user.isBlocked ?? false);

  const handleBlock = () => {
    setIsBlocked(true);
    // TODO: call API
  };

  const handleUnblock = () => {
    setIsBlocked(false);
    // TODO: call API
  };

  return (
    <div className="space-y-6">
      <UserDetailsHeader
        title={user.name}
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

      <UserDetailsStatsCards stats={user.stats} />

      <UserDetailsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div
        id="panel-details"
        role="tabpanel"
        aria-labelledby="tab-details"
        hidden={activeTab !== "details"}
        className="pt-2"
      >
        {activeTab === "details" && <UserDetailsCard user={user} />}
      </div>

      <div
        id="panel-notes"
        role="tabpanel"
        aria-labelledby="tab-notes"
        hidden={activeTab !== "notes"}
        className="pt-2"
      >
        {activeTab === "notes" && <UserDetailsNotesTab notes={notes} />}
      </div>

      <div
        id="panel-courses"
        role="tabpanel"
        aria-labelledby="tab-courses"
        hidden={activeTab !== "courses"}
        className="pt-2"
      >
        {activeTab === "courses" && <UserDetailsCoursesTab courses={courses} />}
      </div>
    </div>
  );
}
