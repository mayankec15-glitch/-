import React, { useState, useRef, useEffect } from 'react';
import { LanguageConfig } from '../../data/languageCurriculum';
import { Edit3, Trash2, Volume2, Sparkles, Check } from 'lucide-react';
import { playNativePronunciation } from '../../utils/audioPlayer';

interface ScriptStudioViewProps {
  currentLanguage: LanguageConfig;
}

interface ScriptChar {
  char: string;
  name: string;
  phonetic: string;
  example: string;
  exampleTrans: string;
}

const SCRIPT_DATA: Record<string, ScriptChar[]> = {
  'uae-arabic': [
    { char: 'ا', name: 'Alif', phonetic: 'aa / a', example: 'أَهْلاً (Ahlan)', exampleTrans: 'Welcome' },
    { char: 'ب', name: 'Baa', phonetic: 'b', example: 'بَيْتْ (Bayt)', exampleTrans: 'House' },
    { char: 'ت', name: 'Taa', phonetic: 't', example: 'تَمْرْ (Tamr)', exampleTrans: 'Dates' },
    { char: 'ث', name: 'Thaa', phonetic: 'th', example: 'ثَوْبْ (Thawb)', exampleTrans: 'Traditional Garment' },
    { char: 'ج', name: 'Jeem', phonetic: 'j / y', example: 'جَمِيلْ (Jameel)', exampleTrans: 'Beautiful' },
    { char: 'ح', name: 'Haa', phonetic: 'ḥ (breathy h)', example: 'حَبِيبِي (Habeebi)', exampleTrans: 'My beloved/friend' },
    { char: 'خ', name: 'Khaa', phonetic: 'kh', example: 'خَبِيرْ (Khabeer)', exampleTrans: 'Expert' },
    { char: 'د', name: 'Daal', phonetic: 'd', example: 'دَلَّةْ (Dallah)', exampleTrans: 'Arabian Coffee Pot' },
    { char: 'ر', name: 'Raa', phonetic: 'r (rolled)', example: 'رَيَّالْ (Rayyaal)', exampleTrans: 'Man (Emirati)' },
    { char: 'س', name: 'Seen', phonetic: 's', example: 'سَلامْ (Salaam)', exampleTrans: 'Peace' },
    { char: 'ش', name: 'Sheen', phonetic: 'sh', example: 'شْحَالِكْ (Sh-haalik)', exampleTrans: 'How are you?' },
    { char: 'ع', name: '\'Ayn', phonetic: 'ʿ (deep guttural)', example: 'عَرَبِي (Arabi)', exampleTrans: 'Arabic' },
    { char: 'غ', name: 'Ghayn', phonetic: 'gh (French r)', example: 'غَالِي (Ghaali)', exampleTrans: 'Precious/Dear' },
    { char: 'ف', name: 'Faa', phonetic: 'f', example: 'فِنْيَانْ (Finjaan)', exampleTrans: 'Coffee cup' },
    { char: 'ق', name: 'Qaaf', phonetic: 'q / g', example: 'قَهْوَةْ (Gahwa)', exampleTrans: 'Coffee (Gulf)' },
    { char: 'ك', name: 'Kaaf', phonetic: 'k / ch', example: 'كَرَمْ (Karam)', exampleTrans: 'Generosity' },
    { char: 'م', name: 'Meem', phonetic: 'm', example: 'مَجْلِسْ (Majlis)', exampleTrans: 'Council / Gathering' },
    { char: 'و', name: 'Waaw', phonetic: 'w / oo', example: 'وَايِدْ (Wayed)', exampleTrans: 'Very / A lot' },
    { char: 'ي', name: 'Yaa', phonetic: 'y / ee', example: 'يَالله (Yallah)', exampleTrans: 'Let\'s go!' }
  ],
  'japanese': [
    { char: 'あ', name: 'Hiragana A', phonetic: 'a', example: 'ありがとう (Arigatou)', exampleTrans: 'Thank you' },
    { char: 'い', name: 'Hiragana I', phonetic: 'i', example: 'いらっしゃい (Irasshai)', exampleTrans: 'Welcome' },
    { char: 'う', name: 'Hiragana U', phonetic: 'u', example: 'うどん (Udon)', exampleTrans: 'Udon noodles' },
    { char: 'え', name: 'Hiragana E', phonetic: 'e', example: 'えき (Eki)', exampleTrans: 'Train station' },
    { char: 'お', name: 'Hiragana O', phonetic: 'o', example: 'お茶 (Ocha)', exampleTrans: 'Green tea' },
    { char: 'か', name: 'Hiragana Ka', phonetic: 'ka', example: '乾杯 (Kanpai)', exampleTrans: 'Cheers!' },
    { char: 'さ', name: 'Hiragana Sa', phonetic: 'sa', example: '桜 (Sakura)', exampleTrans: 'Cherry blossom' },
    { char: 'た', name: 'Hiragana Ta', phonetic: 'ta', example: '食べる (Taberu)', exampleTrans: 'To eat' },
    { char: 'な', name: 'Hiragana Na', phonetic: 'na', example: '夏 (Natsu)', exampleTrans: 'Summer' },
    { char: 'は', name: 'Hiragana Ha', phonetic: 'ha / wa', example: '花火 (Hanabi)', exampleTrans: 'Fireworks' },
    { char: 'ま', name: 'Hiragana Ma', phonetic: 'ma', example: '前 (Mae)', exampleTrans: 'In front' },
    { char: '和', name: 'Kanji Wa', phonetic: 'wa', example: '平和 (Heiwa)', exampleTrans: 'Harmony / Peace' },
    { char: '心', name: 'Kanji Kokoro', phonetic: 'kokoro', example: '真心 (Magokoro)', exampleTrans: 'Sincere Heart' }
  ],
  'hindi': [
    { char: 'अ', name: 'A', phonetic: 'a', example: 'अतिथि (Atithi)', exampleTrans: 'Guest' },
    { char: 'आ', name: 'Aa', phonetic: 'aa', example: 'आप (Aap)', exampleTrans: 'You (Respected)' },
    { char: 'इ', name: 'I', phonetic: 'i', example: 'इच्छा (Ichha)', exampleTrans: 'Wish' },
    { char: 'क', name: 'Ka', phonetic: 'ka', example: 'कृपा (Kripa)', exampleTrans: 'Grace' },
    { char: 'ख', name: 'Kha', phonetic: 'kha', example: 'खाना (Khaana)', exampleTrans: 'Food' },
    { char: 'ग', name: 'Ga', phonetic: 'ga', example: 'ज्ञान (Gyaan)', exampleTrans: 'Knowledge' },
    { char: 'न', name: 'Na', phonetic: 'na', example: 'नमस्ते (Namaste)', exampleTrans: 'Greeting' },
    { char: 'प', name: 'Pa', phonetic: 'pa', example: 'प्रेम (Prem)', exampleTrans: 'Love' },
    { char: 'श', name: 'Sha', phonetic: 'sha', example: 'शांति (Shaanti)', exampleTrans: 'Peace' }
  ]
};

