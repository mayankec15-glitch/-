import React, { useState } from 'react';
import { SUPPORTED_LANGUAGES, LanguageConfig } from '../../data/languageCurriculum';
import { CountryFlagVisual, CountryFlagStripeBar, CountryFlagPaletteTag } from '../common/CountryFlagVisual';
import { unlockAudioEngine, playNativePronunciation } from '../../utils/audioPlayer';
import { haptics } from '../../utils/haptics';
import { 
  Globe, 
  Plane, 
  HardHat, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Volume2, 
  Award,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';

interface CountrySelectionPageProps {
  selectedLang: LanguageConfig;
  onSelectCountry: (lang: LanguageConfig) => void;
}

interface LanguageMetaInfo {
  id: string;
  regionCategory: 'gcc' | 'asia-europe' | 'global';
  regionCategoryHindi: string;
  titleHindi: string;
  destinationsHindi: string;
  jobsHindi: string;
  badgeHindi: string;
  demandTag: string;
  wordCountLabel: string;
  dialogueCountLabel: string;
  salaryProspectHindi: string;
  greetingSample: {
    foreign: string;
    hindi: string;
    english: string;
  };
}

export const CountrySelectionPage: React.FC<CountrySelectionPageProps> = ({
  selectedLang,
  onSelectCountry
}) => {
  const [filterRegion, setFilterRegion] = useState<'all' | 'gcc' | 'asia-europe' | 'global'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingGreetingId, setPlayingGreetingId] = useState<string | null>(null);

  const languageMeta: Record<string, LanguageMetaInfo> = {
    'uae-arabic': {
      id: 'uae-arabic',
      regionCategory: 'gcc',
      regionCategoryHindi: 'खाड़ी देश (GCC Gulf)',
      titleHindi: 'गल्फ अरबी (Gulf / UAE Arabic)',
      destinationsHindi: 'दुबई, अबू धाबी, सऊदी अरब, कतर, ओमान, कुवैत, बहरीन',
      jobsHindi: 'निर्माण, भारी वाहन ड्राइविंग, वेल्डिंग, होटल, सुरक्षा गार्ड व इलेक्ट्रीशियन',
      badgeHindi: '🇦🇪 सबसे अधिक मांग (GCC 6 देश)',
      demandTag: '🔥 सर्वोच्च मांग • 8 लाख+ भारतीय श्रमिक',
      wordCountLabel: '200+ कार्य शब्द',
      dialogueCountLabel: '20+ साइट संवाद',
      salaryProspectHindi: 'मासिक ₹40,000 - ₹95,000+',
      greetingSample: {
        foreign: 'مَرْحَبًا / السَّلَامُ عَلَيْكُمْ',
        hindi: 'मरहबन / अस्सलाम अलैकुम (नमस्ते / सलाम)',
        english: 'Hello / Peace be upon you'
      }
    },
    'japanese': {
      id: 'japanese',
      regionCategory: 'asia-europe',
      regionCategoryHindi: 'एशिया व यूरोप (Asia & Europe)',
      titleHindi: 'जापानी भाषा (Nihongo)',
      destinationsHindi: 'जापान (टोक्यो, ओसाका, नागोया व प्रमुख प्रान्त)',
      jobsHindi: 'TITP व SSW तकनीकी इंटर्न, ऑटोमोबाइल, केयरगिवर व कंस्ट्रक्शन',
      badgeHindi: '🇯🇵 TITP / SSW सरकारी योजना',
      demandTag: '⛩️ 200+ शब्द • SSW / TITP सरकारी योजना',
      wordCountLabel: '200+ जापानी शब्द',
      dialogueCountLabel: '25+ 5S व फैक्ट्री वाक्य',
      salaryProspectHindi: 'मासिक ₹1,20,000 - ₹2,10,000+',
      greetingSample: {
        foreign: 'こんにちは (Konnichiwa)',
        hindi: 'कोन्निचिवा (नमस्ते / शुभ दिन)',
        english: 'Hello / Good afternoon'
      }
    },
    'german': {
      id: 'german',
      regionCategory: 'asia-europe',
      regionCategoryHindi: 'एशिया व यूरोप (Asia & Europe)',
      titleHindi: 'जर्मन भाषा (Deutsch)',
      destinationsHindi: 'जर्मनी, ऑस्ट्रिया, स्विट्जरलैंड (यूरोपियन यूनियन)',
      jobsHindi: 'इलेक्ट्रीशियन, सीएनसी फिटर, नर्सिंग, प्लंबिंग व तकनीकी कारीगर',
      badgeHindi: '🇩🇪 यूरोप स्किल्ड मिशन',
      demandTag: '🇪🇺 उच्च वेतन • यूरोपीय कुशल अवसर',
      wordCountLabel: '150+ कार्य शब्द',
      dialogueCountLabel: '18+ कार्यशाला संवाद',
      salaryProspectHindi: 'मासिक ₹1,80,000 - ₹3,20,000+',
      greetingSample: {
        foreign: 'Guten Tag / Hallo',
        hindi: 'गुटन टाग / हालो (शुभ दिन / नमस्ते)',
        english: 'Good day / Hello'
      }
    },
    'english': {
      id: 'english',
      regionCategory: 'global',
      regionCategoryHindi: 'वैश्विक (Global)',
      titleHindi: 'इंटरनेशनल इंग्लिश (Workplace English)',
      destinationsHindi: 'यूके, सिंगापुर, खाड़ी देश व ग्लोबल प्रोजेक्ट्स',
      jobsHindi: 'साइट सुपरवाइज़र, सेफ्टी ऑफिसर, फोरमैन, तकनीशियन व वैश्विक काम',
      badgeHindi: '🇬🇧 वैश्विक कार्यस्थल',
      demandTag: '🌐 ग्लोबल प्रोजेक्ट्स • सुपरवाइज़र पद',
      wordCountLabel: '150+ सेफ्टी शब्द',
      dialogueCountLabel: '22+ सुपरवाइज़र संवाद',
      salaryProspectHindi: 'मासिक ₹60,000 - ₹1,50,000+',
      greetingSample: {
        foreign: 'Hello / Good morning',
        hindi: 'हेलो / गुड मॉर्निंग (नमस्ते / शुभ प्रभात)',
        english: 'Hello / Good morning'
      }
    },
    'french': {
      id: 'french',
      regionCategory: 'asia-europe',
      regionCategoryHindi: 'एशिया व यूरोप (Asia & Europe)',
      titleHindi: 'फ्रेंच भाषा (Français)',
      destinationsHindi: 'फ्रांस, बेल्जियम, मॉरीशस, कनाडा (क्यूबेक)',
      jobsHindi: 'निर्माण कारीगर, शेफ, कृषि, हॉस्पिटैलिटी व लॉजिस्टिक्स',
      badgeHindi: '🇫🇷 यूरोप व मॉरीशस',
      demandTag: '🥐 यूरोप व मॉरीशस अवसर',
      wordCountLabel: '150+ कार्य शब्द',
      dialogueCountLabel: '15+ बोलचाल वाक्य',
      salaryProspectHindi: 'मासिक ₹1,40,000 - ₹2,50,000+',
      greetingSample: {
        foreign: 'Bonjour / Salut',
        hindi: 'बोंजूर / सालू (नमस्ते / शुभ दिन)',
        english: 'Good morning / Hello'
      }
    },
    'spanish': {
      id: 'spanish',
      regionCategory: 'global',
      regionCategoryHindi: 'वैश्विक (Global)',
      titleHindi: 'स्पैनिश भाषा (Español)',
      destinationsHindi: 'स्पेन व लैटिन अमेरिकी देश',
      jobsHindi: 'मेंटेनेंस, लॉजिस्टिक्स, वेयरहाउस, फैक्ट्री व सेवा क्षेत्र',
      badgeHindi: '🇪🇸 अंतरराष्ट्रीय रोजगार',
      demandTag: '🌎 वैश्विक कनेक्टिविटी',
      wordCountLabel: '150+ कार्य शब्द',
      dialogueCountLabel: '15+ कार्य वाक्य',
      salaryProspectHindi: 'मासिक ₹1,10,000 - ₹2,00,000+',
      greetingSample: {
        foreign: '¡Hola! / Buenos días',
        hindi: 'ओला! / बुएनोस दीयास (नमस्ते / शुभ प्रभात)',
        english: 'Hello / Good morning'
      }
    }
  };

  const targetLanguages = SUPPORTED_LANGUAGES.filter(l => l.id !== 'hindi');

  // Filtered list
  const filteredLanguages = targetLanguages.filter(lang => {
    const meta = languageMeta[lang.id];
    const matchesRegion = filterRegion === 'all' || meta?.regionCategory === filterRegion;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesRegion;
    const matchesSearch = 
      lang.name.toLowerCase().includes(query) ||
      lang.nativeName.toLowerCase().includes(query) ||
      (meta && (
        meta.titleHindi.toLowerCase().includes(query) ||
        meta.destinationsHindi.toLowerCase().includes(query) ||
        meta.jobsHindi.toLowerCase().includes(query)
      ));
    return matchesRegion && matchesSearch;
  });

  const handleCardClick = (lang: LanguageConfig) => {
    unlockAudioEngine();
    haptics.tap();
    onSelectCountry(lang);
  };

  const handlePlayGreeting = (e: React.MouseEvent, text: string, langId: string) => {
    e.stopPropagation();
    unlockAudioEngine();
    haptics.tap();
    setPlayingGreetingId(langId);
    playNativePronunciation(text, langId, { 
      rate: 0.85,
      onEnd: () => setPlayingGreetingId(null),
      onError: () => setPlayingGreetingId(null)
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* 🌟 STEP 1 HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/50 p-5 sm:p-7 shadow-2xl ring-4 ring-amber-500/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          
          {/* Breadcrumb / Step Indicator */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black tracking-wide flex items-center gap-1.5 shadow-md shadow-amber-500/20">
              <Compass className="w-3.5 h-3.5" />
              <span>कदम १ / Step 1</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-amber-300 border border-slate-700 text-xs font-bold">
              गंतव्य देश व भाषा चयन (Choose Destination Country)
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline font-mono">
              (देश चुनते ही विषय मेन्यू खुलेगा)
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-2">
              <span>आप किस देश में काम करने जाना चाहते हैं?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-3xl leading-relaxed">
              नीचे दिए गए <strong className="text-amber-400 font-bold">६ देशों में से अपने गंतव्य देश पर टैप करें</strong>। चयन करते ही उस देश का पूरा भाषा पाठ्यक्रम, 200+ कार्य शब्दावली, बोलकर AI उच्चारण टेस्ट और सुपरवाइज़र संवाद मेन्यू तुरंत लोड हो जाएगा।
            </p>
          </div>

          {/* Quick Filter & Search Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Region Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'सभी ६ देश' },
                { id: 'gcc', label: '🇦🇪 खाड़ी देश (Gulf)' },
                { id: 'asia-europe', label: '🇯🇵 🇩🇪 एशिया व यूरोप' },
                { id: 'global', label: '🌐 ग्लोबल इंग्लिश/स्पैनिश' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    haptics.tap();
                    setFilterRegion(f.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    filterRegion === f.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[200px] sm:min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="देश या काम खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* 🌟 6 RICH DESTINATION COUNTRY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLanguages.map((lang) => {
          const isSelected = selectedLang.id === lang.id;
          const meta = languageMeta[lang.id] || {
            id: lang.id,
            regionCategory: 'global',
            regionCategoryHindi: 'वैश्विक',
            titleHindi: lang.name,
            destinationsHindi: 'विदेश रोजगार',
            jobsHindi: 'कुशल श्रमिक कार्य',
            badgeHindi: '🌍 अंतरराष्ट्रीय',
            demandTag: 'सर्वोच्च मांग',
            wordCountLabel: '150+ कार्य शब्द',
            dialogueCountLabel: '15+ साइट संवाद',
            salaryProspectHindi: 'मासिक वेतन अवसर',
            greetingSample: {
              foreign: lang.name,
              hindi: 'नमस्ते',
              english: 'Hello'
            }
          };

          const isPlayingThis = playingGreetingId === lang.id;

          return (
            <div
              key={lang.id}
              id={`country-card-${lang.id}`}
              onClick={() => handleCardClick(lang)}
              className={`relative rounded-3xl text-left transition-all cursor-pointer group flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-3 border-amber-400 ring-4 ring-amber-500/25 shadow-2xl shadow-amber-500/20 scale-[1.02]'
                  : 'bg-slate-900 hover:bg-slate-850 border-2 border-slate-800 hover:border-amber-500/60 shadow-xl hover:shadow-2xl'
              }`}
            >
              {/* Top Continuous Flag Stripe Ribbon (झंडे के असली रंग) */}
              {lang.flagInfo && (
                <CountryFlagStripeBar flagInfo={lang.flagInfo} heightClass="h-2.5" roundedClass="rounded-none" />
              )}

              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between w-full">
                
                {/* Header: Flag visual + Titles + Demand Badge */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded-2xl bg-slate-950 border border-slate-700 shadow-inner group-hover:scale-105 transition-transform shrink-0">
                        {lang.flagInfo ? (
                          <CountryFlagVisual flagInfo={lang.flagInfo} size="lg" />
                        ) : (
                          <span className="text-3xl">{lang.flag}</span>
                        )}
                      </div>

                      <div>
                        <div className={`text-lg sm:text-xl font-black tracking-tight leading-tight flex items-center gap-1.5 ${isSelected ? 'text-amber-300' : 'text-white group-hover:text-amber-300'}`}>
                          <span>{meta.titleHindi}</span>
                          <span className="text-base">{lang.flag}</span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">
                          {lang.nativeName}
                        </div>
                      </div>
                    </div>

                    {/* Badge */}
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 text-amber-300 border border-amber-500/30 text-[11px] font-bold shrink-0">
                      {meta.badgeHindi.split(' ')[0]}
                    </span>
                  </div>

                  {/* Flag Colors Swatches Bar */}
                  {lang.flagInfo && (
                    <div className="p-2 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-2">
                      <CountryFlagPaletteTag flagInfo={lang.flagInfo} showNames={true} />
                      <span className="text-[10px] text-slate-400 font-mono">
                        {meta.wordCountLabel} • {meta.dialogueCountLabel}
                      </span>
                    </div>
                  )}

                  {/* Demand & Salary Highlight Pill */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="text-[11px] font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-xl">
                      {meta.demandTag}
                    </div>
                    <div className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg">
                      {meta.salaryProspectHindi}
                    </div>
                  </div>
                </div>

                {/* Middle: Target Cities & Target Job Trades */}
                <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs">
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mb-0.5">
                      <Plane className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>प्रमुख गंतव्य देश व शहर:</span>
                    </div>
                    <div className="text-slate-200 font-bold leading-tight">
                      {meta.destinationsHindi}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mb-0.5">
                      <HardHat className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>मांग वाले काम (Job Trades):</span>
                    </div>
                    <div className="text-slate-300 text-[11px] leading-tight">
                      {meta.jobsHindi}
                    </div>
                  </div>

                  {/* Sample Greeting with Audio Button */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">पहला अभिवादन शब्द:</div>
                      <div className="text-xs font-bold text-amber-300 font-mono">
                        {meta.greetingSample.foreign}
                      </div>
                      <div className="text-[10px] text-slate-300">
                        {meta.greetingSample.hindi}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handlePlayGreeting(e, meta.greetingSample.foreign, lang.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                        isPlayingThis
                          ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                          : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                      title="उच्चारण सुनें (Listen)"
                    >
                      <Volume2 className={`w-4 h-4 ${isPlayingThis ? 'animate-bounce' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="pt-3 border-t border-slate-800">
                  <div className={`w-full py-3 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-amber-500/25'
                      : 'bg-slate-800 group-hover:bg-amber-500 text-white group-hover:text-slate-950'
                  }`}>
                    <span>{meta.titleHindi.split(' ')[0]} चुनें और मेन्यू खोलें</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
