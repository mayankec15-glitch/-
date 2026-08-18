/**
 * Robust Multi-tier Native Audio Pronunciation Service
 * Handles Arabic (Emirati/Gulf/Standard), German, Japanese, French, Spanish, English, Hindi
 * 
 * Features:
 * - Direct high-clarity server-side audio stream (/api/tts)
 * - Intelligent Web Speech API with voice detection & text sanitization
 * - Removes Latin transliteration in brackets, slashes, and ellipsis so Arabic TTS doesn't stumble
 * - Chrome iframe speech engine unstick & auto-resume
 */

let activeAudioElement: HTMLAudioElement | null = null;

export interface AudioPlayOptions {
  rate?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

/**
 * Sanitizes phrase text for natural text-to-speech pronunciation
 */
export function cleanTextForSpeech(text: string, languageId: string): string {
  if (!text) return '';

  let cleaned = text;

  // 1. Remove Latin transliterations inside parentheses e.g. "(Shlonak)", "(Tamam)", "(Hajimemashite)"
  cleaned = cleaned.replace(/\([A-Za-z0-9\s/.,'-]+\)/g, '');
  cleaned = cleaned.replace(/\[[A-Za-z0-9\s/.,'-]+\]/g, '');

  // 2. Handle slashes (multiple variations e.g. "مَرْحَبًا / السَّلَامُ عَلَيْكُمْ")
  // For Arabic, replace '/' with Arabic comma '، ' for a natural breath pause
  if (languageId === 'uae-arabic' || languageId.startsWith('ar')) {
    cleaned = cleaned.replace(/\s*\/\s*/g, '، ');
  } else {
    cleaned = cleaned.replace(/\s*\/\s*/g, ', ');
  }

  // 3. Remove ellipsis and trailing punctuation artifacts
  cleaned = cleaned.replace(/\.{2,}/g, '');
  cleaned = cleaned.replace(/[؟?]+/g, '؟');

  return cleaned.trim();
}

/**
 * Maps language ID to BCP-47 language tag
 */
export function getLanguageBCP47(languageId: string): string {
  switch (languageId) {
    case 'uae-arabic':
    case 'arabic':
      return 'ar-SA'; // ar-SA has the widest support across devices & voices
    case 'german':
      return 'de-DE';
    case 'japanese':
      return 'ja-JP';
    case 'french':
      return 'fr-FR';
    case 'spanish':
      return 'es-ES';
    case 'hindi':
      return 'hi-IN';
    case 'english':
    default:
      return 'en-US';
  }
}

/**
 * Stop any currently playing audio (HTML5 or SpeechSynthesis)
 */
export function stopNativeAudio(): void {
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
      activeAudioElement.src = '';
    } catch (e) {
      // Ignore
    }
    activeAudioElement = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // Ignore
    }
  }
}

/**
 * Plays crystal clear native pronunciation for any language
 * Uses high-fidelity server TTS stream with instant Web Speech fallback
 */
export async function playNativePronunciation(
  text: string,
  languageId: string,
  options: AudioPlayOptions = {}
): Promise<void> {
  const { rate = 0.9, onStart, onEnd, onError } = options;
  const cleanText = cleanTextForSpeech(text, languageId);

  if (!cleanText) {
    onEnd?.();
    return;
  }

  stopNativeAudio();

  // Try Server-Side TTS stream first (Crystal-clear native Arabic / German / Japanese / French audio)
  const langQuery = languageId === 'uae-arabic' ? 'ar' : languageId;
  const ttsUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&lang=${encodeURIComponent(langQuery)}`;

  try {
    const audio = new Audio(ttsUrl);
    activeAudioElement = audio;
    audio.playbackRate = Math.min(Math.max(rate, 0.7), 1.2);

    audio.onplay = () => {
      onStart?.();
    };

    audio.onended = () => {
      activeAudioElement = null;
      onEnd?.();
    };

    audio.onerror = () => {
      // If server stream has an issue, seamlessly fallback to Web Speech API
      playViaWebSpeech(cleanText, languageId, options);
    };

    await audio.play();
    return;
  } catch (err) {
    // If autoplay was blocked or audio creation failed, fallback to Web Speech
    playViaWebSpeech(cleanText, languageId, options);
  }
}

/**
 * Web Speech API fallback with intelligent voice detection
 */
function playViaWebSpeech(
  cleanText: string,
  languageId: string,
  options: AudioPlayOptions = {}
): void {
  const { rate = 0.9, onStart, onEnd, onError } = options;

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError?.(new Error('Speech synthesis not supported on this device'));
    return;
  }

  try {
    window.speechSynthesis.cancel();
    
    // Resume in case browser speech engine was suspended (Chrome iframe bug)
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const bcp47 = getLanguageBCP47(languageId);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = bcp47;
    utterance.rate = rate;

    // Find best matching voice
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const targetPrefix = languageId === 'uae-arabic' || languageId.startsWith('ar') ? 'ar' : bcp47.split('-')[0].toLowerCase();
      
      const matchedVoice = voices.find(v => 
        v.lang.toLowerCase().startsWith(targetPrefix) || 
        v.lang.toLowerCase().replace('_', '-').startsWith(targetPrefix) ||
        (targetPrefix === 'ar' && (v.name.toLowerCase().includes('arabic') || v.name.includes('العربية')))
      );

      if (matchedVoice) {
        utterance.voice = matchedVoice;
        utterance.lang = matchedVoice.lang;
      }
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      onError?.(e);
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    onError?.(e);
    onEnd?.();
  }
}
