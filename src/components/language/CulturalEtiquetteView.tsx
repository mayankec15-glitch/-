import React, { useState } from 'react';
import { LanguageConfig } from '../../data/languageCurriculum';
import { CULTURAL_ARTICLES, CulturalArticle } from '../../data/culturalGuideData';
import { Lightbulb, CheckCircle2, XCircle, Volume2, Sparkles, Send, BookOpen, Quote, HelpCircle } from 'lucide-react';
import { playNativePronunciation } from '../../utils/audioPlayer';

interface CulturalEtiquetteViewProps {
  currentLanguage: LanguageConfig;
}

export const CulturalEtiquetteView: React.FC<CulturalEtiquetteViewProps> = ({ currentLanguage }) => {
  const articlesForLang = CULTURAL_ARTICLES.filter(a => a.languageId === currentLanguage.id);
  const activeArticle = articlesForLang[0] || CULTURAL_ARTICLES[0];

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

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Cultural Intelligence & Savoir-Vivre
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Etiquette, Customs & Heritage
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Language cannot be separated from culture. Discover authentic traditions, hospitality rituals, and social taboos.
          </p>
        </div>
      </div>

      {/* Main Cultural Deep Dive Article */}
      {activeArticle && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Article Header */}
          <div className="space-y-2 border-b border-slate-800 pb-5">
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {activeArticle.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {activeArticle.title}
            </h3>
            <p className="text-sm text-slate-400">
              {activeArticle.subtitle}
            </p>
          </div>

          {/* Hero Proverb / Quote */}
          {activeArticle.heroQuote && (
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Quote className="w-4 h-4" />
                <span>Traditional Proverb (حكمة مأثورة)</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white" dir={currentLanguage.direction}>
                "{activeArticle.heroQuote.target}"
              </div>
              <div className="text-xs font-mono text-amber-300/90">
                {activeArticle.heroQuote.phonetic}
              </div>
              <div className="text-xs text-slate-300 italic">
                {activeArticle.heroQuote.translation}
              </div>
            </div>
          )}

          {/* Overview text */}
          <p className="text-sm text-slate-200 leading-relaxed">
            {activeArticle.overview}
          </p>

          {/* Dos and Don'ts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            
            {/* DOs Card */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Do's (Essential Courtesies)</span>
              </div>
              <ul className="space-y-2.5">
                {activeArticle.dos.map((d, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-normal">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'Ts Card */}
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Don'ts (Social Taboos)</span>
              </div>
              <ul className="space-y-2.5">
                {activeArticle.donts.map((d, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-normal">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Essential Cultural Phrases */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Essential Etiquette Phrases
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeArticle.keyPhrases.map((kp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-bold text-white" dir={currentLanguage.direction}>
                      {kp.text}
                    </div>
                    <div className="text-xs text-amber-400 font-mono mt-0.5">
                      {kp.phonetic}
                    </div>
                    <div className="text-xs text-slate-300 font-medium mt-0.5">
                      "{kp.translation}"
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 italic">
                      Context: {kp.context}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSpeak(kp.text)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-400 transition-colors cursor-pointer shrink-0"
                    title="Pronounce"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Lore Context */}
          {activeArticle.historicalContext && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <span className="font-bold text-slate-300">Historical Roots: </span>
              {activeArticle.historicalContext}
            </div>
          )}

        </div>
      )}

      {/* AI Cultural Advisor Interactive Q&A Tool */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            Ask the AI Cultural Anthropologist
          </h3>
        </div>
        <p className="text-xs text-slate-300">
          Curious about dining etiquette, business gifts, religious customs, or body language in {currentLanguage.name}?
        </p>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            placeholder="e.g. How do I politely decline a second coffee in Dubai? Or what is train etiquette in Tokyo?"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={() => handleAskAdvisor()}
            disabled={isLoading || !aiQuestion.trim()}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            {isLoading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{isLoading ? 'Consulting...' : 'Ask Advisor'}</span>
          </button>
        </div>

        {/* AI Answer Display */}
        {aiAnswer && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 mt-4 animate-fadeIn">
            <h4 className="text-sm font-black text-amber-400">
              {aiAnswer.title || 'Advisor Insight'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
              {aiAnswer.directAnswer}
            </p>

            {aiAnswer.funFact && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                <span className="font-bold">✨ Cultural Fact: </span>
                {aiAnswer.funFact}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
