import React, { useState, useRef, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, LanguageConfig } from '../../data/languageCurriculum';
import { MigrantVocabItem } from '../../data/migrantVocabData';
import { AiRoleplayView } from './AiRoleplayView';
import { GrammarLabView } from './GrammarLabView';
import { FlashcardsView } from './FlashcardsView';
import { CulturalEtiquetteView } from './CulturalEtiquetteView';
import { QuizArenaView } from './QuizArenaView';
import { ScriptStudioView } from './ScriptStudioView';
import { VoicePronunciationCoachView } from './VoicePronunciationCoachView';
import { MigrantVocabBankView } from './MigrantVocabBankView';
import { 
  Mic, 
  BookMarked, 
  MessageSquare, 
  Sparkles, 
  Layers, 
  Lightbulb, 
  Award, 
  Edit3, 
  Globe, 
  ChevronDown, 
  Check, 
  HelpCircle,
  CheckCircle2,
  Compass,
  ArrowRight,
  Plane,
  HardHat,
  ChevronUp
} from 'lucide-react';

export type LanguageSubTab = 
  | 'voice-coach'
  | 'vocab-150'
  | 'roleplay'
  | 'grammar'
  | 'flashcards'
  | 'culture'
  | 'quiz'
  | 'script';

interface ShramikMenuItem {
  id: LanguageSubTab;
  stepNumber: number;
  shortTitleHindi: string;
  fullTitleHindi: string;
  simpleExplanation: string;
  englishSub: string;
  icon: React.FC<{ className?: string }>;
  isPrimary?: boolean;
}

interface LanguageMetaInfo {
  id: string;
  titleHindi: string;
  destinationsHindi: string;
  jobsHindi: string;
  badgeHindi: string;
}

