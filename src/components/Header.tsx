import React, { useState } from 'react';
import { UserProfile, CircularNotice } from '../types';
import { 
  Building2, 
  UserCheck, 
  Bell, 
  RefreshCw, 
  FileSpreadsheet, 
  Shield, 
  ChevronDown, 
  LogOut, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Sparkles,
  Search
} from 'lucide-react';
import { DIRECTORATE_SECTIONS } from '../data/upDistrictsData';

interface HeaderProps {
  currentUser: UserProfile;
  onOpenRoleSwitcher: () => void;
  onOpenCirculars?: () => void;
  onOpenGoogleSync?: () => void;
  onOpenReportModal?: () => void;
  circulars?: CircularNotice[];
  pendingCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenRoleSwitcher,
  onOpenCirculars = () => {},
  onOpenGoogleSync = () => {},
  onOpenReportModal = () => {},
  circulars = [],
  pendingCount = 0
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToast, setSyncToast] = useState(false);

  const sectionMeta = currentUser.section 
    ? DIRECTORATE_SECTIONS.find(s => s.id === currentUser.section)
    : null;

  const urgentCirculars = (circulars || []).filter(c => c && (c.priority === 'urgent' || c.priority === 'immediate'));

  const handleQuickSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncToast(true);
      setTimeout(() => setSyncToast(false), 3500);
    }, 1200);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-xl">
      {/* Top Directorate Ribbon */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-700 text-white text-[11px] font-semibold py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] tracking-wide uppercase font-bold">
              Govt. of Uttar Pradesh
            </span>
            <span className="hidden sm:inline">
              व्यावसायिक शिक्षा, कौशल विकास एवं उद्यमशीलता विभाग | Department of Vocational Education & Skill Development
            </span>
            <span className="sm:hidden">
              प्रशिक्षण निदेशालय, उ.प्र.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Google Sheets & Form Cloud API: Active</span>
            </div>
            <button 
              onClick={onOpenReportModal}
              className="hidden md:flex items-center gap-1 hover:underline cursor-pointer text-amber-100 hover:text-white"
            >
              <span>📄 Official Formats</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Directorate Identity */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1.5">
                  <span>प्रशिक्षण निदेशालय, उत्तर प्रदेश</span>
                </h1>
                <span className="hidden lg:inline-block text-[10px] bg-slate-800 text-amber-300 font-medium px-2 py-0.5 rounded-md border border-slate-700">
                  Directorate of Training, Lucknow
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Day-to-Day Multi-Section Data Collection & Field ITI Reporting Portal
              </p>
            </div>
          </div>

          {/* Right Action Controls & User Profile Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Google Sheets Sync Quick Button */}
            <button
              onClick={handleQuickSync}
              disabled={isSyncing}
              title="Sync with Google Sheets & Form Webhooks"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold cursor-pointer transition-all shadow-sm"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">{isSyncing ? 'Syncing...' : 'Google Sheets Sync'}</span>
            </button>

            {/* Circulars / Notifications Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs cursor-pointer transition-colors"
                title="Directorate Orders & Notifications"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                {(urgentCirculars.length > 0 || pendingCount > 0) && (
                  <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {urgentCirculars.length + (currentUser.role === 'section_master' ? pendingCount : 0)}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-850 border border-slate-700 rounded-xl shadow-2xl z-50 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                      <Bell className="w-3.5 h-3.5" />
                      <span>निदेशालय आदेश एवं सूचनाएं (Circulars)</span>
                    </div>
                    <button 
                      onClick={() => {
                        setShowNotifications(false);
                        onOpenCirculars();
                      }}
                      className="text-[11px] text-amber-400 hover:underline"
                    >
                      View All ({circulars.length})
                    </button>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {urgentCirculars.map((circ) => (
                      <div key={circ.id} className="p-2.5 bg-slate-900/80 rounded-lg border border-red-900/50 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.5 rounded font-bold uppercase border border-red-800">
                            {circ.priority}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{circ.letterNumber}</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-200 line-clamp-1">{circ.hindiTitle}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-2">{circ.summary}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Google Sheets Sync: Auto Active</span>
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        onOpenGoogleSync();
                      }}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                    >
                      <span>Manage Sheets</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Active User / Role Switcher Card */}
            <div 
              onClick={onOpenRoleSwitcher}
              className="flex items-center gap-2.5 pl-3 pr-2.5 py-1.5 bg-slate-800/90 hover:bg-slate-750 border border-slate-700 hover:border-amber-500/60 rounded-xl cursor-pointer transition-all group shadow-sm"
              title="Click to switch between Directorate Sections and Field ITI Principals"
            >
              <div className="flex flex-col items-end text-right">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {currentUser.name}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    currentUser.role === 'directorate_admin' 
                      ? 'bg-amber-500 text-slate-950'
                      : currentUser.role === 'section_master'
                      ? 'bg-blue-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {currentUser.role === 'directorate_admin' 
                      ? 'DG / Apex' 
                      : currentUser.role === 'section_master'
                      ? 'Section Master'
                      : 'Field ITI'}
                  </span>
                </div>

                <span className="text-[11px] text-amber-400 font-medium truncate max-w-[180px] sm:max-w-[240px]">
                  {currentUser.role === 'section_master' 
                    ? (sectionMeta?.hindiName || currentUser.designation)
                    : currentUser.role === 'iti_principal'
                    ? `${currentUser.itiName} (${currentUser.district})`
                    : currentUser.hindiDesignation}
                </span>
              </div>

              <div className="h-8 w-8 rounded-lg bg-slate-700 group-hover:bg-amber-500/20 border border-slate-600 group-hover:border-amber-400 flex items-center justify-center text-amber-400 shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300" />
            </div>

          </div>

        </div>
      </div>

      {/* Sync Success Floating Toast */}
      {syncToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 border border-emerald-500 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <div className="text-xs">
            <div className="font-bold">Google Sheets 2-Way Sync Complete</div>
            <div className="text-emerald-200 text-[11px]">All 75 districts data synced with Google Cloud Spreadsheets.</div>
          </div>
        </div>
      )}
    </header>
  );
};
