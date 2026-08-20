import React, { useState } from 'react';
import { LanguageStudioView } from './components/language/LanguageStudioView';
import { PlayStoreGuideModal } from './components/PlayStoreGuideModal';
import { 
  Globe2, 
  Flame, 
  Sparkles, 
  Award, 
  Volume2, 
  Languages,
  BookOpen,
  HelpCircle,
  Building2,
  Mic,
  ShieldCheck,
  Smartphone,
  Download
} from 'lucide-react';

export default function App() {
  const [dailyStreak] = useState<number>(7);
  const [totalXp] = useState<number>(1420);
  const [level] = useState<string>('प्रवीण • Skilled');
  const [isPlayStoreModalOpen, setIsPlayStoreModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Official Government Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-700 text-white text-[11px] font-semibold py-1.5 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] tracking-wide uppercase font-bold">
              उत्तर प्रदेश सरकार (Govt. of Uttar Pradesh)
            </span>
            <span className="hidden sm:inline">
              व्यावसायिक शिक्षा, कौशल विकास एवं उद्यमशीलता विभाग | Department of Vocational Education & Skill Development
            </span>
            <span className="sm:hidden">
              प्रशिक्षण निदेशालय, उ.प्र.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlayStoreModalOpen(true)}
              className="flex items-center gap-1.5 bg-black/30 hover:bg-black/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-200 transition-colors border border-amber-300/30"
            >
              <Smartphone className="w-3 h-3 text-emerald-400" />
              <span>📱 Play Store / Android App</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 bg-black/20 px-2.5 py-0.5 rounded-full text-[10px] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>AI उच्चारण जांच पोर्टल: सक्रिय (Active)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Application Header */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Directorate Identity & Bhashadoot Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-2xl sm:text-3xl shadow-lg shadow-amber-500/25 shrink-0 border-2 border-amber-300 ring-2 ring-amber-500/20">
              भा
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400 tracking-tight drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
                    भाषादूत
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold tracking-wider px-2.5 py-0.5 rounded-lg bg-amber-400/15 text-amber-300 border border-amber-400/30 uppercase">
                    Bhashadoot
                  </span>
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700 hidden sm:inline-flex items-center gap-1 shadow-sm">
                  <span>🏛️ प्रशिक्षण निदेशालय, उ.प्र.</span>
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-300 font-medium mt-0.5 line-clamp-1 sm:line-clamp-none">
                प्रवासी श्रमिक विदेशी भाषा एवं कौशल प्रशिक्षण केंद्र • International Employment Skill Portal
              </p>
            </div>
          </div>

          {/* Gamification Stats Strip & Play Store Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Play Store & Install Button */}
            <button
              id="btn-header-install-app"
              onClick={() => setIsPlayStoreModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/20 to-amber-500/20 border border-emerald-500/50 hover:border-amber-400 text-emerald-300 hover:text-amber-300 text-xs font-bold transition-all shadow-sm group cursor-pointer"
              title="ऐप डाउनलोड व इंस्टालेशन गाइड (App Download & Play Store Guide)"
            >
              <Smartphone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">📱 ऐप डाउनलोड (Install)</span>
              <span className="sm:hidden">ऐप डाउनलोड</span>
            </button>

            {/* Daily Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800" title="अभ्यास निरंतरता (Daily Streak)">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span className="text-xs font-mono font-bold text-white">
                {dailyStreak} <span className="hidden sm:inline text-slate-400 font-normal">दिन</span>
              </span>
            </div>

            {/* Total XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800" title="कौशल अंक (Skill XP Points)">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-amber-400">
                {totalXp} <span className="hidden sm:inline text-slate-400 font-normal">XP</span>
              </span>
            </div>

            {/* Active Level Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-bold font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{level}</span>
            </div>

          </div>

        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <LanguageStudioView />
      </main>

      {/* Application Footer */}
      <footer id="app-footer" className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="font-bold text-slate-200 text-xs">
                प्रशिक्षण निदेशालय, उत्तर प्रदेश (Directorate of Training, Govt. of UP)
              </div>
              <div className="text-[11px] text-slate-400">
                व्यावसायिक शिक्षा, कौशल विकास एवं उद्यमशीलता विभाग • लखनऊ, उ.प्र.
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                id="btn-playstore-modal-footer"
                onClick={() => setIsPlayStoreModalOpen(true)}
                className="text-amber-400 hover:text-amber-300 underline font-medium text-xs flex items-center gap-1 cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>गूगल प्ले स्टोर / एंड्रॉइड ऐप गाइड</span>
              </button>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <div className="text-slate-400 text-[11px]">
                गल्फ अरबी • जर्मन • जापानी • अंग्रेजी • फ्रेंच • स्पेनिश
              </div>
            </div>
          </div>

          {/* Official Developer Attribution */}
          <div className="pt-3 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-300 font-medium">
                Developed by <strong className="text-amber-400 font-bold">Mayank Mishra</strong> (Assistant Director O/o Directorate of Training, Lucknow, Uttar Pradesh)
              </span>
            </div>
            <div className="text-slate-500 font-mono text-[10px]">
              भाषादूत • उत्तर प्रदेश सरकार श्रमवीर कौशल पोर्टल
            </div>
          </div>
        </div>
      </footer>

      {/* Play Store & Android App Guide Modal */}
      <PlayStoreGuideModal 
        isOpen={isPlayStoreModalOpen}
        onClose={() => setIsPlayStoreModalOpen(false)}
      />

    </div>
  );
}