export const LanguageStudioView: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<LanguageConfig>(SUPPORTED_LANGUAGES[0]);
  const [activeSubTab, setActiveSubTab] = useState<LanguageSubTab>('voice-coach');
  const [isLangGridExpanded, setIsLangGridExpanded] = useState<boolean>(true);
  const [selectedVocabForTest, setSelectedVocabForTest] = useState<MigrantVocabItem | null>(null);
  
  // Dropdown states
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);
  const [isModuleDropdownOpen, setIsModuleDropdownOpen] = useState<boolean>(false);
  const [showHelperGuide, setShowHelperGuide] = useState<boolean>(false);
  const [switchAlert, setSwitchAlert] = useState<string | null>(null);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const moduleDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (moduleDropdownRef.current && !moduleDropdownRef.current.contains(event.target as Node)) {
        setIsModuleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper destination countries mapping for shramik clarity
  const languageMeta: Record<string, LanguageMetaInfo> = {
    'uae-arabic': {
      id: 'uae-arabic',
      titleHindi: 'गल्फ अरबी (Gulf Arabic)',
      destinationsHindi: 'दुबई, सऊदी अरब, कतर, ओमान, कुवैत',
      jobsHindi: 'निर्माण, ड्राइविंग, वेल्डिंग, होटल व सुरक्षा',
      badgeHindi: '🇦🇪 सबसे अधिक मांग (GCC)'
    },
    'german': {
      id: 'german',
      titleHindi: 'जर्मन भाषा (Deutsch)',
      destinationsHindi: 'जर्मनी, ऑस्ट्रिया, स्विट्जरलैंड',
      jobsHindi: 'इलेक्ट्रीशियन, फिटर, नर्सिंग व तकनीकी कारीगर',
      badgeHindi: '🇩🇪 यूरोप स्किल्ड मिशन'
    },
    'japanese': {
      id: 'japanese',
      titleHindi: 'जापानी भाषा (Nihongo)',
      destinationsHindi: 'जापान (टोक्यो, ओसाका व अन्य प्रान्त)',
      jobsHindi: 'TITP व SSW तकनीकी इंटर्न, मैन्युफैक्चरिंग',
      badgeHindi: '🇯🇵 TITP / SSW इंटर्नशिप'
    },
    'english': {
      id: 'english',
      titleHindi: 'इंटरनेशनल इंग्लिश (Workplace English)',
      destinationsHindi: 'ग्लोबल इंटरनेशनल प्रोजेक्ट्स, यूके, खाड़ी देश',
      jobsHindi: 'सेफ्टी ऑफिसर, फोरमैन, तकनीशियन व वैश्विक काम',
      badgeHindi: '🇬🇧 वैश्विक कार्यस्थल'
    },
    'french': {
      id: 'french',
      titleHindi: 'फ्रेंच भाषा (Français)',
      destinationsHindi: 'फ्रांस, बेल्जियम, मॉरीशस, कनाडा',
      jobsHindi: 'निर्माण, शेफ, कृषि, हॉस्पिटैलिटी',
      badgeHindi: '🇫🇷 यूरोप व मॉरीशस'
    },
    'spanish': {
      id: 'spanish',
      titleHindi: 'स्पैनिश भाषा (Español)',
      destinationsHindi: 'स्पेन व लैटिन अमेरिकी देश',
      jobsHindi: 'मेंटेनेंस, लॉजिस्टिक्स, फैक्ट्री व सेवा क्षेत्र',
      badgeHindi: '🇪🇸 अंतरराष्ट्रीय रोजगार'
    }
  };

  const getCountryDestinations = (langId: string) => {
    return languageMeta[langId]?.destinationsHindi || 'अंतरराष्ट्रीय विदेश रोजगार';
  };

  const handleSelectLanguage = (lang: LanguageConfig) => {
    setSelectedLang(lang);
    setIsLangDropdownOpen(false);
    setSwitchAlert(`आपने "${lang.name}" चुनी है। सभी पाठ व AI टेस्ट अब इस भाषा में लोड हो चुके हैं।`);
    setTimeout(() => setSwitchAlert(null), 4000);
  };

  // Simple, worker-friendly clear menu definitions
  const menuItems: ShramikMenuItem[] = [
    { 
      id: 'voice-coach', 
      stepNumber: 1,
      shortTitleHindi: 'बोलकर उच्चारण जांच',
      fullTitleHindi: '१. बोलकर उच्चारण जांच (Voice Coach)', 
      simpleExplanation: 'माइक दबाकर 4-5 सेकंड बोलें और तुरंत AI स्कोर व सुधार टिप पाएं',
      englishSub: 'Speak & AI Pronunciation Test',
      icon: Mic,
      isPrimary: true
    },
    { 
      id: 'vocab-150', 
      stepNumber: 2,
      shortTitleHindi: '200+ काम व अभिवादन शब्द',
      fullTitleHindi: '२. 200+ काम व सामान्य अभिवादन शब्द (200+ Words & Greetings)', 
      simpleExplanation: 'जापानी (200+ शब्द), नमस्ते/शिष्टाचार, निर्माण, 5S, मशीनिंग, देखभाल, होटल, गाड़ी व कृषि के जरूरी शब्द',
      englishSub: 'Trade & Daily Greetings Vocab (200+)',
      icon: BookMarked 
    },
    { 
      id: 'roleplay', 
      stepNumber: 3,
      shortTitleHindi: 'काम पर बातचीत',
      fullTitleHindi: '३. काम पर बातचीत का अभ्यास (Roleplay)', 
      simpleExplanation: 'सुपरवाइज़र, इंजीनियर और फोरमैन से काम पर कैसे बात करें',
      englishSub: 'Workplace Dialogue Practice',
      icon: MessageSquare 
    },
    { 
      id: 'grammar', 
      stepNumber: 4,
      shortTitleHindi: 'वाक्य बनाना सीखें',
      fullTitleHindi: '४. छोटे वाक्य बनाना सीखें (Grammar)', 
      simpleExplanation: 'आदेश समझना, हां/ना बोलना और सवाल पूछने के सरल नियम',
      englishSub: 'Simple Sentence Builder',
      icon: Sparkles 
    },
    { 
      id: 'flashcards', 
      stepNumber: 5,
      shortTitleHindi: 'याद रखने के कार्ड्स',
      fullTitleHindi: '५. याद रखने के कार्ड्स (Flashcards)', 
      simpleExplanation: 'चित्र और देवनागरी उच्चारण वाले कार्ड्स से आसानी से याद करें',
      englishSub: 'Memory Practice Cards',
      icon: Layers 
    },
    { 
      id: 'culture', 
      stepNumber: 6,
      shortTitleHindi: 'विदेश के नियम व सुरक्षा',
      fullTitleHindi: '६. विदेश के नियम व सुरक्षा (Rules & Safety)', 
      simpleExplanation: 'गल्फ व अन्य देशों के कानून, रीति-रिवाज, वीजा और सुरक्षा सावधानियां',
      englishSub: 'Workplace Etiquette & Laws',
      icon: Lightbulb 
    },
    { 
      id: 'quiz', 
      stepNumber: 7,
      shortTitleHindi: 'सवाल-जवाब टेस्ट',
      fullTitleHindi: '७. सवाल-जवाब टेस्ट (Quiz Arena)', 
      simpleExplanation: '4 विकल्पों वाले आसान सवालों से अपनी भाषा की तैयारी परखें',
      englishSub: 'Knowledge & Vocab Test',
      icon: Award 
    },
    { 
      id: 'script', 
      stepNumber: 8,
      shortTitleHindi: 'अक्षर व वर्णमाला',
      fullTitleHindi: '८. अक्षर व वर्णमाला (Script & Letters)', 
      simpleExplanation: 'अरबी, जापानी व अंग्रेजी के अक्षर पढ़ना और पहचानना सीखें',
      englishSub: 'Alphabet & Letter Recognition',
      icon: Edit3 
    },
  ];

  const currentItem = menuItems.find(m => m.id === activeSubTab) || menuItems[0];

  // Filter languages to target international workplace options
  const targetLanguages = SUPPORTED_LANGUAGES.filter(l => l.id !== 'hindi');

  return (
    <div className="space-y-6">
      
      {/* 🌟 1. SUPER PROMINENT LANGUAGE SELECTION HERO SECTION (ऐप खोलते ही सबसे पहले स्पष्ट भाषा चयन) */}
      <div 
        id="language-selection-hero" 
        className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-3 border-amber-500/60 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden ring-4 ring-amber-500/10"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          
          {/* Header Row with Tag & Directorate Notice */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black tracking-wide flex items-center gap-1.5 shadow-md shadow-amber-500/20">
                  <Globe className="w-3.5 h-3.5" />
                  <span>कदम १ : अपनी भाषा व गंतव्य देश चुनें</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-amber-300 text-[11px] font-bold">
                  Select Target Country & Language
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <span>जिस देश में काम करने जाना है, उस भाषा पर क्लिक करें:</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                नीचे दिए गए किसी भी देश/भाषा कार्ड पर १-क्लिक करें — पूरा पोर्टल, शब्दावली और AI आवाज टेस्ट तुरंत उसी भाषा में शुरू हो जाएगा।
              </p>
            </div>

            {/* Collapse / Expand Toggle Button */}
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <button
                id="btn-toggle-lang-grid"
                type="button"
                onClick={() => setIsLangGridExpanded(!isLangGridExpanded)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                {isLangGridExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 text-amber-400" />
                    <span>कार्ड्स समेटें</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 text-amber-400" />
                    <span>सभी ६ भाषाएं देखें ({selectedLang.flag} {selectedLang.name})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Alert Toast on Language Switch */}
          {switchAlert && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-2xl text-xs sm:text-sm text-emerald-200 font-bold flex items-center gap-2 animate-fadeIn shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{switchAlert}</span>
            </div>
          )}

          {/* 🌟 6 BIG, INTERACTIVE LANGUAGE DESTINATION CARDS (स्पष्ट ६ भाषा कार्ड्स) */}
          {isLangGridExpanded ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
              {targetLanguages.map((lang) => {
                const isSelected = selectedLang.id === lang.id;
                const meta = languageMeta[lang.id] || {
                  id: lang.id,
                  titleHindi: lang.name,
                  destinationsHindi: 'विदेश रोजगार',
                  jobsHindi: 'कुशल श्रमिक कार्य',
                  badgeHindi: '🌍 अंतरराष्ट्रीय'
                };

                return (
                  <button
                    key={lang.id}
                    id={`lang-card-${lang.id}`}
                    type="button"
                    onClick={() => handleSelectLanguage(lang)}
                    className={`relative p-4 sm:p-5 rounded-2xl text-left transition-all cursor-pointer group flex flex-col justify-between min-h-[145px] ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-slate-900 border-3 border-amber-400 ring-4 ring-amber-500/20 shadow-xl shadow-amber-500/10 scale-[1.02]'
                        : 'bg-slate-950/90 hover:bg-slate-800/90 border-2 border-slate-800 hover:border-amber-500/60 shadow-md'
                    }`}
                  >
                    {/* Top Row: Flag + Status Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl sm:text-4xl p-1 rounded-xl bg-slate-900/80 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform">
                          {lang.flag}
                        </span>
                        <div>
                          <div className={`text-base sm:text-lg font-black tracking-tight leading-tight ${isSelected ? 'text-amber-300' : 'text-white group-hover:text-amber-300'}`}>
                            {meta.titleHindi}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {lang.nativeName}
                          </div>
                        </div>
                      </div>

                      {/* Selected / Select Button Indicator */}
                      {isSelected ? (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-black shrink-0 flex items-center gap-1 shadow-md shadow-amber-500/30">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>सक्रिय भाषा</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-slate-900 group-hover:bg-amber-500 text-slate-300 group-hover:text-slate-950 text-[11px] font-bold shrink-0 border border-slate-700 group-hover:border-amber-400 transition-all">
                          चुनें →
                        </span>
                      )}
                    </div>

                    {/* Middle: Key Countries & Target Jobs */}
                    <div className="space-y-1 mt-3 pt-2.5 border-t border-slate-800/80">
                      <div className="text-xs text-amber-200/90 font-bold flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{meta.destinationsHindi}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <HardHat className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{meta.jobsHindi}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Collapsed Quick Language Bar */
            <div className="flex flex-wrap items-center gap-2 p-2.5 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 px-2">त्वरित भाषा बदलें:</span>
              {targetLanguages.map((lang) => {
                const isSelected = selectedLang.id === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => handleSelectLanguage(lang)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name.split(' ')[0]}</span>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Active Language Confirmation Banner */}
          <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-slate-300 font-medium">
                वर्तमान में चुनी गई भाषा: <strong className="text-amber-400 font-black">{selectedLang.name}</strong> ({selectedLang.nativeName}) — {getCountryDestinations(selectedLang.id)}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              ८ प्रशिक्षण भाग सक्रिय हैं
            </div>
          </div>

        </div>
      </div>

      {/* 2. SHRAMIK EASY NAVIGATION BAR & MODULE SELECTOR (८ प्रशिक्षण भाग) */}
      <div className="bg-slate-900 border-2 border-slate-700/80 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
        
        {/* Top Header Strip inside Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          
          {/* Active Module Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-black text-amber-400 uppercase tracking-wider">
                कदम २ : पढ़ाई का भाग चुनें (Select Learning Module)
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {currentItem.fullTitleHindi}
              </h3>
            </div>
          </div>

          {/* Quick Helper Toggle Button */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              id="btn-worker-help-guide"
              type="button"
              onClick={() => setShowHelperGuide(!showHelperGuide)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>{showHelperGuide ? 'गाइड छिपाएं' : '❓ कैसे इस्तेमाल करें? (गाइड)'}</span>
            </button>
          </div>

        </div>

        {/* 2 LARGE ACCESSIBLE DROPDOWN CONTROLS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          
          {/* 1. LANGUAGE SELECTOR DROPDOWN (भाषा बदलें ड्रॉपडाउन) */}
          <div className="relative" ref={langDropdownRef}>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>१. भाषा ड्रॉपडाउन (Change Language):</span>
            </label>

            <button
              id="btn-language-selector-main"
              type="button"
              onClick={() => {
                setIsLangDropdownOpen(!isLangDropdownOpen);
                setIsModuleDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-850 text-white border-2 border-amber-500/50 hover:border-amber-400 font-bold transition-all cursor-pointer shadow-lg group"
            >
              <div className="flex items-center gap-3 text-left">
                <span className="text-2xl">{selectedLang.flag}</span>
                <div>
                  <div className="text-sm font-black text-amber-300 group-hover:text-amber-200">
                    {selectedLang.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {getCountryDestinations(selectedLang.id)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/30">
                <span>बदलें</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Language Dropdown Menu */}
            {isLangDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border-2 border-amber-500/60 rounded-2xl shadow-2xl z-50 p-2 space-y-1.5 backdrop-blur-xl">
                <div className="px-3 py-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
                  <span>उपलब्ध भाषाएं (जिस देश में जाना हो उसे चुनें):</span>
                </div>
                {targetLanguages.map((lang) => {
                  const isSelected = selectedLang.id === lang.id;
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => handleSelectLanguage(lang)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                          : 'text-slate-100 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <div className="text-xs sm:text-sm font-black leading-tight">
                            {lang.name}
                          </div>
                          <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-slate-950 font-semibold' : 'text-slate-400'}`}>
                            {getCountryDestinations(lang.id)}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 text-[10px] font-black shrink-0">
                          सक्रिय ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. LEARNING MODULE SELECTOR DROPDOWN (पढ़ाई का भाग चुनें) */}
          <div className="relative" ref={moduleDropdownRef}>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>२. पढ़ाई का भाग चुनें (Select Learning Part):</span>
            </label>

            <button
              id="btn-module-selector-main"
              type="button"
              onClick={() => {
                setIsModuleDropdownOpen(!isModuleDropdownOpen);
                setIsLangDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-850 text-white border-2 border-emerald-500/50 hover:border-emerald-400 font-bold transition-all cursor-pointer shadow-lg group"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <currentItem.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-black text-emerald-300 group-hover:text-emerald-200">
                    {currentItem.fullTitleHindi}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                    {currentItem.simpleExplanation}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/30 shrink-0">
                <span>भाग चुनें</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isModuleDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Module Dropdown Menu */}
            {isModuleDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border-2 border-emerald-500/60 rounded-2xl shadow-2xl z-50 p-2 space-y-1.5 backdrop-blur-xl max-h-[75vh] overflow-y-auto">
                <div className="px-3 py-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
                  <span>८ प्रशिक्षण भाग (कोई भी भाग चुनकर तुरंत सीखें):</span>
                </div>
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeSubTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveSubTab(item.id);
                        setIsModuleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                          : 'text-slate-100 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isSelected ? 'bg-slate-950 text-emerald-400' : 'bg-slate-950 text-amber-400 border border-slate-800'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-black leading-tight flex items-center gap-1.5">
                            <span>{item.fullTitleHindi}</span>
                          </div>
                          <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-slate-950 font-semibold' : 'text-slate-400'}`}>
                            {item.simpleExplanation}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-5 h-5 text-slate-950 font-black shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* 8 BIG, CLEAR VISUAL BUTTONS / TABS (स्पष्ट मेनू बटन) */}
        <div className="pt-2">
          <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center justify-between">
            <span>सीधे किसी भी मेनू पर क्लिक करें:</span>
            <span className="text-amber-400 font-mono text-[10px]">कुल ८ भाग उपलब्ध</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSubTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-menu-btn-${item.id}`}
                  type="button"
                  onClick={() => setActiveSubTab(item.id)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl text-center transition-all cursor-pointer min-h-[72px] border ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/20 scale-[1.02]'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
                  }`}
                  title={item.simpleExplanation}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1 ${isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-900 text-amber-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold leading-tight">
                    {item.shortTitleHindi}
                  </span>
                  <span className={`text-[9px] font-mono mt-0.5 ${isActive ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                    भाग {item.stepNumber}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* WORKER QUICK HELPER GUIDE (आसान 3-चरण सहायता) */}
        {showHelperGuide && (
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between font-black text-amber-300 text-sm">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>श्रमिक साथी के लिए सरल उपयोग गाइड (How to Use):</span>
              </span>
              <button 
                type="button"
                onClick={() => setShowHelperGuide(false)}
                className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                बंद करें ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/20 space-y-1">
                <div className="font-bold text-white flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-black">1</span>
                  <span>भाषा चुनें</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  ऊपर दिए गए ६ देश कार्ड्स (जैसे गल्फ अरबी, जर्मन, जापानी, इंग्लिश) में से अपने गंतव्य देश पर १-क्लिक करें।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/20 space-y-1">
                <div className="font-bold text-white flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">2</span>
                  <span>प्रशिक्षण भाग चुनें</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  ८ प्रशिक्षण भागों (उच्चारण जांच, 200+ शब्द, बातचीत, व्याकरण) में से जो सीखना चाहें उस पर टैप करें।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/20 space-y-1">
                <div className="font-bold text-white flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">3</span>
                  <span>माइक दबाकर बोलें</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  माइक दबाकर देवनागरी में लिखा शब्द बोलें। 4-5 सेकंड में AI आपको तुरंत नंबर और सही तरीका बताएगा।
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 3. ACTIVE LEARNING MODULE CONTAINER */}
      <div className="space-y-6">
        
        {/* Active Module Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-slate-300 font-medium">
              वर्तमान खुला हुआ भाग: <strong className="text-white">{currentItem.fullTitleHindi}</strong>
            </span>
          </div>
          <span className="text-[11px] text-amber-400 font-mono font-bold hidden sm:inline">
            सक्रिय भाषा: {selectedLang.flag} {selectedLang.name}
          </span>
        </div>

        {/* View Routing */}
        {activeSubTab === 'voice-coach' && (
          <VoicePronunciationCoachView 
            currentLanguage={selectedLang} 
            selectedVocabItem={selectedVocabForTest}
          />
        )}

        {activeSubTab === 'vocab-150' && (
          <MigrantVocabBankView 
            currentLanguage={selectedLang}
            onSelectForVoiceTest={(item) => {
              setSelectedVocabForTest(item);
              setActiveSubTab('voice-coach');
            }}
          />
        )}

        {activeSubTab === 'roleplay' && (
          <AiRoleplayView currentLanguage={selectedLang} />
        )}

        {activeSubTab === 'grammar' && (
          <GrammarLabView currentLanguage={selectedLang} />
        )}

        {activeSubTab === 'flashcards' && (
          <FlashcardsView currentLanguage={selectedLang} />
        )}

        {activeSubTab === 'culture' && (
          <CulturalEtiquetteView currentLanguage={selectedLang} />
        )}

        {activeSubTab === 'quiz' && (
          <QuizArenaView currentLanguage={selectedLang} />
        )}

        {activeSubTab === 'script' && (
          <ScriptStudioView currentLanguage={selectedLang} />
        )}
      </div>

    </div>
  );
};
