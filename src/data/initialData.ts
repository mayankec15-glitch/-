import { DynamicForm, FormSubmission, CircularNotice } from '../types';

export const INITIAL_FORMS: DynamicForm[] = [
  {
    id: 'form_daily_attendance',
    title: 'Daily Trainee & Instructor Biometric Attendance Log',
    hindiTitle: 'दैनिक प्रशिक्षार्थी एवं अनुदेशक बायोमेट्रिक उपस्थिति विवरण',
    description: 'Daily collection of biometric attendance data for all enrolled trades, instructor availability, and absenteeism reasons across UP ITIs.',
    section: 'admin_est',
    frequency: 'daily',
    category: 'Attendance & Staffing',
    isActive: true,
    isMandatory: true,
    targetItiTypes: ['Govt ITI', 'Govt Women ITI', 'Model ITI', 'Minority ITI', 'Private ITI'],
    createdBy: 'Shri R.K. Srivastava (JD Admin)',
    createdAt: '2026-08-01T08:00:00Z',
    updatedAt: '2026-08-13T07:30:00Z',
    googleSheetConfig: {
      sheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      sheetName: 'UP_Daily_Biometric_Attendance_2026',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
      autoSync: true,
      syncStatus: 'connected',
      lastSyncedAt: '2026-08-13T12:00:00Z',
      webhookUrl: 'https://script.google.com/macros/s/AKfycbz_UP_TRAINING_ATTENDANCE_API/exec'
    },
    googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc9UP_TRAINING_ATTENDANCE_FORM/viewform',
    fields: [
      {
        id: 'reporting_date',
        label: 'Date of Reporting',
        hindiLabel: 'रिपोर्टिंग दिनांक',
        type: 'date',
        required: true,
        defaultValue: new Date().toISOString().split('T')[0],
        sheetColumnMapping: 'A'
      },
      {
        id: 'total_enrolled_trainees',
        label: 'Total Enrolled Trainees (Current Shift)',
        hindiLabel: 'कुल नामांकित प्रशिक्षार्थी (वर्तमान पाली)',
        type: 'number',
        placeholder: 'e.g. 840',
        required: true,
        sheetColumnMapping: 'B'
      },
      {
        id: 'present_trainees',
        label: 'Trainees Present via Biometric',
        hindiLabel: 'बायोमेट्रिक उपस्थित प्रशिक्षार्थी संख्या',
        type: 'number',
        placeholder: 'e.g. 782',
        required: true,
        sheetColumnMapping: 'C'
      },
      {
        id: 'total_instructors',
        label: 'Total Sanctioned / Deployed Instructors',
        hindiLabel: 'कुल तैनात अनुदेशक संख्या',
        type: 'number',
        placeholder: 'e.g. 34',
        required: true,
        sheetColumnMapping: 'D'
      },
      {
        id: 'present_instructors',
        label: 'Instructors Present Today',
        hindiLabel: 'आज उपस्थित अनुदेशक संख्या',
        type: 'number',
        placeholder: 'e.g. 32',
        required: true,
        sheetColumnMapping: 'E'
      },
      {
        id: 'biometric_device_working',
        label: 'Are all Biometric AEPS / Fingerprint Terminals functional?',
        hindiLabel: 'क्या सभी बायोमेट्रिक मशीनें क्रियाशील हैं?',
        type: 'radio',
        required: true,
        options: [
          { label: 'Yes, 100% working (हाँ, पूर्णतया क्रियाशील)', value: 'Yes' },
          { label: 'Partial breakdown (आंशिक खराबी)', value: 'Partial' },
          { label: 'No / Offline (नहीं / ऑफलाइन)', value: 'No' }
        ],
        defaultValue: 'Yes',
        sheetColumnMapping: 'F'
      },
      {
        id: 'cctv_live_status',
        label: 'Classroom & Workshop CCTV Live Feed Status',
        hindiLabel: 'सीसीटीवी लाइव फीड स्थिति',
        type: 'select',
        required: true,
        options: [
          { label: 'Online & Streaming to Directorate Cloud', value: 'Streaming Online' },
          { label: 'Local Recording Only (NVR Online)', value: 'Local NVR Active' },
          { label: 'Network Issue / Temporary Offline', value: 'Network Offline' }
        ],
        sheetColumnMapping: 'G'
      },
      {
        id: 'remarks_or_leave_reasons',
        label: 'Absenteeism Reasons / Special Remarks',
        hindiLabel: 'अनुपस्थिति का कारण / विशेष टिप्पणी',
        type: 'textarea',
        placeholder: 'Enter reason for faculty on leave, industrial tour, or weather delays...',
        required: false,
        sheetColumnMapping: 'H'
      }
    ]
  },
  {
    id: 'form_exam_center_readiness',
    title: 'SCVT/NCVT AITT Practical Exam Center Readiness & CCTV Audit',
    hindiTitle: 'अखिल भारतीय व्यावसायिक परीक्षा (AITT) केंद्र तैयारी व सीसीटीवी ऑडिट',
    description: 'Mandatory verification of workshop raw material, tool availability, CCTV streaming URL, generator power backup, and invigilator rosters for state exams.',
    section: 'exam_cell',
    frequency: 'exam_cycle',
    category: 'Examinations & Centers',
    isActive: true,
    isMandatory: true,
    targetItiTypes: ['Govt ITI', 'Govt Women ITI', 'Model ITI', 'Private ITI'],
    createdBy: 'Dr. Alok Kumar Verma (CoE)',
    createdAt: '2026-08-05T10:00:00Z',
    updatedAt: '2026-08-12T14:00:00Z',
    googleSheetConfig: {
      sheetId: '1Z9xK_EXAM_CELL_UP_READINESS_2026',
      sheetName: 'Exam_Center_Readiness_Sheet',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/1Z9xK_EXAM_CELL_UP_READINESS_2026/edit',
      autoSync: true,
      syncStatus: 'connected',
      lastSyncedAt: '2026-08-13T11:45:00Z',
      webhookUrl: 'https://script.google.com/macros/s/AKfycbw_EXAM_CELL_WEBHOOK/exec'
    },
    fields: [
      {
        id: 'exam_center_code',
        label: 'DGT / SCVT Exam Center Code',
        hindiLabel: 'परीक्षा केंद्र कोड',
        type: 'text',
        placeholder: 'e.g. EXAM-UP-0901',
        required: true,
        sheetColumnMapping: 'A'
      },
      {
        id: 'total_assigned_candidates',
        label: 'Total Registered Candidates for Practical/Theory',
        hindiLabel: 'कुल पंजीकृत परीक्षार्थियों की संख्या',
        type: 'number',
        placeholder: 'e.g. 540',
        required: true,
        sheetColumnMapping: 'B'
      },
      {
        id: 'raw_material_readiness',
        label: 'Engineering/Non-Engg Trades Raw Material Availability',
        hindiLabel: 'वर्कशॉप रॉ मटेरियल व टूल्स उपलब्धता',
        type: 'select',
        required: true,
        options: [
          { label: '100% procured and verified as per DGT list (पूर्ण उपलब्ध)', value: '100% Complete' },
          { label: 'Under procurement / Partial (80%+ उपलब्ध)', value: 'Partial 80%' },
          { label: 'Shortage of critical consumables (कमी है)', value: 'Shortage' }
        ],
        sheetColumnMapping: 'C'
      },
      {
        id: 'cctv_ip_url',
        label: 'Static IP / RTSP Cloud Stream Link for Exam Rooms',
        hindiLabel: 'परीक्षा कक्ष सीसीटीवी स्टेटिक IP / स्ट्रीमिंग लिंक',
        type: 'text',
        placeholder: 'rtsp://admin:pass@117.240.x.x:554/live or Directorate Portal URL',
        required: true,
        sheetColumnMapping: 'D'
      },
      {
        id: 'power_backup_generator_kva',
        label: 'Silent Generator / DG Set Capacity (KVA)',
        hindiLabel: 'डीजल जनरेटर बैकअप क्षमता (KVA)',
        type: 'number',
        placeholder: 'e.g. 25 KVA',
        required: true,
        unit: 'KVA',
        sheetColumnMapping: 'E'
      },
      {
        id: 'external_observer_deputed',
        label: 'External Examiner & Flying Squad Contact Details',
        hindiLabel: 'बाह्य परीक्षक व उड़नदस्ता विवरण',
        type: 'textarea',
        placeholder: 'Name, Designation, Mobile number of deputed Nodal Examiner...',
        required: true,
        sheetColumnMapping: 'F'
      },
      {
        id: 'center_undertaking_photo',
        label: 'Upload Principal Signed Undertaking / Readiness Photo',
        hindiLabel: 'प्रधानाचार्य हस्ताक्षरित घोषणा पत्र / फोटो',
        type: 'file',
        required: false,
        sheetColumnMapping: 'G'
      }
    ]
  },
  {
    id: 'form_pm_apprenticeship_mela',
    title: 'PM National Apprenticeship Mela (PMNAM) & Campus Drive Daily Tracker',
    hindiTitle: 'प्रधानमंत्री राष्ट्रीय शिक्षुता मेला (PMNAM) एवं कैंपस चयन प्रगति',
    description: 'Weekly and Mela-day recording of industry participants, registered ITI pass-outs, on-the-spot offer letters issued, and NAPS contract generation.',
    section: 'apprenticeship',
    frequency: 'weekly',
    category: 'Placement & OJT',
    isActive: true,
    isMandatory: true,
    targetItiTypes: ['Govt ITI', 'Govt Women ITI', 'Model ITI'],
    createdBy: 'Shri Manoj Kumar Singh (DD Apprenticeship)',
    createdAt: '2026-08-02T09:00:00Z',
    updatedAt: '2026-08-13T06:00:00Z',
    googleSheetConfig: {
      sheetId: '1APP_MELA_UP_SHEET_DATA_2026',
      sheetName: 'PMNAM_Consolidated_UP',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/1APP_MELA_UP_SHEET_DATA_2026/edit',
      autoSync: true,
      syncStatus: 'connected',
      lastSyncedAt: '2026-08-13T10:15:00Z',
      webhookUrl: 'https://script.google.com/macros/s/AKfycbx_APPRENTICE_MELA_UP/exec'
    },
    fields: [
      {
        id: 'mela_date',
        label: 'Drive / Apprenticeship Mela Date',
        hindiLabel: 'मेला / रोजगार दिवस दिनांक',
        type: 'date',
        required: true,
        defaultValue: new Date().toISOString().split('T')[0],
        sheetColumnMapping: 'A'
      },
      {
        id: 'participating_industries_count',
        label: 'Number of Participating Establishments / Industries (MSME + Large)',
        hindiLabel: 'प्रतिभागी उद्योगों/कंपनियों की संख्या',
        type: 'number',
        placeholder: 'e.g. 18',
        required: true,
        sheetColumnMapping: 'B'
      },
      {
        id: 'participating_candidates',
        label: 'Total Trainees / Pass-outs Participated',
        hindiLabel: 'प्रतिभाग करने वाले अभ्यर्थियों की संख्या',
        type: 'number',
        placeholder: 'e.g. 420',
        required: true,
        sheetColumnMapping: 'C'
      },
      {
        id: 'on_spot_shortlisted_count',
        label: 'Candidates Shortlisted / On-the-spot Offer Letters Given',
        hindiLabel: 'चयनित / ऑन-द-स्पॉट ऑफर लेटर प्राप्त अभ्यर्थी',
        type: 'number',
        placeholder: 'e.g. 145',
        required: true,
        sheetColumnMapping: 'D'
      },
      {
        id: 'average_stipend_offered',
        label: 'Average Monthly Stipend Offered (INR)',
        hindiLabel: 'औसत मासिक स्टाइपेंड (रुपये में)',
        type: 'currency',
        placeholder: 'e.g. 11500',
        required: true,
        unit: '₹',
        sheetColumnMapping: 'E'
      },
      {
        id: 'key_employers_list',
        label: 'Names of Top Recruiting Companies (e.g. Tata Motors, Maruti, L&T, Havells)',
        hindiLabel: 'प्रमुख भर्तीकर्ता कंपनियों के नाम',
        type: 'textarea',
        placeholder: 'List companies and top recruited trades (Electrician, Fitter, Turner, Welder, COPA)...',
        required: true,
        sheetColumnMapping: 'F'
      }
    ]
  },
  {
    id: 'form_workshop_machinery_amc',
    title: 'Workshop Machinery, Smart Lab & Solar Rooftop Status Log',
    hindiTitle: 'वर्कशॉप मशीनरी स्थिति, स्मार्ट लैब व सोलर रूफटॉप ऊर्जा रिपोर्ट',
    description: 'Monthly inventory condition of CNC machines, lathe/milling, simulator labs, and solar rooftop generation compliance for Directorate Store & Infra cell.',
    section: 'infra_store',
    frequency: 'monthly',
    category: 'Machinery & Stores',
    isActive: true,
    isMandatory: false,
    targetItiTypes: ['Govt ITI', 'Model ITI', 'Govt Women ITI'],
    createdBy: 'Er. Sudhir Tripathi (JD Infra)',
    createdAt: '2026-08-01T11:00:00Z',
    updatedAt: '2026-08-11T16:00:00Z',
    googleSheetConfig: {
      sheetId: '1INFRA_MACHINERY_AMC_UP_2026',
      sheetName: 'Machinery_Infra_Status',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/1INFRA_MACHINERY_AMC_UP_2026/edit',
      autoSync: true,
      syncStatus: 'idle'
    },
    fields: [
      {
        id: 'total_major_machines',
        label: 'Total Major Machinery/Equipment Count in Institute',
        hindiLabel: 'कुल प्रमुख मशीनों व उपकरणों की संख्या',
        type: 'number',
        placeholder: 'e.g. 142',
        required: true,
        sheetColumnMapping: 'A'
      },
      {
        id: 'fully_functional_machines',
        label: 'Machines in 100% Working Order',
        hindiLabel: 'पूर्णतः क्रियाशील मशीनों की संख्या',
        type: 'number',
        placeholder: 'e.g. 138',
        required: true,
        sheetColumnMapping: 'B'
      },
      {
        id: 'breakdown_machines_count',
        label: 'Machines Under Breakdown / Needing Repair (AMC)',
        hindiLabel: 'खराब / मरम्मत योग्य मशीनें',
        type: 'number',
        placeholder: 'e.g. 4',
        required: true,
        sheetColumnMapping: 'C'
      },
      {
        id: 'solar_rooftop_kw',
        label: 'Grid Connected Solar Power Capacity (KWp)',
        hindiLabel: 'सोलर रूफटॉप क्षमता (किलोवाट)',
        type: 'number',
        placeholder: 'e.g. 50 KWp',
        required: true,
        unit: 'KWp',
        sheetColumnMapping: 'D'
      },
      {
        id: 'smart_classrooms_active',
        label: 'Number of Active Smart Virtual Classrooms / D-Class',
        hindiLabel: 'सक्रिय स्मार्ट क्लासरूम संख्या',
        type: 'number',
        placeholder: 'e.g. 4',
        required: true,
        sheetColumnMapping: 'E'
      },
      {
        id: 'critical_parts_requirement',
        label: 'Description of Critical Spare Parts Required from Directorate Store',
        hindiLabel: 'निदेशालय भण्डार से आवश्यक स्पेयर पार्ट्स का विवरण',
        type: 'textarea',
        placeholder: 'Specify machine model, make, serial number, and required parts...',
        required: false,
        sheetColumnMapping: 'F'
      }
    ]
  },
  {
    id: 'form_surprise_inspection_report',
    title: 'Surprise Quality Inspection & DGT Parameter Audit Report',
    hindiTitle: 'आकस्मिक गुणवत्ता निरीक्षण एवं डीजीटी मानक ऑडिट आख्या',
    description: 'Standardized mobile-friendly field inspection report filled by Nodal Officers and Divisional Joint Directors with Geotagging & photo upload.',
    section: 'inspection_qa',
    frequency: 'ad_hoc',
    category: 'Quality & Vigilance',
    isActive: true,
    isMandatory: false,
    targetItiTypes: ['Govt ITI', 'Govt Women ITI', 'Model ITI', 'Minority ITI', 'Private ITI'],
    createdBy: 'Shri Brajesh Yadav (JD Inspection)',
    createdAt: '2026-08-04T12:00:00Z',
    updatedAt: '2026-08-13T09:00:00Z',
    googleSheetConfig: {
      sheetId: '1INSPECTION_QA_AUDIT_LOG_2026',
      sheetName: 'Surprise_Inspections_UP',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/1INSPECTION_QA_AUDIT_LOG_2026/edit',
      autoSync: true,
      syncStatus: 'connected',
      lastSyncedAt: '2026-08-13T12:30:00Z'
    },
    fields: [
      {
        id: 'inspection_datetime',
        label: 'Inspection Date & Time',
        hindiLabel: 'निरीक्षण दिनांक एवं समय',
        type: 'date',
        required: true,
        defaultValue: new Date().toISOString().split('T')[0],
        sheetColumnMapping: 'A'
      },
      {
        id: 'inspecting_officer_name',
        label: 'Name & Designation of Inspecting Officer',
        hindiLabel: 'निरीक्षण अधिकारी का नाम व पद',
        type: 'text',
        placeholder: 'e.g. Er. Sudhir Tripathi, Joint Director',
        required: true,
        sheetColumnMapping: 'B'
      },
      {
        id: 'workshop_cleanliness_rating',
        label: 'Workshop Cleanliness, 5S & Safety Rating (1 to 5 Stars)',
        hindiLabel: 'वर्कशॉप स्वच्छता, 5S व सुरक्षा रेटिंग',
        type: 'select',
        required: true,
        options: [
          { label: '⭐⭐⭐⭐⭐ 5/5 - Exemplary (उत्कृष्ट)', value: '5 Stars' },
          { label: '⭐⭐⭐⭐ 4/5 - Good (अच्छा)', value: '4 Stars' },
          { label: '⭐⭐⭐ 3/5 - Satisfactory (संतोषजनक)', value: '3 Stars' },
          { label: '⭐⭐ 2/5 - Needs Improvement (सुधार आवश्यक)', value: '2 Stars' },
          { label: '⭐ 1/5 - Unsatisfactory (असंतोषजनक / नोटिस जारी)', value: '1 Star' }
        ],
        sheetColumnMapping: 'C'
      },
      {
        id: 'trainee_headcount_verified',
        label: 'Actual Physical Trainee Headcount vs Biometric Count',
        hindiLabel: 'भौतिक रूप से उपस्थित छात्र संख्या',
        type: 'number',
        placeholder: 'e.g. 760',
        required: true,
        sheetColumnMapping: 'D'
      },
      {
        id: 'fire_safety_compliance',
        label: 'Fire Safety Extinguishers & First Aid Kits Certified?',
        hindiLabel: 'अग्निशमन यंत्र व प्राथमिक चिकित्सा किट वैध हैं?',
        type: 'radio',
        required: true,
        options: [
          { label: 'Yes, All Extinguishers under valid AMC', value: 'Yes Valid' },
          { label: 'Expired / Partial Replacement needed', value: 'Expired / Action needed' }
        ],
        defaultValue: 'Yes Valid',
        sheetColumnMapping: 'E'
      },
      {
        id: 'gps_inspection_point',
        label: 'GPS Geotagged Location of Main Workshop / Gate',
        hindiLabel: 'जीपीएस लोकेशन (अक्षांश व देशांतर)',
        type: 'gps_location',
        placeholder: 'Latitude: 26.8928, Longitude: 80.9412',
        required: true,
        sheetColumnMapping: 'F'
      },
      {
        id: 'inspection_findings_summary',
        label: 'Detailed Inspection Findings & Directives Issued to Principal',
        hindiLabel: 'विस्तृत निरीक्षण आख्या एवं दिए गए निर्देश',
        type: 'textarea',
        placeholder: 'Write key observations, deficiencies noted, and time given for rectification...',
        required: true,
        sheetColumnMapping: 'G'
      }
    ]
  },
  {
    id: 'form_budget_scholarship_utilization',
    title: 'Trainee Scholarship Verification & Recurring Grant Utilization',
    hindiTitle: 'प्रशिक्षार्थी छात्रवृत्ति सत्यापन एवं आवर्ती अनुदान उपभोग प्रमाण',
    description: 'Accounts & Finance cell verification for state scholarship portal (Saksham) authentication and quarterly non-salary budget expenditure.',
    section: 'accounts_fin',
    frequency: 'quarterly',
    category: 'Finance & Accounts',
    isActive: true,
    isMandatory: true,
    targetItiTypes: ['Govt ITI', 'Govt Women ITI', 'Model ITI', 'Minority ITI', 'Private ITI'],
    createdBy: 'Smt. Vandana Tiwari (CAO Finance)',
    createdAt: '2026-08-03T10:00:00Z',
    updatedAt: '2026-08-10T12:00:00Z',
    googleSheetConfig: {
      sheetId: '1FINANCE_SCHOLARSHIP_UP_2026',
      sheetName: 'Scholarship_Accounts_Log',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/1FINANCE_SCHOLARSHIP_UP_2026/edit',
      autoSync: true,
      syncStatus: 'idle'
    },
    fields: [
      {
        id: 'total_scholarship_applicants',
        label: 'Total Scholarship Applications Received on UP Saksham Portal',
        hindiLabel: 'यूपी सक्षम पोर्टल पर प्राप्त कुल छात्रवृत्ति आवेदन',
        type: 'number',
        placeholder: 'e.g. 620',
        required: true,
        sheetColumnMapping: 'A'
      },
      {
        id: 'verified_forwarded_applications',
        label: 'Applications Verified & Digitally Forwarded to DWO',
        hindiLabel: 'सत्यापित एवं जिला समाज कल्याण अधिकारी को अग्रसारित आवेदन',
        type: 'number',
        placeholder: 'e.g. 614',
        required: true,
        sheetColumnMapping: 'B'
      },
      {
        id: 'grant_received_amount',
        label: 'Quarterly Recurring Grant Received from Directorate (INR)',
        hindiLabel: 'निदेशालय से प्राप्त त्रैमासिक आवर्ती अनुदान (रुपये)',
        type: 'currency',
        placeholder: 'e.g. 450000',
        required: true,
        unit: '₹',
        sheetColumnMapping: 'C'
      },
      {
        id: 'grant_utilized_amount',
        label: 'Expenditure Incurred & UC Submitted (INR)',
        hindiLabel: 'उपभोग की गई धनराशि एवं उपयोगिता प्रमाण पत्र (रुपये)',
        type: 'currency',
        placeholder: 'e.g. 412000',
        required: true,
        unit: '₹',
        sheetColumnMapping: 'D'
      },
      {
        id: 'audit_para_pending_count',
        label: 'Number of Unsettled AG / Internal Audit Paras',
        hindiLabel: 'लंबित ए.जी. / आंतरिक ऑडिट आपत्तियों की संख्या',
        type: 'number',
        placeholder: 'e.g. 0',
        required: true,
        defaultValue: 0,
        sheetColumnMapping: 'E'
      }
    ]
  }
];

