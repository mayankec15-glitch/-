import React, { useState } from 'react';
import { UserProfile, CircularNotice, DirectorateSection, DynamicForm } from '../types';
import { DIRECTORATE_SECTIONS } from '../data/upDistrictsData';
import { 
  Bell, 
  FileText, 
  Send, 
  AlertTriangle, 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Check, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';

interface CircularsNoticesViewProps {
  currentUser: UserProfile;
  circulars: CircularNotice[];
  forms: DynamicForm[];
  onSaveCircular: (circ: CircularNotice) => void;
  onOpenLinkedForm: (formId: string) => void;
}

export const CircularsNoticesView: React.FC<CircularsNoticesViewProps> = ({
  currentUser,
  circulars,
  forms,
  onSaveCircular,
  onOpenLinkedForm
}) => {
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Circular Form State
  const [letterNumber, setLetterNumber] = useState(`DT-UP/${currentUser.section?.toUpperCase() || 'MIS'}/2026/${Math.floor(100 + Math.random() * 900)}`);
  const [title, setTitle] = useState('');
  const [hindiTitle, setHindiTitle] = useState('');
  const [section, setSection] = useState<DirectorateSection>(currentUser.section || 'admin_est');
  const [priority, setPriority] = useState<'normal' | 'urgent' | 'immediate'>('urgent');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [linkedFormId, setLinkedFormId] = useState('');
  const [summary, setSummary] = useState('');

  const filteredCirculars = circulars.filter((c) => {
    if (selectedSection !== 'all' && c.section !== selectedSection) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q) || c.hindiTitle.toLowerCase().includes(q);
      const matchLetter = c.letterNumber.toLowerCase().includes(q);
      const matchSummary = c.summary.toLowerCase().includes(q);
      if (!matchTitle && !matchLetter && !matchSummary) return false;
    }
    return true;
  });

  const handleCreateCircular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hindiTitle.trim() || !summary.trim()) {
      alert('कृपया विषय एवं सारांश दर्ज करें (Please enter title and summary)');
      return;
    }

    const newCirc: CircularNotice = {
      id: `circ_${Date.now()}`,
      letterNumber: letterNumber.trim(),
      title: title.trim() || hindiTitle.trim(),
      hindiTitle: hindiTitle.trim(),
      section: section,
      issueDate: new Date().toISOString().split('T')[0],
      deadlineDate: deadlineDate || undefined,
      priority: priority,
      linkedFormId: linkedFormId || undefined,
      summary: summary.trim(),
      signatory: `${currentUser.name} (${currentUser.designation})`
    };

    onSaveCircular(newCirc);
    setShowCreateModal(false);
    // Reset
    setTitle('');
    setHindiTitle('');
    setSummary('');
    setDeadlineDate('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-slate-850 p-5 rounded-2xl border border-slate-750 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-red-500/20 text-red-300 font-bold px-2.5 py-0.5 rounded-md border border-red-500/30 uppercase">
              Official Directorate Orders
            </span>
            <span className="text-xs text-slate-400">निदेशालय परिपत्र एवं अनिवार्य आदेश</span>
          </div>
          <h2 className="text-lg font-black text-white mt-1">
            प्रशिक्षण निदेशालय शासकीय आदेश एवं अनिवार्य प्रपत्र परिपत्र
          </h2>
          <p className="text-xs text-slate-300">
            Official directives issued to all 75 District Nodal Officers, Principal ITIs, and Private ITIs regarding day-to-day data reporting and compliance deadlines.
          </p>
        </div>

        {/* Action: Issue New Circular (Directorate Master) */}
        {currentUser.role !== 'iti_principal' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>नया परिपत्र जारी करें (Issue Circular)</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Section Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              selectedSection === 'all'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
            }`}
          >
            समस्त आदेश (All Circulars)
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

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search circular number, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

      </div>

      {/* Circulars List */}
      <div className="space-y-3">
        {filteredCirculars.map((circ) => {
          const sec = DIRECTORATE_SECTIONS.find((s) => s.id === circ.section);

          return (
            <div
              key={circ.id}
              className="bg-slate-850 rounded-2xl border border-slate-750 p-5 space-y-3 shadow-sm hover:border-slate-650 transition-all group"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    circ.priority === 'immediate' ? 'bg-red-950 text-red-300 border-red-800 animate-pulse' :
                    circ.priority === 'urgent' ? 'bg-orange-950 text-orange-300 border-orange-800' :
                    'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {circ.priority} Action
                  </span>

                  <span className="text-xs font-mono font-bold text-amber-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    पत्रांक: {circ.letterNumber}
                  </span>

                  <span className="text-xs text-slate-400">
                    • {sec?.hindiName}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>जारी दिनांक: <strong>{circ.issueDate}</strong></span>
                  {circ.deadlineDate && (
                    <span className="text-red-400 font-bold bg-red-950/40 px-2 py-0.5 rounded border border-red-900">
                      अंतिम तिथि: {circ.deadlineDate}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {circ.hindiTitle}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {circ.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-750 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-slate-400">
                  हस्ताक्षरकर्ता: <strong className="text-slate-200">{circ.signatory}</strong>
                </div>

                {circ.linkedFormId && (
                  <button
                    onClick={() => onOpenLinkedForm(circ.linkedFormId!)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow-sm"
                  >
                    <span>संबंधित प्रपत्र भरें (Fill Data Now)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Circular Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                नया निदेशालय परिपत्र / आदेश जारी करें (Issue Circular)
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCircular} className="p-6 overflow-y-auto max-h-[65vh] space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">पत्रांक संख्या (Letter No.)</label>
                  <input
                    type="text"
                    value={letterNumber}
                    onChange={(e) => setLetterNumber(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">प्राथमिकता (Priority)</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                  >
                    <option value="urgent">Urgent (अति-आवश्यक)</option>
                    <option value="immediate">Immediate / 24 Hours (तत्काल)</option>
                    <option value="normal">Normal (सामान्य)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">परिपत्र का विषय (Hindi Title) *</label>
                <input
                  type="text"
                  placeholder="e.g. आगामी अखिल भारतीय व्यावसायिक परीक्षा हेतु केंद्र तैयारी प्रपत्र प्रेषण"
                  value={hindiTitle}
                  onChange={(e) => setHindiTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">अनुभाग (Section)</label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value as DirectorateSection)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                  >
                    {DIRECTORATE_SECTIONS.map((s) => (
                      <option key={s.id} value={s.id}>{s.hindiName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">अंतिम अनुपालन तिथि (Deadline)</label>
                  <input
                    type="date"
                    value={deadlineDate}
                    onChange={(e) => setDeadlineDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">संबंधित डेटा प्रपत्र लिंक (Linked Form)</label>
                <select
                  value={linkedFormId}
                  onChange={(e) => setLinkedFormId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                >
                  <option value="">-- None (केवल सूचना) --</option>
                  {forms.map((f) => (
                    <option key={f.id} value={f.id}>{f.hindiTitle}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">विस्तृत आदेश / सारांश (Summary & Instructions) *</label>
                <textarea
                  rows={4}
                  placeholder="Enter full order text, compliance directives, and instructions..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs"
                >
                  आदेश जारी करें (Broadcast Circular)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
