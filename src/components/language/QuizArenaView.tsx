import React, { useState, useEffect } from 'react';
import { LanguageConfig } from '../../data/languageCurriculum';
import { Award, CheckCircle, XCircle, Sparkles, RefreshCw, Volume2, ArrowRight, Flame, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playNativePronunciation } from '../../utils/audioPlayer';
import { haptics } from '../../utils/haptics';

interface QuizArenaViewProps {
  currentLanguage: LanguageConfig;
}

interface QuizQuestion {
  id: string;
  typeHindi: string;
  questionHindi: string;
  promptTargetText?: string;
  phoneticHindi?: string;
  options: string[];
  correctAnswer: string;
  explanationHindi: string;
}

function getDefaultQuestionsForLang(langId: string): QuizQuestion[] {
  if (langId === 'uae-arabic') {
    return [
      {
        id: 'q1',
        typeHindi: '🦺 साइट सुरक्षा व सावधानी',
        questionHindi: 'गल्फ में कंस्ट्रक्शन साइट पर अगर सुपरवाइज़र जोर से कहे "دِيرْ بَالِكْ" (दीर बालिक), तो इसका क्या अर्थ है?',
        promptTargetText: 'دِيرْ بَالِكْ',
        phoneticHindi: 'दीर बालिक',
        options: [
          'सावधान रहो / संभल कर (खतरा है)!',
          'जल्दी से इधर आओ',
          'काम बंद करके खाना खाओ',
          'क्रेन का इंजन चालू करो'
        ],
        correctAnswer: 'सावधान रहो / संभल कर (खतरा है)!',
        explanationHindi: '"दीर बालिक" (دير بالك) गल्फ देशों में सुरक्षा की सबसे महत्वपूर्ण चेतावनी है, जिसका अर्थ है "सावधान रहो / आगे खतरा हो सकता है"।'
      },
      {
        id: 'q2',
        typeHindi: '🤝 शिष्टाचार व अभिवादन',
        questionHindi: 'गल्फ में जब कोई आपसे "السَّلامُ عَلَيْكُمْ" (अस-सलामु अलैकुम) कहे, तो सही जवाब क्या होना चाहिए?',
        promptTargetText: 'السَّلامُ عَلَيْكُمْ',
        phoneticHindi: 'अस-सलामु अलैकुम',
        options: [
          'وَعَلَيْكُمُ السَّلام (व अलैकुम अस-सलाम)',
          'شُكْراً (शुकरन)',
          'مَعَ السَّلامَة (माअ अस-सलामा)',
          'لا أَعْرِفْ (ला आरिफ)'
        ],
        correctAnswer: 'وَعَلَيْكُمُ السَّلام (व अलैकुम अस-सलाम)',
        explanationHindi: '"अस-सलामु अलैकुम" (आप पर शांति हो) का पारंपरिक और आदरणीय उत्तर हमेशा "व अलैकुम अस-सलाम" (आप पर भी शांति हो) होता है।'
      },
      {
        id: 'q3',
        typeHindi: '📜 पासपोर्ट व लेबर कानून',
        questionHindi: 'गल्फ देशों के लेबर कानून के अनुसार आपका ओरिजिनल पासपोर्ट किसके पास सुरक्षित रहना चाहिए?',
        options: [
          'स्वयं श्रमिक (कामगार) के अपने पास',
          'कंपनी के मैनेजर के लॉकर में',
          'रूममेट के पास',
          'लोकल टैक्सी ड्राइवर के पास'
        ],
        correctAnswer: 'स्वयं श्रमिक (कामगार) के अपने पास',
        explanationHindi: 'गल्फ देशों (UAE, सऊदी अरब आदि) के श्रम कानून के तहत पासपोर्ट कामगार की निजी संपत्ति है और इसे जबरन जब्त करना गैरकानूनी है।'
      },
      {
        id: 'q4',
        typeHindi: '🛠️ फोरमैन व काम का आदेश',
        questionHindi: 'जब आपका फोरमैन आपसे कहे "جِيبْ الإِسْمَنْتْ وَالْمِطْرَقَة" (जीब अल-इसमंत वल-मित्रका), तो वह क्या लाने को कह रहा है?',
        promptTargetText: 'جِيبْ الإِسْمَنْتْ وَالْمِطْرَقَة',
        phoneticHindi: 'जीब अल-इसमंत वल-मित्रका',
        options: [
          'सीमेंट और हथौड़ा लाओ',
          'पानी और चाय लाओ',
          'गाड़ी की चाबी लाओ',
          'सेफ्टी बेल्ट लाओ'
        ],
        correctAnswer: 'सीमेंट और हथौड़ा लाओ',
        explanationHindi: '"जीब" (جيب) = लाओ/पकड़ाओ, "इसमंत" (إسمنت) = सीमेंट, और "मित्रका" (مطرقة) = हथौड़ा।'
      },
      {
        id: 'q5',
        typeHindi: '🏥 मेडिकल व इमरजेंसी',
        questionHindi: 'अगर साइट पर किसी साथी को चोट लग जाए और आपको एम्बुलेंस बुलानी हो, तो क्या कहेंगे?',
        promptTargetText: 'اتَّصِلْ بِالإِسْعَافِ فَوْراً',
        phoneticHindi: 'इत्तसिल बिल-इसआफ फौरन',
        options: [
          'اتَّصِلْ بِالإِسْعَافِ فَوْراً (तुरंत एम्बुलेंस बुलाओ)',
          'أُرِيدُ النَّوْمَ (मुझे सोना है)',
          'الْجَوُّ حَارٌّ (मौसम गर्म है)',
          'كَمِ السِّعْرُ؟ (कितनी कीमत है?)'
        ],
        correctAnswer: 'اتَّصِلْ بِالإِسْعَافِ فَوْراً (तुरंत एम्बुलेंस बुलाओ)',
        explanationHindi: '"अल-इसआफ" (الإسعاف) का अर्थ एम्बुलेंस / प्राथमिक चिकित्सा है। "इत्तसिल" = फोन लगाओ।'
      }
    ];
  } else if (langId === 'japanese') {
    return [
      {
        id: 'q1',
        typeHindi: '👋 सुबह का अभिवादन',
        questionHindi: 'जापान में सुबह कार्यस्थल या फैक्ट्री पहुंचते ही सभी को झुककर क्या अभिवादन बोलना चाहिए?',
        promptTargetText: 'おはようございます',
        phoneticHindi: 'ओहायो गोज़ाइमास',
        options: [
          'おはようございます (Ohayou gozaimasu - शुभ प्रभात)',
          'さようなら (Sayounara - अलविदा)',
          '乾杯 (Kanpai - चीयर्स)',
          'おやすみなさい (Oyasuminasai - शुभ रात्रि)'
        ],
        correctAnswer: 'おはようございます (Ohayou gozaimasu - शुभ प्रभात)',
        explanationHindi: '"ओहायो गोज़ाइमास" जापानी कार्यस्थलों का सबसे जरूरी सुबह का अभिवादन है।'
      },
      {
        id: 'q2',
        typeHindi: '🧹 5S कार्यस्थल नियम',
        questionHindi: 'जापानी फैक्ट्रियों में "5S" नियम में "Seiri" (सेइरी) और "Seiton" (सेइतोन) का क्या अर्थ है?',
        promptTargetText: '整理・整頓 (せいり・せいとん)',
        phoneticHindi: 'सेइरी • सेइतोन',
        options: [
          'बेकार सामान की छंटाई करना और औजारों को सही जगह व्यवस्थित रखना',
          'काम छोड़कर आराम करना',
          'सिर्फ पानी पीना',
          'गाना सुनना'
        ],
        correctAnswer: 'बेकार सामान की छंटाई करना और औजारों को सही जगह व्यवस्थित रखना',
        explanationHindi: 'Seiri (छंटाई) और Seiton (सुव्यवस्था) 5S के पहले दो नियम हैं जिससे कार्यस्थल पर दुर्घटनाएं नहीं होतीं।'
      },
      {
        id: 'q3',
        typeHindi: '🏢 शिफ्ट समाप्ति शिष्टाचार',
        questionHindi: 'शाम को काम खत्म होने पर सभी सहकर्मियों से विदा लेते समय कौन-सा आदरणीय वाक्य बोला जाता है?',
        promptTargetText: 'お疲れ様でした',
        phoneticHindi: 'ओत्सुकारेसामा देशिता',
        options: [
          'お疲れ様でした (Otsukaresama deshita - कठिन परिश्रम के लिए धन्यवाद)',
          'いただきます (Itadakimasu - भोजन शुरू करना)',
          'ごちそうさまでした (Gochisousama deshita - भोजन समाप्ति)',
          'ごめんなさい (Gomennasai - क्षमा करें)'
        ],
        correctAnswer: 'お疲れ様でした (Otsukaresama deshita - कठिन परिश्रम के लिए धन्यवाद)',
        explanationHindi: '"ओत्सुकारेसामा देशिता" काम खत्म होने पर सभी के परिश्रम का सम्मान करने के लिए बोला जाता है।'
      },
      {
        id: 'q4',
        typeHindi: '🚨 भूकंप व आपदा सुरक्षा',
        questionHindi: 'जापान में भूकंप का सायरन (J-Alert) बजने पर सबसे पहला कदम क्या होना चाहिए?',
        options: [
          'घबराएं नहीं, तुरंत मजबूत मेज के नीचे जाकर सिर और गर्दन को बचाएं',
          'दौड़कर खिड़की से बाहर कूदें',
          'तुरंत लिफ्ट में घुस जाएं',
          'चुपचाप वीडियो रिकॉर्ड करने लगें'
        ],
        correctAnswer: 'घबराएं नहीं, तुरंत मजबूत मेज के नीचे जाकर सिर और गर्दन को बचाएं',
        explanationHindi: 'जापान में भूकंप के समय सिर की सुरक्षा सबसे पहली प्राथमिकता होती है। लिफ्ट का इस्तेमाल कभी न करें।'
      }
    ];
  } else if (langId === 'german') {
    return [
      {
        id: 'q1',
        typeHindi: '🦺 साइट सुरक्षा उपकरण',
        questionHindi: 'जर्मनी में वर्कशॉप या साइट पर "PSA" (Persönliche Schutzausrüstung) का क्या अर्थ है?',
        promptTargetText: 'Persönliche Schutzausrüstung (PSA)',
        phoneticHindi: 'पेर्ज़ोनलिशे शुत्स-आउस्रुस्टुंग',
        options: [
          'व्यक्तिगत सुरक्षा उपकरण (हेलमेट, जूते, चश्मा, दस्ताने)',
          'महीने का वेतन पत्र',
          'दोपहर के खाने का समय',
          'कंपनी का पहचान पत्र'
        ],
        correctAnswer: 'व्यक्तिगत सुरक्षा उपकरण (हेलमेट, जूते, चश्मा, दस्ताने)',
        explanationHindi: 'जर्मन श्रम नियमों के अनुसार PSA (पर्सनल प्रोटेक्टिव इक्विपमेंट) के बिना काम करना सख्त वर्जित है।'
      },
      {
        id: 'q2',
        typeHindi: '👔 कार्यस्थल शिष्टाचार',
        questionHindi: 'जर्मनी में अपने सुपरवाइज़र या बॉस को किस प्रकार आदरपूर्वक संबोधित करना चाहिए?',
        options: [
          'Herr / Frau [सरनेम] के साथ "Sie" (आप) कहकर',
          'सीधे पहले नाम से बिना आदर के',
          'हे दोस्त (Hey Du) कहकर',
          'कोई अभिवादन न करके'
        ],
        correctAnswer: 'Herr / Frau [सरनेम] के साथ "Sie" (आप) कहकर',
        explanationHindi: 'जर्मन वर्कशॉप में औपचारिक शिष्टाचार के लिए "Herr Müller" या "Frau Schmidt" और आदरसूचक "Sie" का प्रयोग होता है।'
      },
      {
        id: 'q3',
        typeHindi: '⚠️ कार्यशाला चेतावनी',
        questionHindi: 'जर्मन मशीन पर अगर "Vorsicht! Hochspannung" लिखा हो, तो इसका क्या अर्थ है?',
        promptTargetText: 'Vorsicht! Hochspannung',
        phoneticHindi: 'फोरज़िश्ट! होखशपानूंग',
        options: [
          'सावधान! हाई वोल्टेज बिजली का करंट है',
          'यहाँ पानी पीने की जगह है',
          'मशीन की गति तेज करें',
          'औजार यहाँ रखें'
        ],
        correctAnswer: 'सावधान! हाई वोल्टेज बिजली का करंट है',
        explanationHindi: '"Vorsicht" = सावधान और "Hochspannung" = हाई वोल्टेज बिजली।'
      }
    ];
  } else if (langId === 'french') {
    return [
      {
        id: 'q1',
        typeHindi: '👋 शिष्टाचार व अभिवादन',
        questionHindi: 'फ्रांस में किसी भी साइट या केबिन में प्रवेश करते ही सबसे पहले क्या बोलना अनिवार्य है?',
        promptTargetText: 'Bonjour Monsieur / Madame',
        phoneticHindi: 'बोंजूर मस्यु / मादाम',
        options: [
          'Bonjour (शुभ प्रभात / नमस्ते)',
          'Combien ça coûte ? (कितने का है?)',
          'Vite vite (जल्दी करो)',
          'Au revoir (अलविदा)'
        ],
        correctAnswer: 'Bonjour (शुभ प्रभात / नमस्ते)',
        explanationHindi: 'फ्रांस में बातचीत शुरू करने से पहले "Bonjour" बोलना बुनियादी शिष्टाचार है।'
      },
      {
        id: 'q2',
        typeHindi: '🦺 साइट सुरक्षा',
        questionHindi: 'फ्रांसीसी निर्माण स्थल पर "Casque de sécurité" का क्या अर्थ है?',
        promptTargetText: 'Casque de sécurité',
        phoneticHindi: 'कास्क द सेक्यूरीते',
        options: [
          'सेफ्टी हेलमेट',
          'पानी की बोतल',
          'ड्राइविंग लाइसेंस',
          'हवाई जहाज का टिकट'
        ],
        correctAnswer: 'सेफ्टी हेलमेट',
        explanationHindi: '"Casque" = हेलमेट और "sécurité" = सुरक्षा।'
      }
    ];
  } else if (langId === 'spanish') {
    return [
      {
        id: 'q1',
        typeHindi: '👋 सुबह का अभिवादन',
        questionHindi: 'स्पैनिश वर्कशॉप में सुबह काम पर आने पर नमस्ते के लिए क्या बोलते हैं?',
        promptTargetText: '¡Buenos días!',
        phoneticHindi: 'ब्वेनोस दिआस!',
        options: [
          '¡Buenos días! (शुभ प्रभात / नमस्ते)',
          '¡Buenas noches! (शुभ रात्रि)',
          'Hasta luego (फिर मिलेंगे)',
          'Adiós (अलविदा)'
        ],
        correctAnswer: '¡Buenos días! (शुभ प्रभात / नमस्ते)',
        explanationHindi: '"¡Buenos días!" स्पेनिश में सुबह का मानक और आदरणीय अभिवादन है।'
      },
      {
        id: 'q2',
        typeHindi: '⚠️ सुरक्षा चेतावनी',
        questionHindi: 'स्पेन में काम के दौरान साथी अगर चिल्लाए "¡Cuidado!" तो इसका क्या मतलब है?',
        promptTargetText: '¡Cuidado!',
        phoneticHindi: 'कुइदादो!',
        options: [
          'सावधान रहो / खतरा है!',
          'जल्दी काम खत्म करो!',
          'चाय पीने चलो!',
          'झाड़ू लगाओ!'
        ],
        correctAnswer: 'सावधान रहो / खतरा है!',
        explanationHindi: '"¡Cuidado!" का अर्थ है "सावधान / संभल कर"।'
      }
    ];
  } else {
    return [
      {
        id: 'q1',
        typeHindi: '🦺 साइट सेफ्टी गियर (PPE)',
        questionHindi: 'इंटरनेशनल साइट्स पर "PPE" का पूरा नाम क्या होता है?',
        promptTargetText: 'Personal Protective Equipment',
        phoneticHindi: 'पर्सनल प्रोटेक्टिव इक्विपमेंट',
        options: [
          'Personal Protective Equipment (व्यक्तिगत सुरक्षा उपकरण)',
          'Public Project Engine',
          'Petrol Pump Entry',
          'Private Phone Email'
        ],
        correctAnswer: 'Personal Protective Equipment (व्यक्तिगत सुरक्षा उपकरण)',
        explanationHindi: 'PPE में हेलमेट, सेफ्टी जूते, चश्मा, रिफ्लेक्टर जैकेट और दस्ताने शामिल होते हैं।'
      },
      {
        id: 'q2',
        typeHindi: '🛑 स्टॉप वर्क अथॉरिटी',
        questionHindi: 'अगर अंतरराष्ट्रीय साइट पर मचान कमजोर हो या बिजली का तार खुला हो, तो आपको क्या करने का कानूनी अधिकार है?',
        options: [
          'Stop Work Authority का प्रयोग करके तुरंत काम रोकें और सुपरवाइज़र को बताएं',
          'चुपचाप खतरे में काम करते रहें',
          'भागकर घर चले जाएं',
          'बिना बताए तार छू लें'
        ],
        correctAnswer: 'Stop Work Authority का प्रयोग करके तुरंत काम रोकें और सुपरवाइज़र को बताएं',
        explanationHindi: 'अंतरराष्ट्रीय HSE नियमों के तहत हर कामगार को जानलेवा खतरे की स्थिति में काम तुरंत रोकने का अधिकार है।'
      }
    ];
  }
}

