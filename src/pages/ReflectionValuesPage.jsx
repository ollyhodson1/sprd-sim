import React from "react";
import { PageCard, Textarea, SignatureBlock } from "../components/common";
import { VICTORIA_PROFESSIONAL_VALUES_REFLECTION } from "../data/recordData";
import { isReady } from "../utils/recordUtils";

export function ReflectionValuesPage({ record, update, signAndLockSection, initialPagesComplete }) {
  const reflectionValue = initialPagesComplete ? VICTORIA_PROFESSIONAL_VALUES_REFLECTION : record.reflectionProfessionalValues.reflection;
  const ready = initialPagesComplete || isReady(record, "reflectionProfessionalValues");

  return (
    <PageCard title="Part 1 - Placement 1: Learner reflection on meeting Professional Values" subtitle="Victoria's reflection appears once Learning Environment, Orientation and Initial Interview have been signed." locked={record.reflectionProfessionalValues.locked}>
      <Textarea
        label="Learner reflection on meeting Professional Values"
        value={reflectionValue}
        disabled={initialPagesComplete || record.reflectionProfessionalValues.locked}
        onChange={(value) => update("reflectionProfessionalValues.reflection", value)}
        rows={8}
      />
      <SignatureBlock
        learnerSigned={initialPagesComplete}
        supervisorSigned={record.reflectionProfessionalValues.supervisorSigned}
        supervisorLabel="Practice Supervisor signature"
        locked={record.reflectionProfessionalValues.locked}
        ready={ready}
        onSupervisor={() => signAndLockSection("reflectionProfessionalValues", "reflectionProfessionalValues.supervisorSigned")}
      />
    </PageCard>
  );
}
