export interface LanguageConfig {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  scriptName: string;
  description: string;
  levels: Array<'A1 - Absolute Beginner' | 'A2 - Elementary' | 'B1 - Intermediate' | 'B2 - Advanced'>;
  accentColor: string;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    id: 'uae-arabic',
    name: 'Emirati Arabic (Gulf / Khaleeji)',
    nativeName: 'اللهجة الإماراتية',
    flag: '🇦🇪',
    direction: 'rtl',
    scriptName: 'Arabic (العربية)',
    description: 'Learn authentic UAE colloquial dialect with diacritics, local expressions, and Emirati cultural norms.',
    levels: ['A1 - Absolute Beginner', 'A2 - Elementary', 'B1 - Intermediate', 'B2 - Advanced'],
    accentColor: '#10b981'
  },
  {
    id: 'french',
    name: 'French (Français)',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
    scriptName: 'Latin',
    description: 'Master contemporary French with conversational nuances, phonetic liaison, and etiquette rules.',
    levels: ['A1 - Absolute Beginner', 'A2 - Elementary', 'B1 - Intermediate', 'B2 - Advanced'],
    accentColor: '#3b82f6'
  },
  {
    id: 'japanese',
    name: 'Japanese (日本語)',
    nativeName: '日本語',
    flag: '🇯🇵',
    direction: 'ltr',
    scriptName: 'Kanji / Kana (漢字・仮名)',
    description: 'Explore Hiragana, Katakana, Kanji, polite Keigo registers, and Japanese Omotenashi hospitality.',
    levels: ['A1 - Absolute Beginner', 'A2 - Elementary', 'B1 - Intermediate', 'B2 - Advanced'],
    accentColor: '#ec4899'
  },
  {
    id: 'hindi',
    name: 'Hindi (हिन्दी)',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    direction: 'ltr',
    scriptName: 'Devanagari (देवनागरी)',
    description: 'Explore formal and conversational Hindi, polite honorifics (आप/तुम), and poetic idioms.',
    levels: ['A1 - Absolute Beginner', 'A2 - Elementary', 'B1 - Intermediate', 'B2 - Advanced'],
    accentColor: '#f59e0b'
  },
  {
    id: 'spanish',
    name: 'Spanish (Español)',
    nativeName: 'Español',
    flag: '🇪🇸',
    direction: 'ltr',
    scriptName: 'Latin',
    description: 'Learn conversational Castilian and Latin American Spanish with rich verb conjugation systems.',
    levels: ['A1 - Absolute Beginner', 'A2 - Elementary', 'B1 - Intermediate', 'B2 - Advanced'],
    accentColor: '#8b5cf6'
  },
  {
    id: 'german',
    name: 'German (Deutsch)',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    direction: 'ltr',
    scriptName: 'Latin',
    description: 'Master German sentence construction, grammatical cases (Nominativ, Akkusativ, Dativ), and compound words.',
    levels: ['A1 - Absolute Beginner', 'A2 - Elementary', 'B1 - Intermediate', 'B2 - Advanced'],
    accentColor: '#06b6d4'
  },
  {
    id: 'english',
    name: 'Workplace English (International)',
    nativeName: 'English (Workplace & Safety)',
    flag: '🇬🇧',
    direction: 'ltr',
    scriptName: 'Latin',
    description: 'Master practical workplace English, safety briefings, tool names, and global site instructions.',
    levels: ['A1 - Absolute Beginner', 'A2 - Elementary', 'B1 - Intermediate', 'B2 - Advanced'],
    accentColor: '#38bdf8'
  }
];

export interface LessonUnit {
  id: string;
  languageId: string;
  unitNumber: number;
  title: string;
  nativeTitle: string;
  theme: string;
  level: string;
  vocabulary: Array<{
    target: string;
    phonetic: string;
    english: string;
    pos: string;
    audioHint?: string;
  }>;
  dialogue: Array<{
    speaker: string;
    target: string;
    phonetic: string;
    english: string;
  }>;
  grammarNote: {
    rule: string;
    explanation: string;
    examples: Array<{ target: string; phonetic: string; english: string }>;
  };
  culturalTip: string;
}

