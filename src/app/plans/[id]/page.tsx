"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  PlanForm,
  PlanDetailsHeader,
  SetDefaultPlanModal,
  SetRecommendedPlanModal,
} from "@/modules/plans";
import {
  updatePlan,
  usePlanDetailsService,
  setPlanAsDefault,
  setPlanAsRecommended,
} from "@/modules/plans/services";

export default function PlanDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: plan, isLoading, error, mutate } = usePlanDetailsService(id);
  const [defaultModalOpen, setDefaultModalOpen] = useState(false);
  const [isSettingDefault, setIsSettingDefault] = useState(false);
  const [recommendedModalOpen, setRecommendedModalOpen] = useState(false);
  const [isSettingRecommended, setIsSettingRecommended] = useState(false);

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

  const handleSetAsRecommended = async () => {
    if (!id) return;
    setIsSettingRecommended(true);
    try {
      await setPlanAsRecommended(id);
      await mutate();
      setRecommendedModalOpen(false);
    } finally {
      setIsSettingRecommended(false);
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
        onSetAsRecommended={() => setRecommendedModalOpen(true)}
        isSettingRecommended={isSettingRecommended}
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
      <SetRecommendedPlanModal
        open={recommendedModalOpen}
        onOpenChange={setRecommendedModalOpen}
        planName={plan.name}
        onConfirm={handleSetAsRecommended}
        isLoading={isSettingRecommended}
      />
    </div>
  );
}

