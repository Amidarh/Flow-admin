"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  PlanForm,
  PlanDetailsHeader,
  SetDefaultPlanModal,
} from "@/modules/plans";
import {
  updatePlan,
  usePlanDetailsService,
  setPlanAsDefault,
} from "@/modules/plans/services";

export default function PlanDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: plan, isLoading, error, mutate } = usePlanDetailsService(id);
  const [defaultModalOpen, setDefaultModalOpen] = useState(false);
  const [isSettingDefault, setIsSettingDefault] = useState(false);

  const handleSetAsDefault = async () => {
    if (!id) return;
    setIsSettingDefault(true);
    try {
      await setPlanAsDefault(id);
      await mutate();
      setDefaultModalOpen(false);
    } finally {
      setIsSettingDefault(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Loading plan details…
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Failed to load plan. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PlanDetailsHeader
        planName={plan.name}
        onSetAsDefault={() => setDefaultModalOpen(true)}
        isSettingDefault={isSettingDefault}
      />
      <PlanForm
        mode="edit"
        plan={plan}
        onSubmit={async (payload) => {
          await updatePlan(plan.id, payload);
        }}
      />
      <SetDefaultPlanModal
        open={defaultModalOpen}
        onOpenChange={setDefaultModalOpen}
        planName={plan.name}
        onConfirm={handleSetAsDefault}
        isLoading={isSettingDefault}
      />
    </div>
  );
}

