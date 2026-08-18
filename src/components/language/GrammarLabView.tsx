import React, { useState } from 'react';
import { LanguageConfig } from '../../data/languageCurriculum';
import { Sparkles, ArrowRight, Volume2, BookOpen, Layers, Lightbulb, Search } from 'lucide-react';
import { playNativePronunciation } from '../../utils/audioPlayer';

interface GrammarLabViewProps {
  currentLanguage: LanguageConfig;
}

interface AnalysisResult {
  original: string;
  phonetic: string;
  englishTranslation: string;
  literalTranslation: string;
  tokens: Array<{
    word: string;
    phonetic: string;
    meaning: string;
    pos: string;
    grammarRole: string;
    rootOrConjugation: string;
  }>;
  grammarSummary: string;
  culturalInsight: string;
  similarPhrases?: Array<{
    text: string;
    phonetic: string;
    translation: string;
    usageNote: string;
  }>;
}

export const GrammarLabView: React.FC<GrammarLabViewProps> = ({ currentLanguage }) => {
  const defaultSentences: Record<string, string> = {
    'uae-arabic': 'يَا مَرْحَبَا السَّاعْ، شْحَالِكْ يَا خُويْ؟ الأَكْلْ هِنِي وَايِدْ زَيْنْ.',
    'french': "Bonjour ! Je voudrais un café crème et deux croissants, s'il vous plaît.",
    'japanese': '初めまして、田中と申します。これからもどうぞよろしくお願いします。',
    'hindi': 'नमस्ते जी! आपका हमारे घर में बहुत-बहुत स्वागत है। आप कैसे हैं?',
    'spanish': '¡Hola! ¿Cómo estás hoy? Me gustaría aprender este hermoso idioma.',
    'german': 'Guten Tag! Ich möchte gerne Deutsch lernen und neue Freunde treffen.'
  };

  const [inputSentence, setInputSentence] = useState<string>(
    defaultSentences[currentLanguage.id] || 'مَرْحَبَا السَّاعْ'
  );
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Audio Playback
  const handleSpeak = (text: string) => {
    playNativePronunciation(text, currentLanguage.id, { rate: 0.85 });
  };

  const handleAnalyze = async (textToAnalyze?: string) => {
    const text = (textToAnalyze || inputSentence).trim();
    if (!text) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/sentence-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: currentLanguage.id,
          sentence: text
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setAnalysis(json.data);
      }
    } catch (err) {
      console.error('Analyzer error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Deep Linguistic & Syntax Lab
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Sentence Anatomy & Grammar Parser
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Enter any sentence or idiom in {currentLanguage.name} to reveal morphological tokens, root roots (جذر), grammatical cases, and cultural pragmatics.
        </p>
      </div>

      {/* Input Analysis Console */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Target Sentence or Phrase
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={inputSentence}
              onChange={(e) => setInputSentence(e.target.value)}
              placeholder={`Enter text in ${currentLanguage.name}...`}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 font-medium"
              dir={currentLanguage.direction}
            />
            <button
              onClick={() => handleAnalyze()}
              disabled={isLoading || !inputSentence.trim()}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Sparkles className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Analyzing...' : 'Parse Sentence'}</span>
            </button>
          </div>
        </div>

        {/* Preset Sample Quick Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800/80 no-scrollbar">
          <span className="text-[10px] text-slate-400 uppercase font-bold shrink-0">
            Presets:
          </span>
          {[
            { label: 'Emirati Greeting', text: 'يَا مَرْحَبَا السَّاعْ، شْحَالِكْ يَا خُويْ؟' },
            { label: 'Hospitality Idiom', text: 'فَالِكْ طَيِّبْ، لا تَحَاتِي أَبَدًا.' },
            { label: 'Parisian Order', text: "Bonjour ! Un café crème et un croissant s'il vous plaît." },
            { label: 'Japanese Intro', text: '初めまして！どうぞよろしくお願いします。' }
          ].map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputSentence(preset.text);
                handleAnalyze(preset.text);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 whitespace-nowrap cursor-pointer transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Output Section */}
      {analysis && (
        <div className="space-y-6">
          
          {/* Overview Translation & Phonetics Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white" dir={currentLanguage.direction}>
                  {analysis.original}
                </div>
                <div className="text-sm font-mono text-amber-400 font-bold mt-1">
                  {analysis.phonetic}
                </div>
                <div className="text-sm text-slate-200 mt-2 font-medium">
                  {analysis.englishTranslation}
                </div>
                <div className="text-xs text-slate-400 italic mt-0.5">
                  Literal: "{analysis.literalTranslation}"
                </div>
              </div>

              <button
                onClick={() => handleSpeak(analysis.original)}
                className="p-3 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded-xl transition-colors cursor-pointer shrink-0"
                title="Listen Pronunciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Morphological Token Breakdown Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Word-by-Word Morpheme Decomposition
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {analysis.tokens.map((token, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                      {token.pos}
                    </span>
                    <button
                      onClick={() => handleSpeak(token.word)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-lg font-bold text-white" dir={currentLanguage.direction}>
                    {token.word}
                  </div>
                  <div className="text-xs text-amber-400/90 font-mono">
                    {token.phonetic}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {token.meaning}
                  </div>
                  
                  <div className="pt-2 border-t border-slate-850 text-[11px] text-slate-400">
                    <div className="font-semibold text-slate-300">{token.grammarRole}</div>
                    {token.rootOrConjugation && (
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Root: {token.rootOrConjugation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Syntax Explanation & Cultural Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Grammar & Syntax Rules</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {analysis.grammarSummary}
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Lightbulb className="w-4 h-4" />
                <span>Pragmatics & Cultural Context</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {analysis.culturalInsight}
              </p>
            </div>
          </div>

          {/* Similar Native Expressions */}
          {analysis.similarPhrases && analysis.similarPhrases.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Related Native Expressions & Nuances
              </h4>
              <div className="space-y-2">
                {analysis.similarPhrases.map((phrase, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white" dir={currentLanguage.direction}>
                        {phrase.text}
                      </div>
                      <div className="text-xs text-amber-400/90 font-mono mt-0.5">
                        {phrase.phonetic} • {phrase.translation}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 italic">
                        {phrase.usageNote}
                      </div>
                    </div>
                    <button
                      onClick={() => handleSpeak(phrase.text)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
