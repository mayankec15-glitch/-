import React, { useState } from 'react';
import { UserProfile, DynamicForm, FormField, FieldType, DirectorateSection, FormFrequency, ITIType } from '../types';
import { DIRECTORATE_SECTIONS, ALL_UP_DISTRICTS, UP_DIVISIONS } from '../data/upDistrictsData';
import { 
  Plus, 
  Trash2, 
  Save, 
  Layers, 
  FileSpreadsheet, 
  Check, 
  Sparkles, 
  HelpCircle, 
  MoveUp, 
  MoveDown,
  ExternalLink,
  Code,
  FileText,
  Upload,
  Download,
  Link2,
  Settings2,
  Calendar,
  Clock,
  MapPin,
  Camera,
  ShieldCheck,
  Building,
  Radio,
  FileCheck,
  Eye,
  AlertCircle
} from 'lucide-react';
import { StorageService } from '../services/storageService';

interface FormBuilderViewProps {
  currentUser: UserProfile;
  onSaveForm: (form: DynamicForm) => void;
  onNavigateToTab: (tabId: string) => void;
}

export type BuilderMode = 'spreadsheet' | 'google_form' | 'custom_fields';

export const FormBuilderView: React.FC<FormBuilderViewProps> = ({
  currentUser,
  onSaveForm,
  onNavigateToTab
}) => {
  // Mode selection
  const [builderMode, setBuilderMode] = useState<BuilderMode>('spreadsheet');

  // Form Basic Metadata
  const [title, setTitle] = useState('');
  const [hindiTitle, setHindiTitle] = useState('');
  const [description, setDescription] = useState('');
  const [section, setSection] = useState<DirectorateSection>(
    currentUser.section || 'admin_est'
  );
  const [frequency, setFrequency] = useState<FormFrequency>('daily');
  const [isMandatory, setIsMandatory] = useState(true);
  const [deadline, setDeadline] = useState<string>('');
  
  // Google Integration Config
  const [googleSheetName, setGoogleSheetName] = useState('');
  const [googleSheetId, setGoogleSheetId] = useState('');
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [googleFormUrl, setGoogleFormUrl] = useState('');
  
  // Target Audience Configuration
  const [targetScope, setTargetScope] = useState<'all_75' | 'specific_districts'>('all_75');
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [targetItiTypes, setTargetItiTypes] = useState<ITIType[]>([
    'Govt ITI', 'Govt Women ITI', 'Model ITI', 'Minority ITI', 'Private ITI'
  ]);

  // Dynamic Fields
  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'reporting_date',
      label: 'Reporting Date',
      hindiLabel: 'रिपोर्टिंग दिनांक',
      type: 'date',
      required: true,
      defaultValue: new Date().toISOString().split('T')[0],
      sheetColumnMapping: 'A'
    },
    {
      id: 'trade_name',
      label: 'Trade / Department',
      hindiLabel: 'व्यवसाय / अनुभाग का नाम',
      type: 'text',
      placeholder: 'e.g. Electrician / Fitter',
      required: true,
      sheetColumnMapping: 'B'
    },
    {
      id: 'total_count',
      label: 'Total Value / Count',
      hindiLabel: 'कुल संख्या / मान',
      type: 'number',
      placeholder: 'e.g. 100',
      required: true,
      sheetColumnMapping: 'C'
    },
    {
      id: 'compliance_status',
      label: 'Compliance Status',
      hindiLabel: 'अनुपालन स्थिति',
      type: 'select',
      required: true,
      options: [
        { label: 'Full Compliance (पूर्ण अनुपालन)', value: 'Full' },
        { label: 'Partial Compliance (आंशिक)', value: 'Partial' },
        { label: 'Pending Action (लंबित)', value: 'Pending' }
      ],
      sheetColumnMapping: 'D'
    },
    {
      id: 'remarks',
      label: 'Remarks / Observations',
      hindiLabel: 'विशेष टिप्पणी',
      type: 'textarea',
      placeholder: 'Enter inspection remarks...',
      required: false,
      sheetColumnMapping: 'E'
    }
  ]);

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Column auto-letter helper (A, B, C, D...)
  const getColLetter = (index: number) => {
    return String.fromCharCode(65 + (index % 26));
  };

  const handleAddField = () => {
    const newFieldId = `field_${Date.now()}`;
    const newCol = getColLetter(fields.length);
    const newField: FormField = {
      id: newFieldId,
      label: `Field ${fields.length + 1}`,
      hindiLabel: `फील्ड विवरण ${fields.length + 1}`,
      type: 'text',
      required: true,
      sheetColumnMapping: newCol
    };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (index: number) => {
    if (fields.length <= 1) {
      alert('कम से कम एक फील्ड अनिवार्य है (At least one field is required)');
      return;
    }
    const updated = fields.filter((_, i) => i !== index);
    updated.forEach((f, idx) => {
      f.sheetColumnMapping = getColLetter(idx);
    });
    setFields(updated);
  };

  const handleFieldPropertyChange = (index: number, prop: keyof FormField, value: any) => {
    const updated = [...fields];
    updated[index] = { ...updated[index], [prop]: value };
    setFields(updated);
  };

  const handleMoveField = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === fields.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const updated = [...fields];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    // Reassign column letters
    updated.forEach((f, idx) => {
      f.sheetColumnMapping = getColLetter(idx);
    });
    setFields(updated);
  };

  // Handle Upload of Excel / CSV to extract fields
  const handleSpreadsheetUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setIsProcessingFile(true);
      setUploadedFileName(file.name);

      try {
        const extracted = await StorageService.extractFieldsFromSpreadsheet(file);
        setFields(extracted);
        
        // Auto-fill title if empty
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
        if (!title) {
          setTitle(cleanName);
          setHindiTitle(`प्रपत्र: ${cleanName}`);
        }
        if (!googleSheetName) {
          setGoogleSheetName(cleanName.replace(/\s+/g, '_'));
        }

        setToastMsg(`सफलतापूर्वक आयात: "${file.name}" से ${extracted.length} कॉलम फील्ड तैयार किए गए!`);
        setTimeout(() => setToastMsg(null), 4000);
      } catch (err: any) {
        alert('स्प्रेडशीट विश्लेषण में त्रुटि (Spreadsheet Error): ' + err.message);
      } finally {
        setIsProcessingFile(false);
      }
    }
  };

  // Handle Download Sample Blank Template
  const handleDownloadTemplate = () => {
    const secMeta = DIRECTORATE_SECTIONS.find(s => s.id === section);
    StorageService.downloadSampleExcelTemplate(secMeta?.name || 'Section', title || 'Data_Proforma');
  };

  // Quick Template Injector
  const handleLoadTemplate = (templateType: 'biometric' | 'cctv_exam' | 'placement' | 'solar_infra' | 'budget_exp') => {
    if (templateType === 'biometric') {
      setTitle('Daily Shift Biometric & Faculty Attendance');
      setHindiTitle('दैनिक बायोमेट्रिक एवं अनुदेशक उपस्थिति प्रपत्र');
      setDescription('Daily log of trainee punch-in percentage, faculty presence, and power backup.');
      setSection('admin_est');
      setFrequency('daily');
      setGoogleSheetName('Daily_Biometric_Log_2026');
      setFields([
        { id: 'attendance_date', label: 'Attendance Date', hindiLabel: 'उपस्थिति दिनांक', type: 'date', required: true, defaultValue: new Date().toISOString().split('T')[0], sheetColumnMapping: 'A' },
        { id: 'shift', label: 'Shift (शिफ्ट)', hindiLabel: 'शिफ्ट', type: 'select', required: true, options: [{ label: 'Morning Shift (प्रातः कालीन)', value: 'Morning' }, { label: 'Evening Shift (सायं कालीन)', value: 'Evening' }], sheetColumnMapping: 'B' },
        { id: 'enrolled_trainees', label: 'Total Enrolled Trainees', hindiLabel: 'कुल नामांकित प्रशिक्षार्थी', type: 'number', required: true, sheetColumnMapping: 'C' },
        { id: 'present_biometric', label: 'Present in Biometric', hindiLabel: 'बायोमेट्रिक में उपस्थित', type: 'number', required: true, sheetColumnMapping: 'D' },
        { id: 'instructors_present', label: 'Instructors Present', hindiLabel: 'उपस्थित अनुदेशक संख्या', type: 'number', required: true, sheetColumnMapping: 'E' },
        { id: 'power_backup_status', label: 'Solar/Generator Backup Functional', hindiLabel: 'पावर बैकअप चालू स्थिति', type: 'select', required: true, options: [{ label: 'Operational (सक्रिय)', value: 'Yes' }, { label: 'Faulty (खराब)', value: 'No' }], sheetColumnMapping: 'F' },
        { id: 'geo_location', label: 'Principal GPS Geo-Tag', hindiLabel: 'प्रधानाचार्य लोकेशन', type: 'gps_location', required: true, sheetColumnMapping: 'G' }
      ]);
    } else if (templateType === 'cctv_exam') {
      setTitle('SCVT/NCVT AITT Practical Exam Center CCTV Audit');
      setHindiTitle('परीक्षा केंद्र सीसीटीवी एवं वर्कशॉप सामग्री सत्यापन');
      setDescription('Mandatory inspection of exam hall static IP camera live streaming and trade raw materials.');
      setSection('exam_cell');
      setFrequency('exam_cycle');
      setGoogleSheetName('Exam_Center_CCTV_Audit_2026');
      setFields([
        { id: 'audit_date', label: 'Inspection Date', hindiLabel: 'निरीक्षण दिनांक', type: 'date', required: true, defaultValue: new Date().toISOString().split('T')[0], sheetColumnMapping: 'A' },
        { id: 'cctv_cameras_count', label: 'Total CCTV Cameras Installed', hindiLabel: 'स्थापित सीसीटीवी कैमरे', type: 'number', required: true, sheetColumnMapping: 'B' },
        { id: 'ip_streaming_status', label: 'Static IP Streaming to Directorate', hindiLabel: 'मुख्यालय लाइव स्ट्रीमिंग स्थिति', type: 'select', required: true, options: [{ label: 'Live & Active (लाइव चालू)', value: 'Active' }, { label: 'Offline / Network Issue (ऑफलाइन)', value: 'Offline' }], sheetColumnMapping: 'C' },
        { id: 'dvr_recording_days', label: 'DVR Backup Capacity (Days)', hindiLabel: 'डीवीआर रिकॉर्डिंग क्षमता (दिन)', type: 'number', required: true, sheetColumnMapping: 'D' },
        { id: 'raw_material_readiness', label: 'Raw Material Stock for Practical Exam', hindiLabel: 'प्रैक्टिकल परीक्षा रॉ-मटेरियल स्टॉक', type: 'select', required: true, options: [{ label: '100% Sufficient (पूर्ण उपलब्ध)', value: 'Sufficient' }, { label: 'Deficient / Pending (कमी है)', value: 'Deficient' }], sheetColumnMapping: 'E' },
        { id: 'control_room_photo', label: 'CCTV Control Room Live Photo', hindiLabel: 'कंट्रोल रूम लाइव फोटो', type: 'file', required: true, sheetColumnMapping: 'F' }
      ]);
    } else if (templateType === 'placement') {
      setTitle('Dual System of Training (DST) & Industry MoU Tracker');
      setHindiTitle('डीएसटी एवं औद्योगिक संस्थान अनुबंध (MoU) प्रगति प्रपत्र');
      setDescription('Monthly return of registered industry partners and on-the-job training students.');
      setSection('apprenticeship');
      setFrequency('monthly');
      setGoogleSheetName('DST_Industry_MoU_Sheet');
      setFields([
        { id: 'reporting_month', label: 'Reporting Month', hindiLabel: 'रिपोर्टिंग माह', type: 'text', placeholder: 'e.g. August 2026', required: true, sheetColumnMapping: 'A' },
        { id: 'active_mous', label: 'Active Industry MoUs Count', hindiLabel: 'सक्रिय उद्योग अनुबंध (MoU)', type: 'number', required: true, sheetColumnMapping: 'B' },
        { id: 'pmnam_registered', label: 'PMNAM Apprenticeship Trainees Placed', hindiLabel: 'पीएमएनएएम अप्रेंटिसशिप प्रशिक्षु', type: 'number', required: true, sheetColumnMapping: 'C' },
        { id: 'stipend_avg', label: 'Average Monthly Stipend Paid ₹', hindiLabel: 'औसत मासिक स्टाइपेंड ₹', type: 'currency', required: true, sheetColumnMapping: 'D' },
        { id: 'ojt_partner_companies', label: 'Partner Industry Names', hindiLabel: 'अनुबंधित कंपनियों के नाम', type: 'textarea', required: true, sheetColumnMapping: 'E' }
      ]);
    } else if (templateType === 'budget_exp') {
      setTitle('Quarterly Machinery AMC & Lab Consumables Expenditure');
      setHindiTitle('त्रैमासिक मशीनरी अनुरक्षण (AMC) व उपभोग्य सामग्री व्यय');
      setDescription('Financial utilization certificate and procurement audit for trade labs.');
      setSection('accounts_fin');
      setFrequency('quarterly');
      setGoogleSheetName('Quarterly_Accounts_Budget_Log');
      setFields([
        { id: 'financial_quarter', label: 'Financial Quarter', hindiLabel: 'वित्तीय तिमाही', type: 'select', required: true, options: [{ label: 'Q1 (Apr - Jun)', value: 'Q1' }, { label: 'Q2 (Jul - Sep)', value: 'Q2' }, { label: 'Q3 (Oct - Dec)', value: 'Q3' }, { label: 'Q4 (Jan - Mar)', value: 'Q4' }], sheetColumnMapping: 'A' },
        { id: 'allocated_grant', label: 'State Allocated Grant ₹', hindiLabel: 'स्वीकृत राज्य अनुदान ₹', type: 'currency', required: true, sheetColumnMapping: 'B' },
        { id: 'expenditure_incurred', label: 'Actual Expenditure Incurred ₹', hindiLabel: 'वास्तविक व्यय धनराशि ₹', type: 'currency', required: true, sheetColumnMapping: 'C' },
        { id: 'unspent_balance', label: 'Unspent Balance Amount ₹', hindiLabel: 'अवशेष अप्रयुक्त धनराशि ₹', type: 'currency', required: true, sheetColumnMapping: 'D' },
        { id: 'utilization_cert', label: 'Utilization Certificate (UC) PDF', hindiLabel: 'उपयोगिता प्रमाण-पत्र (UC)', type: 'file', required: true, sheetColumnMapping: 'E' }
      ]);
    } else {
      setTitle('Solar Rooftop & Smart Lab Power Status');
      setHindiTitle('सोलर रूफटॉप ऊर्जा उत्पादन एवं स्मार्ट लैब स्थिति');
      setDescription('Monthly solar energy units generated and smart virtual class hours.');
      setSection('infra_store');
      setFrequency('monthly');
      setGoogleSheetName('Solar_Infra_Monthly');
      setFields([
        { id: 'solar_capacity_kw', label: 'Installed Solar Capacity (KW)', hindiLabel: 'सोलर क्षमता (किलोवाट)', type: 'number', required: true, sheetColumnMapping: 'A' },
        { id: 'units_generated', label: 'Total Units Generated (KWh)', hindiLabel: 'उत्पादित विद्युत यूनिट्स', type: 'number', required: true, sheetColumnMapping: 'B' },
        { id: 'grid_export_status', label: 'Net Metering Grid Export Active', hindiLabel: 'नेट मीटरिंग ग्रिड निर्यात', type: 'select', required: true, options: [{ label: 'Yes (हाँ)', value: 'Yes' }, { label: 'No (नहीं)', value: 'No' }], sheetColumnMapping: 'C' },
        { id: 'smart_class_hours', label: 'Smart Virtual Classroom Hours', hindiLabel: 'स्मार्ट क्लास संचालन घंटे', type: 'number', required: true, sheetColumnMapping: 'D' }
      ]);
    }
  };

  const handleSaveCustomForm = () => {
    if (!hindiTitle.trim() && !title.trim()) {
      alert('कृपया प्रपत्र का शीर्षक दर्ज करें (Please enter form title)');
      return;
    }

    const formId = `form_${section}_${Date.now().toString().slice(-6)}`;
    const finalSheetId = googleSheetId.trim() || `UP_DIRECTORATE_${Date.now().toString().slice(-6)}`;
    const finalSheetName = googleSheetName.trim() || `${(hindiTitle || title).slice(0, 25).replace(/\s+/g, '_')}_Data`;

    const newForm: DynamicForm = {
      id: formId,
      title: title.trim() || hindiTitle.trim(),
      hindiTitle: hindiTitle.trim() || title.trim(),
      description: description.trim() || 'Directorate official data collection requisition for field units.',
      section: section,
      frequency: frequency,
      category: builderMode === 'google_form' ? 'Google Form Requisition' : (builderMode === 'spreadsheet' ? 'Google Sheet Requisition' : 'Custom Field Proforma'),
      isActive: true,
      isMandatory: isMandatory,
      deadline: deadline || undefined,
      targetItiTypes: targetItiTypes,
      targetDistricts: targetScope === 'specific_districts' ? selectedDistricts : undefined,
      fields: fields,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: `${currentUser.name} (${currentUser.designation})`,
      googleSheetConfig: {
        sheetId: finalSheetId,
        sheetName: finalSheetName,
        sheetUrl: googleSheetUrl.trim() || `https://docs.google.com/spreadsheets/d/${finalSheetId}/edit`,
        autoSync: true,
        syncStatus: 'connected',
        lastSyncedAt: new Date().toISOString()
      },
      googleFormUrl: builderMode === 'google_form' ? (googleFormUrl.trim() || undefined) : undefined
    };

    onSaveForm(newForm);
    setToastMsg(`नया प्रपत्र "${newForm.hindiTitle}" प्रकाशित हो चुका है! यह अब उत्तर प्रदेश के सभी संबंधित क्षेत्रीय आईटीआई पोर्टल पर डेटा प्रविष्टि हेतु सक्रिय है।`);
    
    setTimeout(() => {
      setToastMsg(null);
      onNavigateToTab('data_collection');
    }, 2200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Directorate Requisition Banner */}
      <div className="bg-slate-850 p-6 rounded-2xl border border-slate-750 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-md border border-amber-500/30 uppercase flex items-center gap-1">
              <Building className="w-3.5 h-3.5" />
              <span>Section Data Requisition Studio</span>
            </span>
            <span className="text-xs text-slate-400">
              {currentUser.role === 'section_master' ? `लॉगिन: ${currentUser.name}` : 'Directorate HQ Hub'}
            </span>
          </div>
          <h2 className="text-xl font-black text-white mt-1.5 flex items-center gap-2">
            <span>फील्ड आईटीआई से डेटा संकलन हेतु प्रपत्र / गूगल शीट निर्माण</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Create and deploy daily/monthly data return requirements for all 75 Districts & 300+ Field ITIs. Choose between uploading an Excel/Google Sheet structure, linking a Google Form, or designing custom interactive fields.
          </p>
        </div>

        {/* Action Publish Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold text-xs cursor-pointer transition-all"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>लाइव पूर्वावलोकन (Preview)</span>
          </button>

          <button
            onClick={handleSaveCustomForm}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg shadow-amber-500/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>प्रपत्र प्रकाशित करें (Publish Requisition)</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {toastMsg && (
        <div className="p-4 bg-emerald-950/90 border border-emerald-500 rounded-xl text-emerald-200 text-xs flex items-center gap-3 shadow-2xl animate-fade-in">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="font-medium">{toastMsg}</div>
        </div>
      )}

      {/* Mode Selection Tabs (3 Pathways for Section Users) */}
      <div className="bg-slate-900 p-2 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-2">
        
        {/* Method 1: Spreadsheet Upload */}
        <button
          type="button"
          onClick={() => setBuilderMode('spreadsheet')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
            builderMode === 'spreadsheet'
              ? 'bg-emerald-950/50 border-emerald-500/80 ring-1 ring-emerald-500/30'
              : 'bg-slate-850 hover:bg-slate-800 border-slate-750'
          }`}
        >
          <div className={`p-2 rounded-lg ${builderMode === 'spreadsheet' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-emerald-400'}`}>
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>विधि 1: गूगल शीट / एक्सेल अपलोड</span>
              {builderMode === 'spreadsheet' && <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.2 rounded">सक्रिय</span>}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Upload XLSX/CSV to auto-create fields and connect live Google Sheet webhook.
            </p>
          </div>
        </button>

        {/* Method 2: Google Form Link */}
        <button
          type="button"
          onClick={() => setBuilderMode('google_form')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
            builderMode === 'google_form'
              ? 'bg-purple-950/50 border-purple-500/80 ring-1 ring-purple-500/30'
              : 'bg-slate-850 hover:bg-slate-800 border-slate-750'
          }`}
        >
          <div className={`p-2 rounded-lg ${builderMode === 'google_form' ? 'bg-purple-500 text-slate-950' : 'bg-slate-800 text-purple-400'}`}>
            <Link2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>विधि 2: गूगल फॉर्म लिंक व एम्बेड</span>
              {builderMode === 'google_form' && <span className="text-[10px] bg-purple-500 text-slate-950 font-bold px-1.5 py-0.2 rounded">सक्रिय</span>}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Paste Google Form link to collect data directly via integrated web portal view.
            </p>
          </div>
        </button>

        {/* Method 3: Visual Custom Field Builder */}
        <button
          type="button"
          onClick={() => setBuilderMode('custom_fields')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
            builderMode === 'custom_fields'
              ? 'bg-amber-950/50 border-amber-500/80 ring-1 ring-amber-500/30'
              : 'bg-slate-850 hover:bg-slate-800 border-slate-750'
          }`}
        >
          <div className={`p-2 rounded-lg ${builderMode === 'custom_fields' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-amber-400'}`}>
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>विधि 3: कस्टम प्रपत्र निर्माण (Custom Fields)</span>
              {builderMode === 'custom_fields' && <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded">सक्रिय</span>}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Design dynamic forms with GPS, document uploads, currency, numbers & dropdowns.
            </p>
          </div>
        </button>

      </div>

      {/* Mode Specific Configuration Block */}
      {builderMode === 'spreadsheet' && (
        <div className="p-5 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-800/40 rounded-2xl space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>गूगल शीट / एक्सेल टेम्पलेट से डेटा प्रपत्र बनाएं (Upload Spreadsheet Structure)</span>
              </h3>
              <p className="text-xs text-slate-300">
                Upload your Section's existing Excel file or Google Sheet CSV export. The system will automatically convert columns into portal input fields.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-emerald-300 border border-slate-700 text-xs font-semibold cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ब्लैंक टेम्पलेट डाउनलोड (.xlsx)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* File Upload Drop Area */}
            <div className="border-2 border-dashed border-emerald-800/60 hover:border-emerald-500 rounded-xl p-5 bg-slate-950/60 text-center flex flex-col items-center justify-center transition-all cursor-pointer">
              <input
                type="file"
                id="spreadsheet-upload-input"
                accept=".xlsx, .xls, .csv"
                onChange={handleSpreadsheetUpload}
                className="hidden"
              />
              <label htmlFor="spreadsheet-upload-input" className="cursor-pointer flex flex-col items-center w-full">
                <Upload className="w-8 h-8 text-emerald-400 mb-2 animate-bounce" />
                <span className="text-xs font-bold text-slate-200">
                  {uploadedFileName ? `अपलोड किया गया: ${uploadedFileName}` : 'एक्सेल फाइल चुनें अथवा यहाँ ड्रैग करें (.xlsx, .csv)'}
                </span>
                <span className="text-[11px] text-slate-400 mt-1">
                  स्वचालित रूप से कॉलम (Column A, B, C...) को फील्ड्स में बदल दिया जाएगा
                </span>
              </label>
            </div>

            {/* Direct Google Sheet Link Inputs */}
            <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Google Sheet Name (गूगल शीट का नाम):
                </label>
                <input
                  type="text"
                  value={googleSheetName}
                  onChange={(e) => setGoogleSheetName(e.target.value)}
                  placeholder="e.g. Exam_Cell_CCTV_Daily_Master"
                  className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Google Sheet URL / ID (वैकल्पिक):
                </label>
                <input
                  type="text"
                  value={googleSheetUrl}
                  onChange={(e) => setGoogleSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XR..."
                  className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

          </div>
        </div>
      )}

      {builderMode === 'google_form' && (
        <div className="p-5 bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-800/40 rounded-2xl space-y-4 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-purple-400" />
              <span>गूगल फॉर्म एकीकरण (Embed & Link Official Google Form)</span>
            </h3>
            <p className="text-xs text-slate-300">
              If your Directorate section already has a Google Form, paste the public link below. Field ITI principals can fill it directly through this portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-purple-200 block mb-1">
                Google Form Public Link (प्रपत्र यूआरएल): *
              </label>
              <input
                type="text"
                value={googleFormUrl}
                onChange={(e) => setGoogleFormUrl(e.target.value)}
                placeholder="https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform"
                className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Make sure 'Send' link has public viewing permissions enabled for field users.
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-purple-200 block mb-1">
                Linked Google Sheet Responses URL (प्रतिक्रिया शीट):
              </label>
              <input
                type="text"
                value={googleSheetUrl}
                onChange={(e) => setGoogleSheetUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Quick Directorate Template Injector */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>रेडीमेड मानक निदेशालय टेम्पलेट्स (Pre-configured Section Proformas):</span>
          </span>
          <span className="text-[11px] text-slate-500">1-क्लिक से प्रारूप लोड करें</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleLoadTemplate('biometric')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 cursor-pointer flex items-center gap-1.5"
          >
            <span>📋 दैनिक बायोमेट्रिक उपस्थिति (Admin & Est)</span>
          </button>
          <button
            type="button"
            onClick={() => handleLoadTemplate('cctv_exam')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 cursor-pointer flex items-center gap-1.5"
          >
            <span>📹 परीक्षा सीसीटीवी व रॉ मटेरियल (Exam Cell)</span>
          </button>
          <button
            type="button"
            onClick={() => handleLoadTemplate('placement')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 cursor-pointer flex items-center gap-1.5"
          >
            <span>🤝 डीएसटी व अप्रेंटिसशिप ट्रैकर (DST & Placement)</span>
          </button>
          <button
            type="button"
            onClick={() => handleLoadTemplate('budget_exp')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 cursor-pointer flex items-center gap-1.5"
          >
            <span>💰 त्रैमासिक बजट व मशीनरी एएमसी (Accounts)</span>
          </button>
          <button
            type="button"
            onClick={() => handleLoadTemplate('solar_infra')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 cursor-pointer flex items-center gap-1.5"
          >
            <span>☀️ सोलर रूफटॉप व स्मार्ट लैब (Infra & Store)</span>
          </button>
        </div>
      </div>

      {/* Step 1: Form Metadata & Directorate Section Settings */}
      <div className="bg-slate-850 rounded-2xl border border-slate-750 p-5 space-y-4 shadow-sm">
        <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
          <Settings2 className="w-4 h-4" />
          <span>1. प्रपत्र मूल विवरण एवं अनुभाग स्वामित्व (Form Metadata & Section Ownership)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Hindi Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              प्रपत्र का शीर्षक (हिन्दी में) / Hindi Title: *
            </label>
            <input
              type="text"
              value={hindiTitle}
              onChange={(e) => setHindiTitle(e.target.value)}
              placeholder="e.g. दैनिक बायोमेट्रिक एवं अनुदेशक उपस्थिति प्रपत्र"
              className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* English Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Form Title (English):
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Daily Shift Biometric Attendance Proforma"
              className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Section Owner */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              प्रभारी अनुभाग (Directorate Section): *
            </label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value as DirectorateSection)}
              className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {DIRECTORATE_SECTIONS.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.hindiName} ({sec.name})
                </option>
              ))}
            </select>
          </div>

          {/* Frequency & Deadlines */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                आवधिकता (Frequency):
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as FormFrequency)}
                className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="daily">दैनिक (Daily Return)</option>
                <option value="weekly">साप्ताहिक (Weekly)</option>
                <option value="monthly">मासिक (Monthly)</option>
                <option value="quarterly">त्रैमासिक (Quarterly)</option>
                <option value="exam_cycle">परीक्षा चक्र (Exam Cycle)</option>
                <option value="ad_hoc">तात्कालिक / विशेष (Urgent/Ad-hoc)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                अंतिम तिथि (Deadline):
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              विस्तृत निर्देश एवं उद्देश्य (Instructions for Field ITIs):
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter official guidelines for field principals..."
              className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>
      </div>

      {/* Step 2: Target Audience Configuration (Districts & ITI Types) */}
      <div className="bg-slate-850 rounded-2xl border border-slate-750 p-5 space-y-4 shadow-sm">
        <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-2">
          <Building className="w-4 h-4" />
          <span>2. लक्षित संस्थान एवं जनपद चयन (Target Field ITIs & Geographic Scope)</span>
        </h3>

        <div className="space-y-4">
          
          {/* Target ITI Types */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              लक्षित संस्थान श्रेणियां (Target Institute Categories):
            </label>
            <div className="flex flex-wrap gap-2">
              {(['Govt ITI', 'Govt Women ITI', 'Model ITI', 'Minority ITI', 'Private ITI'] as ITIType[]).map((type) => {
                const isSelected = targetItiTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        if (targetItiTypes.length > 1) {
                          setTargetItiTypes(targetItiTypes.filter(t => t !== type));
                        }
                      } else {
                        setTargetItiTypes([...targetItiTypes, type]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                        : 'bg-slate-900 border-slate-750 text-slate-400 hover:text-white'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Districts Scope */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              जनपदीय कवरेज (District Scope):
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                <input
                  type="radio"
                  name="district_scope"
                  checked={targetScope === 'all_75'}
                  onChange={() => setTargetScope('all_75')}
                  className="accent-amber-500"
                />
                <span className="font-semibold">उत्तर प्रदेश के सभी 75 जनपद (All 75 Districts of UP)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                <input
                  type="radio"
                  name="district_scope"
                  checked={targetScope === 'specific_districts'}
                  onChange={() => setTargetScope('specific_districts')}
                  className="accent-amber-500"
                />
                <span className="font-semibold">विशिष्ट जनपद / मंडल चुनें (Specific Districts Only)</span>
              </label>
            </div>

            {targetScope === 'specific_districts' && (
              <div className="mt-3 p-3 bg-slate-900 rounded-xl border border-slate-800 max-h-48 overflow-y-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {ALL_UP_DISTRICTS.map((dist) => {
                  const checked = selectedDistricts.includes(dist);
                  return (
                    <label key={dist} className="flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDistricts([...selectedDistricts, dist]);
                          } else {
                            setSelectedDistricts(selectedDistricts.filter(d => d !== dist));
                          }
                        }}
                        className="accent-amber-500 rounded"
                      />
                      <span>{dist}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Step 3: Dynamic Form Fields Schema & Column Mapper */}
      <div className="bg-slate-850 rounded-2xl border border-slate-750 p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>3. प्रपत्र फील्ड्स एवं गूगल शीट कॉलम मैपिंग (Dynamic Fields & Sheet Column Mapping)</span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Define the questions and return parameters for field ITIs. Each field is automatically mapped to a Google Sheet Column (A, B, C...).
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddField}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 text-xs font-bold cursor-pointer transition-colors shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>नया फील्ड जोड़ें (Add Field)</span>
          </button>
        </div>

        {/* Fields List */}
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 transition-all hover:border-slate-700"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                
                {/* Field Index & Column Tag */}
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black flex items-center justify-center font-mono">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-300">
                    {field.hindiLabel || field.label || `Field ${index + 1}`}
                  </span>
                  <span className="text-[11px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold border border-slate-700">
                    Sheet Col: {field.sheetColumnMapping || getColLetter(index)}
                  </span>
                </div>

                {/* Move & Delete Controls */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveField(index, 'up')}
                    disabled={index === 0}
                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveField(index, 'down')}
                    disabled={index === fields.length - 1}
                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 cursor-pointer ml-1"
                    title="Delete Field"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Field Property Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                
                {/* Field Label (Hindi) */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    फील्ड का नाम (हिन्दी) *
                  </label>
                  <input
                    type="text"
                    value={field.hindiLabel || ''}
                    onChange={(e) => handleFieldPropertyChange(index, 'hindiLabel', e.target.value)}
                    placeholder="e.g. बायोमेट्रिक उपस्थिति %"
                    className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Field Label (English) */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Field Label (English)
                  </label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => handleFieldPropertyChange(index, 'label', e.target.value)}
                    placeholder="e.g. Biometric Attendance %"
                    className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Field Type */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    डेटा प्रकार (Field Type) *
                  </label>
                  <select
                    value={field.type}
                    onChange={(e) => handleFieldPropertyChange(index, 'type', e.target.value as FieldType)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="text">टेक्स्ट (Text / String)</option>
                    <option value="number">संख्या (Numeric / Count)</option>
                    <option value="textarea">विस्तृत विवरण (Textarea / Long text)</option>
                    <option value="select">ड्रॉपडाउन विकल्प (Dropdown Select)</option>
                    <option value="date">दिनांक (Date)</option>
                    <option value="time">समय (Time)</option>
                    <option value="currency">धनराशि ₹ (Currency in Rupees)</option>
                    <option value="percentage">प्रतिशत % (Percentage)</option>
                    <option value="file">दस्तावेज / फोटो अपलोड (File / Photo)</option>
                    <option value="gps_location">स्थान जीपीएस टैगिंग (GPS Location Tag)</option>
                  </select>
                </div>

                {/* Required Flag & Sheet Column */}
                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => handleFieldPropertyChange(index, 'required', e.target.checked)}
                      className="accent-amber-500 rounded"
                    />
                    <span>अनिवार्य (Mandatory)</span>
                  </label>

                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <span>Col:</span>
                    <input
                      type="text"
                      maxLength={2}
                      value={field.sheetColumnMapping || getColLetter(index)}
                      onChange={(e) => handleFieldPropertyChange(index, 'sheetColumnMapping', e.target.value.toUpperCase())}
                      className="w-8 bg-slate-950 border border-slate-750 rounded text-center text-xs font-mono font-bold text-amber-300 py-0.5"
                    />
                  </div>
                </div>

              </div>

              {/* If Dropdown Select: Edit Options */}
              {field.type === 'select' && (
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400">
                    ड्रॉपडाउन विकल्प (Comma separated options):
                  </div>
                  <input
                    type="text"
                    defaultValue={field.options?.map(o => o.label).join(', ') || 'Yes (हाँ), No (नहीं), Pending (लंबित)'}
                    onChange={(e) => {
                      const opts = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      handleFieldPropertyChange(index, 'options', opts.map(o => ({ label: o, value: o })));
                    }}
                    placeholder="Option 1, Option 2, Option 3"
                    className="w-full bg-slate-900 border border-slate-750 rounded-lg px-2.5 py-1 text-xs text-white"
                  />
                </div>
              )}

            </div>
          ))}
        </div>

      </div>

      {/* Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            <div className="p-4 bg-slate-850 border-b border-slate-750 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  प्रपत्र लाइव पूर्वावलोकन (Field Unit Live Preview)
                </h3>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="p-3 bg-slate-850 rounded-xl border border-slate-750">
                <h4 className="text-base font-bold text-white">{hindiTitle || title || 'Untitled Proforma'}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{description || 'Official Directorate Requisition'}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-semibold">
                    {section.toUpperCase()}
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    Frequency: {frequency}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {fields.map((f, i) => (
                  <div key={i} className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 block">
                      {f.hindiLabel || f.label} {f.required && <span className="text-rose-400">*</span>}
                    </label>
                    {f.type === 'textarea' ? (
                      <textarea disabled placeholder={f.placeholder || 'Enter text...'} className="w-full bg-slate-950 border border-slate-750 rounded-lg p-2 text-xs opacity-60" rows={2} />
                    ) : f.type === 'select' ? (
                      <select disabled className="w-full bg-slate-950 border border-slate-750 rounded-lg p-2 text-xs opacity-60">
                        {f.options?.map((o, idx) => (
                          <option key={idx}>{o.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input disabled type={f.type === 'number' || f.type === 'currency' ? 'number' : f.type} placeholder={f.placeholder || 'Enter value...'} className="w-full bg-slate-950 border border-slate-750 rounded-lg p-2 text-xs opacity-60" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-850 border-t border-slate-750 flex items-center justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-750 cursor-pointer"
              >
                बंद करें (Close Preview)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
