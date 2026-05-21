import React, { useMemo, useState } from "react";
import { STORAGE_KEY, defaultRecord } from "./data/recordData";
import { styles } from "./styles/styles";
import { Icon, NavButton } from "./components/common";
import { areInitialPagesComplete, cloneRecord, getSectionValidationMessage, loadRecord, progressPercent, safeLocalStorageRemove, safeLocalStorageSet, setValueAtPath, supervisorTaskComplete } from "./utils/recordUtils";
import { LearningEnvironmentPage } from "./pages/LearningEnvironmentPage";
import { OrientationPage } from "./pages/OrientationPage";
import { InitialInterviewPage } from "./pages/InitialInterviewPage";
import { ReflectionValuesPage } from "./pages/ReflectionValuesPage";
import { ProfessionalValuesPage } from "./pages/ProfessionalValuesPage";
import { PlanOfActionPage } from "./pages/PlanOfActionPage";
import { MidpointPage } from "./pages/MidpointPage";
import { FinalInterviewPage } from "./pages/FinalInterviewPage";
import { ServiceUserFeedbackPage } from "./pages/ServiceUserFeedbackPage";
import { AdditionalFeedbackPage } from "./pages/AdditionalFeedbackPage";
import { CheckSubmitPage } from "./pages/CheckSubmitPage";

