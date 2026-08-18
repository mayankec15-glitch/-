import React, { useState } from 'react';
import { LanguageStudioView } from './components/language/LanguageStudioView';
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
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [dailyStreak] = useState<number>(7);
  const [totalXp] = useState<number>(1420);
  const [level] = useState<string>('प्रवीण • Skilled');

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
            <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-0.5 rounded-full text-[10px] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>AI उच्चारण जांच पोर्टल: सक्रिय (Active)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Application Header */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Directorate Identity */}
          <div className="flex items-center gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base sm:text-lg font-black text-white tracking-tight">
                  प्रशिक्षण निदेशालय, उत्तर प्रदेश
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40">
                  Directorate of Training
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                प्रवासी श्रमिक विदेशी भाषा एवं कौशल प्रशिक्षण केंद्र (International & Interstate Employment Skill Portal)
              </p>
            </div>
          </div>

          {/* Gamification Stats Strip */}
          <div className="flex items-center gap-2 sm:gap-4">
            
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
      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="font-bold text-slate-200 text-xs">
              प्रशिक्षण निदेशालय, उत्तर प्रदेश (Directorate of Training, Govt. of UP)
            </div>
            <div className="text-[11px] text-slate-400">
              व्यावसायिक शिक्षा, कौशल विकास एवं उद्यमशीलता विभाग • लखनऊ, उ.प्र.
            </div>
          </div>
          <div className="text-slate-400 text-[11px] text-center sm:text-right">
            गल्फ अरबी • जर्मन • जापानी • अंग्रेजी • फ्रेंच • स्पेनिश • 150+ कार्य शब्दावली व AI बोलकर उच्चारण टेस्ट
          </div>
        </div>
      </footer>

    </div>
  );
}
