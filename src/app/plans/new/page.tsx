"use client";

import { PlanForm } from "@/modules/plans";
import { createPlan } from "@/modules/plans/services";

export default function NewPlanPage() {
  return (
    <div className="space-y-6">
      <PlanForm
        mode="create"
        onSubmit={async (payload) => {
          await createPlan(payload);
        }}
      />
    </div>
  );
}

