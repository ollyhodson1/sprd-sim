import React from "react";
import { PageCard, SelectInput, Textarea, SignatureBlock } from "../components/common";
import { isReady } from "../utils/recordUtils";

export function AdditionalFeedbackPage({ record, update, signAndLockSection }) {
  const ready = isReady(record, "additionalFeedback");
  return (
    <PageCard title="Part 1 - Placement 1: Additional Records of Feedback" subtitle="Peer review, record of working with others, or additional communication/meeting feedback." locked={record.additionalFeedback.locked}>
      <SelectInput label="Feedback type" value={record.additionalFeedback.feedbackType} disabled={record.additionalFeedback.locked} options={["Peer Review", "Record of Working with Others", "Additional Communication/Meeting"]} onChange={(value) => update("additionalFeedback.feedbackType", value)} />
      <Textarea label="Communication / additional feedback" value={record.additionalFeedback.communicationFeedback} disabled={record.additionalFeedback.locked} onChange={(value) => update("additionalFeedback.communicationFeedback", value)} />
      <Textarea label="Name and designation" value={record.additionalFeedback.nameDesignation} disabled={record.additionalFeedback.locked} onChange={(value) => update("additionalFeedback.nameDesignation", value)} rows={3} />
      <SignatureBlock supervisorSigned={record.additionalFeedback.supervisorSigned} locked={record.additionalFeedback.locked} ready={ready} onSupervisor={() => signAndLockSection("additionalFeedback", "additionalFeedback.supervisorSigned")} />
    </PageCard>
  );
}