export const ScriptStudioView: React.FC<ScriptStudioViewProps> = ({ currentLanguage }) => {
  const chars = SCRIPT_DATA[currentLanguage.id] || SCRIPT_DATA['uae-arabic'];
  const [selectedChar, setSelectedChar] = useState<ScriptChar>(chars[0]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [selectedChar]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Audio Playback
  const handleSpeak = (text: string) => {
    playNativePronunciation(text, currentLanguage.id, { rate: 0.85 });
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Edit3 className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Script & Calligraphy Canvas
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {currentLanguage.scriptName} Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Practice stroke orders, phonetics, and handwriting for {currentLanguage.name}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Alphabet / Character Grid Left */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Alphabet & Glyphs ({chars.length})
            </h3>
            <span className="text-xs text-amber-400 font-mono">Select to Trace</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
            {chars.map((c, idx) => {
              const isSelected = selectedChar.char === c.char;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedChar(c)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
                      : 'bg-slate-950 hover:bg-slate-850 text-slate-200 border-slate-800'
                  }`}
                >
                  <span className="text-2xl font-bold">{c.char}</span>
                  <span className="text-[10px] opacity-80 font-mono mt-1">{c.phonetic}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tracing Canvas Right */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center space-y-5">
          
          <div className="w-full flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono">Target Character:</div>
              <div className="text-lg font-bold text-white flex items-center gap-2">
                <span>{selectedChar.name}</span>
                <span className="text-sm font-mono text-amber-400">({selectedChar.phonetic})</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(selectedChar.example)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors cursor-pointer"
                title="Hear audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={clearCanvas}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-300 transition-colors cursor-pointer"
                title="Clear Canvas"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Tracing Canvas Box with Background Silhouette */}
          <div className="relative w-full max-w-[340px] h-[340px] bg-slate-950 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center select-none">
            
            {/* Guide Silhouette */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-850/60 font-black text-9xl pointer-events-none select-none">
              {selectedChar.char}
            </div>

            {/* Drawing Canvas */}
            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            />
          </div>

          {/* Example Word */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 w-full max-w-[340px] text-center space-y-1">
            <div className="text-xs text-slate-400">Example in context:</div>
            <div className="text-base font-bold text-amber-400" dir={currentLanguage.direction}>
              {selectedChar.example}
            </div>
            <div className="text-xs text-slate-300 font-medium">
              "{selectedChar.exampleTrans}"
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
