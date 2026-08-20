import React, { useState } from 'react';
import { LanguageConfig } from '../../data/languageCurriculum';
import { CountryFlagVisual, CountryFlagStripeBar, CountryFlagPaletteTag } from '../common/CountryFlagVisual';
import { unlockAudioEngine, testSpeakerSound } from '../../utils/audioPlayer';
import { VoiceTroubleshooterModal } from '../common/VoiceTroubleshooterModal';
import { haptics } from '../../utils/haptics';
import { LanguageSubTab } from './LanguageStudioView';
import { 
  Mic, 
  BookMarked, 
  MessageSquare, 
  Sparkles, 
  Layers, 
  Lightbulb, 
  Award, 
  Edit3, 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  HelpCircle, 
  Compass, 
  CheckCircle2,
  Globe,
  Plane,
  HardHat,
  Flame,
  ShieldCheck,
  Zap,
  TrendingUp
} from 'lucide-react';

interface ModuleMenuHubPageProps {
  selectedLang: LanguageConfig;
  onChangeCountry: () => void;
  onSelectModule: (module: LanguageSubTab) => void;
}

interface MenuItemData {
  id: LanguageSubTab;
  stepNumber: number;
  category: 'core-speaking' | 'vocab-dialogue' | 'grammar-cards' | 'safety-test';
  categoryTitleHindi: string;
  shortTitleHindi: string;
  fullTitleHindi: string;
  simpleExplanation: string;
  englishSub: string;
  badgeLabel?: string;
  icon: React.FC<{ className?: string }>;
  isPrimary?: boolean;
  highlightTag?: string;
  estimatedTime: string;
}

