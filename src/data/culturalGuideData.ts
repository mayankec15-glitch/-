export interface CulturalArticle {
  id: string;
  languageId: string;
  categoryHindi: string;
  titleHindi: string;
  titleEnglish: string;
  subtitleHindi: string;
  heroQuote: {
    target: string;
    phoneticHindi: string;
    phonetic: string;
    translationHindi: string;
  };
  overviewHindi: string;
  dos: Array<{
    ruleHindi: string;
    explanationHindi: string;
  }>;
  donts: Array<{
    ruleHindi: string;
    explanationHindi: string;
  }>;
  keyPhrases: Array<{
    text: string;
    phoneticHindi: string;
    phonetic: string;
    translationHindi: string;
    contextHindi: string;
  }>;
  embassyHelpline: {
    country: string;
    helplineNumber: string;
    portalName: string;
    tipHindi: string;
  };
}

export const CULTURAL_ARTICLES: CulturalArticle[] = [
  // 1. UAE & Gulf Countries
  {
    id: 'culture-uae-majlis',
    languageId: 'uae-arabic',
    categoryHindi: '🛡️ गल्फ लेबर नियम, पासपोर्ट सुरक्षा व साइट शिष्टाचार',
    titleHindi: 'गल्फ देशों (UAE, सऊदी, कतर, ओमान) में काम व सुरक्षा नियम',
    titleEnglish: 'UAE & Gulf Labor Rules, Safety & Etiquette',
    subtitleHindi: 'पासपोर्ट सुरक्षा, वेतन नियम, फोरमैन से बातचीत और गल्फ देशों के कानूनी नियम',
    heroQuote: {
      target: 'السَّلَامَةُ أَوَّلاً فِي الْعَمَلْ وَالْحَيَاةْ',
      phoneticHindi: 'अस-सलामतु अव्वलन फिल-अमल वल-हयात',
      phonetic: "As-salaamatu awwalan fil-'amal wal-hayaat",
      translationHindi: 'काम और जीवन में सुरक्षा हमेशा पहले स्थान पर है।'
    },
    overviewHindi: 'गल्फ देशों (सऊदी अरब, यूएई, कतर, कुवैत, ओमान) में लाखों भारतीय श्रमवीर सफलतापूर्वक कार्य कर रहे हैं। यहाँ काम करते समय सुरक्षा नियम (HSE), इकामा (रेजिडेंस कार्ड) की वैधता और स्थानीय कानूनों का सम्मान करना सबसे महत्वपूर्ण है। भारतीय दूतावास और ई-माइग्रेट (e-Migrate) प्रणाली आपके अधिकारों की पूरी रक्षा करती है।',
    dos: [
      {
        ruleHindi: 'पासपोर्ट और कॉन्ट्रैक्ट की फोटोकॉपी सुरक्षित रखें',
        explanationHindi: 'अपने पासपोर्ट, वीज़ा, लेबर कॉन्ट्रैक्ट और इकामा (सिविल आईडी) की साफ फोटो मोबाइल में सेव रखें और एक ज़ेरॉक्स कॉपी अपने कमरे में सुरक्षित रखें।'
      },
      {
        ruleHindi: 'साइट पर पूरा सेफ्टी गियर (PPE) अनिवार्य पहनें',
        explanationHindi: 'हेलमेट (खूज़ा), सेफ्टी जूते (हिज़ा अस-सलामा) और रिफ्लेक्टर जैकेट के बिना कभी भी साइट पर प्रवेश न करें। ऊंचाई पर हार्नेस अवश्य लगाएं।'
      },
      {
        ruleHindi: 'सीधे (दाएं) हाथ का ही प्रयोग करें',
        explanationHindi: 'चाय, कॉफी (कहवा), पानी, दस्तावेज या खाना देते या लेते समय हमेशा दाएं हाथ का प्रयोग करें। यह गल्फ में आदर का प्रतीक है।'
      },
      {
        ruleHindi: 'महीने के अंत में सैलरी स्लिप व ओवरटाइम चेक करें',
        explanationHindi: 'गल्फ में वेतन बैंक अकाउंट (WPS - Wage Protection System) में आता है। हर महीने अपने काम के घंटे और ओवरटाइम का हिसाब नोट करके रखें।'
      },
      {
        ruleHindi: 'फोरमैन व सुपरवाइज़र से सम्मानपूर्वक बात करें',
        explanationHindi: 'काम शुरू करते समय "सबाहुल खैर" (शुभ प्रभात) और कोई आदेश मिलने पर "हाज़िर या मुअल्लिम" (हाँ उस्ताद जी) कहें।'
      }
    ],
    donts: [
      {
        ruleHindi: 'एयरपोर्ट पर किसी अनजान का सामान या पार्सल कभी न लें',
        explanationHindi: 'सख्त कानूनी चेतावनी: किसी भी परिचित या अनजान व्यक्ति का सीलबंद डिब्बा, दवाई का पैकेट या बंद बैग कभी न लाएं। इसमें प्रतिबंधित सामग्री होने पर कड़ी सजा हो सकती है।'
      },
      {
        ruleHindi: 'बिना अनुमति किसी व्यक्ति या सरकारी इमारत की फोटो न लें',
        explanationHindi: 'गल्फ में किसी भी स्थानीय नागरिक, विशेषकर महिलाओं, या सरकारी दफ्तरों/एयरपोर्ट की बिना अनुमति फोटो/वीडियो खींचना या सोशल मीडिया पर डालना कानूनी अपराध है।'
      },
      {
        ruleHindi: 'शराब या नशीले पदार्थों से पूरी तरह दूर रहें',
        explanationHindi: 'गल्फ देशों में बिना लाइसेंस शराब या नशीले पदार्थों का सेवन/रखना भारी जुर्माना और जेल का कारण बन सकता है।'
      },
      {
        ruleHindi: 'बिना वर्क परमिट के कोई काम शुरू न करें',
        explanationHindi: 'कंपनी द्वारा जारी वैध वर्क परमिट (Permit to Work) के बिना खतरनाक मशीनों या ऊंचाई पर काम न करें।'
      }
    ],
    keyPhrases: [
      {
        text: 'مَرْحَبَا السَّاعْ / أَهْلاً وَسَهْلاً',
        phoneticHindi: 'मरहबा अस-साअ / अहलन व सहलन',
        phonetic: "Marhaba as-saa' / Ahlan wa sahlan",
        translationHindi: 'आपका बहुत-बहुत स्वागत है!',
        contextHindi: 'जब कोई साइट या कमरे में आए तो आदर से स्वागत करने के लिए।'
      },
      {
        text: 'حَاضِرْ يَا مُعَلِّمْ، عَلَى رَاسِي',
        phoneticHindi: 'हाज़िर या मुअल्लिम, अला रासी',
        phonetic: "Haadir ya mu'allim, 'ala raasi",
        translationHindi: 'हाँ उस्ताद जी, सिर आंखों पर (काम तुरंत हो जाएगा)',
        contextHindi: 'सुपरवाइज़र या फोरमैन के काम के आदेश पर विनम्र सहमति देने के लिए।'
      },
      {
        text: 'لَوْ سَمَحْتَ، أَيْنَ الْمُسْتَشْفَى؟',
        phoneticHindi: 'लौ समाहत, ऐनल मुस्तशफ़ा?',
        phonetic: 'Law samaht, aynal mustashfa?',
        translationHindi: 'कृपया बताइए, अस्पताल या क्लिनिक कहाँ है?',
        contextHindi: 'तबीयत खराब होने पर डॉक्टर या क्लिनिक का पता पूछने के लिए।'
      },
      {
        text: 'شُكْراً جَزِيلاً، جَزَاكَ اللَّهُ خَيْراً',
        phoneticHindi: 'शुकरन जज़ीलन, जज़ाकल्लाहु खैरा',
        phonetic: 'Shukran jazeelan, jazaak Allahu khayran',
        translationHindi: 'बहुत-बहुत धन्यवाद, ईश्वर आपका भला करे!',
        contextHindi: 'किसी से मदद मिलने पर दिल से शुक्रिया अदा करने के लिए।'
      }
    ],
    embassyHelpline: {
      country: 'यूएई व गल्फ देश (UAE & Gulf Region)',
      helplineNumber: 'PBSA Toll Free: 800-46342 / MADAD Portal: madad.gov.in',
      portalName: 'भारतीय दूतावास प्रवासी सहायता केंद्र (PBSA)',
      tipHindi: 'वेतन न मिलने, पासपोर्ट रोके जाने या मेडिकल इमरजेंसी में भारतीय दूतावास के हेल्पलाइन नंबर पर 24 घंटे हिन्दी में मदद प्राप्त कर सकते हैं।'
    }
  },

  // 2. Japan (TITP / SSW Trainees)
  {
    id: 'culture-ja-omotenashi',
    languageId: 'japanese',
    categoryHindi: '🇯🇵 जापान कार्य संस्कृति, 5S नियम व भूकंप सुरक्षा',
    titleHindi: 'जापान में काम करने के नियम, 5S सफाई व सुरक्षा',
    titleEnglish: 'Japan Workplace 5S, Safety & Earthquake Protocol',
    subtitleHindi: 'सुबह की सभा (Chourei), समय की पाबंदी, कचरा छंटाई और भूकंप के समय सुरक्षा',
    heroQuote: {
      target: '安全第一、整理整頓、ご安全に！',
      phoneticHindi: 'आन्ज़ेन दाइइची, सेइरी सेइतोन, गो-आन्ज़ेन नी!',
      phonetic: 'Anzen Daiichi, Seiri Seiton, Go-anzen ni!',
      translationHindi: 'सुरक्षा सर्वोपरि है, सफाई और व्यवस्था बनाए रखें, सुरक्षित रहें!'
    },
    overviewHindi: 'जापान में TITP (तकनीकी प्रशिक्षु) और SSW (कुशल कामगार) के रूप में काम करने वाले भारतीय श्रमिकों का बहुत सम्मान है। जापानी कार्यस्थलों पर समय की पाबंदी (Punctuality), सफाई की 5S प्रणाली, और टीम के साथ मिलकर सुरक्षित काम करना सबसे अहम है।',
    dos: [
      {
        ruleHindi: 'समय से 10 मिनट पहले कार्यस्थल पहुंचें',
        explanationHindi: 'जापान में ठीक समय पर आना देर माना जाता है। काम शुरू होने से 10-15 मिनट पहले पहुंचकर तैयारी करें।'
      },
      {
        ruleHindi: 'सुबह की सभा (Chourei) में ऊर्जा से अभिवादन करें',
        explanationHindi: 'हर सुबह अपने साथियों और सुपरवाइज़र को झुककर "ओहायो गोज़ाइमास" (शुभ प्रभात) कहें।'
      },
      {
        ruleHindi: '5S नियम का कड़ाई से पालन करें',
        explanationHindi: 'सेइरी (छंटाई), सेइतोन (सही जगह रखना), सेइसो (सफाई), सेइकेत्सु (मानकीकरण), सित्सुके (अनुशासन) - अपने औजार हमेशा साफ रखें।'
      },
      {
        ruleHindi: 'भूकंप अलार्म बजने पर तुरंत मेज के नीचे सिर बचाएं',
        explanationHindi: 'जापान में भूकंप आने पर घबराएं नहीं। सिर को हेलमेट या तकिए से ढकें, गैस/बिजली बंद करें और कंपनी के निर्दिष्ट सुरक्षित शेल्टर (हिनान्शो) में जाएं।'
      },
      {
        ruleHindi: 'ट्रेन और बस में फोन साइलेंट (मद्नर मोड) पर रखें',
        explanationHindi: 'जापान में सार्वजनिक परिवहन में फोन पर बात करना दूसरों को परेशान करना माना जाता है।'
      }
    ],
    donts: [
      {
        ruleHindi: 'बिना बताए काम से कभी गैरहाजिर न रहें',
        explanationHindi: 'यदि तबीयत खराब हो तो काम शुरू होने से कम से कम 1 घंटा पहले अपने इंचार्ज को फोन या मैसेज से सूचित करें।'
      },
      {
        ruleHindi: 'कचरा एक साथ कभी न फेंकें',
        explanationHindi: 'जापान में जलने वाला कचरा (Moe-gomi), न जलने वाला (Moenai-gomi) और प्लास्टिक/बोतलें अलग-अलग डिब्बों में ही डाली जाती हैं।'
      },
      {
        ruleHindi: 'चॉपस्टिक को चावल में सीधा कभी न गाड़ें',
        explanationHindi: 'खाना खाते समय चॉपस्टिक को चावल के कटोरे में खड़ा करना शोक सभा का प्रतीक माना जाता है।'
      },
      {
        ruleHindi: 'रेजिडेंस कार्ड (Zairyu Card) बिना लिए बाहर न निकलें',
        explanationHindi: 'जापान में अपना ओरिजिनल विदेशी पहचान पत्र (ज़ायरू कार्ड) हमेशा अपने पर्स/जेब में रखना कानूनी रूप से आवश्यक है।'
      }
    ],
    keyPhrases: [
      {
        text: 'よろしくお願いします',
        phoneticHindi: 'योरोशिकु ओनेगाइ शिमास',
        phonetic: 'Yoroshiku onegai shimasu',
        translationHindi: 'कृपया मेरा मार्गदर्शन करें / आपके साथ काम करने की खुशी है',
        contextHindi: 'काम शुरू करते समय या किसी से सहायता मांगते समय।'
      },
      {
        text: 'お疲れ様でした',
        phoneticHindi: 'ओत्सुकारेसामा देशिता',
        phonetic: 'Otsukaresama deshita',
        translationHindi: 'आज के कठिन परिश्रम के लिए बहुत-बहुत धन्यवाद!',
        contextHindi: 'शिफ्ट या काम खत्म होने पर सभी सहकर्मियों से विदा लेते समय।'
      },
      {
        text: '失礼します / すみません',
        phoneticHindi: 'शित्सुरेइ शिमास / सुमिमासेन',
        phonetic: 'Shitsurei shimasu / Sumimasen',
        translationHindi: 'माफ कीजिए / क्या मैं अंदर आ सकता हूँ?',
        contextHindi: 'सुपरवाइज़र के केबिन में प्रवेश करते समय या किसी का ध्यान आकर्षित करने के लिए।'
      },
      {
        text: '承知いたしました / わかりました',
        phoneticHindi: 'शोउची इताशिमाशिता / वकारिमाशिता',
        phonetic: 'Shouchi itashimashita / Wakarimashita',
        translationHindi: 'जी हाँ, मैंने निर्देश अच्छी तरह समझ लिया है।',
        contextHindi: 'सुपरवाइज़र द्वारा काम समझाने पर विनम्र पुष्टि करने के लिए।'
      }
    ],
    embassyHelpline: {
      country: 'जापान (Embassy of India, Tokyo)',
      helplineNumber: '+81-3-3262-2391 to 97 / OTIT Helpline for Trainees',
      portalName: 'भारतीय दूतावास टोक्यो एवं OTIT प्रवासी संरक्षण',
      tipHindi: 'जापान में OTIT और भारतीय दूतावास हिंदी व अन्य भारतीय भाषाओं में कानूनी व स्वास्थ्य सहायता उपलब्ध कराते हैं।'
    }
  },

  // 3. Germany (Technical Skilled Workers)
  {
    id: 'culture-de-punctuality',
    languageId: 'german',
    categoryHindi: '🇩🇪 जर्मन कार्यस्थल सुरक्षा, पंक्चुअलिटी व लेबर राइट्स',
    titleHindi: 'जर्मनी में कार्यस्थल अनुशासन, सुरक्षा उपकरण (PSA) व नियम',
    titleEnglish: 'German Workplace Discipline, Safety PPE & Labor Standards',
    subtitleHindi: 'समय की पाबंदी (Pünktlichkeit), रविवार की शांति (Ruhezeit) और कार्यशाला सुरक्षा',
    heroQuote: {
      target: 'Pünktlichkeit und Sicherheit sind das Fundament guter Arbeit.',
      phoneticHindi: 'पुंक्टलिशकाइट उंड ज़िशरहाइट ज़िंद दास फुंडामेंट ग्यूटर आरबाइट',
      phonetic: 'Puenktlichkeit und Sicherheit sind das Fundament guter Arbeit.',
      translationHindi: 'समय की पाबंदी और सुरक्षा ही अच्छे काम की मजबूत नींव हैं।'
    },
    overviewHindi: 'जर्मनी में इलेक्ट्रीशियन, वेल्डर, फिटर, नर्सिंग और तकनीकी ट्रेड में भारतीय कुशल कामगारों की भारी मांग है। जर्मनी में सुरक्षा नियम (DIN / OSHA), पर्सनल प्रोटेक्टिव इक्विपमेंट (PSA) और लिखित अनुबंध (Arbeitsvertrag) का अक्षरशः पालन किया जाता है।',
    dos: [
      {
        ruleHindi: 'समय की पाबंदी (Pünktlichkeit) का पूरा ध्यान रखें',
        explanationHindi: 'जर्मनी में 5 मिनट पहले पहुंचना सामान्य माना जाता है। देर होने पर तुरंत अपने फोरमैन को सूचित करें।'
      },
      {
        ruleHindi: 'सुरक्षा उपकरण (PSA) हमेशा सही तरीके से पहनें',
        explanationHindi: 'सुरक्षा चश्मा (Schutzbrille), जूते (Sicherheitsschuhe) और दस्ताने (Handschuhe) कार्यशाला में अनिवार्य हैं।'
      },
      {
        ruleHindi: 'सुपरवाइज़र को "Sie" (आप) कहकर संबोधित करें',
        explanationHindi: 'जर्मन संस्कृति में कार्यस्थल पर सहकर्मियों और बॉस को "Herr Müller" या "Frau Schmidt" कहकर आदर दिया जाता है।'
      },
      {
        ruleHindi: 'रविवार को शांति का नियम (Ruhezeit) मानें',
        explanationHindi: 'जर्मनी में रविवार को और रात 10 बजे के बाद ड्रिलिंग, वाशिंग मशीन या तेज आवाज वाला काम करना प्रतिबंधित है।'
      }
    ],
    donts: [
      {
        ruleHindi: 'बिना समझे कभी "हाँ" न कहें',
        explanationHindi: 'यदि तकनीकी ड्राइंग या सुरक्षा निर्देश समझ में न आए तो बेझिझक कहें: "Können Sie das bitte wiederholen?" (क्या आप दोबारा समझा सकते हैं?)।'
      },
      {
        ruleHindi: 'बिना अनुमति दूसरे के औजार न उठाएं',
        explanationHindi: 'जर्मन वर्कशॉप में हर कारीगर का अपना टूलसेट होता है। औजार लेने से पहले हमेशा पूछें।'
      },
      {
        ruleHindi: 'सड़क पर लाल बत्ती होने पर कभी पार न करें',
        explanationHindi: 'पैदल चलते समय भी लाल सिग्नल (Rote Ampel) पर रुकना कानूनी नियम है।'
      }
    ],
    keyPhrases: [
      {
        text: 'Guten Morgen Herr / Frau [Name]!',
        phoneticHindi: 'गुटन मोर्गन हेर / फ्राउ [नाम]!',
        phonetic: 'Goo-ten mor-gen Herr / Frau!',
        translationHindi: 'शुभ प्रभात सर / मैडम!',
        contextHindi: 'सुबह वर्कशॉप या साइट पर पहुंचते ही अभिवादन करने के लिए।'
      },
      {
        text: 'Ja, verstanden! Ich fange sofort an.',
        phoneticHindi: 'या, फेयरश्टान्डन! इष फांगे ज़ोफोर्ट आन.',
        phonetic: 'Yah, fer-shtahn-den! Ikh fahn-geh zoh-fort ahn.',
        translationHindi: 'हाँ, समझ गया! मैं तुरंत काम शुरू करता हूँ।',
        contextHindi: 'सुपरवाइज़र के निर्देश को स्वीकार करने के लिए।'
      },
      {
        text: 'Wo ist der Erste-Hilfe-Kasten?',
        phoneticHindi: 'वो इस्ट डेर एर्स्टे-हिल्फे-कास्टन?',
        phonetic: 'Voh ist dehr Ehr-steh-Hil-feh-Kah-sten?',
        translationHindi: 'प्राथमिक उपचार (First Aid) बॉक्स कहाँ है?',
        contextHindi: 'चोट लगने पर या इमरजेंसी में मरहम-पट्टी खोजने के लिए।'
      }
    ],
    embassyHelpline: {
      country: 'जर्मनी (Embassy of India, Berlin)',
      helplineNumber: '+49-30-257950 / MADAD Portal',
      portalName: 'भारतीय दूतावास बर्लिन एवं कौंसुलेट फ्रैंकफर्ट/म्यूनिख',
      tipHindi: 'जर्मनी में स्वास्थ्य बीमा (Krankenversicherung) हर कर्मचारी के लिए अनिवार्य है और कंपनी द्वारा कराया जाता है।'
    }
  },

  // 4. Workplace English (International Sites)
  {
    id: 'culture-en-safety',
    languageId: 'english',
    categoryHindi: '🌐 इंटरनेशनल साइट HSE सुरक्षा नियम व टूलबॉक्स टॉक',
    titleHindi: 'अंतरराष्ट्रीय साइट्स पर काम करने के नियम व सेफ्टी प्रोटोकॉल',
    titleEnglish: 'International Site HSE Safety, Toolbox Talks & Labor Rights',
    subtitleHindi: 'टूलबॉक्स टॉक, स्टॉप वर्क अथॉरिटी, वर्क परमिट और सुरक्षा संचार',
    heroQuote: {
      target: 'Safety First! If it is not safe, STOP the work immediately.',
      phoneticHindi: 'सेफ्टी फर्स्ट! इफ इट इज़ नॉट सेफ, स्टॉप द वर्क इमीडियेटली.',
      phonetic: 'Safety First! If it is not safe, STOP the work immediately.',
      translationHindi: 'सुरक्षा हमेशा पहले! यदि काम सुरक्षित नहीं है, तो तुरंत काम रोक दें।'
    },
    overviewHindi: 'बहुराष्ट्रीय इंफ्रास्ट्रक्चर प्रोजेक्ट्स, तेल रिफाइनरियों और अंतरराष्ट्रीय निर्माण स्थलों पर अंग्रेजी में सेफ्टी निर्देश दिए जाते हैं। यहाँ "टूलबॉक्स टॉक" (दैनिक सुरक्षा बैठक) और 3-वे कम्युनिकेशन का पालन करने से दुर्घटनाएं रुकती हैं।',
    dos: [
      {
        ruleHindi: 'हर सुबह 10 मिनट की टूलबॉक्स टॉक (TBT) में भाग लें',
        explanationHindi: 'काम शुरू करने से पहले सेफ्टी ऑफिसर के निर्देशों को ध्यान से सुनें और अपनी उपस्थिति दर्ज कराएं।'
      },
      {
        ruleHindi: 'स्टॉप वर्क अथॉरिटी (Stop Work) का उपयोग करें',
        explanationHindi: 'अंतरराष्ट्रीय नियम: यदि आपको लगे कि मचान (Scaffolding) कमजोर है या बिजली का नंगा तार है, तो आपको काम रोकने का पूरा कानूनी अधिकार है।'
      },
      {
        ruleHindi: 'निर्देश दोहराकर पुष्टि करें (Read-Back Technique)',
        explanationHindi: 'वॉकी-टॉकी पर कोई भी माप या निर्देश मिलने पर उसे दोहराएं: "Copy that, 50 meters pipeline".'
      },
      {
        ruleHindi: 'इमरजेंसी असेंबली पॉइंट (Assembly Point) याद रखें',
        explanationHindi: 'साइट पर साइरन बजने पर तुरंत अपने निर्धारित ग्रीन असेंबली पॉइंट पर जाकर लाइन में खड़े हों।'
      }
    ],
    donts: [
      {
        ruleHindi: 'बिना साइन्ड वर्क परमिट (PTW) के खतरनाक काम न करें',
        explanationHindi: 'वेल्डिंग, कन्फाइंड स्पेस या ऊंचाई पर काम के लिए परमिट-टू-वर्क आवश्यक है।'
      },
      {
        ruleHindi: 'टूटे या बिना इंस्पेक्शन टैग वाले औजारों का प्रयोग न करें',
        explanationHindi: 'बिजली के औजारों पर वैध कलर-कोडेड सेफ्टी टैग अवश्य चेक करें।'
      }
    ],
    keyPhrases: [
      {
        text: 'Good morning Sir! Work permit is checked and signed.',
        phoneticHindi: 'गुड मॉर्निंग सर! वर्क परमिट इज़ चेक्ड एंड साइन्ड.',
        phonetic: 'Good morning Sir! Work permit is checked and signed.',
        translationHindi: 'नमस्ते सर! वर्क परमिट की जांच हो गई है और हस्ताक्षर हैं।',
        contextHindi: 'सेफ्टी ऑफिसर या इंजीनियर को काम की शुरुआत में रिपोर्ट करने के लिए।'
      },
      {
        text: 'Please give me the emergency medical help immediately.',
        phoneticHindi: 'प्लीज़ गिव मी द इमरजेंसी मेडिकल हेल्प इमीडियेटली.',
        phonetic: 'Please give me the emergency medical help immediately.',
        translationHindi: 'कृपया तुरंत आपातकालीन चिकित्सा सहायता भेजें।',
        contextHindi: 'साइट पर किसी साथी को चोट लगने पर वॉकी-टॉकी पर बोलने के लिए।'
      },
      {
        text: 'Understood Sir, we will finish the task safely.',
        phoneticHindi: 'अंडरस्टूड सर, वी विल फिनिश द टास्क सेफली.',
        phonetic: 'Understood Sir, we will finish the task safely.',
        translationHindi: 'समझ गया सर, हम यह काम पूरी सुरक्षा के साथ पूरा करेंगे।',
        contextHindi: 'सुपरवाइज़र को काम का भरोसा दिलाने के लिए।'
      }
    ],
    embassyHelpline: {
      country: 'अंतरराष्ट्रीय सहायता (Global MADAD & MEA India)',
      helplineNumber: '1800-11-3090 (Toll Free India) / +91-11-49016000',
      portalName: 'विदेश मंत्रालय भारत सरकार प्रवासी प्रकोष्ठ (e-Migrate / MADAD)',
      tipHindi: 'किसी भी देश में भारतीय श्रमिकों के लिए 24x7 हेल्पलाइन और भारतीय दूतावास की कानूनी शाखा निःशुल्क परामर्श प्रदान करती है।'
    }
  },

  // 5. France
  {
    id: 'culture-fr-savoir-vivre',
    languageId: 'french',
    categoryHindi: '🇫🇷 फ्रेंच कार्यस्थल शिष्टाचार, सुरक्षा व रहन-सहन',
    titleHindi: 'फ्रांस में निर्माण स्थल नियम, सेफ्टी व बोलचाल के तौर-तरीके',
    titleEnglish: 'French Construction Etiquette, Safety & Workplace Standards',
    subtitleHindi: 'शेफ डे चैंटियर से बात, सेफ्टी गियर और फ्रेंच सामाजिक नियम',
    heroQuote: {
      target: 'La sécurité sur le chantier est l\'affaire de tous.',
      phoneticHindi: 'ला सेक्यूरीते सुर ल शाँतिए ए लाफेर द तूस.',
      phonetic: "Lah say-kew-ree-tay sewr luh shahn-tyay ay lah-fehr duh toos.",
      translationHindi: 'साइट पर सुरक्षा हर एक व्यक्ति की सामूहिक जिम्मेदारी है।'
    },
    overviewHindi: 'फ्रांस और यूरोपीय यूनियन में श्रमिकों की सुरक्षा, उचित मजदूरी और मानवीय गरिमा को बहुत महत्व दिया जाता है। साइट बॉस (Chef de Chantier) से शिष्टाचार से बात करने और सेफ्टी नियमों का पालन करने से काम आसान होता है।',
    dos: [
      {
        ruleHindi: 'हमेशा "Bonjour Monsieur" बोलकर बात शुरू करें',
        explanationHindi: 'फ्रांस में किसी भी दफ्तर या साइट पर सीधे सवाल पूछने से पहले "बोंजूर" बोलना अत्यंत आवश्यक शिष्टाचार है।'
      },
      {
        ruleHindi: 'अजनबियों और अधिकारियों के लिए "Vous" (आप) का प्रयोग करें',
        explanationHindi: 'जब तक सामने वाला स्वयं "Tu" (तुम) बोलने को न कहे, तब तक आदरपूर्वक "Vous" कहें।'
      },
      {
        ruleHindi: 'सेफ्टी हेलमेट और हार्नेस का हमेशा प्रयोग करें',
        explanationHindi: 'फ्रांस में लेबर इंस्पेक्टर बिना सूचना के साइट की जांच करते हैं, नियमों का पूरा पालन करें।'
      }
    ],
    donts: [
      {
        ruleHindi: 'बिना अभिवादन के किसी दुकान या केबिन में प्रवेश न करें',
        explanationHindi: 'प्रवेश करते ही "Bonjour" और निकलते समय "Au revoir, bonne journée" कहें।'
      },
      {
        ruleHindi: 'साइट का मलबा या कचरा गलत जगह न फेंकें',
        explanationHindi: 'कचरे को निर्धारित रीसाइक्लिंग बिन में ही डालें।'
      }
    ],
    keyPhrases: [
      {
        text: 'Bonjour Monsieur, où sont les outils ?',
        phoneticHindi: 'बोंजूर मस्यु, ऊ सों ले ऊती?',
        phonetic: 'Bohn-zhoor Muh-syuh, oo sohn layz oo-tee?',
        translationHindi: 'नमस्ते सर, काम के औजार कहाँ रखे हैं?',
        contextHindi: 'साइट पर टूल्स का स्थान पूछने के लिए।'
      },
      {
        text: 'Merci beaucoup pour votre aide !',
        phoneticHindi: 'मेर्सी बोकू पूर वोत्र ऐद!',
        phonetic: 'Mehr-see boh-koo poor vohtr ehd!',
        translationHindi: 'आपकी सहायता के लिए बहुत-बहुत धन्यवाद!',
        contextHindi: 'मदद मिलने पर आभार प्रकट करने के लिए।'
      }
    ],
    embassyHelpline: {
      country: 'फ्रांस (Embassy of India, Paris)',
      helplineNumber: '+33-1-40507070 / MADAD Portal',
      portalName: 'भारतीय दूतावास पेरिस प्रवासी हेल्पलाइन',
      tipHindi: 'फ्रांस में लेबर कार्ड (Carte BTP) निर्माण श्रमिकों के लिए अनिवार्य पहचान पत्र है।'
    }
  },

  // 6. Spain & Latin America
  {
    id: 'culture-es-workplace',
    languageId: 'spanish',
    categoryHindi: '🇪🇸 स्पैनिश वर्कशॉप नियम, सुरक्षा व सहयोग',
    titleHindi: 'स्पेन में काम की सुरक्षा, मेंटेनेंस व बोलचाल के नियम',
    titleEnglish: 'Spanish Workshop Protocols, Safety & Collaboration',
    subtitleHindi: 'सुपरवाइज़र से बातचीत, सेफ्टी टूल्स और मेंटेनेंस नियम',
    heroQuote: {
      target: 'Trabajar con seguridad es cuidar de nuestra familia.',
      phoneticHindi: 'त्राबाखार कोन सेगुरीदाद एस कुइदार् दे नुएस्ट्रा फामिलिया.',
      phonetic: 'Trah-bah-khar kohn seh-goo-ree-dahd ehs kwee-dahr deh nwehs-trah fah-mee-lyah.',
      translationHindi: 'सुरक्षित काम करना ही अपने परिवार की सबसे बड़ी सुरक्षा है।'
    },
    overviewHindi: 'स्पेन और लैटिन अमेरिकी देशों में गर्मजोशी और मिलनसार स्वभाव की सराहना की जाती है। वर्कशॉप में समय पर पहुंचना, दस्ताने व सेफ्टी चश्मा पहनना और सुपरवाइज़र के निर्देशों का पालन करना सफलता की कुंजी है।',
    dos: [
      {
        ruleHindi: 'हर सुबह "¡Buenos días!" (नमस्ते) कहें',
        explanationHindi: 'स्पेन में सुबह मिलते ही मुस्कुराकर नमस्ते कहना अच्छे संबंधों की शुरुआत करता है।'
      },
      {
        ruleHindi: 'काम के दौरान सेफ्टी दस्ताने और जूते पहनें',
        explanationHindi: 'पाइपलाइन, वेल्डिंग और बिजली के काम में सुरक्षा उपकरण अनिवार्य हैं।'
      },
      {
        ruleHindi: 'कोई कठिनाई होने पर तुरंत मदद मांगें',
        explanationHindi: '"¿Me puede ayudar, por favor?" (क्या आप मेरी मदद कर सकते हैं?) कहकर सहायता लें।'
      }
    ],
    donts: [
      {
        ruleHindi: 'बिना सुरक्षा गार्ड के मशीनों को हाथ न लगाएं',
        explanationHindi: 'खतरनाक कटर या ग्राइंडर का इस्तेमाल बिना सेफ्टी गार्ड के न करें।'
      },
      {
        ruleHindi: 'बिना सूचना के दोपहर के लंच (Comida) से देर न करें',
        explanationHindi: 'निर्धारित ब्रेक टाइम पर ही वापस काम पर लौटें।'
      }
    ],
    keyPhrases: [
      {
        text: '¡Buenos días! ¿Qué trabajo hacemos hoy?',
        phoneticHindi: 'ब्वेनोस दिआस! के त्राबाखो आसेमोस ओय?',
        phonetic: 'Bweh-nohs dee-ahs! Keh trah-bah-khoh ah-seh-mohs oy?',
        translationHindi: 'शुभ प्रभात! आज हमें क्या काम करना है?',
        contextHindi: 'सुपरवाइज़र से आज का कार्य पूछने के लिए।'
      },
      {
        text: '¡Cuidado! Hay peligro aquí.',
        phoneticHindi: 'कुइदादो! आय पेलिग्रो आपकी.',
        phonetic: 'Kwee-dah-doh! Eye peh-lee-groh ah-kee.',
        translationHindi: 'सावधान! यहाँ खतरा है।',
        contextHindi: 'साथी को खतरे से सचेत करने के लिए।'
      }
    ],
    embassyHelpline: {
      country: 'स्पेन (Embassy of India, Madrid)',
      helplineNumber: '+34-913098870 / MADAD Portal',
      portalName: 'भारतीय दूतावास मैड्रिड प्रवासी सहायता',
      tipHindi: 'स्पेन में सामाजिक सुरक्षा (Seguridad Social) के तहत सभी श्रमिकों को निःशुल्क सरकारी इलाज का अधिकार मिलता है।'
    }
  }
];
