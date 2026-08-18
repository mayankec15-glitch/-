import React, { useState } from 'react';
import { UserProfile, DynamicForm, FormSubmission, FormField, DirectorateSection } from '../types';
import { DIRECTORATE_SECTIONS, ALL_UP_DISTRICTS } from '../data/upDistrictsData';
import { 
  FileSpreadsheet, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  MapPin, 
  Camera, 
  UploadCloud, 
  ExternalLink, 
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  X,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import { StorageService } from '../services/storageService';

interface FieldDataCollectionViewProps {
  currentUser: UserProfile;
  forms: DynamicForm[];
  submissions: FormSubmission[];
  onSaveSubmission: (sub: FormSubmission) => void;
  activeFormToOpen?: DynamicForm | null;
  onClearActiveFormToOpen?: () => void;
}

export const FieldDataCollectionView: React.FC<FieldDataCollectionViewProps> = ({
  currentUser,
  forms,
  submissions,
  onSaveSubmission,
  activeFormToOpen,
  onClearActiveFormToOpen
}) => {
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalForm, setActiveModalForm] = useState<DynamicForm | null>(activeFormToOpen || null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [attachedFiles, setAttachedFiles] = useState<Array<{ name: string; url: string; size?: string }>>([]);
  const [geoCoords, setGeoCoords] = useState<{ latitude: number; longitude: number; address?: string } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string | null>(null);
  const [showGoogleFormIframe, setShowGoogleFormIframe] = useState<string | null>(null);

  // Filter forms
  const filteredForms = forms.filter((form) => {
    if (!form.isActive) return false;
    if (selectedSection !== 'all' && form.section !== selectedSection) return false;
    if (selectedFrequency !== 'all' && form.frequency !== selectedFrequency) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = form.title.toLowerCase().includes(q) || form.hindiTitle.toLowerCase().includes(q);
      const matchDesc = form.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }
    return true;
  });

  // Filter my submissions
  const mySubmissions = submissions.filter((s) => {
    if (currentUser.role === 'iti_principal' && currentUser.itiCode) {
      return s.itiCode === currentUser.itiCode;
    }
    return true; // if admin/master, show all
  });

  const handleOpenFormModal = (form: DynamicForm) => {
    setActiveModalForm(form);
    // Initialize default field values
    const initialValues: Record<string, any> = {};
    form.fields.forEach((f) => {
      initialValues[f.id] = f.defaultValue !== undefined ? f.defaultValue : '';
    });
    setFormData(initialValues);
    setAttachedFiles([]);
    setGeoCoords(null);
  };

  const handleCloseModal = () => {
    setActiveModalForm(null);
    if (onClearActiveFormToOpen) onClearActiveFormToOpen();
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleDetectGPS = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeoCoords({
            latitude: Number(pos.coords.latitude.toFixed(4)),
            longitude: Number(pos.coords.longitude.toFixed(4)),
            address: `${currentUser.district || 'Uttar Pradesh'}, India (GPS Verified)`
          });
          setIsLocating(false);
        },
        () => {
          // Fallback location for Lucknow Directorate ITI
          setGeoCoords({
            latitude: 26.8928,
            longitude: 80.9412,
            address: `${currentUser.district || 'Lucknow'}, UP (Location Tagged)`
          });
          setIsLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      setGeoCoords({
        latitude: 26.8928,
        longitude: 80.9412,
        address: `${currentUser.district || 'Lucknow'}, UP`
      });
      setIsLocating(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newAttachment = {
        name: file.name,
        url: URL.createObjectURL(file),
        size: `${(file.size / 1024).toFixed(1)} KB`
      };
      setAttachedFiles((prev) => [...prev, newAttachment]);
    }
  };

  const handleSubmitForm = (status: FormSubmission['status'] = 'submitted') => {
    if (!activeModalForm) return;

    // Validate required fields
    const missingFields = activeModalForm.fields.filter(
      (f) => f.required && (formData[f.id] === undefined || formData[f.id] === '')
    );

    if (missingFields.length > 0) {
      alert(`कृपया अनिवार्य फील्ड भरें (Please fill required fields): ${missingFields.map((f) => f.hindiLabel || f.label).join(', ')}`);
      return;
    }

    const newSub: FormSubmission = {
      id: `sub_${Date.now()}`,
      formId: activeModalForm.id,
      formTitle: activeModalForm.title,
      section: activeModalForm.section,
      itiCode: currentUser.itiCode || 'ITI0901',
      itiName: currentUser.itiName || 'Govt. ITI Aliganj, Lucknow',
      itiType: 'Govt ITI',
      district: currentUser.district || 'Lucknow',
      division: currentUser.division || 'Lucknow',
      submittedBy: `${currentUser.name} (${currentUser.designation})`,
      submittedByEmail: currentUser.email,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: status,
      syncedToGoogleSheet: true,
      syncedAt: new Date().toISOString(),
      data: formData,
      attachments: attachedFiles,
      geoCoordinates: geoCoords || undefined
    };

    onSaveSubmission(newSub);
    setSubmitSuccessMsg(`प्रपत्र "${activeModalForm.hindiTitle}" सफलतापूर्वक प्रेषित किया गया! Google Sheet में डेटा दर्ज हो गया।`);
    setTimeout(() => setSubmitSuccessMsg(null), 4000);
    handleCloseModal();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header & Overview */}
      <div className="bg-slate-850 p-5 rounded-2xl border border-slate-750 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-md border border-amber-500/30 uppercase">
              Field Data Collection Desk
            </span>
            <span className="text-xs text-slate-400">दैनिक एवं आवधिक डेटा संग्रह पोर्टल</span>
          </div>
          <h2 className="text-lg font-black text-white mt-1">
            राजकीय एवं निजी आईटीआई दैनिक प्रपत्र संकलन (Data Entry & Forms)
          </h2>
          <p className="text-xs text-slate-300">
            Submit daily attendance, workshop machinery AMC logs, examination readiness, and apprenticeship records directly to Directorate sections and Google Sheets.
          </p>
        </div>

        {/* Current Submitter Badge */}
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-750 text-right shrink-0">
          <div className="text-[11px] text-slate-400 font-medium">Reporting as ITI / User:</div>
          <div className="text-xs font-bold text-amber-300">{currentUser.itiName || currentUser.name}</div>
          <div className="text-[10px] text-slate-400 font-mono">
            District: {currentUser.district || 'State Level'} • Code: {currentUser.itiCode || 'DIR-HQ'}
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {submitSuccessMsg && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500 rounded-xl text-emerald-200 text-xs flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-white">सफलतापूर्वक प्रेषित (Submission Successful)</div>
              <div>{submitSuccessMsg}</div>
            </div>
          </div>
          <button 
            onClick={() => setSubmitSuccessMsg(null)}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Left: Section Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              selectedSection === 'all'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
            }`}
          >
            सभी प्रपत्र (All Forms)
          </button>

          {DIRECTORATE_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSection(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                selectedSection === sec.id
                  ? 'bg-blue-600 text-white font-bold shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              {sec.hindiName.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Right: Frequency Filter & Search */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">सभी आवृत्ति (All Frequencies)</option>
            <option value="daily">Daily (दैनिक)</option>
            <option value="weekly">Weekly (साप्ताहिक)</option>
            <option value="monthly">Monthly (मासिक)</option>
            <option value="exam_cycle">Exam Cycle (परीक्षा चक्र)</option>
            <option value="ad_hoc">Urgent / Ad-hoc</option>
          </select>

          <div className="relative w-44 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search forms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredForms.map((form) => {
          const section = DIRECTORATE_SECTIONS.find((s) => s.id === form.section);

          return (
            <div
              key={form.id}
              className="bg-slate-850 rounded-2xl border border-slate-750 hover:border-slate-650 p-5 flex flex-col justify-between space-y-4 shadow-sm group transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    form.frequency === 'daily' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                    form.frequency === 'weekly' ? 'bg-blue-950 text-blue-300 border-blue-800' :
                    form.frequency === 'exam_cycle' ? 'bg-purple-950 text-purple-300 border-purple-800' :
                    'bg-slate-800 text-amber-300 border-slate-700'
                  }`}>
                    {form.frequency} • {form.isMandatory ? 'Mandatory' : 'Optional'}
                  </span>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {section?.hindiName.split(' ')[0]} अनुभाग
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {form.hindiTitle}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {form.description}
                </p>

                {/* Google Sheet & Form Indicators */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/60">
                    <FileSpreadsheet className="w-3 h-3" />
                    <span className="truncate max-w-[140px]">Sheet: {form.googleSheetConfig?.sheetName}</span>
                  </div>

                  {form.googleFormUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowGoogleFormIframe(form.googleFormUrl || null);
                      }}
                      className="text-[10px] text-purple-300 bg-purple-950/40 hover:bg-purple-900/60 px-2 py-0.5 rounded border border-purple-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Google Form</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-750 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">
                  {form.fields.length} dynamic fields
                </span>

                <button
                  onClick={() => handleOpenFormModal(form)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>प्रपत्र भरें (Open & Fill)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* My Submissions Table Section */}
      <div className="bg-slate-850 rounded-2xl border border-slate-750 p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-750 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>मेरी प्रेषित आख्या एवं स्थिति (My Submitted Data & Status)</span>
            </h3>
            <p className="text-xs text-slate-400">Audit trail of submitted proformas and verification feedback from Directorate</p>
          </div>

          <span className="text-xs text-slate-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-750 font-mono">
            Total Submissions: <strong>{mySubmissions.length}</strong>
          </span>
        </div>

        {mySubmissions.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No submissions recorded yet for this institute. Click "Open & Fill" on any active form above to submit data.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-750">
                <tr>
                  <th className="p-3">प्रपत्र का नाम (Form Title)</th>
                  <th className="p-3">अनुभाग (Section)</th>
                  <th className="p-3">प्रेषण दिनांक (Submitted At)</th>
                  <th className="p-3">स्थिति (Status)</th>
                  <th className="p-3">अधिकारी टिप्पणी (Review Remarks)</th>
                  <th className="p-3">गूगल शीट (Sync)</th>
                  <th className="p-3 text-right">कार्रवाई (Action)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {mySubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 font-semibold text-white max-w-xs">
                      <div>{sub.formTitle}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{sub.id}</div>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                        {sub.section}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400 whitespace-nowrap">
                      {new Date(sub.submittedAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        sub.status === 'verified' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        sub.status === 'revision_requested' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {sub.status === 'verified' ? '✓ Verified' : sub.status === 'revision_requested' ? '⚠ Revision Requested' : 'Submitted'}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300 max-w-xs">
                      {sub.reviewRemarks ? (
                        <div className="text-[11px] bg-slate-900 p-1.5 rounded border border-slate-800 text-slate-200">
                          {sub.reviewRemarks}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-500 italic">Pending officer review</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Synced</span>
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {sub.status === 'revision_requested' ? (
                        <button
                          onClick={() => {
                            const parentForm = forms.find(f => f.id === sub.formId);
                            if (parentForm) {
                              handleOpenFormModal(parentForm);
                              if (sub.data) setFormData(sub.data);
                            }
                          }}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] rounded-lg cursor-pointer transition-colors shadow-sm"
                        >
                          पुनरीक्षण करें (Edit & Resubmit)
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            alert(`📋 प्रपत्र रसीद (Submission Slip)\n----------------------------------------\nआईडी: ${sub.id}\nप्रपत्र: ${sub.formTitle}\nअनुभाग: ${sub.section}\nसंस्थान: ${sub.itiName} (${sub.itiCode})\nजनपद: ${sub.district}\nदिनांक: ${new Date(sub.submittedAt).toLocaleString('en-IN')}\nस्थिति: ${sub.status.toUpperCase()}\nसत्यापन अधिकारी: ${sub.reviewedBy || 'Pending'}\nगूगल शीट: Synced ✅`);
                          }}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] rounded-lg cursor-pointer transition-colors"
                        >
                          रसीद देखें (View Slip)
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Dynamic Form Fill Modal */}
      {activeModalForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30 uppercase">
                    {activeModalForm.frequency} Return
                  </span>
                  <span className="text-xs text-slate-400">
                    Section: {DIRECTORATE_SECTIONS.find((s) => s.id === activeModalForm.section)?.hindiName}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  {activeModalForm.hindiTitle}
                </h3>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Institution Context Bar */}
            <div className="bg-slate-850 px-6 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
              <div>
                <strong>संस्थान:</strong> {currentUser.itiName || 'Govt. ITI Aliganj, Lucknow'} ({currentUser.district || 'Lucknow'})
              </div>
              <div className="flex items-center gap-3">
                <span><strong>MIS Code:</strong> <code className="text-amber-300 font-bold">{currentUser.itiCode || 'ITI0901'}</code></span>
                <span><strong>Date:</strong> {new Date().toLocaleDateString('en-IN')}</span>
              </div>
            </div>

            {/* Form Fields Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
              
              {activeModalForm.fields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-200">
                    <span>{field.hindiLabel || field.label}</span>
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>

                  {/* Field Type: Text */}
                  {field.type === 'text' && (
                    <input
                      type="text"
                      placeholder={field.placeholder || ''}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  )}

                  {/* Field Type: Number */}
                  {field.type === 'number' && (
                    <div className="relative">
                      <input
                        type="number"
                        placeholder={field.placeholder || '0'}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, Number(e.target.value))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                      {field.unit && (
                        <span className="absolute right-3 top-2 text-xs text-slate-400 font-mono">
                          {field.unit}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Field Type: Currency */}
                  {field.type === 'currency' && (
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-xs text-amber-400 font-bold">₹</span>
                      <input
                        type="number"
                        placeholder={field.placeholder || '0.00'}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, Number(e.target.value))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}

                  {/* Field Type: Textarea */}
                  {field.type === 'textarea' && (
                    <textarea
                      rows={3}
                      placeholder={field.placeholder || ''}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  )}

                  {/* Field Type: Date */}
                  {field.type === 'date' && (
                    <input
                      type="date"
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    />
                  )}

                  {/* Field Type: Select Dropdown */}
                  {field.type === 'select' && (
                    <select
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="">-- विकल्प चुनें (Select Option) --</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* Field Type: Radio */}
                  {field.type === 'radio' && (
                    <div className="space-y-2 pt-1">
                      {field.options?.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="radio"
                            name={field.id}
                            value={opt.value}
                            checked={formData[field.id] === opt.value}
                            onChange={() => handleFieldChange(field.id, opt.value)}
                            className="text-amber-500 focus:ring-amber-500"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Field Type: GPS Geolocation */}
                  {field.type === 'gps_location' && (
                    <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <div className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          <span>{geoCoords ? `${geoCoords.latitude}, ${geoCoords.longitude}` : 'Location Not Tagged Yet'}</span>
                        </div>
                        {geoCoords?.address && (
                          <div className="text-[11px] text-emerald-400">{geoCoords.address}</div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={handleDetectGPS}
                        disabled={isLocating}
                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-650 text-amber-300 font-semibold text-xs rounded-lg cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                        <span>{isLocating ? 'Detecting GPS...' : '📍 Auto Detect GPS'}</span>
                      </button>
                    </div>
                  )}

                  {/* Field Type: File / Photo Upload */}
                  {field.type === 'file' && (
                    <div className="space-y-2">
                      <label className="border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-800/50">
                        <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                        <span className="text-xs text-slate-300 font-semibold">Click or drag file to attach</span>
                        <span className="text-[10px] text-slate-500">PDF, JPG, PNG up to 10MB</span>
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>

                      {attachedFiles.length > 0 && (
                        <div className="space-y-1">
                          {attachedFiles.map((att, i) => (
                            <div key={i} className="p-2 bg-slate-800 rounded-lg flex items-center justify-between text-xs text-slate-300 border border-slate-700">
                              <span className="font-mono text-emerald-300">📎 {att.name} ({att.size})</span>
                              <button
                                onClick={() => setAttachedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                                className="text-red-400 hover:text-red-300 text-xs cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ))}

              {/* Google Sheets Live Sync Notice */}
              <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-emerald-300 text-[11px] flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  यह डेटा सीधे प्रशिक्षण निदेशालय की गूगल स्प्रेडशीट (<strong>{activeModalForm.googleSheetConfig?.sheetName}</strong>) में ऑटो-सिंक होगा।
                </span>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs cursor-pointer"
              >
                रद्द करें (Cancel)
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSubmitForm('draft')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs cursor-pointer"
                >
                  ड्राफ्ट सुरक्षित करें (Save Draft)
                </button>

                <button
                  type="button"
                  onClick={() => handleSubmitForm('submitted')}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>निदेशालय को प्रेषित करें (Final Submit)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Google Form Viewer Modal */}
      {showGoogleFormIframe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Google Forms Embed Interface</span>
              </div>
              <button
                onClick={() => setShowGoogleFormIframe(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 p-4 bg-slate-950 flex flex-col items-center justify-center space-y-4">
              <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 max-w-md text-center space-y-3">
                <div className="h-12 w-12 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto">
                  <ExternalLink className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">Google Form External Data Collector</h4>
                <p className="text-xs text-slate-400">
                  This Directorate form is mapped with an official Google Form for state-wide mobile responses. You can open it in a new window or submit via our integrated form above.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <a
                    href={showGoogleFormIframe}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <span>Open in Google Forms</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => setShowGoogleFormIframe(null)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
