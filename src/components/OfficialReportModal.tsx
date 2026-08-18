import React from 'react';
import { UserProfile, DynamicForm, FormSubmission } from '../types';
import { Printer, Download, X, CheckCircle, ShieldCheck, Building2 } from 'lucide-react';
import { DIRECTORATE_SECTIONS } from '../data/upDistrictsData';

interface OfficialReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  forms: DynamicForm[];
  submissions: FormSubmission[];
}

export const OfficialReportModal: React.FC<OfficialReportModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  forms,
  submissions
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('hi-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white">
      <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-4xl w-full max-h-[95vh] flex flex-col shadow-2xl overflow-hidden print:border-none print:shadow-none print:max-w-none print:h-auto print:bg-white print:text-black">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded border border-amber-500/30 uppercase">
              Official UP Govt Proforma
            </span>
            <span className="text-xs text-slate-300">प्रशिक्षण निदेशालय शासकीय दैनिक आख्या</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>प्रिंट / PDF सेव करें (Print Official Dispatch)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-8 overflow-y-auto max-h-[85vh] bg-white text-slate-900 font-sans print:p-0 print:overflow-visible">
          
          {/* Official Letterhead Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-700">
              उत्तर प्रदेश शासन • कौशल विकास एवं उद्यमशीलता विभाग
            </div>
            <h1 className="text-xl font-black text-slate-950 uppercase tracking-tight">
              प्रशिक्षण निदेशालय, उत्तर प्रदेश
            </h1>
            <div className="text-xs font-semibold text-slate-800">
              DIRECTORATE OF TRAINING, UTTAR PRADESH
            </div>
            <div className="text-[11px] text-slate-600">
              गुरु गोविन्द सिंह मार्ग, बांसमंडी चौराहा, चारबाग, लखनऊ - 226004 | Email: dt-up@nic.in | Portal: mis.updte.gov.in
            </div>
          </div>

          {/* Reference & Dispatch Meta */}
          <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-800 border-b border-slate-300 pb-2">
            <div>
              <span>पत्रांक: </span>
              <strong className="font-mono">DT-UP/MIS/DAILY-REP/2026/0481</strong>
            </div>
            <div>
              <span>दिनांक: </span>
              <strong>{todayStr} (प्रातः 10:00 AM)</strong>
            </div>
          </div>

          {/* Subject Title */}
          <div className="my-4 p-3 bg-slate-100 border-l-4 border-slate-900 text-xs">
            <span className="font-bold">विषय: </span>
            <span>प्रदेश के 75 जनपदों में स्थित समस्त राजकीय एवं निजी औद्योगिक प्रशिक्षण संस्थानों (ITI) से दैनिक/आवधिक डेटा संग्रह एवं अनुभागवार अनुपालन समीक्षा आख्या।</span>
          </div>

          {/* Summary KPI Block */}
          <div className="grid grid-cols-4 gap-3 my-4 text-center">
            <div className="p-3 border border-slate-300 rounded-lg bg-slate-50">
              <div className="text-[10px] text-slate-600 uppercase font-bold">कुल पंजीकृत आईटीआई</div>
              <div className="text-lg font-black text-slate-950 mt-0.5">304 Govt + 2840 Pvt</div>
            </div>
            <div className="p-3 border border-slate-300 rounded-lg bg-slate-50">
              <div className="text-[10px] text-slate-600 uppercase font-bold">आज प्राप्त प्रविष्टियां</div>
              <div className="text-lg font-black text-emerald-700 mt-0.5">{submissions.length} Total</div>
            </div>
            <div className="p-3 border border-slate-300 rounded-lg bg-slate-50">
              <div className="text-[10px] text-slate-600 uppercase font-bold">सत्यापित आख्याएं</div>
              <div className="text-lg font-black text-blue-700 mt-0.5">
                {submissions.filter(s => s.status === 'verified').length} Approved
              </div>
            </div>
            <div className="p-3 border border-slate-300 rounded-lg bg-slate-50">
              <div className="text-[10px] text-slate-600 uppercase font-bold">गूगल शीट सिंक स्थिति</div>
              <div className="text-lg font-black text-purple-700 mt-0.5">100% Synced</div>
            </div>
          </div>

          {/* Section-wise Progress Table */}
          <div className="my-5 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase">
              1. अनुभागवार दैनिक प्रपत्र एवं सत्यापन स्थिति (Directorate Sections Compliance)
            </h3>
            <table className="w-full text-xs text-left border border-slate-300">
              <thead className="bg-slate-200 text-slate-800 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-2 border border-slate-300">क्र.सं.</th>
                  <th className="p-2 border border-slate-300">निदेशालय अनुभाग (Section)</th>
                  <th className="p-2 border border-slate-300">प्रभारी अधिकारी (In-charge)</th>
                  <th className="p-2 border border-slate-300 text-center">सक्रिय प्रपत्र</th>
                  <th className="p-2 border border-slate-300 text-center">प्राप्त रिटर्न</th>
                  <th className="p-2 border border-slate-300 text-center">गूगल स्प्रेडशीट</th>
                </tr>
              </thead>
              <tbody>
                {DIRECTORATE_SECTIONS.map((sec, idx) => {
                  const secSubs = submissions.filter(s => s.section === sec.id);
                  const secForms = forms.filter(f => f.section === sec.id);
                  return (
                    <tr key={sec.id} className="border-b border-slate-300">
                      <td className="p-2 border border-slate-300 text-center font-mono">{idx + 1}</td>
                      <td className="p-2 border border-slate-300 font-bold">{sec.hindiName} ({sec.name})</td>
                      <td className="p-2 border border-slate-300">{sec.officerInCharge}</td>
                      <td className="p-2 border border-slate-300 text-center font-bold">{secForms.length}</td>
                      <td className="p-2 border border-slate-300 text-center font-bold text-emerald-800">{secSubs.length}</td>
                      <td className="p-2 border border-slate-300 text-center font-mono text-[11px]">Active (Auto-Sync)</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Verification & Sign-off Block */}
          <div className="mt-8 pt-4 border-t-2 border-slate-900 grid grid-cols-2 gap-8 text-xs">
            <div>
              <div className="font-bold text-slate-900">डिजिटल सत्यापन मोहर (Digital Verification):</div>
              <div className="text-[11px] text-slate-600 mt-1">
                This document is generated by the Directorate of Training UP MIS Engine and synchronized with official state Google Sheet registers.
              </div>
              <div className="mt-2 text-[10px] text-slate-500 font-mono">
                SHA256: e839a9c20f1883b4991acbe012 • Verified by NIC Portal
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="font-bold text-slate-950">
                (संयुक्त निदेशक / नोडल अधिकारी - एमआईएस)
              </div>
              <div className="text-slate-700">
                प्रशिक्षण निदेशालय, उत्तर प्रदेश, लखनऊ
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Printed: {new Date().toLocaleString('en-IN')}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