export const SAMPLE_LESSONS: LessonUnit[] = [
  // 1. UAE Emirati Arabic Lesson
  {
    id: 'uae-lesson-1',
    languageId: 'uae-arabic',
    unitNumber: 1,
    title: 'Majlis Greetings & Warm Hospitalities',
    nativeTitle: 'الترحيب في المجلس الإماراتي',
    theme: 'Social Greetings & Majlis Protocol',
    level: 'A1 - Absolute Beginner',
    vocabulary: [
      { target: 'مَرْحَبَا السَّاعْ', phonetic: "Marhaba al-saa'", english: "A warm Emirati welcome ('Welcome at this hour')", pos: 'Greeting' },
      { target: 'شْحَالِكْ؟', phonetic: 'Sh-haalik?', english: 'How are you? (to a male)', pos: 'Phrase' },
      { target: 'شْحَالِجْ؟', phonetic: 'Sh-haalij?', english: 'How are you? (to a female)', pos: 'Phrase' },
      { target: 'طَيِّبْ / زَيْنْ', phonetic: 'Tayyib / Zayn', english: 'Good / Well / Fine', pos: 'Adjective' },
      { target: 'قَهْوَةْ عَرَبِيَّةْ', phonetic: 'Gahwa Arabiyya', english: 'Traditional Emirati cardamom coffee', pos: 'Noun' },
      { target: 'فَالِكْ طَيِّبْ', phonetic: 'Faalak tayyib', english: 'Your wish is granted with joy', pos: 'Idiom' },
      { target: 'مَشْكُورْ وَايِدْ', phonetic: 'Mashkoor wayed', english: 'Thank you very much (Gulf dialect)', pos: 'Phrase' }
    ],
    dialogue: [
      { speaker: 'Sultan (سلطان)', target: 'يَا مَرْحَبَا السَّاعْ! شْحَالِكْ يَا خُوي؟', phonetic: "Ya marhaba al-saa'! Sh-haalik ya khooy?", english: "A warm welcome! How are you, my brother?" },
      { speaker: 'Guest (الضيف)', target: 'الْحَمْدُ لِلَّهْ، طَيِّبْ وَطَابْ حَالِكْ. شْخْبَارْ الأَهْلْ؟', phonetic: "Alhamdulillah, tayyib wa taab haalik. Sh-akhbaar al-ahl?", english: "Praise be to God, well and blessed. How is the family?" },
      { speaker: 'Sultan (سلطان)', target: 'كِلِّهُمْ بِخَيْرْ وَنِعْمَةْ. تَفَضَّلْ اشْرَبْ فِنْيَانْ قَهْوَةْ.', phonetic: "Killehum bi-khayr wa ni'ma. Tfaddal ishrab finjaan gahwa.", english: "They are all in great health and grace. Please, have a finjan of fresh Gahwa." },
      { speaker: 'Guest (الضيف)', target: 'دَايْمَةْ إِنْ شَاءَ اللَّهْ، تَسْلَمْ إِيدِكْ.', phonetic: "Daayma insha'Allah, taslam eedak.", english: "May your home always be bountiful, bless your hands." }
    ],
    grammarNote: {
      rule: 'Emirati Gender Conjugations (ك vs ج)',
      explanation: 'In Gulf/Emirati Arabic, second-person suffix transforms: -ak (for male: شلونك / شحالك) becomes -ij or -ich (for female: شلونج / شحالج). The word "وايد" (Wayed) replaces Standard Arabic "كثيراً" (Katheeran).',
      examples: [
        { target: 'شْحَالِكْ يَا رَيَّالْ؟', phonetic: 'Sh-haalik ya rayyaal?', english: 'How are you, good man?' },
        { target: 'شْحَالِجْ يَا أُخْتِي؟', phonetic: 'Sh-haalij ya okhti?', english: 'How are you, my sister?' }
      ]
    },
    culturalTip: 'When receiving the Gahwa finjan, always accept it with your right hand. To signal you have had enough coffee, gently shake the finjan side to side before handing it back.'
  },

  // 2. French Lesson
  {
    id: 'fr-lesson-1',
    languageId: 'french',
    unitNumber: 1,
    title: 'Café Civility & Ordering in Paris',
    nativeTitle: 'Au Café Parisien',
    theme: 'Ordering food & Daily Civility',
    level: 'A1 - Absolute Beginner',
    vocabulary: [
      { target: 'Bonjour', phonetic: 'Bohn-zhoor', english: 'Good morning / Hello (Mandatory courtesy)', pos: 'Greeting' },
      { target: "S'il vous plaît", phonetic: 'Seel voo pleh', english: 'Please (polite / formal)', pos: 'Phrase' },
      { target: 'Un café crème', phonetic: 'Uhn kah-fay krehm', english: 'Coffee with steamed milk', pos: 'Noun' },
      { target: 'Un croissant chaud', phonetic: 'Uhn krwah-sahn shoh', english: 'A warm croissant', pos: 'Noun' },
      { target: "L'addition", phonetic: 'Lah-dee-syohn', english: 'The bill / check', pos: 'Noun' },
      { target: 'Du coup', phonetic: 'Dew koo', english: 'So / Consequently (Modern conversational connector)', pos: 'Connector' }
    ],
    dialogue: [
      { speaker: 'Server', target: 'Bonjour Monsieur, vous désirez ?', phonetic: 'Bohn-zhoor Muh-syuh, voo day-zee-ray?', english: 'Hello Sir, what would you like?' },
      { speaker: 'You', target: "Bonjour ! Un café crème et un croissant, s'il vous plaît.", phonetic: "Bohn-zhoor! Uhn kah-fay krehm ay uhn krwah-sahn, seel voo pleh.", english: "Hello! A café crème and a croissant, please." },
      { speaker: 'Server', target: "Très bien, je vous apporte ça tout de suite.", phonetic: "Treh byan, zhuh vooz ah-pohrt sah too duh sweet.", english: "Very well, I will bring that right away." },
      { speaker: 'You', target: "Merci beaucoup !", phonetic: "Mehr-see boh-koo!", english: "Thank you very much!" }
    ],
    grammarNote: {
      rule: 'Definite vs Indefinite Articles (Un/Une, Le/La)',
      explanation: 'French nouns have grammatical gender. Masculine uses "un" / "le" (un café, le croissant), whereas feminine uses "une" / "la" (une baguette, la table). Always learn nouns with their article.',
      examples: [
        { target: 'Un croissant et une brioche.', phonetic: 'Uhn krwah-sahn ay ewn bree-ohsh.', english: 'A croissant and a brioche.' }
      ]
    },
    culturalTip: 'In France, never begin speaking to a shopkeeper or waiter without first uttering a warm "Bonjour". It is considered the foundation of social respect.'
  },

  // 3. Japanese Lesson
  {
    id: 'ja-lesson-1',
    languageId: 'japanese',
    unitNumber: 1,
    title: 'Essential Greetings & Meeting People (Omotenashi)',
    nativeTitle: '初対面の挨拶とおもてなし',
    theme: 'Introductions, Politeness & Social Harmony',
    level: 'A1 - Absolute Beginner',
    vocabulary: [
      { target: '初めまして (はじめまして)', phonetic: 'Hajimemashite', english: 'Nice to meet you for the first time', pos: 'Greeting' },
      { target: 'よろしくお願いします', phonetic: 'Yoroshiku onegai shimasu', english: 'Please favor me / Looking forward to working with you', pos: 'Phrase' },
      { target: 'お元気ですか (おげんきですか)', phonetic: 'Ogenki desu ka', english: 'How are you?', pos: 'Question' },
      { target: 'お疲れ様です (おつかれさまです)', phonetic: 'Otsukaresama desu', english: 'Thank you for your hard work', pos: 'Phrase' },
      { target: '乾杯 (かんぱい)', phonetic: 'Kanpai', english: 'Cheers / Toast!', pos: 'Exclamation' },
      { target: 'すみません', phonetic: 'Sumimasen', english: 'Excuse me / Thank you / Sorry', pos: 'Phrase' }
    ],
    dialogue: [
      { speaker: 'Tanaka-san', target: '初めまして、田中です。よろしくお願いします。', phonetic: 'Hajimemashite, Tanaka desu. Yoroshiku onegai shimasu.', english: 'Nice to meet you, I am Tanaka. Pleased to make your acquaintance.' },
      { speaker: 'You', target: '初めまして、マイケルです。こちらこそ、よろしくお願いします！', phonetic: 'Hajimemashite, Maikeru desu. Kochira koso, yoroshiku onegai shimasu!', english: 'Nice to meet you, I am Michael. The pleasure is entirely mine!' },
      { speaker: 'Tanaka-san', target: '日本へようこそ！何か質問はありますか？', phonetic: 'Nihon e youkoso! Nanika shitsumon wa arimasu ka?', english: 'Welcome to Japan! Do you have any questions?' }
    ],
    grammarNote: {
      rule: 'Topic Marker Particle は (Wa) and Desu Copula',
      explanation: 'The particle は (written "ha", pronounced "wa") marks the topic of the sentence. "Desu" (です) acts as the polite copula (is/am/are).',
      examples: [
        { target: '私は学生です (わたしはがくせいです)', phonetic: 'Watashi wa gakusei desu.', english: 'I am a student.' }
      ]
    },
    culturalTip: 'When introducing yourself, give a gentle bow (Eshaku ~15 degrees). If exchanging business cards (Meishi), hold the card with both hands and never write on it in front of the giver.'
  },

  // 4. Hindi Lesson
  {
    id: 'hi-lesson-1',
    languageId: 'hindi',
    unitNumber: 1,
    title: 'Respectful Greetings & Daily Conversation',
    nativeTitle: 'नमस्ते एवं दैनिक शिष्टाचार',
    theme: 'Polite Conversation & Culture of Atithi Devo Bhava',
    level: 'A1 - Absolute Beginner',
    vocabulary: [
      { target: 'नमस्ते / नमस्कार', phonetic: 'Namaste / Namaskar', english: 'Traditional respectful greeting (I bow to the divine in you)', pos: 'Greeting' },
      { target: 'आप कैसे हैं?', phonetic: 'Aap kaise hain?', english: 'How are you? (Polite/Formal)', pos: 'Question' },
      { target: 'मैं बहुत अच्छा हूँ', phonetic: 'Main bahut achha hoon', english: 'I am very well / good', pos: 'Phrase' },
      { target: 'धन्यवाद / शुक्रिया', phonetic: 'Dhanyavaad / Shukriya', english: 'Thank you', pos: 'Phrase' },
      { target: 'कृपया', phonetic: 'Kripya', english: 'Please', pos: 'Adverb' },
      { target: 'कोई बात नहीं', phonetic: 'Koi baat nahi', english: 'No problem / It does not matter', pos: 'Phrase' }
    ],
    dialogue: [
      { speaker: 'Host (मेजबान)', target: 'नमस्ते! आपका हमारे यहाँ स्वागत है। आप कैसे हैं?', phonetic: 'Namaste! Aapka hamare yahan swagat hai. Aap kaise hain?', english: 'Namaste! Welcome to our home. How are you?' },
      { speaker: 'Guest (अतिथि)', target: 'नमस्ते जी! मैं बिल्कुल ठीक हूँ। आप कैसे हैं?', phonetic: 'Namaste ji! Main bilkul theek hoon. Aap kaise hain?', english: 'Namaste ji! I am doing very well. How are you?' },
      { speaker: 'Host (मेजबान)', target: 'सब ईश्वर की कृपा है। कृपया बैठिए और चाय पीजिए।', phonetic: 'Sab Ishwar ki kripa hai. Kripya baithiye aur chai peejiye.', english: 'All is by grace. Please have a seat and enjoy fresh tea.' }
    ],
    grammarNote: {
      rule: 'Honorific Registers: आप (Aap) vs तुम (Tum) vs तू (Tu)',
      explanation: 'Hindi possesses distinct levels of respect. Always use "आप" (Aap) with elders, teachers, professionals, and strangers. The suffix "जी" (Ji) can be attached to names (e.g. Sharma ji) to show profound respect.',
      examples: [
        { target: 'आप क्या कर रहे हैं?', phonetic: 'Aap kya kar rahe hain?', english: 'What are you doing? (Respectful)' }
      ]
    },
    culturalTip: 'Fold your hands together in the Namaste gesture at chest level when greeting someone. Touching the feet of elders (Charan Sparsh) is a revered tradition seeking blessings.'
  }
];

export interface FlashcardItem {
  id: string;
  languageId: string;
  front: string;
  phoneticHindi?: string;
  phonetic: string;
  backHindi?: string;
  back: string;
  categoryHindi?: string;
  category: string;
  level: string;
  exampleSentence: {
    target: string;
    phoneticHindi?: string;
    phonetic: string;
    translationHindi?: string;
    translation: string;
  };
  notesHindi?: string;
  notes: string;
  streak: number;
  nextReviewDate?: string;
}

