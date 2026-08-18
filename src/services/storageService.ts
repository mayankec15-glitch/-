import * as XLSX from 'xlsx';
import { DynamicForm, FormSubmission, CircularNotice, UserProfile, ITIInstitution, FormField } from '../types';
import { INITIAL_FORMS, INITIAL_SUBMISSIONS, INITIAL_CIRCULARS } from '../data/initialData';
import { PRESET_USERS, SAMPLE_ITIS, ALL_UP_DISTRICTS, UP_DIVISIONS, UP_DISTRICTS_MAP } from '../data/upDistrictsData';

const STORAGE_KEYS = {
  FORMS: 'up_dt_forms_v1',
  SUBMISSIONS: 'up_dt_submissions_v1',
  CIRCULARS: 'up_dt_circulars_v1',
  CURRENT_USER: 'up_dt_active_user_v1',
  ITIS: 'up_dt_itis_v1',
  CUSTOM_FIELDS: 'up_dt_custom_fields_v1'
};

export class StorageService {
  // Get active user
  static getCurrentUser(): UserProfile {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return PRESET_USERS[0]; // Default to Director General
  }

  static setCurrentUser(user: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }

  static saveCurrentUser(user: UserProfile): void {
    this.setCurrentUser(user);
  }

  static saveForms(forms: DynamicForm[]): void {
    localStorage.setItem(STORAGE_KEYS.FORMS, JSON.stringify(forms));
  }

