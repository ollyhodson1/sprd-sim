import React from "react";
import { InterviewReviewPage } from "./InterviewReviewPage";
import { isMidpointReady } from "../utils/recordUtils";

export function MidpointPage({ record, update, signAndLockSection, initialPagesComplete }) {
  const ready = isMidpointReady(record, initialPagesComplete);

  return (
    <InterviewReviewPage
      title="Part 1 - Placement 1: Mid-Point Interview and Learning Development Review"
      recordKey="midpointInterview"
      record={record}
      update={update}
      ready={ready}
      signed={record.midpointInterview.supervisorSigned}
      locked={record.midpointInterview.locked}
      onSign={() => signAndLockSection("midpointInterview", "midpointInterview.supervisorSigned")}
      signatureLabel="Practice Supervisor signature"
      useVictoriaLearnerReflection={initialPagesComplete}
    />
  );
}
