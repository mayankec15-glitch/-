import React, { useState, useRef, useEffect } from 'react';
import { LanguageConfig } from '../../data/languageCurriculum';
import { Edit3, Trash2, Volume2, Sparkles, Check, BookOpen, Layers, Lightbulb } from 'lucide-react';
import { playNativePronunciation } from '../../utils/audioPlayer';
import { haptics } from '../../utils/haptics';

interface ScriptStudioViewProps {
  currentLanguage: LanguageConfig;
}

interface ScriptChar {
  char: string;
  nameHindi: string;
  nameEnglish: string;
  phoneticHindi: string;
  phoneticEnglish: string;
  example: string;
  examplePhoneticHindi: string;
  exampleTransHindi: string;
}

const SCRIPT_DATA: Record<string, ScriptChar[]> = {
  'uae-arabic': [
    { char: 'ا', nameHindi: 'अलिफ़', nameEnglish: 'Alif', phoneticHindi: 'आ / अ', phoneticEnglish: 'aa / a', example: 'أَهْلاً', examplePhoneticHindi: 'अहलन', exampleTransHindi: 'नमस्ते / स्वागत' },
    { char: 'ب', nameHindi: 'बा', nameEnglish: 'Baa', phoneticHindi: 'ब', phoneticEnglish: 'b', example: 'بَيْتْ', examplePhoneticHindi: 'बैत', exampleTransHindi: 'कमरा / घर' },
    { char: 'ت', nameHindi: 'ता', nameEnglish: 'Taa', phoneticHindi: 'त', phoneticEnglish: 't', example: 'تَمْرْ', examplePhoneticHindi: 'तम्र', exampleTransHindi: 'खजूर' },
    { char: 'ث', nameHindi: 'सा / था', nameEnglish: 'Thaa', phoneticHindi: 'थ / स', phoneticEnglish: 'th', example: 'ثَوْبْ', examplePhoneticHindi: 'सौब', exampleTransHindi: 'कपड़े / ड्रेस' },
    { char: 'ج', nameHindi: 'जीम', nameEnglish: 'Jeem', phoneticHindi: 'ज / य', phoneticEnglish: 'j / y', example: 'جَمِيلْ', examplePhoneticHindi: 'जमील', exampleTransHindi: 'अच्छा / सुंदर' },
    { char: 'ح', nameHindi: 'बड़ी हा', nameEnglish: 'Haa', phoneticHindi: 'ह (गले से)', phoneticEnglish: 'ḥ (breathy h)', example: 'حَبِيبِي', examplePhoneticHindi: 'हबीबी', exampleTransHindi: 'मेरे प्यारे / दोस्त' },
    { char: 'خ', nameHindi: 'खा', nameEnglish: 'Khaa', phoneticHindi: 'ख़', phoneticEnglish: 'kh', example: 'خَبِيرْ', examplePhoneticHindi: 'खबीर', exampleTransHindi: 'उस्ताद / कारीगर' },
    { char: 'د', nameHindi: 'दाल', nameEnglish: 'Daal', phoneticHindi: 'द', phoneticEnglish: 'd', example: 'دَلَّةْ', examplePhoneticHindi: 'दल्लाह', exampleTransHindi: 'अरबी चायदानी' },
    { char: 'ر', nameHindi: 'रा', nameEnglish: 'Raa', phoneticHindi: 'र', phoneticEnglish: 'r (rolled)', example: 'رَيَّالْ', examplePhoneticHindi: 'रय्याल', exampleTransHindi: 'आदमी / साथी' },
    { char: 'س', nameHindi: 'सीन', nameEnglish: 'Seen', phoneticHindi: 'स', phoneticEnglish: 's', example: 'سَلامْ', examplePhoneticHindi: 'सलाम', exampleTransHindi: 'नमस्ते / शांति' },
    { char: 'ش', nameHindi: 'शीन', nameEnglish: 'Sheen', phoneticHindi: 'श', phoneticEnglish: 'sh', example: 'شُكْراً', examplePhoneticHindi: 'शुकरन', exampleTransHindi: 'धन्यवाद' },
    { char: 'ع', nameHindi: 'ऐन', nameEnglish: '\'Ayn', phoneticHindi: 'अ (गहरा स्वर)', phoneticEnglish: 'ʿ (deep throat)', example: 'عَمَلْ', examplePhoneticHindi: 'अमल', exampleTransHindi: 'काम / ड्यूटी' },
    { char: 'غ', nameHindi: 'गैन', nameEnglish: 'Ghayn', phoneticHindi: 'ग़', phoneticEnglish: 'gh', example: 'غَالِي', examplePhoneticHindi: 'गाली', exampleTransHindi: 'महंगा / कीमती' },
    { char: 'ف', nameHindi: 'फ़ा', nameEnglish: 'Faa', phoneticHindi: 'फ़', phoneticEnglish: 'f', example: 'فِنْجَانْ', examplePhoneticHindi: 'फिन्जान', exampleTransHindi: 'चाय का कप' },
    { char: 'ق', nameHindi: 'क़ाफ़', nameEnglish: 'Qaaf', phoneticHindi: 'क़ / ग', phoneticEnglish: 'q / g', example: 'قَهْوَةْ', examplePhoneticHindi: 'गहवा / कहवा', exampleTransHindi: 'अरबी कॉफी' },
    { char: 'ك', nameHindi: 'काफ़', nameEnglish: 'Kaaf', phoneticHindi: 'क', phoneticEnglish: 'k', example: 'كَرَمْ', examplePhoneticHindi: 'करम', exampleTransHindi: 'उदारता / भलाई' },
    { char: 'ل', nameHindi: 'लाम', nameEnglish: 'Laam', phoneticHindi: 'ल', phoneticEnglish: 'l', example: 'لَوْ سَمَحْتَ', examplePhoneticHindi: 'लौ समाहत', exampleTransHindi: 'कृपया' },
    { char: 'م', nameHindi: 'मीम', nameEnglish: 'Meem', phoneticHindi: 'म', phoneticEnglish: 'm', example: 'مُهَنْدِسْ', examplePhoneticHindi: 'मुहंदिस', exampleTransHindi: 'इंजीनियर' },
    { char: 'ن', nameHindi: 'नून', nameEnglish: 'Noon', phoneticHindi: 'न', phoneticEnglish: 'n', example: 'نَعَمْ', examplePhoneticHindi: 'नअम', exampleTransHindi: 'हाँ / जी हाँ' },
    { char: 'و', nameHindi: 'वाव', nameEnglish: 'Waaw', phoneticHindi: 'व / ऊ', phoneticEnglish: 'w / oo', example: 'وَايِدْ', examplePhoneticHindi: 'वायद', exampleTransHindi: 'बहुत ज्यादा' },
    { char: 'ي', nameHindi: 'या', nameEnglish: 'Yaa', phoneticHindi: 'य / ई', phoneticEnglish: 'y / ee', example: 'يَلَّا', examplePhoneticHindi: 'यल्ला', exampleTransHindi: 'चलो जल्दी' }
  ],
  'japanese': [
    { char: 'あ', nameHindi: 'हिरागाना आ', nameEnglish: 'Hiragana A', phoneticHindi: 'आ', phoneticEnglish: 'a', example: 'ありがとう', examplePhoneticHindi: 'अरीगातोउ', exampleTransHindi: 'धन्यवाद' },
    { char: 'い', nameHindi: 'हिरागाना ई', nameEnglish: 'Hiragana I', phoneticHindi: 'ई', phoneticEnglish: 'i', example: 'いらっしゃい', examplePhoneticHindi: 'इर्राशाइ', exampleTransHindi: 'पधारिए / स्वागत' },
    { char: 'う', nameHindi: 'हिरागाना ऊ', nameEnglish: 'Hiragana U', phoneticHindi: 'ऊ', phoneticEnglish: 'u', example: 'うどん', examplePhoneticHindi: 'उदोन', exampleTransHindi: 'जापानी नूडल्स' },
    { char: 'え', nameHindi: 'हिरागाना ए', nameEnglish: 'Hiragana E', phoneticHindi: 'ए', phoneticEnglish: 'e', example: 'えき (駅)', examplePhoneticHindi: 'एकी', exampleTransHindi: 'रेलवे स्टेशन' },
    { char: 'お', nameHindi: 'हिरागाना ओ', nameEnglish: 'Hiragana O', phoneticHindi: 'ओ', phoneticEnglish: 'o', example: 'お茶 (おちゃ)', examplePhoneticHindi: 'ओचा', exampleTransHindi: 'हरी चाय' },
    { char: 'か', nameHindi: 'हिरागाना का', nameEnglish: 'Hiragana Ka', phoneticHindi: 'का', phoneticEnglish: 'ka', example: '会社 (かいしゃ)', examplePhoneticHindi: 'काइशा', exampleTransHindi: 'कंपनी / फैक्ट्री' },
    { char: 'さ', nameHindi: 'हिरागाना सा', nameEnglish: 'Hiragana Sa', phoneticHindi: 'सा', phoneticEnglish: 'sa', example: '作業 (さぎょう)', examplePhoneticHindi: 'साग्यो', exampleTransHindi: 'कार्य / मजदूरी' },
    { char: 'た', nameHindi: 'हिरागाना ता', nameEnglish: 'Hiragana Ta', phoneticHindi: 'ता', phoneticEnglish: 'ta', example: '食べる (たべる)', examplePhoneticHindi: 'ताबेरू', exampleTransHindi: 'खाना खाना' },
    { char: 'な', nameHindi: 'हिरागाना ना', nameEnglish: 'Hiragana Na', phoneticHindi: 'ना', phoneticEnglish: 'na', example: '名前 (なまえ)', examplePhoneticHindi: 'नामाए', exampleTransHindi: 'नाम' },
    { char: 'は', nameHindi: 'हिरागाना हा', nameEnglish: 'Hiragana Ha', phoneticHindi: 'हा / वा', phoneticEnglish: 'ha / wa', example: 'はい', examplePhoneticHindi: 'हाइ', exampleTransHindi: 'हाँ / जी हाँ' },
    { char: 'ま', nameHindi: 'हिरागाना मा', nameEnglish: 'Hiragana Ma', phoneticHindi: 'मा', phoneticEnglish: 'ma', example: '前 (まえ)', examplePhoneticHindi: 'माए', exampleTransHindi: 'आगे / सामने' },
    { char: '安', nameHindi: 'कांजी: सुरक्षा', nameEnglish: 'Kanji An (Safety)', phoneticHindi: 'आन', phoneticEnglish: 'an', example: '安全 (あんぜん)', examplePhoneticHindi: 'आन्ज़ेन', exampleTransHindi: 'सुरक्षा (Safety)' },
    { char: '水', nameHindi: 'कांजी: पानी', nameEnglish: 'Kanji Mizu (Water)', phoneticHindi: 'मिज़ू', phoneticEnglish: 'mizu / sui', example: '水 (みず)', examplePhoneticHindi: 'मिज़ू', exampleTransHindi: 'पीने का पानी' },
    { char: '車', nameHindi: 'कांजी: गाड़ी', nameEnglish: 'Kanji Kuruma (Car)', phoneticHindi: 'कुरुमा', phoneticEnglish: 'kuruma / sha', example: '電車 (でんしゃ)', examplePhoneticHindi: 'देनशा', exampleTransHindi: 'लोकल ट्रेन' }
  ],
  'german': [
    { char: 'Ä', nameHindi: 'ए-उमलाउट', nameEnglish: 'A-Umlaut (Ä)', phoneticHindi: 'ए / ऐ', phoneticEnglish: 'ae / eh', example: 'Ärzte', examplePhoneticHindi: 'एर्त्स्ते', exampleTransHindi: 'डॉक्टर' },
    { char: 'Ö', nameHindi: 'ओ-उमलाउट', nameEnglish: 'O-Umlaut (Ö)', phoneticHindi: 'ओ (गोल होंठ)', phoneticEnglish: 'oe / er', example: 'Öl', examplePhoneticHindi: 'ओल', exampleTransHindi: 'इंजन का तेल / ऑइल' },
    { char: 'Ü', nameHindi: 'यू-उमलाउट', nameEnglish: 'U-Umlaut (Ü)', phoneticHindi: 'यू / ई', phoneticEnglish: 'ue / rounded ee', example: 'Überstunden', examplePhoneticHindi: 'युबर-श्टुंडन', exampleTransHindi: 'ओवरटाइम (अतिरिक्त काम)' },
    { char: 'ß', nameHindi: 'एस-त्सेत (तीव्र स)', nameEnglish: 'Eszett (Sharp S)', phoneticHindi: 'स्स', phoneticEnglish: 'ss', example: 'Straße', examplePhoneticHindi: 'श्ट्रासे', exampleTransHindi: 'सड़क / रास्ता' },
    { char: 'W', nameHindi: 'वे अक्षर', nameEnglish: 'Letter W', phoneticHindi: 'व', phoneticEnglish: 'v', example: 'Werkzeug', examplePhoneticHindi: 'वेर्कत्ज़ॉयग', exampleTransHindi: 'काम के औजार (Tools)' },
    { char: 'V', nameHindi: 'फाउ अक्षर', nameEnglish: 'Letter V', phoneticHindi: 'फ़', phoneticEnglish: 'f', example: 'Vorsicht', examplePhoneticHindi: 'फोरज़िश्ट', exampleTransHindi: 'सावधानी / खतरा' },
    { char: 'J', nameHindi: 'यॉट अक्षर', nameEnglish: 'Letter J', phoneticHindi: 'य', phoneticEnglish: 'y', example: 'Ja', examplePhoneticHindi: 'या', exampleTransHindi: 'हाँ / जी हाँ' },
    { char: 'Z', nameHindi: 'त्सेत अक्षर', nameEnglish: 'Letter Z', phoneticHindi: 'त्स', phoneticEnglish: 'ts', example: 'Zange', examplePhoneticHindi: 'त्सांगे', exampleTransHindi: 'प्लास (Pliers)' }
  ],
  'english': [
    { char: 'A', nameHindi: 'अक्षर A', nameEnglish: 'Letter A', phoneticHindi: 'ए / ऐ', phoneticEnglish: 'ei / ae', example: 'Assembly Point', examplePhoneticHindi: 'असेंबली पॉइंट', exampleTransHindi: 'इमरजेंसी में मिलने की सुरक्षित जगह' },
    { char: 'E', nameHindi: 'अक्षर E', nameEnglish: 'Letter E', phoneticHindi: 'ई / ए', phoneticEnglish: 'ee / eh', example: 'Emergency Exit', examplePhoneticHindi: 'इमरजेंसी एग्जिट', exampleTransHindi: 'आपातकालीन निकास द्वार' },
    { char: 'H', nameHindi: 'अक्षर H', nameEnglish: 'Letter H', phoneticHindi: 'एच', phoneticEnglish: 'eitch', example: 'Helmet', examplePhoneticHindi: 'हेलमेट', exampleTransHindi: 'सुरक्षा टोपी' },
    { char: 'S', nameHindi: 'अक्षर S', nameEnglish: 'Letter S', phoneticHindi: 'एस', phoneticEnglish: 'ess', example: 'Safety Shoes', examplePhoneticHindi: 'सेफ्टी शूज़', exampleTransHindi: 'सुरक्षा जूते (लोहे की टो वाले)' },
    { char: 'W', nameHindi: 'अक्षर W', nameEnglish: 'Letter W', phoneticHindi: 'डबल-यू', phoneticEnglish: 'double-u', example: 'Warning Sign', examplePhoneticHindi: 'वार्निंग साइन', exampleTransHindi: 'खतरे का बोर्ड' }
  ],
  'french': [
    { char: 'É', nameHindi: 'ए-एक्सेंट', nameEnglish: 'E-accent aigu', phoneticHindi: 'ए', phoneticEnglish: 'ay', example: 'Équipe', examplePhoneticHindi: 'एकीप', exampleTransHindi: 'कामगारों की टीम' },
    { char: 'È', nameHindi: 'ए-ग्रेव', nameEnglish: 'E-accent grave', phoneticHindi: 'ऐ', phoneticEnglish: 'eh', example: 'Très bien', examplePhoneticHindi: 'त्रे ब्यें', exampleTransHindi: 'बहुत अच्छा' },
    { char: 'Ç', nameHindi: 'सी-सेडिल', nameEnglish: 'C-cédille', phoneticHindi: 'स', phoneticEnglish: 's', example: 'Français', examplePhoneticHindi: 'फ्रांसे', exampleTransHindi: 'फ्रेंच भाषा' },
    { char: 'À', nameHindi: 'आ-ग्रेव', nameEnglish: 'A-accent grave', phoneticHindi: 'आ', phoneticEnglish: 'ah', example: 'Voilà', examplePhoneticHindi: 'व्वाला', exampleTransHindi: 'यह लीजिए / हो गया' }
  ],
  'spanish': [
    { char: 'Ñ', nameHindi: 'एन-एने', nameEnglish: 'Eñe', phoneticHindi: 'न्य', phoneticEnglish: 'ny', example: 'Español', examplePhoneticHindi: 'एस्पान्योल', exampleTransHindi: 'स्पेनिश भाषा' },
    { char: 'Á', nameHindi: 'आ-टिल्डे', nameEnglish: 'A con tilde', phoneticHindi: 'आ (जोर देकर)', phoneticEnglish: 'stressed ah', example: 'Fácil', examplePhoneticHindi: 'फासील', exampleTransHindi: 'आसान काम' },
    { char: 'Í', nameHindi: 'ई-टिल्डे', nameEnglish: 'I con tilde', phoneticHindi: 'ई (जोर देकर)', phoneticEnglish: 'stressed ee', example: 'Sí', examplePhoneticHindi: 'सी', exampleTransHindi: 'हाँ / जी हाँ' },
    { char: '¡', nameHindi: 'उल्टा विस्मय चिन्ह', nameEnglish: 'Exclamation', phoneticHindi: 'चेतावनी', phoneticEnglish: '!', example: '¡Cuidado!', examplePhoneticHindi: 'कुइदादो!', exampleTransHindi: 'सावधान!' }
  ],
  'hindi': [
    { char: 'अ', nameHindi: 'छोटा अ', nameEnglish: 'A', phoneticHindi: 'अ', phoneticEnglish: 'a', example: 'अधिकार', examplePhoneticHindi: 'अधिकार', exampleTransHindi: 'श्रमिक अधिकार' },
    { char: 'आ', nameHindi: 'बड़ा आ', nameEnglish: 'Aa', phoneticHindi: 'आ', phoneticEnglish: 'aa', example: 'आप', examplePhoneticHindi: 'आप', exampleTransHindi: 'आदरसूचक संबोधन' },
    { char: 'क', nameHindi: 'क अक्षर', nameEnglish: 'Ka', phoneticHindi: 'क', phoneticEnglish: 'ka', example: 'काम', examplePhoneticHindi: 'काम', exampleTransHindi: 'दैनिक कार्य' },
    { char: 'स', nameHindi: 'स अक्षर', nameEnglish: 'Sa', phoneticHindi: 'स', phoneticEnglish: 'sa', example: 'सुरक्षा', examplePhoneticHindi: 'सुरक्षा', exampleTransHindi: 'साइट सेफ्टी' }
  ]
};