export const QuizArenaView: React.FC<QuizArenaViewProps> = ({ currentLanguage }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => getDefaultQuestionsForLang(currentLanguage.id));
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Sync questions when language changes
  useEffect(() => {
    setQuestions(getDefaultQuestionsForLang(currentLanguage.id));
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  }, [currentLanguage.id]);

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
      haptics.success();
    } else {
      haptics.warning();
    }

    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: option
    });
    setShowExplanation(true);

    if (isCorrect) {
      try {
        confetti({
          particleCount: 45,
          spread: 65,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentIdx + 1 < questions.length) {
      haptics.tap();
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
      haptics.milestone();
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  // Generate dynamic quiz from Gemini API in simple Hindi
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
          topic: 'Workplace Safety, Trade Vocabulary & Labor Laws',
          count: 5
        })
      });

      const json = await res.json();
      if (json.success && json.data?.questions && json.data.questions.length > 0) {
        const mappedQuestions: QuizQuestion[] = json.data.questions.map((q: any, idx: number) => ({
          id: `gen-q-${idx}`,
          typeHindi: q.typeHindi || '✨ AI अभ्यास सवाल',
          questionHindi: q.questionHindi || q.question,
          promptTargetText: q.promptTargetText,
          phoneticHindi: q.phoneticHindi || q.phonetic,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanationHindi: q.explanationHindi || q.explanation
        }));
        setQuestions(mappedQuestions);
      }
    } catch (err) {
      console.error('Quiz generator error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Top Banner in Labour-Friendly Hindi */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              श्रमवीर ज्ञान व भाषा परख • सवाल-जवाब टेस्ट (Quiz Arena)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            सवाल-जवाब टेस्ट ({currentLanguage.name})
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            साइट सुरक्षा, कानूनी अधिकार और बातचीत के 4 विकल्पों वाले आसान सवालों से अपनी तैयारी जांचें।
          </p>
        </div>

        <button
          onClick={handleGenerateNewQuiz}
          disabled={isGenerating}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 shrink-0"
        >
          {isGenerating ? <Sparkles className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          <span>{isGenerating ? 'टेस्ट बन रहा है...' : 'नया AI टेस्ट लोड करें'}</span>
        </button>
      </div>

      {/* Quiz Card */}
      {!isFinished && activeQ ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Progress Bar & Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
              <span className="font-bold text-slate-200">सवाल {currentIdx + 1} / {questions.length}</span>
              <span className="text-amber-400 font-bold">स्कोर: {score} अंक</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {activeQ.typeHindi}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {activeQ.questionHindi}
            </h3>

            {activeQ.promptTargetText && (
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xl font-bold text-amber-400" dir={currentLanguage.direction}>
                    {activeQ.promptTargetText}
                  </div>
                  {activeQ.phoneticHindi && (
                    <div className="text-xs text-amber-300/90 font-mono font-bold mt-0.5">
                      उच्चारण: {activeQ.phoneticHindi}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleSpeak(activeQ.promptTargetText || '')}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors shrink-0 cursor-pointer flex items-center gap-1 text-xs"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>सुनें</span>
                </button>
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {activeQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentIdx] === option;
              const isAnswered = selectedAnswers[currentIdx] !== undefined;
              const isCorrect = option === activeQ.correctAnswer;

              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-amber-500/60 hover:bg-slate-850';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-100 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-100';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-850 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0 text-amber-400">
                      {idx + 1}
                    </span>
                    <span>{option}</span>
                  </div>
                  {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box in simple Hindi */}
          {showExplanation && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>सही उत्तर और विस्तृत व्याख्या:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeQ.explanationHindi}
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
                <span>{currentIdx + 1 < questions.length ? 'अगला सवाल (Next)' : 'परिणाम देखें (Finish)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Complete Results Card in Hindi */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-black text-white">
            🎉 टेस्ट सफलतापूर्वक पूरा हुआ!
          </h3>

          <div className="text-4xl font-mono font-black text-amber-400">
            {score} / {questions.length} सही उत्तर
          </div>

          <p className="text-xs sm:text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
            {score === questions.length
              ? 'शानदार प्रदर्शन! आपने भाषा, सुरक्षा नियमों और शिष्टाचार के सभी सवालों का सही उत्तर दिया है। आप विदेश जाने के लिए पूरी तरह तैयार हैं!'
              : 'बहुत अच्छा प्रयास! गलत हुए सवालों की व्याख्या ध्यान से पढ़ें और शब्दावली बैंक में जाकर उन शब्दों को दोबारा दोहराएं।'}
          </p>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={handleGenerateNewQuiz}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-md shadow-amber-500/20 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>फिर से नया टेस्ट दें</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
