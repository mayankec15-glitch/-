export interface TradeCategory {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  icon: string;
  descriptionHindi: string;
  color: string;
}

export const TRADE_CATEGORIES: TradeCategory[] = [
  {
    id: 'greetings',
    nameHindi: 'सामान्य अभिवादन व रोजमर्रा शिष्टाचार',
    nameEnglish: 'Daily Greetings & Courtesies',
    icon: 'MessageSquare',
    descriptionHindi: 'नमस्ते, सुबह/शाम का सलाम, धन्यवाद, हालचाल, क्षमा, हाँ/ना व विदाई',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'construction',
    nameHindi: 'निर्माण व सिविल कार्य',
    nameEnglish: 'Construction & Site Safety',
    icon: 'HardHat',
    descriptionHindi: 'साइट सुरक्षा, मचान, औजार, माप व निर्माण संबंधी जरूरी शब्द',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'healthcare',
    nameHindi: 'देखभाल व स्वास्थ्य सेवाएं',
    nameEnglish: 'Elderly Care & Caregiving',
    icon: 'HeartPulse',
    descriptionHindi: 'बुजुर्गों की देखभाल, दवाइयां, अस्पताल व प्राथमिक सहायता',
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 'hospitality',
    nameHindi: 'होटल, खानपान व रसोई',
    nameEnglish: 'Hospitality & Kitchen',
    icon: 'UtensilsCrossed',
    descriptionHindi: 'रेस्तरां आर्डर, खाना पकाना, टेबल सर्विस व साफ-सफाई',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'driving',
    nameHindi: 'ड्राइविंग व लॉजिस्टिक्स',
    nameEnglish: 'Driving, Transport & Warehouse',
    icon: 'Truck',
    descriptionHindi: 'रास्ते के निर्देश, लोडिंग-अनलोडिंग, वेयरहाउस व ट्रैफिक',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'electrical_plumbing',
    nameHindi: 'इलेक्ट्रीशियन व प्लंबिंग',
    nameEnglish: 'Electrical & Plumbing',
    icon: 'Wrench',
    descriptionHindi: 'वायरिंग, पाइप फिटिंग, टूल्स, लीकेज व मरम्मत कार्य',
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'factory',
    nameHindi: 'फैक्ट्री, वेल्डिंग व मशीन',
    nameEnglish: 'Factory & Manufacturing',
    icon: 'Factory',
    descriptionHindi: 'मशीन ऑपरेशन्स, शिफ्ट, क्वालिटी चेक व सेफ्टी रूल्स',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'workplace_salary',
    nameHindi: 'वेतन, बैंक व कार्यस्थल',
    nameEnglish: 'Salary, Bank & Survival',
    icon: 'Coins',
    descriptionHindi: 'तनख्वाह, ओवरटाइम, छुट्टी, बैंक खाता व सुपरवाइजर बातचीत',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'emergency',
    nameHindi: 'आपातकाल व दूतावास मदद',
    nameEnglish: 'Emergency & Embassy Aid',
    icon: 'ShieldAlert',
    descriptionHindi: 'पुलिस, एम्बुलेंस, दुर्घटना, आग व भारतीय दूतावास हेल्पलाइन',
    color: 'from-red-600 to-rose-700'
  }
];

export interface VocabLanguageDetail {
  word: string;
  phoneticHindi: string;
  phoneticLatin?: string;
  exampleSentence: string;
  examplePhoneticHindi: string;
  exampleSentenceHindi: string;
}

export interface MigrantVocabItem {
  id: string;
  tradeId: string;
  hindiTerm: string;
  englishTerm: string;
  importance: 'critical' | 'high' | 'medium';
  tags: string[];
  translations: {
    'uae-arabic': VocabLanguageDetail;
    'german': VocabLanguageDetail;
    'japanese': VocabLanguageDetail;
    'english': VocabLanguageDetail;
    'hebrew'?: VocabLanguageDetail;
    'french': VocabLanguageDetail;
    'spanish': VocabLanguageDetail;
  };
}

