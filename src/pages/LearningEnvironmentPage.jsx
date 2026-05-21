import React from "react";
import { PageCard, TextInput, SignatureBlock } from "../components/common";
import { placementFields, contactSections } from "../data/recordData";
import { isReady } from "../utils/recordUtils";

export function LearningEnvironmentPage({ record, update, signAndLockSection, initialPagesComplete }) {
  const ready = isReady(record, "learningEnvironmentDetails");
  return (
    <PageCard title="Part 1 - Placement 1: Learning Environment Details" subtitle="Core simulated placement details for Victoria Hughes-Smith, a Part One student on her first placement." locked={record.learningEnvironmentDetails.locked}>
      <p style={{ margin: "0 0 16px", borderRadius: 14, background: "#eff6ff", color: "#1e3a8a", padding: 12, fontSize: 14, fontWeight: 700 }}>Placement, PEF, Practice Assessor and Academic Assessor details are pre-filled and cannot be edited. Only the Practice Supervisor section is completed by the student.</p>
      <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #bfdbfe", marginBottom: 20 }}>
        <div style={{ background: "#1d4ed8", color: "white", padding: "12px 16px", fontWeight: 800 }}>Placement 1</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          {placementFields.map(([key, label, editable]) => (
            <div key={key} style={{ padding: 14, borderTop: "1px solid #e2e8f0", background: "#f1f5f9" }}>
              <TextInput label={label} value={record.learningEnvironmentDetails[key]} disabled={!editable || record.learningEnvironmentDetails.locked} onChange={(value) => update(`learningEnvironmentDetails.${key}`, value)} />
            </div>
          ))}
        </div>
      </div>
      {contactSections.map((section) => (
        <div key={section.heading} style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 17 }}>{section.heading}</h3>
          <div style={{ display: "grid", gap: 12 }}>
            {section.fields.map(([key, label, editable]) => <TextInput key={key} label={label} value={record.learningEnvironmentDetails[key]} disabled={!editable || record.learningEnvironmentDetails.locked} onChange={(value) => update(`learningEnvironmentDetails.${key}`, value)} />)}
          </div>
        </div>
      ))}
      <SignatureBlock learnerSigned={initialPagesComplete} supervisorSigned={record.learningEnvironmentDetails.supervisorSigned} locked={record.learningEnvironmentDetails.locked} ready={ready} onSupervisor={() => signAndLockSection("learningEnvironmentDetails", "learningEnvironmentDetails.supervisorSigned")} />
    </PageCard>
  );
}

