export const STORAGE_KEY = "sprd-simulation-record-v9-reactive";
export const AUTO_ASSESSOR_NAME = "Chris Doogan";

export const VICTORIA_LEARNING_NEEDS = [
  "I am enthusiastic and motivated to make the most of my first placement experience. As a Part One student, I understand that this placement is an opportunity for me to observe, ask questions, build confidence and begin developing my professional identity as a student nurse.",
  "",
  "During this placement, I would like to:",
  "",
  "- Develop my confidence when communicating with service users, carers and members of the multidisciplinary team.",
  "- Practise introducing myself clearly and explaining my role as a student nurse.",
  "- Use open and closed questions to gather information in a person-centred way.",
  "- Observe how nurses build therapeutic relationships while maintaining professional boundaries.",
  "- Observe and assist with basic clinical procedures and care tasks under appropriate supervision.",
  "- Develop my understanding of assessment, care planning and documentation.",
  "- Learn how risk assessments are completed and how risk is reviewed when a person's presentation changes.",
  "- Understand the importance of patient safety, infection prevention and escalating concerns.",
  "- Observe how nurses prioritise care and manage competing demands during a shift.",
  "- Engage in health promotion and patient education opportunities where appropriate.",
  "- Develop my awareness of safeguarding, consent, capacity and confidentiality in practice.",
  "- Participate in multidisciplinary team discussions to understand different professional roles and responsibilities.",
  "- Seek feedback from Practice Supervisors and use this to reflect on my progress.",
  "- Begin to link my practice experiences to the NMC Code, professional values and Part One proficiencies.",
  "- Build confidence in recognising my own learning needs and asking for support when I am unsure.",
  "",
  "I am looking forward to learning from the team and using feedback to improve throughout the placement."
].join("\n");

export const VICTORIA_PROFESSIONAL_VALUES_REFLECTION = [
  "During the first part of my placement, I have tried to demonstrate the professional values expected of a student nurse by being respectful, polite and willing to learn. I have introduced myself clearly, listened carefully to feedback and asked questions when I have been unsure.",
  "",
  "I have observed how nurses maintain privacy, dignity and confidentiality, and I am beginning to understand how these values influence every interaction with people, families and colleagues. I have also recognised the importance of being honest about my own level of knowledge and seeking support before undertaking any activity.",
  "",
  "I feel I am developing confidence in communicating with others and working as part of the wider team. I want to continue building my confidence, particularly in linking my learning to the NMC Code and explaining how professional values are demonstrated in day-to-day practice."
].join("\n");

export const VICTORIA_MIDPOINT_LEARNER_REFLECTION = {
  knowledge: [
    "I feel that my knowledge has started to develop well during the first part of placement. I am beginning to understand the importance of assessment, documentation, communication, infection prevention, confidentiality and escalation of concerns.",
    "",
    "I have been able to link some of my learning to the NMC Code and to the professional values expected of student nurses. I still need support to apply theory confidently to practice, but I am asking questions and using feedback to develop my understanding."
  ].join("\n"),
  skills: [
    "I have started to develop my communication skills by introducing myself clearly, listening to people and practising the use of open and closed questions. I have observed care being delivered and have begun to understand how nurses prioritise care and work safely.",
    "",
    "I would like to continue developing confidence with documentation, basic observations, handover and explaining my role as a student nurse. I am aware that I am still at an early stage and need supervision, but I am keen to practise skills appropriately when opportunities arise."
  ].join("\n"),
  attitudes: [
    "I have tried to show enthusiasm, respect and professionalism throughout placement. I have been punctual, polite and willing to learn, and I have responded positively to feedback from staff.",
    "",
    "I understand the importance of maintaining dignity, confidentiality and professional boundaries. I am motivated to keep improving and to build confidence while working within my scope as a Part One student."
  ].join("\n"),
  supervisorComments: [
    "I feel that I have settled into placement and have made a positive start. I have enjoyed learning from the team and observing how nurses communicate, assess needs and support safe care.",
    "",
    "At this stage, I would value further feedback on my communication, documentation and ability to link practice experiences to the NMC Code and Part One proficiencies. I am keen to continue developing and to take more opportunities to participate under supervision."
  ].join("\n")
};

export const orientationItems = [
  ["generalOrientation", "A general orientation to the simulated placement setting has been undertaken"],
  ["fireProcedures", "Local fire procedures have been explained"],
  ["alarmsExitsExtinguishers", "The learner has been shown the fire alarm, fire exits and fire extinguishers"],
  ["resusPolicy", "Resuscitation policy and procedures have been explained"],
  ["resusEquipment", "Resuscitation equipment has been shown and explained"],
  ["emergencyHelp", "The learner knows how to summon help in an emergency"],
  ["localPolicies", "The learner is aware of where to find local policies"],
  ["governance", "The learner has been made aware of information governance requirements"],
  ["shiftsMealsReporting", "Shift times, meal times and reporting sick processes have been explained"],
  ["professionalRole", "The learner is aware of their professional role in practice"],
  ["safeguarding", "Policy regarding safeguarding has been explained"],
  ["raisingConcerns", "The learner is aware of the policy and process of raising concerns"],
  ["loneWorking", "Lone working policy has been explained, where applicable"],
  ["reasonableAdjustments", "Risk assessment and reasonable adjustments have been discussed, where disclosed"],
  ["movingHandling", "Moving and handling equipment has been shown"],
  ["medicalDevices", "Medical devices used in the simulated placement area have been shown"]
];