export const INITIAL_FLASHCARDS: FlashcardItem[] = [
  // --- UAE / Gulf Arabic Flashcards ---
  {
    id: 'fc-uae-1',
    languageId: 'uae-arabic',
    front: 'السَّلامُ عَلَيْكُمْ',
    phoneticHindi: 'अस-सलामु अलैकुम',
    phonetic: 'As-salaamu alaykum',
    backHindi: 'आप पर शांति हो (नमस्ते / आदाब)',
    back: 'Peace be upon you (Universal Greeting)',
    categoryHindi: '👋 नमस्ते व अभिवादन',
    category: 'Greetings',
    level: 'Beginner',
    exampleSentence: {
      target: 'السَّلامُ عَلَيْكُمْ، صَبَاحُ الْخَيْرِ يَا صَاحِبِي',
      phoneticHindi: 'अस-सलामु अलैकुम, सबाहुल खैरि या साहिबी',
      phonetic: "As-salaamu alaykum, sabaah al-khayr ya saahibi",
      translationHindi: 'नमस्ते, शुभ प्रभात मेरे साथी!',
      translation: 'Peace be upon you, good morning my friend!'
    },
    notesHindi: 'गल्फ देशों में किसी से भी मिलते ही पहला शब्द यह बोलें। उत्तर में "व अलैकुम अस-सलाम" मिलता है।',
    notes: 'Universal polite greeting in Gulf region.',
    streak: 3
  },
  {
    id: 'fc-uae-2',
    languageId: 'uae-arabic',
    front: 'دِيرْ بَالِكْ',
    phoneticHindi: 'दीर बालिक',
    phonetic: 'Deer baalak',
    backHindi: 'सावधान रहो! / ध्यान से! (सुरक्षा चेतावनी)',
    back: 'Watch out / Be careful (Safety Warning)',
    categoryHindi: '🦺 साइट सुरक्षा व सावधानी',
    category: 'Safety & Tools',
    level: 'Beginner',
    exampleSentence: {
      target: 'دِيرْ بَالِكْ! هُنَاكَ كَرِينْ يَرْفَعُ حَمُولَةً',
      phoneticHindi: 'दीर बालिक! हुनाका क्रेन यर्फ़उ हमूलतन',
      phonetic: 'Deer baalak! Hunaaka crane yarfa\'u hamoolatan',
      translationHindi: 'सावधान! वहाँ क्रेन भारी वजन उठा रही है।',
      translation: 'Be careful! There is a crane lifting load there.'
    },
    notesHindi: 'साइट पर खतरा होने या भारी सामान हिलते समय यह चेतावनी सबसे ज्यादा बोली जाती है।',
    notes: 'Critical safety phrase on construction and industrial sites.',
    streak: 2
  },
  {
    id: 'fc-uae-3',
    languageId: 'uae-arabic',
    front: 'حَاضِرْ يَا مُعَلِّمْ',
    phoneticHindi: 'हाज़िर या मुअल्लिम',
    phonetic: "Haadir ya mu'allim",
    backHindi: 'जी हाँ उस्ताद जी / काम हो जाएगा',
    back: 'Yes Master / Ready to execute (Affirmative)',
    categoryHindi: '🛠️ फोरमैन व काम का आदेश',
    category: 'Workplace Orders',
    level: 'Beginner',
    exampleSentence: {
      target: 'حَاضِرْ يَا مُعَلِّمْ، سَأَبْدَأُ خَلْطَ الإِسْمَنْتِ حَالاً',
      phoneticHindi: 'हाज़िर या मुअल्लिम, सबदउ खल्तल इसमंति हालन',
      phonetic: "Haadir ya mu'allim, sa'abda'u khalt al-ismant haalan",
      translationHindi: 'हाँ उस्ताद जी, मैं अभी तुरंत सीमेंट मिलाना शुरू करता हूँ।',
      translation: 'Yes master, I will start mixing cement immediately.'
    },
    notesHindi: 'फोरमैन या सीनियर मिस्त्री को "मुअल्लिम" (उस्ताद) कहकर बुलाना गल्फ में बहुत सम्मानजनक माना जाता है।',
    notes: 'Respectful way to acknowledge work tasks from supervisors.',
    streak: 4
  },
  {
    id: 'fc-uae-4',
    languageId: 'uae-arabic',
    front: 'خُوذَة وَحِذَاءُ السَّلامَة',
    phoneticHindi: 'खूज़ा व हिज़ाउस-सलामा',
    phonetic: "Khoodha wa hidha' as-salaama",
    backHindi: 'सेफ्टी हेलमेट और सेफ्टी जूते',
    back: 'Safety Helmet & Safety Shoes (PPE)',
    categoryHindi: '🦺 साइट सुरक्षा व सावधानी',
    category: 'Safety & Tools',
    level: 'Beginner',
    exampleSentence: {
      target: 'ارْتَدِ الْخُوذَةَ وَحِذَاءَ السَّلامَةِ قَبْلَ دُخُولِ الْمَوْقِعِ',
      phoneticHindi: 'इर्तदिल खूज़ता व हिज़ाअस-सलामति कब्ल दुखूलिल मौकिअ',
      phonetic: "Irtadi al-khoodhata wa hidha' as-salaamati qabla dukhooil al-mawqi'",
      translationHindi: 'साइट में घुसने से पहले हेलमेट और सेफ्टी जूते पहनें।',
      translation: 'Wear helmet and safety shoes before entering the site.'
    },
    notesHindi: 'गल्फ में बिना खूज़ा (हेलमेट) के साइट पर जाना कानूनी अपराध है और भारी जुर्माना हो सकता है।',
    notes: 'Mandatory PPE items required on all Gulf job sites.',
    streak: 3
  },
  {
    id: 'fc-uae-5',
    languageId: 'uae-arabic',
    front: 'الرَّاتِبْ وَالأُوفَرْتَايِمْ',
    phoneticHindi: 'अर-रातिब वल-ओवरटाइम',
    phonetic: 'Ar-raatib wal-overtime',
    backHindi: 'महीने का वेतन और अतिरिक्त समय (सैलरी व ओवरटाइम)',
    back: 'Monthly Salary & Overtime Allowance',
    categoryHindi: '💵 वेतन, बैंक व इकामा',
    category: 'Salary & Banking',
    level: 'Beginner',
    exampleSentence: {
      target: 'مَتَى سَيَنْزِلُ الرَّاتِبُ فِي الْبَنْكِ يَا مُدِيرْ؟',
      phoneticHindi: 'मता सयन्ज़िलुर रातिबु फिल बंकि या मुदीर?',
      phonetic: 'Mata sayanzilu ar-raatibu fil banki ya mudeer?',
      translationHindi: 'मैनेजर साहब, बैंक खाते में सैलरी कब तक आएगी?',
      translation: 'When will the salary be deposited in the bank, manager?'
    },
    notesHindi: 'रातिब = पगार/मजदूरी। गल्फ में सैलरी WPS बैंक कार्ड में आती है।',
    notes: 'Essential vocabulary for salary and compensation discussions.',
    streak: 1
  },

  // --- Japanese Flashcards ---
  {
    id: 'fc-ja-1',
    languageId: 'japanese',
    front: 'おはようございます',
    phoneticHindi: 'ओहायो गोज़ाइमास',
    phonetic: 'Ohayou gozaimasu',
    backHindi: 'शुभ प्रभात / नमस्ते (सुबह का अभिवादन)',
    back: 'Good morning (Polite Morning Greeting)',
    categoryHindi: '👋 नमस्ते व अभिवादन',
    category: 'Greetings',
    level: 'Beginner',
    exampleSentence: {
      target: '皆さん、おはようございます！今日も一日ご安全に！',
      phoneticHindi: 'मिना-सान, ओहायो गोज़ाइमास! क्यो मो इचि-निचि गो-आन्ज़ेन नी!',
      phonetic: 'Minasan, ohayou gozaimasu! Kyou mo ichi-nichi go-anzen ni!',
      translationHindi: 'आप सभी को शुभ प्रभात! आज भी दिनभर सुरक्षित काम करें!',
      translation: 'Good morning everyone! Stay safe at work all day today!'
    },
    notesHindi: 'जापान में सुबह फैक्ट्री पहुंचते ही झुककर पूरे जोश के साथ यह बोलना सम्मान की निशानी है।',
    notes: 'Standard morning greeting at factories and job sites in Japan.',
    streak: 4
  },
  {
    id: 'fc-ja-2',
    languageId: 'japanese',
    front: 'お疲れ様でした',
    phoneticHindi: 'ओत्सुकारेसामा देशिता',
    phonetic: 'Otsukaresama deshita',
    backHindi: 'आज के कठिन परिश्रम के लिए बहुत-बहुत धन्यवाद!',
    back: 'Thank you for your hard work today (Shift End)',
    categoryHindi: '🏢 कार्यस्थल शिष्टाचार',
    category: 'Workplace Etiquette',
    level: 'Beginner',
    exampleSentence: {
      target: '今日の作業は終了です。お疲れ様でした！',
      phoneticHindi: 'क्यो नो साग्यो वा शूर्र्यो देस. ओत्सुकारेसामा देशिता!',
      phonetic: 'Kyou no sagyou wa shuuryou desu. Otsukaresama deshita!',
      translationHindi: 'आज का काम पूरा हुआ। आप सभी का बहुत धन्यवाद!',
      translation: 'Today\'s work is complete. Thank you for your hard work!'
    },
    notesHindi: 'शाम को काम खत्म करके निकलते समय अपने साथी और सुपरवाइज़र को यह अवश्य बोलें।',
    notes: 'Universal phrase said at the end of the shift or workday.',
    streak: 5
  },
  {
    id: 'fc-ja-3',
    languageId: 'japanese',
    front: '安全帯とヘルメット',
    phoneticHindi: 'आन्ज़ेन्ताई तो हेरुमेत्तो',
    phonetic: 'Anzentai to herumetto',
    backHindi: 'सेफ्टी बेल्ट (हार्नेस) और हेलमेट',
    back: 'Safety Harness & Hard Hat (PPE)',
    categoryHindi: '🦺 साइट सुरक्षा व सावधानी',
    category: 'Safety & Tools',
    level: 'Beginner',
    exampleSentence: {
      target: '高所作業では安全帯をフックに必ず掛けてください。',
      phoneticHindi: 'कोउशो साग्यो देवा आन्ज़ेन्ताई ओ हुक्कु नी कानाराजु काकेते कुदासाइ.',
      phonetic: 'Kousho sagyou dewa anzentai o fukku ni kanarazu kakete kudasai.',
      translationHindi: 'ऊंचाई पर काम करते समय सेफ्टी बेल्ट का हुक अवश्य फंसाएं।',
      translation: 'Please make sure to hook the safety harness during high work.'
    },
    notesHindi: 'जापान में कंस्ट्रक्शन और फैक्ट्री में "आन्ज़ेन दाइइची" (सुरक्षा पहले) का सख्त नियम है।',
    notes: 'Crucial PPE gear for technical interns and construction workers in Japan.',
    streak: 3
  },
  {
    id: 'fc-ja-4',
    languageId: 'japanese',
    front: 'よろしくお願いします',
    phoneticHindi: 'योरोशिकु ओनेगाइ शिमास',
    phonetic: 'Yoroshiku onegai shimasu',
    backHindi: 'कृपया मेरा मार्गदर्शन करें / आपके सहयोग की आशा है',
    back: 'Please guide me / Looking forward to working together',
    categoryHindi: '🏢 कार्यस्थल शिष्टाचार',
    category: 'Workplace Etiquette',
    level: 'Beginner',
    exampleSentence: {
      target: '今日から現場に入ります。よろしくお願いします！',
      phoneticHindi: 'क्यो कारा गेम्बा नी हाइरिमास. योरोशिकु ओनेगाइ शिमास!',
      phonetic: 'Kyou kara gemba ni hairimasu. Yoroshiku onegai shimasu!',
      translationHindi: 'आज से मैं साइट पर काम शुरू कर रहा हूँ। कृपया मार्गदर्शन करें!',
      translation: 'I am joining the site today. Looking forward to your guidance!'
    },
    notesHindi: 'जब भी किसी नए सुपरवाइज़र से मिलें या नया काम शुरू करें, यह वाक्य जरूर बोलें।',
    notes: 'Essential introductory and cooperative phrase across all Japanese trades.',
    streak: 4
  },

  // --- German Flashcards ---
  {
    id: 'fc-de-1',
    languageId: 'german',
    front: 'Guten Morgen',
    phoneticHindi: 'गुटन मोर्गन',
    phonetic: 'Goo-ten mor-gen',
    backHindi: 'शुभ प्रभात / नमस्ते (सुबह का अभिवादन)',
    back: 'Good morning (Polite Morning Greeting)',
    categoryHindi: '👋 नमस्ते व अभिवादन',
    category: 'Greetings',
    level: 'Beginner',
    exampleSentence: {
      target: 'Guten Morgen Herr Meister, die Werkzeuge sind bereit.',
      phoneticHindi: 'गुटन मोर्गन हेर माइस्टर, डी वेर्कत्ज़ॉइगे ज़िंद बेराइट.',
      phonetic: 'Goo-ten mor-gen hehr my-ster, dee vehrk-tsoy-geh zint beh-ryte.',
      translationHindi: 'नमस्ते उस्ताद जी, सभी औजार तैयार हैं।',
      translation: 'Good morning master, the tools are ready.'
    },
    notesHindi: 'जर्मनी में सुबह 11 बजे तक "Guten Morgen" बोला जाता है।',
    notes: 'Standard polite morning greeting in Germany.',
    streak: 3
  },
  {
    id: 'fc-de-2',
    languageId: 'german',
    front: 'Sicherheitsschuhe und Helm',
    phoneticHindi: 'ज़िशरहाइट्स-शूहे उंड हेल्म',
    phonetic: 'Zee-sher-hytes-shoo-heh oont helm',
    backHindi: 'सुरक्षा जूते (स्टील टो) और हेलमेट',
    back: 'Safety Shoes & Helmet (PPE)',
    categoryHindi: '🦺 साइट सुरक्षा व सावधानी',
    category: 'Safety & Tools',
    level: 'Beginner',
    exampleSentence: {
      target: 'In der Werkstatt muss man immer Sicherheitsschuhe tragen.',
      phoneticHindi: 'इन डेर वेर्कश्टाट मुस मान इम्मर ज़िशरहाइट्स-शूहे ट्रागेन.',
      phonetic: 'In dehr vehrk-shtaht moos mahn im-mer zee-sher-hytes-shoo-heh trah-gen.',
      translationHindi: 'वर्कशॉप में हमेशा सेफ्टी जूते पहनना अनिवार्य है।',
      translation: 'In the workshop, you must always wear safety shoes.'
    },
    notesHindi: 'जर्मनी में बिना PSA (पर्सनल प्रोटेक्टिव इक्विपमेंट) के काम करना पूरी तरह मना है।',
    notes: 'Mandatory PPE for technicians and mechanics in Germany.',
    streak: 2
  },
  {
    id: 'fc-de-3',
    languageId: 'german',
    front: 'Vorsicht! Gefahr!',
    phoneticHindi: 'फोरज़िश्ट! गेफार!',
    phonetic: 'For-zikht! Geh-fahr!',
    backHindi: 'सावधान! यहाँ खतरा है!',
    back: 'Caution! Danger! (Warning Sign)',
    categoryHindi: '🦺 साइट सुरक्षा व सावधानी',
    category: 'Safety & Tools',
    level: 'Beginner',
    exampleSentence: {
      target: 'Vorsicht! Hochspannung an diesem Schaltkasten!',
      phoneticHindi: 'फोरज़िश्ट! होखशपानूंग आन दीज़म शाल्टकास्टन!',
      phonetic: 'For-zikht! Hohkh-shpan-noong ahn dee-zem shahlt-kahs-ten!',
      translationHindi: 'सावधान! इस स्विचबोर्ड पर हाई वोल्टेज करंट है!',
      translation: 'Caution! High voltage at this control box!'
    },
    notesHindi: 'फैक्ट्री या कंस्ट्रक्शन में पीले त्रिकोण वाले बोर्ड पर "Vorsicht" लिखा होता है।',
    notes: 'Critical hazard warning term in German workshops.',
    streak: 4
  },

  // --- Workplace English Flashcards ---
  {
    id: 'fc-en-1',
    languageId: 'english',
    front: 'Safety Harness & Double Lanyard',
    phoneticHindi: 'सेफ्टी हार्नेस एंड डबल लैनयार्ड',
    phonetic: 'Safety Harness & Double Lanyard',
    backHindi: 'सुरक्षा बेल्ट (हार्नेस) और दोहरे हुक वाली रस्सी',
    back: 'Full Body Fall Protection Harness & Double Lanyard',
    categoryHindi: '🦺 साइट सुरक्षा व सावधानी',
    category: 'Safety & Tools',
    level: 'Beginner',
    exampleSentence: {
      target: 'Always hook your double lanyard when working on scaffolding above 2 meters.',
      phoneticHindi: 'ऑलवेज़ हुक योर डबल लैनयार्ड व्हेन वर्किंग ऑन स्कैफोल्डिंग अबव 2 मीटर्स.',
      phonetic: 'Always hook your double lanyard when working on scaffolding above 2 meters.',
      translationHindi: '2 मीटर से ऊपर मचान पर काम करते समय हमेशा सेफ्टी हार्नेस का हुक फंसाएं।',
      translation: 'Always hook your double lanyard when working on scaffolding above 2 meters.'
    },
    notesHindi: 'ऊंचाई पर काम (Working at Height) में सुरक्षा बेल्ट जीवन रक्षक है।',
    notes: 'Standard 100% tie-off fall protection gear internationally.',
    streak: 3
  },
  {
    id: 'fc-en-2',
    languageId: 'english',
    front: 'Toolbox Talk (TBT)',
    phoneticHindi: 'टूलबॉक्स टॉक (टी.बी.टी.)',
    phonetic: 'Toolbox Talk',
    backHindi: 'दैनिक 10 मिनट की सुरक्षा चर्चा व बैठक',
    back: 'Daily Morning Pre-Shift Safety Briefing',
    categoryHindi: '🦺 साइट सुरक्षा व सावधानी',
    category: 'Safety & Tools',
    level: 'Beginner',
    exampleSentence: {
      target: 'Attend the morning toolbox talk before starting any electrical or hot work.',
      phoneticHindi: 'अटेंड द मॉर्निंग टूलबॉक्स टॉक बिफोर स्टार्टिंग एनी इलेक्ट्रिकल ऑर हॉट वर्क.',
      phonetic: 'Attend the morning toolbox talk before starting any electrical or hot work.',
      translationHindi: 'बिजली या वेल्डिंग का काम शुरू करने से पहले सुबह की टूलबॉक्स टॉक में भाग लें।',
      translation: 'Attend the morning toolbox talk before starting any electrical or hot work.'
    },
    notesHindi: 'हर अंतरराष्ट्रीय साइट पर काम शुरू होने से पहले सेफ्टी ऑफिसर टूलबॉक्स टॉक लेते हैं।',
    notes: 'Mandatory morning safety briefing on all mega projects.',
    streak: 4
  },
  {
    id: 'fc-en-3',
    languageId: 'english',
    front: 'Permit To Work (PTW)',
    phoneticHindi: 'परमिट टू वर्क (पी.टी.डब्ल्यू.)',
    phonetic: 'Permit To Work',
    backHindi: 'कार्य करने की अनुमति पत्र (वर्क परमिट)',
    back: 'Official Safety Authorization Document for Hazardous Tasks',
    categoryHindi: '📝 वर्क परमिट व लेबर नियम',
    category: 'Permits & Laws',
    level: 'Beginner',
    exampleSentence: {
      target: 'Do not enter the confined space without a signed permit to work.',
      phoneticHindi: 'डू नॉट एंटर द कन्फाइंड स्पेस विदाउट अ साइन्ड परमिट टू वर्क.',
      phonetic: 'Do not enter the confined space without a signed permit to work.',
      translationHindi: 'हस्ताक्षर युक्त वर्क परमिट के बिना बंद गड्ढे या टैंक में प्रवेश न करें।',
      translation: 'Do not enter the confined space without a signed permit to work.'
    },
    notesHindi: 'वेल्डिंग, क्रेन और गड्ढे के काम के लिए इंजीनियर से परमिट साइन कराना जरूरी होता है।',
    notes: 'Essential HSE documentation on all engineering projects.',
    streak: 2
  },

  // --- French Flashcards ---
  {
    id: 'fc-fr-1',
    languageId: 'french',
    front: "S'il vous plaît",
    phoneticHindi: 'सील वू प्ले',
    phonetic: 'Seel voo pleh',
    backHindi: 'कृपया (आदरपूर्वक)',
    back: 'Please (Formal / Polite)',
    categoryHindi: '👋 नमस्ते व अभिवादन',
    category: 'Politeness',
    level: 'Beginner',
    exampleSentence: {
      target: "Donnez-moi la clé à molette, s'il vous plaît.",
      phoneticHindi: 'दोने-मुआ ला क्ले आ मोलेत, सील वू प्ले.',
      phonetic: "Doh-nay mwah lah klay ah moh-leht, seel voo pleh.",
      translationHindi: 'कृपया मुझे पाना (एडजस्टेबल रिंच) पकड़ा दीजिए।',
      translation: 'Please hand me the adjustable wrench.'
    },
    notesHindi: 'फ्रांस में किसी से भी कोई औजार या मदद मांगते समय "सील वू प्ले" जरूर जोड़ें।',
    notes: 'Essential politeness marker in French workplaces.',
    streak: 4
  },
  {
    id: 'fc-fr-2',
    languageId: 'french',
    front: 'Casque et Chaussures de sécurité',
    phoneticHindi: 'कास्क ए शोस्स्यूर द सेक्यूरीते',
    phonetic: 'Kahsk ay shoh-sewr duh say-kew-ree-tay',
    backHindi: 'सेफ्टी हेलमेट और सुरक्षा जूते',
    back: 'Safety Helmet & Steel-Toe Shoes (PPE)',
    categoryHindi: '🦺 साइट सुरक्षा व सावधानी',
    category: 'Safety & Tools',
    level: 'Beginner',
    exampleSentence: {
      target: 'Le port du casque est obligatoire sur tout le chantier.',
      phoneticHindi: 'ल पोर दु कास्क ए ओब्लीगात्वार सुर तू ल शाँतिए.',
      phonetic: 'Luh por dew kahsk ay oh-blee-gah-twahr sewr too luh shahn-tyay.',
      translationHindi: 'पूरी साइट पर सेफ्टी हेलमेट पहनना अनिवार्य है।',
      translation: 'Wearing a safety helmet is mandatory across the whole site.'
    },
    notesHindi: 'फ्रांस के निर्माण स्थलों पर BTP सेफ्टी मानकों का पालन अनिवार्य है।',
    notes: 'Mandatory PPE for construction and site workers in France.',
    streak: 3
  },

  // --- Spanish Flashcards ---
  {
    id: 'fc-es-1',
    languageId: 'spanish',
    front: '¡Buenos días!',
    phoneticHindi: 'ब्वेनोस दिआस!',
    phonetic: 'Bweh-nohs dee-ahs!',
    backHindi: 'शुभ प्रभात / नमस्ते!',
    back: 'Good morning! (Universal Greeting)',
    categoryHindi: '👋 नमस्ते व अभिवादन',
    category: 'Greetings',
    level: 'Beginner',
    exampleSentence: {
      target: '¡Buenos días Carlos! ¿Dónde están las herramientas?',
      phoneticHindi: 'ब्वेनोस दिआस कार्लोस! दोंदे एस्तान लास एर्रामिएंतास?',
      phonetic: 'Bweh-nohs dee-ahs Carlos! Dohn-day ehs-tahn lahs ehr-rah-myen-tahs?',
      translationHindi: 'नमस्ते कार्लोस! औजार कहाँ रखे हैं?',
      translation: 'Good morning Carlos! Where are the tools?'
    },
    notesHindi: 'स्पेनिश में सुबह 12 बजे तक नमस्ते के लिए "¡Buenos días!" बोलते हैं।',
    notes: 'Standard morning greeting across Spain and Latin America.',
    streak: 3
  },
  {
    id: 'fc-es-2',
    languageId: 'spanish',
    front: '¡Cuidado! Peligro',
    phoneticHindi: 'कुइदादो! पेलिग्रो',
    phonetic: 'Kwee-dah-doh! Peh-lee-groh',
    backHindi: 'सावधान! खतरा है!',
    back: 'Careful! Danger! (Safety Alert)',
    categoryHindi: '🦺 साइट सुरक्षा व सावधानी',
    category: 'Safety & Tools',
    level: 'Beginner',
    exampleSentence: {
      target: '¡Cuidado con la sierra circular!',
      phoneticHindi: 'कुइदादो कोन ला सिएर्रा सर्कुलार!',
      phonetic: 'Kwee-dah-doh kohn lah syeh-rrah seer-koo-lahr!',
      translationHindi: 'गोल कटर आरी से सावधान रहें!',
      translation: 'Be careful with the circular saw!'
    },
    notesHindi: 'वर्कशॉप में किसी को दुर्घटना से बचाने के लिए तुरंत "¡Cuidado!" बोलें।',
    notes: 'Urgent danger warning term on Spanish job sites.',
    streak: 4
  }
];

