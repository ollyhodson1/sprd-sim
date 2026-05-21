import { defaultRecord, VICTORIA_LEARNING_NEEDS, VICTORIA_PROFESSIONAL_VALUES_REFLECTION, VICTORIA_MIDPOINT_LEARNER_REFLECTION, professionalValueStatements, pvMidpointOptions, pvFinalOptions, STORAGE_KEY } from "../data/recordData";

export function cloneRecord(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

export function textDone(value) {
  return String(value || "").trim().length > 0;
}

export function wordCount(value) {
  return String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function hasMinimumWords(value, minimum) {
  return wordCount(value) >= minimum;
}

export function initialInterviewWordRequirementsMet(record) {
  return hasMinimumWords(record.initialInterview.learningPlan, 25) && hasMinimumWords(record.initialInterview.achievementPlan, 25);
}

export function midpointWordRequirementsMet(record) {
  return hasMinimumWords(record.midpointInterview.learningNeeds, 25) && hasMinimumWords(record.midpointInterview.achievementPlan, 25);
}

export function additionalFeedbackWordRequirementsMet(record) {
  return hasMinimumWords(record.additionalFeedback.communicationFeedback, 30) && hasMinimumWords(record.additionalFeedback.nameDesignation, 30);
}

export function safeLocalStorageGet(key) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeLocalStorageSet(key, value) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function safeLocalStorageRemove(key) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function mergeRecord(savedRecord) {
  const merged = cloneRecord(defaultRecord);
  if (!savedRecord || typeof savedRecord !== "object") return merged;

  Object.keys(defaultRecord).forEach((key) => {
    if (typeof defaultRecord[key] === "object" && defaultRecord[key] !== null && !Array.isArray(defaultRecord[key])) {
      merged[key] = { ...defaultRecord[key], ...(savedRecord[key] || {}) };
    } else if (savedRecord[key] !== undefined) {
      merged[key] = savedRecord[key];
    }
  });

  merged.orientation.items = { ...defaultRecord.orientation.items, ...((savedRecord.orientation && savedRecord.orientation.items) || {}) };
  merged.professionalValues.values = { ...defaultRecord.professionalValues.values, ...((savedRecord.professionalValues && savedRecord.professionalValues.values) || {}) };
  merged.initialInterview.learningNeeds = VICTORIA_LEARNING_NEEDS;
  return merged;
}

export function loadRecord() {
  try {
    const saved = safeLocalStorageGet(STORAGE_KEY);
    if (!saved) return cloneRecord(defaultRecord);
    return mergeRecord(JSON.parse(saved));
  } catch {
    return cloneRecord(defaultRecord);
  }
}

export function getValueAtPath(object, path) {
  return path.split(".").reduce((cursor, key) => (cursor ? cursor[key] : undefined), object);
}

export function setValueAtPath(object, path, value) {
  const copy = cloneRecord(object);
  const keys = path.split(".");
  let cursor = copy;
  keys.slice(0, -1).forEach((key) => {
    if (!cursor[key]) cursor[key] = {};
    cursor = cursor[key];
  });
  cursor[keys[keys.length - 1]] = value;
  return copy;
}

export function isReady(record, pageKey) {
  switch (pageKey) {
    case "learningEnvironmentDetails":
      return Boolean(
        textDone(record.learningEnvironmentDetails.placementName) &&
        textDone(record.learningEnvironmentDetails.organisation) &&
        textDone(record.learningEnvironmentDetails.pefName) &&
        textDone(record.learningEnvironmentDetails.supervisorName) &&
        textDone(record.learningEnvironmentDetails.assessorName) &&
        textDone(record.learningEnvironmentDetails.academicAssessorName)
      );
    case "orientation":
      return Object.values(record.orientation.items).every(Boolean);
    case "initialInterview":
      return textDone(record.initialInterview.learningNeeds) && textDone(record.initialInterview.learningPlan) && textDone(record.initialInterview.achievementPlan);
    case "reflectionProfessionalValues":
      return textDone(record.reflectionProfessionalValues.reflection);
    case "professionalValues":
      return Object.values(record.professionalValues.values).every((item) => textDone(item.mid));
    case "planOfAction":
      return ["dateInitiated", "dateReview", "objectivesAchieved", "natureOfConcern", "learnerNeeds", "reviewComments"].every((key) => textDone(record.planOfAction[key]));
    case "midpointInterview":
      return ["knowledge", "skills", "attitudes", "supervisorComments", "learningNeeds", "achievementPlan"].every((key) => textDone(record.midpointInterview[key]));
    case "finalInterview":
      return ["knowledge", "skills", "attitudes", "supervisorComments", "learningNeeds", "achievementPlan", "planRequired", "academicAssessorInformed"].every((key) => textDone(record.finalInterview[key]));
    case "serviceUserFeedback":
      return ["respondentType", "cared", "listened", "understood", "talked", "respect", "didWell", "couldImprove"].every((key) => textDone(record.serviceUserFeedback[key]));
    case "additionalFeedback":
      return ["feedbackType", "communicationFeedback", "nameDesignation"].every((key) => textDone(record.additionalFeedback[key]));
    default:
      return false;
  }
}

export function areInitialPagesComplete(record) {
  return Boolean(
    record.learningEnvironmentDetails.supervisorSigned &&
    record.orientation.supervisorSigned &&
    record.initialInterview.supervisorSigned
  );
}

export function isMidpointReady(record, initialPagesComplete = false) {
  if (initialPagesComplete) {
    return textDone(record.midpointInterview.learningNeeds) && textDone(record.midpointInterview.achievementPlan);
  }
  return isReady(record, "midpointInterview");
}

export function getCheckAndSubmitItems(record) {
  return [
    ["learningEnvironmentDetails", "Part 1 - Placement 1: Learning Environment Details", record.learningEnvironmentDetails.supervisorSigned],
    ["orientation", "Part 1 - Orientation", record.orientation.supervisorSigned],
    ["initialInterview", "Part 1 - Placement 1: Initial Interview", record.initialInterview.supervisorSigned],
    ["reflectionProfessionalValues", "Part 1 - Placement 1: Learner reflection on meeting Professional Values", record.reflectionProfessionalValues.supervisorSigned],
    ["professionalValues", "Part 1 - Placement 1: Professional Values in Practice", record.professionalValues.supervisorSigned],
    ["planOfAction", "Part 1 - Placement 1: Plan of Action", record.planOfAction.assessorSigned],
    ["midpointInterview", "Part 1 - Placement 1: Mid-Point Interview and Learning Development Review", record.midpointInterview.supervisorSigned],
    ["finalInterview", "Part 1 - Placement 1: Final Interview", record.finalInterview.assessorSigned],
    ["serviceUserFeedback", "Part 1 - Placement 1: Patient/Service User/Carer Feedback Form", record.serviceUserFeedback.supervisorSigned],
    ["additionalFeedback", "Part 1 - Placement 1: Additional Records of Feedback", record.additionalFeedback.supervisorSigned]
  ].map(([key, title, completed]) => ({
    key,
    title,
    completed: Boolean(completed),
    detail: completed ? "Signed and complete" : isReady(record, key) ? "Ready to sign" : "Incomplete"
  }));
}

export function progressPercent(record) {
  const items = getCheckAndSubmitItems(record);
  return Math.round((items.filter((item) => item.completed).length / items.length) * 100);
}

export function supervisorTaskComplete(record) {
  return Boolean(
    record.learningEnvironmentDetails.supervisorSigned &&
    record.orientation.supervisorSigned &&
    record.initialInterview.supervisorSigned &&
    record.professionalValues.supervisorSigned &&
    record.midpointInterview.supervisorSigned &&
    record.additionalFeedback.supervisorSigned
  );
}

export function getSectionValidationMessage(record, section) {
  if (section === "initialInterview" && !initialInterviewWordRequirementsMet(record)) {
    return "To sign and save the Initial Interview, both 'Outline of learning plan' and 'How will this be achieved?' need at least 25 words. As a Practice Supervisor, your documentation needs enough depth to support Victoria's learning. Short learning plans are not supportive of a student's learning experience, so please add more detail before signing.";
  }
  if (section === "midpointInterview" && !midpointWordRequirementsMet(record)) {
    return "To sign and save the Mid-Point Interview, both 'Learning and development needs' and 'How will these be achieved?' need at least 25 words. As a Practice Supervisor, your feedback should give Victoria clear coaching, direction and support for the rest of placement.";
  }
  if (section === "additionalFeedback" && !additionalFeedbackWordRequirementsMet(record)) {
    return "To sign and save Additional Records of Feedback, both text boxes need at least 30 words. Please give enough detail so Victoria and her assessor can understand what happened, what was observed and what this means for her learning.";
  }
  return "";
}

export function runTests() {
  const blank = cloneRecord(defaultRecord);
  console.assert(progressPercent(blank) === 0, "Test failed: progress should start at 0% before pages are signed");
  console.assert(textDone(blank.initialInterview.learningNeeds), "Test failed: Victoria's learner section should be pre-filled");
  console.assert(blank.initialInterview.learningNeeds.includes("I am enthusiastic"), "Test failed: Victoria's learner section should contain the first-person plan");
  console.assert(blank.learningEnvironmentDetails.supervisorName === "", "Test failed: supervisor name should start blank");
  console.assert(professionalValueStatements.length === 15, "Test failed: professional values list should contain 15 statements");
  console.assert(pvMidpointOptions[0] === "Progressing", "Test failed: midpoint professional values options should start with Progressing");
  console.assert(pvFinalOptions.includes("Achieved"), "Test failed: final professional values options should remain assessor-focused");
  console.assert(wordCount("one two three") === 3, "Test failed: wordCount counts words");
  console.assert(hasMinimumWords("one two three", 3), "Test failed: hasMinimumWords recognises minimum word count");

  const edited = setValueAtPath(blank, "orientation.items.generalOrientation", true);
  console.assert(getValueAtPath(edited, "orientation.items.generalOrientation") === true, "Test failed: nested checkbox value should update");
  console.assert(getValueAtPath(blank, "orientation.items.generalOrientation") === false, "Test failed: original record should not be mutated");

  const supervisorEdited = setValueAtPath(blank, "learningEnvironmentDetails.supervisorName", "Alex Taylor");
  console.assert(getValueAtPath(supervisorEdited, "learningEnvironmentDetails.supervisorName") === "Alex Taylor", "Test failed: supervisor name should update reactively");

  const orientationTickedOnly = cloneRecord(defaultRecord);
  Object.keys(orientationTickedOnly.orientation.items).forEach((key) => {
    orientationTickedOnly.orientation.items[key] = true;
  });
  console.assert(progressPercent(orientationTickedOnly) === 0, "Test failed: ticking items should not increase completion until the page is signed");
  console.assert(isReady(orientationTickedOnly, "orientation") === true, "Test failed: orientation should be ready once all items are ticked");

  const midpointValuesOnly = cloneRecord(defaultRecord);
  Object.keys(midpointValuesOnly.professionalValues.values).forEach((key) => {
    midpointValuesOnly.professionalValues.values[key].mid = "Progressing";
  });
  console.assert(isReady(midpointValuesOnly, "professionalValues") === true, "Test failed: professional values should be ready when all midpoint values are completed, even with final disabled");

  const firstThreeComplete = cloneRecord(defaultRecord);
  firstThreeComplete.learningEnvironmentDetails.supervisorSigned = true;
  firstThreeComplete.orientation.supervisorSigned = true;
  firstThreeComplete.initialInterview.supervisorSigned = true;
  console.assert(areInitialPagesComplete(firstThreeComplete) === true, "Test failed: first three signed pages should trigger Victoria's next-stage content");
  console.assert(VICTORIA_PROFESSIONAL_VALUES_REFLECTION.includes("professional values"), "Test failed: Victoria's professional values reflection should be available");
  console.assert(textDone(VICTORIA_MIDPOINT_LEARNER_REFLECTION.knowledge), "Test failed: Victoria's midpoint learner knowledge reflection should be available");
  console.assert(isMidpointReady(firstThreeComplete, true) === false, "Test failed: midpoint should still need supervisor development fields before signing");
  firstThreeComplete.midpointInterview.learningNeeds = "Continue to develop confidence with documentation.";
  firstThreeComplete.midpointInterview.achievementPlan = "Practice Supervisor to provide feedback during simulated handover.";
  console.assert(isMidpointReady(firstThreeComplete, true) === true, "Test failed: midpoint should be ready once supervisor development fields are complete");
  console.assert(getSectionValidationMessage(firstThreeComplete, "midpointInterview").length > 0, "Test failed: short midpoint entries should trigger a validation message");

  const assessorPage = cloneRecord(defaultRecord);
  assessorPage.planOfAction.dateInitiated = "2026-05-11";
  assessorPage.planOfAction.dateReview = "2026-05-12";
  assessorPage.planOfAction.objectivesAchieved = "Yes";
  assessorPage.planOfAction.natureOfConcern = "Concern noted";
  assessorPage.planOfAction.learnerNeeds = "Needs support";
  assessorPage.planOfAction.reviewComments = "Review complete";
  console.assert(isReady(assessorPage, "planOfAction") === true, "Test failed: plan of action should be ready when required fields are complete");

  const completed = cloneRecord(defaultRecord);
  completed.learningEnvironmentDetails.supervisorSigned = true;
  completed.orientation.supervisorSigned = true;
  completed.initialInterview.supervisorSigned = true;
  completed.reflectionProfessionalValues.supervisorSigned = true;
  completed.professionalValues.supervisorSigned = true;
  completed.professionalValues.assessorSigned = true;
  completed.planOfAction.assessorSigned = true;
  completed.midpointInterview.supervisorSigned = true;
  completed.finalInterview.assessorSigned = true;
  completed.serviceUserFeedback.supervisorSigned = true;
  completed.additionalFeedback.supervisorSigned = true;
  console.assert(progressPercent(completed) === 100, "Test failed: signed pages should make check-and-submit progress 100%");
  console.assert(supervisorTaskComplete(completed) === true, "Test failed: required supervisor task pages should mark the task complete");
}


runTests();
