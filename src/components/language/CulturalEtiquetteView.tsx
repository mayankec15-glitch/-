import React, { useState } from 'react';
import { LanguageConfig } from '../../data/languageCurriculum';
import { CULTURAL_ARTICLES, CulturalArticle } from '../../data/culturalGuideData';
import { CountryFlagVisual, CountryFlagStripeBar, CountryFlagPaletteTag } from '../common/CountryFlagVisual';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  Sparkles, 
  Send, 
  Quote, 
  PhoneCall, 
  Building2, 
  AlertTriangle,
  FileText,
  BadgeHelp,
  Flag
} from 'lucide-react';
import { playNativePronunciation } from '../../utils/audioPlayer';

interface CulturalEtiquetteViewProps {
  currentLanguage: LanguageConfig;
}

export const CulturalEtiquetteView: React.FC<CulturalEtiquetteViewProps> = ({ currentLanguage }) => {
  const articlesForLang = CULTURAL_ARTICLES.filter(a => a.languageId === currentLanguage.id);
  const activeArticle: CulturalArticle = articlesForLang[0] || CULTURAL_ARTICLES[0];

  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Audio Playback
  const handleSpeak = (text: string) => {
    playNativePronunciation(text, currentLanguage.id, { rate: 0.85 });
  };

  const handleAskAdvisor = async (q?: string) => {
    const query = (q || aiQuestion).trim();
    if (!query) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/cultural-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: currentLanguage.id,
          question: query
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setAiAnswer(json.data);
      }
    } catch (err) {
      console.error('Cultural advisor error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    'पासपोर्ट कंपनी रखे तो क्या करना चाहिए?',
    'तबीयत खराब होने पर डॉक्टर या छुट्टी कैसे मांगें?',
    'एयरपोर्ट पर कौन-सी चीजें ले जाना मना है?',
    'ओवरटाइम का पैसा न मिले तो शिकायत कहाँ करें?'
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner - Worker Friendly Hindi Header with Country Flag Colors */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* Continuous Flag Stripe Bar */}
        {currentLanguage.flagInfo && (
          <CountryFlagStripeBar flagInfo={currentLanguage.flagInfo} heightClass="h-2" roundedClass="rounded-none" />
        )}
        
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  प्रशिक्षण निदेशालय उ०प्र० • प्रवासी सुरक्षा व कानून मार्गदर्शन
                </span>
              </div>
              {currentLanguage.flagInfo && (
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-xs">
                  <CountryFlagVisual flagInfo={currentLanguage.flagInfo} size="sm" />
                  <span className="text-[11px] font-bold text-slate-200">{currentLanguage.flagInfo.countryNameHindi}</span>
                </div>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{currentLanguage.flag}</span>
              <span>विदेश के नियम, कानून एवं सुरक्षा ({currentLanguage.name})</span>
            </h2>
            
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                {currentLanguage.name} भाषी देशों में सुरक्षित काम, पासपोर्ट व वीज़ा अधिकार, साइट सेफ्टी और जरूरी कानूनी सावधानियां।
              </p>
              {currentLanguage.flagInfo && (
                <CountryFlagPaletteTag flagInfo={currentLanguage.flagInfo} className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800" />
              )}
            </div>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 px-4 py-2.5 rounded-xl flex items-center gap-3 shrink-0">
            <Building2 className="w-6 h-6 text-amber-400" />
            <div className="text-left">
              <div className="text-[11px] font-bold text-amber-400">भारतीय दूतावास सहायता</div>
              <div className="text-xs text-white font-mono">MADAD / PBSA सेवा</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Overseas Guide Card */}
      {activeArticle && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-6">
          {/* Subtle Flag Stripe */}
          {currentLanguage.flagInfo && (
            <CountryFlagStripeBar flagInfo={currentLanguage.flagInfo} heightClass="h-1.5" roundedClass="rounded-none" />
          )}
          <div className="p-6 sm:p-8 pt-2 space-y-6">
            
            {/* Section Category Header */}
            <div className="space-y-2 border-b border-slate-800 pb-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  {activeArticle.categoryHindi}
                </span>
                {currentLanguage.flagInfo && (
                  <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 flex items-center gap-1.5">
                    <Flag className="w-3 h-3" />
                    <span>राष्ट्रीय रंग: {currentLanguage.flagInfo.colorNamesHindi}</span>
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {activeArticle.titleHindi}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {activeArticle.subtitleHindi}
              </p>
            </div>

          {/* Hero Safety Quote / Proverb */}
          {activeArticle.heroQuote && (
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Quote className="w-4 h-4" />
                  <span>कार्यस्थल सुरक्षा वचन (Safety Motto)</span>
                </div>
                <button
                  onClick={() => handleSpeak(activeArticle.heroQuote.target)}
                  className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 text-amber-300 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>सुनें</span>
                </button>
              </div>

              <div className="text-lg sm:text-xl font-bold text-white" dir={currentLanguage.direction}>
                "{activeArticle.heroQuote.target}"
              </div>
              <div className="text-xs font-mono text-amber-300/90 font-bold">
                देवनागरी उच्चारण: {activeArticle.heroQuote.phoneticHindi}
              </div>
              <div className="text-xs text-slate-200 font-medium">
                सरल हिन्दी अर्थ: "{activeArticle.heroQuote.translationHindi}"
              </div>
            </div>
          )}

          {/* Overview text */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-1">
            <span className="font-bold text-amber-400 block">📌 मुख्य जानकारी:</span>
            <p>{activeArticle.overviewHindi}</p>
          </div>

          {/* Dos and Don'ts Grid - Easy to Read for Workers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            
            {/* DOs Card (क्या अवश्य करें) */}
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base border-b border-emerald-900/50 pb-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>क्या अवश्य करें (जरूरी सावधानियां)</span>
              </div>
              <ul className="space-y-3">
                {activeArticle.dos.map((item, idx) => (
                  <li key={idx} className="space-y-1 bg-slate-950/60 p-3 rounded-xl border border-emerald-900/40">
                    <div className="flex items-center gap-2 font-bold text-xs text-emerald-300">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 font-mono">
                        {idx + 1}
                      </span>
                      <span>{item.ruleHindi}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 pl-6 leading-relaxed">
                      {item.explanationHindi}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'Ts Card (क्या कभी न करें - सख्त मनाही) */}
            <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-800/50 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm sm:text-base border-b border-rose-900/50 pb-2">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>क्या कभी न करें (सख्त कानूनी मनाही)</span>
              </div>
              <ul className="space-y-3">
                {activeArticle.donts.map((item, idx) => (
                  <li key={idx} className="space-y-1 bg-slate-950/60 p-3 rounded-xl border border-rose-900/40">
                    <div className="flex items-center gap-2 font-bold text-xs text-rose-300">
                      <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] shrink-0 font-mono">
                        {idx + 1}
                      </span>
                      <span>{item.ruleHindi}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 pl-6 leading-relaxed">
                      {item.explanationHindi}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Essential Cultural & Workplace Phrases */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>काम पर प्रयोग होने वाले जरूरी शिष्टाचार वाक्य</span>
              </h4>
              <span className="text-[11px] text-slate-400">स्पीकर दबाकर उच्चारण सुनें</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {activeArticle.keyPhrases.map((kp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-colors flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-base font-bold text-white" dir={currentLanguage.direction}>
                      {kp.text}
                    </div>
                    <div className="text-xs text-amber-300 font-mono font-bold">
                      बोलें: {kp.phoneticHindi}
                    </div>
                    <div className="text-xs text-emerald-400 font-semibold">
                      अर्थ: "{kp.translationHindi}"
                    </div>
                    <div className="text-[11px] text-slate-400 italic">
                      कब बोलें: {kp.contextHindi}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSpeak(kp.text)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors cursor-pointer shrink-0 shadow-sm"
                    title="उच्चारण सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Embassy & Helpline Support Box */}
          {activeArticle.embassyHelpline && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <PhoneCall className="w-4 h-4" />
                <span>{activeArticle.embassyHelpline.portalName}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">देश व क्षेत्र:</span>
                  <span className="font-bold text-white">{activeArticle.embassyHelpline.country}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">हेल्पलाइन नंबर / पोर्टल:</span>
                  <span className="font-mono font-bold text-amber-300">{activeArticle.embassyHelpline.helplineNumber}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed italic">
                💡 <strong className="text-white">श्रमवीर ध्यान दें:</strong> {activeArticle.embassyHelpline.tipHindi}
              </p>
            </div>
          )}

          </div>
        </div>
      )}

      {/* AI Overseas Worker Advisor (सरल हिन्दी में प्रश्न पूछें) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            AI प्रवासी श्रम सलाहकार (सरल हिन्दी में सवाल पूछें)
          </h3>
        </div>
        <p className="text-xs text-slate-300">
          विदेश के कानून, वीजा, पासपोर्ट, ओवरटाइम, खाना-पीना या रीति-रिवाजों के बारे में कोई भी शंका हो तो नीचे टाइप करें या दिए गए सवाल पर टैप करें:
        </p>

        {/* Quick Question Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAiQuestion(q);
                handleAskAdvisor(q);
              }}
              className="text-xs bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800 transition-all cursor-pointer text-left"
            >
              💬 {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <input
            type="text"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            placeholder="जैसे: गल्फ में बीमार पड़ने पर डॉक्टर से कैसे बात करें? या जापान में कचरा कैसे फेंकें?"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={() => handleAskAdvisor()}
            disabled={isLoading || !aiQuestion.trim()}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 shrink-0"
          >
            {isLoading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{isLoading ? 'जांच हो रही है...' : 'सलाह पूछें'}</span>
          </button>
        </div>

        {/* AI Answer Display in simple Hindi */}
        {aiAnswer && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 mt-4 animate-fadeIn">
            <h4 className="text-sm font-black text-amber-400 flex items-center gap-2">
              <BadgeHelp className="w-4 h-4 text-amber-400" />
              <span>{aiAnswer.title || 'AI श्रम सलाहकार का उत्तर'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
              {aiAnswer.directAnswer}
            </p>

            {aiAnswer.funFact && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                <span className="font-bold">✨ ध्यान रखने योग्य बात: </span>
                {aiAnswer.funFact}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
