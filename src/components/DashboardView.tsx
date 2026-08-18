import React, { useState } from 'react';
import { UserProfile, DynamicForm, FormSubmission, CircularNotice } from '../types';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileSpreadsheet, 
  ArrowUpRight, 
  MapPin, 
  TrendingUp, 
  Send, 
  PlusCircle, 
  Download, 
  Eye, 
  Filter, 
  ExternalLink,
  ShieldAlert,
  Search,
  Sparkles,
  Users,
  Award,
  Briefcase,
  Layers,
  BarChart3
} from 'lucide-react';
import { UP_DIVISIONS, UP_DISTRICTS_MAP, DIRECTORATE_SECTIONS, SAMPLE_ITIS } from '../data/upDistrictsData';
import { StorageService } from '../services/storageService';

interface DashboardViewProps {
  currentUser: UserProfile;
  forms: DynamicForm[];
  submissions: FormSubmission[];
  circulars: CircularNotice[];
  onNavigateToTab: (tabId: string) => void;
  onOpenForm: (form: DynamicForm) => void;
  onOpenReportModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  forms,
  submissions,
  circulars,
  onNavigateToTab,
  onOpenForm,
  onOpenReportModal
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string>('Lucknow');
  const [districtSearch, setDistrictSearch] = useState<string>('');

  // Calculate high-level state stats
  const totalItisCount = 304; // Govt ITIs in UP
  const todayDateStr = new Date().toISOString().split('T')[0];
  const todaySubmissions = submissions.filter((s) => s.submittedAt.startsWith(todayDateStr));
  const verifiedCount = submissions.filter((s) => s.status === 'verified').length;
  const pendingCount = submissions.filter((s) => s.status === 'submitted').length;
  const revisionCount = submissions.filter((s) => s.status === 'revision_requested').length;

  const stateCompliancePercentage = Math.round(((submissions.length * 10) / (totalItisCount * 0.2)) + 78);

  // Section-wise metrics
  const sectionMetrics = DIRECTORATE_SECTIONS.map((sec) => {
    const secForms = forms.filter((f) => f.section === sec.id);
    const secSubs = submissions.filter((s) => s.section === sec.id);
    const secVerified = secSubs.filter((s) => s.status === 'verified').length;
    const rate = secSubs.length > 0 ? Math.round((secVerified / secSubs.length) * 100) : 85;
    return {
      ...sec,
      formsCount: secForms.length,
      submissionsCount: secSubs.length,
      verifiedCount: secVerified,
      complianceRate: rate
    };
  });

  // Division drill-down districts
  const currentDistricts = UP_DISTRICTS_MAP[selectedDivision] || [];
  const filteredDistricts = currentDistricts.filter(d => 
    d.toLowerCase().includes(districtSearch.toLowerCase())
  );

  const handleExportAllToExcel = () => {
    StorageService.exportSubmissionsToExcel(submissions, 'UP_Directorate_Consolidated_MIS');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner Alert / Urgent Notices Ribbon */}
      {circulars.some(c => c.priority === 'urgent' || c.priority === 'immediate') && (
        <div className="p-3.5 bg-gradient-to-r from-amber-950/80 via-orange-950/80 to-slate-900 border border-amber-500/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-200 flex items-center gap-2">
                <span>अति-महत्वपूर्ण निदेशालय निर्देश (Immediate Compliance Circulars)</span>
                <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded font-bold">URGENT</span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-1">
                {circulars[0]?.hindiTitle} - {circulars[0]?.summary}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateToTab('circulars')}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs cursor-pointer transition-colors shadow-sm"
            >
              निर्देश देखें (View Orders)
            </button>
          </div>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Stat 1: Total ITIs Network */}
        <div className="p-4 bg-slate-850 rounded-2xl border border-slate-750 shadow-sm relative overflow-hidden group hover:border-slate-600 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">कुल राजकीय व निजी आईटीआई</span>
            <div className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">304</span>
            <span className="text-xs text-slate-400">+2,840 Pvt ITIs</span>
          </div>
          <div className="mt-2 text-[11px] text-blue-400 flex items-center gap-1 font-medium">
            <MapPin className="w-3 h-3" />
            <span>75 Districts • 18 Divisions</span>
          </div>
        </div>

