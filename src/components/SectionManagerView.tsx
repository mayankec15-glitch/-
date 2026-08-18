import React, { useState } from 'react';
import { UserProfile, DynamicForm, FormSubmission, DirectorateSection } from '../types';
import { DIRECTORATE_SECTIONS, ALL_UP_DISTRICTS, UP_DIVISIONS } from '../data/upDistrictsData';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Download, 
  Filter, 
  Search, 
  MapPin, 
  Eye, 
  Clock, 
  FileSpreadsheet, 
  MessageSquare, 
  Building, 
  Sparkles,
  ArrowUpDown,
  Send,
  X,
  ShieldCheck
} from 'lucide-react';
import { StorageService } from '../services/storageService';

interface SectionManagerViewProps {
  currentUser: UserProfile;
  forms: DynamicForm[];
  submissions: FormSubmission[];
  onUpdateSubmissionStatus: (subId: string, status: FormSubmission['status'], reviewedBy: string, remarks?: string) => void;
}

export const SectionManagerView: React.FC<SectionManagerViewProps> = ({
  currentUser,
  forms,
  submissions,
  onUpdateSubmissionStatus
}) => {
  // Set default active section based on current user if section_master
  const [selectedSection, setSelectedSection] = useState<string>(
    currentUser.section || 'all'
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Inspection / Review Modal State
  const [inspectingSubmission, setInspectingSubmission] = useState<FormSubmission | null>(null);
  const [reviewRemarkInput, setReviewRemarkInput] = useState<string>('');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Filter submissions
  const filteredSubmissions = submissions.filter((sub) => {
    if (selectedSection !== 'all' && sub.section !== selectedSection) return false;
    if (selectedDistrict !== 'all' && sub.district !== selectedDistrict) return false;
    if (selectedDivision !== 'all' && sub.division !== selectedDivision) return false;
    if (selectedStatus !== 'all' && sub.status !== selectedStatus) return false;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchIti = sub.itiName.toLowerCase().includes(q) || sub.itiCode.toLowerCase().includes(q);
      const matchForm = sub.formTitle.toLowerCase().includes(q);
      const matchSubmitter = sub.submittedBy.toLowerCase().includes(q);
      const matchDistrict = sub.district.toLowerCase().includes(q);
      if (!matchIti && !matchForm && !matchSubmitter && !matchDistrict) return false;
    }
    return true;
  });

  const handleOpenReviewModal = (sub: FormSubmission) => {
    setInspectingSubmission(sub);
    setReviewRemarkInput(sub.reviewRemarks || '');
  };

  const handleApplyStatus = (status: FormSubmission['status']) => {
    if (!inspectingSubmission) return;

    const reviewerName = `${currentUser.name} (${currentUser.designation})`;
    onUpdateSubmissionStatus(
      inspectingSubmission.id,
      status,
      reviewerName,
      reviewRemarkInput.trim() || undefined
    );

    setActionFeedback(`आख्या स्थिति अद्यतन: ${status.toUpperCase()} (${inspectingSubmission.itiName})`);
    setTimeout(() => setActionFeedback(null), 3500);
    setInspectingSubmission(null);
  };

  const handleExportFilteredToExcel = () => {
    const secName = selectedSection !== 'all' ? selectedSection : 'Consolidated';
    StorageService.exportSubmissionsToExcel(filteredSubmissions, `UP_Directorate_${secName}_Submissions`);
  };

  const currentSectionMeta = DIRECTORATE_SECTIONS.find((s) => s.id === selectedSection);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-slate-850 p-5 rounded-2xl border border-slate-750 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-500/20 text-blue-300 font-bold px-2.5 py-0.5 rounded-md border border-blue-500/30 uppercase">
              Section Master Verification Desk
            </span>
            <span className="text-xs text-slate-400">निदेशालय अनुभाग सत्यापन एवं डेटा संकलन</span>
          </div>
          <h2 className="text-lg font-black text-white mt-1">
            अनुभागवार फील्ड आईटीआई डेटा सत्यापन व मॉनिटरिंग डेस्क
          </h2>
          <p className="text-xs text-slate-300">
            Verify day-to-day returns submitted by 75 districts, approve data, request revisions, and sync with Directorate Google Sheets master registers.
          </p>
        </div>

        {/* Export & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportFilteredToExcel}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel / Sheet Export ({filteredSubmissions.length})</span>
          </button>
        </div>
      </div>

      {/* Action Toast Feedback */}
      {actionFeedback && (
        <div className="p-3.5 bg-blue-950/80 border border-blue-500 rounded-xl text-blue-200 text-xs flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span className="font-semibold">{actionFeedback}</span>
          </div>
          <button onClick={() => setActionFeedback(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Section Selector Tab Pills */}
      <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSelectedSection('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
            selectedSection === 'all'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
          }`}
        >
          समस्त अनुभाग (All Sections)
        </button>

        {DIRECTORATE_SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setSelectedSection(sec.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
              selectedSection === sec.id
                ? 'bg-blue-600 text-white font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
            }`}
          >
            <span>{sec.hindiName}</span>
          </button>
        ))}
      </div>

      {/* Multi-Filter Bar */}
      <div className="p-4 bg-slate-850 rounded-2xl border border-slate-750 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Filter: Status */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1">स्थिति (Status)</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">समस्त स्थिति (All Statuses)</option>
            <option value="submitted">लंबित (Pending Review)</option>
            <option value="verified">सत्यापित (Verified & Approved)</option>
            <option value="revision_requested">संशोधन अपेक्षित (Revision Requested)</option>
            <option value="draft">ड्राफ्ट (Draft)</option>
          </select>
        </div>

        {/* Filter: Division */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1">मंडल (Division)</label>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">समस्त 18 मंडल (All Divisions)</option>
            {UP_DIVISIONS.map((div) => (
              <option key={div} value={div}>{div} Division</option>
            ))}
          </select>
        </div>

        {/* Filter: District */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1">जनपद (District)</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">समस्त 75 जनपद (All 75 Districts)</option>
            {ALL_UP_DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>

        {/* Filter: Search Query */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1">खोज (Search ITI / Form / Code)</label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search ITI name, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

      </div>

      {/* Submissions Master Table */}
      <div className="bg-slate-850 rounded-2xl border border-slate-750 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-900 border-b border-slate-750 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <span>प्राप्त आख्याएं (Submissions Stream):</span>
            <span className="bg-blue-950 text-blue-300 px-2 py-0.5 rounded font-mono font-bold border border-blue-800">
              {filteredSubmissions.length} records
            </span>
          </div>

          <div className="text-xs text-slate-400">
            Click <strong className="text-amber-400">"Review & Action"</strong> on any row to verify and write remarks
          </div>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 space-y-2">
            <div>No submissions match your selected filter criteria.</div>
            <button
              onClick={() => {
                setSelectedSection('all');
                setSelectedDistrict('all');
                setSelectedDivision('all');
                setSelectedStatus('all');
                setSearchQuery('');
              }}
              className="text-amber-400 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-750">
                <tr>
                  <th className="p-3.5">संस्थान विवरण (ITI & District)</th>
                  <th className="p-3.5">प्रपत्र का नाम (Form Title)</th>
                  <th className="p-3.5">अनुभाग (Section)</th>
                  <th className="p-3.5">प्रेषण समय (Submitted At)</th>
                  <th className="p-3.5">स्थिति (Status)</th>
                  <th className="p-3.5">गूगल शीट</th>
                  <th className="p-3.5 text-right">कार्यवाई (Action)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-800/60 transition-colors">
                    
                    {/* ITI & District */}
                    <td className="p-3.5">
                      <div className="font-bold text-white text-xs">{sub.itiName}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{sub.district} ({sub.division} Div.)</span>
                        <span>•</span>
                        <code className="text-slate-400 font-mono font-bold bg-slate-900 px-1 rounded">{sub.itiCode}</code>
                      </div>
                    </td>

                    {/* Form Title */}
                    <td className="p-3.5 max-w-xs">
                      <div className="font-semibold text-slate-200 line-clamp-1">{sub.formTitle}</div>
                      <div className="text-[10px] text-slate-400 font-mono">By: {sub.submittedBy}</div>
                    </td>

                    {/* Section */}
                    <td className="p-3.5">
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono font-bold">
                        {sub.section}
                      </span>
                    </td>

                    {/* Submitted At */}
                    <td className="p-3.5 text-slate-400 whitespace-nowrap">
                      {new Date(sub.submittedAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>

                    {/* Status Badge */}
                    <td className="p-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        sub.status === 'verified' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        sub.status === 'revision_requested' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {sub.status === 'verified' ? '✓ Verified' : sub.status === 'revision_requested' ? '⚠ Revision Req' : 'Submitted'}
                      </span>
                    </td>

                    {/* Google Sheet Synced */}
                    <td className="p-3.5">
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Synced</span>
                      </span>
                    </td>

                    {/* Action */}
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleOpenReviewModal(sub)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm transition-colors flex items-center gap-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>समीक्षा (Review)</span>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review & Inspection Detailed Modal */}
      {inspectingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded border border-blue-500/30 uppercase">
                    Verification Audit • {inspectingSubmission.section}
                  </span>
                  <span className="text-xs text-slate-400">ID: {inspectingSubmission.id}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {inspectingSubmission.formTitle}
                </h3>
              </div>

              <button
                onClick={() => setInspectingSubmission(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Institution Header Details */}
            <div className="bg-slate-850 p-4 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 text-[10px] block">संस्थान (ITI):</span>
                <strong className="text-white">{inspectingSubmission.itiName}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">जनपद व मंडल:</span>
                <strong className="text-amber-300">{inspectingSubmission.district} ({inspectingSubmission.division})</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">प्रेषक (Submitted By):</span>
                <span className="text-slate-200">{inspectingSubmission.submittedBy}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">दिनांक व समय:</span>
                <span className="text-slate-300">{new Date(inspectingSubmission.submittedAt).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Modal Body: Submitted Form Field Data */}
            <div className="p-6 overflow-y-auto max-h-[50vh] space-y-4">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                दर्ज किया गया डेटा (Submitted Form Payload):
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(inspectingSubmission.data || {}).map(([key, val]) => (
                  <div key={key} className="p-3 bg-slate-850 rounded-xl border border-slate-750 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{key.replace(/_/g, ' ')}</span>
                    <div className="text-xs font-semibold text-white break-words">
                      {typeof val === 'boolean' ? (val ? 'Yes' : 'No') : String(val || '-')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Geo location if available */}
              {inspectingSubmission.geoCoordinates && (
                <div className="p-3 bg-slate-850 rounded-xl border border-slate-750 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <MapPin className="w-4 h-4" />
                    <span>GPS Verified: {inspectingSubmission.geoCoordinates.latitude}, {inspectingSubmission.geoCoordinates.longitude}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{inspectingSubmission.geoCoordinates.address}</span>
                </div>
              )}

              {/* Review Remarks Input */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-bold text-slate-200">
                  सत्यापन अधिकारी टिप्पणी (Officer Remarks / Inspection Notes):
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter remarks, approval rationale, or specific rectification instructions..."
                  value={reviewRemarkInput}
                  onChange={(e) => setReviewRemarkInput(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setInspectingSubmission(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold rounded-xl text-xs cursor-pointer"
              >
                बंद करें (Close)
              </button>

              <div className="flex items-center gap-2">
                {/* Request Revision */}
                <button
                  type="button"
                  onClick={() => handleApplyStatus('revision_requested')}
                  className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-700 text-rose-300 font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>संशोधन मांगें (Request Revision)</span>
                </button>

                {/* Approve / Verify */}
                <button
                  type="button"
                  onClick={() => handleApplyStatus('verified')}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>सत्यापित एवं स्वीकृत करें (Approve / Verify)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