export const professionalValueStatements = [
  "The learner maintains confidentiality in accordance with the NMC Code.",
  "The learner is non-judgemental, respectful and courteous.",
  "The learner maintains privacy and dignity, gains consent and advocates on behalf of people.",
  "The learner is caring, compassionate and sensitive to the needs of others.",
  "The learner understands their professional responsibility in adopting and promoting a healthy lifestyle.",
  "The learner maintains consistent, safe and person-centred practice.",
  "The learner works effectively within the multidisciplinary team.",
  "The learner works within their scope, seeking support when needed.",
  "The learner demonstrates openness, candour, trustworthiness and integrity.",
  "The learner reports concerns appropriately, including safeguarding concerns.",
  "The learner listens, seeks clarification and carries out instructions safely.",
  "The learner recognises limits of knowledge, skills and professional boundaries.",
  "The learner follows local policy relating to presentation and dress code.",
  "The learner demonstrates an appropriate professional attitude regarding punctuality and communication.",
  "The learner demonstrates self-awareness and recognises their own emotions and those of others."
];

export const ratingOptions = ["Very Happy", "Happy", "I'm not sure", "Unhappy", "Very Unhappy"];
export const pvMidpointOptions = ["Progressing", "Not Achieved", "Not Assessed"];
export const pvFinalOptions = ["Achieved", "Not Achieved", "Not Assessed"];

export const defaultRecord = {
  learnerName: "Victoria Hughes-Smith",
  learnerPart: "Part One",
  placementNumber: "Placement 1",
  learningEnvironmentDetails: {
    placementName: "Mary Seacole Simulation Suite",
    organisation: "University of Salford",
    fromDate: "",
    toDate: "",
    placementTelephone: "",
    placementEmailOne: "",
    pefName: "Chris Doogan",
    pefDesignation: "PEF / Practice Education Link Nurse",
    pefEmail: "",
    supervisorName: "",
    supervisorDesignation: "Practice Supervisor",
    supervisorEmail: "",
    assessorName: "Daniel Vaughan-Davies",
    assessorDesignation: "Practice Assessor",
    assessorEmail: "",
    academicAssessorName: "Becca Richardson",
    academicAssessorDesignation: "Academic Assessor",
    academicAssessorEmail: "",
    supervisorSigned: false,
    locked: false
  },
  orientation: {
    localFireProcedurePhone: "",
    resuscitationPolicyPhone: "",
    items: Object.fromEntries(orientationItems.map(([key]) => [key, false])),
    supervisorSigned: false,
    locked: false
  },
  initialInterview: {
    learningNeeds: VICTORIA_LEARNING_NEEDS,
    learningPlan: "",
    achievementPlan: "",
    assessorAgreed: false,
    supervisorSigned: false,
    locked: false
  },
  reflectionProfessionalValues: {
    reflection: "",
    supervisorSigned: false,
    locked: false
  },
  professionalValues: {
    values: Object.fromEntries(professionalValueStatements.map((_, index) => [`pv${index + 1}`, { mid: "", final: "" }])),
    supervisorSigned: false,
    assessorSigned: false,
    locked: false
  },
  planOfAction: {
    dateInitiated: "",
    dateReview: "",
    objectivesAchieved: "",
    natureOfConcern: "",
    learnerNeeds: "",
    reviewComments: "",
    supportAvailable: "",
    assessorSigned: false,
    locked: false
  },
  midpointInterview: {
    knowledge: "",
    skills: "",
    attitudes: "",
    supervisorComments: "",
    learningNeeds: "",
    achievementPlan: "",
    supervisorSigned: false,
    locked: false
  },
  finalInterview: {
    knowledge: "",
    skills: "",
    attitudes: "",
    supervisorComments: "",
    learningNeeds: "",
    achievementPlan: "",
    planRequired: "",
    academicAssessorInformed: "",
    assessorSigned: false,
    locked: false
  },
  serviceUserFeedback: {
    respondentType: "",
    cared: "",
    listened: "",
    understood: "",
    talked: "",
    respect: "",
    didWell: "",
    couldImprove: "",
    supervisorSigned: false,
    locked: false
  },
  additionalFeedback: {
    feedbackType: "",
    communicationFeedback: "",
    nameDesignation: "",
    supervisorSigned: false,
    locked: false
  }
};

export const placementFields = [
  ["placementName", "Placement", false],
  ["organisation", "Organisation", false],
  ["fromDate", "From", false],
  ["toDate", "To", false],
  ["placementTelephone", "Placement telephone number", false],
  ["placementEmailOne", "Placement contact email", false]
];

export const contactSections = [
  { heading: "PEF / Practice Education Link Nurse", fields: [["pefName", "Name", false], ["pefDesignation", "Designation", false], ["pefEmail", "Contact email address", false]] },
  { heading: "Practice Supervisor Details", fields: [["supervisorName", "Name", true], ["supervisorDesignation", "Designation", true], ["supervisorEmail", "Contact email address", true]] },
  { heading: "Practice Assessor Details", fields: [["assessorName", "Name", false], ["assessorDesignation", "Designation", false], ["assessorEmail", "Contact email address", false]] },
  { heading: "Academic Assessor Details", fields: [["academicAssessorName", "Name", false], ["academicAssessorDesignation", "Designation", false], ["academicAssessorEmail", "Contact email address", false]] }
];
