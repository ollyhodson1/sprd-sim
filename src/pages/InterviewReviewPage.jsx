import React from "react";
import { PageCard, Textarea, SignatureBlock } from "../components/common";
import { VICTORIA_MIDPOINT_LEARNER_REFLECTION } from "../data/recordData";

export function InterviewReviewPage({ title, recordKey, record, update, ready, signed, locked, onSign, signatureLabel, useVictoriaLearnerReflection = false }) {
  return (
    <PageCard title={title} subtitle="Learner self-assessment/reflection on progress and Practice Supervisor comments." locked={locked}>
      <ReviewFields recordKey={recordKey} record={record} update={update} locked={locked} useVictoriaLearnerReflection={useVictoriaLearnerReflection} />
      <SignatureBlock supervisorSigned={signed} supervisorLabel={signatureLabel} locked={locked} ready={ready} onSupervisor={onSign} />
    </PageCard>
  );
}

export function ReviewFields({ recordKey, record, update, locked, useVictoriaLearnerReflection = false }) {
  const learnerReflection = useVictoriaLearnerReflection ? VICTORIA_MIDPOINT_LEARNER_REFLECTION : null;
  const learnerFieldsLocked = locked || useVictoriaLearnerReflection;

  return (
    <>
      <Textarea
        label="Knowledge"
        value={learnerReflection ? learnerReflection.knowledge : record[recordKey].knowledge}
        disabled={learnerFieldsLocked}
        onChange={(value) => update(`${recordKey}.knowledge`, value)}
      />
      <Textarea
        label="Skills"
        value={learnerReflection ? learnerReflection.skills : record[recordKey].skills}
        disabled={learnerFieldsLocked}
        onChange={(value) => update(`${recordKey}.skills`, value)}
      />
      <Textarea
        label="Attitudes and values"
        value={learnerReflection ? learnerReflection.attitudes : record[recordKey].attitudes}
        disabled={learnerFieldsLocked}
        onChange={(value) => update(`${recordKey}.attitudes`, value)}
      />
      <Textarea
        label="Any further comments from learner reflection?"
        value={learnerReflection ? learnerReflection.supervisorComments : record[recordKey].supervisorComments}
        disabled={learnerFieldsLocked}
        onChange={(value) => update(`${recordKey}.supervisorComments`, value)}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
        <Textarea label="Learning and development needs" value={record[recordKey].learningNeeds} disabled={locked} onChange={(value) => update(`${recordKey}.learningNeeds`, value)} />
        <Textarea label="How will these be achieved?" value={record[recordKey].achievementPlan || ""} disabled={locked} onChange={(value) => update(`${recordKey}.achievementPlan`, value)} />
      </div>
    </>
  );
}