export const MIGRANT_VOCABULARY_150: MigrantVocabItem[] = [
  // -------------------------------------------------------------
  // TRADE 0: DAILY GREETINGS & COURTESIES (15 items)
  // -------------------------------------------------------------
  {
    id: 'g1',
    tradeId: 'greetings',
    hindiTerm: 'नमस्ते / सलाम / हेलो',
    englishTerm: 'Hello / Greetings / Salam',
    importance: 'critical',
    tags: ['greeting', 'daily', 'welcome', 'respect'],
    translations: {
      'uae-arabic': {
        word: 'مَرْحَبًا / السَّلَامُ عَلَيْكُمْ',
        phoneticHindi: 'मरहबा / अस-सलामु अलैकुम',
        exampleSentence: 'السَّلَامُ عَلَيْكُمْ، أَنَا عَامِلٌ جَدِيدٌ هُنَا',
        examplePhoneticHindi: 'अस-सलामु अलैकुम, अना आमिलुन जदीदुन हुना',
        exampleSentenceHindi: 'नमस्ते / सलाम, मैं यहाँ नया कर्मचारी हूँ।'
      },
      'german': {
        word: 'Hallo / Guten Tag',
        phoneticHindi: 'हालो / गूटेन टाग',
        exampleSentence: 'Guten Tag! Ich freue mich, hier im Team zu arbeiten.',
        examplePhoneticHindi: 'गूटेन टाग! इष फ़्रॉय मिश, हीयर इम टीम त्सू आरबाइटन।',
        exampleSentenceHindi: 'नमस्ते! मुझे यहाँ टीम में काम करके बहुत खुशी है।'
      },
      'japanese': {
        word: 'こんにちは (Konnichiwa)',
        phoneticHindi: 'कोन्निचिवा',
        exampleSentence: 'こんにちは！よろしくお願いします。',
        examplePhoneticHindi: 'कोन्निचिवा! योरोशिकु ओनेगाइशिमासु।',
        exampleSentenceHindi: 'नमस्ते! कृपया मेरा मार्गदर्शन करें और सहयोग दें।'
      },
      'english': {
        word: 'Hello / Greetings',
        phoneticHindi: 'हेलो / ग्रीटिंग्स',
        exampleSentence: 'Hello! Glad to join the workplace team.',
        examplePhoneticHindi: 'हेलो! ग्लैड टू जॉइन द वर्कप्लेस टीम।',
        exampleSentenceHindi: 'नमस्ते! कार्यस्थल टीम से जुड़कर बहुत खुशी हुई।'
      },
      'french': {
        word: 'Bonjour / Salut',
        phoneticHindi: 'बोंजूर / सालू',
        exampleSentence: 'Bonjour Monsieur, ravi de commencer le travail.',
        examplePhoneticHindi: 'बोंजूर मोस्यो, रवी द कोमोंसे ल त्रावाय।',
        exampleSentenceHindi: 'नमस्ते सर, काम शुरू करके बहुत खुशी हुई।'
      },
      'spanish': {
        word: '¡Hola! / Buenos días',
        phoneticHindi: 'ओला / बुएनोस दीआस',
        exampleSentence: '¡Hola! Mucho gusto en conocer a todo el equipo.',
        examplePhoneticHindi: 'ओला! मूचो गुस्तो एन कोनोसेर आ तोदो एल एकीपो।',
        exampleSentenceHindi: 'नमस्ते! पूरी टीम से मिलकर बहुत खुशी हुई।'
      }
    }
  },
  {
    id: 'g2',
    tradeId: 'greetings',
    hindiTerm: 'शुभ प्रभात / सुबह का सलाम',
    englishTerm: 'Good Morning',
    importance: 'critical',
    tags: ['morning', 'greeting', 'shift-start'],
    translations: {
      'uae-arabic': {
        word: 'صَبَاح الخَيْر',
        phoneticHindi: 'सबाहुल ख़ैर (उत्तर: सबाहुन नूर)',
        exampleSentence: 'صَبَاح الخَيْر يَا مُعَلِّمْ، أَنَا جَاهِزٌ لِلْعَمَلِ',
        examplePhoneticHindi: 'सबाहुल ख़ैर या मुअल्लिम, अना जाहिज़ुन लिल-अमल',
        exampleSentenceHindi: 'शुभ प्रभात उस्ताद जी, मैं काम के लिए पूरी तरह तैयार हूँ।'
      },
      'german': {
        word: 'Guten Morgen',
        phoneticHindi: 'गूटेन मोर्गेन',
        exampleSentence: 'Guten Morgen Meister, alle Werkzeuge sind vorbereitet.',
        examplePhoneticHindi: 'गूटेन मोर्गेन माइस्टर, आले वेर्कत्ज़ॉइगे ज़िंड फ़ोरबेराइटेट।',
        exampleSentenceHindi: 'शुभ प्रभात मास्टर जी, सभी औजार तैयार कर लिए गए हैं।'
      },
      'japanese': {
        word: 'おはようございます (Ohayou gozaimasu)',
        phoneticHindi: 'ओहायोउ गोज़ाइमासु',
        exampleSentence: 'おはようございます！今日も一日ご安全に。',
        examplePhoneticHindi: 'ओहायोउ गोज़ाइमासु! क्योउ मो इचिनिचि गो-आंजेन नी।',
        exampleSentenceHindi: 'शुभ प्रभात! आज भी पूरे दिन सुरक्षित कार्य करेंगे।'
      },
      'english': {
        word: 'Good Morning',
        phoneticHindi: 'गुड मॉर्निंग',
        exampleSentence: 'Good morning Sir, ready for the morning safety briefing.',
        examplePhoneticHindi: 'गुड मॉर्निंग सर, रेडी फॉर द मॉर्निंग सेफ़्टी ब्रीफ़िंग।',
        exampleSentenceHindi: 'शुभ प्रभात सर, सुबह की सुरक्षा ब्रीफिंग के लिए तैयार हैं।'
      },
      'french': {
        word: 'Bonjour (le matin)',
        phoneticHindi: 'बोंजूर',
        exampleSentence: 'Bonjour, commençons la journée de travail en toute sécurité.',
        examplePhoneticHindi: 'बोंजूर, कोमोंसों ला जूर्ने द त्रावाय ऑँ तूत सेक्युरिते।',
        exampleSentenceHindi: 'शुभ प्रभात, आइए पूरी सुरक्षा के साथ दिन का काम शुरू करें।'
      },
      'spanish': {
        word: 'Buenos días',
        phoneticHindi: 'बुएनोस दीआस',
        exampleSentence: 'Buenos días a todos, listos para iniciar las labores.',
        examplePhoneticHindi: 'बुएनोस दीआस आ तोदोस, लिस्तोश पारा इनिसियार लास लाबोरेस।',
        exampleSentenceHindi: 'सभी को शुभ प्रभात, काम शुरू करने के लिए तैयार हैं।'
      }
    }
  },
  {
    id: 'g3',
    tradeId: 'greetings',
    hindiTerm: 'शुभ संध्या / शाम का सलाम',
    englishTerm: 'Good Evening',
    importance: 'high',
    tags: ['evening', 'greeting', 'shift-end'],
    translations: {
      'uae-arabic': {
        word: 'مَسَاء الخَيْر',
        phoneticHindi: 'मसाउल ख़ैर (उत्तर: मसाउन नूर)',
        exampleSentence: 'مَسَاء الخَيْر، اِنْتَهَيْنَا مِنَ الشُّغْلِ بِسَلَامَة',
        examplePhoneticHindi: 'मसाउल ख़ैर, इन्तहैना मिनश-शुग़्ल बि-सलामा',
        exampleSentenceHindi: 'शुभ संध्या, हमने कुशलतापूर्वक आज का कार्य समाप्त कर लिया है।'
      },
      'german': {
        word: 'Guten Abend',
        phoneticHindi: 'गूटेन आबेंड',
        exampleSentence: 'Guten Abend, die Schichtarbeit ist für heute abgeschlossen.',
        examplePhoneticHindi: 'गूटेन आबेंड, दी शिफ्ट-आरबाइट इस्ट फ्यूर हॉइटे अबगेश्लोसेन।',
        exampleSentenceHindi: 'शुभ संध्या, आज का शिफ्ट कार्य पूरा हो चुका है।'
      },
      'japanese': {
        word: 'こんばんは (Konbanwa)',
        phoneticHindi: 'कोन्बानवा',
        exampleSentence: 'こんばんは、本日の作業お疲れ様でした。',
        examplePhoneticHindi: 'कोन्बानवा, होन्जित्सु नो साग्योउ ओत्सुकारेसामा देशिता।',
        exampleSentenceHindi: 'शुभ संध्या, आज के काम की मेहनत के लिए आप सभी का धन्यवाद।'
      },
      'english': {
        word: 'Good Evening',
        phoneticHindi: 'गुड इवनिंग',
        exampleSentence: 'Good evening everyone, shift handover is successfully done.',
        examplePhoneticHindi: 'गुड इवनिंग एवरीवन, शिफ्ट हैंडओवर इज़ सक्सेसफुली डन।',
        exampleSentenceHindi: 'शुभ संध्या सभी को, शिफ्ट हैंडओवर सफलतापूर्वक पूरा हो गया है।'
      },
      'french': {
        word: 'Bonsoir',
        phoneticHindi: 'बोंसवार',
        exampleSentence: 'Bonsoir à l’équipe, très bon repos après le chantier.',
        examplePhoneticHindi: 'बोंसवार आ लेकीप, त्रे बों रपो आप्रे ल शांतिये।',
        exampleSentenceHindi: 'पूरी टीम को शुभ संध्या, काम के बाद अच्छा आराम करें।'
      },
      'spanish': {
        word: 'Buenas tardes / Buenas noches',
        phoneticHindi: 'बुएनास तार्देस',
        exampleSentence: 'Buenas tardes, dejamos todo el equipo ordenado.',
        examplePhoneticHindi: 'बुएनास तार्देस, देखाफ़ोस तोदो एल एकीपो ओर्देनादो।',
        exampleSentenceHindi: 'शुभ संध्या, हमने सभी औजार व्यवस्थित रख दिए हैं।'
      }
    }
  },
  {
    id: 'g4',
    tradeId: 'greetings',
    hindiTerm: 'शुभ रात्रि',
    englishTerm: 'Good Night',
    importance: 'medium',
    tags: ['night', 'sleep', 'camp'],
    translations: {
      'uae-arabic': {
        word: 'تُصْبِح عَلَى خَيْر',
        phoneticHindi: 'तुसबेह अला ख़ैर (उत्तर: व अंता मिन अहलिह)',
        exampleSentence: 'تُصْبِح عَلَى خَيْر يَا صَاحِبِي، نَلْتَقِي فِي الصَّبَاح',
        examplePhoneticHindi: 'तुसबेह अला ख़ैर या साहिबी, नल्तकी फ़िस-सबाह',
        exampleSentenceHindi: 'शुभ रात्रि मेरे भाई, कल सुबह मिलते हैं।'
      },
      'german': {
        word: 'Gute Nacht',
        phoneticHindi: 'गूटे नाख़्त',
        exampleSentence: 'Gute Nacht, erholen Sie sich gut für morgen.',
        examplePhoneticHindi: 'गूटे नाख़्त, एरहोलेन ज़ी ज़िश गूट फ्यूर मोर्गेन।',
        exampleSentenceHindi: 'शुभ रात्रि, कल के लिए अच्छी तरह विश्राम करें।'
      },
      'japanese': {
        word: 'おやすみなさい (Oyasuminasai)',
        phoneticHindi: 'ओयासुमिनासाई',
        exampleSentence: 'おやすみなさい、明日も元気に出勤しましょう。',
        examplePhoneticHindi: 'ओयासुमिनासाई, आशिता मो गेंकि नी शुक्किन शिमाशोउ।',
        exampleSentenceHindi: 'शुभ रात्रि, कल भी स्फूर्ति के साथ काम पर चलेंगे।'
      },
      'english': {
        word: 'Good Night',
        phoneticHindi: 'गुड नाइट',
        exampleSentence: 'Good night, have a restful sleep before tomorrow’s shift.',
        examplePhoneticHindi: 'गुड नाइट, हैव अ रेस्टफुल स्लीप बिफ़ोर टुमॉरोज़ शिफ्ट।',
        exampleSentenceHindi: 'शुभ रात्रि, कल की शिफ्ट से पहले अच्छी नींद लें।'
      },
      'french': {
        word: 'Bonne nuit',
        phoneticHindi: 'बॉन न्वी',
        exampleSentence: 'Bonne nuit à tous, à demain matin au chantier.',
        examplePhoneticHindi: 'बॉन न्वी आ तूस, आ दमाँ मातान ओ शांतिये।',
        exampleSentenceHindi: 'सभी को शुभ रात्रि, कल सुबह साइट पर मिलते हैं।'
      },
      'spanish': {
        word: 'Buenas noches',
        phoneticHindi: 'बुएनास नोचेस',
        exampleSentence: 'Buenas noches, que descanse bien.',
        examplePhoneticHindi: 'बुएनास नोचेस, के देस्कानसे बिएन।',
        exampleSentenceHindi: 'शुभ रात्रि, आपका विश्राम सुखद रहे।'
      }
    }
  },
  {
    id: 'g5',
    tradeId: 'greetings',
    hindiTerm: 'आप कैसे हैं? / क्या हाल है?',
    englishTerm: 'How are you?',
    importance: 'critical',
    tags: ['question', 'wellbeing', 'polite'],
    translations: {
      'uae-arabic': {
        word: 'كَيْفَ الحَال؟ / شْلُونَك؟',
        phoneticHindi: 'कैफ़ अल-हाल? / श्लोनक?',
        exampleSentence: 'كَيْفَ حَالُكَ اليَوْم يَا مُهَنْدِس؟',
        examplePhoneticHindi: 'कैफ़ हालुक अल-यौम या मुहंदिस?',
        exampleSentenceHindi: 'इंजीनियर साहब, आज आप कैसे हैं?'
      },
      'german': {
        word: 'Wie geht es Ihnen? / Wie geht\'s?',
        phoneticHindi: 'वी गेट एस ईह्नेन? / वी गेट्स?',
        exampleSentence: 'Wie geht es Ihnen heute bei der Arbeit?',
        examplePhoneticHindi: 'वी गेट एस ईह्नेन हॉइटे बाई डेर आरबाइट?',
        exampleSentenceHindi: 'आज काम पर आपका क्या हाल है?'
      },
      'japanese': {
        word: 'お元気ですか？ (Ogenki desu ka?)',
        phoneticHindi: 'ओगेंकि देसु का?',
        exampleSentence: '体調はいかがですか？お元気ですか？',
        examplePhoneticHindi: 'ताइच्योउ वा इकागा देसु का? ओगेंकि देसु का?',
        exampleSentenceHindi: 'आपकी तबियत कैसी है? आप स्वस्थ हैं?'
      },
      'english': {
        word: 'How are you? / How is it going?',
        phoneticHindi: 'हाउ आर यू? / हाउ इज़ इट गोइंग?',
        exampleSentence: 'How are you doing today, Foreman?',
        examplePhoneticHindi: 'हाउ आर यू डूइंग टुडे, फोरमैन?',
        exampleSentenceHindi: 'फोरमैन साहब, आज आप कैसे हैं?'
      },
      'french': {
        word: 'Comment allez-vous ? / Ça va ?',
        phoneticHindi: 'कोमाँ ताले-वू? / सा वा?',
        exampleSentence: 'Comment allez-vous ce matin, Chef ?',
        examplePhoneticHindi: 'कोमाँ ताले-वू स मातान, शेफ़?',
        exampleSentenceHindi: 'चीफ साहब, आज सुबह आप कैसे हैं?'
      },
      'spanish': {
        word: '¿Cómo está usted? / ¿Qué tal?',
        phoneticHindi: 'कोमो एस्ता उस्तेद? / के ताल?',
        exampleSentence: '¿Cómo está usted hoy, Supervisor?',
        examplePhoneticHindi: 'कोमो एस्ता उस्तेद ओय, सुपरविसोर?',
        exampleSentenceHindi: 'सुपरवाइज़र साहब, आज आप कैसे हैं?'
      }
    }
  },
  {
    id: 'g6',
    tradeId: 'greetings',
    hindiTerm: 'मैं ठीक हूँ, धन्यवाद',
    englishTerm: 'I am fine, thank you',
    importance: 'critical',
    tags: ['reply', 'wellbeing', 'polite'],
    translations: {
      'uae-arabic': {
        word: 'أَنَا بِخَيْر، الحَمْدُ لله',
        phoneticHindi: 'अना बिख़ैर, अलहम्दुलिल्लाह',
        exampleSentence: 'أَنَا بِخَيْر وَصِحَّتِي تَمَامْ، الحَمْدُ لله، شُكْرًا',
        examplePhoneticHindi: 'अना बिख़ैर व सेहती तमाम, अलहम्दुलिल्लाह, शुक्रन',
        exampleSentenceHindi: 'मैं ठीक हूँ और मेरी सेहत बिल्कुल ठीक है, ईश्वर का धन्यवाद, शुक्रिया।'
      },
      'german': {
        word: 'Mir geht es gut, danke!',
        phoneticHindi: 'मीर गेट एस गूट, डांके!',
        exampleSentence: 'Danke, mir geht es sehr gut und ich bin einsatzbereit.',
        examplePhoneticHindi: 'डांके, मीर गेट एस ज़ेयर गूट उंड इष बिन आइनज़ात्सबराइट।',
        exampleSentenceHindi: 'धन्यवाद, मैं बहुत अच्छा हूँ और कार्य हेतु पूरी तरह तैयार हूँ।'
      },
      'japanese': {
        word: '元気です、ありがとうございます (Genki desu)',
        phoneticHindi: 'गेंकि देसु, आरिगातोउ गोज़ाइमासु',
        exampleSentence: 'はい、とても元気です！ありがとうございます。',
        examplePhoneticHindi: 'हाई, तोतेमो गेंकि देसु! आरिगातोउ गोज़ाइमासु।',
        exampleSentenceHindi: 'हाँ, मैं पूरी तरह स्वस्थ हूँ! आपका बहुत धन्यवाद।'
      },
      'english': {
        word: 'I am fine, thank you!',
        phoneticHindi: 'आई एम फ़ाइन, थैंक यू!',
        exampleSentence: 'I am doing fine and ready for the shift, thank you!',
        examplePhoneticHindi: 'आई एम डूइंग फ़ाइन एंड रेडी फॉर द शिफ्ट, थैंक यू!',
        exampleSentenceHindi: 'मैं बिल्कुल ठीक हूँ और शिफ्ट के लिए तैयार हूँ, धन्यवाद!'
      },
      'french': {
        word: 'Je vais bien, merci !',
        phoneticHindi: 'झ वे बियाँ, मेर्सी!',
        exampleSentence: 'Je vais très bien, merci beaucoup de demander.',
        examplePhoneticHindi: 'झ वे त्रे बियाँ, मेर्सी बोकू द दमांदे।',
        exampleSentenceHindi: 'मैं बहुत ठीक हूँ, हालचाल पूछने के लिए बहुत धन्यवाद।'
      },
      'spanish': {
        word: 'Estoy bien, gracias',
        phoneticHindi: 'एस्तोय बिएन, ग्रासियास',
        exampleSentence: 'Estoy muy bien, gracias por preguntar.',
        examplePhoneticHindi: 'एस्तोय मुय बिएन, ग्रासियास पोर प्रेगुंतार।',
        exampleSentenceHindi: 'मैं बहुत अच्छा हूँ, पूछने के लिए धन्यवाद।'
      }
    }
  },
  {
    id: 'g7',
    tradeId: 'greetings',
    hindiTerm: 'धन्यवाद / बहुत शुक्रिया',
    englishTerm: 'Thank you very much',
    importance: 'critical',
    tags: ['gratitude', 'polite', 'respect'],
    translations: {
      'uae-arabic': {
        word: 'شُكْرًا جَزِيلًا / مَشْكُور',
        phoneticHindi: 'शुकरन जज़ीलन / मशकूर',
        exampleSentence: 'شُكْرًا جَزِيلًا عَلَى مُسَاعَدَتِكَ يَا أَخِي',
        examplePhoneticHindi: 'शुकरन जज़ीलन अला मुसाअदतिक या अख़ी',
        exampleSentenceHindi: 'भाई, आपकी अमूल्य मदद के लिए बहुत-बहुत धन्यवाद।'
      },
      'german': {
        word: 'Vielen Dank / Danke schön',
        phoneticHindi: 'फ़ॉइलन डांक / डांके शोन',
        exampleSentence: 'Vielen Dank für Ihre freundliche Unterstützung!',
        examplePhoneticHindi: 'फ़ॉइलन डांक फ्यूर ईहरे फ्रॉयंडलिशे उंटरश्ट्यूट्त्सुंग!',
        exampleSentenceHindi: 'आपकी विनम्र सहायता के लिए बहुत-बहुत धन्यवाद!'
      },
      'japanese': {
        word: 'ありがとうございます (Arigatou gozaimasu)',
        phoneticHindi: 'आरिगातोउ गोज़ाइमासु',
        exampleSentence: '丁寧に教えていただき、本当にありがとうございます。',
        examplePhoneticHindi: 'तेइनेइ नी ओशिएते इतादाकि, होन्तोउ नी आरिगातोउ गोज़ाइमासु।',
        exampleSentenceHindi: 'बारीकी से सिखाने और समझाने के लिए दिल से बहुत धन्यवाद।'
      },
      'english': {
        word: 'Thank you very much',
        phoneticHindi: 'थैंक यू वेरी मच',
        exampleSentence: 'Thank you very much for your guidance and support.',
        examplePhoneticHindi: 'थैंक यू वेरी मच फॉर योर गाइडेंस एंड सपोर्ट।',
        exampleSentenceHindi: 'आपके मार्गदर्शन और सहयोग के लिए बहुत-बहुत धन्यवाद।'
      },
      'french': {
        word: 'Merci beaucoup',
        phoneticHindi: 'मेर्सी बोकू',
        exampleSentence: 'Merci beaucoup pour votre aide sur le chantier.',
        examplePhoneticHindi: 'मेर्सी बोकू पूर वोत्र ऐद सुर ल शांतिये।',
        exampleSentenceHindi: 'साइट पर आपकी सहायता के लिए बहुत-बहुत धन्यवाद।'
      },
      'spanish': {
        word: 'Muchas gracias',
        phoneticHindi: 'मूचास ग्रासियास',
        exampleSentence: 'Muchas gracias por su apoyo y explicación.',
        examplePhoneticHindi: 'मूचास ग्रासियास पोर सू अपोयो ई एक्सप्लिकासिओन।',
        exampleSentenceHindi: 'आपके सहयोग और समझाने के लिए बहुत-बहुत धन्यवाद।'
      }
    }
  },
  {
    id: 'g8',
    tradeId: 'greetings',
    hindiTerm: 'कृपया',
    englishTerm: 'Please',
    importance: 'critical',
    tags: ['polite', 'request'],
    translations: {
      'uae-arabic': {
        word: 'مِنْ فَضْلِك / لَوْ سَمَحْت',
        phoneticHindi: 'मिन फ़दलिक / लौ समहत',
        exampleSentence: 'سَاعِدْنِي فِي رَفْعِ هَذَا الصُّنْدُوقِ مِنْ فَضْلِك',
        examplePhoneticHindi: 'साअदनी फ़ी रफ़े हाज़स-सुन्दूक़ मिन फ़दलिक',
        exampleSentenceHindi: 'कृपया इस बक्से को उठाने में मेरी मदद कीजिए।'
      },
      'german': {
        word: 'Bitte / Bitte sehr',
        phoneticHindi: 'बिटे / बिटे ज़ेयर',
        exampleSentence: 'Geben Sie mir bitte den neuen Bauplan.',
        examplePhoneticHindi: 'गेबेन ज़ी मीर बिटे डेन नॉयन बाउप्लान।',
        exampleSentenceHindi: 'कृपया मुझे नया निर्माण प्लान (ड्राइंग) दे दीजिए।'
      },
      'japanese': {
        word: 'お願いします / どうぞ (Onegaishimasu)',
        phoneticHindi: 'ओनेगाइ शिमासु / दोउज़ो',
        exampleSentence: '安全確認をお願いします。',
        examplePhoneticHindi: 'आंजेन काकुनिन ओ ओनेगाइ शिमासु।',
        exampleSentenceHindi: 'कृपया सुरक्षा की जांच कर लीजिए।'
      },
      'english': {
        word: 'Please / Kindly',
        phoneticHindi: 'प्लीज़ / काइंडली',
        exampleSentence: 'Please show me where the safety tools are stored.',
        examplePhoneticHindi: 'प्लीज़ शो मी वेयर द सेफ़्टी टूल्स आर स्टोर्ड।',
        exampleSentenceHindi: 'कृपया मुझे बताएं कि सुरक्षा उपकरण कहाँ रखे हैं।'
      },
      'french': {
        word: 'S\'il vous plaît',
        phoneticHindi: 'सिल वू प्ले',
        exampleSentence: 'Passez-moi le marteau, s\'il vous plaît.',
        examplePhoneticHindi: 'पासे-मुआ ल मार्तो, सिल वू प्ले।',
        exampleSentenceHindi: 'कृपया मुझे हथौड़ा पकड़ा दीजिए।'
      },
      'spanish': {
        word: 'Por favor',
        phoneticHindi: 'पोर फावोर',
        exampleSentence: 'Alcánceme la llave inglesa, por favor.',
        examplePhoneticHindi: 'अल्कांसमे ला यावे इंग्लेसा, पोर फावोर।',
        exampleSentenceHindi: 'कृपया मुझे पाना (रिंच) पकड़ा दीजिए।'
      }
    }
  },
  {
    id: 'g9',
    tradeId: 'greetings',
    hindiTerm: 'माफ़ कीजिये / क्षमा करें',
    englishTerm: 'Excuse me / Sorry',
    importance: 'critical',
    tags: ['apology', 'polite', 'attention'],
    translations: {
      'uae-arabic': {
        word: 'آسِف / عَفْوًا / سَامَحْنِي',
        phoneticHindi: 'आसिफ़ / अफ़वन / सामहनी',
        exampleSentence: 'آسِف يَا مُدِير، لَمْ أَسْمَعْ تَعْلِيمَاتِكَ جَيِّدًا',
        examplePhoneticHindi: 'आसिफ़ या मुदीर, लम अस्माअ ताअलिमातिक जय्यिदन',
        exampleSentenceHindi: 'माफ़ कीजिये मैनेजर साहब, मैं आपके निर्देश ठीक से सुन नहीं पाया।'
      },
      'german': {
        word: 'Entschuldigung / Verzeihung',
        phoneticHindi: 'एंटशुल्डिगुंग',
        exampleSentence: 'Entschuldigung, darf ich eine kurze Frage stellen?',
        examplePhoneticHindi: 'एंटशुल्डिगुंग, डार्फ़ इष आइने कुर्तसे फ़्रागे श्टेलेन? ',
        exampleSentenceHindi: 'माफ़ कीजिये, क्या मैं एक छोटा सा प्रश्न पूछ सकता हूँ?'
      },
      'japanese': {
        word: 'すみません / ごめんなさい (Sumimasen)',
        phoneticHindi: 'सुमिमासेन / गोमेन्नासाई',
        exampleSentence: 'すみません、もう一度説明していただけますか？',
        examplePhoneticHindi: 'सुमिमासेन, मोउ इचिदो सेत्सुमेइ शिते इतादाकेमासु का?',
        exampleSentenceHindi: 'माफ़ कीजिये, क्या आप एक बार पुनः समझा सकते हैं?'
      },
      'english': {
        word: 'Excuse me / Sorry',
        phoneticHindi: 'एक्सक्यूज़ मी / सॉरी',
        exampleSentence: 'Excuse me Sir, could you please repeat the safety instruction?',
        examplePhoneticHindi: 'एक्सक्यूज़ मी सर, कुड यू प्लीज़ रिपीट द सेफ़्टी इंस्ट्रक्शन?',
        exampleSentenceHindi: 'माफ़ कीजिये सर, क्या आप सुरक्षा निर्देश दोबारा दोहरा सकते हैं?'
      },
      'french': {
        word: 'Excusez-moi / Pardon',
        phoneticHindi: 'एक्सक्यूज़े-मुआ / पार्दों',
        exampleSentence: 'Pardon, où se trouve le point de rassemblement ?',
        examplePhoneticHindi: 'पार्दों, ऊ स त्रूवे ल प्वां द रासोम्बलमाँ?',
        exampleSentenceHindi: 'माफ़ कीजिये, आपातकालीन असेंबली पॉइंट कहाँ है?'
      },
      'spanish': {
        word: 'Disculpe / Perdón',
        phoneticHindi: 'दिस्कुलपे / पेर्दोन',
        exampleSentence: 'Disculpe, ¿dónde está el botiquín de primeros auxilios?',
        examplePhoneticHindi: 'दिस्कुलपे, दोंदे एस्ता एल बोतिकीन दे प्रिमेरोस औक्सीलिओस?',
        exampleSentenceHindi: 'माफ़ कीजिये, प्राथमिक चिकित्सा बॉक्स (First Aid) कहाँ है?'
      }
    }
  },
  {
    id: 'g10',
    tradeId: 'greetings',
    hindiTerm: 'आपका स्वागत है / कोई बात नहीं',
    englishTerm: 'You are welcome / No problem',
    importance: 'high',
    tags: ['polite', 'reply'],
    translations: {
      'uae-arabic': {
        word: 'أَهْلًا وَسَهْلًا / عَفْوًا',
        phoneticHindi: 'अहलन व सहलन / अफ़वन',
        exampleSentence: 'عَفْوًا يَا صَاحِبِي، أَنَا فِي خِدْمَتِكَ دَايْمًا',
        examplePhoneticHindi: 'अफ़वन या साहिबी, अना फ़ी ख़िदमतिक दायमन',
        exampleSentenceHindi: 'कोई बात नहीं मेरे भाई, मैं हमेशा मदद के लिए तैयार हूँ।'
      },
      'german': {
        word: 'Gern geschehen / Bitte sehr',
        phoneticHindi: 'गेर्न गेशेन / बिटे ज़ेयर',
        exampleSentence: 'Gern geschehen! Bei Fragen helfe ich Ihnen immer gerne.',
        examplePhoneticHindi: 'गेर्न गेशेन! बाई फ़्रागेन हेल्फे इष ईह्नेन इम्मर गेर्ने।',
        exampleSentenceHindi: 'कोई बात नहीं! किसी भी सवाल पर मैं हमेशा खुशी से मदद करूँगा।'
      },
      'japanese': {
        word: 'どういたしまして (Douitashimashite)',
        phoneticHindi: 'दोउइताशिमाशिते',
        exampleSentence: 'どういたしまして、お役に立てて良かったです。',
        examplePhoneticHindi: 'दोउइताशिमाशिते, ओयाकुनी तातेते योकात्ता देसु।',
        exampleSentenceHindi: 'कोई बात नहीं, आपके काम आ सका यह अच्छी बात है।'
      },
      'english': {
        word: 'You are welcome / No problem',
        phoneticHindi: 'यू आर वेलकम / नो प्रॉब्लम',
        exampleSentence: 'You are welcome, happy to collaborate with the team!',
        examplePhoneticHindi: 'यू आर वेलकम, हैप्पी टू कोलैबोरेट विद द टीम!',
        exampleSentenceHindi: 'आपका स्वागत है, टीम के साथ काम करके खुशी हुई!'
      },
      'french': {
        word: 'De rien / Je vous en prie',
        phoneticHindi: 'द रियाँ / झ वूजों प्री',
        exampleSentence: 'De rien, c\'est un plaisir d\'aider un collègue.',
        examplePhoneticHindi: 'द रियाँ, सेत अन प्लेज़ीर देदे अन कोलेग।',
        exampleSentenceHindi: 'कोई बात नहीं, साथी की मदद करना खुशी की बात है।'
      },
      'spanish': {
        word: 'De nada / Con gusto',
        phoneticHindi: 'दे नादा / कौन गुस्तो',
        exampleSentence: 'De nada, siempre a la orden para colaborar.',
        examplePhoneticHindi: 'दे नादा, सिएम्प्रे आ ला ओर्देन पारा कोलाबोरा।',
        exampleSentenceHindi: 'कोई बात नहीं, सहयोग के लिए हमेशा तत्पर हूँ।'
      }
    }
  },
  {
    id: 'g11',
    tradeId: 'greetings',
    hindiTerm: 'अलविदा / फिर मिलेंगे',
    englishTerm: 'Goodbye / See you again',
    importance: 'critical',
    tags: ['farewell', 'departure', 'polite'],
    translations: {
      'uae-arabic': {
        word: 'مَعَ السَّلَامَة / إِلَى اللِّقَاء',
        phoneticHindi: 'मा\'अ अस-सलामा / इलल-लिका',
        exampleSentence: 'مَعَ السَّلَامَة، نَلْتَقِي غَدًا فِي مَوْقِعِ العَمَلِ',
        examplePhoneticHindi: 'मा\'अ अस-सलामा, नल्तकी गदन फ़ी मौक़ेइल-अमल',
        exampleSentenceHindi: 'अलविदा, कल कार्यस्थल पर दोबारा मिलेंगे।'
      },
      'german': {
        word: 'Auf Wiedersehen / Tschüss',
        phoneticHindi: 'आउफ़ वीदरज़ेन / चूस',
        exampleSentence: 'Auf Wiedersehen, bis morgen früh um 7 Uhr!',
        examplePhoneticHindi: 'आउफ़ वीदरज़ेन, बिस मोर्गेन फ्रूह उम ज़ीबेन ऊर!',
        exampleSentenceHindi: 'अलविदा, कल सुबह 7 बजे समय पर मिलते हैं!'
      },
      'japanese': {
        word: 'さようなら / また明日 (Sayounara / Mata ashita)',
        phoneticHindi: 'सायोनारा / माता आशिता',
        exampleSentence: 'お疲れ様でした、また明日よろしくお願いします。',
        examplePhoneticHindi: 'ओत्सुकारेसामा देशिता, माता आशिता योरोशिकु ओनेगाइशिमासु।',
        exampleSentenceHindi: 'आज की मेहनत के लिए धन्यवाद, कल फिर मिलेंगे।'
      },
      'english': {
        word: 'Goodbye / See you tomorrow',
        phoneticHindi: 'गुडबाय / सी यू टुमॉरो',
        exampleSentence: 'Goodbye everyone, have a safe and restful evening!',
        examplePhoneticHindi: 'गुडबाय एवरीवन, हैव अ सेफ़ एंड रेस्टफुल इवनिंग!',
        exampleSentenceHindi: 'अलविदा सभी को, सुरक्षित और सुखद शाम बिताएं!'
      },
      'french': {
        word: 'Au revoir / À demain',
        phoneticHindi: 'ओ रव्वार / आ दमाँ',
        exampleSentence: 'Au revoir et bonne soirée, à demain au travail.',
        examplePhoneticHindi: 'ओ रव्वार ए बॉन सुआरे, आ दमाँ ओ त्रावाय।',
        exampleSentenceHindi: 'अलविदा और शुभ संध्या, कल काम पर मिलते हैं।'
      },
      'spanish': {
        word: 'Adiós / Hasta mañana',
        phoneticHindi: 'आदिओस / आस्ता मान्याना',
        exampleSentence: 'Hasta mañana a todos, que tengan buen descanso.',
        examplePhoneticHindi: 'आस्ता मान्याना आ तोदोस, के तेन्गान बुएन देस्कान्सो।',
        exampleSentenceHindi: 'कल तक के लिए अलविदा, आप सबका विश्राम अच्छा हो।'
      }
    }
  },
  {
    id: 'g12',
    tradeId: 'greetings',
    hindiTerm: 'हाँ (Yes) / नहीं (No)',
    englishTerm: 'Yes / No',
    importance: 'critical',
    tags: ['basic', 'agreement', 'response'],
    translations: {
      'uae-arabic': {
        word: 'نَعَم / أَيْوَه (हाँ) | لَا (नहीं)',
        phoneticHindi: 'ना\'अम / ऐवह (हाँ) | ला (नहीं)',
        exampleSentence: 'نَعَمْ يَا فَوْرْمَانْ، فَهِمْتُ كُلَّ التَّعْلِيمَاتِ',
        examplePhoneticHindi: 'ना\'अम या फोरमैन, फहिम्तु कुल्लत-ताअलिमात',
        exampleSentenceHindi: 'हाँ फोरमैन साहब, मैंने सभी निर्देश समझ लिए हैं।'
      },
      'german': {
        word: 'Ja (हाँ) / Nein (नहीं)',
        phoneticHindi: 'या (हाँ) / नाइन (नहीं)',
        exampleSentence: 'Ja, ich habe die Sicherheitsregeln vollständig verstanden.',
        examplePhoneticHindi: 'या, इष हाबे दी ज़िशरहाइट्स-रेगेल्न फ़ोलश्टेंडिश फ़ेरश्टान्डन।',
        exampleSentenceHindi: 'हाँ, मैंने सुरक्षा के सारे नियम पूरी तरह समझ लिए हैं।'
      },
      'japanese': {
        word: 'はい (हाँ) / いいえ (नहीं)',
        phoneticHindi: 'हाई (हाँ) / ईए (नहीं)',
        exampleSentence: 'はい、作業手順をしっかり理解しました。',
        examplePhoneticHindi: 'हाई, साग्योउ तेजुन ओ शिक्रारी रिकाई शिमाशिता।',
        exampleSentenceHindi: 'हाँ, मैंने काम की पूरी प्रक्रिया समझ ली है।'
      },
      'english': {
        word: 'Yes (हाँ) / No (नहीं)',
        phoneticHindi: 'येस (हाँ) / नो (नहीं)',
        exampleSentence: 'Yes Sir, the equipment is ready for inspection.',
        examplePhoneticHindi: 'येस सर, द इक्विपमेंट इज़ रेडी फॉर इन्स्पेक्शन।',
        exampleSentenceHindi: 'हाँ सर, उपकरण निरीक्षण के लिए तैयार है।'
      },
      'french': {
        word: 'Oui (हाँ) / Non (नहीं)',
        phoneticHindi: 'वी (हाँ) / नों (नहीं)',
        exampleSentence: 'Oui, j\'ai bien vérifié toutes les consignes.',
        examplePhoneticHindi: 'वी, जे बियाँ वेरीफ़िए तूत ले कोंसिन्य।',
        exampleSentenceHindi: 'हाँ, मैंने सभी निर्देशों की पुष्टि कर ली है।'
      },
      'spanish': {
        word: 'Sí (हाँ) / No (नहीं)',
        phoneticHindi: 'सी (हाँ) / नो (नहीं)',
        exampleSentence: 'Sí, el equipo de protección está completo.',
        examplePhoneticHindi: 'सी, एल एकीपो दे प्रोतेक्सिओन एस्ता कॉम्प्लेतो।',
        exampleSentenceHindi: 'हाँ, सुरक्षा उपकरण पूरी तरह तैयार हैं।'
      }
    }
  },
  {
    id: 'g13',
    tradeId: 'greetings',
    hindiTerm: 'आपका नाम क्या है? / मेरा नाम ... है',
    englishTerm: 'What is your name? / My name is...',
    importance: 'critical',
    tags: ['identity', 'intro', 'name'],
    translations: {
      'uae-arabic': {
        word: 'مَا اسْمُكَ؟ / اِسْمِي...',
        phoneticHindi: 'मा इस्मूक? / इस्मी...',
        exampleSentence: 'مَا اسْمُكَ؟ اِسْمِي رَامِيشْ، أَنَا عَامِلٌ مِنَ الْهِنْدِ',
        examplePhoneticHindi: 'मा इस्मूक? इस्मी रमेश, अना आमिलुन मिनल-हिंद',
        exampleSentenceHindi: 'आपका नाम क्या है? मेरा नाम रमेश है, मैं भारत से कर्मचारी हूँ।'
      },
      'german': {
        word: 'Wie heißen Sie? / Ich heiße...',
        phoneticHindi: 'वी हाइसन ज़ी? / इष हाइसे...',
        exampleSentence: 'Ich heiße Ramesh und arbeite als Fachkraft aus Indien.',
        examplePhoneticHindi: 'इष हाइसे रमेश उंड आरबाइटे अल्स फ़ाख़क्राफ़्ट आउस ईंडियन।',
        exampleSentenceHindi: 'मेरा नाम रमेश है और मैं भारत से कुशल कर्मी के रूप में काम कर रहा हूँ।'
      },
      'japanese': {
        word: 'お名前は何ですか？ / 私は...です',
        phoneticHindi: 'ओनामाए वा नान देसु का? / वताशी वा... देसु',
        exampleSentence: '初めまして、私はラメシュです。インドから参りました。',
        examplePhoneticHindi: 'हाजिमेमाशिते, वताशी वा रमेशु देसु। इंदो कारा माइरिमाशिता।',
        exampleSentenceHindi: 'नमस्ते, मेरा नाम रमेश है। मैं भारत से आया हूँ।'
      },
      'english': {
        word: 'What is your name? / My name is...',
        phoneticHindi: 'व्हॉट इज़ योर नेम? / माई नेम इज़...',
        exampleSentence: 'My name is Ramesh, certified technician from India.',
        examplePhoneticHindi: 'माई नेम इज़ रमेश, सर्टिफाइड तकनीशियन फ़्रॉम इंडिया।',
        exampleSentenceHindi: 'मेरा नाम रमेश है, भारत से प्रमाणित तकनीशियन हूँ।'
      },
      'french': {
        word: 'Comment vous appelez-vous ? / Je m\'appelle...',
        phoneticHindi: 'कोमाँ वूज़ापले-वू? / झ मापेल...',
        exampleSentence: 'Je m\'appelle Ramesh, ouvrier qualifié venu d\'Inde.',
        examplePhoneticHindi: 'झ मापेल रमेश, ऊव्रीये कालिफ़िए वन्यु देंद।',
        exampleSentenceHindi: 'मेरा नाम रमेश है, भारत से कुशल श्रमिक हूँ।'
      },
      'spanish': {
        word: '¿Cómo se llama? / Me llamo...',
        phoneticHindi: 'कोमो से यामा? / मे यामो...',
        exampleSentence: 'Me llamo Ramesh y soy técnico especialista de la India.',
        examplePhoneticHindi: 'मे यामो रमेश ई सोय तेकनीको एस्पेशालिस्ता दे ला इंदिया।',
        exampleSentenceHindi: 'मेरा नाम रमेश है और मैं भारत से विशेषज्ञ तकनीशियन हूँ।'
      }
    }
  },
  {
    id: 'g14',
    tradeId: 'greetings',
    hindiTerm: 'आपसे मिलकर बहुत खुशी हुई',
    englishTerm: 'Pleased to meet you / Nice to meet you',
    importance: 'high',
    tags: ['intro', 'polite', 'respect'],
    translations: {
      'uae-arabic': {
        word: 'فُرْصَة سَعِيدَة / تَشَرَّفْنَا',
        phoneticHindi: 'फ़ुरसा सईदा / तशर्रफ़ना',
        exampleSentence: 'تَشَرَّفْنَا بِمَعْرِفَتِكَ يَا أَخِي الْكَرِيم',
        examplePhoneticHindi: 'तशर्रफ़ना बिमा\'अरीफतिक या अख़ील-करीम',
        exampleSentenceHindi: 'आदरणीय भाई, आपसे मिलकर बहुत खुशी व सम्मान हुआ।'
      },
      'german': {
        word: 'Sehr erfreut / Freut mich',
        phoneticHindi: 'ज़ेयर एरफ़्रॉयट / फ़्रॉयट मिश',
        exampleSentence: 'Sehr erfreut! Ich freue mich auf eine gute Zusammenarbeit.',
        examplePhoneticHindi: 'ज़ेयर एरफ़्रॉयट! इष फ़्रॉय मिश आउफ़ आइने गूटे त्सुज़ामेनआरबाइट।',
        exampleSentenceHindi: 'बहुत प्रसन्नता हुई! मैं अच्छे सहयोग और कार्य के लिए उत्सुक हूँ।'
      },
      'japanese': {
        word: 'はじめまして、どうぞよろしく (Hajimemashite)',
        phoneticHindi: 'हाजिमेमाशिते, दोउज़ो योरोशिकु',
        exampleSentence: 'はじめまして、一緒に働けて光栄です。',
        examplePhoneticHindi: 'हाजिमेमाशिते, इशो नी हाताराकेते कोउएइ देसु।',
        exampleSentenceHindi: 'आपसे पहली बार मिलकर प्रसन्नता हुई, साथ काम करना सम्मान की बात है।'
      },
      'english': {
        word: 'Pleased to meet you / Nice to meet you',
        phoneticHindi: 'प्लीज्ड टू मीट यू / नाइस टू मीट यू',
        exampleSentence: 'Pleased to meet you, looking forward to working with everyone.',
        examplePhoneticHindi: 'प्लीज्ड टू मीट यू, लुकिंग फॉरवर्ड टू वर्किंग विद एवरीवन।',
        exampleSentenceHindi: 'आपसे मिलकर खुशी हुई, सभी के साथ काम करने को उत्सुक हूँ।'
      },
      'french': {
        word: 'Enchanté(e) / Ravi de vous rencontrer',
        phoneticHindi: 'ऑँशांते / रवी द वू रॉँकोंत्रे',
        exampleSentence: 'Enchanté Monsieur, ravi de rejoindre votre entreprise.',
        examplePhoneticHindi: 'ऑँशांते मोस्यो, रवी द रजुआंद्र वोत्र ऑँत्रप्रीज़।',
        exampleSentenceHindi: 'आपसे मिलकर बहुत खुशी हुई सर, आपकी कंपनी से जुड़कर प्रसन्नता हुई।'
      },
      'spanish': {
        word: 'Mucho gusto / Encantado(a)',
        phoneticHindi: 'मूचो गुस्तो / एनकांतादो',
        exampleSentence: 'Mucho gusto, es un verdadero placer trabajar con ustedes.',
        examplePhoneticHindi: 'मूचो गुस्तो, एस उन वेरदादेरो प्लासेर त्राबाखार कौन उस्तेदेस।',
        exampleSentenceHindi: 'आपसे मिलकर बहुत खुशी हुई, आप सबके साथ काम करना गौरव की बात है।'
      }
    }
  },
  {
    id: 'g15',
    tradeId: 'greetings',
    hindiTerm: 'मुझे समझ नहीं आया, कृपया धीरे/दोबारा बोलें',
    englishTerm: 'I didn\'t understand, please repeat slowly',
    importance: 'critical',
    tags: ['communication', 'clarification', 'safety'],
    translations: {
      'uae-arabic': {
        word: 'لَمْ أَفْهَمْ، تَكَلَّمْ بِشْوَيْش مِنْ فَضْلِك',
        phoneticHindi: 'लम अफ़हम, तकल्लम बिशवैश मिन फ़दलिक / माफी मालूम',
        exampleSentence: 'لَمْ أَفْهَمْ هَذِهِ الكَلِمَة، كَرِّرْهَا بِبُطْءٍ مِنْ فَضْلِك',
        examplePhoneticHindi: 'लम अफ़हम हाज़िहिल-कलिमा, कर्रिरहा बि-बुतिन मिन फ़दलिक',
        exampleSentenceHindi: 'मुझे यह बात समझ नहीं आई, कृपया इसे धीरे से दोबारा कहें।'
      },
      'german': {
        word: 'Ich habe das nicht verstanden, bitte langsamer',
        phoneticHindi: 'इष हाबे दास निष्ट फ़ेरश्टान्डन, बिटे लांगज़ामर',
        exampleSentence: 'Können Sie das bitte noch einmal langsam wiederholen?',
        examplePhoneticHindi: 'कोन्नेन ज़ी दास बिटे नोख़ आइनमाल लांगज़ाम वीदरहोलेन?',
        exampleSentenceHindi: 'क्या आप कृपया इसे एक बार और धीरे से दोहरा सकते हैं?'
      },
      'japanese': {
        word: 'わかりませんでした、もう一度お願いします',
        phoneticHindi: 'वाकारिमासेन देशिता, मोउ इचिदो ओनेगाइशिमासु',
        exampleSentence: 'すみません、聞き取れませんでした。もう一度ゆっくりお願いします。',
        examplePhoneticHindi: 'सुमिमासेन, किकितोरेमासेन देशिता। मोउ इचिदो युक्कुरी ओनेगाइशिमासु।',
        exampleSentenceHindi: 'माफ़ कीजिये, मैं सुन/समझ नहीं पाया। कृपया एक बार और धीरे से बताएं।'
      },
      'english': {
        word: 'I did not understand, please repeat slowly',
        phoneticHindi: 'आई डिड नॉट अंडरस्टैंड, प्लीज़ रिपीट स्लोली',
        exampleSentence: 'Sorry Sir, I did not understand, could you please repeat slowly?',
        examplePhoneticHindi: 'सॉरी सर, आई डिड नॉट अंडरस्टैंड, कुड यू प्लीज़ रिपीट स्लोली?',
        exampleSentenceHindi: 'माफ़ कीजिये सर, मैं समझ नहीं पाया, क्या आप धीरे से दोबारा बोल सकते हैं?'
      },
      'french': {
        word: 'Je n\'ai pas compris, parlez plus lentement',
        phoneticHindi: 'झ ने पा कोम्प्री, पारले प्ल्यू लोंतमाँ',
        exampleSentence: 'Pardon, je n\'ai pas compris, pouvez-vous répéter lentement s\'il vous plaît ?',
        examplePhoneticHindi: 'पार्दों, झ ने पा कोम्प्री, पूवे-वू रेपेते लोंतमाँ सिल वू प्ले?',
        exampleSentenceHindi: 'माफ़ कीजिये, मैं समझ नहीं सका, क्या आप कृपया धीरे दोहरा सकते हैं?'
      },
      'spanish': {
        word: 'No entendí, por favor hable más despacio',
        phoneticHindi: 'नो एन्तेन्दी, पोर फावोर आबले मास देस्पासियो',
        exampleSentence: 'Disculpe, no entendí bien, ¿puede repetir más despacio por favor?',
        examplePhoneticHindi: 'दिस्कुलपे, नो एन्तेन्दी बिएन, पुएदे रेपेतीर मास देस्पासियो पोर फावोर?',
        exampleSentenceHindi: 'माफ़ कीजिये, मैं ठीक से नहीं समझा, क्या आप कृपया धीरे दोबारा कह सकते हैं?'
      }
    }
  },
  // -------------------------------------------------------------
  // TRADE 1: CONSTRUCTION & SITE SAFETY (20 items)
  // -------------------------------------------------------------
  {
    id: 'c1',
    tradeId: 'construction',
    hindiTerm: 'सुरक्षा टोपी (हेलमेट)',
    englishTerm: 'Safety Helmet',
    importance: 'critical',
    tags: ['safety', 'ppe', 'site'],
    translations: {
      'uae-arabic': {
        word: 'خُوذَة السَّلَامَة',
        phoneticHindi: 'खूज़त अस-सलामा',
        exampleSentence: 'اِلْبَسْ خُوذَة السَّلَامَة دَايْمًا فِي المَوْقِعْ',
        examplePhoneticHindi: 'इल्बस खूज़त अस-सलामा दायमन फिल मौक़ेअ',
        exampleSentenceHindi: 'साइट पर हमेशा सुरक्षा हेलमेट पहनें।'
      },
      'german': {
        word: 'der Schutzhelm',
        phoneticHindi: 'डेयर शुत्स-हेल्म',
        exampleSentence: 'Auf der Baustelle musst du den Schutzhelm tragen.',
        examplePhoneticHindi: 'आउफ़ डेर बाउश्टेले मुस्त दू डेन शुत्स-हेल्म त्रागन।',
        exampleSentenceHindi: 'निर्माण स्थल पर आपको सुरक्षा हेलमेट पहनना अनिवार्य है।'
      },
      'japanese': {
        word: 'ヘルメット (安全帽)',
        phoneticHindi: 'हेरुमेत्तो (आंजेनबो)',
        exampleSentence: '現場では必ずヘルメットを着用してください。',
        examplePhoneticHindi: 'गेन्बा देवा कानाराजु हेरुमेत्तो ओ चाकुयोउ शिते कुदासाई।',
        exampleSentenceHindi: 'कार्यस्थल पर कृपया हमेशा हेलमेट पहनें।'
      },
      'english': {
        word: 'Safety Helmet / Hard Hat',
        phoneticHindi: 'सेफ़्टी हेलमेट / हार्ड हैट',
        exampleSentence: 'Always wear your safety helmet on the construction site.',
        examplePhoneticHindi: 'ऑलवेज वेअर योर सेफ़्टी हेलमेट ऑन द कंस्ट्रक्शन साइट।',
        exampleSentenceHindi: 'कंस्ट्रक्शन साइट पर हमेशा अपना सेफ़्टी हेलमेट पहनें।'
      },
      'french': {
        word: 'le casque de sécurité',
        phoneticHindi: 'ल कास्क द सेक्युरिते',
        exampleSentence: 'Portez votre casque de sécurité sur le chantier.',
        examplePhoneticHindi: 'पोर्ते वोत्र कास्क द सेक्युरिते सुर ल शांतिये।',
        exampleSentenceHindi: 'कार्यस्थल पर अपना सुरक्षा हेलमेट पहनें।'
      },
      'spanish': {
        word: 'el casco de seguridad',
        phoneticHindi: 'एल कास्को दे सेगुरिदाद',
        exampleSentence: 'Use el casco de seguridad en la obra.',
        examplePhoneticHindi: 'उसे एल कास्को दे सेगुरिदाद एन ला ओब्रा।',
        exampleSentenceHindi: 'काम की जगह पर सुरक्षा हेलमेट का उपयोग करें।'
      }
    }
  },
  {
    id: 'c2',
    tradeId: 'construction',
    hindiTerm: 'सुरक्षा जूते',
    englishTerm: 'Safety Boots',
    importance: 'critical',
    tags: ['ppe', 'shoes'],
    translations: {
      'uae-arabic': {
        word: 'حِذَاء السَّلَامَة',
        phoneticHindi: 'हिज़ा अस-सलामा (सेफ्टी शूज़)',
        exampleSentence: 'حِذَاء السَّلَامَة يَحْمِي رِجْلَكْ مِنَ المَسَامِيرْ',
        examplePhoneticHindi: 'हिज़ा अस-सलामा यहमी रिजलक मिनल मसामीर',
        exampleSentenceHindi: 'सेफ्टी जूते आपके पैर को कीलों से बचाते हैं।'
      },
      'german': {
        word: 'die Sicherheitsschuhe',
        phoneticHindi: 'दी जीशरहाइट्स-शूहे',
        exampleSentence: 'Tragen Sie bitte Ihre Sicherheitsschuhe.',
        examplePhoneticHindi: 'त्रागन जी बिटे ईहरे जीशरहाइट्स-शूहे।',
        exampleSentenceHindi: 'कृपया अपने सुरक्षा जूते पहनें।'
      },
      'japanese': {
        word: '安全靴 (あんぜんぐつ)',
        phoneticHindi: 'आंजेन गुत्सू',
        exampleSentence: '安全靴を履いて作業してください。',
        examplePhoneticHindi: 'आंजेनगुत्सू ओ हाइते सा ग्योउ शिते कुदासाई।',
        exampleSentenceHindi: 'सुरक्षा जूते पहनकर काम करें।'
      },
      'english': {
        word: 'Safety Boots / Steel Toe Shoes',
        phoneticHindi: 'सेफ़्टी बूट्स',
        exampleSentence: 'Safety boots protect your feet from falling heavy objects.',
        examplePhoneticHindi: 'सेफ़्टी बूट्स प्रोटेक्ट योर फ़ीट फ़्रॉम फॉलिंग हेवी ऑब्जेक्ट्स।',
        exampleSentenceHindi: 'सुरक्षा जूते भारी चीजों के गिरने से आपके पैरों की रक्षा करते हैं।'
      },
      'french': {
        word: 'les chaussures de sécurité',
        phoneticHindi: 'ले शोस्युर द सेक्युरिते',
        exampleSentence: 'Les chaussures de sécurité sont obligatoires.',
        examplePhoneticHindi: 'ले शोस्युर द सेक्युरिते सों ओब्लिगात्त्वार।',
        exampleSentenceHindi: 'सुरक्षा जूते अनिवार्य हैं।'
      },
      'spanish': {
        word: 'las botas de seguridad',
        phoneticHindi: 'लास बोतास दे सेगुरिदाद',
        exampleSentence: 'Póngase las botas de seguridad antes de entrar.',
        examplePhoneticHindi: 'पोंगासे लास बोतास दे सेगुरिदाद आंतेस दे एनत्रार।',
        exampleSentenceHindi: 'अंदर जाने से पहले सुरक्षा जूते पहनें।'
      }
    }
  },
  {
    id: 'c3',
    tradeId: 'construction',
    hindiTerm: 'मचान / पाड़',
    englishTerm: 'Scaffold / Scaffolding',
    importance: 'critical',
    tags: ['height', 'structure'],
    translations: {
      'uae-arabic': {
        word: 'سَقَّالَة',
        phoneticHindi: 'सक़्क़ाला (सकाला)',
        exampleSentence: 'تَأَكَّدْ إِنَّ السَّقَّالَة ثَابْتَة وَمَضْبُوطَة',
        examplePhoneticHindi: 'तअक्कद इन्नस सक़्क़ाला साबिता व मज़बूता',
        exampleSentenceHindi: 'जांच लें कि मचान मजबूत और स्थिर है।'
      },
      'german': {
        word: 'das Gerüst',
        phoneticHindi: 'दास गेरुस्ट',
        exampleSentence: 'Das Gerüst muss sicher befestigt sein.',
        examplePhoneticHindi: 'दास गेरुस्ट मुस ज़िशर बेफ़ेस्टिग्ट ज़ाइन।',
        exampleSentenceHindi: 'मचान सुरक्षित रूप से बंधा होना चाहिए।'
      },
      'japanese': {
        word: '足場 (あしば)',
        phoneticHindi: 'आशिबा',
        exampleSentence: '足場から落ちないように注意してください。',
        examplePhoneticHindi: 'आशिबा कारा ओचिनाई योउ नी चूइ शिते कुदासाई।',
        exampleSentenceHindi: 'मचान से न गिरें, ध्यान रखें।'
      },
      'english': {
        word: 'Scaffolding',
        phoneticHindi: 'स्कैफ़ोल्डिंग',
        exampleSentence: 'Inspect the scaffolding before climbing up.',
        examplePhoneticHindi: 'इंस्पेक्ट द स्कैफ़ोल्डिंग बिफोर क्लाइम्बिंग अप।',
        exampleSentenceHindi: 'ऊपर चढ़ने से पहले मचान की जांच करें।'
      },
      'french': {
        word: "l'échafaudage",
        phoneticHindi: 'लेशफ़ोदाज',
        exampleSentence: "L'échafaudage est prêt pour les travaux.",
        examplePhoneticHindi: 'लेशफ़ोदाज ए प्रे पूर ले त्रावो।',
        exampleSentenceHindi: 'काम के लिए मचान तैयार है।'
      },
      'spanish': {
        word: 'el andamio',
        phoneticHindi: 'एल आन्दामिओ',
        exampleSentence: 'El andamio está bien montado.',
        examplePhoneticHindi: 'एल आन्दामिओ एस्ता बिएन मोन्तादो।',
        exampleSentenceHindi: 'मचान ठीक से लगा हुआ है।'
      }
    }
  },
  {
    id: 'c4',
    tradeId: 'construction',
    hindiTerm: 'सीमेंट',
    englishTerm: 'Cement',
    importance: 'high',
    tags: ['material'],
    translations: {
      'uae-arabic': {
        word: 'إِسْمَنْتْ',
        phoneticHindi: 'इस्मेन्त (सीमेंट)',
        exampleSentence: 'جِيبْ لِي خَمْسَة أَكْيَاسْ إِسْمَنْتْ',
        examplePhoneticHindi: 'जीब ली खम्सा अक्यास इस्मेन्त',
        exampleSentenceHindi: 'मेरे लिए सीमेंट की 5 बोरियां लाओ।'
      },
      'german': {
        word: 'der Zement',
        phoneticHindi: 'डेयर त्सेमेन्ट',
        exampleSentence: 'Mischen Sie den Zement mit Wasser und Sand.',
        examplePhoneticHindi: 'मिशेन जी डेन त्सेमेन्ट मिट वासर उंड ज़ांड।',
        exampleSentenceHindi: 'सीमेंट को पानी और रेत के साथ मिलाएं।'
      },
      'japanese': {
        word: 'セメント',
        phoneticHindi: 'सेमेन्तो',
        exampleSentence: 'セメントの袋を運んでください。',
        examplePhoneticHindi: 'सेमेन्तो नो फुकुरो ओ हाकोन्दे कुदासाई।',
        exampleSentenceHindi: 'सीमेंट की बोरी उठाकर लाएं।'
      },
      'english': {
        word: 'Cement',
        phoneticHindi: 'सीमेंट',
        exampleSentence: 'We need 10 bags of cement for this pillar.',
        examplePhoneticHindi: 'वी नीड टेन बैग्स ऑफ़ सीमेंट फॉर दिस पिलर।',
        exampleSentenceHindi: 'इस खंभे के लिए हमें 10 बोरी सीमेंट चाहिए।'
      },
      'french': {
        word: 'le ciment',
        phoneticHindi: 'ल सीमों',
        exampleSentence: 'Mélangez le ciment avec le sable.',
        examplePhoneticHindi: 'मेलोंजे ल सीमों आवेक ल साबले।',
        exampleSentenceHindi: 'सीमेंट को रेत के साथ मिलाएं।'
      },
      'spanish': {
        word: 'el cemento',
        phoneticHindi: 'एल सेमेन्तो',
        exampleSentence: 'Traiga tres sacos de cemento.',
        examplePhoneticHindi: 'त्राइगा त्रेस साकोस दे सेमेन्तो।',
        exampleSentenceHindi: 'सीमेंट की तीन बोरियां लाएं।'
      }
    }
  },
  {
    id: 'c5',
    tradeId: 'construction',
    hindiTerm: 'कंक्रीट / रोड़ी-सीमेंट घोल',
    englishTerm: 'Concrete',
    importance: 'high',
    tags: ['material'],
    translations: {
      'uae-arabic': {
        word: 'خَرَسَانَة',
        phoneticHindi: 'खरसाना (कंक्रीट)',
        exampleSentence: 'صَبِّ الخَرَسَانَة بِسُرْعَة هِنِي',
        examplePhoneticHindi: 'सब्बिल खरसाना बिसुरअत हिनी',
        exampleSentenceHindi: 'यहाँ जल्दी से कंक्रीट डालें।'
      },
      'german': {
        word: 'der Beton',
        phoneticHindi: 'डेयर बेतों',
        exampleSentence: 'Der Beton trocknet in vier Stunden.',
        examplePhoneticHindi: 'डेयर बेतों त्रोक्नेत इन फ़ीर श्टुन्डेन।',
        exampleSentenceHindi: 'कंक्रीट चार घंटे में सूख जाएगा।'
      },
      'japanese': {
        word: 'コンクリート',
        phoneticHindi: 'कोनकुरीतो',
        exampleSentence: 'コンクリートを流し込みます。',
        examplePhoneticHindi: 'कोनकुरीतो ओ नागाशी-कोमिमासु।',
        exampleSentenceHindi: 'कंक्रीट की ढलाई कर रहे हैं।'
      },
      'english': {
        word: 'Concrete',
        phoneticHindi: 'कंक्रीट',
        exampleSentence: 'Pour the concrete mixture into the frame evenly.',
        examplePhoneticHindi: 'पोर द कंक्रीट मिक्सचर इंटू द फ्रेम ईवनली।',
        exampleSentenceHindi: 'फ्रेम में कंक्रीट का घोल बराबर फैलाएं।'
      },
      'french': {
        word: 'le béton',
        phoneticHindi: 'ल बेतों',
        exampleSentence: 'Coulez le béton dans le coffrage.',
        examplePhoneticHindi: 'कूले ल बेतों दाँ ल कोफ़्राज।',
        exampleSentenceHindi: 'फ्रेम में कंक्रीट डालें।'
      },
      'spanish': {
        word: 'el hormigón / concreto',
        phoneticHindi: 'एल ओरमिगोन / कोनक्रतो',
        exampleSentence: 'Vierta el hormigón con cuidado.',
        examplePhoneticHindi: 'विएरता एल ओरमिगोन कौन कुइदादो।',
        exampleSentenceHindi: 'ध्यानपूर्वक कंक्रीट डालें।'
      }
    }
  },
  {
    id: 'c6',
    tradeId: 'construction',
    hindiTerm: 'क्रेन',
    englishTerm: 'Crane',
    importance: 'high',
    tags: ['machinery'],
    translations: {
      'uae-arabic': {
        word: 'رَافِعَة / كْرِينْ',
        phoneticHindi: 'राफ़ेआ / क्रेन',
        exampleSentence: 'اِبْعِدْ عَنْ مَنْطِقَة الكْرِينْ',
        examplePhoneticHindi: 'इबअद अन मन्तिक़त अल-क्रेन',
        exampleSentenceHindi: 'क्रेन के इलाके से दूर हट जाएं।'
      },
      'german': {
        word: 'der Kran',
        phoneticHindi: 'डेयर क्रान',
        exampleSentence: 'Der Kran hebt schwere Stahlträger.',
        examplePhoneticHindi: 'डेयर क्रान हेब्त श्वेरे श्टाल-त्रेगर।',
        exampleSentenceHindi: 'क्रेन भारी स्टील बीम उठा रही है।'
      },
      'japanese': {
        word: 'クレーン',
        phoneticHindi: 'कुरेन',
        exampleSentence: 'クレーンの下に入らないでください。',
        examplePhoneticHindi: 'कुरेन नो शिता नी हाइरानाइदे कुदासाई।',
        exampleSentenceHindi: 'क्रेन के नीचे कभी न जाएं।'
      },
      'english': {
        word: 'Crane',
        phoneticHindi: 'क्रेन',
        exampleSentence: 'Do not stand under the crane load.',
        examplePhoneticHindi: 'डू नॉट स्टैंड अंडर द क्रेन लोड।',
        exampleSentenceHindi: 'क्रेन के लटके वजन के नीचे खड़े न हों।'
      },
      'french': {
        word: 'la grue',
        phoneticHindi: 'ला ग्रू',
        exampleSentence: 'La grue déplace les poutres en métal.',
        examplePhoneticHindi: 'ला ग्रू देप्लास ले पूत्र ऑँ मेताल।',
        exampleSentenceHindi: 'क्रेन धातु के बीम हटा रही है।'
      },
      'spanish': {
        word: 'la grúa',
        phoneticHindi: 'ला ग्रूआ',
        exampleSentence: 'No pase por debajo de la grúa.',
        examplePhoneticHindi: 'नो पासे पोर देबाखो दे ला ग्रूआ।',
        exampleSentenceHindi: 'क्रेन के नीचे से न गुजरें।'
      }
    }
  },
  {
    id: 'c7',
    tradeId: 'construction',
    hindiTerm: 'हथौड़ा',
    englishTerm: 'Hammer',
    importance: 'medium',
    tags: ['tools'],
    translations: {
      'uae-arabic': {
        word: 'مِطْرَقَة / شَاكُوشْ',
        phoneticHindi: 'शाकूश / मिक्रता',
        exampleSentence: 'عَطْنِي الشَّاكُوشْ مِنْ فَضْلَكْ',
        examplePhoneticHindi: 'अत्नी अश-शाकूश मिन फ़दलाक',
        exampleSentenceHindi: 'कृपया मुझे हथौड़ा दें।'
      },
      'german': {
        word: 'der Hammer',
        phoneticHindi: 'डेयर हामर',
        exampleSentence: 'Reichen Sie mir bitte den Hammer.',
        examplePhoneticHindi: 'राइशेन जी मीर बिटे डेन हामर।',
        exampleSentenceHindi: 'कृपया मुझे हथौड़ा पकड़ाएं।'
      },
      'japanese': {
        word: '金づち / ハンマー',
        phoneticHindi: 'हानाज़ुची / हान्मा',
        exampleSentence: 'ハンマーで釘を打ってください。',
        examplePhoneticHindi: 'हान्मा दे कुगी ओ उत्तते कुदासाई।',
        exampleSentenceHindi: 'हथौड़े से कील ठोकें।'
      },
      'english': {
        word: 'Hammer',
        phoneticHindi: 'हैमर',
        exampleSentence: 'Pass me the hammer to secure the nail.',
        examplePhoneticHindi: 'पास मी द हैमर टू सिक्योर द नेल।',
        exampleSentenceHindi: 'कील लगाने के लिए मुझे हथौड़ा पकड़ाएं।'
      },
      'french': {
        word: 'le marteau',
        phoneticHindi: 'ल मारतो',
        exampleSentence: 'Donnez-moi le marteau s’il vous plaît.',
        examplePhoneticHindi: 'दोने म्वाह ल मारतो सील वू प्ले।',
        exampleSentenceHindi: 'कृपया मुझे हथौड़ा दें।'
      },
      'spanish': {
        word: 'el martillo',
        phoneticHindi: 'एल मारतीओ',
        exampleSentence: 'Pásame el martillo por favor.',
        examplePhoneticHindi: 'पासा मे एल मारतीओ पोर फावोर।',
        exampleSentenceHindi: 'कृपया मुझे हथौड़ा पकड़ाएं।'
      }
    }
  },
  {
    id: 'c8',
    tradeId: 'construction',
    hindiTerm: 'नापने का फीता (इंच टेप)',
    englishTerm: 'Measuring Tape',
    importance: 'high',
    tags: ['tools', 'measurement'],
    translations: {
      'uae-arabic': {
        word: 'شَرِيط القِيَاسْ / فِيتَة',
        phoneticHindi: 'फ़्रीत अल-क़ियास / फ़ीता',
        exampleSentence: 'قِيسْ هَذَا الحَائِطْ بِالفِيتَة',
        examplePhoneticHindi: 'क़ीस हाज़ल हाइत बिल फ़ीता',
        exampleSentenceHindi: 'इस दीवार को फीते से नापें।'
      },
      'german': {
        word: 'das Maßband',
        phoneticHindi: 'दास मास-बांड',
        exampleSentence: 'Messen Sie die Länge mit dem Maßband.',
        examplePhoneticHindi: 'मेसेन जी दी लेंग मिट डेम मास-बांड।',
        exampleSentenceHindi: 'फीते से लंबाई नापें।'
      },
      'japanese': {
        word: 'メジャー / 巻尺 (まきじゃく)',
        phoneticHindi: 'मेजा / माकीजाकु',
        exampleSentence: 'メジャーで長さを測ってください。',
        examplePhoneticHindi: 'मेजा दे नागासा ओ हाकात्ते कुदासाई।',
        exampleSentenceHindi: 'इंच टेप से लंबाई नापें।'
      },
      'english': {
        word: 'Measuring Tape',
        phoneticHindi: 'मेज़रिंग टेप',
        exampleSentence: 'Check the exact length with the measuring tape.',
        examplePhoneticHindi: 'चेक द एग्ज़ैक्ट लेंथ विथ द मेज़रिंग टेप।',
        exampleSentenceHindi: 'इंच टेप से सही नाप जांचें।'
      },
      'french': {
        word: 'le mètre ruban',
        phoneticHindi: 'ल मेत्र रूबों',
        exampleSentence: 'Mesurez la distance avec le mètre ruban.',
        examplePhoneticHindi: 'मेज़्यूरे ला दिस्तोंस आवेक ल मेत्र रूबों।',
        exampleSentenceHindi: 'फीते से दूरी नापें।'
      },
      'spanish': {
        word: 'la cinta métrica',
        phoneticHindi: 'ला सिंता मेत्रिका',
        exampleSentence: 'Mida la pared con la cinta métrica.',
        examplePhoneticHindi: 'मिदा ला पारेद कौन ला सिंता मेत्रिका।',
        exampleSentenceHindi: 'दीवार को इंच टेप से नापें।'
      }
    }
  },
  {
    id: 'c9',
    tradeId: 'construction',
    hindiTerm: 'खतरा / सावधान',
    englishTerm: 'Danger / Hazard',
    importance: 'critical',
    tags: ['warning', 'safety'],
    translations: {
      'uae-arabic': {
        word: 'خَطَرْ ! اِنْتَبِهْ',
        phoneticHindi: 'ख़तर! इन्तिबिह (सावधान)',
        exampleSentence: 'خَطَرْ ! مَمْنُوعْ الدُّخُولْ بِدُونْ إِذِنْ',
        examplePhoneticHindi: 'ख़तर! मम्नू अद-दुखूल बिदून इज़िन',
        exampleSentenceHindi: 'खतरा! बिना अनुमति प्रवेश वर्जित है।'
      },
      'german': {
        word: 'Achtung / Gefahr',
        phoneticHindi: 'आख़्तुंग / गेफ़ार',
        exampleSentence: 'Gefahr! Betreten der Baustelle verboten.',
        examplePhoneticHindi: 'गेफ़ार! बेट्रेटन डेर बाउश्टेले फ़ेरबोटेन।',
        exampleSentenceHindi: 'खतरा! निर्माण स्थल पर जाना मना है।'
      },
      'japanese': {
        word: '危険 (きけん) / 注意',
        phoneticHindi: 'किकेन / चूइ',
        exampleSentence: '危険！頭上注意してください。',
        examplePhoneticHindi: 'किकेन! जुजौ चूइ शिते कुदासाई।',
        exampleSentenceHindi: 'खतरा! सिर के ऊपर की चीजों से सावधान रहें।'
      },
      'english': {
        word: 'Danger / Caution',
        phoneticHindi: 'डेंजर / कॉशन',
        exampleSentence: 'Danger! High voltage cables overhead.',
        examplePhoneticHindi: 'डेंजर! हाई वोल्टेज केबल्स ओवरहेड।',
        exampleSentenceHindi: 'खतरा! ऊपर हाई वोल्टेज तार हैं।'
      },
      'french': {
        word: 'Danger / Attention',
        phoneticHindi: 'दोंजे / अतोंस्यों',
        exampleSentence: 'Danger ! Zone interdite au public.',
        examplePhoneticHindi: 'दोंजे ! ज़ोन ऑँतेरदीत ओ पुब्लिक।',
        exampleSentenceHindi: 'खतरा! यहां जाना मना है।'
      },
      'spanish': {
        word: 'Peligro / Atención',
        phoneticHindi: 'पेलिग्रो / आतेन्सियोन',
        exampleSentence: '¡Peligro! Caída de objetos.',
        examplePhoneticHindi: 'पेलिग्रो! काईदा दे ओब्खेतोस।',
        exampleSentenceHindi: 'खतरा! सामान गिरने का भय।'
      }
    }
  },
  {
    id: 'c10',
    tradeId: 'construction',
    hindiTerm: 'सुरक्षा बेल्ट (हार्नेस)',
    englishTerm: 'Safety Harness',
    importance: 'critical',
    tags: ['safety', 'height'],
    translations: {
      'uae-arabic': {
        word: 'حِزَام الأَمَانْ',
        phoneticHindi: 'हिज़ाम अल-अमान (सेफ्टी बेल्ट)',
        exampleSentence: 'اِرْبُطْ حِزَام الأَمَانْ قَبْلْ لَا تِطْلَعْ فُوقْ',
        examplePhoneticHindi: 'इरबुत हिज़ाम अल-अमान क़बल ला तितला फ़ोक़',
        exampleSentenceHindi: 'ऊपर चढ़ने से पहले सुरक्षा बेल्ट जरूर बांधें।'
      },
      'german': {
        word: 'der Sicherheitsgurt',
        phoneticHindi: 'डेयर जीशरहाइट्स-गुर्ट',
        exampleSentence: 'Legen Sie den Sicherheitsgurt in der Höhe an.',
        examplePhoneticHindi: 'लेगन जी डेन जीशरहाइट्स-गुर्ट इन डेर होहे आन।',
        exampleSentenceHindi: 'ऊंचाई पर सुरक्षा बेल्ट लगाएं।'
      },
      'japanese': {
        word: '安全帯 (フルハーネス)',
        phoneticHindi: 'आंजेनताई (फुरू हानेसु)',
        exampleSentence: '高所作業では必ず安全帯を使用してください。',
        examplePhoneticHindi: 'कोउशो साग्योउ देवा कानाराजु आंजेनताई ओ शियौ शिते कुदासाई।',
        exampleSentenceHindi: 'ऊंचाई पर काम करते समय सुरक्षा बेल्ट का उपयोग करें।'
      },
      'english': {
        word: 'Safety Harness',
        phoneticHindi: 'सेफ़्टी हार्नेस',
        exampleSentence: 'Fasten your safety harness before working at height.',
        examplePhoneticHindi: 'फ़ासन योर सेफ़्टी हार्नेस बिफोर वर्किंग ऐट हाइट।',
        exampleSentenceHindi: 'ऊंचाई पर काम करने से पहले सुरक्षा बेल्ट बांधें।'
      },
      'french': {
        word: 'le harnais de sécurité',
        phoneticHindi: 'ल आने द सेक्युरिते',
        exampleSentence: 'Attachez votre harnais de sécurité.',
        examplePhoneticHindi: 'आताशे वोत्र आने द सेक्युरिते।',
        exampleSentenceHindi: 'अपनी सुरक्षा बेल्ट बांधें।'
      },
      'spanish': {
        word: 'el arnés de seguridad',
        phoneticHindi: 'एल आर्नेस दे सेगुरिदाद',
        exampleSentence: 'Abroche el arnés de seguridad en las alturas.',
        examplePhoneticHindi: 'आब्रोचे एल आर्नेस दे सेगुरिदाद एन लास आल्तुरास।',
        exampleSentenceHindi: 'ऊंचाई पर सुरक्षा बेल्ट बांधें।'
      }
    }
  },
  {
    id: 'c11',
    tradeId: 'construction',
    hindiTerm: 'फावड़ा / बेलचा',
    englishTerm: 'Shovel / Spade',
    importance: 'medium',
    tags: ['tools'],
    translations: {
      'uae-arabic': {
        word: 'مِجْرَفَة / شِيوَلْ',
        phoneticHindi: 'शिवाल / मिज़रफ़ा',
        exampleSentence: 'شِيلْ الرَّمْلْ بِالشِّيوَلْ',
        examplePhoneticHindi: 'शील अर-रमल बिश-शिवाल',
        exampleSentenceHindi: 'फावड़े से रेत उठाएं।'
      },
      'german': {
        word: 'die Schaufel',
        phoneticHindi: 'दी शाउफ़ेल',
        exampleSentence: 'Nehmen Sie die Schaufel und räumen Sie den Sand weg.',
        examplePhoneticHindi: 'नेमेन जी दी शाउफ़ेल उंड रॉयमेन जी डेन ज़ांड वेग।',
        exampleSentenceHindi: 'फावड़ा लें और रेत हटा दें।'
      },
      'japanese': {
        word: 'シャベル / スコップ',
        phoneticHindi: 'शाबेरु / सुकोप्पु',
        exampleSentence: 'スコップで砂利をすくってください。',
        examplePhoneticHindi: 'सुकोप्पु दे जारी ओ सुकुत्ते कुदासाई।',
        exampleSentenceHindi: 'फावड़े से बजरी उठाएं।'
      },
      'english': {
        word: 'Shovel',
        phoneticHindi: 'शॉवल',
        exampleSentence: 'Use the shovel to clear the dirt.',
        examplePhoneticHindi: 'यूज़ द शॉवल टू क्लियर द डर्ट।',
        exampleSentenceHindi: 'मिट्टी हटाने के लिए फावड़े का उपयोग करें।'
      },
      'french': {
        word: 'la pelle',
        phoneticHindi: 'ला पेल',
        exampleSentence: 'Prenez la pelle pour ramasser le gravier.',
        examplePhoneticHindi: 'प्रने ला पेल पूर रामासे ल ग्राविए।',
        exampleSentenceHindi: 'बजरी उठाने के लिए फावड़ा लें।'
      },
      'spanish': {
        word: 'la pala',
        phoneticHindi: 'ला पाला',
        exampleSentence: 'Use la pala para cargar la arena.',
        examplePhoneticHindi: 'उसे ला पाला पारा कारगार ला आरेना।',
        exampleSentenceHindi: 'रेत भरने के लिए फावड़ा प्रयोग करें।'
      }
    }
  },
  {
    id: 'c12',
    tradeId: 'construction',
    hindiTerm: 'ईंट',
    englishTerm: 'Brick',
    importance: 'medium',
    tags: ['material'],
    translations: {
      'uae-arabic': {
        word: 'طَابُوقْ / طُوبْ',
        phoneticHindi: 'ताबूक / तूब',
        exampleSentence: 'صُفْ الطَّابُوقْ سِيدَه وَمَضْبُوطْ',
        examplePhoneticHindi: 'सुफ अत-ताबूक सीदा व मज़बूत',
        exampleSentenceHindi: 'ईंटों को बिल्कुल सीधा और सही लगाएं।'
      },
      'german': {
        word: 'der Ziegelstein',
        phoneticHindi: 'डेयर त्सीगेल-श्टाइन',
        exampleSentence: 'Setzen Sie die Ziegelsteine gerade.',
        examplePhoneticHindi: 'ज़ेतत्सेन जी दी त्सीगेल-श्टाइने गेरादे।',
        exampleSentenceHindi: 'ईंटों को सीधा रखें।'
      },
      'japanese': {
        word: 'レンガ (煉瓦)',
        phoneticHindi: 'रेगा',
        exampleSentence: 'レンガをまっすぐ並べてください。',
        examplePhoneticHindi: 'रेगा ओ मास्सुगु नाराबेते कुदासाई।',
        exampleSentenceHindi: 'ईंटों को कतार में सीधा लगाएं।'
      },
      'english': {
        word: 'Brick',
        phoneticHindi: 'ब्रिक',
        exampleSentence: 'Lay the bricks in a straight line.',
        examplePhoneticHindi: 'ले द ब्रिक्स इन अ स्ट्रेट लाइन।',
        exampleSentenceHindi: 'ईंटों को एक सीधी रेखा में लगाएं।'
      },
      'french': {
        word: 'la brique',
        phoneticHindi: 'ला ब्रिक',
        exampleSentence: 'Posez les briques bien droites.',
        examplePhoneticHindi: 'पोजे ले ब्रिक बियों द्र्वात।',
        exampleSentenceHindi: 'ईंटें बिल्कुल सीधी लगाएं।'
      },
      'spanish': {
        word: 'el ladrillo',
        phoneticHindi: 'एल लाद्रीइयो',
        exampleSentence: 'Coloque los ladrillos alineados.',
        examplePhoneticHindi: 'कोलोके लोस लाद्रीइयोस आलिनेआदोस।',
        exampleSentenceHindi: 'ईंटों को लाइन में लगाएं।'
      }
    }
  },
  {
    id: 'c13',
    tradeId: 'construction',
    hindiTerm: 'लोहे का बीम / गार्डर',
    englishTerm: 'Steel Beam',
    importance: 'high',
    tags: ['structure', 'material'],
    translations: {
      'uae-arabic': {
        word: 'عَارِضَة حَدِيدْ',
        phoneticHindi: 'आरिदत हदीद',
        exampleSentence: 'اِرْفَعْ عَارِضَة الحَدِيدْ بِحَذَرْ',
        examplePhoneticHindi: 'इरफ़ा आरिदत अल-हदीद बि-हज़र',
        exampleSentenceHindi: 'लोहे का बीम सावधानी से उठाएं।'
      },
      'german': {
        word: 'der Stahlträger',
        phoneticHindi: 'डेयर श्टाल-त्रेगर',
        exampleSentence: 'Der Stahlträger wird mit dem Kran gehoben.',
        examplePhoneticHindi: 'डेयर श्टाल-त्रेगर विर्ड मिट डेम क्रान गेहोबेन।',
        exampleSentenceHindi: 'स्टील बीम को क्रेन से उठाया जा रहा है।'
      },
      'japanese': {
        word: '鉄骨 (てっこつ)',
        phoneticHindi: 'तेक्कोत्सू',
        exampleSentence: '鉄骨を固定してください。',
        examplePhoneticHindi: 'तेक्कोत्सू ओ कोतेइ शिते कुदासाई।',
        exampleSentenceHindi: 'लोहे के बीम को कसकर बांधें।'
      },
      'english': {
        word: 'Steel Beam / Girder',
        phoneticHindi: 'स्टील बीम',
        exampleSentence: 'Secure the steel beam properly before welding.',
        examplePhoneticHindi: 'सिक्योर द स्टील बीम प्रॉपर्ली बिफोर वेल्डिंग।',
        exampleSentenceHindi: 'वेल्डिंग से पहले स्टील बीम को अच्छी तरह स्थिर करें।'
      },
      'french': {
        word: 'la poutre en acier',
        phoneticHindi: 'ला पूत्र ऑँ आसिए',
        exampleSentence: 'Fixez solidement la poutre en acier.',
        examplePhoneticHindi: 'फ़िक्से सोलिदमाँ ला पूत्र ऑँ आसिए।',
        exampleSentenceHindi: 'स्टील बीम को मजबूती से लगाएं।'
      },
      'spanish': {
        word: 'la viga de acero',
        phoneticHindi: 'ला वीगा दे आसेरो',
        exampleSentence: 'Fije bien la viga de acero.',
        examplePhoneticHindi: 'फिखे बिएन ला वीगा दे आसेरो।',
        exampleSentenceHindi: 'स्टील बीम को ठीक से स्थिर करें।'
      }
    }
  },
  {
    id: 'c14',
    tradeId: 'construction',
    hindiTerm: 'सीढ़ी',
    englishTerm: 'Ladder',
    importance: 'high',
    tags: ['tools', 'height'],
    translations: {
      'uae-arabic': {
        word: 'دَرَجْ / سِلَّمْ',
        phoneticHindi: 'सिल्लम / दरज',
        exampleSentence: 'اِمْسِكْ السِّلَّمْ زَيْنْ عِلْشَانْ مَا يِتْحَرَّكْ',
        examplePhoneticHindi: 'इम्सिक अस-सिल्लम ज़ैन इलशान मा यितहर्रक',
        exampleSentenceHindi: 'सीढ़ी को मजबूती से पकड़ें ताकि वह हिले नहीं।'
      },
      'german': {
        word: 'die Leiter',
        phoneticHindi: 'दी लाइटर',
        exampleSentence: 'Halten Sie bitte die Leiter fest.',
        examplePhoneticHindi: 'हाल्टेन जी बिटे दी लाइटर फ़ेस्ट।',
        exampleSentenceHindi: 'कृपया सीढ़ी को मजबूती से पकड़ें।'
      },
      'japanese': {
        word: 'はしご (梯子)',
        phoneticHindi: 'हाशीगो',
        exampleSentence: 'はしごをしっかり押さえてください。',
        examplePhoneticHindi: 'हाशीगो ओ शिक्कारी ओसाएते कुदासाई।',
        exampleSentenceHindi: 'सीढ़ी को मजबूती से थामे रखें।'
      },
      'english': {
        word: 'Ladder',
        phoneticHindi: 'लैडर',
        exampleSentence: 'Hold the ladder firmly while your partner climbs.',
        examplePhoneticHindi: 'होल्ड द लैडर फ़र्मली व्हाइल योर पार्टनर क्लाइम्ब्स।',
        exampleSentenceHindi: 'जब आपका साथी ऊपर चढ़े तो सीढ़ी को मजबूती से पकड़ें।'
      },
      'french': {
        word: "l'échelle",
        phoneticHindi: 'लेचेल',
        exampleSentence: "Tenez fermement l'échelle s'il vous plaît.",
        examplePhoneticHindi: 'तने फ़ेर्ममाँ लेचेल सील वू प्ले।',
        exampleSentenceHindi: 'कृपया सीढ़ी मजबूती से पकड़ें।'
      },
      'spanish': {
        word: 'la escalera',
        phoneticHindi: 'ला एस्कालेरा',
        exampleSentence: 'Sostenga la escalera con firmeza.',
        examplePhoneticHindi: 'सोस्तेन्गा ला एस्कालेरा कौन फिरमेसा।',
        exampleSentenceHindi: 'सीढ़ी को मजबूती से पकड़ें।'
      }
    }
  },
  {
    id: 'c15',
    tradeId: 'construction',
    hindiTerm: 'कार्यप्रभारी (सुपरवाइजर)',
    englishTerm: 'Site Supervisor / Foreman',
    importance: 'critical',
    tags: ['workplace', 'management'],
    translations: {
      'uae-arabic': {
        word: 'مُشْرِف المَوْقِعْ / الفُورْمَنْ',
        phoneticHindi: 'मुशरिफ़ अल-मौक़ेअ / फ़ोरमैन',
        exampleSentence: 'كَلِّمْ مُشْرِف المَوْقِعْ قَبْلْ لَا تِبْدَأ',
        examplePhoneticHindi: 'कल्लिम मुशरिफ़ अल-मौक़ेअ क़बल ला तिब्दा',
        exampleSentenceHindi: 'काम शुरू करने से पहले साइट सुपरवाइजर से बात करें।'
      },
      'german': {
        word: 'der Bauleiter / Vorarbeiter',
        phoneticHindi: 'डेयर बाउ-लाइटर / फ़ोर-आरबाइटर',
        exampleSentence: 'Fragen Sie den Bauleiter nach dem Tagesplan.',
        examplePhoneticHindi: 'फ़्रागन जी डेन बाउ-लाइटर नाख़ डेम तागेस-प्लान।',
        exampleSentenceHindi: 'दैनिक कार्य योजना के लिए साइट सुपरवाइजर से पूछें।'
      },
      'japanese': {
        word: '現場監督 (げんばかんとく)',
        phoneticHindi: 'गेन्बा कान्तोकु',
        exampleSentence: '監督に作業の指示を聞いてください。',
        examplePhoneticHindi: 'कान्तोकु नी साग्योउ नो शिजि ओ कीइते कुदासाई।',
        exampleSentenceHindi: 'सुपरवाइजर से काम के निर्देश पूछें।'
      },
      'english': {
        word: 'Site Supervisor / Foreman',
        phoneticHindi: 'साइट सुपरवाइजर',
        exampleSentence: 'Report any safety problem immediately to the supervisor.',
        examplePhoneticHindi: 'रिपोर्ट एनी सेफ़्टी प्रॉब्लम इमीडिएटली टू द सुपरवाइजर।',
        exampleSentenceHindi: 'किसी भी सुरक्षा समस्या की तुरंत सुपरवाइजर को सूचना दें।'
      },
      'french': {
        word: 'le chef de chantier',
        phoneticHindi: 'ल शेफ़ द शांतिये',
        exampleSentence: 'Demandez l’instruction au chef de chantier.',
        examplePhoneticHindi: 'दमाँदे लैंस्त्रुकसियों ओ शेफ़ द शांतिये।',
        exampleSentenceHindi: 'सुपरवाइजर से निर्देश लें।'
      },
      'spanish': {
        word: 'el supervisor / capataz',
        phoneticHindi: 'एल सुपरविसोर / कापातास',
        exampleSentence: 'Consulte al capataz antes de continuar.',
        examplePhoneticHindi: 'कोन्सुलते अल कापातास आंतेस दे कोन्तिनूआर।',
        exampleSentenceHindi: 'आगे बढ़ने से पहले सुपरवाइजर से सलाह लें।'
      }
    }
  },
  {
    id: 'c16',
    tradeId: 'construction',
    hindiTerm: 'नक्शा / प्लान',
    englishTerm: 'Blueprint / Construction Plan',
    importance: 'medium',
    tags: ['measurement', 'plan'],
    translations: {
      'uae-arabic': {
        word: 'مُخَطَّطْ / خَرِيطَة المَبْنَى',
        phoneticHindi: 'मुख़त्तत / खरीता',
        exampleSentence: 'شُوفْ المخطط عِلْشَانْ نَعْرِفْ المَقَاسْ',
        examplePhoneticHindi: 'शूफ़ अल-मुख़त्तत इलशान नारिफ़ अल-मक़ास',
        exampleSentenceHindi: 'नाप समझने के लिए नक्शा देखें।'
      },
      'german': {
        word: 'der Bauplan / die Blaupause',
        phoneticHindi: 'डेयर बाउ-प्लान',
        exampleSentence: 'Prüfen Sie die Maße auf dem Bauplan.',
        examplePhoneticHindi: 'प्रूफ़ेन जी दी मासे आउफ़ डेम बाउ-प्लान।',
        exampleSentenceHindi: 'नक्शे पर माप की जांच करें।'
      },
      'japanese': {
        word: '図面 (ずめん)',
        phoneticHindi: 'जुमेन',
        exampleSentence: '図面を確認して施工してください。',
        examplePhoneticHindi: 'जुमेन ओ काकुनिन शिते सेकोउ शिते कुदासाई।',
        exampleSentenceHindi: 'नक्शा देखकर निर्माण कार्य करें।'
      },
      'english': {
        word: 'Blueprint / Site Plan',
        phoneticHindi: 'ब्लूप्रिंट / साइट प्लान',
        exampleSentence: 'Verify the room measurements from the blueprint.',
        examplePhoneticHindi: 'वेरीफ़ाई द रूम मेज़रमेंट्स फ़्रॉम द ब्लूप्रिंट।',
        exampleSentenceHindi: 'नक्शे से कमरे के माप का मिलान करें।'
      },
      'french': {
        word: 'le plan de construction',
        phoneticHindi: 'ल प्लों द कोँस्त्रुकसियों',
        exampleSentence: 'Regardez le plan de construction.',
        examplePhoneticHindi: 'रेगार्दे ल प्लों द कोँस्त्रुकसियों।',
        exampleSentenceHindi: 'निर्माण का नक्शा देखें।'
      },
      'spanish': {
        word: 'el plano de construcción',
        phoneticHindi: 'एल प्लानो दे कोन्स्त्रुक्सिओन',
        exampleSentence: 'Revise las medidas en el plano.',
        examplePhoneticHindi: 'रेविसे लास मेदिदास एन एल प्लानो।',
        exampleSentenceHindi: 'नक्शे पर माप की जांच करें।'
      }
    }
  },
  {
    id: 'c17',
    tradeId: 'construction',
    hindiTerm: 'सुरक्षा चश्मा',
    englishTerm: 'Safety Goggles',
    importance: 'critical',
    tags: ['safety', 'ppe'],
    translations: {
      'uae-arabic': {
        word: 'نَظَّارَات السَّلَامَة',
        phoneticHindi: 'नज़्ज़ारात अस-सलामा',
        exampleSentence: 'اِلْبَسْ النَّظَّارَات عِلْشَانْ تَحْمِي عُيُونِكْ مِنَ الغُبَارْ',
        examplePhoneticHindi: 'इल्बस अन-नज़्ज़ारात इलशान तहमी उयूनिक मिनल ग़ुबार',
        exampleSentenceHindi: 'आंखों को धूल व टुकड़ों से बचाने के लिए चश्मा पहनें।'
      },
      'german': {
        word: 'die Schutzbrille',
        phoneticHindi: 'दी शुत्स-ब्रिले',
        exampleSentence: 'Beim Schneiden muss man eine Schutzbrille tragen.',
        examplePhoneticHindi: 'बाइम श्नाइडन मुस मान आइने शुत्स-ब्रिले त्रागन।',
        exampleSentenceHindi: 'काटते समय सुरक्षा चश्मा पहनना जरूरी है।'
      },
      'japanese': {
        word: '保護メガネ (ほごめがね)',
        phoneticHindi: 'होगो मेगाने',
        exampleSentence: '研磨作業時は保護メガネをかけてください。',
        examplePhoneticHindi: 'केन्मा साग्योउ-जी वा होगो मेगाने ओ काकेते कुदासाई।',
        exampleSentenceHindi: 'घिसाई करते समय सुरक्षा चश्मा जरूर लगाएं।'
      },
      'english': {
        word: 'Safety Goggles',
        phoneticHindi: 'सेफ़्टी गॉगल्स',
        exampleSentence: 'Wear safety goggles when cutting steel or concrete.',
        examplePhoneticHindi: 'वेअर सेफ़्टी गॉगल्स वेन कटिंग स्टील ऑर कंक्रीट।',
        exampleSentenceHindi: 'स्टील या कंक्रीट काटते समय सुरक्षा चश्मा पहनें।'
      },
      'french': {
        word: 'les lunettes de protection',
        phoneticHindi: 'ले ल्यूनेत द प्रोतेक्सियों',
        exampleSentence: 'Mettez vos lunettes de protection.',
        examplePhoneticHindi: 'मेते वो ल्यूनेत द प्रोतेक्सियों।',
        exampleSentenceHindi: 'सुरक्षा चश्मा पहनें।'
      },
      'spanish': {
        word: 'las gafas de seguridad',
        phoneticHindi: 'लास गाफ़ास दे सेगुरिदाद',
        exampleSentence: 'Use gafas de seguridad al cortar metal.',
        examplePhoneticHindi: 'उसे गाफ़ास दे सेगुरिदाद अल कोर्त्तार मेताल।',
        exampleSentenceHindi: 'धातु काटते समय सुरक्षा चश्मा लगाएं।'
      }
    }
  },
  {
    id: 'c18',
    tradeId: 'construction',
    hindiTerm: 'कानों का सुरक्षा मफ (ईयर मफ)',
    englishTerm: 'Ear Protection / Ear Plugs',
    importance: 'high',
    tags: ['safety', 'ppe'],
    translations: {
      'uae-arabic': {
        word: 'سَدَّادَات الأُذُنْ',
        phoneticHindi: 'सद्दादात अल-उजुन',
        exampleSentence: 'فِي صَوْتْ عَالِي، اِلْبَسْ سَدَّادَات الأُذُنْ',
        examplePhoneticHindi: 'फ़ी सौत आली, इल्बस सद्दादात अल-उजुन',
        exampleSentenceHindi: 'तेज आवाज में कानों के प्लग पहनें।'
      },
      'german': {
        word: 'der Gehörschutz',
        phoneticHindi: 'डेयर गेहोर-शुत्स',
        exampleSentence: 'Der Lärm ist laut, bitte Gehörschutz tragen.',
        examplePhoneticHindi: 'डेयर लेर्म इस्ट लाउत, बिटे गेहोर-शुत्स त्रागन।',
        exampleSentenceHindi: 'शोर तेज है, कृपया कान सुरक्षा मफ पहनें।'
      },
      'japanese': {
        word: '耳栓 (みみせん)',
        phoneticHindi: 'मिमीसेन / ईयामाफु',
        exampleSentence: '騒音が大きい場所では耳栓をしてください。',
        examplePhoneticHindi: 'सोउओन गा ओओकी बाशो देवा मिमीसेन ओ शिते कुदासाई।',
        exampleSentenceHindi: 'जहाँ भारी शोर हो वहाँ कान के प्लग लगाएं।'
      },
      'english': {
        word: 'Ear Muffs / Ear Plugs',
        phoneticHindi: 'इयर मफ्स / इयर प्लग्स',
        exampleSentence: 'Use ear protection near drilling machines.',
        examplePhoneticHindi: 'यूज़ इयर प्रोटेक्शन नियर ड्रिलिंग मशीन्स।',
        exampleSentenceHindi: 'ड्रिलिंग मशीनों के पास कान सुरक्षा का प्रयोग करें।'
      },
      'french': {
        word: 'le casque antibruit',
        phoneticHindi: 'ल कास्क ऑँतिब्रुई',
        exampleSentence: 'Portez un casque antibruit près des machines.',
        examplePhoneticHindi: 'पोर्ते अूँ कास्क ऑँतिब्रुई प्रे दे माशीन।',
        exampleSentenceHindi: 'मशीनों के पास शोर-रोधी हेडफोन पहनें।'
      },
      'spanish': {
        word: 'los protectores auditivos',
        phoneticHindi: 'लोस प्रोतेक्तोरेस औदितीवोस',
        exampleSentence: 'Use protectores auditivos por el ruido.',
        examplePhoneticHindi: 'उसे प्रोतेक्तोरेस औदितीवोस पोर एल रुईदो।',
        exampleSentenceHindi: 'शोर से बचने के लिए कान सुरक्षा का उपयोग करें।'
      }
    }
  },
  {
    id: 'c19',
    tradeId: 'construction',
    hindiTerm: 'भारी वजन / भार',
    englishTerm: 'Heavy Load',
    importance: 'high',
    tags: ['warning', 'lifting'],
    translations: {
      'uae-arabic': {
        word: 'حِمْلْ ثَقِيلْ',
        phoneticHindi: 'हिमल सक़ील (भारी भार)',
        exampleSentence: 'هَذَا حِمْلْ ثَقِيلْ، نَادِي وَاحِدْ يِسَاعِدِكْ',
        examplePhoneticHindi: 'हाज़ा हिमल सक़ील, नादी वाहिद यिसाअदिक',
        exampleSentenceHindi: 'यह बहुत भारी है, मदद के लिए किसी को बुलाएं।'
      },
      'german': {
        word: 'die schwere Last',
        phoneticHindi: 'दी श्वेरे लास्ट',
        exampleSentence: 'Achtung, heben Sie schwere Lasten zu zweit.',
        examplePhoneticHindi: 'आख़्तुंग, हेबेन जी श्वेरे लास्तेन त्सू त्स्वाइट।',
        exampleSentenceHindi: 'सावधान, भारी वजन को दो लोग मिलकर उठाएं।'
      },
      'japanese': {
        word: '重量物 (じゅうりょうぶつ)',
        phoneticHindi: 'ज्यूउरयौबुत्सू',
        exampleSentence: '重い荷物は二人で運んでください。',
        examplePhoneticHindi: 'ओमोई निमोत्सू वा फुत्तारी दे हाकोन्दे कुदासाई।',
        exampleSentenceHindi: 'भारी सामान को दो लोग मिलकर उठाएं।'
      },
      'english': {
        word: 'Heavy Load',
        phoneticHindi: 'हेवी लोड',
        exampleSentence: 'Do not lift heavy loads alone; ask for assistance.',
        examplePhoneticHindi: 'डू नॉट लिफ़्ट हेवी लोड्स अलोन; आस्क फ़ॉर असिस्टेंस।',
        exampleSentenceHindi: 'भारी वजन अकेले न उठाएं; साथी की मदद लें।'
      },
      'french': {
        word: 'la charge lourde',
        phoneticHindi: 'ला शार्श लूर्द',
        exampleSentence: 'Ne soulevez pas cette charge lourde seul.',
        examplePhoneticHindi: 'न सूलवे पा सेत शार्श लूर्द सोल।',
        exampleSentenceHindi: 'यह भारी सामान अकेले न उठाएं।'
      },
      'spanish': {
        word: 'la carga pesada',
        phoneticHindi: 'ला कारगा पेसादा',
        exampleSentence: 'Levante la carga pesada entre dos personas.',
        examplePhoneticHindi: 'लेवान्ते ला कारगा पेसादा एनत्रे दोस पेरसोनास।',
        exampleSentenceHindi: 'भारी सामान दो व्यक्ति मिलकर उठाएं।'
      }
    }
  },
  {
    id: 'c20',
    tradeId: 'construction',
    hindiTerm: 'साइट का गेट / प्रवेश द्वार',
    englishTerm: 'Site Entrance',
    importance: 'medium',
    tags: ['location'],
    translations: {
      'uae-arabic': {
        word: 'بَوَّابَة المَوْقِعْ',
        phoneticHindi: 'बव्वाबात अल-मौक़ेअ',
        exampleSentence: 'سَجِّلْ اِسْمَكْ عِنْدَ بَوَّابَة المَوْقِعْ',
        examplePhoneticHindi: 'सज्जिल इस्मॉक इन्द बव्वाबात अल-मौक़ेअ',
        exampleSentenceHindi: 'साइट गेट पर अपना नाम दर्ज कराएं।'
      },
      'german': {
        word: 'die Baustelleneinfahrt',
        phoneticHindi: 'दी बाउश्टेलेन-आइनफ़ार्ट',
        exampleSentence: 'Bitte melden Sie sich am Eingang der Baustelle.',
        examplePhoneticHindi: 'बिटे मेल्डेन जी ज़िश आम आइनगांग डेर बाउश्टेले।',
        exampleSentenceHindi: 'कृपया निर्माण स्थल के गेट पर सूचना दें।'
      },
      'japanese': {
        word: '現場の入口 (げんばのいりぐち)',
        phoneticHindi: 'गेन्बा नो इरीगुची',
        exampleSentence: '現場の入口で入構手続きをしてください。',
        examplePhoneticHindi: 'गेन्बा नो इरीगुची दे न्यूउकौ तेत्सुजुकी ओ शिते कुदासाई।',
        exampleSentenceHindi: 'गेट पर प्रवेश पंजीकरण कराएं।'
      },
      'english': {
        word: 'Site Entrance / Gate',
        phoneticHindi: 'साइट एंट्रेंस',
        exampleSentence: 'Sign in at the site gate every morning.',
        examplePhoneticHindi: 'साइन इन ऐट द साइट गेट एवरी मॉर्निंग।',
        exampleSentenceHindi: 'हर सुबह साइट के गेट पर एंट्री करें।'
      },
      'french': {
        word: "l'entrée du chantier",
        phoneticHindi: 'लोंत्रे द्यु शांतिये',
        exampleSentence: "Présentez-vous à l'entrée du chantier.",
        examplePhoneticHindi: 'प्रेजोंते वू आ लोंत्रे द्यु शांतिये।',
        exampleSentenceHindi: 'गेट पर अपनी उपस्थिति दर्ज कराएं।'
      },
      'spanish': {
        word: 'la entrada de la obra',
        phoneticHindi: 'ला एनत्रादा दे ला ओब्रा',
        exampleSentence: 'Regístrese en la entrada de la obra.',
        examplePhoneticHindi: 'रेखिस्त्रेसे एन ला एनत्रादा दे ला ओब्रा।',
        exampleSentenceHindi: 'साइट गेट पर पंजीकरण करें।'
      }
    }
  },

  // -------------------------------------------------------------
  // TRADE 2: ELDERLY CARE & HEALTHCARE (20 items)
  // -------------------------------------------------------------
  {
    id: 'h1',
    tradeId: 'healthcare',
    hindiTerm: 'दवाई / औषधि',
    englishTerm: 'Medicine',
    importance: 'critical',
    tags: ['care', 'medical'],
    translations: {
      'uae-arabic': {
        word: 'دَوَا / عِلَاجْ',
        phoneticHindi: 'दवा / इलाज',
        exampleSentence: 'هَذَا وَقْتْ الدَّوَا، تَفَضَّلْ اشْرَبْ',
        examplePhoneticHindi: 'हाज़ा वक़्त अद-दवा, तफ़द्दल इशरब',
        exampleSentenceHindi: 'यह दवाई का समय है, कृपया लीजिए।'
      },
      'german': {
        word: 'das Medikament / die Medizin',
        phoneticHindi: 'दास मेदिकामेंट / दी मेदिसीन',
        exampleSentence: 'Hier ist Ihr Medikament für den Blutdruck.',
        examplePhoneticHindi: 'हीयर इस्ट ईहर मेदिकामेंट फ्युर डेन ब्लूटड्रुक।',
        exampleSentenceHindi: 'यह आपकी ब्लड प्रेशर की दवाई है।'
      },
      'japanese': {
        word: '薬 (くすり)',
        phoneticHindi: 'कुसुरी',
        exampleSentence: '食後にお薬を飲んでくださいね。',
        examplePhoneticHindi: 'शोकूगो नी ओ-कुसुरी ओ नोन्दे कुदासाई ने।',
        exampleSentenceHindi: 'खाना खाने के बाद कृपया यह दवा लें।'
      },
      'english': {
        word: 'Medicine / Medication',
        phoneticHindi: 'मेडिसिन',
        exampleSentence: 'Please take your medicine on time with water.',
        examplePhoneticHindi: 'प्लीज़ टेक योर मेडिसिन ऑन टाइम विथ वॉटर।',
        exampleSentenceHindi: 'कृपया समय पर पानी के साथ अपनी दवाई लें।'
      },
      'french': {
        word: 'le médicament',
        phoneticHindi: 'ल मेदिकामाँ',
        exampleSentence: 'Prenez votre médicament après le repas.',
        examplePhoneticHindi: 'प्रने वोत्र मेदिकामाँ आप्रे ल रेपा।',
        exampleSentenceHindi: 'खाना खाने के बाद अपनी दवाई लें।'
      },
      'spanish': {
        word: 'la medicina / el medicamento',
        phoneticHindi: 'ला मेदिसिना',
        exampleSentence: 'Tome su medicina con un vaso de agua.',
        examplePhoneticHindi: 'तोमे सू मेदिसिना कौन उन वासो दे आगुआ।',
        exampleSentenceHindi: 'एक गिलास पानी के साथ अपनी दवा लें।'
      }
    }
  },
  {
    id: 'h2',
    tradeId: 'healthcare',
    hindiTerm: 'मरीज़ / बुज़ुर्ग व्यक्ति',
    englishTerm: 'Patient / Elder',
    importance: 'high',
    tags: ['care'],
    translations: {
      'uae-arabic': {
        word: 'مَرِيضْ / كَبِيرْ السِّنْ',
        phoneticHindi: 'मरीज़ / कबीर अस-सिन',
        exampleSentence: 'سَاعِدْ كَبِيرْ السِّنْ عِلْشَانْ يِقْعُدْ',
        examplePhoneticHindi: 'साअद कबीर अस-सिन इलशान यिक़उद',
        exampleSentenceHindi: 'बुजुर्ग को बैठने में मदद करें।'
      },
      'german': {
        word: 'der Patient / der Senior',
        phoneticHindi: 'डेयर पात्स्येंट / ज़ेन्योर',
        exampleSentence: 'Der Patient braucht heute etwas Ruhe.',
        examplePhoneticHindi: 'डेयर पात्स्येंट ब्राउथ होयते एतवास रूहे।',
        exampleSentenceHindi: 'मरीज़ को आज कुछ आराम की आवश्यकता है।'
      },
      'japanese': {
        word: '利用者様 / 患者様 (かんじゃさま)',
        phoneticHindi: 'रियौशा-सामा / कान्जा-सामा',
        exampleSentence: '利用者様の手を優しく引いてください。',
        examplePhoneticHindi: 'रियौशा-सामा नो ते ओ यासाशीकु हीइते कुदासाई।',
        exampleSentenceHindi: 'मरीज़ का हाथ प्यार से थामें।'
      },
      'english': {
        word: 'Patient / Resident / Elder',
        phoneticHindi: 'पेशेंट / एल्डर',
        exampleSentence: 'Help the elderly resident walk safely.',
        examplePhoneticHindi: 'हेल्प द एल्डरली रेजिडेंट वॉक सेफ़ली।',
        exampleSentenceHindi: 'बुजुर्ग व्यक्ति को सुरक्षित चलने में सहायता करें।'
      },
      'french': {
        word: 'le patient / la personne âgée',
        phoneticHindi: 'ल पास्यों / ला पेरसों आजे',
        exampleSentence: 'Aidez la personne âgée à se lever.',
        examplePhoneticHindi: 'एदे ला पेरसों आजे आ स लवे।',
        exampleSentenceHindi: 'बुजुर्ग व्यक्ति को उठने में मदद करें।'
      },
      'spanish': {
        word: 'el paciente / adulto mayor',
        phoneticHindi: 'एल पासिएन्ते / आदुल्तो मायोर',
        exampleSentence: 'Ayude al paciente a sentarse cómodamente.',
        examplePhoneticHindi: 'आयुदे अल पासिएन्ते आ सेंतारसे कोमोदामेन्ते।',
        exampleSentenceHindi: 'मरीज़ को आराम से बैठने में मदद करें।'
      }
    }
  },
  {
    id: 'h3',
    tradeId: 'healthcare',
    hindiTerm: 'पहिएदार कुर्सी (व्हीलचेयर)',
    englishTerm: 'Wheelchair',
    importance: 'high',
    tags: ['care', 'equipment'],
    translations: {
      'uae-arabic': {
        word: 'كُرْسِي مُتَحَرِّكْ',
        phoneticHindi: 'कुरसी मुतहर्रिक',
        exampleSentence: 'قَفِّلْ فَرَامِلْ الكُرْسِي المُتَحَرِّكْ',
        examplePhoneticHindi: 'क़फ़्फ़िल फ़रामिल अल-कुरसी अल-मुतहर्रिक',
        exampleSentenceHindi: 'व्हीलचेयर का ब्रेक जरूर लगाएं।'
      },
      'german': {
        word: 'der Rollstuhl',
        phoneticHindi: 'डेयर रोल-श्टूल',
        exampleSentence: 'Bitte die Bremse am Rollstuhl feststellen.',
        examplePhoneticHindi: 'बिटे दी ब्रेमसे आम रोल-श्टूल फ़ेस्ट-श्टेलेन।',
        exampleSentenceHindi: 'कृपया व्हीलचेयर का ब्रेक लॉक करें।'
      },
      'japanese': {
        word: '車椅子 (くるまいす)',
        phoneticHindi: 'कुरुमा-ईसु',
        exampleSentence: '車椅子のブレーキを必ずかけてください。',
        examplePhoneticHindi: 'कुरुमा-ईसु नो बुरेकी ओ कानाराजु काकेते कुदासाई।',
        exampleSentenceHindi: 'व्हीलचेयर का ब्रेक हमेशा लगाएं।'
      },
      'english': {
        word: 'Wheelchair',
        phoneticHindi: 'व्हीलचेयर',
        exampleSentence: 'Lock the wheelchair brakes before helping them stand.',
        examplePhoneticHindi: 'लॉक द व्हीलचेयर ब्रेक्स बिफोर हेल्पिंग देम स्टैंड।',
        exampleSentenceHindi: 'उन्हें खड़ा करने से पहले व्हीलचेयर का ब्रेक लगाएं।'
      },
      'french': {
        word: 'le fauteuil roulant',
        phoneticHindi: 'ल फ़ोतॉय रूलों',
        exampleSentence: 'Bloquez les freins du fauteuil roulant.',
        examplePhoneticHindi: 'ब्लोके ले फ्रें द्यु फ़ोतॉय रूलों।',
        exampleSentenceHindi: 'व्हीलचेयर के ब्रेक लगा दें।'
      },
      'spanish': {
        word: 'la silla de ruedas',
        phoneticHindi: 'ला सीया दे रुएदास',
        exampleSentence: 'Ponga los frenos a la silla de ruedas.',
        examplePhoneticHindi: 'पोंगा लोस फ्रेनोस आ ला सीया दे रुएदास।',
        exampleSentenceHindi: 'व्हीलचेयर के ब्रेक लगाएं।'
      }
    }
  },
  {
    id: 'h4',
    tradeId: 'healthcare',
    hindiTerm: 'रक्तचाप (ब्लड प्रेशर)',
    englishTerm: 'Blood Pressure',
    importance: 'high',
    tags: ['medical'],
    translations: {
      'uae-arabic': {
        word: 'ضَغْط الدَّمْ',
        phoneticHindi: 'दग़्त अद-दम (बीपी)',
        exampleSentence: 'خَلِّنَا نِقِيسْ ضَغْط الدَّمْ الحِينْ',
        examplePhoneticHindi: 'खल्लिना निक़ीस दग़्त अद-दम अल-हीन',
        exampleSentenceHindi: 'आइए अभी आपका ब्लड प्रेशर नाप लेते हैं।'
      },
      'german': {
        word: 'der Blutdruck',
        phoneticHindi: 'डेयर ब्लूट-ड्रुक',
        exampleSentence: 'Ich messe jetzt Ihren Blutdruck.',
        examplePhoneticHindi: 'इश मेसे येट्स्त ईहरेन ब्लूट-ड्रुक।',
        exampleSentenceHindi: 'मैं अभी आपका ब्लड प्रेशर नापता हूँ।'
      },
      'japanese': {
        word: '血圧 (けつあつ)',
        phoneticHindi: 'केत्सु-आत्सू',
        exampleSentence: '今から血圧を測りますね。',
        examplePhoneticHindi: 'इमा कारा केत्सु-आत्सू ओ हाकारीमासु ने।',
        exampleSentenceHindi: 'अब मैं आपका ब्लड प्रेशर नापता हूँ।'
      },
      'english': {
        word: 'Blood Pressure',
        phoneticHindi: 'ब्लड प्रेशर',
        exampleSentence: 'Your blood pressure is normal today.',
        examplePhoneticHindi: 'योर ब्लड प्रेशर इज़ नॉर्मल टुडे।',
        exampleSentenceHindi: 'आज आपका ब्लड प्रेशर सामान्य है।'
      },
      'french': {
        word: 'la tension artérielle',
        phoneticHindi: 'ला तोंस्यों आर्तेरिएल',
        exampleSentence: 'Je vais prendre votre tension artérielle.',
        examplePhoneticHindi: 'झ वे प्रोंद्र वोत्र तोंस्यों आर्तेरिएल।',
        exampleSentenceHindi: 'मैं आपका ब्लड प्रेशर नापने जा रहा हूँ।'
      },
      'spanish': {
        word: 'la presión arterial',
        phoneticHindi: 'ला प्रेसिओन आर्तेरिआल',
        exampleSentence: 'Voy a medir su presión arterial.',
        examplePhoneticHindi: 'वोय आ मेदिर सू प्रेसिओन आर्तेरिआल।',
        exampleSentenceHindi: 'मैं आपका ब्लड प्रेशर नापूंगा।'
      }
    }
  },
  {
    id: 'h5',
    tradeId: 'healthcare',
    hindiTerm: 'दर्द / तकलीफ',
    englishTerm: 'Pain / Ache',
    importance: 'critical',
    tags: ['medical', 'emergency'],
    translations: {
      'uae-arabic': {
        word: 'أَلَمْ / وَجَعْ',
        phoneticHindi: 'अलम / वजअ (दर्द)',
        exampleSentence: 'وِينْ يِعَوِّرِكْ؟ هَلْ فِي أَلَمْ هِنِي؟',
        examplePhoneticHindi: 'वीन यिअव्वरिश? हल फ़ी अलम हिनी?',
        exampleSentenceHindi: 'आपको कहाँ दर्द हो रहा है?'
      },
      'german': {
        word: 'die Schmerzen',
        phoneticHindi: 'दी श्मेर्तसेन',
        exampleSentence: 'Haben Sie hier Schmerzen?',
        examplePhoneticHindi: 'हाबेन जी हीयर श्मेर्तसेन?',
        exampleSentenceHindi: 'क्या आपको यहाँ दर्द हो रहा है?'
      },
      'japanese': {
        word: '痛い (いたい) / 痛み',
        phoneticHindi: 'इताई / इतामी',
        exampleSentence: 'どこか痛いところはありますか？',
        examplePhoneticHindi: 'दोको का इताई तोकोरो वा आरीमासु का?',
        exampleSentenceHindi: 'क्या आपको कहीं कोई दर्द है?'
      },
      'english': {
        word: 'Pain / Hurt',
        phoneticHindi: 'पेन / हर्ट',
        exampleSentence: 'Where does it hurt? Is it sharp pain?',
        examplePhoneticHindi: 'व्हेर डज़ इट हर्ट? इज़ इट शार्प पेन?',
        exampleSentenceHindi: 'कहाँ दर्द हो रहा है? क्या तेज दर्द है?'
      },
      'french': {
        word: 'la douleur / mal',
        phoneticHindi: 'ला दूलूर / माल',
        exampleSentence: 'Où avez-vous mal ?',
        examplePhoneticHindi: 'ऊ आवे वू माल?',
        exampleSentenceHindi: 'आपको कहाँ दर्द हो रहा है?'
      },
      'spanish': {
        word: 'el dolor',
        phoneticHindi: 'एल दोलोर',
        exampleSentence: '¿Dónde le duele exactamente?',
        examplePhoneticHindi: 'दोंदे ले दुएले एक्साक्तामेन्ते?',
        exampleSentenceHindi: 'आपको ठीक कहाँ दर्द हो रहा है?'
      }
    }
  },
  {
    id: 'h6',
    tradeId: 'healthcare',
    hindiTerm: 'पानी पीना',
    englishTerm: 'Drinking Water',
    importance: 'high',
    tags: ['daily', 'care'],
    translations: {
      'uae-arabic': {
        word: 'مَايْ / شُرْبْ المَاء',
        phoneticHindi: 'माय / माय अल-शुरब',
        exampleSentence: 'تَبْغِي تَشْرَبْ مَايْ بَارِدْ وَلَّا دَافِي؟',
        examplePhoneticHindi: 'तबग़ी तशरब माय बारिद वल्ला दाफ़ी?',
        exampleSentenceHindi: 'क्या आप ठंडा पानी पिएंगे या गुनगुना?'
      },
      'german': {
        word: 'das Wasser trinken',
        phoneticHindi: 'दास वासर त्रिकेन',
        exampleSentence: 'Möchten Sie ein Glas frisches Wasser trinken?',
        examplePhoneticHindi: 'मोइश्तेन जी आइन ग्लास फ्रिशेस वासर त्रिकेन?',
        exampleSentenceHindi: 'क्या आप एक गिलास ताज़ा पानी पीना चाहेंगे?'
      },
      'japanese': {
        word: 'お水 (おみず)',
        phoneticHindi: 'ओ-मिज़ू',
        exampleSentence: 'お水を少し飲みますか？',
        examplePhoneticHindi: 'ओ-मिज़ू ओ सुकोशी नोमीमासु का?',
        exampleSentenceHindi: 'क्या आप थोड़ा पानी पिएंगे?'
      },
      'english': {
        word: 'Water / Drink Water',
        phoneticHindi: 'वॉटर',
        exampleSentence: 'Please drink some warm water.',
        examplePhoneticHindi: 'प्लीज़ ड्रिंक सम वॉर्म वॉटर।',
        exampleSentenceHindi: 'कृपया थोड़ा गुनगुना पानी पिएं।'
      },
      'french': {
        word: "l'eau à boire",
        phoneticHindi: 'लो आ ब्वार',
        exampleSentence: 'Voulez-vous boire un peu d’eau ?',
        examplePhoneticHindi: 'वूले वू ब्वार अूँ प द ओ?',
        exampleSentenceHindi: 'क्या आप थोड़ा पानी पीना चाहते हैं?'
      },
      'spanish': {
        word: 'el agua para beber',
        phoneticHindi: 'एल आगुआ पारा बेबेर',
        exampleSentence: '¿Desea tomar un poco de agua?',
        examplePhoneticHindi: 'देसेआ तोमार उन पोको दे आगुआ?',
        exampleSentenceHindi: 'क्या आप थोड़ा पानी पीना चाहेंगे?'
      }
    }
  },
  {
    id: 'h7',
    tradeId: 'healthcare',
    hindiTerm: 'शौचालय / बाथरुम',
    englishTerm: 'Restroom / Toilet',
    importance: 'high',
    tags: ['care', 'daily'],
    translations: {
      'uae-arabic': {
        word: 'الحَمَّامْ / دَوْرَة المِيَاهْ',
        phoneticHindi: 'अल-हम्माम',
        exampleSentence: 'تَبْغِي تِرُوحْ الحَمَّامْ؟ أَنَا بَسَاعِدِكْ',
        examplePhoneticHindi: 'तबग़ी तिरूह अल-हम्माम? अना बसाअदिक',
        exampleSentenceHindi: 'क्या आप शौचालय जाना चाहते हैं? मैं मदद करता हूँ।'
      },
      'german': {
        word: 'die Toilette / das Badezimmer',
        phoneticHindi: 'दी त्वालेते / दास बाडे-त्सिमर',
        exampleSentence: 'Müssen Sie zur Toilette gehen?',
        examplePhoneticHindi: 'मुसेन जी त्सुर त्वालेते गेहेन?',
        exampleSentenceHindi: 'क्या आपको बाथरूम जाना है?'
      },
      'japanese': {
        word: 'お手洗い (おてあらい) / トイレ',
        phoneticHindi: 'ओतेआराई / तोइरे',
        exampleSentence: 'トイレに行きましょうか？お手伝いします。',
        examplePhoneticHindi: 'तोइरे नी इकीमाशौ का? ओ-तेत्सुदाई शिमासु।',
        exampleSentenceHindi: 'क्या बाथरूम चलें? मैं आपकी मदद करता हूँ।'
      },
      'english': {
        word: 'Toilet / Restroom',
        phoneticHindi: 'टॉयलेट / रेस्ट रूम',
        exampleSentence: 'Do you need to use the restroom? Let me assist you.',
        examplePhoneticHindi: 'डू यू नीड टू यूज़ द रेस्ट रूम? लेट मी असिस्ट यू।',
        exampleSentenceHindi: 'क्या आपको शौचालय जाना है? मैं आपकी सहायता करता हूँ।'
      },
      'french': {
        word: 'les toilettes',
        phoneticHindi: 'ले त्वालेत',
        exampleSentence: 'Avez-vous besoin d’aller aux toilettes ?',
        examplePhoneticHindi: 'आवे वू बेज़्वाँ दाले ओ त्वालेत?',
        exampleSentenceHindi: 'क्या आपको बाथरूम जाना है?'
      },
      'spanish': {
        word: 'el baño / servicio',
        phoneticHindi: 'एल बान्यो',
        exampleSentence: '¿Necesita ir al baño? Le ayudo.',
        examplePhoneticHindi: 'नेसेसिता ईर अल बान्यो? ले आयुदो।',
        exampleSentenceHindi: 'क्या आपको बाथरूम जाना है? मैं मदद करता हूँ।'
      }
    }
  },
  {
    id: 'h8',
    tradeId: 'healthcare',
    hindiTerm: 'बुखार / तापमान',
    englishTerm: 'Fever / Temperature',
    importance: 'high',
    tags: ['medical'],
    translations: {
      'uae-arabic': {
        word: 'حُمَّى / حَرَارَة',
        phoneticHindi: 'हुम्मा / हरारा (बुखार)',
        exampleSentence: 'خَلِّنِي أَقِيسْ حَرَارَتِكْ بِالمِقْيَاسْ',
        examplePhoneticHindi: 'खल्लिनी अक़ीस हरारतिक बिल-मिक़्यास',
        exampleSentenceHindi: 'थर्मामीटर से आपका बुखार नाप लेता हूँ।'
      },
      'german': {
        word: 'das Fieber / die Temperatur',
        phoneticHindi: 'दास फ़ीबर / दी तेम्परात्तूर',
        exampleSentence: 'Sie haben leichtes Fieber, ruhen Sie sich aus.',
        examplePhoneticHindi: 'जी हाबेन लाइश्टेस फ़ीबर, रूहेन जी ज़िश आउस।',
        exampleSentenceHindi: 'आपको हल्का बुखार है, कृपया आराम करें।'
      },
      'japanese': {
        word: '熱 (ねつ) / 体温',
        phoneticHindi: 'नेत्सू / ताईओन',
        exampleSentence: '体温を測りましょう。熱はありますか？',
        examplePhoneticHindi: 'ताईओन ओ हाकारीमाशौ। नेत्सू वा आरीमासु का?',
        exampleSentenceHindi: 'तापमान नापते हैं। क्या बुखार महसूस हो रहा है?'
      },
      'english': {
        word: 'Fever / Body Temperature',
        phoneticHindi: 'फीवर',
        exampleSentence: 'Let me check your temperature with the thermometer.',
        examplePhoneticHindi: 'लेट मी चेक योर टेम्परेचर विथ द थर्मामीटर।',
        exampleSentenceHindi: 'थर्मामीटर से आपका तापमान जांचने दीजिए।'
      },
      'french': {
        word: 'la fièvre / la température',
        phoneticHindi: 'ला फ़िएवर / ला तोंपेरात्यूर',
        exampleSentence: 'Je vais vérifier si vous avez de la fièvre.',
        examplePhoneticHindi: 'झ वे वेरीफ़िए सी वूज़ावे द ला फ़िएवर।',
        exampleSentenceHindi: 'मैं देखता हूँ कि क्या आपको बुखार है।'
      },
      'spanish': {
        word: 'la fiebre / temperatura',
        phoneticHindi: 'ला फिएब्रे',
        exampleSentence: 'Voy a tomarle la temperatura.',
        examplePhoneticHindi: 'वोय आ तोमारले ला तेम्परातुरा।',
        exampleSentenceHindi: 'मैं आपका तापमान नापूंगा।'
      }
    }
  },

  // -------------------------------------------------------------
  // TRADE 3: HOSPITALITY & KITCHEN (15 items)
  // -------------------------------------------------------------
  {
    id: 'k1',
    tradeId: 'hospitality',
    hindiTerm: 'मेन्यू / भोजन सूची',
    englishTerm: 'Menu Card',
    importance: 'high',
    tags: ['restaurant'],
    translations: {
      'uae-arabic': {
        word: 'قَائِمَة الطَّعَامْ / المِينْيُو',
        phoneticHindi: 'क़ायमत अत-ताम / मेन्यू',
        exampleSentence: 'تَفَضَّلْ هَذِي قَائِمَة الطَّعَامْ يَا طَوِيلْ العُمْرْ',
        examplePhoneticHindi: 'तफ़द्दल हाज़ी क़ायमत अत-ताम या तवील अल-उम्र',
        exampleSentenceHindi: 'लीजिए जनाब, यह भोजन सूची (मेन्यू) है।'
      },
      'german': {
        word: 'die Speisekarte',
        phoneticHindi: 'दी श्पाइज़े-कार्ते',
        exampleSentence: 'Hier ist die Speisekarte, bitte schön.',
        examplePhoneticHindi: 'हीयर इस्ट दी श्पाइज़े-कार्ते, बिटे शोन।',
        exampleSentenceHindi: 'यह रही मेन्यू सूची, कृपया देखें।'
      },
      'japanese': {
        word: 'メニュー (献立表)',
        phoneticHindi: 'मेन्यु',
        exampleSentence: 'メニューをお持ちいたしました。',
        examplePhoneticHindi: 'मेन्यु ओ ओ-मोची इताशीमाशिता।',
        exampleSentenceHindi: 'मैं मेन्यू कार्ड ले आया हूँ।'
      },
      'english': {
        word: 'Menu',
        phoneticHindi: 'मेन्यू',
        exampleSentence: 'Here is the food and drinks menu, sir.',
        examplePhoneticHindi: 'हियर इज़ द फ़ूड एंड ड्रिंक्स मेन्यू, सर।',
        exampleSentenceHindi: 'यह खाने और पेय पदार्थों का मेन्यू है, सर।'
      },
      'french': {
        word: 'le menu / la carte',
        phoneticHindi: 'ल मेन्यू / ला कार्ते',
        exampleSentence: 'Voici la carte du restaurant, monsieur.',
        examplePhoneticHindi: 'व्वासी ला कार्ते द्यु रेस्तोरों, मस्ये।',
        exampleSentenceHindi: 'यह रेस्तरां का मेन्यू है, श्रीमान।'
      },
      'spanish': {
        word: 'el menú / la carta',
        phoneticHindi: 'एल मेनू / ला कारता',
        exampleSentence: 'Aquí tiene la carta, por favor.',
        examplePhoneticHindi: 'आकी तिएने ला कारता, पोर फावोर।',
        exampleSentenceHindi: 'यह रहा मेन्यू, कृपया देखिए।'
      }
    }
  },
  {
    id: 'k2',
    tradeId: 'hospitality',
    hindiTerm: 'बिल / भुगतान पर्ची',
    englishTerm: 'Bill / Receipt',
    importance: 'high',
    tags: ['payment'],
    translations: {
      'uae-arabic': {
        word: 'الفَاتُورَة / الحِسَابْ',
        phoneticHindi: 'अल-फ़ास्तूरा / अल-हिसाब',
        exampleSentence: 'الحِسَابْ لَوْ سَمَحْتْ',
        examplePhoneticHindi: 'अल-हिसाब लव समह्त',
        exampleSentenceHindi: 'कृपया बिल लाइए।'
      },
      'german': {
        word: 'die Rechnung',
        phoneticHindi: 'दी रेश्नूंग',
        exampleSentence: 'Die Rechnung bitte, zusammen oder getrennt?',
        examplePhoneticHindi: 'दी रेश्नूंग बिटे, त्सुज़ामेन ओडर गेट्रेन्ट?',
        exampleSentenceHindi: 'कृपया बिल दीजिए, एक साथ या अलग-अलग?'
      },
      'japanese': {
        word: 'お会計 (おかいけい) / レシート',
        phoneticHindi: 'ओ-काइकेइ / रेशीतो',
        exampleSentence: 'お会計をお願いいたします。',
        examplePhoneticHindi: 'ओ-काइकेइ ओ ओनेगाई इताशीमासु।',
        exampleSentenceHindi: 'कृपया बिल दे दीजिए।'
      },
      'english': {
        word: 'Bill / Check',
        phoneticHindi: 'बिल / चेक',
        exampleSentence: 'Could I have the bill, please?',
        examplePhoneticHindi: 'कुड आई हैव द बिल, प्लीज़?',
        exampleSentenceHindi: 'कृपया क्या मुझे बिल मिल सकता है?'
      },
      'french': {
        word: "l'addition",
        phoneticHindi: 'लादिसियों',
        exampleSentence: "L'addition s'il vous plaît.",
        examplePhoneticHindi: 'लादिसियों सील वू प्ले।',
        exampleSentenceHindi: 'कृपया बिल ले आइए।'
      },
      'spanish': {
        word: 'la cuenta',
        phoneticHindi: 'ला कुएन्ता',
        exampleSentence: 'La cuenta, por favor.',
        examplePhoneticHindi: 'ला कुएन्ता, पोर फावोर।',
        exampleSentenceHindi: 'कृपया बिल लाइए।'
      }
    }
  },
  {
    id: 'k3',
    tradeId: 'hospitality',
    hindiTerm: 'साफ़-सफ़ाई / मेज साफ़ करना',
    englishTerm: 'Cleaning the Table',
    importance: 'medium',
    tags: ['cleaning'],
    translations: {
      'uae-arabic': {
        word: 'تَنْظِيفْ الطَّاوْلَة',
        phoneticHindi: 'तंज़ीफ़ अत-तावला',
        exampleSentence: 'نَظِّفْ الطَّاوْلَة رَقَمْ أَرْبَعَة بِسُرْعَة',
        examplePhoneticHindi: 'नज़्ज़िफ़ अत-तावला रक़म अरबा बिसुरअत',
        exampleSentenceHindi: 'टेबल नंबर 4 जल्दी से साफ़ कर दीजिए।'
      },
      'german': {
        word: 'den Tisch abwischen / reinigen',
        phoneticHindi: 'डेन टिश आप-विशेन',
        exampleSentence: 'Wischen Sie bitte Tisch Nummer vier sauber.',
        examplePhoneticHindi: 'विशेन जी बिटे टिश नुमर फ़ीर साउबर।',
        exampleSentenceHindi: 'कृपया टेबल नंबर चार को साफ़ करें।'
      },
      'japanese': {
        word: 'テーブルの掃除 / 拭く',
        phoneticHindi: 'तेबुरु नो सौजी / फुकू',
        exampleSentence: '4番テーブルをきれいに拭いてください。',
        examplePhoneticHindi: 'योन-बान तेबुरु ओ किरेइ नी फुइते कुदासाई।',
        exampleSentenceHindi: '4 नंबर टेबल को अच्छी तरह पोंछ दें।'
      },
      'english': {
        word: 'Clear and Clean the Table',
        phoneticHindi: 'क्लीन द टेबल',
        exampleSentence: 'Please wipe and sanitize table number four.',
        examplePhoneticHindi: 'प्लीज़ वाइप एंड सैनिटाइज़ टेबल नंबर फोर।',
        exampleSentenceHindi: 'कृपया 4 नंबर टेबल को पोंछकर साफ़ करें।'
      },
      'french': {
        word: 'nettoyer la table',
        phoneticHindi: 'नेत्त्वए ला ताबल',
        exampleSentence: 'Nettoyez la table numéro quatre s’il vous plaît.',
        examplePhoneticHindi: 'नेत्त्वए ला ताबल न्यूमेरॉ कात्र सील वू प्ले।',
        exampleSentenceHindi: 'कृपया टेबल नंबर चार साफ़ करें।'
      },
      'spanish': {
        word: 'limpiar la mesa',
        phoneticHindi: 'लिम्पिआर ला मेसा',
        exampleSentence: 'Limpie la mesa número cuatro rápidamente.',
        examplePhoneticHindi: 'लिम्पिए ला मेसा न्यूमेरॉ कुआत्रो रापिदामेन्ते।',
        exampleSentenceHindi: 'टेबल नंबर चार को तुरंत साफ़ करें।'
      }
    }
  },

  // -------------------------------------------------------------
  // TRADE 4: DRIVING, LOGISTICS & TRANSPORT (15 items)
  // -------------------------------------------------------------
  {
    id: 'd1',
    tradeId: 'driving',
    hindiTerm: 'दाएँ मुड़ें / बाएँ मुड़ें',
    englishTerm: 'Turn Right / Turn Left',
    importance: 'critical',
    tags: ['direction', 'driving'],
    translations: {
      'uae-arabic': {
        word: 'لِفْ يَمِينْ / لِفْ يَسَارْ',
        phoneticHindi: 'लिफ़ यमीन (दाएँ) / लिफ़ यसार (बाएँ)',
        exampleSentence: 'عِنْدَ الإِشَارَة لِفْ يَمِينْ عَلَى طُولْ',
        examplePhoneticHindi: 'इन्दल इशारा लिफ़ यमीन अला तूल',
        exampleSentenceHindi: 'ट्रैफिक लाइट पर तुरंत दाएँ मुड़ें।'
      },
      'german': {
        word: 'rechts abbiegen / links abbiegen',
        phoneticHindi: 'रेश्त्स आप-बीगन / लिंक्स आप-बीगन',
        exampleSentence: 'Biegen Sie an der Ampel rechts ab.',
        examplePhoneticHindi: 'बीगन जी आन डेर आम्पेल रेश्त्स आप।',
        exampleSentenceHindi: 'ट्रैफिक सिग्नल पर दाएँ मुड़ें।'
      },
      'japanese': {
        word: '右折 (うせつ) / 左折 (させつ)',
        phoneticHindi: 'मिगी (दाएं) / हिदारी (बाएं)',
        exampleSentence: '次の信号を右に曲がってください。',
        examplePhoneticHindi: 'त्सुगी नो शिनगोउ ओ मिगी नी माग़ात्ते कुदासाई।',
        exampleSentenceHindi: 'अगले सिग्नल पर दाएँ मुड़ें।'
      },
      'english': {
        word: 'Turn Right / Turn Left',
        phoneticHindi: 'टर्न राइट / टर्न लेफ्ट',
        exampleSentence: 'Turn right at the next traffic light.',
        examplePhoneticHindi: 'टर्न राइट ऐट द नेक्स्ट ट्रैफ़िक लाइट।',
        exampleSentenceHindi: 'अगली ट्रैफिक लाइट पर दाएँ मुड़ें।'
      },
      'french': {
        word: 'tourner à droite / à gauche',
        phoneticHindi: 'तूर्ने आ द्र्वात / आ गोश',
        exampleSentence: 'Tournez à droite au prochain feu tricolore.',
        examplePhoneticHindi: 'तूर्ने आ द्र्वात ओ प्रोशाँ फ ट्रिकोलोर।',
        exampleSentenceHindi: 'अगली बत्ती पर दाएँ मुड़ें।'
      },
      'spanish': {
        word: 'gire a la derecha / a la izquierda',
        phoneticHindi: 'खिरे आ ला देरेचा / आ ला इस्किर्दा',
        exampleSentence: 'Gire a la derecha en el semáforo.',
        examplePhoneticHindi: 'खिरे आ ला देरेचा एन एल सेमाफ़ोरो।',
        exampleSentenceHindi: 'सिग्नल पर दाएँ मुड़ें।'
      }
    }
  },
  {
    id: 'd2',
    tradeId: 'driving',
    hindiTerm: 'गाड़ी रोको / स्टॉप',
    englishTerm: 'Stop the Vehicle',
    importance: 'critical',
    tags: ['safety', 'driving'],
    translations: {
      'uae-arabic': {
        word: 'وَقِّفْ السَّيَّارَة / قِفْ',
        phoneticHindi: 'वक्किफ़ अस-सय्यारा (गाड़ी रोको)',
        exampleSentence: 'وَقِّفْ هِنِي عَلَى الجَنْبْ لَوْ سَمَحْتْ',
        examplePhoneticHindi: 'वक्किफ़ हिनी अलल जम्ब लव समह्त',
        exampleSentenceHindi: 'कृपया यहाँ किनारे गाड़ी रोकिए।'
      },
      'german': {
        word: 'das Fahrzeug anhalten / Stopp',
        phoneticHindi: 'दास फ़ारत्सोइग आनहाल्टेन / श्टॉप',
        exampleSentence: 'Halten Sie bitte das Auto am Rand an.',
        examplePhoneticHindi: 'हाल्टेन जी बिटे दास आउतो आम रांड आन।',
        exampleSentenceHindi: 'कृपया कार किनारे रोकिए।'
      },
      'japanese': {
        word: '停車 (ていしゃ) / 止まる',
        phoneticHindi: 'तोमारे / तोमेते',
        exampleSentence: '車を道の端に止めてください。',
        examplePhoneticHindi: 'कुरुमा ओ मिची नो हाशी नी तोमेते कुदासाई।',
        exampleSentenceHindi: 'सड़क के किनारे गाड़ी रोकें।'
      },
      'english': {
        word: 'Stop the Car / Park Here',
        phoneticHindi: 'स्टॉप द कार',
        exampleSentence: 'Please stop the vehicle on the side of the road.',
        examplePhoneticHindi: 'प्लीज़ स्टॉप द व्हीकल ऑन द साइड ऑफ़ द रोड।',
        exampleSentenceHindi: 'कृपया सड़क किनारे गाड़ी रोकें।'
      },
      'french': {
        word: 'arrêter le véhicule / stop',
        phoneticHindi: 'आरेते ल वेहिक्यूल',
        exampleSentence: 'Arrêtez la voiture sur le côté s’il vous plaît.',
        examplePhoneticHindi: 'आरेते ला व्वात्यूर सुर ल कोते सील वू प्ले।',
        exampleSentenceHindi: 'कृपया किनारे गाड़ी रोकें।'
      },
      'spanish': {
        word: 'detener el vehículo / parar',
        phoneticHindi: 'देतेनेर एल वेहीकुलो',
        exampleSentence: 'Detenga el vehículo a un lado de la calle.',
        examplePhoneticHindi: 'देतेन्गा एल वेहीकुलो आ उन लादो दे ला काये।',
        exampleSentenceHindi: 'सड़क किनारे गाड़ी रोकें।'
      }
    }
  },
  {
    id: 'd3',
    tradeId: 'driving',
    hindiTerm: 'माल लादना / उतारना (लोडिंग-अनलोडिंग)',
    englishTerm: 'Loading / Unloading',
    importance: 'high',
    tags: ['logistics', 'warehouse'],
    translations: {
      'uae-arabic': {
        word: 'تَحْمِيلْ / تَنْزِيلْ البَضَائِعْ',
        phoneticHindi: 'तहमील (लोडिंग) / तन्ज़ील (अनलोडिंग)',
        exampleSentence: 'نَزِّلْ الصَّنَادِيقْ فِي المَخْزَنْ',
        examplePhoneticHindi: 'नज़्ज़िल अस-सनादीक़ फ़िल मख़ज़न',
        exampleSentenceHindi: 'गोदाम में डिब्बे उतारिए।'
      },
      'german': {
        word: 'das Be- und Entladen',
        phoneticHindi: 'दास बे- उंड एंटलाडेन',
        exampleSentence: 'Laden Sie die Kisten im Lagerhaus ab.',
        examplePhoneticHindi: 'लाडेन जी दी किस्टेन इम लागरहाउस आप।',
        exampleSentenceHindi: 'वेयरहाउस में बक्से उतारें।'
      },
      'japanese': {
        word: '積み込み / 荷降ろし (におろし)',
        phoneticHindi: 'त्सुमिकोमी / निओरोशी',
        exampleSentence: '倉庫で荷物を降ろしてください。',
        examplePhoneticHindi: 'सोउको दे निमोत्सू ओ ओरोशिते कुदासाई।',
        exampleSentenceHindi: 'गोदाम में सामान उतारें।'
      },
      'english': {
        word: 'Loading / Unloading Cargo',
        phoneticHindi: 'लोडिंग एंड अनलोडिंग',
        exampleSentence: 'Unload all cartons carefully at dock number two.',
        examplePhoneticHindi: 'अनलोड ऑल कार्टन्स केयरफुली ऐट डॉक नंबर टू।',
        exampleSentenceHindi: 'डॉक नंबर 2 पर सभी डिब्बे ध्यान से उतारें।'
      },
      'french': {
        word: 'le chargement / déchargement',
        phoneticHindi: 'ल शार्शमाँ / देषार्शमाँ',
        exampleSentence: 'Déchargez les cartons dans l’entrepôt.',
        examplePhoneticHindi: 'देषार्शे ले कार्तों दाँ लोंत्रपो।',
        exampleSentenceHindi: 'गोदाम में बक्से उतारें।'
      },
      'spanish': {
        word: 'la carga y descarga',
        phoneticHindi: 'ला कारगा ई देस्कारगा',
        exampleSentence: 'Descargue las cajas en el almacén.',
        examplePhoneticHindi: 'देस्कारगे लास काखास एन एल आल्मासेन।',
        exampleSentenceHindi: 'गोदाम में बक्से उतारें।'
      }
    }
  },

  // -------------------------------------------------------------
  // TRADE 5: ELECTRICAL & PLUMBING (15 items)
  // -------------------------------------------------------------
  {
    id: 'e1',
    tradeId: 'electrical_plumbing',
    hindiTerm: 'बिजली का तार',
    englishTerm: 'Electric Wire',
    importance: 'high',
    tags: ['electrical'],
    translations: {
      'uae-arabic': {
        word: 'سِلْكْ كَهْرَبَاء',
        phoneticHindi: 'सिल्क कहरबा (बिजली का तार)',
        exampleSentence: 'اِفْصِلْ الكَهْرَبَاء قَبْلْ لَا تِلْمِسْ السِّلْكْ',
        examplePhoneticHindi: 'इफ़्सिल अल-कहरबा क़बल ला तिल्मीस अस-सिल्क',
        exampleSentenceHindi: 'तार छूने से पहले बिजली काट दें।'
      },
      'german': {
        word: 'das Stromkabel / der Draht',
        phoneticHindi: 'दास श्ट्रोम-काबल',
        exampleSentence: 'Schalten Sie den Strom ab, bevor Sie das Kabel anfassen.',
        examplePhoneticHindi: 'शाल्टेन जी डेन श्ट्रोम आप, बेफ़ोर जी दास काबल आनफ़ासेन।',
        exampleSentenceHindi: 'तार छूने से पहले बिजली का मेन स्विच बंद करें।'
      },
      'japanese': {
        word: '電線 (でんせん) / ケーブル',
        phoneticHindi: 'देन्सेन / केबुरु',
        exampleSentence: '電線に触る前にブレーカーを落としてください。',
        examplePhoneticHindi: 'देन्सेन नी सवाड़ू माए नी बुरेका ओ ओतोशिते कुदासाई।',
        exampleSentenceHindi: 'तार छूने से पहले मेन ब्रेकर बंद करें।'
      },
      'english': {
        word: 'Electric Cable / Wire',
        phoneticHindi: 'इलेक्ट्रिक वायर',
        exampleSentence: 'Turn off the main breaker before repairing the cable.',
        examplePhoneticHindi: 'टर्न ऑफ़ द मेन ब्रेकर बिफोर रिपेयरिंग द केबल।',
        exampleSentenceHindi: 'तार की मरम्मत करने से पहले मेन ब्रेकर बंद करें।'
      },
      'french': {
        word: 'le fil électrique / câble',
        phoneticHindi: 'ल फ़ील एलेक्त्रिक',
        exampleSentence: 'Coupez le courant avant de toucher le câble.',
        examplePhoneticHindi: 'कूपे ल कूरों आवाँ द तूशे ल काबल।',
        exampleSentenceHindi: 'तार छूने से पहले बिजली काटें।'
      },
      'spanish': {
        word: 'el cable eléctrico',
        phoneticHindi: 'एल काबले एलेक्त्रिको',
        exampleSentence: 'Corte la corriente antes de tocar los cables.',
        examplePhoneticHindi: 'कोर्ते ला कोर्रिएन्ते आंतेस दे तोकार लोस काबलेस।',
        exampleSentenceHindi: 'तार छूने से पहले करंट काटें।'
      }
    }
  },
  {
    id: 'e2',
    tradeId: 'electrical_plumbing',
    hindiTerm: 'पानी का पाइप व लीकेज (रिसाव)',
    englishTerm: 'Pipe & Water Leakage',
    importance: 'high',
    tags: ['plumbing'],
    translations: {
      'uae-arabic': {
        word: 'بِيبْ مَايْ / تَهْرِيبْ',
        phoneticHindi: 'बीब माय / तहरीब (लीकेज)',
        exampleSentence: 'فِي تَهْرِيبْ مَايْ فِي هَذَا البِيبْ، صَلِّحَه الحِينْ',
        examplePhoneticHindi: 'फ़ी तहरीब माय फ़ी हाज़ल बीब, सल्लिह अल-हीन',
        exampleSentenceHindi: 'इस पाइप में पानी का रिसाव है, इसे अभी ठीक करें।'
      },
      'german': {
        word: 'das Wasserrohr / das Leck',
        phoneticHindi: 'दास वासर-रोर / दास लेक',
        exampleSentence: 'Das Wasserrohr hat ein Leck, bitte reparieren.',
        examplePhoneticHindi: 'दास वासर-रोर हात आइन लेक, बिटे रेपारिएरेन।',
        exampleSentenceHindi: 'पानी के पाइप में लीकेज है, कृपया मरम्मत करें।'
      },
      'japanese': {
        word: '配管 (はいかん) / 水漏れ (みずもれ)',
        phoneticHindi: 'हाइकन / मिज़ू-मोरे',
        exampleSentence: '配管から水漏れしています。修理してください。',
        examplePhoneticHindi: 'हाइकन कारा मिज़ूमोरे शितेइमासु। श्यूउरी शिते कुदासाई।',
        exampleSentenceHindi: 'पाइप से पानी रिस रहा है। कृपया ठीक करें।'
      },
      'english': {
        word: 'Water Pipe / Leakage',
        phoneticHindi: 'वॉटर पाइप / लीकेज',
        exampleSentence: 'There is a water leak in this pipe; fix it with the wrench.',
        examplePhoneticHindi: 'देयर इज़ अ वॉटर लीक इन दिस पाइप; फिक्स इट विथ द रिंच।',
        exampleSentenceHindi: 'इस पाइप में रिसाव है; रिंच से इसे ठीक करें।'
      },
      'french': {
        word: "le tuyau d'eau / la fuite",
        phoneticHindi: 'ल त्वीयो दो / ला फ्वीत',
        exampleSentence: "Il y a une fuite dans le tuyau d'eau.",
        examplePhoneticHindi: 'इल या यून फ्वीत दाँ ल त्वीयो दो।',
        exampleSentenceHindi: 'पानी के पाइप में रिसाव है।'
      },
      'spanish': {
        word: 'la tubería de agua / la fuga',
        phoneticHindi: 'ला तुबेरीया / ला फ़ूगा',
        exampleSentence: 'Hay una fuga de agua en esta tubería.',
        examplePhoneticHindi: 'आय ऊना फ़ूगा दे आगुआ एन एस्ता तुबेरीया।',
        exampleSentenceHindi: 'इस पाइप में पानी का रिसाव है।'
      }
    }
  },

  // -------------------------------------------------------------
  // TRADE 6: SALARY, WORKPLACE & SURVIVAL (20 items)
  // -------------------------------------------------------------
  {
    id: 'w1',
    tradeId: 'workplace_salary',
    hindiTerm: 'वेतन / तनख्वाह',
    englishTerm: 'Monthly Salary / Wages',
    importance: 'critical',
    tags: ['finance', 'salary'],
    translations: {
      'uae-arabic': {
        word: 'الرَّاتِبْ / المَعَاشْ',
        phoneticHindi: 'अर-रातिब / अल-मआश (तनख्वाह)',
        exampleSentence: 'مَتَى يِنْزِلْ الرَّاتِبْ الشَّهْرِي فِي الحِسَابْ؟',
        examplePhoneticHindi: 'मता यिन्जिल अर-रातिब अश-शहरी फ़िल हिसाब?',
        exampleSentenceHindi: 'महीने की तनख्वाह बैंक खाते में कब आएगी?'
      },
      'german': {
        word: 'das Gehalt / der Monatslohn',
        phoneticHindi: 'दास गेहाल्ट / डेयर लोहन',
        exampleSentence: 'Das Gehalt wird am Monatsende überwiesen.',
        examplePhoneticHindi: 'दास गेहाल्ट विर्ड आम मोनाट्स-एन्डे युबर-वीज़ेन।',
        exampleSentenceHindi: 'वेतन महीने के अंत में बैंक खाते में भेज दिया जाएगा।'
      },
      'japanese': {
        word: '給料 (きゅうりょう) / 月給',
        phoneticHindi: 'क्यूउरियौ (सैलरी)',
        exampleSentence: '給料日は毎月25日です。',
        examplePhoneticHindi: 'क्यूउरियौ-बी वा माइत्सुकी निजूगो-निची देसु।',
        exampleSentenceHindi: 'वेतन हर महीने की 25 तारीख को मिलता है।'
      },
      'english': {
        word: 'Monthly Salary / Wages',
        phoneticHindi: 'मंथली सैलरी / वेजेज़',
        exampleSentence: 'When will the salary be deposited into my bank account?',
        examplePhoneticHindi: 'व्हेन विल द सैलरी बी डिपॉज़िटेड इंटू माय बैंक अकाउंट?',
        exampleSentenceHindi: 'मेरे बैंक खाते में तनख्वाह कब आएगी?'
      },
      'french': {
        word: 'le salaire mensuel',
        phoneticHindi: 'ल सालेर माँस्युएल',
        exampleSentence: 'Le salaire est versé à la fin du mois.',
        examplePhoneticHindi: 'ल सालेर ए वेर्से आ ला फ़ैं द्यु म्वाह।',
        exampleSentenceHindi: 'महीने के अंत में वेतन दिया जाता है।'
      },
      'spanish': {
        word: 'el salario / el sueldo',
        phoneticHindi: 'एल सालारिओ / एल सुएल्दो',
        exampleSentence: '¿Cuándo depositan el salario en la cuenta bancaria?',
        examplePhoneticHindi: 'कुआन्दो देपोसितान एल सालारिओ एन ला कुएन्ता बान्कारिया?',
        exampleSentenceHindi: 'खाते में वेतन कब जमा होता है?'
      }
    }
  },
  {
    id: 'w2',
    tradeId: 'workplace_salary',
    hindiTerm: 'ओवरटाइम (अतिरिक्त समय का काम)',
    englishTerm: 'Overtime Work',
    importance: 'high',
    tags: ['work', 'salary'],
    translations: {
      'uae-arabic': {
        word: 'شُغُلْ إِضَافِي / أُوفَرْ تَايْمْ',
        phoneticHindi: 'शुग़ल इजाफ़ी / ओवर टाइम',
        exampleSentence: 'هَلْ فِي شُغُلْ إِضَافِي اليَوْمْ؟',
        examplePhoneticHindi: 'हल फ़ी शुग़ल इजाफ़ी अल-यौम?',
        exampleSentenceHindi: 'क्या आज कोई अतिरिक्त काम (ओवरटाइम) है?'
      },
      'german': {
        word: 'die Überstunden',
        phoneticHindi: 'दी युबर-श्टुन्डेन',
        exampleSentence: 'Überstunden werden extra bezahlt.',
        examplePhoneticHindi: 'युबर-श्टुन्डेन वेर्डेन एक्स्ट्रा बेत्साह्लट।',
        exampleSentenceHindi: 'ओवरटाइम का अलग से भुगतान किया जाता है।'
      },
      'japanese': {
        word: '残業 (ざんぎょう)',
        phoneticHindi: 'ज़ांग्योउ (ओवरटाइम)',
        exampleSentence: '今日は2時間の残業があります。',
        examplePhoneticHindi: 'क्योउ वा नि-जिकाँ नो ज़ांग्योउ गा आरीमासु।',
        exampleSentenceHindi: 'आज 2 घंटे का ओवरटाइम है।'
      },
      'english': {
        word: 'Overtime Work',
        phoneticHindi: 'ओवरटाइम वर्क',
        exampleSentence: 'Overtime hours are counted at 1.5 times the rate.',
        examplePhoneticHindi: 'ओवरटाइम आवर्स आर काउंटेड ऐट वन पॉइंट फाइव टाइम्स द रेट।',
        exampleSentenceHindi: 'ओवरटाइम के घंटे डेढ़ गुना दर पर जोड़े जाते हैं।'
      },
      'french': {
        word: 'les heures supplémentaires',
        phoneticHindi: 'लेज़र स्युप्लेमोंतेर',
        exampleSentence: 'Les heures supplémentaires sont bien payées.',
        examplePhoneticHindi: 'लेज़र स्युप्लेमोंतेर सों बियों पेये।',
        exampleSentenceHindi: 'ओवरटाइम का अच्छा भुगतान मिलता है।'
      },
      'spanish': {
        word: 'las horas extras',
        phoneticHindi: 'लास ओरास एक्स्ट्रास',
        exampleSentence: '¿Hay horas extras disponibles esta semana?',
        examplePhoneticHindi: 'आय ओरास एक्स्ट्रास दिस्पोनीब्लेस एस्ता सेमाना?',
        exampleSentenceHindi: 'क्या इस हफ्ते ओवरटाइम उपलब्ध है?'
      }
    }
  },
  {
    id: 'w3',
    tradeId: 'workplace_salary',
    hindiTerm: 'छुट्टी / आराम का दिन',
    englishTerm: 'Day Off / Leave',
    importance: 'high',
    tags: ['work'],
    translations: {
      'uae-arabic': {
        word: 'إِجَازَة / يَوْمْ رَاحَة',
        phoneticHindi: 'इजाज़ा / यौम राहा',
        exampleSentence: 'يَوْمْ الجُمُعَة إِجَازَة رَسْمِيَّة لِلْجَمِيعْ',
        examplePhoneticHindi: 'यौम अल-जुमुआ इजाज़ा रस्मिया लिल-जमीअ',
        exampleSentenceHindi: 'शुक्रवार को सभी की आधिकारिक छुट्टी होती है।'
      },
      'german': {
        word: 'der Urlaub / der freie Tag',
        phoneticHindi: 'डेयर उरलाउब / फ्राइअर ताग',
        exampleSentence: 'Sonntag ist mein freier Tag.',
        examplePhoneticHindi: 'ज़ोनताग इस्ट माइन फ्राइअर ताग।',
        exampleSentenceHindi: 'रविवार मेरा छुट्टी का दिन है।'
      },
      'japanese': {
        word: '休日 (きゅうじつ) / 休み',
        phoneticHindi: 'यासुमी / क्यूउजित्सु',
        exampleSentence: '明日はお休みをいただけますか？',
        examplePhoneticHindi: 'अशिता वा ओ-यासुमी ओ इतादाकेमासु का?',
        exampleSentenceHindi: 'क्या कल मुझे छुट्टी मिल सकती है?'
      },
      'english': {
        word: 'Day Off / Leave',
        phoneticHindi: 'डे ऑफ़ / लीव',
        exampleSentence: 'Sunday is my weekly day off.',
        examplePhoneticHindi: 'संडे इज़ माय वीकली डे ऑफ़।',
        exampleSentenceHindi: 'रविवार मेरी साप्ताहिक छुट्टी है।'
      },
      'french': {
        word: 'le jour de congé / repos',
        phoneticHindi: 'ल शूर द कोँजे',
        exampleSentence: 'Dimanche est mon jour de repos.',
        examplePhoneticHindi: 'दिमांन्श ए मों शूर द रेपो।',
        exampleSentenceHindi: 'रविवार मेरा आराम का दिन है।'
      },
      'spanish': {
        word: 'el día libre / vacaciones',
        phoneticHindi: 'एल दीया लीब्रे',
        exampleSentence: 'El domingo es mi día libre semanal.',
        examplePhoneticHindi: 'एल दोमिंगो एस मी दीया लीब्रे सेमानाल।',
        exampleSentenceHindi: 'रविवार मेरा साप्ताहिक अवकाश है।'
      }
    }
  },

  // -------------------------------------------------------------
  // TRADE 7: EMERGENCY, POLICE & EMBASSY (15 items)
  // -------------------------------------------------------------
  {
    id: 'em1',
    tradeId: 'emergency',
    hindiTerm: 'मेरी मदद करो! / आपातकाल',
    englishTerm: 'Help Me! / Emergency',
    importance: 'critical',
    tags: ['emergency', 'safety'],
    translations: {
      'uae-arabic': {
        word: 'سَاعِدُونِي ! طَوَارِئْ',
        phoneticHindi: 'साअदूनी! तवारी (मदद करो!)',
        exampleSentence: 'سَاعِدُونِي ! فِي حَادِثْ هِنِي، اِتَّصِلْ عَلَى 999',
        examplePhoneticHindi: 'साअदूनी! फ़ी हादिस हिनी, इत्तसिल अला 999',
        exampleSentenceHindi: 'मदद करो! यहाँ दुर्घटना हुई है, 999 पर फोन करो।'
      },
      'german': {
        word: 'Hilfe! / Notfall',
        phoneticHindi: 'हिल्फे! / नोटफ़ाल',
        exampleSentence: 'Hilfe! Rufen Sie bitte sofort den Notarzt (112)!',
        examplePhoneticHindi: 'हिल्फे! रूफ़ेन जी बिटे सोफ़ोर्त डेन नोट-आर्त्स्त (112)!',
        exampleSentenceHindi: 'मदद करो! कृपया तुरंत आपातकालीन डॉक्टर को फोन करें (112)!'
      },
      'japanese': {
        word: '助けて！(たすけて) / 緊急 (きんきゅう)',
        phoneticHindi: 'तासुकेते! / किंक्यूउ',
        exampleSentence: '助けてください！救急車 (119) を呼んでください！',
        examplePhoneticHindi: 'तासुकेते कुदासाई! क्यूउक्यूउशा (119) ओ योन्दे कुदासाई!',
        exampleSentenceHindi: 'मेरी मदद करें! एम्बुलेंस (119) को बुलाएं!'
      },
      'english': {
        word: 'Help Me! / Emergency',
        phoneticHindi: 'हेल्प मी! / इमरजेंसी',
        exampleSentence: 'Help me! There is an emergency, call an ambulance immediately!',
        examplePhoneticHindi: 'हेल्प मी! देयर इज़ ऐन इमरजेंसी, कॉल ऐन एम्बुलेंस इमीडिएटली!',
        exampleSentenceHindi: 'मेरी मदद करें! आपातकाल है, तुरंत एम्बुलेंस बुलाएं!'
      },
      'french': {
        word: "Au secours ! / Urgence",
        phoneticHindi: 'ओ सेकूर ! / ऊरझाँस',
        exampleSentence: "Au secours ! Appelez une ambulance (15) !",
        examplePhoneticHindi: 'ओ सेकूर ! आपेले यून ऑँब्यूलाँस (15) !',
        exampleSentenceHindi: 'बचाओ! एम्बुलेंस (15) को बुलाओ!'
      },
      'spanish': {
        word: '¡Socorro! / ¡Ayuda! / Emergencia',
        phoneticHindi: 'सोकोरो! / आयुदा!',
        exampleSentence: '¡Ayuda por favor! Llame a una ambulancia (112).',
        examplePhoneticHindi: 'आयुदा पोर फावोर! यामे आ ऊना आम्बुलान्सिया।',
        exampleSentenceHindi: 'कृपया मदद करें! एम्बुलेंस को कॉल करें।'
      }
    }
  },
  {
    id: 'em2',
    tradeId: 'emergency',
    hindiTerm: 'भारतीय दूतावास / हेल्पलाइन',
    englishTerm: 'Indian Embassy / Consulate',
    importance: 'critical',
    tags: ['embassy', 'passport', 'rights'],
    translations: {
      'uae-arabic': {
        word: 'السِّفَارَة الهِنْدِيَّة',
        phoneticHindi: 'अस-सिफ़ारा अल-हिंदिया',
        exampleSentence: 'أَنَا أَبْغِي أَتَّصِلْ عَلَى السِّفَارَة الهِنْدِيَّة فِي أَبُوظَبِي',
        examplePhoneticHindi: 'अना अबग़ी अत्तसिल अलस सिफ़ारा अल-हिंदिया फ़ी अबू धाबी',
        exampleSentenceHindi: 'मुझे अबू धाबी में भारतीय दूतावास से संपर्क करना है।'
      },
      'german': {
        word: 'die Indische Botschaft',
        phoneticHindi: 'दी इंडिशे बोटशाफ़्ट',
        exampleSentence: 'Ich muss die Indische Botschaft in Berlin kontaktieren.',
        examplePhoneticHindi: 'इश मुस दी इंडिशे बोटशाफ़्ट इन बर्लिन कोन्ताक्तिएरेन।',
        exampleSentenceHindi: 'मुझे बर्लिन में भारतीय दूतावास से संपर्क करना है।'
      },
      'japanese': {
        word: 'インド大使館 (たいしかん)',
        phoneticHindi: 'इन्दो ताइशिकान',
        exampleSentence: '東京のインド大使館に連絡したいです。',
        examplePhoneticHindi: 'तोउक्योउ नो इन्दो ताइशिकान नी रेनराकु शिताई देसु।',
        exampleSentenceHindi: 'मुझे टोक्यो में भारतीय दूतावास से बात करनी है।'
      },
      'english': {
        word: 'Indian Embassy / Consulate',
        phoneticHindi: 'इंडियन एम्बेसी',
        exampleSentence: 'I need to contact the Indian Embassy for my passport assistance.',
        examplePhoneticHindi: 'आई नीड टू कांटेक्ट द इंडियन एम्बेसी फॉर माय पासपोर्ट असिस्टेंस।',
        exampleSentenceHindi: 'पासपोर्ट सहायता के लिए मुझे भारतीय दूतावास से संपर्क करना है।'
      },
      'french': {
        word: "l'Ambassade de l'Inde",
        phoneticHindi: 'लोंबासाद द लेंद',
        exampleSentence: "Je dois contacter l'Ambassade de l'Inde à Paris.",
        examplePhoneticHindi: 'झ दुआ कोन्ताक्ते लोंबासाद द लेंद आ पारी।',
        exampleSentenceHindi: 'मुझे पेरिस में भारतीय दूतावास से संपर्क करना है।'
      },
      'spanish': {
        word: 'la Embajada de la India',
        phoneticHindi: 'ला एम्बाखादा दे ला इंदिया',
        exampleSentence: 'Necesito contactar con la Embajada de la India.',
        examplePhoneticHindi: 'नेसेसितो कोन्ताक्तार कौन ला एम्बाखादा दे ला इंदिया।',
        exampleSentenceHindi: 'मुझे भारतीय दूतावास से संपर्क करना आवश्यक है।'
      }
    }
  },
  {
    id: 'em3',
    tradeId: 'emergency',
    hindiTerm: 'पासपोर्ट व वीज़ा',
    englishTerm: 'Passport & Work Visa',
    importance: 'critical',
    tags: ['documents', 'rights'],
    translations: {
      'uae-arabic': {
        word: 'جَوَاز السَّفَر وَالتَّأْشِيرَة',
        phoneticHindi: 'जवाज़ अस-सफ़र व ताशीरा',
        exampleSentence: 'جَوَاز سَفَرِي مَعِي دَايْمًا فِي مَكَانْ آمِنْ',
        examplePhoneticHindi: 'जवाज़ सफ़री मई दायमन फ़ी मकान आमिन',
        exampleSentenceHindi: 'मेरा पासपोर्ट हमेशा सुरक्षित स्थान पर मेरे पास रहता है।'
      },
      'german': {
        word: 'der Reisepass und das Visum',
        phoneticHindi: 'डेयर राइज़ेपास उंड दास वीज़ुम',
        exampleSentence: 'Hier sind mein Reisepass und mein Arbeitsvisum.',
        examplePhoneticHindi: 'हीयर ज़िंड माइन राइज़ेपास उंड माइन आरबाइट्स-वीज़ुम।',
        exampleSentenceHindi: 'यह मेरा पासपोर्ट और वर्क वीज़ा है।'
      },
      'japanese': {
        word: 'パスポートと就労ビザ (しゅうろうビザ)',
        phoneticHindi: 'पासुपोतो तो श्यूउरौ बीज़ा',
        exampleSentence: 'パスポートと在留カードを持参しています。',
        examplePhoneticHindi: 'पासुपोतो तो ज़ाइर्यूउ कादो ओ जिसान शितेइमासु।',
        exampleSentenceHindi: 'मेरे पास पासपोर्ट और रेजिडेंस कार्ड है।'
      },
      'english': {
        word: 'Passport and Work Visa',
        phoneticHindi: 'पासपोर्ट एंड वर्क वीज़ा',
        exampleSentence: 'Always keep a photocopy of your passport and work visa.',
        examplePhoneticHindi: 'ऑलवेज कीप अ फ़ोटोकॉपी ऑफ़ योर पासपोर्ट एंड वर्क वीज़ा।',
        exampleSentenceHindi: 'हमेशा अपने पासपोर्ट और वर्क वीज़ा की फोटोकॉपी अपने पास रखें।'
      },
      'french': {
        word: 'le passeport et visa de travail',
        phoneticHindi: 'ल पासपोर ए वीज़ा द त्रावाय',
        exampleSentence: 'Gardez votre passeport et visa en sécurité.',
        examplePhoneticHindi: 'गार्दे वोत्र पासपोर ए वीज़ा ऑँ सेक्युरिते।',
        exampleSentenceHindi: 'अपना पासपोर्ट और वीज़ा सुरक्षित रखें।'
      },
      'spanish': {
        word: 'el pasaporte y visa de trabajo',
        phoneticHindi: 'एल पासापोर्ते ई वीसा',
        exampleSentence: 'Guarde su pasaporte y visa en un lugar seguro.',
        examplePhoneticHindi: 'गुआर्दे सू पासापोर्ते ई वीसा एन उन लूगार सेगूरो।',
        exampleSentenceHindi: 'अपना पासपोर्ट और वीज़ा सुरक्षित स्थान पर रखें।'
      }
    }
  }
];
