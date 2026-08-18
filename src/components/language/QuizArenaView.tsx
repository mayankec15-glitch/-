import React, { useState } from 'react';
import { LanguageConfig } from '../../data/languageCurriculum';
import { Award, CheckCircle, XCircle, Sparkles, RefreshCw, Volume2, ArrowRight, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playNativePronunciation } from '../../utils/audioPlayer';

interface QuizArenaViewProps {
  currentLanguage: LanguageConfig;
}

interface QuizQuestion {
  id: string;
  type: string;
  question: string;
  promptTargetText?: string;
  phonetic?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const QuizArenaView: React.FC<QuizArenaViewProps> = ({ currentLanguage }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: 'q1',
      type: 'cultural_etiquette',
      question: currentLanguage.id === 'uae-arabic'
        ? 'When offered a cup of hot Gahwa in an Emirati Majlis, which hand must you always use?'
        : currentLanguage.id === 'french'
        ? 'What is the mandatory first greeting before asking any question in a French shop or café?'
        : 'What is the customary toast before drinks in Japan?',
      options: currentLanguage.id === 'uae-arabic'
        ? ['Right hand exclusively', 'Left hand', 'Both hands together', 'Either hand is fine']
        : currentLanguage.id === 'french'
        ? ['Bonjour / Bonsoir', 'Combien ça coûte ?', 'Donnez-moi vite', 'Pardonnez-moi']
        : ['乾杯！（Kanpai!）', 'ただいま！（Tadaima!）', 'いただきます（Itadakimasu）', 'さようなら（Sayounara）'],
      correctAnswer: currentLanguage.id === 'uae-arabic'
        ? 'Right hand exclusively'
        : currentLanguage.id === 'french'
        ? 'Bonjour / Bonsoir'
        : '乾杯！（Kanpai!）',
      explanation: currentLanguage.id === 'uae-arabic'
        ? 'Using the right hand is a fundamental gesture of respect and hospitality across Arab culture.'
        : currentLanguage.id === 'french'
        ? 'Saying "Bonjour" establishes polite civility before any request.'
        : '"Kanpai!" literally translates to "empty the glass" and is the universal toast.'
    },
    {
      id: 'q2',
      type: 'dialect_match',
      question: currentLanguage.id === 'uae-arabic'
        ? 'Which colloquial word expresses "Very / A lot" in authentic UAE Gulf Arabic?'
        : currentLanguage.id === 'french'
        ? 'Which conversational connector is widely used in everyday spoken French?'
        : 'What phrase expresses gratitude for hard work at the end of the day in Japan?',
      options: currentLanguage.id === 'uae-arabic'
        ? ['وَايِدْ (Wayed)', 'بِالزَّاف (Bizzaf)', 'كْتِير (Kteer)', 'جِدّاً (Jiddan)']
        : currentLanguage.id === 'french'
        ? ['Du coup', 'Néanmoins', 'Cependant', 'Toutefois']
        : ['お疲れ様でした (Otsukaresama deshita)', 'ごちそうさまでした (Gochisousama deshita)', 'いってきます (Ittekimasu)', 'おかえりなさい (Okaerinasai)'],
      correctAnswer: currentLanguage.id === 'uae-arabic'
        ? 'وَايِدْ (Wayed)'
        : currentLanguage.id === 'french'
        ? 'Du coup'
        : 'お疲れ様でした (Otsukaresama deshita)',
      explanation: currentLanguage.id === 'uae-arabic'
        ? '"Wayed" is the distinctive Gulf Arabic word for high quantity or intensity.'
        : currentLanguage.id === 'french'
        ? '"Du coup" connects casual sentences smoothly.'
        : '"Otsukaresama deshita" honors collective daily effort.'
    }
  ]);

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const activeQ = questions[currentIdx];

  // Audio Playback
  const handleSpeak = (text: string) => {
    playNativePronunciation(text, currentLanguage.id, { rate: 0.85 });
  };

  const handleSelectOption = (option: string) => {
    if (selectedAnswers[currentIdx] !== undefined) return;

    const isCorrect = option === activeQ.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: option
    });
    setShowExplanation(true);

    if (isCorrect) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  // Generate dynamic quiz from Gemini API
  const handleGenerateNewQuiz = async () => {
    setIsGenerating(true);
    setIsFinished(false);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setScore(0);
    setShowExplanation(false);

    try {
      const res = await fetch('/api/quiz-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: currentLanguage.id,
          topic: 'Daily Conversation, Slang & Cultural Etiquette',
          count: 5
        })
      });

      const json = await res.json();
      if (json.success && json.data?.questions && json.data.questions.length > 0) {
        setQuestions(json.data.questions);
      }
    } catch (err) {
      console.error('Quiz generator error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Fluency & Culture Challenge
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Quiz Arena & Speed Drills
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Test your comprehension of nuances, dialects, grammar, and social etiquettes.
          </p>
        </div>

        <button
          onClick={handleGenerateNewQuiz}
          disabled={isGenerating}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 shrink-0"
        >
          {isGenerating ? <Sparkles className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          <span>{isGenerating ? 'Generating...' : 'New AI Quiz'}</span>
        </button>
      </div>

      {/* Quiz Card */}
      {!isFinished && activeQ ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span className="text-amber-400 font-bold">Score: {score}</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 uppercase">
              {activeQ.type.replace('_', ' ')}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {activeQ.question}
            </h3>

            {activeQ.promptTargetText && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="text-lg font-bold text-amber-400" dir={currentLanguage.direction}>
                  {activeQ.promptTargetText}
                </div>
                <button
                  onClick={() => handleSpeak(activeQ.promptTargetText || '')}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {activeQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentIdx] === option;
              const isAnswered = selectedAnswers[currentIdx] !== undefined;
              const isCorrect = option === activeQ.correctAnswer;

              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Explanation & Cultural Background:
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {selectedAnswers[currentIdx] !== undefined && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-md shadow-amber-500/20"
              >
                <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'Complete Quiz'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Complete Results Card */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-black text-white">
            Challenge Completed!
          </h3>

          <div className="text-4xl font-mono font-black text-amber-400">
            {score} / {questions.length}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            {score === questions.length
              ? 'Outstanding! You demonstrated flawless mastery of language idioms and cultural rules!'
              : 'Great work! Review the modules in the curriculum and grammar lab to solidify your fluency.'}
          </p>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={handleGenerateNewQuiz}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-colors cursor-pointer"
            >
              Play Another Quiz
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