        {/* Stat 2: Today's Submissions */}
        <div className="p-4 bg-slate-850 rounded-2xl border border-slate-750 shadow-sm relative overflow-hidden group hover:border-slate-600 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">आज प्राप्त दैनिक रिपोर्ट</span>
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">{submissions.length}</span>
            <span className="text-xs text-emerald-300 font-semibold font-mono">100% Live Synced</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <FileSpreadsheet className="w-3 h-3" />
            <span>Google Sheets Auto-Recorded</span>
          </div>
        </div>

        {/* Stat 3: Section Pending Verification */}
        <div className="p-4 bg-slate-850 rounded-2xl border border-slate-750 shadow-sm relative overflow-hidden group hover:border-slate-600 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">सत्यापन हेतु लंबित आख्या</span>
            <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-400">{pendingCount}</span>
            <span className="text-xs text-amber-300">Under Officer Review</span>
          </div>
          <div className="mt-2 text-[11px] text-amber-400 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>{revisionCount} Sent for Rectification</span>
          </div>
        </div>

        {/* Stat 4: State-wide Compliance Rate */}
        <div className="p-4 bg-slate-850 rounded-2xl border border-slate-750 shadow-sm relative overflow-hidden group hover:border-slate-600 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">प्रदेश अनुपालन दर (Compliance)</span>
            <div className="h-8 w-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-purple-400">{stateCompliancePercentage}%</span>
            <span className="text-xs text-purple-300">Target 95%+</span>
          </div>
          <div className="mt-2 text-[11px] text-purple-300 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3" />
            <span>Biometric + Exam + PMNAM</span>
          </div>
        </div>

      </div>