export interface RoleplayScenario {
  id: string;
  languageId: string;
  categoryHindi: string;
  title: string;
  titleHindi: string;
  culturalContext: string;
  aiRole: string;
  aiRoleHindi: string;
  userRole: string;
  userRoleHindi: string;
  location: string;
  initialAiMessage: {
    text: string;
    phoneticHindi: string;
    phonetic: string;
    hindiTranslation: string;
    translation: string;
    shramikTip: string;
    culturalNote?: string;
  };
  initialSuggestedReplies: Array<{
    text: string;
    phoneticHindi: string;
    hindiTranslation: string;
  }>;
}

export const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  // 1. UAE / Gulf Arabic - Construction Site Foreman
  {
    id: 'sc-uae-construction',
    languageId: 'uae-arabic',
    categoryHindi: '🏗️ निर्माण व साइट सुपरवाइज़र',
    title: 'Site Foreman Daily Work Instructions',
    titleHindi: 'निर्माण साइट पर फोरमैन से आज का काम समझना',
    culturalContext: 'आप दुबई/रियाद में निर्माण साइट पर पहुंचे हैं। फोरमैन अबू सालेह आपको सीमेंट मिलाने, सुरक्षा हेलमेट पहनने और 5वीं मंजिल पर काम शुरू करने का निर्देश दे रहे हैं।',
    aiRole: 'Abu Saleh (Site Foreman / मुअल्लिम)',
    aiRoleHindi: 'अबू सालेह (साइट फोरमैन / उस्ताद)',
    userRole: 'Indian Construction Craftsman / Worker',
    userRoleHindi: 'भारतीय निर्माण श्रमिक / राजमिस्त्री',
    location: 'दुबई / रियाद कंस्ट्रक्शन साइट (Dubai Site)',
    initialAiMessage: {
      text: 'صَبَاحْ الْخَيْر يَا صَاحِبِي! الْيَوْمْ عِنْدِنَا شُغْلْ صَبَّة سِيمِنْتْ فِي الدَّوْرْ الْخَامِسْ. لَابِسْ الْخُوذَة وَحِذَاءْ السَّلامَة؟',
      phoneticHindi: 'सबाहुल खैर या साहिबी! अल-यौम इंदना शुगल सब्बा सीमंत फिद-दौर अल-खामिस. लाबिस अल-खूज़ा व हिज़ा अस-सलामा?',
      phonetic: "Sabah al-khayr ya saahibi! Al-yawm 'indana shughl sabba seemint fid-dawr al-khaamis. Laabis al-khoodha wa hidha' as-salama?",
      hindiTranslation: 'शुभ प्रभात मेरे दोस्त! आज पांचवीं मंजिल पर कंक्रीट सीमेंट ढलाई का काम है। क्या आपने सुरक्षा हेलमेट और सेफ्टी जूते पहन रखे हैं?',
      translation: 'Good morning my friend! Today we have cement pouring work on the 5th floor. Are you wearing your safety helmet and safety shoes?',
      shramikTip: 'गल्फ देशों में साइट पर सेफ्टी गियर (खूज़ा = हेलमेट, हिज़ा = जूते) अनिवार्य है। हमेशा फोरमैन को "हाज़िर या मुअल्लिम" (हाँ उस्ताद) कहकर जवाब दें।'
    },
    initialSuggestedReplies: [
      {
        text: 'نَعَمْ يَا مُعَلِّمْ، كُلُّ شَيْءٍ جَاهِزْ وَأَنَا لَابِسْ الْخُوذَة',
        phoneticHindi: 'नाअम या मुअल्लिम, कुल्लू शै जाहिज़ व अना लाबिस अल-खूज़ा',
        hindiTranslation: 'हाँ उस्ताद! सब तैयार है और मैंने हेलमेट पहन रखा है।'
      },
      {
        text: 'حَاضِرْ يَا أَبُو صَالِحْ، كَمْ كِيسْ سِيمِنْتْ نَحْتَاجْ الْيَوْمْ؟',
        phoneticHindi: 'हाज़िर या अबू सालेह, कमकीस सीमंत नहताज अल-यौम?',
        hindiTranslation: 'हाज़िर अबू सालेह जी, आज कितने बोरी सीमेंट की जरूरत होगी?'
      },
      {
        text: 'مُمْكِنْ مَاءْ لِلشُّرْبِ قَبْلَ أَنْ نَبْدَأَ الشُّغْلْ؟',
        phoneticHindi: 'मुमकिन माअ लिश-शुरब क़ब्ल अन नबदा अश-शुगल?',
        hindiTranslation: 'क्या काम शुरू करने से पहले पीने का पानी मिल सकता है?'
      }
    ]
  },

  // 2. UAE / Gulf Arabic - Clinic / Health
  {
    id: 'sc-uae-clinic',
    languageId: 'uae-arabic',
    categoryHindi: '🏥 डॉक्टर व अस्पताल में तकलीफ बताना',
    title: 'Reporting Sickness & Fever to Clinic Doctor',
    titleHindi: 'क्लीनिक में डॉक्टर को बुखार व दर्द की शिकायत बताना',
    culturalContext: 'काम के बाद आपको बुखार और सिरदर्द है। आप मेडिकल क्लीनिक में डॉक्टर को अपनी बीमारी बता रहे हैं और 1 दिन का आराम व दवा मांग रहे हैं।',
    aiRole: 'Dr. Tariq (Clinic Doctor)',
    aiRoleHindi: 'डॉ. तारिक (क्लीनिक डॉक्टर)',
    userRole: 'Worker Seeking Treatment',
    userRoleHindi: 'इलाज हेतु आया श्रमिक साथी',
    location: 'गल्फ लेबर क्लस्टर मेडिकल सेंटर',
    initialAiMessage: {
      text: 'أَهْلاً بِكَ يَا أَخِي، سَلامَتَكْ! شُو تِحِسْ؟ عِنْدَكْ حَرَارَة أَوْ وَجَعْ فِي جِسْمَكْ؟',
      phoneticHindi: 'अहलन बिक या अखी, सलामतक! शू तिहिस? इंदक हरारा अव वजह फी जिस्मक?',
      phonetic: "Ahlan bik ya akhi, salaamtak! Shu tihis? 'Indak haraara aw waja' fee jismak?",
      hindiTranslation: 'स्वागत है मेरे भाई, आप सुरक्षित रहें! क्या तकलीफ महसूस हो रही है? क्या बुखार है या शरीर में कहीं दर्द है?',
      translation: 'Welcome brother, get well soon! What are you feeling? Do you have a fever or body ache?',
      shramikTip: 'डॉक्टर से बात करते समय दर्द की जगह (रास = सिर, बतन = पेट) और "हरारा" (बुखार) स्पष्ट रूप से बताएं।'
    },
    initialSuggestedReplies: [
      {
        text: 'عِنْدِي حَرَارَة عَالْيَة وَوَجَعْ فِي رَاسِي مُنْذُ أَمْسْ',
        phoneticHindi: 'इंदी हरारा आलिया व वजह फी रासी मुन्ज़ु अम्स',
        hindiTranslation: 'मुझे कल से तेज बुखार और सिर में बहुत दर्द है।'
      },
      {
        text: 'أَحْتَاجُ دَوَاءً وَوَرَقَةَ إِجَازَة لِلشَّرِكَة يَوْمْ وَاحِدْ',
        phoneticHindi: 'अहताजु दवाअन व वरक़त इजाज़ा लिश-शरिकह यौम वाहिद',
        hindiTranslation: 'मुझे दवा और कंपनी में दिखाने के लिए 1 दिन की छुट्टी की पर्ची चाहिए।'
      },
      {
        text: 'أَيْنَ الصَّيْدَلِيَّة لِأَخْذِ الْحُبُوبْ؟',
        phoneticHindi: 'ऐन अस-सैदलीयह लि-अख्ज़ अल-हुबूब?',
        hindiTranslation: 'दवाइयां और गोलियां लेने के लिए मेडिकल स्टोर कहाँ है?'
      }
    ]
  },

  // 3. UAE / Gulf Arabic - Manager / Salary & Overtime
  {
    id: 'sc-uae-manager',
    languageId: 'uae-arabic',
    categoryHindi: '🛂 कंपनी मैनेजर व वेतन / इकामा',
    title: 'Salary Slip & Iqama Inquiry with Company Officer',
    titleHindi: 'कंपनी ऑफिसर से वेतन, ओवरटाइम व इकामा रिन्यूअल की बात',
    culturalContext: 'महीने के अंत में आप एचआर/कंपनी मैनेजर से अपने ओवरटाइम के पैसे और नए इकामा (रेजिडेंस कार्ड) के बारे में विनम्रता से बात कर रहे हैं।',
    aiRole: 'Khaled (HR & Company Officer)',
    aiRoleHindi: 'खालिद (कंपनी एचआर व एडमिन मैनेजर)',
    userRole: 'Company Employee / Worker',
    userRoleHindi: 'कंपनी श्रमिक कर्मचारी',
    location: 'कंपनी हेड ऑफिस / साइट एडमिन रूम',
    initialAiMessage: {
      text: 'مَرْحَبَا يَا مُحَمَّدْ، تَفَضَّلِ اسْتَرِيحْ. بْخُصُوصْ شُو تِرِيدْ تِتْكَلَّمْ؟ الرَّاتِبْ أَوْ الإِقَامَة؟',
      phoneticHindi: 'मरहबा या साहिबी, तफद्दल इस्सरीह. बिखुसूस शू तिरीद तितकल्लम? अर-रातिब अव अल-इकामा?',
      phonetic: "Marhaba ya saahibi, tafaddal istareeh. Bikhoosoos shu tireed titkallam? Ar-raatib aw al-iqaama?",
      hindiTranslation: 'नमस्ते मेरे साथी, बैठिए आराम से। आप किस बारे में बात करना चाहते हैं? वेतन (सैलरी) या इकामा (आईडी कार्ड)?',
      translation: 'Hello friend, please sit comfortably. What would you like to discuss? Salary or Iqama residence ID?',
      shramikTip: 'ऑफिस में बात करते समय "लौ समाहत" (कृपया) और "शुक़रन" (धन्यवाद) का प्रयोग करें। इससे आपकी बात को प्राथमिकता मिलती है।'
    },
    initialSuggestedReplies: [
      {
        text: 'لَوْ سَمَحْتَ، أُرِيدُ كَشْفَ الرَّاتِبْ وَحِسَابَ سَاعَاتِ الإِضَافِي (أُوفَرْتَايِمْ)',
        phoneticHindi: 'लौ समाह्त, उरीदु कशफ़ अर-रातिब व हिसाब साआतिल इजाफी (ओवरटाइम)',
        hindiTranslation: 'कृपया मुझे मेरी सैलरी स्लिप और ओवरटाइम घंटों का हिसाब दे दीजिए।'
      },
      {
        text: 'مَتَى سَيَكُونُ كَرْتُ الإِقَامَة الْجَدِيدْ جَاهِزًا؟',
        phoneticHindi: 'मता सयकुनु कर्तुल इकामा अल-जदीद जाहिज़न?',
        hindiTranslation: 'मेरा नया इकामा रेजिडेंस कार्ड कब तक बनकर तैयार हो जाएगा?'
      },
      {
        text: 'أُرِيدُ إِرْسَالَ فُلُوسْ لِلْأَهْلِ فِي الْهِنْدِ الْيَوْمْ',
        phoneticHindi: 'उरीदु इरसाल फुलूस लिल-अहल फिल-हिंद अल-यौम',
        hindiTranslation: 'मुझे आज अपने घर भारत में पैसे (रेमिटेंस) भेजने हैं।'
      }
    ]
  },

  // 4. German - Workshop Supervisor / Skilled Trade
  {
    id: 'sc-de-workshop',
    languageId: 'german',
    categoryHindi: '🔧 जर्मन वर्कशॉप व सुपरवाइज़र',
    title: 'German Workshop Supervisor Task & Safety Briefing',
    titleHindi: 'जर्मन फैक्ट्री/वर्कशॉप में सुपरवाइज़र से काम व टूल्स समझना',
    culturalContext: 'आप जर्मनी में कुशल इलेक्ट्रीशियन/वेल्डर के रूप में कार्यशाला में हैं। मास्टर क्राफ्ट्समैन हेर श्मिट आपको आज के उपकरण और सुरक्षा सावधानियों की जानकारी दे रहे हैं।',
    aiRole: 'Herr Schmidt (Werkstattleiter / Master)',
    aiRoleHindi: 'हेर श्मिट (वर्कशॉप मास्टर / Vorarbeiter)',
    userRole: 'Indian Skilled Technician',
    userRoleHindi: 'भारतीय कुशल तकनीशियन',
    location: 'जर्मनी इंडस्ट्रियल वर्कशॉप (Stuttgart)',
    initialAiMessage: {
      text: 'Guten Morgen! Heute prüfen wir die elektrischen Schaltkästen und Rohre. Bitte tragen Sie die Schutzbrille und Sicherheitsschuhe!',
      phoneticHindi: 'गुटन मोर्गन! हॉइटे प्रूफेन वियर डी इलेक्ट्रीशन शाल्टकेस्टन उंड रोरे. बिटे ट्रागेन ज़ी डी शुत्सब्रिले उंड ज़िशरहाइट्स-शूहे!',
      phonetic: 'Goo-ten mor-gen! Hoy-te prew-fen veer dee eh-lek-tree-shen shahlt-kes-ten oont roh-reh. Bit-teh trah-gen zee dee shoots-bril-leh oont zee-sher-hytes-shoo-heh!',
      hindiTranslation: 'शुभ प्रभात! आज हम इलेक्ट्रिकल स्विचबोर्ड और पाइपों की जांच करेंगे। कृपया अपनी सुरक्षा चश्मा और सेफ्टी जूते अवश्य पहनें!',
      translation: 'Good morning! Today we inspect the electrical control boxes and pipes. Please wear protective goggles and safety shoes!',
      shramikTip: 'जर्मनी में समय की पाबंदी (Pünktlichkeit) और सुरक्षा नियम (Sicherheit) सबसे महत्वपूर्ण हैं। किसी भी आदेश के उत्तर में "Ja, verstanden" (हाँ, समझ गया) कहें।'
    },
    initialSuggestedReplies: [
      {
        text: 'Guten Morgen Herr Schmidt! Ja, ich habe alle Schutzmittel an.',
        phoneticHindi: 'गुटन मोर्गन हेर श्मिट! या, इष हाबे आले शुत्समिटेल आन.',
        hindiTranslation: 'नमस्ते हेर श्मिट! हाँ, मैंने सभी सुरक्षा उपकरण पहन रखे हैं।'
      },
      {
        text: 'Wo finde ich das Messgerät und die neuen Werkzeuge?',
        phoneticHindi: 'वो फिन्डे इष दास मेस-गेरेट उंड डी नॉयन वेर्कत्ज़ॉइगे?',
        hindiTranslation: 'मुझे नापने का मीटर और नए औजार कहाँ मिलेंगे?'
      },
      {
        text: 'Alles klar! Ich beginne sofort mit der Arbeit.',
        phoneticHindi: 'आलेस क्लार! इष बेगिने ज़ोफोर्ट मिट डेर आरबाइट.',
        hindiTranslation: 'बिल्कुल ठीक! मैं तुरंत काम शुरू करता हूँ।'
      }
    ]
  },

  // 5. Japanese - Factory & Construction Shunin (TITP / SSW)
  {
    id: 'sc-ja-site',
    languageId: 'japanese',
    categoryHindi: '🏭 जापानी फैक्ट्री व साइट सुपरवाइज़र',
    title: 'Japanese Site Supervisor Daily Morning Assembly (Chourei)',
    titleHindi: 'जापानी साइट पर सुबह की सभा (Chourei) व फोरमैन से बातचीत',
    culturalContext: 'आप जापान में टेक्निकल इंटर्न (TITP / SSW) के रूप में कार्यस्थल पर हैं। साइट सुपरवाइज़र तानाका-सान सुबह की सभा (Chourei) में आज के सुरक्षित काम की घोषणा कर रहे हैं।',
    aiRole: 'Tanaka-san (Site Supervisor / 主任)',
    aiRoleHindi: 'तानाका-सान (साइट सुपरवाइज़र / शुनिन)',
    userRole: 'Technical Intern Trainee (Kenshuusei)',
    userRoleHindi: 'भारतीय तकनीकी प्रशिक्षु श्रमिक (Kenshūsei)',
    location: 'टोक्यो / ओसाका इंडस्ट्रियल साइट (Tokyo Site)',
    initialAiMessage: {
      text: '皆さん、おはようございます！今日の現場作業では安全帯（フルハーネス）とヘルメットの点検を徹底してください。準備はいいですか？',
      phoneticHindi: 'मिना-सान, ओहायो गोज़ाइमास! क्यो नो गेम्बा साग्यो देवा आन्ज़ेन्ताई (हुरुहानेसु) तो हेरुमेत्तो नो तेंकेन ओ तेत्तेइ शिते कुदासाइ. जुम्बी वा ई देस का?',
      phonetic: 'Minasan, ohayou gozaimasu! Kyou no gemba sagyou dewa anzentai (furuharnesu) to herumetto no tenken o tettei shite kudasai. Junbi wa ii desu ka?',
      hindiTranslation: 'आप सभी को शुभ प्रभात! आज के साइट कार्य में सुरक्षा बेल्ट (फुल हार्नेस) और हेलमेट की अच्छी तरह से जांच कर लें। क्या आप सब तैयार हैं?',
      translation: 'Good morning everyone! For today\'s field work, please thoroughly inspect your safety harnesses and helmets. Are you ready?',
      shramikTip: 'जापान में काम की शुरुआत पर "ओहायो गोज़ाइमास" और खत्म होने पर "ओत्सुकारेसामा देशिता" बोलना सम्मान और टीम भावना की पहचान है।'
    },
    initialSuggestedReplies: [
      {
        text: 'はい！おはようございます。ヘルメットと安全帯の点検、完了しました！',
        phoneticHindi: 'हाई! ओहायो गोज़ाइमास. हेरुमेत्तो तो आन्ज़ेन्ताई नो तेंकेन, कान्र्यो शिमाशिता!',
        hindiTranslation: 'हाँ! शुभ प्रभात। हेलमेट और सेफ्टी बेल्ट की जांच पूरी हो गई है!'
      },
      {
        text: '田中主任、本日の作業手順書をもう一度確認させてください。',
        phoneticHindi: 'तानाका शुनिन, होन्जित्सु नो साग्यो तेजुनशो ओ मोउ इचिदो काकुनिन सासेते कुदासाइ.',
        hindiTranslation: 'तानाका सर, आज के काम की प्रक्रिया (प्रोसीजर) एक बार फिर समझा दीजिए।'
      },
      {
        text: 'よろしくお願いします！今日も一日、ご安全に！',
        phoneticHindi: 'योरोशिकु ओनेगाइ शिमास! क्यो मो इचि-निचि, गो-आन्ज़ेन नी!',
        hindiTranslation: 'आपका मार्गदर्शन मिले! आज भी पूरे दिन सुरक्षित काम करेंगे!'
      }
    ]
  },

  // 6. English - Multinational Safety Officer (Toolbox Talk)
  {
    id: 'sc-en-safety',
    languageId: 'english',
    categoryHindi: '🦺 साइट सेफ्टी ऑफिसर व टूलबॉक्स टॉक',
    title: 'Daily Toolbox Safety Talk with HSE Officer',
    titleHindi: 'HSE सेफ्टी ऑफिसर के साथ दैनिक टूलबॉक्स सुरक्षा चर्चा',
    culturalContext: 'गल्फ व अंतरराष्ट्रीय परियोजनाओं में रोजाना काम से पहले 10 मिनट की टूलबॉक्स टॉक होती है। सेफ्टी ऑफिसर जॉन ऊंचाई पर काम करने और भारी सामान उठाने के नियम बता रहे हैं।',
    aiRole: 'Officer John (HSE Safety Officer)',
    aiRoleHindi: 'ऑफिसर जॉन (स्वास्थ्य एवं सुरक्षा अधिकारी - HSE)',
    userRole: 'Site Technician & Worker',
    userRoleHindi: 'साइट तकनीशियन व श्रमिक साथी',
    location: 'इंटरनेशनल इंफ्रास्ट्रक्चर प्रोजेक्ट (Gulf Mega Site)',
    initialAiMessage: {
      text: 'Good morning team! Today we are working at heights above 3 meters. Everyone must hook their double lanyards to the anchor point at all times. Do you have your work permit ready?',
      phoneticHindi: 'गुड मॉर्निंग टीम! टुडे वी आर वर्किंग ऐट हाइट्स अबव 3 मीटर्स. एवरीवन मस्ट हुक देयर डबल लैनयार्ड्स टू द एंकर पॉइंट ऐट ऑल टाइम्स. डू यू हैव योर वर्क परमिट रेडी?',
      phonetic: 'Good morning team! Today we are working at heights above 3 meters. Everyone must hook their double lanyards to the anchor point at all times. Do you have your work permit ready?',
      hindiTranslation: 'शुभ प्रभात साथियों! आज हम 3 मीटर से अधिक ऊंचाई पर काम कर रहे हैं। सभी को हर समय अपनी सुरक्षा बेल्ट का हुक एंकर पॉइंट से बांधकर रखना होगा। क्या आपका वर्क परमिट तैयार है?',
      translation: 'Good morning team! Today we are working at heights above 3 meters. Everyone must hook their double lanyards to the anchor point at all times. Do you have your work permit ready?',
      shramikTip: 'अंतरराष्ट्रीय साइटों पर वर्क परमिट (Permit to Work) के बिना काम शुरू न करें। कोई भी खतरा दिखने पर "Stop Work" बोलें।'
    },
    initialSuggestedReplies: [
      {
        text: 'Yes Sir! Safety harness is inspected and work permit is signed.',
        phoneticHindi: 'यस सर! सेफ्टी हार्नेस इज़ इन्स्पेक्टेड एंड वर्क परमिट इज़ साइन्ड.',
        hindiTranslation: 'हाँ सर! सुरक्षा बेल्ट की जांच हो गई है और वर्क परमिट पर हस्ताक्षर हैं।'
      },
      {
        text: 'Where is the designated emergency assembly point for this area?',
        phoneticHindi: 'व्हेयर इज़ द डेज़िग्नेटेड इमरजेंसी असेंबली पॉइंट फॉर दिस एरिया?',
        hindiTranslation: 'इस क्षेत्र के लिए आपातकालीन असेंबली पॉइंट (एकत्रित होने की जगह) कहाँ है?'
      },
      {
        text: 'Understood Sir, we will follow all safety procedures today.',
        phoneticHindi: 'अंडरस्टूड सर, वी विल फॉलो ऑल सेफ्टी प्रोसीजर्स टुडे.',
        hindiTranslation: 'समझ गया सर, हम आज सभी सुरक्षा नियमों का पूरा पालन करेंगे।'
      }
    ]
  },

  // 7. French - Site Chef de Chantier
  {
    id: 'sc-fr-site',
    languageId: 'french',
    categoryHindi: '🏗️ फ्रेंच साइट सुपरवाइज़र',
    title: 'French Site Boss Morning Instructions',
    titleHindi: 'फ्रेंच साइट बॉस (Chef de Chantier) से काम के निर्देश लेना',
    culturalContext: 'फ्रांस या फ्रेंच भाषी देशों में निर्माण स्थल पर साइट चीफ पियरे काम के औजार और दिन की योजना साझा कर रहे हैं।',
    aiRole: 'Pierre (Chef de Chantier / Site Boss)',
    aiRoleHindi: 'पियरे (साइट बॉस / शेफ डे चैंटियर)',
    userRole: 'Skilled Construction Worker',
    userRoleHindi: 'कुशल निर्माण श्रमिक',
    location: 'पेरिस कंस्ट्रक्शन प्रोजेक्ट (Paris Site)',
    initialAiMessage: {
      text: 'Bonjour à tous ! Ce matin, nous devons terminer le coffrage et la pose des armatures. Avez-vous vérifié tous les outils nécessaires ?',
      phoneticHindi: 'बोंजूर आ तूस! स मातान, नू दुवों तेरमिने ल कोफराज ए ला पोस दे आरमात्यूर. आवे-वू वेरीफिए तूस ले ऊती नेसेसैर?',
      phonetic: 'Bohn-zhoor ah toos! Suh mah-tahn, noo duh-vohn tehr-mee-nay luh koh-frahzh ay lah pohz dayz ahr-mah-tewr. Ah-vay-voo vay-ree-fyay too layz oo-tee nay-seh-sehr?',
      hindiTranslation: 'आप सभी को नमस्ते! आज सुबह हमें शटरिंग और लोहे के सरियों का काम पूरा करना है। क्या आपने सभी जरूरी औजारों की जांच कर ली है?',
      translation: 'Good morning everyone! This morning we must finish the formwork and reinforcement. Have you checked all required tools?',
      shramikTip: 'फ्रेंच कार्यस्थल पर हमेशा "Bonjour Monsieur" बोलकर बात शुरू करें और काम खत्म होने पर "Merci" जरूर कहें।'
    },
    initialSuggestedReplies: [
      {
        text: 'Bonjour Monsieur ! Oui, tous les outils et le matériel sont prêts.',
        phoneticHindi: 'बोंजूर मस्यु! वी, तूस ले ऊती ए ल मातेरियेल सों प्रे.',
        hindiTranslation: 'नमस्ते सर! हाँ, सभी औजार और सामग्री तैयार हैं।'
      },
      {
        text: 'Où devons-nous déposer les gravats et les déchets de chantier ?',
        phoneticHindi: 'ऊ दुवों-नू देपोसे ले ग्रावा ए ले देशे द शंतिए?',
        hindiTranslation: 'हमें साइट का मलबा और कचरा कहाँ डालना है?'
      },
      {
        text: 'Très bien, nous commençons le travail immédiatement.',
        phoneticHindi: 'त्रे ब्यां, नू कोमंसों ल त्रावाय इमेडियातमां.',
        hindiTranslation: 'बहुत अच्छा, हम तुरंत काम शुरू करते हैं।'
      }
    ]
  },

  // 8. Spanish - Workshop & Maintenance
  {
    id: 'sc-es-workshop',
    languageId: 'spanish',
    categoryHindi: '🛠️ स्पैनिश वर्कशॉप व मेंटेनेंस',
    title: 'Spanish Maintenance Supervisor Task Briefing',
    titleHindi: 'स्पैनिश सुपरवाइज़र से मेंटेनेंस व सुरक्षा कार्य समझना',
    culturalContext: 'स्पेन या लैटिन अमेरिकी औद्योगिक संयंत्र में सुपरवाइज़र कार्लोस पाइपलाइन और मशीनरी मेंटेनेंस का काम समझा रहे हैं।',
    aiRole: 'Carlos (Supervisor de Mantenimiento)',
    aiRoleHindi: 'कार्लोस (मेंटेनेंस सुपरवाइज़र)',
    userRole: 'Industrial Maintenance Craftsman',
    userRoleHindi: 'औद्योगिक मेंटेनेंस कारीगर',
    location: 'मैड्रिड इंडस्ट्रियल प्लांट (Madrid)',
    initialAiMessage: {
      text: '¡Buenos días amigo! Hoy tenemos que hacer el mantenimiento preventivo de las tuberías y válvulas. ¿Tienes los guantes y las herramientas listas?',
      phoneticHindi: 'ब्वेनोस दिआस अमीगो! ओय तेनेमोस के आसेर एल मन्तेनिमिएंतो प्रेवेंतीवो दे लास तुबेरियास ई वालवुलास. तिएनेस लोस ग्वांटेस ई लास एर्रामिएंतास लीस्तास?',
      phonetic: 'Bweh-nohs dee-ahs ah-mee-goh! Oy teh-neh-mohs keh ah-sehr ehl mahn-teh-nee-myen-toh preh-vehn-tee-voh deh lahs too-beh-ree-ahs ee vahl-voo-lahs. Tyeh-nehs lohs gwahn-tehs ee lahs ehr-rah-myen-tahs lees-tahs?',
      hindiTranslation: 'शुभ प्रभात मेरे दोस्त! आज हमें पाइपों और वाल्वों की मेंटेनेंस करनी है। क्या आपके पास दस्ताने और औजार तैयार हैं?',
      translation: 'Good morning friend! Today we have to do preventive maintenance on the pipes and valves. Do you have gloves and tools ready?',
      shramikTip: 'स्पैनिश में "Buenos días" (नमस्ते) और "Sí, entendido" (हाँ, समझ गया) सबसे उपयोगी वाक्य हैं।'
    },
    initialSuggestedReplies: [
      {
        text: '¡Buenos días Carlos! Sí, tengo los guantes puestos y la caja de herramientas lista.',
        phoneticHindi: 'ब्वेनोस दिआस कार्लोस! सी, तेंगो लोस ग्वांटेस पुएस्टोस ई ला काखा दे एर्रामिएंतास लीस्ता.',
        hindiTranslation: 'नमस्ते कार्लोस! हाँ, मैंने दस्ताने पहन रखे हैं और टूलबॉक्स तैयार है।'
      },
      {
        text: '¿Dónde está la válvula principal de agua y presión?',
        phoneticHindi: 'दोंदे एस्ता ला वालवुला प्रिन्सिपाल दे आगवा ई प्रेसियोन?',
        hindiTranslation: 'पानी और प्रेशर का मुख्य वाल्व कहाँ स्थित है?'
      },
      {
        text: 'Entendido, comenzamos la inspección ahora mismo.',
        phoneticHindi: 'एन्तेन्दिदो, कोमेन्चामोस ला इन्स्पेक्सिओन आओरा मिस्मो.',
        hindiTranslation: 'समझ गया, हम अभी निरीक्षण शुरू करते हैं।'
      }
    ]
  }
];