export default function SPRDApp() {
  const [record, setRecord] = useState(loadRecord);
  const [activePage, setActivePage] = useState("learningEnvironment");
  const [savedMessage, setSavedMessage] = useState("");
  const [popup, setPopup] = useState(null);
  const progress = useMemo(() => progressPercent(record), [record]);
  const initialPagesComplete = useMemo(() => areInitialPagesComplete(record), [record]);

  function update(path, value) {
    setRecord((previous) => setValueAtPath(previous, path, value));
  }

  function saveRecord() {
    safeLocalStorageSet(STORAGE_KEY, JSON.stringify(record));
    if (supervisorTaskComplete(record)) {
      setPopup({
        type: "success",
        title: "sPRD task complete",
        message: "You have successfully supported Victoria as a Practice Supervisor during her placement. Her assessor, Chris, will complete all remaining documentation at the final interview stage. You can now close Victoria's sPRD, return to Blackboard and enter the code below in the relevant box.",
        code: "1267"
      });
      return;
    }
    setSavedMessage("Saved.");
    setTimeout(() => setSavedMessage(""), 2500);
  }

  function resetRecord() {
    safeLocalStorageRemove(STORAGE_KEY);
    setRecord(cloneRecord(defaultRecord));
    setSavedMessage("The record has been reset.");
    setTimeout(() => setSavedMessage(""), 2500);
  }

  function signAndLockSection(section, signaturePath) {
    const validationMessage = getSectionValidationMessage(record, section);
    if (validationMessage) {
      setPopup({ type: "warning", title: "More detail needed before signing", message: validationMessage });
      return;
    }
    let updated = setValueAtPath(record, signaturePath, true);
    updated = setValueAtPath(updated, `${section}.locked`, true);
    safeLocalStorageSet(STORAGE_KEY, JSON.stringify(updated));
    setRecord(updated);
    setSavedMessage("Signed, saved and locked.");
    setTimeout(() => setSavedMessage(""), 2500);
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brandRow}>
            <div>
              <h1 style={{ margin: 0, fontSize: 30, letterSpacing: 1 }}>sPRD</h1>
              <p style={{ margin: "2px 0 0", color: "#bae6fd", fontSize: 14 }}>Student Practice Record Document</p>
            </div>
          </div>
          <div style={styles.warning}><Icon tone="amber">!</Icon> Simulated document</div>
        </div>
      </header>

      <main style={styles.main}>
        <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <section style={styles.card}>
            <div style={styles.cardContent}>
              <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", color: "#64748b", letterSpacing: 0.5 }}>Simulated learner</p>
              <p style={{ margin: "2px 0 0", fontWeight: 800 }}>{record.learnerName}</p>
              <div style={{ marginTop: 20, display: "grid", gap: 8, fontSize: 14, color: "#475569" }}>
                <p style={{ margin: 0 }}><strong>Stage:</strong> {record.learnerPart}</p>
                <p style={{ margin: 0 }}><strong>Placement:</strong> {record.placementNumber}</p>
                <p style={{ margin: 0 }}><strong>Practice Supervisor:</strong> {record.learningEnvironmentDetails.supervisorName}</p>
                <p style={{ margin: 0 }}><strong>Assessor:</strong> {record.learningEnvironmentDetails.assessorName}</p>
                <p style={{ margin: 0 }}><strong>Academic Assessor:</strong> {record.learningEnvironmentDetails.academicAssessorName}</p>
                <p style={{ margin: 0 }}><strong>PEF / Link Nurse:</strong> {record.learningEnvironmentDetails.pefName}</p>
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}><strong>Completion</strong><span>{progress}%</span></div>
                <div style={{ height: 12, borderRadius: 999, background: "#e2e8f0", overflow: "hidden" }}>
                  <div style={{ height: 12, borderRadius: 999, width: `${progress}%`, background: "#075985", transition: "width 250ms ease" }} />
                </div>
              </div>
            </div>
          </section>

          <nav style={{ display: "grid", gap: 10 }}>
            <NavButton active={activePage === "learningEnvironment"} onClick={() => setActivePage("learningEnvironment")} icon="LE" label="Learning Environment" />
            <NavButton active={activePage === "orientation"} onClick={() => setActivePage("orientation")} icon="O" label="Orientation" />
            <NavButton active={activePage === "initialInterview"} onClick={() => setActivePage("initialInterview")} icon="I" label="Initial Interview" />
            <NavButton active={activePage === "reflectionProfessionalValues"} onClick={() => setActivePage("reflectionProfessionalValues")} icon="R" label="Reflection on Values" />
            <NavButton active={activePage === "professionalValues"} onClick={() => setActivePage("professionalValues")} icon="PV" label="Professional Values" />
            <NavButton active={activePage === "planOfAction"} onClick={() => setActivePage("planOfAction")} icon="PA" label="Plan of Action" />
            <NavButton active={activePage === "midpointInterview"} onClick={() => setActivePage("midpointInterview")} icon="M" label="Mid-Point Interview" />
            <NavButton active={activePage === "finalInterview"} onClick={() => setActivePage("finalInterview")} icon="F" label="Final Interview" />
            <NavButton active={activePage === "serviceUserFeedback"} onClick={() => setActivePage("serviceUserFeedback")} icon="SU" label="Service User Feedback" />
            <NavButton active={activePage === "additionalFeedback"} onClick={() => setActivePage("additionalFeedback")} icon="AF" label="Additional Feedback" />
            <NavButton active={activePage === "checkSubmit"} onClick={() => setActivePage("checkSubmit")} icon="C" label="Check and Submit" />
          </nav>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={saveRecord} style={{ ...styles.button, flex: 1, background: "#15803d", color: "white" }}>Save</button>
            <button onClick={resetRecord} style={{ ...styles.button, background: "white", color: "#0f172a", border: "1px solid #cbd5e1" }}>Reset</button>
          </div>
          {savedMessage ? <p style={{ margin: 0, borderRadius: 14, background: "#dcfce7", color: "#166534", padding: 12, fontSize: 14, fontWeight: 700 }}>{savedMessage}</p> : null}
        </aside>

        <section style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {activePage === "learningEnvironment" ? <LearningEnvironmentPage record={record} update={update} signAndLockSection={signAndLockSection} initialPagesComplete={initialPagesComplete} /> : null}
          {activePage === "orientation" ? <OrientationPage record={record} update={update} signAndLockSection={signAndLockSection} initialPagesComplete={initialPagesComplete} /> : null}
          {activePage === "initialInterview" ? <InitialInterviewPage record={record} update={update} signAndLockSection={signAndLockSection} initialPagesComplete={initialPagesComplete} /> : null}
          {activePage === "reflectionProfessionalValues" ? <ReflectionValuesPage record={record} update={update} signAndLockSection={signAndLockSection} initialPagesComplete={initialPagesComplete} /> : null}
          {activePage === "professionalValues" ? <ProfessionalValuesPage record={record} update={update} signAndLockSection={signAndLockSection} /> : null}
          {activePage === "planOfAction" ? <PlanOfActionPage record={record} update={update} signAndLockSection={signAndLockSection} /> : null}
          {activePage === "midpointInterview" ? <MidpointPage record={record} update={update} signAndLockSection={signAndLockSection} initialPagesComplete={initialPagesComplete} /> : null}
          {activePage === "finalInterview" ? <FinalInterviewPage record={record} update={update} signAndLockSection={signAndLockSection} /> : null}
          {activePage === "serviceUserFeedback" ? <ServiceUserFeedbackPage record={record} update={update} signAndLockSection={signAndLockSection} /> : null}
          {activePage === "additionalFeedback" ? <AdditionalFeedbackPage record={record} update={update} signAndLockSection={signAndLockSection} /> : null}
          {activePage === "checkSubmit" ? <CheckSubmitPage record={record} /> : null}
        </section>
      </main>
      {popup ? <PopupModal popup={popup} onClose={() => setPopup(null)} /> : null}
    </div>
  );
}



function PopupModal({ popup, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, zIndex: 50 }}>
      <div style={{ width: "min(560px, 100%)", background: "white", borderRadius: 22, boxShadow: "0 20px 40px rgba(15,23,42,0.35)", padding: 28 }}>
        <h2 style={{ margin: 0, fontSize: 24, color: popup.type === "success" ? "#166534" : "#92400e" }}>{popup.title}</h2>
        <p style={{ margin: "14px 0 0", lineHeight: 1.6, color: "#334155", fontSize: 15 }}>{popup.message}</p>
        {popup.code ? (
          <div style={{ marginTop: 22, borderRadius: 18, background: "#eff6ff", border: "1px solid #bfdbfe", padding: 20, textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 14, color: "#1e3a8a", fontWeight: 800 }}>Blackboard code</p>
            <p style={{ margin: "6px 0 0", fontSize: 52, lineHeight: 1, fontWeight: 900, letterSpacing: 4, color: "#075985" }}>{popup.code}</p>
          </div>
        ) : null}
        <button onClick={onClose} style={{ ...styles.button, marginTop: 22, background: "#075985", color: "white", width: "100%" }}>OK</button>
      </div>
    </div>
  );
}