  static saveSubmissions(subs: FormSubmission[]): void {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(subs));
  }

  static saveCirculars(circs: CircularNotice[]): void {
    localStorage.setItem(STORAGE_KEYS.CIRCULARS, JSON.stringify(circs));
  }

  // Forms
  static getForms(): DynamicForm[] {
    const saved = localStorage.getItem(STORAGE_KEYS.FORMS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.FORMS, JSON.stringify(INITIAL_FORMS));
    return INITIAL_FORMS;
  }

  static saveForm(form: DynamicForm): void {
    const forms = this.getForms();
    const index = forms.findIndex((f) => f.id === form.id);
    if (index >= 0) {
      forms[index] = { ...form, updatedAt: new Date().toISOString() };
    } else {
      forms.unshift({ ...form, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    localStorage.setItem(STORAGE_KEYS.FORMS, JSON.stringify(forms));
  }

  static deleteForm(formId: string): void {
    const forms = this.getForms().filter((f) => f.id !== formId);
    localStorage.setItem(STORAGE_KEYS.FORMS, JSON.stringify(forms));
  }

  // Submissions
  static getSubmissions(): FormSubmission[] {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(INITIAL_SUBMISSIONS));
    return INITIAL_SUBMISSIONS;
  }

  static saveSubmission(sub: FormSubmission): void {
    const subs = this.getSubmissions();
    const index = subs.findIndex((s) => s.id === sub.id);
    if (index >= 0) {
      subs[index] = { ...sub, updatedAt: new Date().toISOString() };
    } else {
      subs.unshift({ ...sub, submittedAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(subs));
  }

  static updateSubmissionStatus(subId: string, status: FormSubmission['status'], reviewedBy: string, remarks?: string): void {
    const subs = this.getSubmissions();
    const index = subs.findIndex((s) => s.id === subId);
    if (index >= 0) {
      subs[index].status = status;
      subs[index].reviewedBy = reviewedBy;
      subs[index].reviewedAt = new Date().toISOString();
      if (remarks !== undefined) {
        subs[index].reviewRemarks = remarks;
      }
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(subs));
    }
  }

  // Circulars
  static getCirculars(): CircularNotice[] {
    const saved = localStorage.getItem(STORAGE_KEYS.CIRCULARS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.CIRCULARS, JSON.stringify(INITIAL_CIRCULARS));
    return INITIAL_CIRCULARS;
  }

  static saveCircular(circ: CircularNotice): void {
    const circs = this.getCirculars();
    const index = circs.findIndex((c) => c.id === circ.id);
    if (index >= 0) {
      circs[index] = circ;
    } else {
      circs.unshift(circ);
    }
    localStorage.setItem(STORAGE_KEYS.CIRCULARS, JSON.stringify(circs));
  }

  // ITIs
  static getITIs(): ITIInstitution[] {
    const saved = localStorage.getItem(STORAGE_KEYS.ITIS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.ITIS, JSON.stringify(SAMPLE_ITIS));
    return SAMPLE_ITIS;
  }

  // Export to Excel / Google Sheets compatible XLSX
  static exportSubmissionsToExcel(submissions: FormSubmission[], fileName = 'UP_Directorate_Submissions'): void {
    if (submissions.length === 0) return;

    const flattened = submissions.map((sub, index) => {
      const row: Record<string, any> = {
        'S.No (क्र.सं.)': index + 1,
        'Submission ID': sub.id,
        'Form Title (प्रपत्र का नाम)': sub.formTitle,
        'Section (अनुभाग)': sub.section,
        'ITI Code': sub.itiCode,
        'ITI Name (संस्थान का नाम)': sub.itiName,
        'ITI Type': sub.itiType,
        'District (जनपद)': sub.district,
        'Division (मंडल)': sub.division,
        'Submitted By': sub.submittedBy,
        'Submission Date/Time': new Date(sub.submittedAt).toLocaleString('en-IN'),
        'Status (स्थिति)': sub.status.toUpperCase(),
        'Reviewed By': sub.reviewedBy || 'Pending',
        'Review Remarks': sub.reviewRemarks || '',
        'Google Sheet Synced': sub.syncedToGoogleSheet ? 'YES' : 'NO'
      };

      // Flatten custom field data
      if (sub.data) {
        Object.entries(sub.data).forEach(([k, v]) => {
          row[`Field: ${k}`] = typeof v === 'object' ? JSON.stringify(v) : v;
        });
      }

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(flattened);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions_Data');
    XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
  }

  // Export to CSV
  static exportToCSV(data: any[], fileName = 'UP_Directorate_Export'): void {
    if (!data || data.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvContent = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Parse Uploaded Excel / CSV
  static parseSpreadsheetFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  }

  // Extract FormField schema automatically from uploaded spreadsheet
  static extractFieldsFromSpreadsheet(file: File): Promise<FormField[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // Get headers from first row
          const headerRows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          if (!headerRows || headerRows.length === 0) {
            throw new Error('स्प्रेडशीट में कोई कॉलम हेडर नहीं मिला (No column headers found in sheet)');
          }

          const rawHeaders = headerRows[0] || [];
          const sampleRows = headerRows.slice(1, 4); // analyze first 3 data rows for type inference

          const ignoredSystemHeaders = ['s.no', 'sno', 'sl no', 'timestamp', 'iti code', 'iti name', 'district', 'division', 'submitted by', 'status'];

          const extractedFields: FormField[] = [];
          let colIndex = 0;

          rawHeaders.forEach((header: any, idx: number) => {
            const headerStr = String(header || '').trim();
            if (!headerStr) return;

            // Skip standard ITI identity columns if already handled
            const lower = headerStr.toLowerCase();
            const isSystemHeader = ignoredSystemHeaders.some(sys => lower.includes(sys));
            
            const fieldId = headerStr
              .toLowerCase()
              .replace(/[^a-z0-9]/g, '_')
              .replace(/_+/g, '_')
              .replace(/^_|_$/g, '') || `col_${idx + 1}`;

            // Infer type from sample data
            let detectedType: FormField['type'] = 'text';
            let isNumeric = true;
            let hasDatePattern = false;

            for (const row of sampleRows) {
              const val = row[idx];
              if (val !== undefined && val !== null && val !== '') {
                if (typeof val === 'number') {
                  // check if it's an Excel date or regular number
                  isNumeric = true;
                } else if (typeof val === 'string') {
                  if (isNaN(Number(val))) {
                    isNumeric = false;
                  }
                  if (val.match(/^\d{4}-\d{2}-\d{2}$/) || val.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                    hasDatePattern = true;
                  }
                }
              }
            }

            if (lower.includes('date') || lower.includes('दिनांक') || hasDatePattern) {
              detectedType = 'date';
            } else if (lower.includes('amount') || lower.includes('cost') || lower.includes('budget') || lower.includes('व्यय') || lower.includes('₹') || lower.includes('rs')) {
              detectedType = 'currency';
            } else if (lower.includes('percentage') || lower.includes('प्रतिशत') || lower.includes('%')) {
              detectedType = 'percentage';
            } else if (lower.includes('count') || lower.includes('strength') || lower.includes('total') || lower.includes('संख्या') || lower.includes('seats') || lower.includes('trainees') || isNumeric) {
              detectedType = 'number';
            } else if (lower.includes('status') || lower.includes('compliance') || lower.includes('स्थिति') || lower.includes('grade')) {
              detectedType = 'select';
            } else if (lower.includes('remarks') || lower.includes('comment') || lower.includes('description') || lower.includes('टिप्पणी')) {
              detectedType = 'textarea';
            } else if (lower.includes('photo') || lower.includes('cctv') || lower.includes('doc') || lower.includes('certificate') || lower.includes('प्रमाणपत्र')) {
              detectedType = 'file';
            }

            const colLetter = String.fromCharCode(65 + (colIndex % 26));

            extractedFields.push({
              id: fieldId,
              label: headerStr,
              hindiLabel: headerStr,
              type: detectedType,
              required: !isSystemHeader,
              sheetColumnMapping: colLetter,
              options: detectedType === 'select' ? [
                { label: 'Yes / Full (हाँ / पूर्ण)', value: 'Yes' },
                { label: 'No / None (नहीं / शून्य)', value: 'No' },
                { label: 'Partial / In-Progress (आंशिक / प्रगति पर)', value: 'Partial' }
              ] : undefined,
              placeholder: `Enter ${headerStr}...`
            });

            colIndex++;
          });

          if (extractedFields.length === 0) {
            throw new Error('कोई मान्य कॉलम नहीं मिला (No valid columns could be extracted)');
          }

          resolve(extractedFields);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  }

  // Download Sample Blank Data Collection Excel Template
  static downloadSampleExcelTemplate(sectionName: string, formTitle: string): void {
    const sampleHeaders = [
      {
        'Reporting Date (रिपोर्टिंग दिनांक)': '2026-08-15',
        'Trade / Department Name (व्यवसाय का नाम)': 'Electrician (इलेक्ट्रीशियन)',
        'Sanctioned Seats (स्वीकृत सीटें)': 40,
        'Enrolled Trainees (प्रवेशित संख्या)': 38,
        'Biometric Attendance % (उपस्थिति %)': 95.5,
        'Workshop Machine AMC Status (मशीन स्थिति)': 'Functional (क्रियाशील)',
        'Expenditure Amount ₹ (व्यय धनराशि)': 25000,
        'GPS Geo Tagging Required (स्थान सत्यापन)': '26.8928, 80.9412',
        'Inspection Officer Remarks (टिप्पणी)': 'All trade labs inspected and verified.'
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleHeaders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Proforma_Template');
    XLSX.writeFile(workbook, `UP_Directorate_${sectionName}_Template.xlsx`);
  }

  // Google Apps Script generator for real 2-way Webhooks
  static generateGoogleAppsScript(form: DynamicForm): string {
    return `/**
 * Google Apps Script for Directorate of Training, UP Portal
 * Form: ${form.title} (${form.hindiTitle})
 * Section: ${form.section}
 *
 * Instructions:
 * 1. Open your target Google Sheet (e.g. "${form.googleSheetConfig?.sheetName || 'UP_Data_Collection'}")
 * 2. Click Extensions > Apps Script
 * 3. Replace all existing code with this script
 * 4. Click 'Deploy' > 'New Deployment' > Select 'Web app'
 * 5. Set 'Execute as': 'Me' and 'Who has access': 'Anyone'
 * 6. Copy the Web App URL and paste it into the Directorate Portal Google Sheet Settings!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var payload = JSON.parse(e.postData.contents);
    
    // Check if header row exists, if not write headers
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp", "Submission ID", "ITI Code", "ITI Name", "District", "Division",
        "Submitted By", "Status"${form.fields.map((f) => `, "${f.label} (${f.id})"`).join('')}
      ];
      sheet.appendRow(headers);
    }
    
    var rowData = [
      new Date(),
      payload.id || Utilities.getUuid(),
      payload.itiCode || "",
      payload.itiName || "",
      payload.district || "",
      payload.division || "",
      payload.submittedBy || "",
      payload.status || "Submitted"${form.fields.map((f) => `,\npayload.data ? (payload.data['${f.id}'] !== undefined ? payload.data['${f.id}'] : "") : ""`).join('')}
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "Data logged to UP Directorate Google Sheet successfully",
      "rowNumber": sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("UP Directorate of Training MIS Google Sheets Webhook is ACTIVE.");
}
`;
  }

  // Reset to default sample data
  static resetToDefaultData(): void {
    localStorage.setItem(STORAGE_KEYS.FORMS, JSON.stringify(INITIAL_FORMS));
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(INITIAL_SUBMISSIONS));
    localStorage.setItem(STORAGE_KEYS.CIRCULARS, JSON.stringify(INITIAL_CIRCULARS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(PRESET_USERS[0]));
    localStorage.setItem(STORAGE_KEYS.ITIS, JSON.stringify(SAMPLE_ITIS));
  }
}
