import React, { useState, useEffect, useRef } from 'react';
import { LanguageConfig } from '../../data/languageCurriculum';
import { 
  MIGRANT_VOCABULARY_150, 
  TRADE_CATEGORIES, 
  MigrantVocabItem, 
  VocabLanguageDetail 
} from '../../data/migrantVocabData';
import { playNativePronunciation, stopNativeAudio } from '../../utils/audioPlayer';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  HardHat, 
  HeartPulse, 
  UtensilsCrossed, 
  Truck, 
  Wrench, 
  Factory, 
  Coins, 
  ShieldAlert,
  Clock,
  Timer,
  MessageSquare,
  Smile,
  Sprout,
  Car,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { haptics } from '../../utils/haptics';

interface VoicePronunciationCoachViewProps {
  currentLanguage: LanguageConfig;
  selectedVocabItem?: MigrantVocabItem | null;
}

interface EvaluationResult {
  accuracyScore: number;
  fluencyScore: number;
  grade: string;
  feedbackInHindi: string;
  phoneticGuideHindi: string;
  syllableBreakdown: Array<{ syllable: string; correct: boolean; tip: string }>;
  soundTipsHindi: string;
  workplaceContextHindi: string;
  isFallback?: boolean;
}

export const VoicePronunciationCoachView: React.FC<VoicePronunciationCoachViewProps> = ({ 
  currentLanguage,
  selectedVocabItem
}) => {
  const [selectedTrade, setSelectedTrade] = useState<string>('all');
  const [activeItemIndex, setActiveItemIndex] = useState<number>(() => {
    if (selectedVocabItem) {
      const idx = MIGRANT_VOCABULARY_150.findIndex(item => item.id === selectedVocabItem.id);
      return idx !== -1 ? idx : 0;
    }
    return 0;
  });
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recognizedTranscript, setRecognizedTranscript] = useState<string>('');
  const [manualInput, setManualInput] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.85);
  const [testMode, setTestMode] = useState<boolean>(false);
  const [testScore, setTestScore] = useState<number>(0);
  const [testedCount, setTestedCount] = useState<number>(0);
  const [micSupported, setMicSupported] = useState<boolean>(true);
  const [micPermissionError, setMicPermissionError] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // 4-5 Seconds Speech Test Timer configuration
  const [timerDuration, setTimerDuration] = useState<number>(5); // 4 or 5 seconds
  const [countdownLeft, setCountdownLeft] = useState<number>(5);
  
  const timerIntervalRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);
  const recognizedTranscriptRef = useRef<string>('');

  // Keep transcript ref in sync for timer callback
  useEffect(() => {
    recognizedTranscriptRef.current = recognizedTranscript;
  }, [recognizedTranscript]);

  // Map app language ID to dataset translation key
  const langKey = (
    currentLanguage.id === 'uae-arabic' ? 'uae-arabic' :
    currentLanguage.id === 'german' ? 'german' :
    currentLanguage.id === 'japanese' ? 'japanese' :
    currentLanguage.id === 'french' ? 'french' :
    currentLanguage.id === 'spanish' ? 'spanish' : 'english'
  ) as keyof MigrantVocabItem['translations'];

  // Filter items based on selected trade
  const filteredVocab = MIGRANT_VOCABULARY_150.filter(item => {
    if (selectedTrade === 'all') return true;
    return item.tradeId === selectedTrade;
  });

  // When a word is specifically selected from the Vocab Bank (e.g. Japanese word clicked)
  useEffect(() => {
    if (selectedVocabItem) {
      setSelectedTrade('all');
      const idx = MIGRANT_VOCABULARY_150.findIndex(item => item.id === selectedVocabItem.id);
      if (idx !== -1) {
        setActiveItemIndex(idx);
      }
      setEvaluation(null);
      setRecognizedTranscript('');
      setManualInput('');
    }
  }, [selectedVocabItem]);

  // Reset evaluation state on language change without breaking active index
  useEffect(() => {
    setEvaluation(null);
    setRecognizedTranscript('');
    setManualInput('');
  }, [currentLanguage.id]);

  const currentItem = filteredVocab[activeItemIndex] || filteredVocab[0] || MIGRANT_VOCABULARY_150[0];
  const langDetail: VocabLanguageDetail = currentItem.translations[langKey] || currentItem.translations['english'];

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      // Set recognition language based on active language
      if (currentLanguage.id === 'uae-arabic') recognition.lang = 'ar-AE';
      else if (currentLanguage.id === 'german') recognition.lang = 'de-DE';
      else if (currentLanguage.id === 'japanese') recognition.lang = 'ja-JP';
      else if (currentLanguage.id === 'french') recognition.lang = 'fr-FR';
      else if (currentLanguage.id === 'spanish') recognition.lang = 'es-ES';
      else recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setMicPermissionError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setRecognizedTranscript(transcript);
        recognizedTranscriptRef.current = transcript;
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setMicPermissionError('माइक्रोफोन अनुमति अस्वीकृत है। आप नीचे टाइप करके भी जांच सकते हैं।');
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Speech recognition init error:', err);
      setMicSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [currentLanguage.id]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Handle Native Speech Synthesis (Audio Playback with fallback & Arabic sanitization)
  const playNativeAudio = (text: string, rate: number = speechSpeed) => {
    setIsPlayingAudio(true);
    playNativePronunciation(text, currentLanguage.id, {
      rate: rate,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: (err) => {
        console.warn('Audio playback error:', err);
        setIsPlayingAudio(false);
      }
    });
  };

  // Run Fast AI Evaluation
  const handleEvaluate = async (spokenTextToUse?: string) => {
    // Only use text that was actually spoken or typed. NEVER default to target word!
    const textToCheck = (
      (spokenTextToUse !== undefined 
        ? spokenTextToUse 
        : (recognizedTranscriptRef.current || recognizedTranscript || manualInput)) || ""
    ).trim();

    // If user stayed silent or no speech was captured
    if (!textToCheck) {
      haptics.warning();
      setIsEvaluating(false);
      setEvaluation({
        accuracyScore: 0,
        fluencyScore: 0,
        grade: 'अपूर्ण',
        noSpeech: true,
        feedbackInHindi: 'कोई आवाज़ दर्ज नहीं हुई! कृपया माइक (🎤) बटन दबाएं और शब्द को स्पष्ट व ऊँची आवाज़ में बोलें।',
        phoneticGuideHindi: langDetail.phoneticHindi || langDetail.word,
        syllableBreakdown: (langDetail.phoneticHindi || langDetail.word).split(/[\s-]+/).map((s: string) => ({
          syllable: s,
          correct: false,
          tip: 'बोलें'
        })),
        soundTipsHindi: 'माइक चालू होने के बाद 4-5 सेकंड के भीतर बोलें ताकि आपकी आवाज़ पहचानी जा सके।',
        workplaceContextHindi: `उच्चारण की जांच के लिए आवाज़ का दर्ज होना आवश्यक है। "${currentItem.hindiTerm}" का अभ्यास करें।`,
        isFallback: false
      });
      return;
    }

    setIsEvaluating(true);
    setEvaluation(null);

    // Realistic local evaluation fallback builder
    const buildInstantLocalScore = () => {
      const target = (langDetail.word || "").toLowerCase().replace(/[^\w\u0600-\u06FF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, "");
      const spoken = textToCheck.toLowerCase().replace(/[^\w\u0600-\u06FF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, "");
      
      let matchScore = 20;
      if (target && spoken) {
        if (target === spoken) {
          matchScore = 96;
        } else if (spoken.includes(target) || target.includes(spoken)) {
          const lenRatio = Math.min(spoken.length, target.length) / Math.max(spoken.length, target.length, 1);
          matchScore = Math.round(75 + lenRatio * 20); // 75-95
        } else {
          // Levenshtein edit distance
          const m = target.length;
          const n = spoken.length;
          const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
          for (let i = 0; i <= m; i++) dp[i][0] = i;
          for (let j = 0; j <= n; j++) dp[0][j] = j;

          for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
              const cost = target[i - 1] === spoken[j - 1] ? 0 : 1;
              dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
            }
          }

          const dist = dp[m][n];
          const maxLen = Math.max(m, n, 1);
          const simRatio = Math.max(0, 1 - dist / maxLen);

          if (simRatio >= 0.8) {
            matchScore = Math.round(85 + (simRatio - 0.8) * 55);
          } else if (simRatio >= 0.5) {
            matchScore = Math.round(60 + (simRatio - 0.5) * 80);
          } else if (simRatio >= 0.25) {
            matchScore = Math.round(35 + (simRatio - 0.25) * 100);
          } else {
            matchScore = Math.max(10, Math.round(simRatio * 100));
          }
        }
      }

      const isGood = matchScore >= 75;
      const isAvg = matchScore >= 50;

      return {
        accuracyScore: matchScore,
        fluencyScore: Math.max(0, matchScore - 5),
        grade: matchScore >= 90 ? 'A+' : matchScore >= 80 ? 'A' : matchScore >= 60 ? 'B' : matchScore >= 40 ? 'C' : 'D',
        feedbackInHindi: isGood 
          ? `शानदार प्रयास! आपका उच्चारण बहुत अच्छा और स्पष्ट है। (${langDetail.phoneticHindi}) को इसी तरह बोलें।`
          : isAvg
          ? `मध्यम प्रयास। ध्वनि में थोड़ा अंतर है। (${langDetail.phoneticHindi}) को 1-2 बार और सुनकर बोलें।`
          : `गलत उच्चारण। आपने बोला: "${textToCheck}" जबकि सही उच्चारण (${langDetail.phoneticHindi}) है। कृपया ध्वनि सुनकर पुनः प्रयास करें।`,
        phoneticGuideHindi: langDetail.phoneticHindi,
        syllableBreakdown: (langDetail.phoneticHindi || langDetail.word).split(/[\s-]+/).map((s: string) => ({
          syllable: s,
          correct: matchScore >= 70,
          tip: matchScore >= 70 ? 'स्पष्ट' : 'सुधारें'
        })),
        soundTipsHindi: matchScore >= 75
          ? 'आवाज को स्थिर और मध्यम गति में रखें।'
          : `शब्द को धीरे और स्पष्ट बोलें: "${langDetail.phoneticHindi || langDetail.word}"`,
        workplaceContextHindi: `कार्यस्थल पर यह "${currentItem.hindiTerm}" के लिए आवश्यक शब्द है।`,
        isFallback: true
      };
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3200); // 3.2-second hard timeout for ultra-fast response

      const res = await fetch('/api/voice-pronunciation-eval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetPhrase: langDetail.word,
          spokenPhrase: textToCheck,
          targetPhoneticHindi: langDetail.phoneticHindi,
          language: currentLanguage.name,
          hindiMeaning: currentItem.hindiTerm,
          tradeCategory: currentItem.tradeId
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const json = await res.json();
      
      if (json.success && json.data) {
        setEvaluation(json.data);
        const score = json.data.accuracyScore ?? 0;
        if (score >= 80) {
          if (testMode && testedCount + 1 >= 10) {
            haptics.milestone();
          } else {
            haptics.success();
          }
          try {
            confetti({
              particleCount: 45,
              spread: 65,
              origin: { y: 0.6 }
            });
          } catch (e) {}
        } else {
          haptics.warning();
        }

        if (testMode) {
          setTestedCount(prev => prev + 1);
          setTestScore(prev => prev + score);
        }
      } else {
        const local = buildInstantLocalScore();
        setEvaluation(local);
        if (local.accuracyScore >= 80) {
          haptics.success();
        } else {
          haptics.warning();
        }
      }
    } catch (error) {
      console.warn('Evaluation fallback to instant score:', error);
      const local = buildInstantLocalScore();
      setEvaluation(local);
      if (local.accuracyScore >= 80) {
        haptics.success();
      } else {
        haptics.warning();
      }
      if (testMode) {
        setTestedCount(prev => prev + 1);
        setTestScore(prev => prev + local.accuracyScore);
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  // Toggle Microphone with 4 to 5 Second Countdown Timer
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording manually
      haptics.stopRecording();
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsRecording(false);
      // Immediately evaluate current spoken text
      handleEvaluate();
    } else {
      // Start 4-5 second speech test
      haptics.startRecording();
      setRecognizedTranscript('');
      recognizedTranscriptRef.current = '';
      setEvaluation(null);
      setMicPermissionError(null);
      setCountdownLeft(timerDuration);

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          try { recognitionRef.current.stop(); } catch (err) {}
          setTimeout(() => {
            try { recognitionRef.current.start(); } catch (err) {}
          }, 150);
        }
      }

      setIsRecording(true);

      // Start Countdown Timer (e.g. 5s -> 4s -> 3s -> 2s -> 1s -> Auto Stop & Evaluate)
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }

      let remaining = timerDuration;
      timerIntervalRef.current = setInterval(() => {
        remaining -= 1;
        setCountdownLeft(remaining);

        if (remaining <= 0) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          if (recognitionRef.current) {
            try { recognitionRef.current.stop(); } catch (e) {}
          }
          setIsRecording(false);
          // Automatically evaluate
          setTimeout(() => {
            handleEvaluate();
          }, 100);
        }
      }, 1000);
    }
  };

  // Next Item
  const handleNextPhrase = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setEvaluation(null);
    setRecognizedTranscript('');
    recognizedTranscriptRef.current = '';
    setManualInput('');
    setIsRecording(false);
    if (activeItemIndex + 1 < filteredVocab.length) {
      setActiveItemIndex(prev => prev + 1);
    } else {
      setActiveItemIndex(0);
    }
  };

  // Previous Item
  const handlePrevPhrase = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setEvaluation(null);
    setRecognizedTranscript('');
    recognizedTranscriptRef.current = '';
    setManualInput('');
    setIsRecording(false);
    if (activeItemIndex > 0) {
      setActiveItemIndex(prev => prev - 1);
    }
  };

  // Get Trade Icon
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
      
      {/* Official Directorate of Training UP Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold">
                  प्रशिक्षण निदेशालय, उत्तर प्रदेश
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  द्रुत AI उच्चारण जांच (Fast 4-5s Evaluation)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                प्रवासी श्रमिक बोलकर भाषा अभ्यास एवं AI उच्चारण जांच
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                विदेशी या अन्य राज्यों में रोजगार हेतु जाने वाले श्रमिक अपनी मातृभाषा (हिंदी) में उच्चारण सुनकर बोलें और तुरंत 4-5 सेकंड में AI फीडबैक पाएं।
              </p>
            </div>
          </div>

          {/* Timer Duration & Test Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            {/* Speech Test Timer Duration Picker */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400 ml-1.5" />
              <span className="text-slate-400 text-[11px] font-bold pr-1">टेस्ट समय:</span>
              <button
                onClick={() => setTimerDuration(4)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  timerDuration === 4 
                    ? 'bg-amber-500 text-slate-950 font-black' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                4 सेकंड
              </button>
              <button
                onClick={() => setTimerDuration(5)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  timerDuration === 5 
                    ? 'bg-amber-500 text-slate-950 font-black' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                5 सेकंड
              </button>
            </div>

            <button
              onClick={() => {
                setTestMode(!testMode);
                setEvaluation(null);
                setTestedCount(0);
                setTestScore(0);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                testMode 
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20' 
                  : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{testMode ? '✓ टेस्ट मोड सक्रिय' : '🎯 10-शब्द टेस्ट मोड'}</span>
            </button>
          </div>
        </div>

        {/* Dropdowns Bar: Trade Category Dropdown & Word Jump Dropdown */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Trade Category Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="select-trade-category" className="text-xs font-bold text-slate-400 whitespace-nowrap">
              कार्य क्षेत्र (Trade):
            </label>
            <select
              id="select-trade-category"
              value={selectedTrade}
              onChange={(e) => {
                setSelectedTrade(e.target.value);
                setActiveItemIndex(0);
                setEvaluation(null);
              }}
              className="bg-slate-950 text-amber-300 font-bold border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400 cursor-pointer w-full sm:w-auto"
            >
              <option value="all">🌐 समस्त 12 कार्य क्षेत्र (All {MIGRANT_VOCABULARY_150.length}+ Words)</option>
              {TRADE_CATEGORIES.map(trade => (
                <option key={trade.id} value={trade.id}>
                  {trade.nameHindi} ({trade.nameEnglish})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Word Jumper Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="select-word-jump" className="text-xs font-bold text-slate-400 whitespace-nowrap">
              शब्द चुनें (Jump to Word):
            </label>
            <select
              id="select-word-jump"
              value={activeItemIndex}
              onChange={(e) => {
                setActiveItemIndex(Number(e.target.value));
                setEvaluation(null);
                setRecognizedTranscript('');
              }}
              className="bg-slate-950 text-white font-mono font-bold border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400 cursor-pointer w-full sm:w-auto max-w-[240px] truncate"
            >
              {filteredVocab.map((item, idx) => {
                const tr = item.translations[langKey] || item.translations['english'];
                return (
                  <option key={item.id} value={idx}>
                    #{idx + 1}: {tr.word} — {item.hindiTerm}
                  </option>
                );
              })}
            </select>
          </div>

        </div>
      </div>

      {/* Main Pronunciation Studio Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Main Workspace: Active Target Card & Voice Recorder (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Phrase Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative">
            
            {/* Top Navigation & Counter */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-950 text-amber-400 border border-slate-800">
                  शब्द {activeItemIndex + 1} / {filteredVocab.length}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {TRADE_CATEGORIES.find(t => t.id === currentItem.tradeId)?.nameHindi}
                </span>
              </div>

              {/* Speech Speed Control */}
              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg p-1">
                <button
                  onClick={() => setSpeechSpeed(0.7)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${speechSpeed === 0.7 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                  title="धीमी गति (Slow 0.7x)"
                >
                  🐢 धीमा
                </button>
                <button
                  onClick={() => setSpeechSpeed(0.9)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${speechSpeed === 0.9 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                  title="सामान्य गति (Normal 0.9x)"
                >
                  🔊 सामान्य
                </button>
              </div>
            </div>

            {/* Target Foreign Word in Big Typography */}
            <div className="text-center py-4 sm:py-6 space-y-3">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
                <span>{currentLanguage.flag} {currentLanguage.name}</span>
              </div>
              
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight" dir={currentLanguage.direction}>
                {langDetail.word}
              </div>

              {/* Devanagari Hindi Phonetic Transliteration */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm sm:text-base">
                <span>देवनागरी उच्चारण:</span>
                <span className="text-white font-mono">{langDetail.phoneticHindi}</span>
              </div>

              {/* Hindi Meaning Badge */}
              <div className="text-sm sm:text-base font-semibold text-slate-300">
                हिंदी अर्थ: <span className="text-emerald-400 font-bold">{currentItem.hindiTerm}</span> ({currentItem.englishTerm})
              </div>

              {/* Audio Listen Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => playNativeAudio(langDetail.word, speechSpeed)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-lg transition-all cursor-pointer active:scale-95 ${
                    isPlayingAudio
                      ? 'bg-amber-400 text-slate-950 shadow-amber-400/40 ring-4 ring-amber-400/20'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                  <span>{isPlayingAudio ? 'उच्चारण चल रहा है...' : 'सही उच्चारण सुनें (Listen)'}</span>
                </button>

                <button
                  onClick={() => playNativeAudio(langDetail.exampleSentence, speechSpeed)}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all cursor-pointer"
                  title="कार्यस्थल पर पूरा वाक्य सुनें"
                >
                  <span>पूरा वाक्य सुनें</span>
                </button>
              </div>
            </div>

            {/* Example Workplace Sentence Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                <span>कार्यस्थल पर उपयोगी वाक्य (Workplace Example):</span>
                <button 
                  onClick={() => playNativeAudio(langDetail.exampleSentence, 0.75)} 
                  className="text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Volume2 className="w-3 h-3" /> सुनें
                </button>
              </div>
              <p className="text-slate-100 font-medium font-mono" dir={currentLanguage.direction}>
                "{langDetail.exampleSentence}"
              </p>
              <p className="text-amber-300 text-[12px]">
                उच्चारण: {langDetail.examplePhoneticHindi}
              </p>
              <p className="text-slate-400 text-[12px]">
                अर्थ: {langDetail.exampleSentenceHindi}
              </p>
            </div>

            {/* Interactive Recording Panel with 4-5s Live Timer */}
            <div className="mt-6 pt-6 border-t border-slate-800">
              <div className="text-center space-y-4">
                
                {/* Visual Mic Button with Live 4-5s Countdown Animation */}
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="relative">
                    <button
                      onClick={toggleRecording}
                      className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
                        isRecording 
                          ? 'bg-rose-600 text-white animate-pulse shadow-rose-600/50 ring-8 ring-rose-500/30 scale-110' 
                          : 'bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 hover:scale-105 shadow-amber-500/30'
                      }`}
                    >
                      {isRecording ? (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-2xl font-black font-mono leading-none">{countdownLeft}s</span>
                          <span className="text-[9px] uppercase font-bold tracking-tight">बोलें</span>
                        </div>
                      ) : (
                        <Mic className="w-8 h-8" />
                      )}
                    </button>

                    {/* Active Timer Ring Badge */}
                    {isRecording && (
                      <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black border border-white/30 animate-bounce">
                        {countdownLeft}s शेष
                      </div>
                    )}
                  </div>

                  {/* 4 to 5 Second Timer Status Display */}
                  <div className="text-center space-y-1">
                    <p className="text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2">
                      {isRecording ? (
                        <span className="text-rose-400 flex items-center gap-1.5">
                          <Timer className="w-4 h-4 animate-spin" />
                          समय शेष: {countdownLeft} सेकंड (बोलिए, 0 होने पर तुरंत AI जांच होगी)...
                        </span>
                      ) : (
                        <span>माइक दबाएं ({timerDuration} सेकंड बोलने का समय)</span>
                      )}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      ऊपर लिखे शब्द <span className="text-amber-400 font-bold font-mono">"{langDetail.phoneticHindi}"</span> को स्पष्ट बोलें
                    </p>
                  </div>

                  {/* Visual Progress Bar for 4-5s Recording */}
                  {isRecording && (
                    <div className="w-48 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 mx-auto">
                      <div 
                        className="bg-rose-500 h-full transition-all duration-1000 ease-linear"
                        style={{ width: `${(countdownLeft / timerDuration) * 100}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Recognized Text Display */}
                {recognizedTranscript && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">पहचानी गई आवाज़ (Recognized Audio):</span>
                    <p className="text-base font-black text-amber-400 font-mono">
                      "{recognizedTranscript}"
                    </p>
                  </div>
                )}

                {/* Mic Permission Warning / Fallback Input */}
                {micPermissionError && (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{micPermissionError}</span>
                  </div>
                )}

                {/* Action Trigger Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => handleEvaluate()}
                    disabled={isEvaluating}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>AI त्वरित जांच जारी है... (Evaluating)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>तुरंत AI उच्चारण जांचें (Fast Evaluate)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleNextPhrase}
                    className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    <span>अगला शब्द (Next)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Native Audio Simulation for Fast Testing */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setRecognizedTranscript(langDetail.word);
                      recognizedTranscriptRef.current = langDetail.word;
                      handleEvaluate(langDetail.word);
                    }}
                    className="text-[11px] text-slate-400 hover:text-amber-300 underline font-medium cursor-pointer"
                  >
                    ⚡ बिना माइक तुरंत टेस्ट करें (Instant Spoken Simulation)
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevPhrase}
              disabled={activeItemIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 text-xs font-bold transition-all cursor-pointer"
            >
              ← पिछला शब्द
            </button>

            <span className="text-xs font-mono text-slate-400">
              प्रशिक्षण निदेशालय उत्तर प्रदेश • 200+ शब्दावली संग्रह
            </span>

            <button
              onClick={handleNextPhrase}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              अगला शब्द →
            </button>
          </div>

        </div>

        {/* Right Panel: Fast AI Pronunciation Feedback & Evaluation Report (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AI Feedback Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  AI उच्चारण रिपोर्ट (AI Pronunciation Feedback)
                </h3>
              </div>
              {evaluation && (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black font-mono ${
                  evaluation.accuracyScore >= 80 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : evaluation.accuracyScore >= 50
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  ग्रेड {evaluation.grade}
                </span>
              )}
            </div>

            {evaluation ? (
              <div className="space-y-4">
                
                {/* Score Progress Bar & Score Circle */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">सटीकता स्कोर (Accuracy)</span>
                    <div className="text-3xl font-black text-white font-mono flex items-baseline gap-1">
                      <span className={
                        evaluation.accuracyScore >= 80 
                          ? 'text-emerald-400' 
                          : evaluation.accuracyScore >= 50 
                          ? 'text-amber-400' 
                          : 'text-rose-400'
                      }>
                        {evaluation.accuracyScore}
                      </span>
                      <span className="text-sm text-slate-400">/ 100</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">प्रवाह (Fluency)</span>
                    <div className="text-xl font-bold text-slate-300 font-mono">
                      {evaluation.fluencyScore}%
                    </div>
                  </div>
                </div>

                {/* Hindi Feedback Box */}
                <div className={`p-4 rounded-xl space-y-2 border ${
                  evaluation.accuracyScore >= 80 
                    ? 'bg-emerald-950/20 border-emerald-800/30 text-emerald-400' 
                    : evaluation.accuracyScore >= 50
                    ? 'bg-amber-950/20 border-amber-800/30 text-amber-400'
                    : 'bg-rose-950/20 border-rose-800/30 text-rose-400'
                }`}>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    {evaluation.accuracyScore >= 80 ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    )}
                    <span>AI प्रशिक्षक मार्गदर्शन (Hindi Feedback):</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {evaluation.feedbackInHindi}
                  </p>
                </div>

                {/* Syllable Breakdown */}
                {evaluation.syllableBreakdown && evaluation.syllableBreakdown.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-300">अक्षर-दर-अक्षर विश्लेषण (Syllable Breakdown):</span>
                    <div className="flex flex-wrap gap-2">
                      {evaluation.syllableBreakdown.map((s, idx) => (
                        <div 
                          key={idx} 
                          className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono flex items-center gap-1.5"
                        >
                          <span className="text-amber-400 font-bold">{s.syllable}</span>
                          <span className="text-[10px] text-slate-400">({s.tip})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sound Tips */}
                {evaluation.soundTipsHindi && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <span className="text-amber-400 font-bold">💡 उच्चारण तकनीक व सुधार टिप:</span>
                    <p className="text-slate-300">{evaluation.soundTipsHindi}</p>
                  </div>
                )}

                {/* Workplace Context */}
                {evaluation.workplaceContextHindi && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <span className="text-cyan-400 font-bold">🏢 कार्यस्थल उपयोगिता (Job Context):</span>
                    <p className="text-slate-300">{evaluation.workplaceContextHindi}</p>
                  </div>
                )}

                {/* Retry Button */}
                <button
                  onClick={() => {
                    setEvaluation(null);
                    setRecognizedTranscript('');
                    recognizedTranscriptRef.current = '';
                    toggleRecording();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>दोबारा बोलकर प्रयास करें ({timerDuration}s Speech Test)</span>
                </button>

              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <Mic className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">बोलने का इंतजार है</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    माइक बटन दबाएं और {timerDuration} सेकंड में देवनागरी उच्चारण बोलें। AI तुरंत आपकी आवाज़ का विश्लेषण करेगा।
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Test Mode Progress Widget (No certificates) */}
          {testMode && (
            <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  टेस्ट प्रगति (Test Progress)
                </span>
                <span className="text-xs font-mono text-white font-bold">
                  {testedCount} / 10 शब्द पूर्ण
                </span>
              </div>

              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (testedCount / 10) * 100)}%` }}
                />
              </div>

              {testedCount >= 10 && (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-center space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p className="text-xs font-bold text-emerald-300">
                    बधाई! आपने 10 शब्दों का उच्चारण टेस्ट पूरा कर लिया।
                  </p>
                  <p className="text-xs text-slate-300">
                    औसत स्कोर: <span className="font-mono font-bold text-amber-400">{Math.round(testScore / Math.max(1, testedCount))}%</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Quick Help Box */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>प्रशिक्षण निदेशालय UP का संदेश:</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              विदेश जाने से पहले कम से कम 50 मुख्य शब्दों का सही उच्चारण सीख लें। इससे कार्यस्थल पर सुरक्षा और संवाद में बड़ी आसानी होती है।
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
