import React, { useState, useRef, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, LanguageConfig } from '../../data/languageCurriculum';
import { MigrantVocabItem } from '../../data/migrantVocabData';
import { CountryFlagVisual, CountryFlagStripeBar, CountryFlagPaletteTag } from '../common/CountryFlagVisual';
import { unlockAudioEngine } from '../../utils/audioPlayer';
import { haptics } from '../../utils/haptics';
import { CountrySelectionPage } from './CountrySelectionPage';
import { ModuleMenuHubPage } from './ModuleMenuHubPage';
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
  ArrowLeft,
  Plane,
  HardHat,
  ChevronUp,
  Flag,
  Home,
  LayoutGrid
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

export type AppFlowStep = 'country-select' | 'menu-hub' | 'module-view';

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

export const LanguageStudioView: React.FC = () => {
  // Page Flow Step: 1 = 'country-select', 2 = 'menu-hub', 3 = 'module-view'
  const [pageStep, setPageStep] = useState<AppFlowStep>('country-select');
  const [selectedLang, setSelectedLang] = useState<LanguageConfig>(SUPPORTED_LANGUAGES[0]);
  const [activeSubTab, setActiveSubTab] = useState<LanguageSubTab>('voice-coach');
  const [selectedVocabForTest, setSelectedVocabForTest] = useState<MigrantVocabItem | null>(null);
  
  // Dropdown states for in-module switcher
  const [isModuleDropdownOpen, setIsModuleDropdownOpen] = useState<boolean>(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);
  const [switchAlert, setSwitchAlert] = useState<string | null>(null);

  const moduleDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moduleDropdownRef.current && !moduleDropdownRef.current.contains(event.target as Node)) {
        setIsModuleDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      fullTitleHindi: '२. 200+ काम व अभिवादन शब्द (Vocab Bank)', 
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
  const targetLanguages = SUPPORTED_LANGUAGES.filter(l => l.id !== 'hindi');

  // Handlers for page navigation
  const handleSelectCountry = (lang: LanguageConfig) => {
    unlockAudioEngine();
    setSelectedLang(lang);
    setPageStep('menu-hub');
    setSwitchAlert(`आपने "${lang.name}" चुनी है। सभी पाठ व AI टेस्ट अब इस भाषा में लोड हो चुके हैं।`);
    setTimeout(() => setSwitchAlert(null), 3500);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectModule = (module: LanguageSubTab) => {
    unlockAudioEngine();
    setActiveSubTab(module);
    setPageStep('module-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      
      {/* 🌟 PERSISTENT TOP STEP PROGRESS TRACKER BAR */}
      <div className="bg-slate-900/95 border-2 border-slate-800 rounded-2xl p-3 shadow-lg backdrop-blur-md sticky top-16 z-40">
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          
          {/* Step 1 Pill */}
          <button
            id="step-nav-country"
            onClick={() => {
              haptics.tap();
              setPageStep('country-select');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
              pageStep === 'country-select'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md shadow-amber-500/20'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>१. देश चयन</span>
            {pageStep !== 'country-select' && (
              <span className="text-[11px] text-amber-400 font-normal">
                ({selectedLang.flag} {selectedLang.name.split(' ')[0]})
              </span>
            )}
          </button>

          <span className="text-slate-600 font-bold shrink-0">→</span>

          {/* Step 2 Pill */}
          <button
            id="step-nav-menu"
            onClick={() => {
              haptics.tap();
              setPageStep('menu-hub');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
              pageStep === 'menu-hub'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md shadow-amber-500/20'
                : pageStep === 'module-view'
                ? 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
                : 'bg-slate-950/40 text-slate-400 border-slate-800/40 opacity-70'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>२. विषय मेन्यू (८ भाग)</span>
          </button>

          <span className="text-slate-600 font-bold shrink-0">→</span>

          {/* Step 3 Pill */}
          <button
            id="step-nav-module"
            disabled={pageStep === 'country-select'}
            onClick={() => {
              haptics.tap();
              setPageStep('module-view');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
              pageStep === 'module-view'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md shadow-amber-500/20 cursor-default'
                : pageStep === 'menu-hub'
                ? 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800 cursor-pointer'
                : 'bg-slate-950/40 text-slate-400 border-slate-800/40 opacity-50 cursor-not-allowed'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>३. सक्रिय अभ्यास</span>
            {pageStep === 'module-view' && (
              <span className="text-[10px] bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded-md font-mono">
                {currentItem.shortTitleHindi}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Alert Toast on Language Switch */}
      {switchAlert && (
        <div className="p-3.5 bg-emerald-950/90 border border-emerald-500/60 rounded-2xl text-xs sm:text-sm text-emerald-200 font-bold flex items-center gap-2.5 animate-fadeIn shadow-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{switchAlert}</span>
        </div>
      )}

      {/* 🌟 PAGE 1: COUNTRY & TARGET LANGUAGE SELECTION */}
      {pageStep === 'country-select' && (
        <CountrySelectionPage
          selectedLang={selectedLang}
          onSelectCountry={handleSelectCountry}
        />
      )}

      {/* 🌟 PAGE 2: MODULE MENU HUB (DASHBOARD) */}
      {pageStep === 'menu-hub' && (
        <ModuleMenuHubPage
          selectedLang={selectedLang}
          onChangeCountry={() => {
            haptics.tap();
            setPageStep('country-select');
          }}
          onSelectModule={handleSelectModule}
        />
      )}

      {/* 🌟 PAGE 3: ACTIVE RELEVANT MODULE PAGE */}
      {pageStep === 'module-view' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Top Sticky Header for Module Navigation & Country Quick Switch */}
          <div className="bg-slate-900 border-2 border-slate-700/80 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
            
            {/* Top Navigation Bar: Back to Menu & Country Switch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              
              <div className="flex items-center gap-2">
                <button
                  id="btn-back-to-menu"
                  onClick={() => {
                    haptics.tap();
                    setPageStep('menu-hub');
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 transition-all cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>← विषय मेन्यू (Back to Menu)</span>
                </button>

                <button
                  id="btn-switch-country-from-module"
                  onClick={() => {
                    haptics.tap();
                    setPageStep('country-select');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer"
                  title="गंतव्य देश बदलें"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">देश बदलें:</span>
                  <span>{selectedLang.flag} {selectedLang.name.split(' ')[0]}</span>
                </button>
              </div>

              {/* Flag Visual & Details */}
              <div className="flex items-center gap-2 text-xs text-slate-300 font-bold bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                {selectedLang.flagInfo ? (
                  <CountryFlagVisual flagInfo={selectedLang.flagInfo} size="sm" />
                ) : (
                  <span className="text-base">{selectedLang.flag}</span>
                )}
                <span>{selectedLang.name} ({selectedLang.nativeName})</span>
              </div>

            </div>

            {/* Quick Module Switcher Dropdown & 8 Tabs Strip */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              
              {/* Module Dropdown Selector for fast switching */}
              <div className="relative flex-1" ref={moduleDropdownRef}>
                <button
                  id="btn-fast-module-dropdown"
                  type="button"
                  onClick={() => setIsModuleDropdownOpen(!isModuleDropdownOpen)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-950 hover:bg-slate-850 text-white border-2 border-emerald-500/50 hover:border-emerald-400 font-bold transition-all cursor-pointer shadow-md group"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                      <currentItem.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-400 font-black uppercase tracking-wider">
                        सक्रिय भाग (Active Module)
                      </div>
                      <div className="text-sm sm:text-base font-black text-white group-hover:text-emerald-300">
                        {currentItem.fullTitleHindi}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1.5 rounded-xl border border-emerald-500/30">
                    <span>दूसरा भाग चुनें</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isModuleDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Dropdown Options */}
                {isModuleDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border-2 border-emerald-500/60 rounded-2xl shadow-2xl z-50 p-2 space-y-1.5 backdrop-blur-xl max-h-[75vh] overflow-y-auto">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
                      <span>८ प्रशिक्षण भाग (Select Any Module):</span>
                    </div>
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      const isSelected = activeSubTab === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            haptics.tap();
                            setActiveSubTab(item.id);
                            setIsModuleDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                              : 'text-slate-100 hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-slate-950 text-emerald-400' : 'bg-slate-950 text-amber-400 border border-slate-800'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs sm:text-sm font-black leading-tight">
                                {item.fullTitleHindi}
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

            {/* Quick 8 Navigation Pill Tabs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSubTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`sub-module-tab-${item.id}`}
                    type="button"
                    onClick={() => {
                      haptics.tap();
                      setActiveSubTab(item.id);
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-2xl text-center transition-all cursor-pointer min-h-[64px] border ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/20 scale-[1.02]'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
                    }`}
                    title={item.simpleExplanation}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center mb-1 ${isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-900 text-amber-400'}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-bold leading-tight line-clamp-1">
                      {item.shortTitleHindi}
                    </span>
                    <span className={`text-[9px] font-mono ${isActive ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                      भाग {item.stepNumber}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Module Content View Routing */}
          <div className="space-y-6">
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
                  window.scrollTo({ top: 0, behavior: 'smooth' });
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

          {/* Bottom Floating/Sticky Mobile Navigation Bar for One-Thumb Reach */}
          <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-900/95 border-2 border-amber-500/70 shadow-2xl backdrop-blur-lg">
            <button
              onClick={() => {
                haptics.tap();
                setPageStep('menu-hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← मुख्य मेन्यू (Menu)</span>
            </button>

            <button
              onClick={() => {
                haptics.tap();
                setPageStep('country-select');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-slate-950 text-amber-300 border border-slate-700 font-bold text-xs"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{selectedLang.flag} देश बदलें</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
