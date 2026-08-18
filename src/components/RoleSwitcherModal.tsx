import React, { useState } from 'react';
import { UserProfile, DirectorateSection, ITIType } from '../types';
import { PRESET_USERS, DIRECTORATE_SECTIONS, ALL_UP_DISTRICTS, UP_DIVISIONS } from '../data/upDistrictsData';
import { 
  Users, 
  Building, 
  Shield, 
  Award, 
  Briefcase, 
  DollarSign, 
  Wrench, 
  Server, 
  Check, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  School, 
  X, 
  Search, 
  LogIn, 
  CheckCircle2, 
  UserCheck,
  KeyRound,
  ShieldCheck,
  Plus
} from 'lucide-react';

interface RoleSwitcherModalProps {
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: UserProfile) => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({
  currentUser,
  isOpen,
  onClose,
  onSelectUser
}) => {
  const [activeTab, setActiveTab] = useState<'sections' | 'field_itis' | 'custom_iti' | 'directorate'>('sections');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivisionFilter, setSelectedDivisionFilter] = useState<string>('all');
  const [selectedItiTypeFilter, setSelectedItiTypeFilter] = useState<string>('all');

  // Custom ITI Login Form State
  const [customDistrict, setCustomDistrict] = useState<string>('Lucknow');
  const [customItiName, setCustomItiName] = useState<string>('Government ITI');
  const [customItiType, setCustomItiType] = useState<ITIType>('Govt ITI');
  const [customPrincipalName, setCustomPrincipalName] = useState<string>('Principal / Officer');
  const [customItiCode, setCustomItiCode] = useState<string>('ITI_UP_NEW');

  if (!isOpen) return null;

  // Filter users
  const directorateAdmins = PRESET_USERS.filter((u) => u.role === 'directorate_admin');
  const sectionMasters = PRESET_USERS.filter((u) => u.role === 'section_master');
  const fieldItis = PRESET_USERS.filter((u) => {
    if (u.role !== 'iti_principal') return false;
    if (selectedDivisionFilter !== 'all' && u.division !== selectedDivisionFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = u.name.toLowerCase().includes(q) || (u.itiName && u.itiName.toLowerCase().includes(q));
      const matchCode = u.itiCode && u.itiCode.toLowerCase().includes(q);
      const matchDist = u.district && u.district.toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchDist) return false;
    }
    return true;
  });

  const getSectionIcon = (sectionId?: DirectorateSection) => {
    switch (sectionId) {
      case 'admin_est': return <Users className="w-5 h-5 text-blue-400" />;
      case 'exam_cell': return <Award className="w-5 h-5 text-purple-400" />;
      case 'apprenticeship': return <Briefcase className="w-5 h-5 text-emerald-400" />;
      case 'accounts_fin': return <DollarSign className="w-5 h-5 text-amber-400" />;
      case 'infra_store': return <Wrench className="w-5 h-5 text-orange-400" />;
      case 'inspection_qa': return <Shield className="w-5 h-5 text-rose-400" />;
      case 'it_mis': return <Server className="w-5 h-5 text-cyan-400" />;
      default: return <Building className="w-5 h-5 text-amber-400" />;
    }
  };

  const handleCreateAndLoginCustomIti = () => {
    const code = customItiCode.trim() || `ITI_${customDistrict.toUpperCase().slice(0, 3)}_${Math.floor(100 + Math.random() * 900)}`;
    const fullItiName = `${customItiType === 'Govt ITI' ? 'Govt. ITI' : customItiType} ${customDistrict}`;
    
    const newProfile: UserProfile = {
      id: `user_${code.toLowerCase()}`,
      name: customPrincipalName.trim() || 'Principal / Centre Superintendent',
      hindiName: `प्रधानाचार्य, ${fullItiName}`,
      designation: `Principal, ${fullItiName}`,
      hindiDesignation: `प्रधानाचार्य, ${fullItiName}`,
      role: 'iti_principal',
      itiCode: code,
      itiName: fullItiName,
      district: customDistrict,
      division: customDistrict,
      email: `${code.toLowerCase()}@up.gov.in`,
      phone: '9415000000'
    };

    onSelectUser(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <span>निदेशालय अनुभाग एवं फील्ड आईटीआई लॉगिन पोर्टल</span>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                  NIC UP Authentication
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Log in as any of the 7 Directorate Section Masters, 75 District Field ITI Principals, or Apex Administration.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active User Banner */}
        <div className="bg-slate-850/90 px-5 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs text-slate-300 font-medium">वर्तमान सक्रिय लॉगिन:</span>
            <span className="text-xs font-bold text-amber-300">{currentUser.name}</span>
            <span className="text-xs text-slate-400">({currentUser.designation})</span>
          </div>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
            Role: {currentUser.role}
          </span>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-800 bg-slate-900 overflow-x-auto no-scrollbar">
          
          {/* Tab 1: Section Masters */}
          <button
            type="button"
            onClick={() => setActiveTab('sections')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'sections'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Directorate Section Masters (7 अनुभाग अधिकारी)</span>
          </button>

          {/* Tab 2: Field ITIs */}
          <button
            type="button"
            onClick={() => setActiveTab('field_itis')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'field_itis'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <School className="w-4 h-4" />
            <span>Field ITI Principals (क्षेत्रीय आईटीआई प्रधानाचार्य)</span>
          </button>

          {/* Tab 3: Custom ITI Login */}
          <button
            type="button"
            onClick={() => setActiveTab('custom_iti')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'custom_iti'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>75 जनपदों में से आईटीआई चुनें (Login Any UP ITI)</span>
          </button>

          {/* Tab 4: Directorate Super Admin */}
          <button
            type="button"
            onClick={() => setActiveTab('directorate')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'directorate'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Apex Administration (महानिदेशक)</span>
          </button>

        </div>

        {/* Tab Contents Area */}
        <div className="p-5 overflow-y-auto max-h-[62vh] space-y-3">
          
          {/* 1. Directorate Section Masters */}
          {activeTab === 'sections' && (
            <div className="space-y-3">
              <div className="p-3 bg-blue-950/30 border border-blue-900/50 rounded-xl text-xs text-blue-200 flex items-center justify-between">
                <span>
                  Select any Directorate Section Officer to access their dynamic Form Builder, Google Sheet synchronization, and verification desk:
                </span>
                <span className="text-[11px] font-bold text-blue-400">7 Dedicated Sections</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sectionMasters.map((user) => {
                  const section = DIRECTORATE_SECTIONS.find((s) => s.id === user.section);
                  const isSelected = currentUser.id === user.id;

                  return (
                    <div
                      key={user.id}
                      onClick={() => {
                        onSelectUser(user);
                        onClose();
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                        isSelected
                          ? 'bg-blue-950/50 border-blue-500 ring-1 ring-blue-500/50 shadow-lg'
                          : 'bg-slate-850 hover:bg-slate-800 border-slate-750 hover:border-blue-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-750 shrink-0">
                            {getSectionIcon(user.section)}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {isSelected && <span className="text-[10px] bg-blue-500 text-slate-950 px-1.5 rounded font-black">ACTIVE</span>}
                            </h4>
                            <p className="text-[11px] text-amber-300 font-medium">{user.hindiName}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{user.designation}</p>
                          </div>
                        </div>

                        <span className="text-[10px] bg-slate-900 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-750 shrink-0">
                          {user.section?.toUpperCase()}
                        </span>
                      </div>

                      {section && (
                        <div className="p-2 bg-slate-900/70 rounded-lg text-[11px] text-slate-300 border border-slate-800 flex items-center justify-between">
                          <span className="truncate">{section.hindiName}</span>
                          <span className="text-blue-400 text-xs font-bold flex items-center gap-1 shrink-0 ml-2">
                            लॉगिन करें <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Field ITI Principals */}
          {activeTab === 'field_itis' && (
            <div className="space-y-3">
              
              {/* Search & Division Filter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by ITI Name, District, or Code..."
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <select
                    value={selectedDivisionFilter}
                    onChange={(e) => setSelectedDivisionFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="all">समस्त मंडल (All UP Divisions)</option>
                    {UP_DIVISIONS.map((div) => (
                      <option key={div} value={div}>{div} Division</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ITI List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fieldItis.map((user) => {
                  const isSelected = currentUser.id === user.id;

                  return (
                    <div
                      key={user.id}
                      onClick={() => {
                        onSelectUser(user);
                        onClose();
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        isSelected
                          ? 'bg-emerald-950/50 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg'
                          : 'bg-slate-850 hover:bg-slate-800 border-slate-750 hover:border-emerald-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-emerald-400 shrink-0">
                            <School className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>{user.itiName}</span>
                              {isSelected && <span className="text-[10px] bg-emerald-500 text-slate-950 px-1.5 rounded font-black">ACTIVE</span>}
                            </h4>
                            <p className="text-[11px] text-slate-300 font-medium">{user.name}</p>
                            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-amber-400" />
                              <span>{user.district}, {user.division} Division</span>
                            </p>
                          </div>
                        </div>

                        <span className="text-[10px] bg-slate-900 text-amber-300 font-mono px-2 py-0.5 rounded border border-slate-750 shrink-0">
                          {user.itiCode}
                        </span>
                      </div>

                      <div className="p-2 bg-slate-900/70 rounded-lg text-[11px] text-slate-300 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">दैनिक प्रपत्र प्रविष्टि डेस्क</span>
                        <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 shrink-0">
                          लॉगिन करें <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Custom ITI Generator / Login for Any District */}
          {activeTab === 'custom_iti' && (
            <div className="p-5 bg-slate-850 rounded-xl border border-slate-750 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>उत्तर प्रदेश के किसी भी जनपद के आईटीआई रूप में लॉगिन करें</span>
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Choose from any of UP's 75 districts to submit proformas and test field reporting as a local ITI Principal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    जनपद (Select District): *
                  </label>
                  <select
                    value={customDistrict}
                    onChange={(e) => setCustomDistrict(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    {ALL_UP_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    संस्थान श्रेणी (Category):
                  </label>
                  <select
                    value={customItiType}
                    onChange={(e) => setCustomItiType(e.target.value as ITIType)}
                    className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    <option value="Govt ITI">Govt. ITI (राजकीय)</option>
                    <option value="Govt Women ITI">Govt. Women ITI (महिला)</option>
                    <option value="Model ITI">Model ITI (मॉडल)</option>
                    <option value="Minority ITI">Minority ITI (अल्पसंख्यक)</option>
                    <option value="Private ITI">Private ITI (निजी)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    प्रधानाचार्य नाम (Principal Name):
                  </label>
                  <input
                    type="text"
                    value={customPrincipalName}
                    onChange={(e) => setCustomPrincipalName(e.target.value)}
                    placeholder="e.g. Shri Alok Kumar"
                    className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCreateAndLoginCustomIti}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>इस आईटीआई रूप में लॉगिन करें (Log in as {customItiType} {customDistrict})</span>
              </button>
            </div>
          )}

          {/* 4. Apex Directorate Super Admin */}
          {activeTab === 'directorate' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {directorateAdmins.map((user) => {
                  const isSelected = currentUser.id === user.id;

                  return (
                    <div
                      key={user.id}
                      onClick={() => {
                        onSelectUser(user);
                        onClose();
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                        isSelected
                          ? 'bg-amber-950/50 border-amber-500 ring-1 ring-amber-500/50 shadow-lg'
                          : 'bg-slate-850 hover:bg-slate-800 border-slate-750 hover:border-amber-500/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-amber-400 shrink-0">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{user.name}</span>
                            {isSelected && <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 rounded font-black">ACTIVE</span>}
                          </h4>
                          <p className="text-[11px] text-amber-300 font-medium">{user.hindiName}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{user.designation}</p>
                        </div>
                      </div>

                      <div className="p-2 bg-slate-900/70 rounded-lg text-[11px] text-slate-300 border border-slate-800 flex items-center justify-between">
                        <span>Apex Directorate Monitoring</span>
                        <span className="text-amber-400 text-xs font-bold flex items-center gap-1 shrink-0">
                          लॉगिन करें <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Unified State ITI SSO Portal • Directorate of Training, Lucknow</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            रद्द करें (Cancel)
          </button>
        </div>

      </div>
    </div>
  );
};