export const ScriptStudioView: React.FC<ScriptStudioViewProps> = ({ currentLanguage }) => {
  const chars = SCRIPT_DATA[currentLanguage.id] || SCRIPT_DATA['uae-arabic'];
  const [selectedChar, setSelectedChar] = useState<ScriptChar>(chars[0]);

  // Sync selected character when language changes
  useEffect(() => {
    const newChars = SCRIPT_DATA[currentLanguage.id] || SCRIPT_DATA['uae-arabic'];
    setSelectedChar(newChars[0]);
  }, [currentLanguage.id]);

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
    ctx.lineWidth = 12;
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
    haptics.tap();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Audio Playback with Android hardening
  const handleSpeak = (text: string, phoneticHint?: string) => {
    playNativePronunciation(text, currentLanguage.id, { 
      rate: 0.85,
      phoneticHint: phoneticHint || selectedChar.examplePhoneticHindi || selectedChar.phoneticHindi
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner in Labour-Friendly Hindi */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Edit3 className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              श्रमवीर अक्षर अभ्यास • वर्णमाला व लिपि स्टूडियो (Script Studio)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            अक्षर एवं वर्णमाला अभ्यास ({currentLanguage.name})
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            अक्षर पर टैप करें, सही उच्चारण सुनें और नीचे डिजिटल स्लेट पर उंगली से लिखने का अभ्यास करें।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Alphabet / Character Grid Left */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>वर्णमाला सूची ({chars.length} अक्षर)</span>
            </h3>
            <span className="text-[11px] text-amber-400 font-mono font-bold">टैप करके चुनें</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5 max-h-[440px] overflow-y-auto pr-1">
            {chars.map((c, idx) => {
              const isSelected = selectedChar.char === c.char;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedChar(c)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md scale-105'
                      : 'bg-slate-950 hover:bg-slate-850 text-slate-200 border-slate-800'
                  }`}
                >
                  <span className="text-2xl font-bold">{c.char}</span>
                  <span className="text-[11px] font-bold mt-1 text-center truncate max-w-full">
                    {c.nameHindi}
                  </span>
                  <span className="text-[10px] opacity-75 font-mono">
                    {c.phoneticHindi}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tracing Canvas Right (डिजिटल स्लेट) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center space-y-5">
          
          <div className="w-full flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-mono font-bold">चुना हुआ अक्षर:</div>
              <div className="text-lg font-bold text-white flex items-center gap-2">
                <span>{selectedChar.nameHindi} ({selectedChar.nameEnglish})</span>
                <span className="text-sm font-mono text-amber-400 font-bold">ध्वनि: "{selectedChar.phoneticHindi}"</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(selectedChar.example)}
                className="px-3 py-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold transition-colors cursor-pointer flex items-center gap-1.5 text-xs shadow-md"
                title="आवाज सुनें"
              >
                <Volume2 className="w-4 h-4" />
                <span>उच्चारण सुनें</span>
              </button>
              <button
                onClick={clearCanvas}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-300 font-medium transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
                title="स्लेट साफ करें"
              >
                <Trash2 className="w-4 h-4" />
                <span>स्लेट मिटाएं</span>
              </button>
            </div>
          </div>

          {/* Interactive Tracing Slate Box with Silhouette */}
          <div className="relative w-full max-w-[340px] h-[320px] bg-slate-950 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center select-none">
            
            {/* Guide Silhouette in Background */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-800/80 font-black text-9xl pointer-events-none select-none">
              {selectedChar.char}
            </div>

            {/* Instruction helper */}
            <div className="absolute top-3 left-3 text-[11px] text-slate-400 pointer-events-none font-mono">
              ✏️ उंगली से अक्षर पर फेरें
            </div>

            {/* Drawing Canvas */}
            <canvas
              ref={canvasRef}
              width={340}
              height={320}
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

          {/* Example Word Box in Hindi */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 w-full max-w-[340px] text-center space-y-1.5">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>काम पर प्रयोग होने वाला शब्द:</span>
            </div>
            <div className="text-xl font-bold text-white" dir={currentLanguage.direction}>
              {selectedChar.example}
            </div>
            <div className="text-xs text-amber-300 font-mono font-bold">
              बोलें: {selectedChar.examplePhoneticHindi}
            </div>
            <div className="text-xs text-emerald-400 font-medium">
              सरल हिन्दी अर्थ: "{selectedChar.exampleTransHindi}"
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>प्रतिदिन 10 मिनट अक्षर फेरने से विदेश में साइनबोर्ड पढ़ना आसान हो जाता है।</span>
          </div>

        </div>

      </div>
    </div>
  );
};