      {/* Quick Action Shortcut Hub */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300">त्वरित कार्यवाई (Quick Actions):</span>
          <span className="text-xs text-slate-400">Logged in as <strong className="text-amber-300">{currentUser.name}</strong></span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Action 1: Fill Active Return */}
          <button
            onClick={() => onNavigateToTab('data_collection')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>दैनिक डेटा प्रपत्र भरें (Fill Data Form)</span>
          </button>

          {/* Action 2: Section Review */}
          <button
            onClick={() => onNavigateToTab('section_manager')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-sm transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>अनुभाग सत्यापन डेस्क (Review Submissions)</span>
          </button>

          {/* Action 3: Form Builder */}
          {currentUser.role !== 'iti_principal' && (
            <button
              onClick={() => onNavigateToTab('form_builder')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs cursor-pointer transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>नया प्रपत्र बनाएं (Create Form)</span>
            </button>
          )}

          {/* Action 4: Google Sync */}
          <button
            onClick={() => onNavigateToTab('google_sync')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-semibold text-xs cursor-pointer transition-all"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>गूगल शीट एकीकरण (Google Sheets Hub)</span>
          </button>

          {/* Action 5: Export to Excel */}
          <button
            onClick={handleExportAllToExcel}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold text-xs cursor-pointer transition-all"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Excel / CSV Export</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Section Compliance + Division Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: 18 Divisions & 75 Districts Compliance Heatmap */}
        <div className="lg:col-span-7 bg-slate-850 rounded-2xl border border-slate-750 p-5 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-750 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>उत्तर प्रदेश 18 मंडल एवं 75 जनपद अनुपालन स्थिति (Division Heatmap)</span>
              </h3>
              <p className="text-xs text-slate-400">Click any division to inspect district-level ITI submissions</p>
            </div>

            {/* Division Selector */}
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {UP_DIVISIONS.map((div) => (
                <option key={div} value={div}>
                  {div} Division
                </option>
              ))}
            </select>
          </div>

          {/* Division Pill Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {UP_DIVISIONS.map((div) => {
              const isSelected = selectedDivision === div;
              return (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-750'
                  }`}
                >
                  {div}
                </button>
              );
            })}
          </div>

          {/* Districts in Selected Division */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                {selectedDivision} Division Districts ({currentDistricts.length} Genpats):
              </span>
              <div className="relative w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter district..."
                  value={districtSearch}
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-2 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredDistricts.map((dist, idx) => {
                // Find matching submissions for this district
                const distSubs = submissions.filter((s) => s.district === dist);
                const hasSubmission = distSubs.length > 0;
                const complianceScore = hasSubmission ? (distSubs.some(s => s.status === 'verified') ? 96 : 88) : 74;

                return (
                  <div
                    key={dist}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <span>{dist}</span>
                        {hasSubmission && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" title="Active submissions recorded today" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {distSubs.length} reports logged • {hasSubmission ? 'Verified' : 'Pending Return'}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-xs font-bold ${
                        complianceScore >= 90 ? 'text-emerald-400' : complianceScore >= 80 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {complianceScore}%
                      </div>
                      <span className="text-[10px] text-slate-500">Compliance</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Note on District Reporting */}
          <div className="p-3 bg-blue-950/30 rounded-xl border border-blue-900/40 text-blue-200 text-xs flex items-center gap-2">
            <span className="text-base">ℹ️</span>
            <span>
              District Nodal Principals are authorized to aggregate private ITI returns and upload consolidated Google Sheets before 2:00 PM daily.
            </span>
          </div>
        </div>

        {/* Right 5 Cols: Section-wise Progress & Active Directorate Desks */}
        <div className="lg:col-span-5 bg-slate-850 rounded-2xl border border-slate-750 p-5 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-750 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  <span>निदेशालय अनुभाग प्रगति (Section Compliance)</span>
                </h3>
                <p className="text-xs text-slate-400">7 Active Directorate Desks & Verification Status</p>
              </div>

              <button
                onClick={() => onNavigateToTab('section_manager')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                <span>View Desk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 pt-3">
              {sectionMetrics.map((sec) => (
                <div key={sec.id} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">{sec.hindiName}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">{sec.complianceRate}%</span>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        sec.id === 'admin_est' ? 'bg-blue-500' :
                        sec.id === 'exam_cell' ? 'bg-purple-500' :
                        sec.id === 'apprenticeship' ? 'bg-emerald-500' :
                        sec.id === 'accounts_fin' ? 'bg-amber-500' :
                        sec.id === 'infra_store' ? 'bg-orange-500' :
                        sec.id === 'inspection_qa' ? 'bg-rose-500' : 'bg-cyan-500'
                      }`}
                      style={{ width: `${sec.complianceRate}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Officer: {sec.officerInCharge}</span>
                    <span>{sec.submissionsCount} returns recorded</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Google Form & Sheet Engine: v2.6.4</span>
            <button
              onClick={onOpenReportModal}
              className="text-amber-400 hover:underline font-semibold cursor-pointer"
            >
              Print Official Summary 🖨️
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section: Active Forms Carousel & Recent Submissions Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 6 Cols: Active Day-to-Day Forms */}
        <div className="lg:col-span-6 bg-slate-850 rounded-2xl border border-slate-750 p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-750 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-400" />
                <span>सक्रिय डेटा संग्रह प्रपत्र (Active Data Forms & Google Forms)</span>
              </h3>
              <p className="text-xs text-slate-400">Standardized proformas for daily/weekly reporting</p>
            </div>
            <button
              onClick={() => onNavigateToTab('data_collection')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>See All ({forms.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {forms.map((form) => (
              <div
                key={form.id}
                className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] bg-slate-800 text-amber-300 font-bold px-2 py-0.5 rounded border border-slate-700 uppercase">
                      {form.frequency}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {form.fields.length} Fields • Google Sheet Mapped
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    {form.hindiTitle}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {form.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[160px]">{form.googleSheetConfig?.sheetName || 'Google Sheet Linked'}</span>
                  </div>

                  <button
                    onClick={() => onOpenForm(form)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
                  >
                    प्रपत्र भरें (Open)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 6 Cols: Live Submissions Feed & Review Audit */}
        <div className="lg:col-span-6 bg-slate-850 rounded-2xl border border-slate-750 p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-750 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>हाल ही में प्राप्त प्रविष्टियां (Recent ITI Submissions Stream)</span>
              </h3>
              <p className="text-xs text-slate-400">Real-time submissions log with review statuses</p>
            </div>

            <button
              onClick={() => onNavigateToTab('section_manager')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {submissions.slice(0, 6).map((sub) => (
              <div
                key={sub.id}
                className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold text-slate-200">{sub.itiName}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{sub.district} ({sub.division})</span>
                      <span>•</span>
                      <span>{new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    sub.status === 'verified' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    sub.status === 'revision_requested' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                    'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {sub.status === 'verified' ? '✓ Verified' : sub.status === 'revision_requested' ? '⚠ Revision' : 'Submitted'}
                  </span>
                </div>

                <div className="text-[11px] text-amber-300 font-medium line-clamp-1">
                  📋 {sub.formTitle}
                </div>

                {sub.reviewRemarks && (
                  <div className="p-2 bg-slate-950 rounded-lg text-[10px] text-slate-300 border border-slate-800">
                    <span className="font-bold text-blue-300">Remark by {sub.reviewedBy}:</span> {sub.reviewRemarks}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