export const INITIAL_SUBMISSIONS: FormSubmission[] = [
  {
    id: 'sub_101',
    formId: 'form_daily_attendance',
    formTitle: 'Daily Trainee & Instructor Biometric Attendance Log',
    section: 'admin_est',
    itiCode: 'ITI0901',
    itiName: 'Govt. ITI Aliganj, Lucknow',
    itiType: 'Govt ITI',
    district: 'Lucknow',
    division: 'Lucknow',
    submittedBy: 'Shri Rajesh Ram (Principal)',
    submittedByEmail: 'iti.aliganj@up.gov.in',
    submittedAt: '2026-08-13T09:15:00Z',
    updatedAt: '2026-08-13T10:00:00Z',
    status: 'verified',
    reviewedBy: 'Shri R.K. Srivastava (JD Admin)',
    reviewedAt: '2026-08-13T10:30:00Z',
    reviewRemarks: 'Biometric records verified against Directorate AEPS server. Attendance 93.5% compliant.',
    syncedToGoogleSheet: true,
    syncedAt: '2026-08-13T10:31:00Z',
    data: {
      reporting_date: '2026-08-13',
      total_enrolled_trainees: 840,
      present_trainees: 785,
      total_instructors: 34,
      present_instructors: 33,
      biometric_device_working: 'Yes',
      cctv_live_status: 'Online & Streaming to Directorate Cloud',
      remarks_or_leave_reasons: 'One instructor on sanctioned medical leave. Rest all workshops running at full capacity.'
    },
    geoCoordinates: {
      latitude: 26.8928,
      longitude: 80.9412,
      address: 'Aliganj, Lucknow, Uttar Pradesh'
    }
  },
  {
    id: 'sub_102',
    formId: 'form_daily_attendance',
    formTitle: 'Daily Trainee & Instructor Biometric Attendance Log',
    section: 'admin_est',
    itiCode: 'ITI1401',
    itiName: 'Govt. ITI Pandu Nagar, Kanpur',
    itiType: 'Model ITI',
    district: 'Kanpur Nagar',
    division: 'Kanpur',
    submittedBy: 'Er. Anand Mishra (Principal)',
    submittedByEmail: 'iti.pandunagar@up.gov.in',
    submittedAt: '2026-08-13T09:40:00Z',
    updatedAt: '2026-08-13T09:40:00Z',
    status: 'verified',
    reviewedBy: 'Shri R.K. Srivastava (JD Admin)',
    reviewedAt: '2026-08-13T11:00:00Z',
    reviewRemarks: 'Excellent attendance. Model ITI parameters fulfilled.',
    syncedToGoogleSheet: true,
    syncedAt: '2026-08-13T11:02:00Z',
    data: {
      reporting_date: '2026-08-13',
      total_enrolled_trainees: 1120,
      present_trainees: 1048,
      total_instructors: 42,
      present_instructors: 41,
      biometric_device_working: 'Yes',
      cctv_live_status: 'Online & Streaming to Directorate Cloud',
      remarks_or_leave_reasons: 'All 32 trade workshops operational with active practical batches.'
    },
    geoCoordinates: {
      latitude: 26.4735,
      longitude: 80.3012,
      address: 'Pandu Nagar, Kanpur, Uttar Pradesh'
    }
  },
  {
    id: 'sub_103',
    formId: 'form_exam_center_readiness',
    formTitle: 'SCVT/NCVT AITT Practical Exam Center Readiness & CCTV Audit',
    section: 'exam_cell',
    itiCode: 'ITI6701',
    itiName: 'Govt. ITI Karaundi, Varanasi',
    itiType: 'Govt ITI',
    district: 'Varanasi',
    division: 'Varanasi',
    submittedBy: 'Shri Awadhesh Yadav (Principal)',
    submittedByEmail: 'iti.karaundi@up.gov.in',
    submittedAt: '2026-08-13T08:30:00Z',
    updatedAt: '2026-08-13T08:30:00Z',
    status: 'submitted',
    syncedToGoogleSheet: true,
    syncedAt: '2026-08-13T08:35:00Z',
    data: {
      exam_center_code: 'EXAM-UP-6701',
      total_assigned_candidates: 480,
      raw_material_readiness: '100% Complete',
      cctv_ip_url: 'rtsp://admin:VnsExam2026@117.240.12.88:554/ch01',
      power_backup_generator_kva: 30,
      external_observer_deputed: 'Shri S.N. Singh, Principal ITI Chandauli deputed as External Center Superintendent.',
      center_undertaking_photo: 'readiness_undertaking_varanasi_signed.pdf'
    }
  },
  {
    id: 'sub_104',
    formId: 'form_pm_apprenticeship_mela',
    formTitle: 'PM National Apprenticeship Mela (PMNAM) & Campus Drive Daily Tracker',
    section: 'apprenticeship',
    itiCode: 'ITI5101',
    itiName: 'Govt. ITI Naini, Prayagraj',
    itiType: 'Govt ITI',
    district: 'Prayagraj',
    division: 'Prayagraj',
    submittedBy: 'Shri Dinesh Chandra (Principal)',
    submittedByEmail: 'iti.naini@up.gov.in',
    submittedAt: '2026-08-12T16:45:00Z',
    updatedAt: '2026-08-12T16:45:00Z',
    status: 'verified',
    reviewedBy: 'Shri Manoj Kumar Singh (DD Apprenticeship)',
    reviewedAt: '2026-08-13T09:00:00Z',
    reviewRemarks: 'Good turnout. Ensure all 110 selected candidates are onboarded on the NAPS apprenticeshipindia.gov.in portal by Friday.',
    syncedToGoogleSheet: true,
    syncedAt: '2026-08-13T09:05:00Z',
    data: {
      mela_date: '2026-08-12',
      participating_industries_count: 14,
      participating_candidates: 360,
      on_spot_shortlisted_count: 110,
      average_stipend_offered: 12000,
      key_employers_list: 'Areva T&D Naini, Bharat Pumps & Compressors, Schneider Electric, Havells India, local MSME auto clusters.'
    }
  },
  {
    id: 'sub_105',
    formId: 'form_daily_attendance',
    formTitle: 'Daily Trainee & Instructor Biometric Attendance Log',
    section: 'admin_est',
    itiCode: 'ITI3201',
    itiName: 'Govt. ITI Chargawan, Gorakhpur',
    itiType: 'Govt ITI',
    district: 'Gorakhpur',
    division: 'Gorakhpur',
    submittedBy: 'Shri Suresh Pandey (Principal)',
    submittedByEmail: 'iti.gorakhpur@up.gov.in',
    submittedAt: '2026-08-13T10:10:00Z',
    updatedAt: '2026-08-13T10:10:00Z',
    status: 'submitted',
    syncedToGoogleSheet: true,
    data: {
      reporting_date: '2026-08-13',
      total_enrolled_trainees: 790,
      present_trainees: 724,
      total_instructors: 28,
      present_instructors: 27,
      biometric_device_working: 'Yes',
      cctv_live_status: 'Online & Streaming to Directorate Cloud',
      remarks_or_leave_reasons: 'Heavy monsoon morning caused slight delay in first period; full strength in second half.'
    }
  },
  {
    id: 'sub_106',
    formId: 'form_surprise_inspection_report',
    formTitle: 'Surprise Quality Inspection & DGT Parameter Audit Report',
    section: 'inspection_qa',
    itiCode: 'PVT0988',
    itiName: 'Sir Syed Private ITI, Lucknow',
    itiType: 'Private ITI',
    district: 'Lucknow',
    division: 'Lucknow',
    submittedBy: 'Shri Brajesh Yadav (JD Inspection)',
    submittedByEmail: 'inspection.training@up.gov.in',
    submittedAt: '2026-08-12T15:30:00Z',
    updatedAt: '2026-08-12T15:30:00Z',
    status: 'revision_requested',
    reviewedBy: 'Shri Kunal Silku, IAS (DG Training)',
    reviewedAt: '2026-08-13T08:00:00Z',
    reviewRemarks: 'Discrepancy in Fitter workshop floor area and biometric logs. Show cause notice issued to management.',
    syncedToGoogleSheet: true,
    data: {
      inspection_datetime: '2026-08-12',
      inspecting_officer_name: 'Shri Brajesh Yadav, Joint Director (Inspection)',
      workshop_cleanliness_rating: '2 Stars',
      trainee_headcount_verified: 190,
      fire_safety_compliance: 'Expired / Action needed',
      gps_inspection_point: 'Lat: 26.8500, Long: 80.9500',
      inspection_findings_summary: 'Fire extinguishers expired in May 2026. 4 lathe machines non-functional. 15 days given for rectification before SCVT de-affiliation proceedings.'
    }
  }
];

