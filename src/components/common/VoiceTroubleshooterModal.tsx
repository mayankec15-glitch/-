import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  Smartphone, 
  Sliders, 
  X, 
  Zap,
  HelpCircle,
  Headphones
} from 'lucide-react';
import { 
  testSpeakerSound, 
  resetAudioEngine, 
  getVoiceMode, 
  setVoiceMode, 
  VoicePlaybackMode,
  unlockAudioEngine 
} from '../../utils/audioPlayer';
import { haptics } from '../../utils/haptics';

interface VoiceTroubleshooterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceTroubleshooterModal: React.FC<VoiceTroubleshooterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [currentMode, setCurrentMode] = useState<VoicePlaybackMode>('auto');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'failed' | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentMode(getVoiceMode());
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleModeChange = (mode: VoicePlaybackMode) => {
    haptics.tap();
    setCurrentMode(mode);
    setVoiceMode(mode);
  };

  const handleRunTest = () => {
    setIsTesting(true);
    setTestResult(null);
    haptics.tap();

    testSpeakerSound(
      () => {
        setIsTesting(false);
        setTestResult('success');
        haptics.success();
      },
      () => {
        setIsTesting(false);
        setTestResult('failed');
        haptics.warning();
      }
    );

    setTimeout(() => {
      setIsTesting(false);
    }, 2000);
  };

  const handleResetSystem = () => {
    haptics.tap();
    resetAudioEngine();
    handleRunTest();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border-2 border-amber-500/50 shadow-2xl p-5 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                आवाज व स्पीकर सेटिंग्स (Voice Troubleshooter)
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                फोन में बिना किसी देरी के तुरंत आवाज पाने के लिए
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              haptics.tap();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1-Tap Sound Test & Hardware Reset */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>१-टैप आवाज जांच व अनफ्रीज़ (Sound Test)</span>
            </span>
            {testResult === 'success' && (
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> आवाज ठीक है
              </span>
            )}
          </div>

          <p className="text-xs text-slate-300">
            यदि किसी शब्द पर आवाज नहीं आ रही है या देर से बज रही है, तो नीचे दिए बटन से फोन का ऑडियो सिस्टम तुरंत रीसेट करें:
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleRunTest}
              disabled={isTesting}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                isTesting
                  ? 'bg-amber-500 text-slate-950 animate-pulse'
                  : 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-amber-500/20'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isTesting ? 'animate-bounce' : ''}`} />
              <span>{isTesting ? 'ध्वनि बज रही है...' : '🔊 टेस्ट आवाज बजाएं (Test Sound)'}</span>
            </button>

            <button
              onClick={handleResetSystem}
              title="ऑडियो इंजन रीसेट करें"
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Voice Playback Modes Selection */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>आवाज का प्रकार चुनें (Select Voice Mode):</span>
          </label>

          <div className="grid grid-cols-1 gap-2.5">
            
            {/* Auto Instant Mode */}
            <div
              onClick={() => handleModeChange('auto')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                currentMode === 'auto'
                  ? 'bg-amber-500/10 border-amber-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${
                currentMode === 'auto' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
              }`}>
                <Zap className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">⚡ अल्ट्रा-फास्ट मोड (अनुशंसित / Default)</span>
                  {currentMode === 'auto' && (
                    <span className="text-[10px] font-black text-amber-400">सक्रिय (Active)</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  बिना किसी देरी के तुरंत आवाज आएगी। विदेशी वॉयस न होने पर फोन स्वतः देवनागरी हिंदी उच्चारण बोलेगा।
                </p>
              </div>
            </div>

            {/* Hindi Phonetic Guide Mode */}
            <div
              onClick={() => handleModeChange('hindi-phonetic')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                currentMode === 'hindi-phonetic'
                  ? 'bg-amber-500/10 border-amber-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${
                currentMode === 'hindi-phonetic' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
              }`}>
                <Headphones className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">🗣️ शुद्ध हिंदी मार्गदर्शक आवाज (Hindi Phonetic)</span>
                  {currentMode === 'hindi-phonetic' && (
                    <span className="text-[10px] font-black text-amber-400">सक्रिय (Active)</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  हर विदेशी शब्द का भारतीय हिंदी लहजे में आसान उच्चारण (उदा. 'मरहबा', 'कोन्निचिवा')।
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Quick Mobile Tips */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-slate-200 flex items-center gap-1.5 text-[11px]">
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>📱 फोन में आवाज न आने पर ३ जरूरी बातें:</span>
          </span>
          <ul className="space-y-1.5 text-[11px] text-slate-400 list-disc list-inside">
            <li><strong className="text-slate-200">मीडिया वॉल्यूम:</strong> फोन का वॉल्यूम बटन दबाकर 'Media Volume' बढ़ाएं।</li>
            <li><strong className="text-slate-200">साइलेंट मोड:</strong> यदि फोन Silent / Vibrate / DND पर है तो रिंगर चालू करें।</li>
            <li><strong className="text-slate-200">पहला टच:</strong> स्क्रीन पर किसी भी बटन को दबाने से ऑडियो सिस्टम एक्टिव हो जाता है।</li>
          </ul>
        </div>

        {/* Close Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              haptics.tap();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all cursor-pointer"
          >
            ✓ सेटिंग्स सुरक्षित करें व बंद करें (Done)
          </button>
        </div>

      </div>
    </div>
  );
};
