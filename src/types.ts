// UP Directorate of Training - MIS & Data Collection Portal Types

export type UserRole = 'directorate_admin' | 'section_master' | 'iti_principal' | 'nodal_officer' | 'public_auditor';

export type DirectorateSection = 
  | 'admin_est'      // Administration & Establishment (प्रशासन एवं स्थापना)
  | 'exam_cell'      // SCVT / NCVT Examination & Certification (परीक्षा एवं प्रमाणन)
  | 'apprenticeship' // Apprenticeship, Placement & OJT (प्रशिक्षुता एवं प्लेसमेंट)
  | 'accounts_fin'   // Accounts & Finance / Budget (लेखा एवं वित्त)
  | 'infra_store'    // Infrastructure, Machinery & Procurement (आधारभूत ढांचा एवं क्रय)
  | 'inspection_qa'  // Inspection & Quality Assurance (निरीक्षण एवं गुणवत्ता)
  | 'it_mis';        // IT & MIS Cell (आई.टी. एवं एम.आई.एस.)

export type ITIType = 'Govt ITI' | 'Govt Women ITI' | 'Model ITI' | 'Minority ITI' | 'Private ITI';

export interface UserProfile {
  id: string;
  name: string;
  hindiName: string;
  designation: string;
  hindiDesignation: string;
  role: UserRole;
  section?: DirectorateSection;
  itiCode?: string;
  itiName?: string;
  district?: string;
  division?: string;
  phone?: string;
  email: string;
  avatarUrl?: string;
}

export type FieldType = 
  | 'text'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'file'
  | 'gps_location'
  | 'currency'
  | 'percentage';

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  label: string;
  hindiLabel?: string;
  type: FieldType;
  placeholder?: string;
  required: boolean;
  options?: FormFieldOption[];
  defaultValue?: any;
  validationRule?: string;
  sheetColumnMapping?: string; // e.g. 'A', 'B', 'C'
  unit?: string;
  helpText?: string;
}

export type FormFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'ad_hoc' | 'exam_cycle';

export interface DynamicForm {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  section: DirectorateSection;
  frequency: FormFrequency;
  category: string;
  isActive: boolean;
  deadline?: string;
  fields: FormField[];
  googleSheetConfig?: GoogleSheetConfig;
  googleFormUrl?: string;
  targetItiTypes: ITIType[];
  targetDistricts?: string[]; // empty means all 75 districts
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  isMandatory: boolean;
}

export interface GoogleSheetConfig {
  sheetId: string;
  sheetName: string;
  sheetUrl: string;
  autoSync: boolean;
  lastSyncedAt?: string;
  syncStatus?: 'connected' | 'error' | 'syncing' | 'idle';
  webhookUrl?: string;
  syncFrequencyMinutes?: number;
}

export type SubmissionStatus = 'draft' | 'submitted' | 'verified' | 'rejected' | 'revision_requested';

export interface FormSubmission {
  id: string;
  formId: string;
  formTitle: string;
  section: DirectorateSection;
  itiCode: string;
  itiName: string;
  itiType: ITIType;
  district: string;
  division: string;
  submittedBy: string;
  submittedByEmail: string;
  submittedAt: string;
  updatedAt: string;
  data: Record<string, any>;
  attachments?: Array<{ name: string; url: string; size?: string }>;
  status: SubmissionStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewRemarks?: string;
  syncedToGoogleSheet: boolean;
  syncedAt?: string;
  geoCoordinates?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
    address?: string;
  };
}

export interface CircularNotice {
  id: string;
  letterNumber: string;
  title: string;
  hindiTitle: string;
  section: DirectorateSection;
  issueDate: string;
  deadlineDate?: string;
  priority: 'normal' | 'urgent' | 'immediate';
  linkedFormId?: string;
  summary: string;
  signatory: string;
  attachmentUrl?: string;
  isReadByCurrentIti?: boolean;
}

export interface ITIInstitution {
  code: string;
  name: string;
  hindiName: string;
  type: ITIType;
  district: string;
  division: string;
  principalName: string;
  contactMobile: string;
  email: string;
  totalSeats: number;
  activeTrades: number;
  complianceScore: number;
  latitude: number;
  longitude: number;
}

export interface SectionMetadata {
  id: DirectorateSection;
  name: string;
  hindiName: string;
  officerInCharge: string;
  designation: string;
  iconName: string;
  colorTheme: string;
  badgeCount?: number;
  description: string;
}

export interface DistrictSummary {
  district: string;
  division: string;
  totalItis: number;
  submittedToday: number;
  pendingToday: number;
  complianceRate: number;
}
