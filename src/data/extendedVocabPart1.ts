import { MigrantVocabItem } from './migrantVocabTypes';

export const EXTENDED_VOCAB_PART_1: MigrantVocabItem[] = [
  // 1. Workplace & Communication Essentials (कार्यस्थल संवाद व शिष्टाचार)
  {
    id: 'jp58',
    tradeId: 'greetings',
    hindiTerm: 'समझ गया / समझ गई (आधिकारिक सहमति)',
    englishTerm: 'Understood / Acknowledged (Ryoukai)',
    importance: 'critical',
    tags: ['workplace', 'confirmation', 'respect'],
    translations: {
      'japanese': {
        word: '了解しました (りょうかいしました)',
        phoneticHindi: 'र्यौकाइ शिमाशिता',
        exampleSentence: '指示の内容、了解しました。すぐ作業に入ります。',
        examplePhoneticHindi: 'शिजी नो नाइयौ, र्यौकाइ शिमाशिता। सुगु साग्यौ नी हाइरिमासु।',
        exampleSentenceHindi: 'निर्देश समझ गया हूँ। तुरंत काम शुरू करता हूँ।'
      },
      'uae-arabic': {
        word: 'فَهِمْتُ / تَمَامْ',
        phoneticHindi: 'फ़हिम्तु / तमाम',
        exampleSentence: 'فَهِمْتُ التَّعْلِيمَاتِ يَا مُعَلِّمْ',
        examplePhoneticHindi: 'फ़हिम्तु अत-तालिमात या मुअल्लिम',
        exampleSentenceHindi: 'निर्देश समझ गया हूँ उस्ताद।'
      },
      'german': {
        word: 'Verstanden',
        phoneticHindi: 'फ़ेरश्टानडन',
        exampleSentence: 'Alles verstanden, ich fange sofort an.',
        examplePhoneticHindi: 'आलेस फ़ेरश्टानडन, इश फ़ांगे ज़ोफ़ोर्ट आन।',
        exampleSentenceHindi: 'सब समझ गया, मैं तुरंत शुरू करता हूँ।'
      },
      'english': {
        word: 'Understood / Roger that',
        phoneticHindi: 'अंडरस्टूड',
        exampleSentence: 'Understood, I will start the task immediately.',
        examplePhoneticHindi: 'अंडरस्टूड, आई विल स्टार्ट द टास्क इमीडियेटली।',
        exampleSentenceHindi: 'समझ गया, मैं तुरंत कार्य शुरू करूँगा।'
      },
      'french': {
        word: "C'est compris",
        phoneticHindi: 'से कोम्प्री',
        exampleSentence: "C'est bien compris, je commence tout de suite.",
        examplePhoneticHindi: 'से ब्याँ कोम्प्री, झ कोमोंस तू द सुइत।',
        exampleSentenceHindi: 'अच्छी तरह समझ गया, तुरंत शुरू करता हूँ।'
      },
      'spanish': {
        word: 'Entendido',
        phoneticHindi: 'एन्तेन्दीदो',
        exampleSentence: 'Entendido, comienzo la tarea de inmediato.',
        examplePhoneticHindi: 'एन्तेन्दीदो, कोमिएन्सो ला तारेआ दे इनमेदियातो।',
        exampleSentenceHindi: 'समझ गया, तुरंत काम शुरू करता हूँ।'
      }
    }
  },
  {
    id: 'jp59',
    tradeId: 'greetings',
    hindiTerm: 'जांच करता हूँ / पुष्टि करता हूँ',
    englishTerm: 'I will confirm / check (Kakunin)',
    importance: 'critical',
    tags: ['safety', 'confirmation', 'check'],
    translations: {
      'japanese': {
        word: '確認します (かくにんします)',
        phoneticHindi: 'काकुनिन शिमासु',
        exampleSentence: '図面と寸法をもう一度確認します。',
        examplePhoneticHindi: 'जुमेन तो सुनपौ ओ मोउ इचिदो काकुनिन शिमासु।',
        exampleSentenceHindi: 'ड्राइंग और माप की एक बार और जांच करता हूँ।'
      },
      'uae-arabic': {
        word: 'أَتَأَكَّدْ / أَفْحَصْ',
        phoneticHindi: 'अताअक्कद / अफ़हस',
        exampleSentence: 'سَوْفَ أَتَأَكَّدُ مِنَ القِيَاسَاتِ مَرَّةً أُخْرَى',
        examplePhoneticHindi: 'सौफ़ अताअक्कदु मिनल कियासात मर्रतन उखरा',
        exampleSentenceHindi: 'मैं नाप की दोबारा जांच करूँगा।'
      },
      'german': {
        word: 'Ich überprüfe es',
        phoneticHindi: 'इश ऊबरप्रूफ़े एस',
        exampleSentence: 'Ich überprüfe die Maße noch einmal.',
        examplePhoneticHindi: 'इश ऊबरप्रूफ़े दी मासे नोख आइनमाल।',
        exampleSentenceHindi: 'मैं नाप की एक बार और जांच करूँगा।'
      },
      'english': {
        word: 'I will check / verify',
        phoneticHindi: 'आई विल चेक',
        exampleSentence: 'I will check the blueprint measurements once again.',
        examplePhoneticHindi: 'आई विल चेक द ब्लूप्रिंट मेज़रमेंट्स वन्स अगेन।',
        exampleSentenceHindi: 'मैं ब्लूप्रिंट के नाप को दोबारा जांचूँगा।'
      },
      'french': {
        word: 'Je vérifie',
        phoneticHindi: 'झ वेरीफ़ी',
        exampleSentence: 'Je vérifie les dimensions sur le plan.',
        examplePhoneticHindi: 'झ वेरीफ़ी ले दीमोंसियों सुर ल पलों।',
        exampleSentenceHindi: 'मैं प्लान पर नाप जांचता हूँ।'
      },
      'spanish': {
        word: 'Voy a verificar',
        phoneticHindi: 'बोय आ वेरीफ़िकार',
        exampleSentence: 'Voy a verificar las medidas en el plano.',
        examplePhoneticHindi: 'बोय आ वेरीफ़िकार लास मेदीदास एन एल प्लानो।',
        exampleSentenceHindi: 'मैं प्लान में नाप की जांच करता हूँ।'
      }
    }
  },
  {
    id: 'jp60',
    tradeId: 'workplace_salary',
    hindiTerm: 'रिपोर्ट-संपर्क-सलाह (हो-रेन-सो नियम)',
    englishTerm: 'Report, Contact, Consult (Hou-Ren-Sou)',
    importance: 'critical',
    tags: ['workplace', 'communication', 'culture'],
    translations: {
      'japanese': {
        word: '報連相 (ほうれんそう - 報告・連絡・相談)',
        phoneticHindi: 'हौ-रेन-सौ (हौकोकु, रेनराकु, सौदान)',
        exampleSentence: '日本の職場では報連相がとても大切です。',
        examplePhoneticHindi: 'निहोन नो शोकुबा देवा हौरेनसोउ गा तोतेमो ताइसेत्सु देसु।',
        exampleSentenceHindi: 'जापानी कार्यस्थल में रिपोर्टिंग और सलाह बहुत महत्वपूर्ण है।'
      },
      'uae-arabic': {
        word: 'التَّقْرِير وَالتَّوَاصُل',
        phoneticHindi: 'अत-तक़रीर वत-तवासुल',
        exampleSentence: 'أَبْلِغِ المَسْؤُولَ عَنْ كُلِّ تَطَوُّرٍ فِي العَمَلِ',
        examplePhoneticHindi: 'अब्लिग़ अल-मसऊल अन कुल्ली ततव्वुरिन फ़िल अमल',
        exampleSentenceHindi: 'काम के हर अपडेट की सूचना सुपरवाइजर को दें।'
      },
      'german': {
        word: 'Rücksprache und Bericht',
        phoneticHindi: 'रुकशप्राखे उंड बेरीष्ट',
        exampleSentence: 'Geben Sie regelmäßig Rückmeldung an den Meister.',
        examplePhoneticHindi: 'गेबेन ज़ी रेगेलमेसिग रुकमेल्डुंग आन देन माइस्टर।',
        exampleSentenceHindi: 'सुपरवाइजर को नियमित रिपोर्ट और फीडबैक दें।'
      },
      'english': {
        word: 'Report, Update, and Consult',
        phoneticHindi: 'रिपोर्ट एंड कंसल्ट',
        exampleSentence: 'Always report issues and consult your team leader in Japan.',
        examplePhoneticHindi: 'ऑलवेज रिपोर्ट इश्यूज एंड कंसल्ट योर टीम लीडर।',
        exampleSentenceHindi: 'हमेशा समस्याओं की रिपोर्ट करें और टीम लीडर से सलाह लें।'
      },
      'french': {
        word: 'Rendre compte et consulter',
        phoneticHindi: 'रोंद्र कोम्त ए कोन्सुलते',
        exampleSentence: 'Informez votre chef de chantier de toute anomalie.',
        examplePhoneticHindi: 'एंफ़ोर्में वोत्र शेफ़ द शोंतिए द तूत अनोमाली।',
        exampleSentenceHindi: 'किसी भी कमी की सूचना तुरंत साइट इंचार्ज को दें।'
      },
      'spanish': {
        word: 'Reportar y consultar',
        phoneticHindi: 'रेपोर्तार ई कोन्सुलतार',
        exampleSentence: 'Informe a su supervisor sobre cualquier cambio.',
        examplePhoneticHindi: 'इनफ़ोर्मे आ सू सुपरविसोर सोब्रे कुआलक्येर काम्बियो।',
        exampleSentenceHindi: 'किसी भी बदलाव की जानकारी सुपरवाइजर को दें।'
      }
    }
  },
  {
    id: 'jp61',
    tradeId: 'greetings',
    hindiTerm: 'कृपया थोड़ा इंतजार करें',
    englishTerm: 'Please wait a moment (Shoushou omachi)',
    importance: 'high',
    tags: ['polite', 'waiting', 'service'],
    translations: {
      'japanese': {
        word: '少々お待ちください (しょうしょうおまちください)',
        phoneticHindi: 'शौशौ ओमाची कुदासाई',
        exampleSentence: '担当者を呼びますので、少々お待ちください。',
        examplePhoneticHindi: 'तान्तौशा ओ योबिमासु नोदे, शौशौ ओमाची कुदासाई।',
        exampleSentenceHindi: 'मैं संबंधित अधिकारी को बुलाता हूँ, कृपया थोड़ा रुकिए।'
      },
      'uae-arabic': {
        word: 'انْتَظِرْ لَحْظَةً لَوْ سَمَحْتَ',
        phoneticHindi: 'इंतज़िर लहज़तन लौ समह्त',
        exampleSentence: 'انْتَظِرْ هُنَا دَقِيقَةً مِنْ فَضْلِكَ',
        examplePhoneticHindi: 'इंतज़िर हुना दक़ीक़तन मिन फ़दलिक',
        exampleSentenceHindi: 'कृपया यहाँ एक मिनट प्रतीक्षा करें।'
      },
      'german': {
        word: 'Einen Moment bitte',
        phoneticHindi: 'आइनन मोमेंट बिटे',
        exampleSentence: 'Warten Sie bitte einen kleinen Augenblick.',
        examplePhoneticHindi: 'वार्तेन ज़ी बिटे आइनन क्लाइनेन आउगनब्लिक।',
        exampleSentenceHindi: 'कृपया एक क्षण प्रतीक्षा करें।'
      },
      'english': {
        word: 'Please wait a moment',
        phoneticHindi: 'प्लीज़ वेट अ मोमेंट',
        exampleSentence: 'Please wait a moment while I call the supervisor.',
        examplePhoneticHindi: 'प्लीज़ वेट अ मोमेंट व्हाइल आई कॉल द सुपरवाइजर।',
        exampleSentenceHindi: 'कृपया एक क्षण रुकें जब तक मैं सुपरवाइजर को बुलाता हूँ।'
      },
      'french': {
        word: 'Un instant, s’il vous plaît',
        phoneticHindi: 'अँ एँस्तों सिल वू प्ले',
        exampleSentence: 'Patientez un instant, je préviens le responsable.',
        examplePhoneticHindi: 'पास्योंते अँ एँस्तों, झ प्रेव्याँ ल रेस्पोंसाब्ल।',
        exampleSentenceHindi: 'एक क्षण रुकें, मैं प्रभारी को सूचित करता हूँ।'
      },
      'spanish': {
        word: 'Un momento, por favor',
        phoneticHindi: 'उन मोमेन्तो पोर फ़ावोर',
        exampleSentence: 'Espere un momento, por favor.',
        examplePhoneticHindi: 'एस्पेरे उन मोमेन्तो पोर फ़ावोर।',
        exampleSentenceHindi: 'कृपया एक क्षण प्रतीक्षा करें।'
      }
    }
  },
  {
    id: 'jp62',
    tradeId: 'greetings',
    hindiTerm: 'मैं पहले जा रहा हूँ (शिफ्ट समाप्ति विदाई)',
    englishTerm: 'Excuse me for leaving first (Osaki ni)',
    importance: 'high',
    tags: ['workplace', 'etiquette', 'greeting'],
    translations: {
      'japanese': {
        word: 'お先に失礼します (おさきにしつれいします)',
        phoneticHindi: 'ओसाकी नी शित्सुरेइ शिमासु',
        exampleSentence: '本日の業務が終わりました。お先に失礼します！',
        examplePhoneticHindi: 'होंजित्सु नो ग्यौमु गा ओवारिमाशिता। ओसाकी नी शित्सुरेइ शिमासु!',
        exampleSentenceHindi: 'आज का कार्य पूरा हो गया है। मैं विदा लेता हूँ!'
      },
      'uae-arabic': {
        word: 'أَسْتَأْذِنُكُمْ الآن / مَعَ السَّلَامَة',
        phoneticHindi: 'अस्ताज़नुकुम अल-आन / मअ अस-सलामा',
        exampleSentence: 'انْتَهَى دَوَامِي، مَعَ السَّلَامَةِ يَا شَبَاب',
        examplePhoneticHindi: 'इन्तहा दवामी, मअ अस-सलामति या शबाब',
        exampleSentenceHindi: 'मेरी शिफ्ट समाप्त हुई, अलविदा दोस्तों।'
      },
      'german': {
        word: 'Schönen Feierabend!',
        phoneticHindi: 'शोनेन फ़ायरआबेंड',
        exampleSentence: 'Ich mache jetzt Schluss. Schönen Feierabend allen!',
        examplePhoneticHindi: 'इश माखे येट्स्ट श्लुस। शोनेन फ़ायरआबेंड आलेन!',
        exampleSentenceHindi: 'मैं अब जा रहा हूँ। सभी को शुभ संध्या!'
      },
      'english': {
        word: 'See you tomorrow / Leaving first',
        phoneticHindi: 'सी यू टुमारो',
        exampleSentence: 'My shift is done for today. See you all tomorrow!',
        examplePhoneticHindi: 'माय शिफ्ट इज़ डन फॉर टुडे। सी यू ऑल टुमारो!',
        exampleSentenceHindi: 'आज की मेरी शिफ्ट पूरी हुई। कल मिलते हैं!'
      },
      'french': {
        word: 'Bonne soirée / À demain',
        phoneticHindi: 'बोन सुआरे / आ दमाँ',
        exampleSentence: 'J’ai terminé ma journée, à demain tout le monde !',
        examplePhoneticHindi: 'झे तेरमीने मा जूख़्ने, आ दमाँ तू ल मोंद!',
        exampleSentenceHindi: 'मेरा आज का काम पूरा हुआ, कल मिलते हैं!'
      },
      'spanish': {
        word: 'Hasta mañana / Me retiro',
        phoneticHindi: 'आस्ता मान्याना',
        exampleSentence: 'Terminé mi turno por hoy. ¡Hasta mañana!',
        examplePhoneticHindi: 'तेरमीने मी तूर्नो पोर ओय। आस्ता मान्याना!',
        exampleSentenceHindi: 'आज की शिफ्ट पूरी हुई। कल मिलते हैं!'
      }
    }
  },
  {
    id: 'jp63',
    tradeId: 'factory',
    hindiTerm: '5S नियम (छंटाई, व्यवस्था, सफाई, स्वच्छता, अनुशासन)',
    englishTerm: '5S Methodology (Seiri, Seiton, Seisou, Seiketsu, Shitsuke)',
    importance: 'critical',
    tags: ['factory', '5S', 'quality', 'discipline'],
    translations: {
      'japanese': {
        word: '5S運動 (ごエス - 整理・整頓・清掃・清潔・躾)',
        phoneticHindi: 'गो-एस (सेइरी, सेइतोन, सेइसौ, सेइकेत्सु, शित्सुके)',
        exampleSentence: '毎朝作業前に5Sの点検を行いましょう。',
        examplePhoneticHindi: 'माइआसा साग्यौ माए नी गो-एस नो तेनकेन ओ ओकोनाइमाशौ।',
        exampleSentenceHindi: 'रोज सुबह काम से पहले 5S का निरीक्षण करें।'
      },
      'uae-arabic': {
        word: 'نِظَام التَّرْتِيب وَالنَّظَافَة 5S',
        phoneticHindi: 'निज़ाम अत-तरतीब वन-नज़ाफ़ा 5S',
        exampleSentence: 'حَافِظْ عَلَى نَظَافَةِ وَتَرْتِيبِ مَوْقِعِ العَمَلِ',
        examplePhoneticHindi: 'हाफ़िज़ अला नज़ाफ़ति व तरतीबि मौक़िइल अमल',
        exampleSentenceHindi: 'कार्यस्थल की स्वच्छता और व्यवस्था बनाए रखें।'
      },
      'german': {
        word: '5S-Methode am Arbeitsplatz',
        phoneticHindi: 'फ़्युंफ़-एस मेथोडे आम आरबाइट्सप्लात्स',
        exampleSentence: 'Halten Sie Ihren Arbeitsbereich stets sauber und ordentlich.',
        examplePhoneticHindi: 'हाल्टेन ज़ी ईरान आरबाइट्सबेराइश श्टेट्स ज़ाउबर उंड ओर्डेन्ट्लिश।',
        exampleSentenceHindi: 'अपने कार्यस्थल को हमेशा साफ और व्यवस्थित रखें।'
      },
      'english': {
        word: '5S Workplace Standard',
        phoneticHindi: 'फ़ाइव-एस वर्कप्लेस स्टैंडर्ड',
        exampleSentence: 'Follow the 5S principles: Sort, Set in order, Shine, Standardize, Sustain.',
        examplePhoneticHindi: 'फ़ॉलो द फ़ाइव-एस प्रिंसिपल्स।',
        exampleSentenceHindi: '5S नियमों का पालन करें: छंटाई, व्यवस्था, सफाई, मानकीकरण और अनुशासन।'
      },
      'french': {
        word: 'Méthode des 5S',
        phoneticHindi: 'मेथोड दे 5S',
        exampleSentence: 'Appliquez la méthode 5S pour maintenir un atelier propre.',
        examplePhoneticHindi: 'आप्लिके ला मेथोड 5S पूर मांतेनीर अँ आतलिए प्रोप्र।',
        exampleSentenceHindi: 'वर्कशॉप को साफ रखने के लिए 5S विधि लागू करें।'
      },
      'spanish': {
        word: 'Metodología 5S',
        phoneticHindi: 'मेतोदोलोखिया 5S',
        exampleSentence: 'Mantenga el área de trabajo ordenada con las 5S.',
        examplePhoneticHindi: 'मान्तेन्गा एल एरिया दे त्राबाखो ओर्देनादा कौन लास 5S।',
        exampleSentenceHindi: '5S के साथ कार्यक्षेत्र को व्यवस्थित रखें।'
      }
    }
  },
  {
    id: 'jp64',
    tradeId: 'factory',
    hindiTerm: 'उंगली दिखाकर सुरक्षा पुष्टि (योशी!)',
    englishTerm: 'Pointing and Calling Safety Check (Yubisashi Koshou)',
    importance: 'critical',
    tags: ['safety', 'check', 'factory', 'railway'],
    translations: {
      'japanese': {
        word: '指差呼称 (ゆびさしこしょう - ヨシ！)',
        phoneticHindi: 'युबिसाशी कोशौ (योशी!)',
        exampleSentence: 'スイッチON！周囲確認、ヨシ！',
        examplePhoneticHindi: 'सुइच्ची ऑन! शूउई काकुनिन, योशी!',
        exampleSentenceHindi: 'स्विच ऑन! चारों तरफ की सुरक्षा जांच, ठीक है (योशी)!'
      },
      'uae-arabic': {
        word: 'فَحْصُ السَّلَامَة بِالإِشَارَة',
        phoneticHindi: 'फ़ह्सुस सलामाति बिल-इशारा',
        exampleSentence: 'تَأَكَّدْ مِنْ جَمِيعِ صَمَّامَاتِ الأَمَانِ قَبْلَ التَّشْغِيل',
        examplePhoneticHindi: 'ताअक्कद मिन जमीई सम्मामातिल अमान क़ब्लत तशग़ील',
        exampleSentenceHindi: 'मशीन चलाने से पहले सभी सुरक्षा वाल्वों की पुष्टि करें।'
      },
      'german': {
        word: 'Sicherheits-Check mit Zeigen und Rufen',
        phoneticHindi: 'ज़िशरहाइट्स चेक मिट त्साइगेन उंड रूफ़ेन',
        exampleSentence: 'Kontrollieren Sie den Gefahrenbereich vor dem Start.',
        examplePhoneticHindi: 'कोन्त्रोलिएरेन ज़ी देन गेफ़ारेनबेराइश फ़ोर देम श्टार्ट।',
        exampleSentenceHindi: 'स्टार्ट करने से पहले खतरे वाले क्षेत्र की जांच करें।'
      },
      'english': {
        word: 'Pointing and Calling Safety Check',
        phoneticHindi: 'पॉइंटिंग एंड कॉलिंग चेक',
        exampleSentence: 'Always perform pointing and calling checks: All Clear, Yoshi!',
        examplePhoneticHindi: 'ऑलवेज परफ़ॉर्म पॉइंटिंग एंड कॉलिंग चेक्स।',
        exampleSentenceHindi: 'हमेशा उंगली से संकेत कर बोलें: सब सुरक्षित है, योशी!'
      },
      'french': {
        word: 'Contrôle visuel et vocal de sécurité',
        phoneticHindi: 'कोन्त्रोल विज़्युएल ए वोकाल दे सेक्युरिते',
        exampleSentence: 'Vérifiez chaque zone de danger avant d’actionner la machine.',
        examplePhoneticHindi: 'वेरीफ़िए शाक ज़ोन द दोंजे आवाँ दाक्सियोंने ला माशीन।',
        exampleSentenceHindi: 'मशीन चालू करने से पहले प्रत्येक खतरे वाले क्षेत्र की जांच करें।'
      },
      'spanish': {
        word: 'Verificación de seguridad con señalamiento',
        phoneticHindi: 'वेरीफ़िकासियों दे सेगूरीदाद',
        exampleSentence: 'Verifique visualmente que el área esté despejada: ¡Listo!',
        examplePhoneticHindi: 'वेरीफ़ीके विसुआलमेन्ते के एल एरिया एस्ते देस्पेखादा: लीस्तो!',
        exampleSentenceHindi: 'देखकर सुनिश्चित करें कि क्षेत्र साफ है: तैयार!'
      }
    }
  },
  {
    id: 'jp65',
    tradeId: 'factory',
    hindiTerm: 'आपातकालीन स्टॉप बटन',
    englishTerm: 'Emergency Stop Button',
    importance: 'critical',
    tags: ['emergency', 'factory', 'machine', 'danger'],
    translations: {
      'japanese': {
        word: '非常停止ボタン (ひじょうていしボタン)',
        phoneticHindi: 'हिजौ तेइशी बोतान',
        exampleSentence: '異変を感じたら、直ちに非常停止ボタンを押してください！',
        examplePhoneticHindi: 'इहेन ओ कांजितारा, तादाचिनी हिजौ तेइशी बोतान ओ ओशिते कुदासाई!',
        exampleSentenceHindi: 'कोई गड़बड़ी महसूस होने पर तुरंत इमरजेंसी स्टॉप बटन दबाएं!'
      },
      'uae-arabic': {
        word: 'زِرُّ التَّوَقُّفِ الطَّارِئ',
        phoneticHindi: 'ज़िर्रुत तवक़्क़ुफ़ित तारी',
        exampleSentence: 'اضْغَطْ زِرَّ التَّوَقُّفِ فَوْرًا عِنْدَ الخَطَر',
        examplePhoneticHindi: 'इद्ग़त ज़िर्रत तवक़्क़ुफ़ फ़ौरन इंदल ख़तर',
        exampleSentenceHindi: 'खतरे के समय तुरंत इमरजेंसी स्टॉप बटन दबाएं।'
      },
      'german': {
        word: 'der Not-Aus-Schalter',
        phoneticHindi: 'डेयर नोट-आउस-शाल्टर',
        exampleSentence: 'Drücken Sie im Notfall sofort den roten Not-Aus-Schalter!',
        examplePhoneticHindi: 'द्रुकेन ज़ी इम नोटफ़ाल ज़ोफ़ोर्ट देन रोटेन नोट-आउस-शाल्टर!',
        exampleSentenceHindi: 'आपात स्थिति में तुरंत लाल नॉट-आउस बटन दबाएं!'
      },
      'english': {
        word: 'Emergency Stop Button',
        phoneticHindi: 'इमरजेंसी स्टॉप बटन',
        exampleSentence: 'Hit the emergency stop button immediately if an anomaly occurs.',
        examplePhoneticHindi: 'हिट द इमरजेंसी स्टॉप बटन इमीडियेटली।',
        exampleSentenceHindi: 'खराबी आने पर तुरंत इमरजेंसी स्टॉप बटन दबाएं।'
      },
      'french': {
        word: "le bouton d'arrêt d'urgence",
        phoneticHindi: 'ल बूतों दारे द्यूरजोंस',
        exampleSentence: "Appuyez immédiatement sur l'arrêt d'urgence en cas d'incident !",
        examplePhoneticHindi: 'आप्युए इमेदियातमाँ सुर लारे द्यूरजोंस ऑँ का दाँसीदों!',
        exampleSentenceHindi: 'हादसा होने पर तुरंत इमरजेंसी स्टॉप बटन दबाएं!'
      },
      'spanish': {
        word: 'el botón de parada de emergencia',
        phoneticHindi: 'एल बोतोन दे पारादा दे एमेरखेन्सिया',
        exampleSentence: '¡Presione la parada de emergencia en caso de peligro!',
        examplePhoneticHindi: 'प्रेसीयोने ला पारादा दे एमेरखेन्सिया एन कासो दे पेलिग्रो!',
        exampleSentenceHindi: 'खतरे की स्थिति में इमरजेंसी स्टॉप बटन दबाएं!'
      }
    }
  },
  {
    id: 'jp66',
    tradeId: 'construction',
    hindiTerm: 'सुरक्षा चश्मा (गॉगल्स)',
    englishTerm: 'Safety Glasses / Protective Goggles',
    importance: 'critical',
    tags: ['ppe', 'safety', 'eyes', 'welding'],
    translations: {
      'japanese': {
        word: '保護メガネ (ほごメガネ)',
        phoneticHindi: 'होगो मेगाने',
        exampleSentence: '研磨や切削作業では保護メガネを必ずかけてください。',
        examplePhoneticHindi: 'केन्मा या सेस्साकु साग्यौ देवा होगो मेगाने ओ कानाराजु काकेते कुदासाई।',
        exampleSentenceHindi: 'ग्राइंडिंग और कटिंग के समय सुरक्षा चश्मा जरूर पहनें।'
      },
      'uae-arabic': {
        word: 'نَظَّارَاتُ السَّلَامَةِ الوَاقِيَة',
        phoneticHindi: 'नज़्ज़ारात अल-सलामा अल-वाक़िया',
        exampleSentence: 'ارْتَدِ نَظَّارَاتِ السَّلَامَةِ أَثْنَاءَ القَصِّ وَالتَّلْحِيم',
        examplePhoneticHindi: 'इर्तेदी नज़्ज़ारातिस सलामति अस्नाअल क़स्सी वत्तलहीम',
        exampleSentenceHindi: 'कटिंग व वेल्डिंग के समय सेफ्टी चश्मा पहनें।'
      },
      'german': {
        word: 'die Schutzbrille',
        phoneticHindi: 'दी शुत्सब्रिले',
        exampleSentence: 'Tragen Sie beim Schleifen immer eine Schutzbrille.',
        examplePhoneticHindi: 'त्रागेन ज़ी बाइम श्लाइफ़ेन इम्मर आइने शुत्सब्रिले।',
        exampleSentenceHindi: 'घिसाई करते समय हमेशा सुरक्षा चश्मा पहनें।'
      },
      'english': {
        word: 'Safety Goggles / Protective Eyewear',
        phoneticHindi: 'सेफ्टी गॉगल्स',
        exampleSentence: 'Always wear safety glasses during grinding and welding operations.',
        examplePhoneticHindi: 'ऑलवेज वेयर सेफ्टी ग्लासेस ड्यूरिंग ग्राइंडिंग।',
        exampleSentenceHindi: 'ग्राइंडिंग व वेल्डिंग के समय हमेशा सुरक्षा चश्मा पहनें।'
      },
      'french': {
        word: 'les lunettes de protection',
        phoneticHindi: 'ले ल्युनेत द प्रोतेक्सियों',
        exampleSentence: 'Portez des lunettes de protection pendant le meulage.',
        examplePhoneticHindi: 'पोर्ते दे ल्युनेत द प्रोतेक्सियों पोंदाँ ल म्यूलाज।',
        exampleSentenceHindi: 'ग्राइंडिंग के दौरान सुरक्षा चश्मा पहनें।'
      },
      'spanish': {
        word: 'las gafas de protección',
        phoneticHindi: 'लास गाफ़ास दे प्रोतेक्सियों',
        exampleSentence: 'Use gafas de seguridad durante las tareas de corte.',
        examplePhoneticHindi: 'उसे गाफ़ास दे सेगूरीदाद दूरांते लास तारेआस दे कोर्ते।',
        exampleSentenceHindi: 'कटिंग कार्य के दौरान सुरक्षा चश्मा पहनें।'
      }
    }
  },
  {
    id: 'jp67',
    tradeId: 'construction',
    hindiTerm: 'सेफ्टी हार्नेस (ऊंचाई सुरक्षा बेल्ट)',
    englishTerm: 'Full Body Safety Harness (Anzentai)',
    importance: 'critical',
    tags: ['height', 'safety', 'harness', 'construction'],
    translations: {
      'japanese': {
        word: '安全帯 / 墜落制止用器具 (あんぜんたい)',
        phoneticHindi: 'आन्ज़ेन्ताई / त्सुइराकु सेइशी किगु',
        exampleSentence: '2メートル以上の高所作業では安全帯のフックを掛けます。',
        examplePhoneticHindi: 'नी मेतोरु इजौ नो क Build शो साग्यौ देवा आन्ज़ेन्ताई नो फ़ुक्कु ओ काकेमासु।',
        exampleSentenceHindi: '2 मीटर से अधिक ऊंचाई पर सेफ्टी बेल्ट का हुक जरूर फंसाएं।'
      },
      'uae-arabic': {
        word: 'حِزَامُ الأَمَانِ لِلمُرْتَفَعَات',
        phoneticHindi: 'हिज़ामुल अमान लिल-मुर्तफ़िआत',
        exampleSentence: 'ارْبِطْ حِزَامَ الأَمَانِ دَائِمًا عِنْدَ العَمَلِ عَلَى السِّقَالَة',
        examplePhoneticHindi: 'इर्बित हिज़ामल अमान दायमन इंदल अमलि अलस सिक़ाला',
        exampleSentenceHindi: 'मचान पर काम करते समय हमेशा सेफ्टी हार्नेस बांधें।'
      },
      'german': {
        word: 'der Sicherheitsgurt / Auffanggurt',
        phoneticHindi: 'डेयर ज़िशरहाइट्सगुर्ट',
        exampleSentence: 'Verwenden Sie bei Arbeiten in der Höhe immer ein Sicherheitsgeschirr.',
        examplePhoneticHindi: 'फ़ेरवेंडेन ज़ी बाइ आरबाइटेन इन डेर होहे इम्मर आइन ज़िशरहाइट्सगेशीर।',
        exampleSentenceHindi: 'ऊंचाई पर काम करते समय हमेशा सेफ्टी हार्नेस लगाएं।'
      },
      'english': {
        word: 'Full Body Safety Harness',
        phoneticHindi: 'सेफ्टी हार्नेस',
        exampleSentence: 'Attach your safety harness hook when working above 2 meters.',
        examplePhoneticHindi: 'अटैच योर सेफ्टी हार्नेस हुक अबव टू मीटर्स।',
        exampleSentenceHindi: '2 मीटर से ऊपर काम करते समय सेफ्टी हार्नेस हुक लगाएं।'
      },
      'french': {
        word: 'le harnais de sécurité',
        phoneticHindi: 'ल हार्ने द सेक्युरिते',
        exampleSentence: 'Attachez votre harnais de sécurité pour tout travail en hauteur.',
        examplePhoneticHindi: 'आताशे वोत्र हार्ने द सेक्युरिते पूर तू त्रावाय ऑँ ओतूर।',
        exampleSentenceHindi: 'ऊंचाई पर सभी कामों के लिए सेफ्टी हार्नेस बांधें।'
      },
      'spanish': {
        word: 'el arnés de seguridad anticaídas',
        phoneticHindi: 'एल आर्नेस दे सेगूरीदाद',
        exampleSentence: 'Enganche el arnés de seguridad al trabajar en andamios.',
        examplePhoneticHindi: 'एनगांचे एल आर्नेस दे सेगूरीदाद अल त्राबाखार एन आन्दामियोस।',
        exampleSentenceHindi: 'मचान पर काम करते समय सेफ्टी हार्नेस लगाएं।'
      }
    }
  },
  {
    id: 'jp68',
    tradeId: 'healthcare',
    hindiTerm: 'बुजुर्ग देखभाल (काइगो सेवा)',
    englishTerm: 'Elderly Care / Nursing Support (Kaigo)',
    importance: 'critical',
    tags: ['healthcare', 'caregiver', 'japan', 'elderly'],
    translations: {
      'japanese': {
        word: '介護サービス (かいごサービス)',
        phoneticHindi: 'काइगो सा-बिसु',
        exampleSentence: '日本の介護施設で利用者様の生活を支援します。',
        examplePhoneticHindi: 'निहोन नो काइगो शिसेत्सु दे रियौशा-सामा नो सेइकात्सु ओ शिएन शिमासु।',
        exampleSentenceHindi: 'जापान के केयर होम में बुजुर्गों की दिनचर्या में सहायता करते हैं।'
      },
      'uae-arabic': {
        word: 'رِعَايَةُ كِبَارِ السِّن',
        phoneticHindi: 'रिआयातु किबारिस सिन',
        exampleSentence: 'نُقَدِّمُ الرِّعَايَةَ اليَوْمِيَّةَ لِكِبَارِ السِّنِّ بِاحْتِرَام',
        examplePhoneticHindi: 'नुक़द्दिमुर रिआयातल यौमिय्यत लिकिबारिस सिन बि-एहतिराम',
        exampleSentenceHindi: 'हम बुजुर्गों को आदर के साथ दैनिक देखभाल प्रदान करते हैं।'
      },
      'german': {
        word: 'die Altenpflege',
        phoneticHindi: 'दी आल्टेनप्फ़्लेगे',
        exampleSentence: 'In der Altenpflege unterstützen wir Senioren im Alltag.',
        examplePhoneticHindi: 'इन डेर आल्टेनप्फ़्लेगे उंटरश्टूट्सन वीर ज़ेनियोरेन इम आलटॉग।',
        exampleSentenceHindi: 'बुजुर्गों की देखभाल में हम उनकी दिनचर्या में मदद करते हैं।'
      },
      'english': {
        word: 'Elderly Care / Caregiving',
        phoneticHindi: 'एल्डरली केयर',
        exampleSentence: 'Caregiving in Japan involves compassionate daily life assistance.',
        examplePhoneticHindi: 'केयरगिविंग इन जापान इन्वॉल्व्स असिस्टेंस।',
        exampleSentenceHindi: 'जापान में केयरगिविंग का अर्थ है सम्मानपूर्वक सहायता करना।'
      },
      'french': {
        word: 'les soins aux personnes âgées',
        phoneticHindi: 'ले सुआँ ओ पेरसन आगे',
        exampleSentence: 'Nous accompagnons les personnes âgées avec bienveillance.',
        examplePhoneticHindi: 'नू ज़ाकोम्पान्यों ले पेरसन आगे आवेक ब्याँवेयोंस।',
        exampleSentenceHindi: 'हम बुजुर्गों की सेवा आदरपूर्वक करते हैं।'
      },
      'spanish': {
        word: 'el cuidado de adultos mayores',
        phoneticHindi: 'एल कुइदादो दे आदुल्तोस मायोरेस',
        exampleSentence: 'Brindamos apoyo diario a los adultos mayores.',
        examplePhoneticHindi: 'ब्रिन्दामोस आपोयो दियारियो आ लोस आदुल्तोस मायोरेस।',
        exampleSentenceHindi: 'हम बुजुर्गों को दैनिक सहायता प्रदान करते हैं।'
      }
    }
  },
  {
    id: 'jp69',
    tradeId: 'healthcare',
    hindiTerm: 'दवाइयां देने का समय',
    englishTerm: 'Medicine Administration Time',
    importance: 'critical',
    tags: ['medicine', 'caregiver', 'schedule', 'pills'],
    translations: {
      'japanese': {
        word: 'お薬の時間 (おくすりのじかん)',
        phoneticHindi: 'ओकुसुरी नो जिकान',
        exampleSentence: '食後のお薬の時間です。お水と一緒にどうぞ。',
        examplePhoneticHindi: 'शोकुगो नो ओकुसुरी नो जिकान देसु। ओमिजु तो इशो नी दोउज़ो।',
        exampleSentenceHindi: 'खाने के बाद की दवा का समय हो गया है। पानी के साथ लीजिए।'
      },
      'uae-arabic': {
        word: 'مَوْعِدُ تَنَاوُلِ الدَّوَاء',
        phoneticHindi: 'मौइद तनावुलिद दवा',
        exampleSentence: 'حَانَ مَوْعِدُ تَنَاوُلِ الدَّوَاءِ مَعَ المَاء',
        examplePhoneticHindi: 'हाना मौइदु तनावुलिद दवाइ मअल मा',
        exampleSentenceHindi: 'पानी के साथ दवा लेने का समय आ गया है।'
      },
      'german': {
        word: 'die Medikamenten-Einnahme',
        phoneticHindi: 'दी मेदिकातेन-आइननामे',
        exampleSentence: 'Es ist Zeit für Ihre Medikamente nach dem Essen.',
        examplePhoneticHindi: 'एस इस्ट त्साइट फ़्यूर ईरे मेदिकाते नाख देम एसेन।',
        exampleSentenceHindi: 'खाने के बाद अपनी दवाइयां लेने का समय है।'
      },
      'english': {
        word: 'Medication Time',
        phoneticHindi: 'मेडिकेशन टाइम',
        exampleSentence: 'It is time for your post-meal medication with water.',
        examplePhoneticHindi: 'इट इज़ टाइम फ़ॉर योर मेडिकेशन।',
        exampleSentenceHindi: 'पानी के साथ भोजनोपरांत दवा लेने का समय है।'
      },
      'french': {
        word: 'L’heure des médicaments',
        phoneticHindi: 'लूर दे मेदिकामाँ',
        exampleSentence: 'C’est l’heure de prendre vos médicaments avec un verre d’eau.',
        examplePhoneticHindi: 'से लूर द प्रोंद्र वो मेदिकामाँ आवेक अँ वेर दो।',
        exampleSentenceHindi: 'एक गिलास पानी के साथ अपनी दवाइयां लेने का समय है।'
      },
      'spanish': {
        word: 'Hora de la medicación',
        phoneticHindi: 'ओरा दे ला मेदिकासियों',
        exampleSentence: 'Es hora de tomar sus medicamentos con agua.',
        examplePhoneticHindi: 'एस ओरा दे तोमार सुस मेदिकामांतोस कौन आगुआ।',
        exampleSentenceHindi: 'पानी के साथ अपनी दवा लेने का समय है।'
      }
    }
  },
  {
    id: 'jp70',
    tradeId: 'construction',
    hindiTerm: 'मचान (स्कैफोल्डिंग)',
    englishTerm: 'Scaffolding (Ashiba)',
    importance: 'critical',
    tags: ['construction', 'height', 'safety', 'tools'],
    translations: {
      'japanese': {
        word: '足場 (あしば)',
        phoneticHindi: 'आशिबा',
        exampleSentence: '足場の上を通るときは足元に十分注意してください。',
        examplePhoneticHindi: 'आशिबा नो उए ओ तोओरु तोकी वा आशिमोतो नी जूउबुन चूउई शिते कुदासाई।',
        exampleSentenceHindi: 'मचान पर चलते समय अपने कदमों का विशेष ध्यान रखें।'
      },
      'uae-arabic': {
        word: 'السِّقَالَة / السَّقَالَات',
        phoneticHindi: 'अस-सिक़ाला / अस-सक़ालात',
        exampleSentence: 'افْحَصْ أَرْجُلَ السِّقَالَةِ قَبْلَ الصُّعُودِ عَلَيْهَا',
        examplePhoneticHindi: 'इफ़हस अरजुलस सिक़ालति क़ब्लस सुऊदि अलैहा',
        exampleSentenceHindi: 'मचान पर चढ़ने से पहले उसके पैरों की मजबूती जांचें।'
      },
      'german': {
        word: 'das Baugerüst',
        phoneticHindi: 'दास बाउगेरुस्ट',
        exampleSentence: 'Achten Sie beim Begehen des Gerüsts auf lose Teile.',
        examplePhoneticHindi: 'आख़्तेन ज़ी बाइम बेगेहेन देस गेरुस्ट्स आउफ़ लोसे ताइले।',
        exampleSentenceHindi: 'मचान पर चलते समय ढीले हिस्सों का ध्यान रखें।'
      },
      'english': {
        word: 'Scaffolding',
        phoneticHindi: 'स्कैफ़ोल्डिंग',
        exampleSentence: 'Watch your step carefully while walking on the scaffolding.',
        examplePhoneticHindi: 'वॉच योर स्टेप केयरफुली ऑन द स्कैफ़ोल्डिंग।',
        exampleSentenceHindi: 'मचान पर चलते समय सावधानी से कदम रखें।'
      },
      'french': {
        word: "l'échafaudage",
        phoneticHindi: 'लेशाफ़ोदाज',
        exampleSentence: 'Vérifiez la stabilité de l’échafaudage avant de monter.',
        examplePhoneticHindi: 'वेरीफ़िए ला स्ताबीलिते द लेशाफ़ोदाज आवाँ द मोंते।',
        exampleSentenceHindi: 'ऊपर चढ़ने से पहले मचान की स्थिरता जांचें।'
      },
      'spanish': {
        word: 'el andamio',
        phoneticHindi: 'एल आन्दामियो',
        exampleSentence: 'Tenga cuidado al caminar sobre los andamios.',
        examplePhoneticHindi: 'तेन्गा कुइदादो अल कामिनार सोब्रे लोस आन्दामियोस।',
        exampleSentenceHindi: 'मचान पर चलते समय सावधानी बरतें।'
      }
    }
  },
  {
    id: 'jp71',
    tradeId: 'construction',
    hindiTerm: 'कंक्रीट ढलाई कार्य',
    englishTerm: 'Concrete Pouring (Konkuriito dasetsu)',
    importance: 'high',
    tags: ['civil', 'concrete', 'site', 'foundation'],
    translations: {
      'japanese': {
        word: 'コンクリート打設 (コンクリートだせつ)',
        phoneticHindi: 'कोन्कुरीतो दासेत्सु',
        exampleSentence: '生コン車が到着したら、バイブレーターを準備して打設します。',
        examplePhoneticHindi: 'नामा-कोन शा गा तौचाकु शितारा, बाइबुरे-ता- ओ जुन्बी शिते दासेत्सु शिमासु।',
        exampleSentenceHindi: 'रेडिमिक्स ट्रक आने पर वाइब्रेटर तैयार कर ढलाई शुरू करें।'
      },
      'uae-arabic': {
        word: 'صَبُّ الخَرَسَانَة',
        phoneticHindi: 'सब्बुल ख़रासाना',
        exampleSentence: 'شَغِّلِ الهَزَّازَ أَثْنَاءَ صَبِّ الخَرَسَانَةِ فِي القَالَب',
        examplePhoneticHindi: 'शग़्ग़िलिल हज़्ज़ाज़ अस्नाअ सब्बिल ख़रासाना फ़िल क़ालिब',
        exampleSentenceHindi: 'फ्रेम में कंक्रीट ढालते समय वाइब्रेटर चलाएं।'
      },
      'german': {
        word: 'das Betonieren',
        phoneticHindi: 'दास बेतोनिएरेन',
        exampleSentence: 'Verdichten Sie den frischen Beton mit dem Rüttler.',
        examplePhoneticHindi: 'फ़ेरदिश्टेन ज़ी देन फ्रिशेन बेतोन मिट देम रुट्लर।',
        exampleSentenceHindi: 'वाइब्रेटर से ताजा कंक्रीट को अच्छी तरह जमाएं।'
      },
      'english': {
        word: 'Concrete Pouring & Placement',
        phoneticHindi: 'कंक्रीट पोरिंग',
        exampleSentence: 'Use the concrete vibrator properly during the pouring process.',
        examplePhoneticHindi: 'यूज़ द कंक्रीट वाइब्रेटर ड्यूरिंग पोरिंग।',
        exampleSentenceHindi: 'ढलाई के दौरान कंक्रीट वाइब्रेटर का सही उपयोग करें।'
      },
      'french': {
        word: 'le coulage du béton',
        phoneticHindi: 'लूलाज दू बेतों',
        exampleSentence: 'Utilisez le vibreur pendant le coulage du béton.',
        examplePhoneticHindi: 'यूतलीज़े ल विब्रर पोंदाँ लूलाज दू बेतों।',
        exampleSentenceHindi: 'कंक्रीट ढलाई के दौरान वाइब्रेटर का प्रयोग करें।'
      },
      'spanish': {
        word: 'el vertido de hormigón',
        phoneticHindi: 'एल वेर्तिदो दे ओर्मीगोन',
        exampleSentence: 'Use el vibrador durante el vertido de hormigón.',
        examplePhoneticHindi: 'उसे एल विब्रादोर दूरांते एल वेर्तिदो दे ओर्मीगोन।',
        exampleSentenceHindi: 'कंक्रीट ढलाई के समय वाइब्रेटर का उपयोग करें।'
      }
    }
  },
  {
    id: 'jp72',
    tradeId: 'construction',
    hindiTerm: 'सरिया बांधना (रीबार फिक्सिंग)',
    englishTerm: 'Rebar Tying / Iron Work (Tekkin)',
    importance: 'high',
    tags: ['rebar', 'construction', 'iron', 'structure'],
    translations: {
      'japanese': {
        word: '鉄筋工事 / 結束 (てっきんこうじ / けっそく)',
        phoneticHindi: 'तेक्किन कौजी / केस्सोकु',
        exampleSentence: 'ハッカーを使って結束線で鉄筋をしっかり縛ります。',
        examplePhoneticHindi: 'हक्का- ओ त्सुकात्ते केस्सोकुसेन दे तेक्किन ओ शिक्कारी शिबारिमासु।',
        exampleSentenceHindi: 'हुक टूल से बाइंडिंग वायर द्वारा सरियों को मजबूती से बांधें।'
      },
      'uae-arabic': {
        word: 'تَرْكِيبُ وَتَرْبِيطُ حَدِيدِ التَّسْلِيح',
        phoneticHindi: 'तरकीब व तरबीत हदीदित तस्लीह',
        exampleSentence: 'ارْبِطْ أَسْيَاخَ الحَدِيدِ بِإِحْكَامٍ بِسِلْكِ الرَّبْط',
        examplePhoneticHindi: 'इर्बित असयाख़ल हदीद बि-एहकाम बिसिल्किर रब्त',
        exampleSentenceHindi: 'बाइंडिंग वायर से सरियों को मजबूती से बांधें।'
      },
      'german': {
        word: 'die Bewehrung / Eisen flechten',
        phoneticHindi: 'दी बेवेह्रुंग / आइज़न फ़्लेष्टेन',
        exampleSentence: 'Binden Sie die Bewährungsstäbe mit Bindedraht fest.',
        examplePhoneticHindi: 'बिन्देन ज़ी दी बेवेह्रुंग्सश्टेबे मिट बिन्देद्रात फ़ेस्ट।',
        exampleSentenceHindi: 'बाइंडिंग वायर से लोहे के सरियों को कसकर बांधें।'
      },
      'english': {
        word: 'Rebar Tying & Steel Fixing',
        phoneticHindi: 'रीबार टाइंग',
        exampleSentence: 'Tie the reinforcing rebar bars tightly with binding wire.',
        examplePhoneticHindi: 'टाई द रीबार टाइटली विद बाइंडिंग वायर।',
        exampleSentenceHindi: 'बाइंडिंग वायर से रीबार की छड़ों को कसकर बांधें।'
      },
      'french': {
        word: "le ferraillage et ligature",
        phoneticHindi: 'ल फ़ेरायाज ए लीगात्य्यूर',
        exampleSentence: 'Ligaturez solidement les barres de ferraille avec du fil de fer.',
        examplePhoneticHindi: 'लीगात्य्यूरे सोलीदमाँ ले बार द फ़ेराय आवेक दू फ़ील द फ़ेर।',
        exampleSentenceHindi: 'तार से लोहे की छड़ों को मजबूती से बांधें।'
      },
      'spanish': {
        word: 'el armado y atado de ferralla',
        phoneticHindi: 'एल आर्मादो ई आतादो दे फ़ेराया',
        exampleSentence: 'Ate bien las varillas de acero con alambre de amarre.',
        examplePhoneticHindi: 'आते ब्येन लास वारियास दे आसेरो कौन आलाम्ब्रे दे आमार्रे।',
        exampleSentenceHindi: 'तार से लोहे की छड़ों को अच्छी तरह बांधें।'
      }
    }
  }
];