export const ModuleMenuHubPage: React.FC<ModuleMenuHubPageProps> = ({
  selectedLang,
  onChangeCountry,
  onSelectModule
}) => {
  const [isTestingSpeaker, setIsTestingSpeaker] = useState<boolean>(false);
  const [speakerTestSuccess, setSpeakerTestSuccess] = useState<boolean | null>(null);
  const [showVolumeGuide, setShowVolumeGuide] = useState<boolean>(false);
  const [isTroubleshooterOpen, setIsTroubleshooterOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'speaking' | 'vocab' | 'test'>('all');

  const menuItems: MenuItemData[] = [
    { 
      id: 'voice-coach', 
      stepNumber: 1,
      category: 'core-speaking',
      categoryTitleHindi: 'आवाज व उच्चारण',
      shortTitleHindi: 'बोलकर उच्चारण जांच',
      fullTitleHindi: '१. बोलकर उच्चारण जांच (Voice Coach)', 
      simpleExplanation: 'माइक दबाकर 4-5 सेकंड बोलें और तुरंत AI स्कोर व सटीक सुधार टिप पाएं',
      englishSub: 'Speak & AI Pronunciation Test',
      icon: Mic,
      isPrimary: true,
      highlightTag: '🎙️ AI आवाज टेस्ट • सबसे महत्वपूर्ण',
      badgeLabel: 'AI Powered',
      estimatedTime: '५ मिनट'
    },
    { 
      id: 'vocab-150', 
      stepNumber: 2,
      category: 'vocab-dialogue',
      categoryTitleHindi: 'शब्दावली व भाषा',
      shortTitleHindi: '200+ काम व अभिवादन शब्द',
      fullTitleHindi: '२. 200+ काम व अभिवादन शब्द (Vocab Bank)', 
      simpleExplanation: 'जापानी (200+ शब्द), नमस्ते/शिष्टाचार, निर्माण, 5S, मशीनिंग, देखभाल, होटल, गाड़ी व कृषि के जरूरी शब्द',
      englishSub: 'Trade & Daily Greetings Vocab (200+)',
      icon: BookMarked,
      highlightTag: '📚 200+ शब्द व ऑडियो',
      badgeLabel: '200+ Vocab',
      estimatedTime: '१० मिनट'
    },
    { 
      id: 'roleplay', 
      stepNumber: 3,
      category: 'vocab-dialogue',
      categoryTitleHindi: 'शब्दावली व भाषा',
      shortTitleHindi: 'काम पर बातचीत',
      fullTitleHindi: '३. काम पर बातचीत का अभ्यास (Roleplay)', 
      simpleExplanation: 'सुपरवाइज़र, इंजीनियर और फोरमैन से साइट पर कैसे बात करें और आदेश समझें',
      englishSub: 'Workplace Dialogue Practice',
      icon: MessageSquare,
      highlightTag: '💬 सुपरवाइज़र संवाद',
      badgeLabel: 'Dialogue',
      estimatedTime: '८ मिनट'
    },
    { 
      id: 'grammar', 
      stepNumber: 4,
      category: 'grammar-cards',
      categoryTitleHindi: 'व्याकरण व कार्ड्स',
      shortTitleHindi: 'वाक्य बनाना सीखें',
      fullTitleHindi: '४. छोटे वाक्य बनाना सीखें (Grammar Lab)', 
      simpleExplanation: 'आदेश समझना, हां/ना बोलना और सवाल पूछने के सरल व्यावहारिक नियम',
      englishSub: 'Simple Sentence Builder',
      icon: Sparkles,
      highlightTag: '✨ सरल वाक्य नियम',
      badgeLabel: 'Grammar',
      estimatedTime: '७ मिनट'
    },
    { 
      id: 'flashcards', 
      stepNumber: 5,
      category: 'grammar-cards',
      categoryTitleHindi: 'व्याकरण व कार्ड्स',
      shortTitleHindi: 'याद रखने के कार्ड्स',
      fullTitleHindi: '५. याद रखने के कार्ड्स (Flashcards)', 
      simpleExplanation: 'चित्र, आवाज और देवनागरी उच्चारण वाले कार्ड्स पलटकर आसानी से याद करें',
      englishSub: 'Memory Practice Cards',
      icon: Layers,
      highlightTag: '🗂️ चित्र व अर्थ',
      badgeLabel: 'Flashcards',
      estimatedTime: '५ मिनट'
    },
    { 
      id: 'culture', 
      stepNumber: 6,
      category: 'safety-test',
      categoryTitleHindi: 'सुरक्षा व कानून',
      shortTitleHindi: 'विदेश के नियम व सुरक्षा',
      fullTitleHindi: '६. विदेश के नियम व सुरक्षा (Rules & Safety)', 
      simpleExplanation: 'गल्फ व अन्य देशों के कानून, रीति-रिवाज, वीजा और सुरक्षा सावधानियां',
      englishSub: 'Workplace Etiquette & Laws',
      icon: Lightbulb,
      highlightTag: '💡 कानून व सावधानियां',
      badgeLabel: 'Safety Rules',
      estimatedTime: '६ मिनट'
    },
    { 
      id: 'quiz', 
      stepNumber: 7,
      category: 'safety-test',
      categoryTitleHindi: 'सुरक्षा व कानून',
      shortTitleHindi: 'सवाल-जवाब टेस्ट',
      fullTitleHindi: '७. सवाल-जवाब टेस्ट (Quiz Arena)', 
      simpleExplanation: '4 विकल्पों वाले आसान सवालों से अपनी भाषा व कार्यस्थल ज्ञान की तैयारी परखें',
      englishSub: 'Knowledge & Vocab Test',
      icon: Award,
      highlightTag: '🏆 4-विकल्प टेस्ट',
      badgeLabel: 'Skill Test',
      estimatedTime: '८ मिनट'
    },
    { 
      id: 'script', 
      stepNumber: 8,
      category: 'grammar-cards',
      categoryTitleHindi: 'व्याकरण व कार्ड्स',
      shortTitleHindi: 'अक्षर व वर्णमाला',
      fullTitleHindi: '८. अक्षर व वर्णमाला (Script Studio)', 
      simpleExplanation: 'अरबी, जापानी व अंग्रेजी के अक्षर पढ़ना, पहचानना व लिखना सीखें',
      englishSub: 'Alphabet & Letter Recognition',
      icon: Edit3,
      highlightTag: '✍️ डिजिटल स्लेट',
      badgeLabel: 'Writing Slate',
      estimatedTime: '१० मिनट'
    },
  ];

  const handleSelect = (mod: LanguageSubTab) => {
    unlockAudioEngine();
    haptics.tap();
    onSelectModule(mod);
  };

  const handleTestSpeakerSound = async () => {
    setIsTestingSpeaker(true);
    setSpeakerTestSuccess(null);
    haptics.tap();
    await testSpeakerSound(
      () => {
        setIsTestingSpeaker(false);
        setSpeakerTestSuccess(true);
        haptics.success();
      },
      () => {
        setIsTestingSpeaker(false);
        setSpeakerTestSuccess(false);
        haptics.warning();
      }
    );
    setTimeout(() => {
      setIsTestingSpeaker(false);
    }, 2500);
  };

  const filteredItems = menuItems.filter(item => {
    if (selectedFilter === 'speaking') return item.id === 'voice-coach' || item.id === 'roleplay';
    if (selectedFilter === 'vocab') return item.id === 'vocab-150' || item.id === 'grammar' || item.id === 'flashcards';
    if (selectedFilter === 'test') return item.id === 'quiz' || item.id === 'culture' || item.id === 'script';
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* 🌟 STEP BREADCRUMB & CURRENT SELECTED COUNTRY BAR */}
      <div className="space-y-3">
        
        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={onChangeCountry}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all font-bold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>कदम १ : देश चयन</span>
            </button>
            <span className="text-slate-600 font-bold">/</span>
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black shadow-sm flex items-center gap-1">
              <span>कदम २ : विषय मेन्यू (८ भाग)</span>
            </span>
          </div>

          <button
            onClick={onChangeCountry}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>🔄 दूसरा देश चुनें (Change Country)</span>
          </button>
        </div>

        {/* Selected Country Summary Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 border-2 border-amber-500/60 shadow-2xl">
          {selectedLang.flagInfo && (
            <CountryFlagStripeBar flagInfo={selectedLang.flagInfo} heightClass="h-2" roundedClass="rounded-none" />
          )}

          <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-1.5 rounded-2xl bg-slate-950 border border-slate-700 shadow-inner shrink-0">
                {selectedLang.flagInfo ? (
                  <CountryFlagVisual flagInfo={selectedLang.flagInfo} size="lg" />
                ) : (
                  <span className="text-3xl">{selectedLang.flag}</span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    सक्रिय भाषा (Active Target Language)
                  </span>
                  {selectedLang.flagInfo && (
                    <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                      झंडे के रंग: {selectedLang.flagInfo.colorNamesHindi}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                  {selectedLang.name} ({selectedLang.nativeName}) {selectedLang.flag}
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {selectedLang.description}
                </p>
              </div>
            </div>

            {/* Quick Action to switch country */}
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={onChangeCountry}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              >
                <span>देश बदलें →</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 🌟 STEP 2 MODULE SELECTION HEADER & UTILITIES */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-black">
                कदम २
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                आप क्या सीखना चाहते हैं? (Select Learning Module)
              </h2>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              नीचे दिए गए <strong className="text-amber-400 font-bold">८ प्रशिक्षण भागों</strong> में से किसी पर भी क्लिक करें:
            </p>
          </div>

          {/* Speaker Sound Test & Voice Settings Buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={handleTestSpeakerSound}
              disabled={isTestingSpeaker}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isTestingSpeaker
                  ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse font-black'
                  : speakerTestSuccess
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900 text-amber-300 border-amber-500/30 hover:bg-amber-500/10'
              }`}
              title="फोन पर तुरंत स्पीकर आवाज जांचें"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isTestingSpeaker ? 'animate-bounce' : ''}`} />
              <span>{isTestingSpeaker ? 'ध्वनि बज रही है...' : speakerTestSuccess ? '✓ आवाज सक्रिय' : '🔊 स्पीकर टेस्ट'}</span>
            </button>

            <button
              onClick={() => {
                haptics.tap();
                setIsTroubleshooterOpen(true);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/30 transition-all text-xs font-bold cursor-pointer"
              title="आवाज व स्पीकर सेटिंग्स"
            >
              <span>⚙️ आवाज सेटिंग्स</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'सभी ८ भाग (All Modules)' },
            { id: 'speaking', label: '🎙️ बोलकर अभ्यास व AI टेस्ट' },
            { id: 'vocab', label: '📚 शब्द, वाक्य व कार्ड्स' },
            { id: 'test', label: '🏆 टेस्ट, कानून व स्लेट' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                haptics.tap();
                setSelectedFilter(f.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                selectedFilter === f.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Android Speaker & Media Volume Helper Banner */}
        {showVolumeGuide && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2 text-xs animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <Volume2 className="w-4 h-4" />
                <span>📱 फोन पर आवाज न आने पर तुरंत जांचें:</span>
              </div>
              <button
                onClick={() => setShowVolumeGuide(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ बंद करें
              </button>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
              <li><strong className="text-white">मीडिया वॉल्यूम:</strong> फोन का वॉल्यूम बटन दबाकर 'Media Volume' बढ़ाएं।</li>
              <li><strong className="text-white">स्पीकर टेस्ट:</strong> ऊपर '🔊 स्पीकर टेस्ट' बटन दबाने से फोन का ऑडियो सिस्टम तुरंत अनलॉक हो जाता है।</li>
            </ul>
          </div>
        )}

      </div>

      {/* 🌟 8 RICH MODULE CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              id={`module-menu-card-${item.id}`}
              onClick={() => handleSelect(item.id)}
              className={`rounded-3xl p-5 text-left transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden border-2 ${
                item.isPrimary
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-amber-500/80 hover:border-amber-400 ring-2 ring-amber-500/20 shadow-xl shadow-amber-500/10 scale-[1.01]'
                  : 'bg-slate-900 hover:bg-slate-850 border-slate-800 hover:border-amber-500/50 shadow-md hover:shadow-xl'
              }`}
            >
              <div className="space-y-3">
                
                {/* Top Row: Icon + Step Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-md transition-transform group-hover:scale-110 ${
                    item.isPrimary
                      ? 'bg-amber-500 text-slate-950 font-black shadow-amber-500/30'
                      : 'bg-slate-950 text-amber-400 border border-slate-700'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950 text-amber-400 border border-slate-800 text-[9px] font-mono font-bold">
                      {item.estimatedTime}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-mono font-bold">
                      भाग {item.stepNumber}
                    </span>
                  </div>
                </div>

                {/* Highlight Tag */}
                {item.highlightTag && (
                  <div className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-lg inline-block">
                    {item.highlightTag}
                  </div>
                )}

                {/* Titles */}
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors leading-tight">
                    {item.fullTitleHindi}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {item.englishSub}
                  </div>
                </div>

                {/* Simple Explanation */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.simpleExplanation}
                </p>

              </div>

              {/* Bottom CTA Action Button */}
              <div className="pt-4 mt-3 border-t border-slate-800/80">
                <div className={`w-full py-2.5 px-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                  item.isPrimary
                    ? 'bg-amber-500 text-slate-950 font-black shadow-amber-500/20'
                    : 'bg-slate-950 group-hover:bg-amber-500 text-slate-200 group-hover:text-slate-950 border border-slate-800 group-hover:border-amber-400'
                }`}>
                  <span>शुरू करें (Open)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Voice Troubleshooter & Settings Modal */}
      <VoiceTroubleshooterModal 
        isOpen={isTroubleshooterOpen} 
        onClose={() => setIsTroubleshooterOpen(false)} 
      />

    </div>
  );
};
