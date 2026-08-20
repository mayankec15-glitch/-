import React, { useState } from 'react';
import { LanguageConfig } from '../../data/languageCurriculum';
import { 
  MIGRANT_VOCABULARY_150, 
  TRADE_CATEGORIES, 
  MigrantVocabItem, 
  VocabLanguageDetail 
} from '../../data/migrantVocabData';
import { playNativePronunciation } from '../../utils/audioPlayer';
import { 
  Search, 
  Volume2, 
  Mic, 
  BookOpen, 
  CheckCircle2, 
  HardHat, 
  HeartPulse, 
  UtensilsCrossed, 
  Truck, 
  Wrench, 
  Factory, 
  Coins, 
  ShieldAlert,
  Sparkles,
  Filter,
  Layers,
  ArrowUpRight,
  MessageSquare,
  Smile,
  Sprout,
  Car,
  AlertTriangle
} from 'lucide-react';

interface MigrantVocabBankViewProps {
  currentLanguage: LanguageConfig;
  onSelectForVoiceTest?: (item: MigrantVocabItem) => void;
}

export const MigrantVocabBankView: React.FC<MigrantVocabBankViewProps> = ({ 
  currentLanguage,
  onSelectForVoiceTest
}) => {
  const [selectedTrade, setSelectedTrade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedImportance, setSelectedImportance] = useState<string>('all');

  const langKey = (
    currentLanguage.id === 'uae-arabic' ? 'uae-arabic' :
    currentLanguage.id === 'german' ? 'german' :
    currentLanguage.id === 'japanese' ? 'japanese' :
    currentLanguage.id === 'french' ? 'french' :
    currentLanguage.id === 'spanish' ? 'spanish' : 'english'
  ) as keyof MigrantVocabItem['translations'];

  // Filter items
  const filteredVocab = MIGRANT_VOCABULARY_150.filter(item => {
    // Trade Filter
    if (selectedTrade !== 'all' && item.tradeId !== selectedTrade) {
      return false;
    }

    // Importance Filter
    if (selectedImportance !== 'all' && item.importance !== selectedImportance) {
      return false;
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const langDetail = item.translations[langKey] || item.translations['english'];
      const matchesHindi = item.hindiTerm.toLowerCase().includes(q);
      const matchesEnglish = item.englishTerm.toLowerCase().includes(q);
      const matchesTarget = langDetail.word.toLowerCase().includes(q);
      const matchesPhonetic = langDetail.phoneticHindi.toLowerCase().includes(q);
      const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));

      if (!matchesHindi && !matchesEnglish && !matchesTarget && !matchesPhonetic && !matchesTags) {
        return false;
      }
    }

    return true;
  });

  // Audio Playback with high-clarity native Arabic support
  const handlePlayAudio = (text: string) => {
    playNativePronunciation(text, currentLanguage.id, { rate: 0.85 });
  };

  const getTradeIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return MessageSquare;
      case 'Smile': return Smile;
      case 'HardHat': return HardHat;
      case 'HeartPulse': return HeartPulse;
      case 'UtensilsCrossed': return UtensilsCrossed;
      case 'Truck': return Truck;
      case 'Wrench': return Wrench;
      case 'Factory': return Factory;
      case 'Coins': return Coins;
      case 'ShieldAlert': return ShieldAlert;
      case 'Sprout': return Sprout;
      case 'Car': return Car;
      case 'AlertTriangle': return AlertTriangle;
      default: return HardHat;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold">
                प्रशिक्षण निदेशालय, उत्तर प्रदेश
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold">
                200+ कार्य एवं सामान्य अभिवादन शब्दावली संग्रह
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
              प्रवासी श्रमिक 200+ कार्य एवं सामान्य अभिवादन शब्दावली (Trade & Greetings Vocab Bank)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              रोजगार हेतु जापानी (200+ शब्द), सामान्य अभिवादन, निर्माण, देखभाल (Kaigo), 5S, मशीनिंग, कृषि, ड्राइविंग, होटल व फैक्ट्री के सभी जरूरी शब्दों को देवनागरी उच्चारण व ऑडियो के साथ सीखें।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-slate-950 text-amber-400 border border-slate-800">
              कुल {filteredVocab.length} / {MIGRANT_VOCABULARY_150.length} शब्द उपलब्ध
            </span>
          </div>
        </div>

        {/* Search & Dropdowns Filter Bar */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-vocab-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="हिंदी (जैसे सीमेंट, दवाई, वेतन) या अंग्रेजी में खोजें..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-all font-medium"
            />
          </div>

          {/* Trade Dropdown */}
          <div className="md:col-span-4 flex items-center gap-1.5">
            <select
              id="select-vocab-trade"
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-amber-300 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="all">🌐 सभी कार्य क्षेत्र (All 8 Trades)</option>
              {TRADE_CATEGORIES.map(trade => (
                <option key={trade.id} value={trade.id}>
                  {trade.nameHindi} ({trade.nameEnglish})
                </option>
              ))}
            </select>
          </div>

          {/* Importance Filter Dropdown */}
          <div className="md:col-span-3 flex items-center gap-1.5">
            <select
              id="select-vocab-importance"
              value={selectedImportance}
              onChange={(e) => setSelectedImportance(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="all">सभी प्राथमिकताएं (All Priority)</option>
              <option value="critical">अति-महत्वपूर्ण (Critical Safety)</option>
              <option value="high">उच्च प्राथमिकता (High)</option>
              <option value="medium">मध्यम (Medium)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredVocab.map((item, idx) => {
          const detail: VocabLanguageDetail = item.translations[langKey] || item.translations['english'];
          const trade = TRADE_CATEGORIES.find(t => t.id === item.tradeId);
          const Icon = trade ? getTradeIcon(trade.icon) : HardHat;

          return (
            <div 
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between gap-4 transition-all group"
            >
              <div className="space-y-3">
                
                {/* Card Top: Trade Category & Priority */}
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{trade?.nameHindi}</span>
                  </span>

                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase font-mono ${
                    item.importance === 'critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    item.importance === 'high' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {item.importance}
                  </span>
                </div>

                {/* Main Terms: Hindi + English */}
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {item.hindiTerm}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {item.englishTerm}
                  </p>
                </div>

                {/* Target Language Word & Devanagari Pronunciation */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                      {currentLanguage.flag} {currentLanguage.name.split(' ')[0]}
                    </span>
                    <button
                      onClick={() => handlePlayAudio(detail.word)}
                      className="p-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all cursor-pointer"
                      title="उच्चारण सुनें (Listen)"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-lg font-black text-amber-400 tracking-tight" dir={currentLanguage.direction}>
                    {detail.word}
                  </div>

                  <div className="text-xs text-slate-300 font-semibold font-mono">
                    उच्चारण: <span className="text-white">{detail.phoneticHindi}</span>
                  </div>
                </div>

                {/* Example Sentence Box */}
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span>कार्यस्थल उदाहरण:</span>
                    <button 
                      onClick={() => handlePlayAudio(detail.exampleSentence)}
                      className="text-amber-400 hover:underline flex items-center gap-0.5"
                    >
                      <Volume2 className="w-2.5 h-2.5" /> सुनें
                    </button>
                  </div>
                  <p className="text-slate-200 font-mono text-[11px]" dir={currentLanguage.direction}>
                    "{detail.exampleSentence}"
                  </p>
                  <p className="text-slate-400 text-[10px]">
                    {detail.exampleSentenceHindi}
                  </p>
                </div>

              </div>

              {/* Card Footer: Quick Actions */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => handlePlayAudio(detail.word)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition-all cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>सुनें</span>
                </button>

                {onSelectForVoiceTest && (
                  <button
                    onClick={() => onSelectForVoiceTest(item)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md transition-all cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>बोलकर टेस्ट करें</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {filteredVocab.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-2">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">कोई शब्द नहीं मिला</h3>
          <p className="text-xs text-slate-400">
            कृपया खोज शब्द या फिल्टर बदलकर दोबारा प्रयास करें।
          </p>
        </div>
      )}

    </div>
  );
};