export const INITIAL_CIRCULARS: CircularNotice[] = [
  {
    id: 'circ_2026_108',
    letterNumber: 'DT-UP/MIS/2026/108',
    title: 'Mandatory Real-Time Google Sheets Sync of Daily Biometric Attendance',
    hindiTitle: 'दैनिक बायोमेट्रिक उपस्थिति का गूगल शीट एवं पोर्टल पर अनिवार्य रियल-टाइम अंकन',
    section: 'admin_est',
    issueDate: '2026-08-12',
    deadlineDate: '2026-08-16',
    priority: 'urgent',
    linkedFormId: 'form_daily_attendance',
    summary: 'All Principals of 75 districts must ensure daily attendance submission by 11:30 AM without fail. Directorate automated Google Sheet webhook monitors compliance in real-time.',
    signatory: 'Director General of Training, UP'
  },
  {
    id: 'circ_2026_112',
    letterNumber: 'DT-UP/EXAM/AITT/2026/112',
    title: 'Submission of Practical Exam Center Readiness & Static CCTV RTSP Links',
    hindiTitle: 'व्यावसायिक परीक्षा केंद्र तैयारी एवं स्टेटिक सीसीटीवी आरटीएसपी लिंक प्रेषण',
    section: 'exam_cell',
    issueDate: '2026-08-10',
    deadlineDate: '2026-08-15',
    priority: 'immediate',
    linkedFormId: 'form_exam_center_readiness',
    summary: 'All designated NCVT/SCVT exam centers must fill the online readiness proforma and link their IP cameras to the Directorate central control room.',
    signatory: 'Controller of Examinations, SCVT/NCVT UP'
  },
  {
    id: 'circ_2026_115',
    letterNumber: 'DT-UP/APPR/PMNAM/2026/115',
    title: 'Organizing State-wide Pradhan Mantri National Apprenticeship Mela (PMNAM)',
    hindiTitle: 'प्रदेशव्यापी प्रधानमंत्री राष्ट्रीय शिक्षुता मेला आयोजन एवं ऑनलाइन डेटा प्रविष्टि',
    section: 'apprenticeship',
    issueDate: '2026-08-08',
    deadlineDate: '2026-08-20',
    priority: 'normal',
    linkedFormId: 'form_pm_apprenticeship_mela',
    summary: 'Nodal ITIs to invite minimum 15 local MSMEs and large manufacturing units. On-the-spot selection data must be entered into the PMNAM module.',
    signatory: 'Deputy Director (Apprenticeship & DST)'
  }
];
