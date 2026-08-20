import React, { useState, useRef, useEffect } from 'react';
import { LanguageConfig, RoleplayScenario, ROLEPLAY_SCENARIOS } from '../../data/languageCurriculum';
import { playNativePronunciation } from '../../utils/audioPlayer';
import { haptics } from '../../utils/haptics';
import { 
  Send, 
  Bot, 
  User, 
  Volume2, 
  Sparkles, 
  RefreshCw, 
  MapPin, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  HelpCircle, 
  HardHat, 
  ShieldCheck, 
  MessageSquare, 
  ChevronDown, 
  Flame,
  VolumeX
} from 'lucide-react';

interface AiRoleplayViewProps {
  currentLanguage: LanguageConfig;
}

interface SuggestedReplyItem {
  text: string;
  phoneticHindi?: string;
  hindiTranslation?: string;
  phonetic?: string;
  translation?: string;
}

interface MessageItem {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  phoneticHindi?: string;
  phonetic?: string;
  hindiTranslation?: string;
  translation?: string;
  shramikTip?: string;
  culturalNote?: string;
  feedbackOnUserInHindi?: string;
  timestamp: string;
}

export const AiRoleplayView: React.FC<AiRoleplayViewProps> = ({ currentLanguage }) => {
  const scenarios = ROLEPLAY_SCENARIOS.filter(s => s.languageId === currentLanguage.id);
  const activeScenarios = scenarios.length > 0 ? scenarios : ROLEPLAY_SCENARIOS;

  const [currentScenario, setCurrentScenario] = useState<RoleplayScenario>(activeScenarios[0]);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [suggestedReplies, setSuggestedReplies] = useState<SuggestedReplyItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.75); // 0.75 for slow learner pace, 1.0 for normal
  const [playingMsgId, setPlayingMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or reset conversation when scenario or language changes
  useEffect(() => {
    const sc = activeScenarios.find(s => s.languageId === currentLanguage.id) || activeScenarios[0];
    setCurrentScenario(sc);
  }, [currentLanguage.id]);

  useEffect(() => {
    if (!currentScenario) return;

    const initMsg: MessageItem = {
      id: 'init-1',
      sender: 'ai',
      text: currentScenario.initialAiMessage.text,
      phoneticHindi: currentScenario.initialAiMessage.phoneticHindi,
      phonetic: currentScenario.initialAiMessage.phonetic,
      hindiTranslation: currentScenario.initialAiMessage.hindiTranslation,
      translation: currentScenario.initialAiMessage.translation,
      shramikTip: currentScenario.initialAiMessage.shramikTip || currentScenario.initialAiMessage.culturalNote,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([initMsg]);
    setSuggestedReplies(currentScenario.initialSuggestedReplies || []);
  }, [currentScenario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Audio Playback with Slow Speed Option & Android hardening
  const handleSpeak = (text: string, msgId?: string, phoneticHint?: string) => {
    if (msgId) setPlayingMsgId(msgId);
    playNativePronunciation(text, currentLanguage.id, {
      rate: speechRate,
      phoneticHint: phoneticHint,
      onStart: () => {
        if (msgId) setPlayingMsgId(msgId);
      },
      onEnd: () => {
        if (msgId) setPlayingMsgId(null);
      },
      onError: () => {
        if (msgId) setPlayingMsgId(null);
      }
    });
  };

  // Speech Recognition (Mic Input for Hindi-speaking workers)
  const handleToggleMic = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('माइक से बोलने की सुविधा आपके ब्राउज़र में उपलब्ध नहीं है। कृपया नीचे दिए गए १-क्लिक जवाब बटन दबाएं।');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      if (currentLanguage.id === 'uae-arabic') recognition.lang = 'ar-AE';
      else if (currentLanguage.id === 'german') recognition.lang = 'de-DE';
      else if (currentLanguage.id === 'japanese') recognition.lang = 'ja-JP';
      else if (currentLanguage.id === 'english') recognition.lang = 'en-US';
      else if (currentLanguage.id === 'french') recognition.lang = 'fr-FR';
      else if (currentLanguage.id === 'spanish') recognition.lang = 'es-ES';
      else recognition.lang = 'hi-IN';

      recognition.onstart = () => {
        haptics.startRecording();
        setIsListening(true);
      };
      recognition.onend = () => {
        haptics.stopRecording();
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
      };
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Send message to backend Gemini roleplay API
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    haptics.tap();

    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/chat-roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: currentLanguage.id,
          scenario: currentScenario,
          conversationHistory: newHistory.map(m => ({
            sender: m.sender === 'ai' ? (currentScenario.aiRoleHindi || currentScenario.aiRole) : (currentScenario.userRoleHindi || currentScenario.userRole),
            text: m.text
          })),
          userMessage: text
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const json = await res.json();
      if (json.success && json.data) {
        haptics.success();
        const aiData = json.data;
        const aiMsg: MessageItem = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiData.replyText,
          phoneticHindi: aiData.phoneticHindi,
          phonetic: aiData.phonetic,
          hindiTranslation: aiData.hindiTranslation,
          translation: aiData.translation,
          shramikTip: aiData.shramikTip || aiData.culturalNote,
          feedbackOnUserInHindi: aiData.feedbackOnUserInHindi,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...newHistory, aiMsg]);
        
        if (aiData.suggestedReplies && Array.isArray(aiData.suggestedReplies)) {
          setSuggestedReplies(aiData.suggestedReplies);
        }

        // Auto play speech for the AI response
        handleSpeak(aiData.replyText, aiMsg.id);
      }
    } catch (err) {
      console.warn('Roleplay network fallback:', err);
      // Instant graceful response if network is congested
      const fallbackAiMsg: MessageItem = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: currentLanguage.id === 'german' ? 'Sehr gut! Machen Sie weiter.' : currentLanguage.id === 'japanese' ? 'はい、了解しました。作業を続けてください。' : 'مُمْتَازْ! وَاصِلْ الشُّغْلْ بِنَفْسِ الهِمَّةْ',
        phoneticHindi: currentLanguage.id === 'german' ? 'ज़ेयर गूट! माखन ज़ी वाइटर.' : currentLanguage.id === 'japanese' ? 'हाई, र्योउकाइ शिमाशिता. साग्यो ओ त्सुज़ुकेते कुदासाइ.' : 'मुम्ताज़! वासिलिश-शुगल बिनाफ़्सिल-हिम्मा',
        hindiTranslation: 'बहुत बढ़िया! इसी लगन के साथ काम जारी रखें।',
        translation: 'Very good! Continue working with the same enthusiasm.',
        shramikTip: 'हमेशा सुपरवाइज़र के निर्देश को ध्यानपूर्वक सुनकर काम शुरू करें।',
        feedbackOnUserInHindi: 'शाबाश! आपने बहुत सटीक उत्तर दिया।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...newHistory, fallbackAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    const initMsg: MessageItem = {
      id: `init-${Date.now()}`,
      sender: 'ai',
      text: currentScenario.initialAiMessage.text,
      phoneticHindi: currentScenario.initialAiMessage.phoneticHindi,
      phonetic: currentScenario.initialAiMessage.phonetic,
      hindiTranslation: currentScenario.initialAiMessage.hindiTranslation,
      translation: currentScenario.initialAiMessage.translation,
      shramikTip: currentScenario.initialAiMessage.shramikTip,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initMsg]);
    setSuggestedReplies(currentScenario.initialSuggestedReplies || []);
  };

  return (
    <div id="ai-roleplay-container" className="space-y-6">
      
      {/* 1. Header & Worker Guidance Card */}
      <div id="roleplay-guide-header" className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          
          {/* Top Directorate Badge & Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-black tracking-wide flex items-center gap-1.5">
                <HardHat className="w-3.5 h-3.5 text-amber-400" />
                <span>३. काम पर बातचीत का अभ्यास (Roleplay Simulator)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-bold">
                {currentLanguage.flag} {currentLanguage.name} ({currentLanguage.nativeName})
              </span>
            </div>

            {/* Slow/Normal Speed Toggle */}
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <span className="text-[11px] text-slate-400 font-bold px-2">आवाज की गति:</span>
              <button
                type="button"
                onClick={() => setSpeechRate(0.7)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  speechRate <= 0.75 
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="धीमी आवाज में सुनें ताकि हर शब्द समझ आए"
              >
                🐢 धीमी (0.7x)
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(0.95)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  speechRate > 0.75 
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="सामान्य गति"
              >
                🐇 सामान्य (1.0x)
              </button>
            </div>
          </div>

          {/* Scenario Selection Dropdown Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-2">
            
            <div className="lg:col-span-8 space-y-1.5">
              <label htmlFor="scenario-select" className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <span>बातचीत का विषय / कार्यस्थल चुनें (Select Workplace Situation):</span>
              </label>
              
              <div className="relative">
                <select
                  id="scenario-select"
                  value={currentScenario.id}
                  onChange={(e) => {
                    const found = activeScenarios.find(s => s.id === e.target.value);
                    if (found) setCurrentScenario(found);
                  }}
                  className="w-full appearance-none px-4 py-3.5 bg-slate-950 border-2 border-slate-700 hover:border-amber-500/60 focus:border-amber-500 rounded-2xl text-sm font-black text-white focus:outline-none cursor-pointer pr-10 shadow-inner"
                >
                  {activeScenarios.map((sc) => (
                    <option key={sc.id} value={sc.id} className="bg-slate-950 text-white py-2">
                      {sc.categoryHindi ? `${sc.categoryHindi} — ` : ''}{sc.titleHindi || sc.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-amber-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center justify-end gap-2 pt-2 lg:pt-5">
              <button
                id="roleplay-restart-btn"
                type="button"
                onClick={handleRestart}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white rounded-2xl text-xs font-bold border border-slate-700 transition-all cursor-pointer"
                title="बातचीत को शुरू से दोबारा चालू करें"
              >
                <RefreshCw className="w-4 h-4 text-amber-400" />
                <span>बातचीत दोबारा शुरू करें</span>
              </button>
            </div>
          </div>

          {/* Context & Roles Indicator Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800/80">
            <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-slate-400">सुपरवाइज़र / साथी (AI)</div>
                <div className="text-xs font-black text-white truncate">{currentScenario.aiRoleHindi || currentScenario.aiRole}</div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-slate-400">आपकी भूमिका (Your Role)</div>
                <div className="text-xs font-black text-white truncate">{currentScenario.userRoleHindi || currentScenario.userRole}</div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-slate-400">कार्यस्थल (Workplace)</div>
                <div className="text-xs font-black text-white truncate">{currentScenario.location}</div>
              </div>
            </div>
          </div>

          {/* Simple 3-Step Instruction Strip */}
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-amber-200/90 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[11px] font-black shrink-0">!</span>
              <span className="font-bold text-white">श्रमिक साथियों के लिए आसान नियम:</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-300">
              <span>१. 🔊 आवाज सुनें</span>
              <span>२. 🇮🇳 हिंदी अर्थ पढ़ें</span>
              <span>३. 🔘 १-क्लिक जवाब चुनें या माइक 🎤 से बोलें</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Interactive Chat Window */}
      <div id="roleplay-chat-box" className="bg-slate-900 border border-slate-800 rounded-3xl flex flex-col h-[560px] shadow-2xl overflow-hidden relative">
        
        {/* Messages Stream */}
        <div id="roleplay-messages-list" className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            const isPlayingThis = playingMsgId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 max-w-2xl ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Avatar Icon */}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                  isAi 
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 mt-1' 
                    : 'bg-blue-600 text-white border border-blue-400/30 mt-1'
                }`}>
                  {isAi ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                {/* Message Bubble Card */}
                <div className={`space-y-3 rounded-3xl p-5 text-sm transition-all shadow-md ${
                  isAi
                    ? 'bg-slate-950 border border-slate-800 text-slate-100 rounded-tl-sm'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-tr-sm shadow-amber-500/10'
                }`}>
                  
                  {/* Bubble Header */}
                  <div className="flex items-center justify-between gap-4 border-b border-slate-800/60 pb-2">
                    <span className={`text-xs font-black ${isAi ? 'text-amber-400' : 'text-slate-950'}`}>
                      {isAi ? (currentScenario.aiRoleHindi || currentScenario.aiRole) : 'आप (You / श्रमिक साथी)'}
                    </span>
                    <span className={`text-[10px] font-mono ${isAi ? 'text-slate-400' : 'text-slate-900/80'}`}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Primary Foreign Script */}
                  <div
                    className={`text-lg sm:text-xl font-black leading-relaxed ${isAi ? 'text-white' : 'text-slate-950'}`}
                    dir={currentLanguage.direction}
                  >
                    {msg.text}
                  </div>

                  {/* AI Support Content: Hindi Pronunciation + Meaning + Workplace Tip */}
                  {isAi && (
                    <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                      
                      {/* Devanagari Hindi Pronunciation */}
                      {msg.phoneticHindi && (
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                            <span>🗣️ ऐसे बोलें (Hindi Pronunciation):</span>
                          </div>
                          <div className="text-amber-200 font-black text-sm tracking-wide">
                            {msg.phoneticHindi}
                          </div>
                        </div>
                      )}

                      {/* Roman phonetic fallback */}
                      {!msg.phoneticHindi && msg.phonetic && (
                        <div className="text-xs text-amber-400/90 font-mono">
                          {msg.phonetic}
                        </div>
                      )}

                      {/* Simple Hindi Meaning */}
                      {(msg.hindiTranslation || msg.translation) && (
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200">
                          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                            <span>🇮🇳 हिंदी में अर्थ (Meaning in Hindi):</span>
                          </div>
                          <div className="font-bold text-white text-xs sm:text-sm">
                            "{msg.hindiTranslation || msg.translation}"
                          </div>
                        </div>
                      )}

                      {/* Shramik Workplace Tip */}
                      {msg.shramikTip && (
                        <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 text-xs text-emerald-300 leading-relaxed flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-black text-emerald-200">श्रमिक काम की सलाह: </span>
                            {msg.shramikTip}
                          </div>
                        </div>
                      )}

                      {/* Encouraging Feedback on User's previous response */}
                      {msg.feedbackOnUserInHindi && (
                        <div className="p-2 rounded-xl bg-blue-950/40 border border-blue-800/40 text-[11px] text-blue-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span><strong className="text-blue-200">सुपरवाइज़र प्रतिक्रिया: </strong>{msg.feedbackOnUserInHindi}</span>
                        </div>
                      )}

                      {/* Audio Playback Button */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-400 italic">
                          (धीमी आवाज में उच्चारण सुनने के लिए बटन दबाएं)
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSpeak(msg.text, msg.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isPlayingThis 
                              ? 'bg-emerald-500 text-slate-950 animate-pulse' 
                              : 'bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-slate-800'
                          }`}
                          title="इस वाक्य का शुद्ध उच्चारण सुनें"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>{isPlayingThis ? 'आवाज चल रही है...' : '🔊 आवाज सुनें'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}

          {/* Loading Animation */}
          {isLoading && (
            <div className="flex items-center gap-3 mr-auto">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Bot className="w-5 h-5 animate-bounce" />
              </div>
              <div className="p-4 rounded-3xl rounded-tl-sm bg-slate-950 border border-slate-800 text-xs text-amber-300 animate-pulse flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <span>{currentScenario.aiRoleHindi || currentScenario.aiRole} जवाब तैयार कर रहे हैं...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 3. 1-Click Quick Reply Options Deck for Migrant Workers */}
        {suggestedReplies.length > 0 && (
          <div id="roleplay-suggested-replies" className="p-3 bg-slate-950 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>१-क्लिक आसान जवाब विकल्प (बोलने के लिए एक विकल्प पर क्लिक करें):</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">बिना टाइप किए तुरंत उत्तर दें</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {suggestedReplies.map((sug, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(sug.text)}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border-2 border-slate-800 hover:border-amber-500 active:scale-95 text-left transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-xs sm:text-sm font-black text-white group-hover:text-amber-400 transition-colors" dir={currentLanguage.direction}>
                      {sug.text}
                    </div>
                    {sug.phoneticHindi && (
                      <div className="text-[11px] text-amber-300 font-bold">
                        🗣️ {sug.phoneticHindi}
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1.5 pt-1.5 border-t border-slate-800/80">
                    🇮🇳 "{sug.hindiTranslation || sug.translation}"
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Worker Input Bar with Voice Recognition */}
        <div id="roleplay-input-bar" className="p-3.5 sm:p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Big Mic Button */}
            <button
              id="roleplay-mic-btn"
              type="button"
              onClick={handleToggleMic}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer shrink-0 shadow-md ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-400 animate-pulse ring-4 ring-rose-500/30'
                  : 'bg-slate-900 text-amber-400 border-slate-700 hover:border-amber-500 hover:bg-slate-800'
              }`}
              title="माइक से बोलकर जवाब दें"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Input Text Box */}
            <input
              id="roleplay-text-input"
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={isListening ? 'सुन रहे हैं... बोलिए...' : `यहाँ टाइप करें या ऊपर दिए १-क्लिक जवाब चुनें...`}
              className="flex-1 bg-slate-900 border-2 border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
              dir={currentLanguage.direction}
            />

            {/* Send Button */}
            <button
              id="roleplay-send-btn"
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20 shrink-0 active:scale-95"
            >
              <span>भेजें</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {isListening && (
            <div className="mt-2 text-center text-xs text-rose-400 font-bold animate-pulse flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>माइक्रोफोन सक्रिय है... कृपया अपना वाक्य बोलिए...</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
