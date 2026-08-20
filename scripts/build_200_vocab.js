import fs from 'fs';
import path from 'path';

// Complete dictionary of Japanese workplace & life terms to take vocabulary to 200+
const VOCABULARY_LIST = [
  // 1. Polite Workplace Japanese & Daily Greetings
  {
    id: 'jp73',
    tradeId: 'greetings',
    hindiTerm: 'आपका बहुत-बहुत धन्यवाद (कृतज्ञता)',
    englishTerm: 'Thank you very much (Doumo Arigatou)',
    importance: 'critical',
    tags: ['polite', 'respect', 'daily'],
    translations: {
      japanese: {
        word: 'どうもありがとうございます (Doumo arigatou gozaimasu)',
        phoneticHindi: 'दौमो आरिगातौ गोज़ाइमासु',
        exampleSentence: 'ご指導いただき、どうもありがとうございます。',
        examplePhoneticHindi: 'गो-शिदौ इतादाकी, दौमो आरिगातौ गोज़ाइमासु।',
        exampleSentenceHindi: 'मार्गदर्शन देने के लिए आपका बहुत-बहुत धन्यवाद।'
      },
      'uae-arabic': { word: 'شُكْرًا جَزِيلًا لَكَ', phoneticHindi: 'शुकरन जज़ीलन लक', exampleSentence: 'شُكْرًا جَزِيلًا عَلَى مُسَاعَدَتِكَ يَا أَخِي', examplePhoneticHindi: 'शुकरन जज़ीलन अला मुसाअदतिक या अखी', exampleSentenceHindi: 'आपकी मदद के लिए बहुत-बहुत धन्यवाद भाई।' },
      german: { word: 'Vielen Dank', phoneticHindi: 'फ़िलेन दांक', exampleSentence: 'Vielen Dank für Ihre freundliche Unterstützung.', examplePhoneticHindi: 'फ़िलेन दांक फ़्यूर ईरे फ्रॉइन्डलिशे उंटरश्टूट्सुंग।', exampleSentenceHindi: 'आपकी सहायता के लिए बहुत धन्यवाद।' },
      english: { word: 'Thank you very much', phoneticHindi: 'थैंक यू वेरी मच', exampleSentence: 'Thank you very much for your guidance and support.', examplePhoneticHindi: 'थैंक यू वेरी मच फॉर योर सपोर्ट।', exampleSentenceHindi: 'आपके मार्गदर्शन के लिए बहुत-बहुत धन्यवाद।' },
      french: { word: 'Merci beaucoup', phoneticHindi: 'मेर्सी बोकू', exampleSentence: 'Merci beaucoup pour votre aide précieuse.', examplePhoneticHindi: 'मेर्सी बोकू पूर वोत्र एद प्रेसियज़।', exampleSentenceHindi: 'आपकी बहुमूल्य सहायता के लिए बहुत धन्यवाद।' },
      spanish: { word: 'Muchas gracias', phoneticHindi: 'मुचास ग्रासियास', exampleSentence: 'Muchas gracias por su valiosa ayuda.', examplePhoneticHindi: 'मुचास ग्रासियास पोर सू वालियोसा आयूदा।', exampleSentenceHindi: 'आपकी सहायता के लिए बहुत-बहुत धन्यवाद।' }
    }
  },
  {
    id: 'jp74',
    tradeId: 'greetings',
    hindiTerm: 'कृपया (सामान या अनुमति देते समय)',
    englishTerm: 'Please / Here you go (Douzo)',
    importance: 'critical',
    tags: ['polite', 'daily', 'courtesy'],
    translations: {
      japanese: {
        word: 'どうぞ (Douzo)',
        phoneticHindi: 'दोज़ो',
        exampleSentence: 'こちらの安全資料をどうぞご覧ください。',
        examplePhoneticHindi: 'कोचिरा नो आन्ज़ेन शिर्यौ ओ दोज़ो गोरान कुदासाई।',
        exampleSentenceHindi: 'कृपया यह सुरक्षा दस्तावेज देखें।'
      },
      'uae-arabic': { word: 'تَفَضَّلْ', phoneticHindi: 'तफ़द्दल', exampleSentence: 'تَفَضَّلْ هَذَا المَلَفُّ يَا أُسْتَاذ', examplePhoneticHindi: 'तफ़द्दल हाज़ल मलफ़्फ़ या उस्ताज़', exampleSentenceHindi: 'कृपया यह फ़ाइल लीजिए उस्ताद।' },
      german: { word: 'Bitte sehr / Hier bitte', phoneticHindi: 'बिटे ज़ेयर', exampleSentence: 'Hier bitte, die Unterlagen für Sie.', examplePhoneticHindi: 'हीयर बिटे, दी उंटरलागेन फ़्यूर ज़ी।', exampleSentenceHindi: 'कृपया लीजिए, यह दस्तावेज आपके लिए हैं।' },
      english: { word: 'Please / Here you go', phoneticHindi: 'प्लीज़ / हियर यू गो', exampleSentence: 'Please take this safety guideline document.', examplePhoneticHindi: 'प्लीज़ टेक दिस गाइडलाइन डॉक्युमेंट।', exampleSentenceHindi: 'कृपया यह सुरक्षा निर्देश पत्र लीजिए।' },
      french: { word: 'Je vous en prie / Voilà', phoneticHindi: 'झ वू ज़ों प्री', exampleSentence: 'Voilà les documents dont vous avez besoin.', examplePhoneticHindi: 'वुआला ले दोक्यमों दों वू ज़ावे बज़ुआँ।', exampleSentenceHindi: 'यह रहे वे दस्तावेज जिनकी आपको आवश्यकता थी।' },
      spanish: { word: 'Adelante / Por favor', phoneticHindi: 'आदेलान्ते / पोर फ़ावोर', exampleSentence: 'Aquí tiene los documentos, por favor.', examplePhoneticHindi: 'आकी तिएने लोस दोकुमेन्तोस, पोर फ़ावोर।', exampleSentenceHindi: 'यहाँ दस्तावेज हैं, कृपया लीजिए।' }
    }
  },
  {
    id: 'jp75',
    tradeId: 'greetings',
    hindiTerm: 'क्षमा करें / ध्यान आकर्षित करना',
    englishTerm: 'Excuse me / Sorry (Sumimasen)',
    importance: 'critical',
    tags: ['polite', 'daily', 'apology'],
    translations: {
      japanese: {
        word: 'すみません (Sumimasen)',
        phoneticHindi: 'सुमिमासेन',
        exampleSentence: 'すみません、この機械の使い方を教えていただけますか？',
        examplePhoneticHindi: 'सुमिमासेन, कोनो किकाई नो त्सुकाइकाता ओ ओशिएते इतादाकेमासु का?',
        exampleSentenceHindi: 'माफ़ कीजिए, क्या आप मुझे इस मशीन को चलाने का तरीका सिखा सकते हैं?'
      },
      'uae-arabic': { word: 'عَفْوًا / لَوْ سَمَحْتَ', phoneticHindi: 'अफ़वन / लौ समहत', exampleSentence: 'عَفْوًا يَا مُعَلِّمْ، كَيْفَ أُشَغِّلُ هَذِهِ الآلَة؟', examplePhoneticHindi: 'अफ़वन या मुअल्लिम, कैफ़ा उशग़्ग़िलु हाज़िहिल आला?', exampleSentenceHindi: 'माफ़ कीजिए उस्ताद, मैं यह मशीन कैसे चलाऊं?' },
      german: { word: 'Entschuldigung', phoneticHindi: 'एन्टशुलडीगुंग', exampleSentence: 'Entschuldigung, können Sie mir die Maschine erklären?', examplePhoneticHindi: 'एन्टशुलडीगुंग, कोन्नेन ज़ी मीर दी माशीने एरक्लेरेन?', exampleSentenceHindi: 'माफ़ कीजिए, क्या आप मुझे यह मशीन समझा सकते हैं?' },
      english: { word: 'Excuse me / Pardon', phoneticHindi: 'एक्सक्यूज़ मी', exampleSentence: 'Excuse me, could you show me how to operate this machine?', examplePhoneticHindi: 'एक्सक्यूज़ मी, कुड यू शो मी?', exampleSentenceHindi: 'माफ़ कीजिए, क्या आप मुझे इस मशीन का संचालन दिखा सकते हैं?' },
      french: { word: 'Excusez-moi / Pardon', phoneticHindi: 'एक्सक्यूज़े-मुआ', exampleSentence: 'Excusez-moi, comment fonctionne cette machine ?', examplePhoneticHindi: 'एक्सक्यूज़े-मुआ, कोमों फ़ोंक्सियों सेत माशीन ?', exampleSentenceHindi: 'माफ़ कीजिए, यह मशीन कैसे काम करती है?' },
      spanish: { word: 'Disculpe / Perdón', phoneticHindi: 'दिस्कुलपे', exampleSentence: 'Disculpe, ¿cómo se usa esta máquina?', examplePhoneticHindi: 'दिस्कुलपे, कोमो से ऊसा एस्ता माकीना?', exampleSentenceHindi: 'माफ़ कीजिए, यह मशीन कैसे उपयोग होती है?' }
    }
  },
  {
    id: 'jp76',
    tradeId: 'greetings',
    hindiTerm: 'क्या मैं मदद करूँ?',
    englishTerm: 'Shall I help you? (Otetsudai)',
    importance: 'high',
    tags: ['teamwork', 'help', 'polite'],
    translations: {
      japanese: {
        word: 'お手伝いしましょうか？ (おてつだいしましょうか)',
        phoneticHindi: 'ओतेत्सुदाई शिमाशौ का?',
        exampleSentence: '重そうな荷物ですね。お手伝いしましょうか？',
        examplePhoneticHindi: 'ओमोसौ ना निमोत्सु देसु ने। ओतेत्सुदाई शिमाशौ का?',
        exampleSentenceHindi: 'सामान भारी लग रहा है। क्या मैं मदद करूँ?'
      },
      'uae-arabic': { word: 'هَلْ أُسَاعِدُكَ؟', phoneticHindi: 'हल उसाइदुक?', exampleSentence: 'هَلْ أُسَاعِدُكَ فِي حَمْلِ هَذِهِ الصَّنَادِيق؟', examplePhoneticHindi: 'हल उसाइदुक फ़ी हम्लि हाज़िहिस सनादीक़?', exampleSentenceHindi: 'क्या मैं इन बक्सों को उठाने में आपकी मदद करूँ?' },
      german: { word: 'Kann ich Ihnen helfen?', phoneticHindi: 'कान इश ईनेन हेल्फ़ेन?', exampleSentence: 'Soll ich Ihnen beim Tragen helfen?', examplePhoneticHindi: 'ज़ोल इश ईनेन बाइम त्रागेन हेल्फ़ेन?', exampleSentenceHindi: 'क्या मैं सामान उठाने में आपकी मदद करूँ?' },
      english: { word: 'May I help you / Shall I assist?', phoneticHindi: 'मे आई हेल्प यू', exampleSentence: 'That box looks heavy. Shall I help you lift it?', examplePhoneticHindi: 'दैट बॉक्स लुक्स हेवी। शैल आई हेल्प यू?', exampleSentenceHindi: 'वह बक्सा भारी लगता है। क्या मैं उठाने में मदद करूँ?' },
      french: { word: 'Puis-je vous aider ?', phoneticHindi: 'प्युई-झ वू ज़ेदे ?', exampleSentence: 'Voulez-vous que je vous aide à porter cela ?', examplePhoneticHindi: 'वूले-वू क झ वू ज़ेद आ पोर्ते सला ?', exampleSentenceHindi: 'क्या आप चाहते हैं कि मैं इसे उठाने में आपकी मदद करूँ?' },
      spanish: { word: '¿Le ayudo con eso?', phoneticHindi: 'ले आयूदो कौन एसो?', exampleSentence: '¿Desea que le ayude a cargar esa caja?', examplePhoneticHindi: 'देसेआ के ले आयूदे आ कारगार एसा काखा?', exampleSentenceHindi: 'क्या मैं उस बक्से को उठाने में आपकी मदद करूँ?' }
    }
  },
  {
    id: 'jp77',
    tradeId: 'greetings',
    hindiTerm: 'सावधानी बरतें / ध्यान रखें',
    englishTerm: 'Please be careful / Take care (Ki wo tsukete)',
    importance: 'critical',
    tags: ['safety', 'warning', 'care'],
    translations: {
      japanese: {
        word: '気をつけてください (きをつけてください)',
        phoneticHindi: 'की ओ त्सुकेते कुदासाई',
        exampleSentence: '床が滑りやすいので、気をつけて歩いてください。',
        examplePhoneticHindi: 'युका गा सुबेरियासुई नोदे, की ओ त्सुकेते आरुइते कुदासाई।',
        exampleSentenceHindi: 'फर्श पर फिसलन है, इसलिए संभलकर चलें।'
      },
      'uae-arabic': { word: 'انْتَبِهْ جَيِّدًا / احْذَرْ', phoneticHindi: 'इन्तबिह जय्यिदन / इहज़र', exampleSentence: 'الأَرْضُ زَلِقَةٌ، انْتَبِهْ جَيِّدًا عِنْدَ المَشْي', examplePhoneticHindi: 'अल-अरदु ज़लिक़ा, इन्तबिह जय्यिदन इंदल मशी', exampleSentenceHindi: 'फर्श फिसलन भरा है, चलते समय पूरा ध्यान रखें।' },
      german: { word: 'Passen Sie bitte auf!', phoneticHindi: 'पासेन ज़ी बिटे आउफ़', exampleSentence: 'Der Boden ist nass, passen Sie bitte auf!', examplePhoneticHindi: 'डेयर बोडेन इस्ट नास, पासेन ज़ी बिटे आउफ़!', exampleSentenceHindi: 'फर्श गीला है, कृपया ध्यान रखें!' },
      english: { word: 'Please be careful / Watch out', phoneticHindi: 'प्लीज़ बी केयरफुल', exampleSentence: 'The floor is slippery, please be careful.', examplePhoneticHindi: 'द फ़्लोर इज़ स्लिपरी, बी केयरफुल।', exampleSentenceHindi: 'फर्श फिसलन भरा है, कृपया सावधानी रखें।' },
      french: { word: 'Faites attention, s’il vous plaît', phoneticHindi: 'फ़ेत आतंसियों सिल वू प्ले', exampleSentence: 'Le sol est glissant, faites bien attention.', examplePhoneticHindi: 'ल सोल ए ग्लिसाँ, फ़ेत ब्याँ आतंसियों।', exampleSentenceHindi: 'फर्श फिसलन भरा है, कृपया ध्यान रखें।' },
      spanish: { word: 'Tenga cuidado, por favor', phoneticHindi: 'तेन्गा कुइदादो पोर फ़ावोर', exampleSentence: 'El piso está resbaloso, tenga mucho cuidado.', examplePhoneticHindi: 'एल पीसो एस्ता रेस्बालोसो, तेन्गा मूचो कुइदादो।', exampleSentenceHindi: 'फर्श फिसलन भरा है, बहुत सावधानी रखें।' }
    }
  },
  {
    id: 'jp78',
    tradeId: 'greetings',
    hindiTerm: 'कृपया एक बार और बोलें',
    englishTerm: 'Please say it once more (Mou ichido)',
    importance: 'critical',
    tags: ['communication', 'listen', 'repeat'],
    translations: {
      japanese: {
        word: 'もう一度お願いします (もういちどおねがいします)',
        phoneticHindi: 'मोउ इचिदो ओनेगाइ शिमासु',
        exampleSentence: 'よく聞き取れませんでした。もう一度お願いします。',
        examplePhoneticHindi: 'योकु किकीतोरेमासेन देशिता। मोउ इचिदो ओनेगाइ शिमासु।',
        exampleSentenceHindi: 'मैं ठीक से सुन नहीं पाया। कृपया एक बार और बोलिए।'
      },
      'uae-arabic': { word: 'عِدْهَا مَرَّةً أُخْرَى لَوْ سَمَحْتَ', phoneticHindi: 'इदहा मर्रतन उखरा', exampleSentence: 'لَمْ أَسْمَعْ جَيِّدًا، عِدْهَا مَرَّةً أُخْرَى مِنْ فَضْلِكَ', examplePhoneticHindi: 'लम अस्मअ जय्यिदन, इदहा मर्रतन उखरा मिन फ़दलिक', exampleSentenceHindi: 'मैंने ठीक से नहीं सुना, कृपया दोबारा दोहराएं।' },
      german: { word: 'Noch einmal bitte', phoneticHindi: 'नोख आइनमाल बिटे', exampleSentence: 'Können Sie das bitte noch einmal wiederholen?', examplePhoneticHindi: 'कोन्नेन ज़ी दास बिटे नोख आइनमाल वीडरहोलेन?', exampleSentenceHindi: 'क्या आप कृपया इसे एक बार और दोहरा सकते हैं?' },
      english: { word: 'Once more, please / Pardon?', phoneticHindi: 'वन्स मोर, प्लीज', exampleSentence: 'I could not hear clearly. Could you say that once more, please?', examplePhoneticHindi: 'कुड यू से दैट वन्स मोर, प्लीज?', exampleSentenceHindi: 'मैं स्पष्ट नहीं सुन पाया। कृपया एक बार और दोहराएं।' },
      french: { word: 'Répétez une fois encore, s’il vous plaît', phoneticHindi: 'रेपेते यून फ़ुआ ओन्कोर', exampleSentence: 'Je n’ai pas bien compris, pouvez-vous répéter ?', examplePhoneticHindi: 'झ ने पा ब्याँ कोम्प्री, पूवे-वू रेपेते ?', exampleSentenceHindi: 'मुझे समझ नहीं आया, क्या आप दोहरा सकते हैं?' },
      spanish: { word: 'Repita una vez más, por favor', phoneticHindi: 'रेपीता ऊना वेस मास', exampleSentence: 'No entendí bien, ¿puede repetir una vez más?', examplePhoneticHindi: 'नो एन्तेन्दी ब्येन, पुएदे रेपेतीर ऊना वेस मास?', exampleSentenceHindi: 'मुझे ठीक से समझ नहीं आया, क्या आप एक बार और दोहरा सकते हैं?' }
    }
  },
  {
    id: 'jp79',
    tradeId: 'greetings',
    hindiTerm: 'मुझे समझ नहीं आया',
    englishTerm: 'I do not understand (Wakarimasen)',
    importance: 'critical',
    tags: ['communication', 'clarity', 'honesty'],
    translations: {
      japanese: {
        word: 'わかりません (Wakarimasen)',
        phoneticHindi: 'वाकारिमासेन',
        exampleSentence: '申し訳ありません、その単語の意味がわかりません。',
        examplePhoneticHindi: 'मौशिवाके आरिमासेन, सोनो तान्गो नो इमी गा वाकारिमासेन।',
        exampleSentenceHindi: 'क्षमा करें, मुझे उस शब्द का अर्थ समझ नहीं आया।'
      },
      'uae-arabic': { word: 'لَا أَفْهَمُ / مَوْ فَاهِمْ', phoneticHindi: 'ला अफ़हमु / मौ फ़ाहिम', exampleSentence: 'آسِفْ يَا مُعَلِّمْ، لَا أَفْهَمُ هَذِهِ الكَلِمَة', examplePhoneticHindi: 'आसिफ़ या मुअल्लिम, ला अफ़हमु हाज़िहिल कलिमा', exampleSentenceHindi: 'माफ़ कीजिए उस्ताद, मुझे यह शब्द समझ नहीं आ रहा है।' },
      german: { word: 'Ich verstehe nicht', phoneticHindi: 'इश फ़ेरश्टेहे निष्ट', exampleSentence: 'Es tut mir leid, ich verstehe das Wort nicht.', examplePhoneticHindi: 'एस तूत मीर लाइद, इश फ़ेरश्टेहे दास वोर्ट निष्ट।', exampleSentenceHindi: 'माफ़ कीजिए, मुझे इस शब्द का अर्थ नहीं आता।' },
      english: { word: 'I do not understand', phoneticHindi: 'आई डू नॉट अंडरस्टैंड', exampleSentence: 'I am sorry, I do not understand this instruction.', examplePhoneticHindi: 'आई एम सॉरी, आई डू नॉट अंडरस्टैंड।', exampleSentenceHindi: 'माफ़ कीजिए, मुझे यह निर्देश समझ नहीं आया।' },
      french: { word: 'Je ne comprends pas', phoneticHindi: 'झ न कोम्प्राँ पा', exampleSentence: 'Désolé, je ne comprends pas ce terme technique.', examplePhoneticHindi: 'देज़ोले, झ न कोम्प्राँ पा स तेर्म तेक्नीक।', exampleSentenceHindi: 'माफ़ कीजिए, मुझे यह तकनीकी शब्द समझ नहीं आया।' },
      spanish: { word: 'No entiendo', phoneticHindi: 'नो एन्तिएन्दो', exampleSentence: 'Lo siento, no entiendo esa palabra.', examplePhoneticHindi: 'लो सिएन्तो, नो एन्तिएन्दो एसा पालाब्रा।', exampleSentenceHindi: 'माफ़ कीजिए, मुझे वह शब्द समझ नहीं आया।' }
    }
  }
];

// 140+ targeted workplace specifications for comprehensive coverage up to 210 total words
const ADDITIONAL_VOCAB_SPECS = [
  // Factory, Machinery & 5S (80-95)
  {
    id: 'jp80', tradeId: 'factory',
    hi: 'ब्लूप्रिंट / तकनीकी ड्राइंग', en: 'Blueprint / Engineering Drawing (Zumen)',
    jpWord: '図面 (ずめん - Zumen)', jpHindi: 'जुमेन',
    jpEx: '作業を始める前に図面の寸法と公差をよく読んでください。', jpExHiPh: 'साग्यौ ओ हाजिमेरु माए नी जुमेन नो सुनपौ ओ योकु योन्दे कुदासाई।', jpExHi: 'काम शुरू करने से पहले ड्राइंग के नाप और टॉलरेंस को ध्यान से पढ़ें।'
  },
  {
    id: 'jp81', tradeId: 'factory',
    hi: 'वर्नियर कैलिपर (सटीक नाप)', en: 'Vernier Caliper (Nogisu)',
    jpWord: 'ノギス (Nogisu)', jpHindi: 'नोगिसु',
    jpEx: '外径と深さをノギスで0.05ミリ単位まで測ります。', jpExHiPh: 'गाइकेइ तो फ़ुकासा ओ नोगिसु दे हाकारिमासु।', jpExHi: 'बाहरी व्यास और गहराई को वर्नियर कैलिपर से नापें।'
  },
  {
    id: 'jp82', tradeId: 'factory',
    hi: 'डिफेक्टिव पीस / खराब माल', en: 'Defective Product / Reject (Furyouhin)',
    jpWord: '不良品 (ふりょうひん - Furyouhin)', jpHindi: 'फ़ुर्यौउहिन',
    jpEx: 'キズやバリのある部品は不良品箱に分けて入れます。', jpExHiPh: 'किजु या बारि नो आरु बुहिन वा फ़ुर्यौउहिन बाको नी वाकेते इरेमासु।', jpExHi: 'खरोंच या खुरदुरे किनारों वाले पुर्जों को डिफेक्टिव बॉक्स में अलग रखें।'
  },
  {
    id: 'jp83', tradeId: 'factory',
    hi: 'क्वालिटी निरीक्षण / जांच कार्य', en: 'Quality Inspection (Kensa)',
    jpWord: '検査・検品 (けんさ・けんぴん - Kensa)', jpHindi: 'केन्सा / केम्पिन',
    jpEx: '出荷前に全品の外観検査と寸法検査を行います。', jpExHiPh: 'शुक्का माए नी ज़ेम्पिन नो गाइकान केन्सा तो सुनपौ केन्सा ओ ओकोनाइमासु।', jpExHi: 'डिलीवरी से पहले सभी सामान की दिखावट व नाप की जांच करते हैं।'
  },
  {
    id: 'jp84', tradeId: 'factory',
    hi: 'वेल्डिंग कार्य (धातु जोड़ना)', en: 'Welding Work (Yousetsu)',
    jpWord: '溶接作業 (ようせつさぎょう - Yousetsu)', jpHindi: 'यौसेत्सु साग्यौ',
    jpEx: 'アーク溶接時は遮光面と革手袋を必ず着用します。', jpExHiPh: 'आ-कु यौसेत्सु-जी वा शाकौमेन तो कावा-तेबुकोरो ओ कानाराजु चाकुयौ शिमासु।', jpExHi: 'आर्क वेल्डिंग के समय वेल्डिंग शील्ड और चमड़े के दस्ताने जरूर पहनें।'
  },
  {
    id: 'jp85', tradeId: 'factory',
    hi: 'लेथ मशीन (खराद मशीन)', en: 'Lathe Machine (Senban)',
    jpWord: '旋盤 (せんばん - Senban)', jpHindi: 'सेन्बान',
    jpEx: '旋盤のチャックにワークをしっかり固定してください。', jpExHiPh: 'सेन्बान नो चाक्कु नी वा-कु ओ शिक्कारी कोतेइ शिते कुदासाई।', jpExHi: 'लेथ मशीन के चक में जॉब को मजबूती से कसें।'
  },
  {
    id: 'jp86', tradeId: 'factory',
    hi: 'प्रेस मशीन (शीट मेटल)', en: 'Press Machine (Puresuki)',
    jpWord: 'プレス機 (プレスき - Puresuki)', jpHindi: 'पुरेसु-की',
    jpEx: 'プレス機に手を入れる時は安全スイッチと光線センサーを確認します。', jpExHiPh: 'पुरेसु-की नी ते ओ इरेरु तोकी वा आन्ज़ेन सुइच्ची ओ काकुनिन शिमासु।', jpExHi: 'प्रेस मशीन में हाथ डालते समय सेफ्टी सेंसर व स्विच अवश्य जांचें।'
  },
  {
    id: 'jp87', tradeId: 'factory',
    hi: 'किनारों की घिसाई / बर हटाना', en: 'Deburring / Edge smoothing (Baritori)',
    jpWord: 'バリ取り (バリとり - Baritori)', jpHindi: 'बारितोरी',
    jpEx: '切断後の金属の端面をやすりで丁寧にバリ取りします。', jpExHiPh: 'सेत्सुदान-गो नो किन्ज़ोकु नो तान्मेन ओ यासुरी दे बारितोरी शिमासु।', jpExHi: 'कटिंग के बाद धातु के किनारों को रेती से घिसकर फिनिशिंग करें।'
  },
  {
    id: 'jp88', tradeId: 'factory',
    hi: 'उत्पाद / तैयार माल', en: 'Finished Product (Seihin / Ryouhin)',
    jpWord: '良品・製品 (りょうひん・せいひん)', jpHindi: 'र्यौउहिन / सेइहिन',
    jpEx: '合格した良品だけを箱詰めしてパレットに積みます。', jpExHiPh: 'गौकाकु शिता र्यौउहिन दाके ओ हाकोजुमे शिते पारेत्तो नी त्सुमिमासु।', jpExHi: 'पास हुए सही तैयार माल को ही डिब्बों में पैक करके पैलेट पर रखें।'
  },
  {
    id: 'jp89', tradeId: 'factory',
    hi: 'शिफ्ट कार्य (दिन/रात की पारी)', en: 'Shift Work (Koutai-sei)',
    jpWord: '交替勤務 / シフト (こうたいきんむ)', jpHindi: 'कौताइ किन्मु / शिफ़ुतो',
    jpEx: '来週から夜勤シフトに入りますので体調を整えます。', jpExHiPh: 'राइश्यूउ कारा याकिन शिफ़ुतो नी हाइरिमासु नोदे ताइचौ ओ तोतोनोएमासु।', jpExHi: 'अगले हफ्ते से नाइट शिफ्ट शुरू होगी, इसलिए स्वास्थ्य का ध्यान रखता हूँ।'
  },
  {
    id: 'jp90', tradeId: 'factory',
    hi: 'पेचकश (स्क्रूड्राइवर)', en: 'Screwdriver (Doraibaa)',
    jpWord: 'ドライバー (Doraibaa / プラス・マイナス)', jpHindi: 'दोराइबा-',
    jpEx: 'プラスドライバーでネジをしっかり締め付けてください。', jpExHiPh: 'पुरासु दोराइबा- दे नेजी ओ शिक्कारी शिमेत्सुकेते कुदासाई।', jpExHi: 'प्लस स्क्रूड्राइवर से पेच को अच्छी तरह कसें।'
  },
  {
    id: 'jp91', tradeId: 'factory',
    hi: 'पाना और रिंच (टूल्स)', en: 'Spanner & Wrench (Spana / Renchi)',
    jpWord: 'スパナ・レンチ (Supana / Renchi)', jpHindi: 'सुपाना / रेन्ची',
    jpEx: '17ミリのスパナを使ってボルトを緩めます。', jpExHiPh: 'जूउ-नाना मिरि नो सुपाना ओ त्सुकात्ते बोरुतो ओ युरुमेमासु।', jpExHi: '17 मिमी के पाने से बोल्ट को ढीला करें।'
  },
  {
    id: 'jp92', tradeId: 'factory',
    hi: 'अग्नि शामक यंत्र (आग बुझाने का यंत्र)', en: 'Fire Extinguisher (Shoukaki)',
    jpWord: '消火器 (しょうかき - Shoukaki)', jpHindi: 'शौकाकी',
    jpEx: '工場内の消火器の設置場所と使い方を日頃から確認しておきます。', jpExHiPh: 'कौजौ-नाइ नो शौकाकी नो सेच्चि बाशो ओ हिगोरो कारा काकुनिन शिते ओकिमासु।', jpExHi: 'फैक्ट्री में अग्निशामक यंत्र की जगह और उपयोग विधि की जानकारी रखें।'
  },
  {
    id: 'jp93', tradeId: 'factory',
    hi: 'सुरक्षात्मक धूल मास्क', en: 'Dust / Particle Mask (Boujin Masuku)',
    jpWord: '防塵マスク (ぼうじんマスク)', jpHindi: 'बौउजिन मासुकु',
    jpEx: '研磨や粉塵の舞う場所では防塵マスクを密着させます。', jpExHiPh: 'केन्मा या फ़ुन्जिन नो माउ बाशो देवा बौउजिन मासुकु ओ मिच्चाकु सासेमासु।', jpExHi: 'धूल या ग्राइंडिंग वाले क्षेत्र में डस्ट मास्क को ठीक से चेहरे पर लगाएं।'
  },
  {
    id: 'jp94', tradeId: 'factory',
    hi: 'सुरक्षा जूते (स्टील टो शूज)', en: 'Safety Shoes (Anzen Gutsu)',
    jpWord: '安全靴 (あんぜんぐつ - Anzen gutsu)', jpHindi: 'आन्ज़ेन गुत्सु',
    jpEx: '現場内では必ず先芯入りの安全靴を履いてください。', jpExHiPh: 'गेन्बा-नाइ देवा कानाराजु साकिशिन-इरी नो आन्ज़ेन गुत्सु ओ हाइते कुदासाई।', jpExHi: 'कार्यस्थल में लोहे की पत्ती वाले सुरक्षा जूते जरूर पहनें।'
  },
  {
    id: 'jp95', tradeId: 'factory',
    hi: 'खतरे का पूर्व अनुमान (KYK गतिविधि)', en: 'Hazard Prediction Activity (KYK - Kiken Yochi)',
    jpWord: 'KYK活動 (危険予知活動 - きけんよち)', jpHindi: 'के-वाई-के (किकेन योची कात्सुदौ)',
    jpEx: '朝礼時にKYKを行い、今日の作業の危険ポイントを話し合います。', jpExHiPh: 'चौरेइ-जी नी के-वाई-के ओ ओकोनाइ, कियौ नो साग्यौ नो किकेन पोइन्तो ओ हानाशियाइमासु।', jpExHi: 'सुबह की मीटिंग में KYK करके आज के काम के खतरों पर चर्चा करें।'
  },

  // Caregiving & Healthcare (Kaigo) (96-103)
  {
    id: 'jp96', tradeId: 'healthcare',
    hi: 'नहलाने में सहायता (स्नान सेवा)', en: 'Bathing Assistance (Nyuuyoku kaijo)',
    jpWord: '入浴介助 (にゅうよくかいじょ)', jpHindi: 'न्यूउयोकु काइजो',
    jpEx: 'お湯の温度を40度前後に確認してから入浴介助をします。', jpExHiPh: 'ओयु नो ओन्दो ओ योंजूउ-दो ज़ेनगो नी काकुनिन शिते कारा न्यूउयोकु काइजो ओ शिमासु।', jpExHi: 'पानी का तापमान लगभग 40 डिग्री जांचने के बाद ही नहलाने में मदद करें।'
  },
  {
    id: 'jp97', tradeId: 'healthcare',
    hi: 'शौचालय सहायता (टॉयलेट असिस्टेंस)', en: 'Toilet & Excretion Assistance (Haisetsu kaijo)',
    jpWord: '排泄介助 (はいせつかいじょ)', jpHindi: 'हाइसेत्सु काइजो',
    jpEx: 'プライバシーに配慮しながら安全にトイレまで誘導します。', jpExHiPh: 'पुराइबासी- नी हाइर्यो शिनागारा आन्ज़ेन नी तोइरे मादे यूउदौ शिमासु।', jpExHi: 'गोपनीयता का सम्मान करते हुए सुरक्षित रूप से टॉयलेट तक ले जाएं।'
  },
  {
    id: 'jp98', tradeId: 'healthcare',
    hi: 'ज्यादा जोर मत लगाइए (आराम से)', en: 'Please do not strain / Take it easy (Muri shinaide)',
    jpWord: '無理しないでください (むりしないでください)', jpHindi: 'मुरी शिनाइदे कुदासाई',
    jpEx: '疲れたら休憩してください。決して無理しないでくださいね。', jpExHiPh: 'त्सुकारे तारा क्यूउकेइ शिते कुदासाई। केशिशते मुरी शिनाइदे कुदासाई ने।', jpExHi: 'थकान होने पर आराम करें। बिल्कुल भी ज्यादा जोर मत लगाइए।'
  },
  {
    id: 'jp99', tradeId: 'healthcare',
    hi: 'पानी पीना / जल सेवन (हाइड्रेशन)', en: 'Hydration / Fluid Intake (Suibun hokyuu)',
    jpWord: '水分補給 (すいぶんほきゅう)', jpHindi: 'सुइबुन होक्यूउ',
    jpEx: '熱中症予防のため、こまめに水分補給を行いましょう。', jpExHiPh: 'नेच्चूउशौ योबौ नो तामे, कोमामे नी सुइबुन होक्यूउ ओ ओकोनाइमाशौ।', jpExHi: 'लू और डिहाइड्रेशन से बचने के लिए समय-समय पर पानी पिएं।'
  },
  {
    id: 'jp100', tradeId: 'healthcare',
    hi: 'बेड की सेफ्टी रेल (गिरने से बचाव)', en: 'Bed Safety Rail (Beddo saku)',
    jpWord: 'ベッド柵 (ベッドさく - Beddo saku)', jpHindi: 'बेद्दो साकु',
    jpEx: '転落防止のため、離れるときはベッド柵を必ず上げてください。', jpExHiPh: 'तेनराकु बौउशी नो तामे, हानेरेरु तोकी वा बेद्दो साकु ओ आगेते कुदासाई।', jpExHi: 'गिरने से बचाने के लिए दूर जाते समय बेड की सेफ्टी रेल ऊपर रखें।'
  },
  {
    id: 'jp101', tradeId: 'healthcare',
    hi: 'संक्रमण रोकथाम (हाथ धोना व सैनिटाइजर)', en: 'Infection Control (Kansen taisaku)',
    jpWord: '感染対策・消毒 (かんせんたいさく・しょうどく)', jpHindi: 'कान्सेन ताइसाकु / शौदोकु',
    jpEx: '介助の前後には必ずアルコールで手指消毒を行います。', jpExHiPh: 'काइजो नो ज़ेनगो नी वा कानाराजु आरुको-रु दे तेयुबि शौदोकु ओ ओकोनाइमासु।', jpExHi: 'देखभाल से पहले और बाद में अल्कोहल से हाथ अवश्य सैनिटाइज करें।'
  },
  {
    id: 'jp102', tradeId: 'healthcare',
    hi: 'करवट बदलना / पोजीशन बदलना', en: 'Position Changing / Repositioning (Taii henkou)',
    jpWord: '体位変換 (たいいへんこう)', jpHindi: 'ताइइ हेन्कौ',
    jpEx: '床ずれを防ぐために2時間ごとに体位変換を行います。', jpExHiPh: 'तोकोजुरे ओ फ़ुसेगु तामे नी नी-जिकान गोतो नी ताइइ हेन्कौ ओ ओकोनाइमासु।', jpExHi: 'बेडसोर रोकने के लिए हर 2 घंटे में मरीज की करवट बदलें।'
  },
  {
    id: 'jp103', tradeId: 'healthcare',
    hi: 'अस्पताल व क्लीनिक', en: 'Hospital / Medical Clinic (Byouin)',
    jpWord: '病院・クリニック (びょういん)', jpHindi: 'ब्यौउइन / कुरिनिक्कु',
    jpEx: '体調が急変した場合はすぐに看護師と病院へ連絡します。', jpExHiPh: 'ताइचौ गा क्यूउहेन शिता बाआइ वा सुगु नी कान्गोशी तो ब्यौउइन ए रेनराकु शिमासु।', jpExHi: 'अचानक तबीयत खराब होने पर तुरंत नर्स और अस्पताल को सूचित करें।'
  },

  // Construction & Civil Engineering (104-110)
  {
    id: 'jp104', tradeId: 'construction',
    hi: 'शटरिंग / फॉर्मवर्क (सांचा बनाना)', en: 'Formwork / Shuttering (Katawaku)',
    jpWord: '型枠工事 (かたわくこうじ)', jpHindi: 'कातावाकु कौजी',
    jpEx: 'コンクリートの圧力に耐えられるよう型枠を強固に固定します。', jpExHiPh: 'कोन्कुरीतो नो आत्सुर्योकु नी ताएरारेरु यौउ कातावाकु ओ क्योउको नी कोतेइ शिमासु।', jpExHi: 'कंक्रीट के दबाव को झेलने के लिए सांचे (शटरिंग) को मजबूती से कसें।'
  },
  {
    id: 'jp105', tradeId: 'construction',
    hi: 'क्रेन संचालन कार्य', en: 'Crane Operations (Kureen sagyou)',
    jpWord: 'クレーン作業 (クレーンさぎょう)', jpHindi: 'कुरे-न साग्यौ',
    jpEx: 'クレーンの吊り荷の下には絶対に入らないでください！', jpExHiPh: 'कुरे-न नो त्सुरिनी नो शिता नी वा ज़ेत्ताइ नी हाइरानाइदे कुदासाई!', jpExHi: 'क्रेन के लटके हुए सामान के नीचे कभी भी न जाएं!'
  },
  {
    id: 'jp106', tradeId: 'construction',
    hi: 'स्लिंगिंग / हुक में सामान फंसाना (तामाकाके)', en: 'Slinging & Rigging (Tamakake)',
    jpWord: '玉掛け作業 (たまかけさぎょう - Tamakake)', jpHindi: 'तामाकाके साग्यौ',
    jpEx: '玉掛けワイヤーの点検を行い、地切り時に一度停止して安定を確認します。', jpExHiPh: 'तामाकाके वाइया- नो तेनकेन ओ ओकोनाइ, जिगिरी-जी नी इचिदो तेइशी शिते काकुनिन शिमासु।', jpExHi: 'स्लिंगिंग वायर की जांच करें और जमीन से उठते ही रोककर संतुलन देखें।'
  },
  {
    id: 'jp107', tradeId: 'construction',
    hi: 'स्पिरिट लेवल (समतल नापने का यंत्र)', en: 'Spirit Level (Suiheiki)',
    jpWord: '水平器 (すいへいき - Suiheiki)', jpHindi: 'सुइहेइकी',
    jpEx: '水平器の気泡が中央にあるか確認して水平を出します。', jpExHiPh: 'सुइहेइकी नो किहौ गा चूउऔ नी आरु का काकुनिन शिते सुइहेइ ओ दाशिमासु।', jpExHi: 'स्पिरिट लेवल का बुलबुला बीच में देखकर समतलता सुनिश्चित करें।'
  },
  {
    id: 'jp108', tradeId: 'construction',
    hi: 'मेज़रिंग टेप (नापने का फीता)', en: 'Measuring Tape (Mejaa / Kenshajaku)',
    jpWord: 'メジャー・巻尺 (メジャー・まきじゃく)', jpHindi: 'मेजा- / माकिजाकु',
    jpEx: 'メジャーで長さを正確にミリ単位で計測します。', jpExHiPh: 'मेजा- दे नागासा ओ सेइकाकु नी मिरि तान्इ दे केइसोकु शिमासु।', jpExHi: 'मेज़रिंग टेप से लंबाई को मिलीमीटर में सटीक नापें।'
  },
  {
    id: 'jp109', tradeId: 'construction',
    hi: 'साइट सुपरवाइजर / ठेकेदार', en: 'Site Supervisor / Foreman (Genba kantoku)',
    jpWord: '現場監督 (げんばかんとく - Genba kantoku)', jpHindi: 'गेन्बा कान्तोकु',
    jpEx: '施工方法で不明な点があれば現場監督にすぐ相談してください。', jpExHiPh: 'सेइकौ हौहौ दे फ़ुमेइ ना तेन गा आरेबा गेन्बा कान्तोकु नी सुगु सौदान शिते कुदासाई।', jpExHi: 'निर्माण में कोई संशय होने पर तुरंत साइट सुपरवाइजर से सलाह लें।'
  },
  {
    id: 'jp110', tradeId: 'construction',
    hi: 'ऊंचाई पर कार्य (2 मीटर से ऊपर)', en: 'High Place Work (Kousho sagyou)',
    jpWord: '高所作業 (こうしょさぎょう)', jpHindi: 'कौशो साग्यौ',
    jpEx: '高所作業では工具の落下防止用ストラップを装着します。', jpExHiPh: 'कौशो साग्यौ देवा कौगु नो राक्का बौउशी सुतोराप्पु ओ सौचाकु शिमासु।', jpExHi: 'ऊंचाई पर काम करते समय औजारों को रस्सी से बांधकर रखें ताकि नीचे न गिरें।'
  },

  // Hospitality, Food Service & Kitchen (Gaishoku) (111-118)
  {
    id: 'jp111', tradeId: 'hospitality',
    hi: 'स्वागत है! (दुकान/होटल में अभिवादन)', en: 'Welcome to our store (Irasshaimase)',
    jpWord: 'いらっしゃいませ (Irasshaimase)', jpHindi: 'इराशाइमासे',
    jpEx: 'お客様が来店されたら笑顔で「いらっしゃいませ！」と挨拶します。', jpExHiPh: 'ओक्याकु-सामा गा राइतेन सारेतारा एगाओ दे इराशाइमासे तो आइसात्सु शिमासु।', jpExHi: 'ग्राहक के आने पर मुस्कुराकर "इराशाइमासे (स्वागत है)" कहें।'
  },
  {
    id: 'jp112', tradeId: 'hospitality',
    hi: 'रसोई / किचन विभाग', en: 'Kitchen / Cooking Area (Chuubou)',
    jpWord: '厨房・キッチン (ちゅうぼう - Chuubou)', jpHindi: 'चूउबौ / किच्चिन',
    jpEx: '厨房内は常に清潔にし、床の油汚れをすぐに拭き取ります。', jpExHiPh: 'चूउबौ-नाइ वा त्सुने नी सेइकेत्सु नी शि, युका नो आबुरा-योगोरे ओ सुगु नी फ़ुकि तोरिमासु।', jpExHi: 'रसोई को हमेशा साफ रखें और फर्श पर गिरे तेल को तुरंत पोंछें।'
  },
  {
    id: 'jp113', tradeId: 'hospitality',
    hi: 'आर्डर लेना (ग्राहक की मांग)', en: 'Taking Orders (Chuumon)',
    jpWord: 'ご注文 (ごちゅうもん - Chuumon)', jpHindi: 'गो-चूउमोन',
    jpEx: 'ご注文の品を復唱して間違いがないか確認します。', jpExHiPh: 'गो-चूउमोन नो शिना ओ फ़ुकुशौ शिते माचिगाइ गा नाइ का काकुनिन शिमासु।', jpExHi: 'आर्डर किए गए सामान को दोहराकर पुष्टि करें कि कोई गलती न हो।'
  },
  {
    id: 'jp114', tradeId: 'hospitality',
    hi: 'बिल भुगतान / कैश काउंटर', en: 'Payment / Checkout (O-kaikei)',
    jpWord: 'お会計・レジ (おかいけい・レジ)', jpHindi: 'ओ-काइकेइ / रेजी',
    jpEx: 'お会計は2500円になります。お預かりいたします。', jpExHiPh: 'ओ-काइकेइ वा नी-सेन गो-ह्याकु एन नी नारिमासु।', jpExHi: 'आपका बिल 2500 येन हुआ है। धन्यवाद।'
  },
  {
    id: 'jp115', tradeId: 'hospitality',
    hi: 'बर्तन धोना / डिशवॉशर', en: 'Dishwashing (Sara-arai / Senjou)',
    jpWord: '皿洗い・食器洗浄 (さらあらい・しょっきせんじょう)', jpHindi: 'सारा-अराई / शोक्कि सेन्जौ',
    jpEx: '洗浄機に入れる前に予洗いで食べ残しをしっかり落とします。', jpExHiPh: 'सेन्जौकी नी इरेरु माए नी योअराई दे ताबेनोकोशी ओ ओतोशिमासु।', jpExHi: 'डिशवॉशर में डालने से पहले बर्तनों के जूठन को अच्छी तरह धोएं।'
  },
  {
    id: 'jp116', tradeId: 'hospitality',
    hi: 'एक्सपायरी डेट (उपभोग अवधि)', en: 'Best-before / Expiration Date (Shoumi kigen)',
    jpWord: '賞味期限・消費期限 (しょうみきげん)', jpHindi: 'शौउमी किगेन / शौउही किगेन',
    jpEx: '食材を使用する前に必ずラベルの賞味期限を確認します。', jpExHiPh: 'शोकूज़ाइ ओ शियौउ सुरु माए नी कानाराजु राबेरु नो शौउमी किगेन ओ काकुनिन शिमासु।', jpExHi: 'सामग्री उपयोग करने से पहले लेबल पर एक्सपायरी डेट जरूर देखें।'
  },
  {
    id: 'jp117', tradeId: 'hospitality',
    hi: 'कटिंग बोर्ड और चाकू', en: 'Cutting Board & Kitchen Knife (Manaita / Houchou)',
    jpWord: 'まな板と包丁 (まないたとほうちょう)', jpHindi: 'मानाइता तो हौउचौ',
    jpEx: '肉用と野菜用でまな板と包丁を色分けして使い分けます。', jpExHiPh: 'निकु-यौउ तो यासाइ-यौउ दे मानाइता तो हौउचौ ओ त्सुकाइ वाकेमासु।', jpExHi: 'मांस और सब्जियों के लिए अलग-अलग रंग के कटिंग बोर्ड और चाकू का प्रयोग करें।'
  },
  {
    id: 'jp118', tradeId: 'hospitality',
    hi: 'फ्रिज और डीप फ्रीजर', en: 'Refrigerator & Deep Freezer (Reizouko / Reitouko)',
    jpWord: '冷蔵庫・冷凍庫 (れいぞうこ・れいとうこ)', jpHindi: 'रेइज़ौउको / रेइतौउको',
    jpEx: '冷蔵庫の温度が5度以下に保たれているか毎日記録します。', jpExHiPh: 'रेइज़ौउको नो ओन्दो गा गो-दो इका नी तामोतालेते इरु का माइनिचि किरोकु शिमासु।', jpExHi: 'फ्रिज का तापमान 5 डिग्री से कम है या नहीं, इसे रोज रिकॉर्ड करें।'
  },

  // Driving, Logistics & Warehouse (Souko) (119-124)
  {
    id: 'jp119', tradeId: 'driving',
    hi: 'फोर्कलिफ्ट (सामान उठाने वाला वाहन)', en: 'Forklift (Fookurifuto)',
    jpWord: 'フォークリフト (Forklift)', jpHindi: 'फ़ो-कुरिफ़ुतो',
    jpEx: 'フォークリフト運転時は制限速度時速8キロを厳守します。', jpExHiPh: 'फ़ो-कुरिफ़ुतो उन्तेन-जी वा सेइगेन सोकुदो ओ गेन्शू शिमासु।', jpExHi: 'फोर्कलिफ्ट चलाते समय 8 किमी/घंटा की गति सीमा का कड़ाई से पालन करें।'
  },
  {
    id: 'jp120', tradeId: 'driving',
    hi: 'सामान लोड करना / उतारना', en: 'Loading & Unloading (Tsumikomi / Ni-oroshi)',
    jpWord: '積み込み・荷降ろし (つみこみ・におろし)', jpHindi: 'त्सुमिकोमी / नि-ओरोशी',
    jpEx: 'トラックへの積み込み時は荷崩れ防止のラッシングベルトをかけます。', jpExHiPh: 'तोराक्कु ए नो त्सुमिकोमी-जी वा रास्शिंगु बेरुतो ओ काकेमासु।', jpExHi: 'ट्रक पर लोडिंग करते समय सामान गिरने से रोकने के लिए बेल्ट बांधें।'
  },
  {
    id: 'jp121', tradeId: 'driving',
    hi: 'वेयरहाउस / गोदाम', en: 'Warehouse / Storage Facility (Souko)',
    jpWord: '倉庫・物流センター (そうこ - Souko)', jpHindi: 'सौउको / बुत्स्युउ सेन्ता-',
    jpEx: '倉庫の棚番号とバーコードをスキャナーで読み取ってピッキングします。', jpExHiPh: 'सौउको नो ताना-बान्गौ तो बा-को-दो ओ सुक्याना- दे योमितोत्ति पिक्किंगु शिमासु।', jpExHi: 'गोदाम के रैक नंबर और बारकोड को स्कैनर से स्कैन करके सामान निकालें।'
  },
  {
    id: 'jp122', tradeId: 'driving',
    hi: 'ड्राइविंग लाइसेंस (चालक अनुज्ञप्ति)', en: 'Driving License (Unten menkyo)',
    jpWord: '運転免許証 (うんてんめんきょしょう)', jpHindi: 'उन्तेन मेन्क्योशौ',
    jpEx: '車両を運転する際は常に運転免許証を携帯してください。', jpExHiPh: 'शार्यौ ओ उन्तेन सुरु साइ वा त्सुने नी उन्तेन मेन्क्योशौ ओ केइताइ शिते कुदासाई।', jpExHi: 'गाड़ी चलाते समय हमेशा ड्राइविंग लाइसेंस अपने पास रखें।'
  },
  {
    id: 'jp123', tradeId: 'driving',
    hi: 'एक्सप्रेसवे / हाईवे (टोल रोड)', en: 'Expressway / Highway (Kousokudouro)',
    jpWord: '高速道路・ETC (こうそくどうろ)', jpHindi: 'कौसोकु द stick रो / ई-टी-सी',
    jpEx: '高速道路に入る前にETCカードの有効期限と残高を確認します。', jpExHiPh: 'कौसोकु द stick रो नी हाइरु माए नी ई-टी-सी का-दो ओ काकुनिन शिमासु।', jpExHi: 'हाईवे पर जाने से पहले ETC कार्ड की वैधता जांचें।'
  },
  {
    id: 'jp124', tradeId: 'driving',
    hi: 'पैलेट (सामान रखने का बेस)', en: 'Pallet (Paretto)',
    jpWord: 'パレット (Pallet - Paretto)', jpHindi: 'पारेत्तो',
    jpEx: '木製パレットに段ボールを交互に積んでラップを巻きます。', jpExHiPh: 'मोकुसेइ पारेत्तो नी दानबो-रु ओ त्सुन्दे राप्पु ओ माकिमासु।', jpExHi: 'पैलेट पर कार्टन रखकर स्ट्रेच फिल्म से अच्छी तरह लपेटें।'
  },

  // Electrical & Plumbing (Denki / Haikan) (125-130)
  {
    id: 'jp125', tradeId: 'electrical_plumbing',
    hi: 'बिजली का तार / केबल', en: 'Electric Wire / Cable (Densen / Keeburu)',
    jpWord: '電線・ケーブル (でんせん・ケーブル)', jpHindi: 'देन्सेन / के-बुरु',
    jpEx: '電線の被覆に傷がないか確認し、絶縁テープで保護します。', jpExHiPh: 'देन्सेन नो हिफ़ुकु नी किजु गा नाइ का काकुनिन शि, ज़ेत्सुएन ते-पु दे होगो शिमासु।', jpExHi: 'तार के इंसुलेशन पर कट की जांच करें और इंसुलेशन टेप लगाएं।'
  },
  {
    id: 'jp126', tradeId: 'electrical_plumbing',
    hi: 'सर्किट ब्रेकर (पावर कट स्विच)', en: 'Circuit Breaker (Bureekaa)',
    jpWord: 'ブレーカー (Breaker - Bureekaa)', jpHindi: 'बुरे-का-',
    jpEx: '電気工事を行う前には必ずメインブレーカーを落とします。', jpExHiPh: 'देन्कि कौजी ओ ओकोनाउ माए नी वा कानाराजु मेइन बुरे-का- ओ ओतोशिमासु।', jpExHi: 'बिजली का काम करने से पहले हमेशा मेन ब्रेकर बंद करें।'
  },
  {
    id: 'jp127', tradeId: 'electrical_plumbing',
    hi: 'वोल्टेज और करंट (100V / 200V)', en: 'Voltage & Current (Denatsu / Denryuu)',
    jpWord: '電圧と電流 (でんあつ・でんりゅう - 100V/200V)', jpHindi: 'देनात्सु / देनर्यूउ',
    jpEx: '日本の一般家庭用電圧は100ボルトです。テスターで測定します。', jpExHiPh: 'निहोन नो इप्पान कातेइ-यौउ देनात्सु वा ह्याकु बोरुतो देसु। तेसुता- दे सोकुतेई शिमासु।', jpExHi: 'जापान में घरेलू वोल्टेज 100 वोल्ट है। टेस्टर से मापें।'
  },
  {
    id: 'jp128', tradeId: 'electrical_plumbing',
    hi: 'पाइप फिटिंग और जॉइंट', en: 'Pipe Fitting / Plumbing Joint (Haikan / Tsugite)',
    jpWord: '配管・継手 (はいかん・つぎて)', jpHindi: 'हाइकान / त्सुगिते',
    jpEx: '塩ビパイプの継手に専用の接着剤を均等に塗布して接続します。', jpExHiPh: 'एन्बी पाइपु नो त्सुगिते नी सेच्चाकुज़ाइ ओ नुत्ते सेत्सुज़ोकु शिमासु।', jpExHi: 'पीवीसी पाइप के जोड़ों पर सोल्वेंट लगाकर मजबूती से जोड़ें।'
  },
  {
    id: 'jp129', tradeId: 'electrical_plumbing',
    hi: 'पानी का रिसाव / लीकेज', en: 'Water Leakage (Mizumore)',
    jpWord: '水漏れ (みずもれ - Mizumore)', jpHindi: 'मिजुमोरे',
    jpEx: '元栓を閉めてから、パッキンを交換して水漏れを直します。', jpExHiPh: 'मोतोसेन ओ शिमेते कारा पाक्किन ओ कौकान शिते मिजुमोरे ओ नाओशिमासु।', jpExHi: 'मेन वॉल्व बंद करके रबर वॉशर बदलें और लीकेज ठीक करें।'
  },
  {
    id: 'jp130', tradeId: 'electrical_plumbing',
    hi: 'बिजली गुल होना (पावर कट)', en: 'Power Outage / Blackout (Teiden)',
    jpWord: '停電 (ていでん - Teiden)', jpHindi: 'तेइदेन',
    jpEx: '落雷で停電したときは非常灯をつけて配電盤を点検します。', jpExHiPh: 'राकुराइ दे तेइदेन शिता तोकी वा हिजौुतौ ओ त्सुकेते हाइदेन्बान ओ तेनकेन शिमासु।', jpExHi: 'बिजली गुल होने पर इमरजेंसी लाइट जलाएं और डिस्ट्रीब्यूशन बॉक्स जांचें।'
  },

  // Japanese Daily Life, Banking, Government & Registration (Seikatsu) (131-138)
  {
    id: 'jp131', tradeId: 'workplace_salary',
    hi: 'सैलरी स्लिप (वेतन पर्ची)', en: 'Salary Slip / Pay Stub (Kyuuyo meisai)',
    jpWord: '給与明細書 (きゅうよめいさいしょ)', jpHindi: 'क्यूउयो मेइसाइशो',
    jpEx: '毎月の給料日に給与明細書の基本給と控除額を確認します。', jpExHiPh: 'माइत्सुकी नो क्यूउर्यौउ-बी नी क्यूउयो मेइसाइशो नो किहोनक्यूउ ओ काकुनिन शिमासु।', jpExHi: 'हर महीने सैलरी स्लिप में मूल वेतन और टैक्स कटौती की जांच करें।'
  },
  {
    id: 'jp132', tradeId: 'workplace_salary',
    hi: 'ओवरटाइम भत्ता (अतिरिक्त कार्य वेतन)', en: 'Overtime Allowance (Zangyou teate)',
    jpWord: '残業手当 (ざんぎょうてあて - Zangyou teate)', jpHindi: 'ज़ान्ग्यौउ तेआते',
    jpEx: '所定労働時間を超えた作業には25%以上の残業手当がつきます。', jpExHiPh: 'शॉतेइ रौउदौउ जिकान ओ कोएता साग्यौ नी वा ज़ान्ग्यौउ तेआते गा त्सुकिमासु।', jpExHi: 'तय समय से ज्यादा काम करने पर 25% से अधिक का ओवरटाइम भत्ता मिलता है।'
  },
  {
    id: 'jp133', tradeId: 'workplace_salary',
    hi: 'रेजिडेंस कार्ड (निवास पहचान पत्र)', en: 'Residence Card (Zairyuu kaado)',
    jpWord: '在留カード (ざいりゅうカード - Zairyu Card)', jpHindi: 'ज़ाइर्यूउ का-दो',
    jpEx: '外出時は常に在留カードを携帯することが法律で定められています。', jpExHiPh: 'गाइशुत्सु-जी वा त्सुने नी ज़ाइर्यूउ का-दो ओ केइताइ सुरु कोतो गा होउरित्सु दे सादामेरालेते इमासु।', jpExHi: 'बाहर जाते समय हमेशा रेजिडेंस कार्ड अपने साथ रखना कानूनी रूप से अनिवार्य है।'
  },
  {
    id: 'jp134', tradeId: 'workplace_salary',
    hi: 'नगर निगम कार्यालय (वार्ड ऑफिस)', en: 'City / Ward Municipal Office (Shiyakusho / Kuyakusho)',
    jpWord: '市役所・区役所 (しやくしょ・くやくしょ)', jpHindi: 'शियाकुशो / कुयाकुशो',
    jpEx: '引越し後は14日以内に市役所で住民登録の手続きをします。', jpExHiPh: 'हिकोशी-गो वा जूउ-योक्का इनाइ नी शियाकुशो दे जूउमिन तौरोकु ओ शिमासु।', jpExHi: 'नए पते पर जाने के 14 दिनों के अंदर नगर निगम में पता दर्ज कराएं।'
  },
  {
    id: 'jp135', tradeId: 'workplace_salary',
    hi: 'रेजिडेंस सर्टिफिकेट (निवास प्रमाण पत्र)', en: 'Certificate of Residence (Juuminhyou)',
    jpWord: '住民票 (じゅうみんひょう - Juuminhyou)', jpHindi: 'जूउमिनह्यौ',
    jpEx: '銀行口座の開設や携帯電話の契約時に住民票の提出が必要です。', jpExHiPh: 'गिन्कौउ कौज़ा नो काइसेत्सु नी जूउमिनह्यौ नो तेइशुत्सु गा हित्सुयौउ देसु।', jpExHi: 'बैंक खाता खोलने और सिम कार्ड लेने के लिए रेजिडेंस सर्टिफिकेट आवश्यक है।'
  },
  {
    id: 'jp136', tradeId: 'workplace_salary',
    hi: 'स्वास्थ्य बीमा कार्ड', en: 'Health Insurance Card (Hoken-shou)',
    jpWord: '健康保険証 (けんこうほけんしょう)', jpHindi: 'केन्कौउ होकेनशौ',
    jpEx: '病院にかかる際は健康保険証を窓口に提示すると自己負担が3割になります。', jpExHiPh: 'ब्यौउइन नी काकारु साइ वा होकेनशौ ओ तेइजी सुरु तो ३-वारी नी नारिमासु।', jpExHi: 'अस्पताल में हेल्थ इंश्योरेंस कार्ड दिखाने पर केवल 30% खर्च देना होता है।'
  },
  {
    id: 'jp137', tradeId: 'workplace_salary',
    hi: 'बैंक खाता और ट्रांसफर', en: 'Bank Account & Wire Transfer (Kouza / Furikomi)',
    jpWord: '口座開設・振込 (こうざ・ふりこみ)', jpHindi: 'कौज़ा काइसेत्सु / फ़ुरिकोमी',
    jpEx: '給料振込用の口座を開設し、ATMカードを受け取ります。', jpExHiPh: 'क्यूउर्यौउ फ़ुरिकोमी-यौउ नो कौज़ा ओ काइसेत्सु शिमासु।', jpExHi: 'सैलरी ट्रांसफर के लिए बैंक खाता खोलें और एटीएम कार्ड प्राप्त करें।'
  },
  {
    id: 'jp138', tradeId: 'workplace_salary',
    hi: 'माई नंबर कार्ड (राष्ट्रीय पहचान पत्र)', en: 'My Number Card (Individual Number Card)',
    jpWord: 'マイナンバーカード (My Number Card)', jpHindi: 'माइ नम्बा- का-दो',
    jpEx: 'マイナンバーカードがあるとコンビニで住民票を発行できます。', jpExHiPh: 'माइ नम्बा- का-दो गा आरु तो कोन्बिनी दे जूउमिनह्यौ ओ हाक्कौ देकिमासु।', jpExHi: 'माई नंबर कार्ड से सुविधा स्टोर (कन्विनी) में भी प्रमाण पत्र निकाल सकते हैं।'
  },

  // Trains, Metro & Transport in Japan (139-141)
  {
    id: 'jp139', tradeId: 'driving',
    hi: 'ट्रेन / मेट्रो और टिकट गेट', en: 'Train / Metro & Ticket Gate (Densha / Kaisatsuguchi)',
    jpWord: '電車・改札口 (でんしゃ・かいさつぐち)', jpHindi: 'देन्शा / काइसात्सुगुची',
    jpEx: 'ICカード（Suica / Pasmo）を改札機のセンサーにタッチして通過します。', jpExHiPh: 'सुइका या पास्मो का-दो ओ काइसात्सुकी नो सेन्सा- नी ताच्चि शिते त्सूउका शिमासु।', jpExHi: 'आईसी कार्ड को टिकट गेट के स्कैनर पर टच करके आगे बढ़ें।'
  },
  {
    id: 'jp140', tradeId: 'driving',
    hi: 'मंथली पास (ट्रेन का मासिक पास)', en: 'Commuter Pass (Teikiken)',
    jpWord: '定期券 (ていきけん - Teikiken)', jpHindi: 'तेइकिखेन',
    jpEx: '自宅の最寄り駅から職場の駅までの通勤定期券を購入します。', jpExHiPh: 'जिताकु नो मोयोरी-एकि कारा शोकुबा नो एकि मादे नो तेइकिखेन ओ कौउन्यूउ शिमासु।', jpExHi: 'घर के नजदीकी स्टेशन से कार्यस्थल तक का मासिक ट्रेन पास खरीदें।'
  },
  {
    id: 'jp141', tradeId: 'driving',
    hi: 'ट्रेन बदलना / प्लेटफॉर्म', en: 'Transferring Trains & Platform (Norikae / Hoomu)',
    jpWord: '乗り換え・ホーム (のりかえ・ホーム)', jpHindi: 'नोरिकाए / हो-मु',
    jpEx: '新宿駅の3番線ホームで山手線に乗り換えてください。', jpExHiPh: 'शिन्जुकु-एकि नो ३-बान्सेन हो-मु दे यामानोते-सेन नी नोरिकाएते कुदासाई।', jpExHi: 'शिंजुकु स्टेशन के प्लेटफॉर्म नंबर 3 पर यामानोते लाइन में ट्रेन बदलें।'
  },

  // Supermarket & Garbage Separation in Japan (142-146)
  {
    id: 'jp142', tradeId: 'workplace_salary',
    hi: 'जलने वाला कचरा (गीला/ज्वलनशील कचरा)', en: 'Burnable / Combustible Waste (Moeru gomi)',
    jpWord: '燃えるゴミ (もえるごみ - Moeru gomi)', jpHindi: 'मोएरु गोमी',
    jpEx: '生ゴミや紙くずは指定の袋に入れて火曜日と金曜日の朝に出します。', jpExHiPh: 'नामागोमी या कामीकुजु वा शितेइ नो फ़ुकुरो नी इरेते मोएरु गोमी नो हि नी दाशिमासु।', jpExHi: 'खाने के अवशेष और कागज को निर्दिष्ट थैले में रखकर मंगलवार/शुक्रवार सुबह निकालें।'
  },
  {
    id: 'jp143', tradeId: 'workplace_salary',
    hi: 'न जलने वाला कचरा (प्लास्टिक/धातु)', en: 'Non-burnable Waste (Moenai gomi)',
    jpWord: '燃えないゴミ (もえないごみ - Moenai gomi)', jpHindi: 'मोएनाइ गोमी',
    jpEx: '割れたガラスや陶器は「危険」と書いて燃えないゴミの日に出します。', jpExHiPh: 'वारेता गरासु या तौउकी वा मोएनाइ गोमी नो हि नी दाशिमासु।', jpExHi: 'टूटे कांच और धातु को "खतरा" लिखकर न जलने वाले कचरे के दिन निकालें।'
  },
  {
    id: 'jp144', tradeId: 'workplace_salary',
    hi: 'रीसायकल कचरा (PET बोतल व कैन)', en: 'Recyclable Resources (Shigen gomi / Petto botoru)',
    jpWord: '資源ゴミ・ペットボトル (しげんごみ)', jpHindi: 'शिगेन गोमी / पेत्तो बोतोरु',
    jpEx: 'ペットボトルはラベルとキャップを外し、中を水洗いして潰します。', jpExHiPh: 'पेत्तो बोतोरु वा राबेरु तो क्याप्पु ओ हाजुशी, नाका ओ मिजुअराई शिते त्सुबुशिमासु।', jpExHi: 'प्लास्टिक की बोतल का रैपर व ढक्कन हटाएं, धोकर चपटा करके रीसायकल में डालें।'
  },
  {
    id: 'jp145', tradeId: 'workplace_salary',
    hi: 'सुपरमार्केट में डिस्काउंट (आधा दाम)', en: 'Supermarket Discount / Half Price (Waribiki / Han-gaku)',
    jpWord: '割引・半額シール (わりびき・はんがく)', jpHindi: 'वारिबीकी / हानगाकु',
    jpEx: '夜8時を過ぎるとお弁当やお惣菜に半額シールが貼られます。', jpExHiPh: 'योरु ८-जी ओ सुगीरु तो ओबेन्तौउ नी हानगाकु शि-रु गा हारेमासु।', jpExHi: 'रात 8 बजे के बाद भोजन के पैकेटों पर 50% (आधा दाम) का डिस्काउंट स्टीकर लगता है।'
  },
  {
    id: 'jp146', tradeId: 'workplace_salary',
    hi: '24 घंटे सुविधा स्टोर (कन्विनी)', en: 'Convenience Store (Konbini - 7/11, Lawson)',
    jpWord: 'コンビニ (Convenience store - Konbini)', jpHindi: 'कोन्बिनी',
    jpEx: 'コンビニのコピー機で住民票の印刷や公共料金の支払いができます。', jpExHiPh: 'कोन्बिनी नो कोपि-की दे जूउमिनह्यौ नो इन्सात्सु गा देकिमासु।', jpExHi: 'कन्विनी स्टोर से बिजली-पानी बिल भुगतान व दस्तावेज प्रिंट किए जा सकते हैं।'
  },

  // Emergency, Earthquake Drills & Embassy Aid (147-150)
  {
    id: 'jp147', tradeId: 'emergency',
    hi: 'भूकंप सुरक्षा व शरण स्थल', en: 'Earthquake & Evacuation Shelter (Jishin / Hinanjo)',
    jpWord: '地震・避難所 (じしん・ひなんじょ)', jpHindi: 'जिशिन / हिनान्जो',
    jpEx: '大きな地震が起きたらまず机の下に入り頭を守り、避難所へ移動します。', jpExHiPh: 'ओओकिना जिशिन गा ओकितारा त्सुकुये नो शिता नी हाइरी आतामा ओ मामोरी, हिनान्जो ए इदोउ शिमासु।', jpExHi: 'बड़ा भूकंप आने पर पहले मेज के नीचे सिर बचाएं, फिर सुरक्षित आश्रय स्थल (हिनान्जो) जाएं।'
  },
  {
    id: 'jp148', tradeId: 'emergency',
    hi: 'एम्बुलेंस / फायर ब्रिगेड (119 नंबर)', en: 'Ambulance & Fire Emergency (119 ban)',
    jpWord: '119番（救急・火事） (ひゃくじゅうきゅうばん)', jpHindi: 'ह्याकु जूउ क्यूउ बान (११९)',
    jpEx: '怪我人や火災が発生した時は直ちに「119番」へ通報します。', jpExHiPh: 'केगानिन् या कासाइ गा हास्सेइ शिता तोकी वा तादाचिनी ११९-बान ए त्सूउहौ शिमासु।', jpExHi: 'चोट लगने या आग लगने की स्थिति में तुरंत "119" डायल करें।'
  },
  {
    id: 'jp149', tradeId: 'emergency',
    hi: 'पुलिस आपातकालीन हेल्पलाइन (110 नंबर)', en: 'Police Emergency Line (110 ban)',
    jpWord: '110番（警察・事件・事故） (ひゃくとおばん)', jpHindi: 'ह्याकु तौ बान (११०)',
    jpEx: '交通事故や事件に巻き込まれた際は「110番」に電話します。', jpExHiPh: 'कौउत्सूउ जिको या जिकेन नी माकिकोमारेता साइ वा ११०-बान नी देनवा शिमासु।', jpExHi: 'सड़क दुर्घटना या अपराध होने पर तुरंत "110" पर पुलिस को कॉल करें।'
  },
  {
    id: 'jp150', tradeId: 'emergency',
    hi: 'टोक्यो स्थित भारतीय दूतावास', en: 'Embassy of India, Tokyo',
    jpWord: '在日インド大使館 (ざいにちインドたいしかん)', jpHindi: 'ज़ाइनिचि इन्दो ताइशिकान',
    jpEx: 'パスポート紛失や緊急事態の際は九段下のインド大使館に相談します。', jpExHiPh: 'पासुपो-तो फ़ुन्शित्सु या किन्क्यूउ जिताइ नो साइ वा इन्दो ताइशिकान नी सौदान शिमासु।', jpExHi: 'पासपोर्ट खोने या आपात स्थिति में टोक्यो स्थित भारतीय दूतावास से संपर्क करें।'
  },

  // Agriculture, Farming & Greenhouses in Japan (151-160)
  {
    id: 'jp151', tradeId: 'agriculture',
    hi: 'कृषि एवं खेती कार्य (खेती-बाड़ी)', en: 'Agriculture & Farm Work (Nougyou)',
    jpWord: '農業・農作業 (のうぎょう・のうさぎょう)', jpHindi: 'नौउग्यौउ / नौउसाग्यौ',
    jpEx: '日本の農場で野菜の種まきと収穫作業を担当します。', jpExHiPh: 'निहोन नो नौउजौउ दे यासाइ नो तानेमाकी तो श्यूउकाकु साग्यौ ओ तान्तोउ शिमासु।', jpExHi: 'जापान के फार्म में सब्जियों की बुवाई और फसल कटाई का कार्य संभालता हूँ।'
  },
  {
    id: 'jp152', tradeId: 'agriculture',
    hi: 'फसल की कटाई व तुड़ाई', en: 'Harvesting Crops & Fruits (Shuukaku)',
    jpWord: '収穫作業 (しゅうかくさぎょう - Shuukaku)', jpHindi: 'श्यूउकाकु साग्यौ',
    jpEx: 'トマトやイチゴを傷つけないよう丁寧に収穫します。', jpExHiPh: 'तोमातो या इचिगो ओ किजुत्सुकेनाइ यौउ तेइनेइ नी श्यूउकाकु शिमासु।', jpExHi: 'टमाटर और स्ट्रॉबेरी को बिना नुकसान पहुंचाए सावधानी से तोड़ें।'
  },
  {
    id: 'jp153', tradeId: 'agriculture',
    hi: 'पॉलीहाउस / ग्रीनहाउस', en: 'Greenhouse / Vinyl House (Biniiru hausu)',
    jpWord: 'ビニールハウス (Vinyl Greenhouse)', jpHindi: 'बिनी-रु हाउस',
    jpEx: 'ビニールハウス内の温度と湿度を換気扇で調節します。', jpExHiPh: 'बिनी-रु हाउस-नाइ नो ओन्दो तो शित्सुदो ओ कान्किसेन दे चौउसेत्सु शिमासु।', jpExHi: 'ग्रीनहाउस का तापमान और नमी एग्जॉस्ट फैन से नियंत्रित करें।'
  },
  {
    id: 'jp154', tradeId: 'agriculture',
    hi: 'छंटाई व ग्रेडिंग कार्य', en: 'Grading & Sorting Produce (Senbetsu)',
    jpWord: '選別・等級分け (せんべつ)', jpHindi: 'सेन्बेत्सु / तौउक्यूउ-वाके',
    jpEx: '野菜の大きさと重さに応じてS・M・Lサイズに選別します。', jpExHiPh: 'यासाइ नो ओओकिसा तो ओमोसा नी ओउजिते एस, एम, एल साइजु नी सेन्बेत्सु शिमासु।', jpExHi: 'सब्जियों को उनके आकार और वजन के आधार पर S/M/L साइज में छांटें।'
  },
  {
    id: 'jp155', tradeId: 'agriculture',
    hi: 'निराई-गुड़ाई / घास निकालना', en: 'Weeding / Grass Removal (Kusatori)',
    jpWord: '草取り・除草作業 (くさとり・じょそう)', jpHindi: 'कुसातोरी / जोसौउ',
    jpEx: '作物の周りの雑草を鎌で根元から抜き取ります。', jpExHiPh: 'साकुमोत्सु नो मावारी नो ज़ास्सौउ ओ कामा दे नेमोतो कारा नुकितोरिमासु।', jpExHi: 'फसल के चारों ओर के खरपतवार को दरांती से जड़ से निकालें।'
  },
  {
    id: 'jp156', tradeId: 'agriculture',
    hi: 'खाद और उर्वरक डालना', en: 'Fertilizer Application (Hiryou)',
    jpWord: '肥料散布 (ひりょうさんぷ - Hiryou)', jpHindi: 'हिर्यौउ साम्पु',
    jpEx: '土壌作りのために有機肥料を均一に混ぜ込みます。', jpExHiPh: 'दोजौउ-जुकुरी नो तामे नी यूउकि हिर्यौउ ओ किन्-इत्सु नी माज़ेकोमिमासु।', jpExHi: 'मिट्टी तैयार करने के लिए जैविक खाद को बराबर मिलाएं।'
  },
  {
    id: 'jp157', tradeId: 'agriculture',
    hi: 'सिंचाई और पानी देना', en: 'Watering & Irrigation (Mizuyari / Kansui)',
    jpWord: '水やり・灌水 (みずやり・かんすい)', jpHindi: 'मिजुयारी / कान्सुइ',
    jpEx: '朝夕の涼しい時間帯にスプリンクラーで水やりを行います。', jpExHiPh: 'आसा-यूउ नो सुज़ुशी जिकान्ताइ नी सुपुरिन्कुरा- दे मिजुयारी ओ ओकोनाइमासु।', jpExHi: 'सुबह और शाम के ठंडे समय में स्प्रिंकलर से पानी दें।'
  },
  {
    id: 'jp158', tradeId: 'agriculture',
    hi: 'दरांती और खुरपी (कृषि उपकरण)', en: 'Sickle & Farming Tools (Kama / Kuwa)',
    jpWord: '鎌と鍬 (かまとくわ - Kama to Kuwa)', jpHindi: 'कामा तो कुवा',
    jpEx: '使い終わった鎌や鍬の土を洗い落とし、油を塗って保管します。', jpExHiPh: 'त्सुकाइ ओवात्ता कामा या कुवा नो त्सुचि ओ अराइओतोशी, आबुरा ओ नुत्ते होकान शिमासु।', jpExHi: 'दरांती और कुदाल की मिट्टी धोकर, तेल लगाकर सुरक्षित रखें।'
  },
  {
    id: 'jp159', tradeId: 'agriculture',
    hi: 'ट्रैक्टर और टिलर चलाना', en: 'Tractor Operation (Torakutaa)',
    jpWord: 'トラクター運転 (トラクターうんてん)', jpHindi: 'तोराकुता- उन्तेन',
    jpEx: '畑を耕す前にトラクターのオイル量とタイヤ空気圧を点検します。', jpExHiPh: 'हाताके ओ तागायासु माए नी तोराकुता- नो ओइरु-र्यौउ ओ तेनकेन शिमासु।', jpExHi: 'खेत जोतने से पहले ट्रैक्टर का तेल और टायर की हवा जांचें।'
  },
  {
    id: 'jp160', tradeId: 'agriculture',
    hi: 'पैकिंग और शिपमेंट बॉक्स', en: 'Packing in Cartons (Hakozume / Danbooru)',
    jpWord: '箱詰め・出荷 (はこづめ・しゅっか)', jpHindi: 'हाकोजुमे / शुक्का',
    jpEx: '野菜を段ボールにきれいに並べてラベルを貼り、農協へ出荷します。', jpExHiPh: 'यासाइ ओ दानबो-रु नी कीरेइ नी नाराबेते राबेरु ओ हारी शुक्का शिमासु।', jpExHi: 'सब्जियों को गत्ते के डिब्बों में सजाकर लेबल लगाएं और मंडी भेजें।'
  },

  // Automobile Mechanics & Maintenance (161-170)
  {
    id: 'jp161', tradeId: 'automotive',
    hi: 'ऑटोमोबाइल मैकेनिक / गाड़ी मरम्मत', en: 'Automobile Mechanic / Maintenance (Jidousha seibi)',
    jpWord: '自動車整備士 (じどうしゃせいびし)', jpHindi: 'जिदौउशा सेइबिशी',
    jpEx: 'リフトで車体を持ち上げて足回りの点検整備を行います。', jpExHiPh: 'रिफ़ुतो दे शाताइ ओ मोचिआगेते आशिमावारी नो तेनकेन सेइबि ओ ओकोनाइमासु।', jpExHi: 'लिफ्ट से गाड़ी उठाकर चेसिस और सस्पेंशन की मरम्मत व जांच करें।'
  },
  {
    id: 'jp162', tradeId: 'automotive',
    hi: 'इंजन ऑयल बदलना', en: 'Engine Oil Change (Enjin oiru koukan)',
    jpWord: 'エンジンオイル交換 (エンジンオイルこうかん)', jpHindi: 'एन्जिन ओइरु कौकान',
    jpEx: 'ドレンボルトを外して古いオイルを抜き、新しいオイルを規定量入れます。', jpExHiPh: 'दोरेन बोरुतो ओ हाजुशिते फ़ुरुइ ओइरु ओ नुकी, आताराशी ओइरु ओ इरेमासु।', jpExHi: 'ड्रेन बोल्ट खोलकर पुराना तेल निकालें और नया इंजन ऑयल निर्धारित मात्रा में भरें।'
  },
  {
    id: 'jp163', tradeId: 'automotive',
    hi: 'टायर बदलना व एयर प्रेशर', en: 'Tire Replacement & Pressure Check (Taiya koukan)',
    jpWord: 'タイヤ交換・空気圧点検 (タイヤこうかん)', jpHindi: 'ताइया कौकान / कूउकिआत्सु तेनकेन',
    jpEx: 'トルクレンチを使ってホイールナットを規定トルクで締め付けます。', jpExHiPh: 'तोरुकु रेन्ची ओ त्सुकात्ते होइ-रु नात्तो ओ कितेइ तोरुकु दे शिमेत्सुकेमासु।', jpExHi: 'टॉर्क रिंच से पहिये के नट्स को निर्धारित टाइटनेस पर कसें।'
  },
  {
    id: 'jp164', tradeId: 'automotive',
    hi: 'ब्रेक पैड और डिस्क जांच', en: 'Brake Pad & Rotor Inspection (Bureeki paddo)',
    jpWord: 'ブレーキパッド点検 (ブレーキパッドてんけん)', jpHindi: 'बुरे-कि पाद्दो तेनकेन',
    jpEx: 'ブレーキパッドの残量が3ミリ以下になったら新品に交換します。', jpExHiPh: 'बुरे-कि पाद्दो नो ज़ानर्यौउ गा सान मिरि इका नी नात्तारा शिम्पिन नी कौकान शिमासु।', jpExHi: 'ब्रेक पैड 3 मिमी से कम घिसने पर नया ब्रेक पैड बदलें।'
  },
  {
    id: 'jp165', tradeId: 'automotive',
    hi: 'कार बैटरी और चार्जिंग', en: 'Car Battery & Voltage (Batterii)',
    jpWord: 'バッテリー点検・充電 (バッテリーてんけん)', jpHindi: 'बात्तेरी- तेनकेन / जूउदेन',
    jpEx: 'テスターでバッテリーの電圧と比重を測定して劣化を判断します。', jpExHiPh: 'तेसुता- दे बात्तेरी- नो देनात्सु ओ सोकुतेई शिते रेक्का ओ हान्दान शिमासु।', jpExHi: 'मल्टीमीटर से बैटरी वोल्टेज मापकर उसकी लाइफ जांचें।'
  },
  {
    id: 'jp166', tradeId: 'automotive',
    hi: 'रेडिएटर और कूलेंट', en: 'Radiator & Coolant Fluid (Rajieetaa / Kuuranto)',
    jpWord: 'ラジエーター・冷却水 (ラジエーター・れいきゃくすい)', jpHindi: 'राजिए-ता- / रेइक्याकुसुइ',
    jpEx: 'エンジンが冷えているときに冷却水の液量と漏れを確認します。', jpExHiPh: 'एन्जिन गा हिएते इरु तोकी नी रेइक्याकुसुइ नो एकिर्यौउ तो मोरे ओ काकुनिन शिमासु।', jpExHi: 'इंजन ठंडा होने पर कूलेंट का स्तर और लीकेज जांचें।'
  },
  {
    id: 'jp167', tradeId: 'automotive',
    hi: 'गाड़ी की वार्षिक तकनीकी जांच (शाकेन)', en: 'Vehicle Inspection / Mandatory Check (Shaken)',
    jpWord: '車検・法定点検 (しゃけん - Shaken)', jpHindi: 'शाकेन / हौउतेइ तेनकेन',
    jpEx: '日本の法律に基づき、2年ごとの車検整備基準を満たしているか点検します。', jpExHiPh: 'निहोन नो होउरित्सु नी मोतोडुकी, नी-नेन गोतो नो शाकेन सेइबि ओ तेनकेन शिमासु।', jpExHi: 'जापानी कानून के अनुसार हर 2 साल पर अनिवार्य शाकेन फिटनेस जांच पूरी करें।'
  },
  {
    id: 'jp168', tradeId: 'automotive',
    hi: 'स्पार्क प्लग और इग्निशन', en: 'Spark Plug & Ignition (Purasu puragu)',
    jpWord: '点火プラグ (てんかプラグ - Spark Plug)', jpHindi: 'तेन्का पुरागु',
    jpEx: 'プラグレンチでプラグを外し、電極の焼け具合とギャップを測定します。', jpExHiPh: 'पुरागु रेन्ची दे पुरागु ओ हाजुशी, देन्क्योकु नो ग्याप्पु ओ सोकुतेई शिमासु।', jpExHi: 'प्लग रिंच से स्पार्क प्लग खोलें और इलेक्ट्रोड गैप मापें।'
  },
  {
    id: 'jp169', tradeId: 'automotive',
    hi: 'एयर फिल्टर बदलना', en: 'Air Filter Element Replacement (Ea firutaa)',
    jpWord: 'エアフィルター交換 (エアフィルターこうかん)', jpHindi: 'एआ फ़िरुता- कौकान',
    jpEx: '目詰まりしたエアクリーナーを交換して燃費と出力を改善します。', jpExHiPh: 'मेजुमारी शिता एआ कुरीना- ओ कौकान शिते नेम्पि ओ काइज़ेन शिमासु।', jpExHi: 'जाम हुए एयर फिल्टर को बदलकर माइलेज और पावर सुधारें।'
  },
  {
    id: 'jp170', tradeId: 'automotive',
    hi: 'चेसिस और अंडरबॉडी ग्रीसिंग', en: 'Underbody Greasing (Shashii guriisu)',
    jpWord: '下回りグリスアップ (したまわりグリスアップ)', jpHindi: 'शितामावारी गुरिसु आप्पु',
    jpEx: 'グリスガンを使ってジョイント部分に新しいグリスを注入します。', jpExHiPh: 'गुरिसु गान ओ त्सुकात्ते जोइन्तो बुबुन नी आताराशी गुरिसु ओ चूउन्यूउ शिमासु।', jpExHi: 'ग्रीस गन से जॉइंट्स में नया ग्रीस भरें।'
  },

  // Carpentry & Woodworking in Japan (171-180)
  {
    id: 'jp171', tradeId: 'construction',
    hi: 'बढ़ई का काम / लकड़ी कारीगरी', en: 'Carpentry / Woodworking (Daiku kouji)',
    jpWord: '大工工事・木工 (だいくこうじ - Daiku)', jpHindi: 'दाइकु कौजी / मोक्कौ',
    jpEx: '伝統的な日本の木造住宅の軸組み工法を学びます。', jpExHiPh: 'देन्तौउतेकि ना निहोन नो मोकुज़ौउ जूउताकु नो कौहौ ओ मानाबिमासु।', jpExHi: 'पारंपरिक जापानी लकड़ी के मकान निर्माण की विधि सीखें।'
  },
  {
    id: 'jp172', tradeId: 'construction',
    hi: 'जापानी आरी (पुल सॉ)', en: 'Japanese Pull Saw (Nokogiri)',
    jpWord: '鋸 (のこぎり - Nokogiri)', jpHindi: 'नोकोगिरी',
    jpEx: '引く時に力を入れて木材を直線にまっすぐ切断します。', jpExHiPh: 'हिकु तोकी नी चिकारा ओ इरेते मोकुज़ाइ ओ चोकुसेन नी सेत्सुदान शिमासु।', jpExHi: 'खींचते समय बल लगाकर लकड़ी को बिल्कुल सीधा काटें।'
  },
  {
    id: 'jp173', tradeId: 'construction',
    hi: 'जापानी रंदा (कन्ना)', en: 'Japanese Hand Plane (Kanna)',
    jpWord: '鉋 (かんな - Kanna)', jpHindi: 'कान्ना',
    jpEx: '鉋の刃を微調整し、木の表面をつるつるに仕上げます。', jpExHiPh: 'कान्ना नो हा ओ बीचौउसेइ शि, कि नो ह्यौउमेन ओ त्सुरुत्शुरु नी शिआगेमासु।', jpExHi: 'रंदे की ब्लेड सेट करके लकड़ी की सतह को रेशम की तरह चिकना बनाएं।'
  },
  {
    id: 'jp174', tradeId: 'construction',
    hi: 'इम्पैक्ट ड्राइवर (इलेक्ट्रिक स्क्रूड्राइवर)', en: 'Impact Driver / Cordless Drill (Inpakuto doraibaa)',
    jpWord: 'インパクトドライバー (Impact Driver)', jpHindi: 'इम्पाकुतो दोराइबा-',
    jpEx: 'ビットを取り付け、コーススレッドネジを一気に打ち込みます。', jpExHiPh: 'बित्तो ओ तोरीत्सुके, को-सु सुरेद्दो नेजी ओ इक्कि नी उचिकोमिमासु।', jpExHi: 'बिट लगाकर लकड़ी के पेचों को तेजी से कसें।'
  },
  {
    id: 'jp175', tradeId: 'construction',
    hi: 'कील और हथौड़ा', en: 'Nails & Hammer (Kugi to Kanazuchi)',
    jpWord: '釘と金槌・玄能 (くぎとかなづち)', jpHindi: 'कुगी तो कानाजुची / गेन्नौ',
    jpEx: '玄能の平らな面で釘を打ち、最後は丸い面で木を傷つけず打ち込みます。', jpExHiPh: 'गेन्नौ नो ताइराना मेन दे कुगी ओ उचि, मारुइ मेन दे उचिकोमिमासु।', jpExHi: 'हथौड़े से कील ठोकें और अंत में फिनिशिंग फेस से लकड़ी को बिना खरोंच लगाए बैठाएं।'
  },
  {
    id: 'jp176', tradeId: 'construction',
    hi: 'गुनिया / एल-स्क्वायर (साशिकाने)', en: 'Japanese Carpenter Square (Sashigane)',
    jpWord: '差し金・曲尺 (さしがね - Sashigane)', jpHindi: 'साशिगाने / कानेजाकु',
    jpEx: '差し金を当てて木材の直角（90度）と墨付け線を確認します。', jpExHiPh: 'साशिगाने ओ आतेते मोकुज़ाइ नो चोक्काकु तो सुमिजुके-सेन ओ काकुनिन शिमासु।', jpExHi: 'गुनिया लगाकर लकड़ी के 90 डिग्री समकोण और मार्किंग की जांच करें।'
  },
  {
    id: 'jp177', tradeId: 'construction',
    hi: 'सैंडपेपर / रेगमाल (घिसाई का कागज)', en: 'Sandpaper / Sanding Sheet (Kami-yasuri)',
    jpWord: '紙やすり・サンダー (かみやすり・サンダー)', jpHindi: 'कामी-यासुरी / सान्दा-',
    jpEx: '240番の紙やすりで木目を整えてからニスを塗ります。', jpExHiPh: 'नी-ह्याकु योंजूउ-बान नो कामी-यासुरी दे मोकुमे ओ तोतोनोएमासु।', jpExHi: '240 नंबर रेगमाल से लकड़ी के रेशों को चिकना करके वार्निश लगाएं।'
  },
  {
    id: 'jp178', tradeId: 'construction',
    hi: 'लकड़ी का गोंद (वुड ग्लू)', en: 'Wood Glue / Adhesive (Mokkouyou Bond)',
    jpWord: '木工用ボンド・接着剤 (もっこうようボンド)', jpHindi: 'मोक्कौउ-यौउ बोन्दो',
    jpEx: '接合部にボンドを薄く塗り、クランプで固まるまで圧着します。', jpExHiPh: 'सेत्सुगौउ-बु नी बोन्दो ओ उसुकु नूरी, कुराम्पु दे आच्चाकु शिमासु।', jpExHi: 'जोड़ पर वुड ग्लू लगाकर क्लैम्प से सूखने तक कसकर दबाएं।'
  },
  {
    id: 'jp179', tradeId: 'construction',
    hi: 'सर्कुलर सॉ (गोल आरी मशीन)', en: 'Circular Saw (Marunoko)',
    jpWord: '丸ノコ・電動丸鋸 (まるノコ)', jpHindi: 'मारुनोको',
    jpEx: '丸ノコ使用時はキックバックに警戒し、保護カバーの作動を確認します。', jpExHiPh: 'मारुनोको शियौउ-जी वा किक्कुबाक्कु नी केइकाइ शिमासु।', jpExHi: 'सर्कुलर सॉ चलाते समय किकबैक से सावधान रहें और सेफ्टी गार्ड जांचें।'
  },
  {
    id: 'jp180', tradeId: 'construction',
    hi: 'फ्लोरिंग और लकड़ी का फर्श', en: 'Flooring Installation (Furooringu)',
    jpWord: 'フローリング施工 (フローリングせこう)', jpHindi: 'फ़ुरो-रिन्गु सेइकौ',
    jpEx: '板のサネを噛み合わせてフロアタッカーで根太に固定します。', jpExHiPh: 'इता नो साने ओ कामिआवासेते फ़ुरोआ ताक्का- दे कोतेइ शिमासु।', jpExHi: 'फ्लोरिंग बोर्ड्स के जोड़ों को मिलाकर स्टेपलर से फर्श पर मजबूती से कसें।'
  },

  // Food Processing, Bakery & Packing (181-190)
  {
    id: 'jp181', tradeId: 'factory',
    hi: 'खाद्य प्रसंस्करण कारखाना', en: 'Food Processing Plant (Shokuhin koujou)',
    jpWord: '食品加工工場 (しょくひんかこうこうじょう)', jpHindi: 'शोकुहिन काकौउ कौजौ',
    jpEx: '入室前にエアシャワーを浴びて粘着ローラーで毛髪を取り除きます。', jpExHiPh: 'न्यूउशित्सु माए नी एआ शवा- ओ आबिते नेन्चाकु रो-रा- दे मौहात्सु ओ तोरीनोज़ोकिमासु।', jpExHi: 'फैक्ट्री में प्रवेश से पहले एयर शॉवर लें और रोलर से बाल व रेशे हटाएं।'
  },
  {
    id: 'jp182', tradeId: 'factory',
    hi: 'कन्वेयर बेल्ट लाइन कार्य', en: 'Conveyor Belt Assembly Line (Beruto konbea)',
    jpWord: 'ベルトコンベア作業 (ベルトコンベアさぎょう)', jpHindi: 'बेरुतो कोन्बेआ साग्यौ',
    jpEx: '流れてくる弁当容器に決められた分量の具材をすばやく盛り付けます。', jpExHiPh: 'नागारेते कुरु बेन्तौउ यौउकि नी गुज़ाइ ओ सुबायाकु मोरित्सुकेमासु।', jpExHi: 'कन्वेयर पर आते लंच बॉक्स में निर्धारित मात्रा में सामग्री तेजी से सजाएं।'
  },
  {
    id: 'jp183', tradeId: 'factory',
    hi: 'मेटल डिटेक्टर (धातु पहचान मशीन)', en: 'Metal Detector Machine (Kinzoku kanchiki)',
    jpWord: '金属探知機・異物混入検査 (きんぞくたんちき)', jpHindi: 'किन्ज़ोकु तान्चिकी',
    jpEx: '全製品を金属探知機に通して針や金属片の混入がないか検査します。', jpExHiPh: 'ज़ेन्सेइहिन ओ किन्ज़ोकु तान्चिकी नी तोओशिते इबुत्सु कोन्न्यूउ गा नाइ का केन्सा शिमासु।', jpExHi: 'सभी उत्पादों को मेटल डिटेक्टर से गुजारकर धातु के टुकड़ों की जांच करें।'
  },
  {
    id: 'jp184', tradeId: 'factory',
    hi: 'वजन तराजू और डिजिटल स्केल', en: 'Digital Weighing Scale (Denshi tenbin / Hakari)',
    jpWord: '電子天秤・はかり (でんしてんびん・はかり)', jpHindi: 'देन्शी तेन्बिन / हाकारी',
    jpEx: 'パックごとの重量をデジタルはかりでプラスマイナス2グラム以内に合わせます。', jpExHiPh: 'पाक्कु गोतो नो जूउर्यौउ ओ देन्शी हाकारी दे हाकारिमासु।', jpExHi: 'डिजिटल तराजू पर प्रत्येक पैकेट का वजन ±2 ग्राम की सटीकता में तौलें।'
  },
  {
    id: 'jp185', tradeId: 'factory',
    hi: 'वैक्यूम सीलिंग और पैकिंग', en: 'Vacuum Packing & Sealing (Shinkuupakku)',
    jpWord: '真空パック・シーラー (しんくうパック)', jpHindi: 'शिन्कूउ पाक्कु / शि-रा-',
    jpEx: '空気を完全に抜いて熱シールし、酸化と菌の繁殖を防ぎます。', jpExHiPh: 'कूउकि ओ कान्ज़ेन नी नुइते नेत्सु शि-रु शिमासु।', jpExHi: 'पूरी हवा निकालकर हीट सील करें ताकि भोजन लंबे समय तक सुरक्षित रहे।'
  },
  {
    id: 'jp186', tradeId: 'factory',
    hi: 'बेकरी ओवन और बेकिंग', en: 'Commercial Bakery Oven (Oobun shousei)',
    jpWord: '製パンオーブン・焼成 (せいパンオーブン)', jpHindi: 'सेइपान ओ-बुन / शौउसेइ',
    jpEx: '予熱したオーブンで200度で15分間焼き上げます。', jpExHiPh: 'योनेत्सु शिता ओ-बुन दे नी-ह्याकु दो दे जूउ-गो-फ़ुन याकिआगेमासु।', jpExHi: 'ओवन में 200 डिग्री तापमान पर 15 मिनट तक बेक करें।'
  },
  {
    id: 'jp187', tradeId: 'factory',
    hi: 'एलर्जन और सामग्री लेबलिंग', en: 'Allergen Information Label (Arerugen)',
    jpWord: 'アレルギー表示・原材料 (アレルギーひょうじ)', jpHindi: 'आरेरुगी- ह्यौउजी',
    jpEx: '卵・乳・小麦・そばなどの特定原材料の表示ラベルを正しく貼り付けます。', jpExHiPh: 'तामागो, न्यूउ, कोमुगि नादो नो आरेरुगी- ह्यौउजी ओ तादाशिकु हारिमासु।', jpExHi: 'अंडे, दूध, गेहूं जैसी एलर्जी पैदा करने वाली सामग्री का सही लेबल लगाएं।'
  },
  {
    id: 'jp188', tradeId: 'factory',
    hi: 'साफ-सफाई और कीटाणुशोधन', en: 'Sanitation & Disinfection (Senjou / Shou-doku)',
    jpWord: '洗浄・次亜塩素酸消毒 (せんじょう・しょうどく)', jpHindi: 'सेन्जौउ / शौउदोकु',
    jpEx: '作業終了後は機械を分解洗浄し、殺菌スプレーを噴霧します。', jpExHiPh: 'साग्यौ श्यूउर्यौउ-गो वा किकाई ओ बुन्काइ सेन्जौउ शिमासु।', jpExHi: 'काम खत्म होने के बाद मशीनों को खोलकर धोएं और सैनिटाइज करें।'
  },
  {
    id: 'jp189', tradeId: 'factory',
    hi: 'कोल्ड स्टोरेज और तापमान लॉग', en: 'Cold Storage Room (Reizouko ondo kanri)',
    jpWord: '冷蔵保管・温度管理 (れいぞうほかん)', jpHindi: 'रेइज़ौउ होकान / ओन्दो कानरी',
    jpEx: 'チルド室の温度計を1時間おきにチェックして記録表に記入します。', jpExHiPh: 'चिरुदो-शित्सु नो ओन्दोकेइ ओ इच्चि-जिकान ओकि नी चिक्कु शिते किरोकु शिमासु।', jpExHi: 'कोल्ड रूम का तापमान हर घंटे जांचें और रजिस्टर में दर्ज करें।'
  },
  {
    id: 'jp190', tradeId: 'factory',
    hi: 'लॉट नंबर और बैच कोड', en: 'Lot Number / Manufacturing Batch (Rotto bangou)',
    jpWord: 'ロット番号・製造番号 (ロットばんごう)', jpHindi: 'रोत्तो बान्गौ / सेइज़ौउ बान्गौ',
    jpEx: '印字機でロット番号と賞味期限がかすれず印刷されているか確認します。', jpExHiPh: 'रोत्तो बान्गौ तो शौउमी किगेन गा कासुरेजु इन्सात्सु सारेते इरु का काकुनिन शिमासु।', jpExHi: 'बैच कोड और एक्सपायरी डेट स्पष्ट रूप से छपी है या नहीं, जांचें।'
  },

  // Daily Life, Office & Essential Japanese Workplace Phrases (191-205)
  {
    id: 'jp191', tradeId: 'greetings',
    hi: 'आपका बहुत-बहुत आभार (मदद मिलने पर)', en: 'I am deeply grateful (Taihen osewa ni)',
    jpWord: '大変お世話になっております (たいへんおせわになっております)', jpHindi: 'ताइहेन ओसेवा नी नात्ते ओरिमासु',
    jpEx: '社長、いつも大変お世話になっております。', jpExHiPh: 'शाचौउ, इत्सुमो ताइहेन ओसेवा नी नात्ते ओरिमासु।', jpExHi: 'सर, हमेशा आपका मार्गदर्शन और सहयोग मिलता है, बहुत धन्यवाद।'
  },
  {
    id: 'jp192', tradeId: 'greetings',
    hi: 'कृपया आराम से बोलें (धीरे-धीरे)', en: 'Please speak slowly (Yukkuri hanashite)',
    jpWord: 'ゆっくり話していただけますか？ (ゆっくりはなしていただけますか)', jpHindi: 'युक्कुरी हानाशिते इतादाकेमासु का?',
    jpEx: '日本語を勉強中ですので、ゆっくり話していただけますか？', jpExHiPh: 'निहोनगो ओ बेन्क्यौउ-चूउ देसु नोदे, युक्कुरी हानाशिते इतादाकेमासु का?', jpExHi: 'मैं जापानी सीख रहा हूँ, कृपया थोड़ा धीरे-धीरे बोलिए।'
  },
  {
    id: 'jp193', tradeId: 'greetings',
    hi: 'काम में कोई समस्या नहीं है', en: 'No problem / All good (Mondai arimasen)',
    jpWord: '問題ありません・大丈夫です (もんだいありません)', jpHindi: 'मोन्दाइ आरिमासेन / दाईजौबु देसु',
    jpEx: '機械の調子は良好で、作業に問題ありません。', jpExHiPh: 'किकाई नो चौउशी वा र्यौउकौ दे, साग्यौ नी मोन्दाइ आरिमासेन।', jpExHi: 'मशीन बिल्कुल सही चल रही है, काम में कोई दिक्कत नहीं है।'
  },
  {
    id: 'jp194', tradeId: 'workplace_salary',
    hi: 'छुट्टी का आवेदन / अवकाश', en: 'Leave of Absence / Paid Holiday (Yuukyuu kyuuka)',
    jpWord: '有給休暇・休暇届 (ゆうきゅうきゅうか)', jpHindi: 'यूउक्यूउ क्यूउका / क्यूउका-तोदोके',
    jpEx: '来週の月曜日に有給休暇をいただきたく、休暇届を提出します。', jpExHiPh: 'राइश्यूउ नो गेत्सुयौउ-बी नी यूउक्यूउ क्यूउका ओ इतादाकिताकु, तोदोके ओ तेइशुत्सु शिमासु।', jpExHi: 'अगले सोमवार को सवैतनिक अवकाश (पेड लीव) के लिए आवेदन जमा करता हूँ।'
  },
  {
    id: 'jp195', tradeId: 'workplace_salary',
    hi: 'बीमारी की सूचना (अस्वस्थता)', en: 'Sick Leave Notification (Taichou furyou)',
    jpWord: '体調不良・欠勤連絡 (たいちょうふりょう)', jpHindi: 'ताइचौउ फ़ुर्यौउ / केक्किन रेनराकु',
    jpEx: '熱が38度ありますので、本日は病院へ行き欠勤いたします。', jpExHiPh: 'नेत्सु गा सान्जूउ-हाचि दो आरिमासु नोदे, ब्यौउइन ए इकी केक्किन इताशिमासु।', jpExHi: 'मुझे 38 डिग्री बुखार है, इसलिए आज डॉक्टर के पास जाऊंगा और अनुपस्थित रहूँगा।'
  },
  {
    id: 'jp196', tradeId: 'workplace_salary',
    hi: 'कंपनी का नियम व अनुशासन', en: 'Company Regulations & Rules (Shuugyou kisoku)',
    jpWord: '就業規則・社内ルール (しゅうぎょうきそく)', jpHindi: 'श्यूउग्यौउ किसोकु / शानाइ रू-रु',
    jpEx: '工場の就業規則を守り、遅刻や無断欠勤をしないようにします。', jpExHiPh: 'कौजौउ नो श्यूउग्यौउ किसोकु ओ मामोरी, चिकोकु ओ शिनाइ यौउनी शिमासु।', jpExHi: 'कंपनी के नियमों का पालन करें और बिना सूचना के अनुपस्थित न हों।'
  },
  {
    id: 'jp197', tradeId: 'safety_signs',
    hi: 'प्रवेश निषेध (खतरा)', en: 'Do Not Enter / Authorized Personnel Only (Tachiiri kinshi)',
    jpWord: '立入禁止 (たちいりきんし - Tachiiri Kinshi)', jpHindi: 'ताची-इरी किन्शी',
    jpEx: '「立入禁止」の看板がある場所には関係者以外入ってはいけません。', jpExHiPh: 'ताची-इरी किन्शी नो कान्बान गा आरु बाशो नी वा हाइत्ते वा इकेमासेन।', jpExHi: '"प्रवेश निषेध" बोर्ड वाले स्थान पर अनाधिकृत व्यक्ति अंदर न जाएं।'
  },
  {
    id: 'jp198', tradeId: 'safety_signs',
    hi: 'धूम्रपान निषेध (नो स्मोकिंग)', en: 'No Smoking (Kitsuen kinshi / Kinen)',
    jpWord: '禁煙・火気厳禁 (きんえん・かきげんきん)', jpHindi: 'किन्-एन / काकी गेन्किन',
    jpEx: '危険物倉庫の周辺は火気厳禁ですので絶対にタバコを吸わないでください。', jpExHiPh: 'किकेनबुत्सु सौउको नो शूउहेन वा काकी गेन्किन देसु नोदे ताबाको ओ सुवानाइदे कुदासाई।', jpExHi: 'ज्वलनशील गोदाम के पास आग जलाना सख्त मना है, बीड़ी-सिगरेट न पिएं।'
  },
  {
    id: 'jp199', tradeId: 'safety_signs',
    hi: 'सिर की सुरक्षा (हेलमेट अनिवार्य)', en: 'Wear Safety Helmet (Herumetto chakuyou)',
    jpWord: 'ヘルメット着用・頭上注意 (ヘルメットちゃくよう)', jpHindi: 'हेरुमेत्तो चाकुयौउ / ज़ुजौउ चूउई',
    jpEx: '落下物から頭を守るため、あご紐をしっかり締めてヘルメットを着用します。', jpExHiPh: 'आगो-हिमो ओ शिक्कारी शिमेते हेरुमेत्तो ओ चाकुयौउ शिमासु।', jpExHi: 'सिर की सुरक्षा के लिए स्ट्रैप कसकर हेलमेट पहनें।'
  },
  {
    id: 'jp200', tradeId: 'safety_signs',
    hi: 'हाई वोल्टेज खतरा (बिजली का झटका)', en: 'High Voltage Danger / Electric Shock (Kanden chuui)',
    jpWord: '感電注意・高電圧 (かんでんちゅうい・こうでんあつ)', jpHindi: 'कान्देन चूउई / कौउ देनात्सु',
    jpEx: '高圧受電設備には感電注意の標識がありますので触れてはいけません。', jpExHiPh: 'कौउआत्सु सेत्सुबी नी वा कान्देन चूउई नो ह्यौउशिकि गा आरिमासु नोदे फ़ुरेते वा इकेमासेन।', jpExHi: 'हाई वोल्टेज पैनल पर बिजली के झटके का चेतावनी बोर्ड है, इसे न छुएं।'
  },
  {
    id: 'jp201', tradeId: 'workplace_salary',
    hi: 'टाइम कार्ड / पंचिंग मशीन', en: 'Time Card / Attendance Punch (Taimu kaado)',
    jpWord: 'タイムカード・出勤打刻 (タイムカード)', jpHindi: 'ताइमु का-दो / शुक्किन दाकोकु',
    jpEx: '出勤時と退勤時にタイムカードを機械に通して打刻します。', jpExHiPh: 'शुक्किन-जी तो ताइकिन-जी नी ताइमु का-दो ओ किकाई नी तोओशिते दाकोकु शिमासु।', jpExHi: 'आते समय और जाते समय टाइम कार्ड से उपस्थिति अवश्य पंच करें।'
  },
  {
    id: 'jp202', tradeId: 'workplace_salary',
    hi: 'यूनिफॉर्म और काम के कपड़े', en: 'Work Uniform / Workwear (Sagyougi)',
    jpWord: '作業着・ユニフォーム (さぎょうぎ)', jpHindi: 'साग्यौउगी / यूनिफ़ो-मु',
    jpEx: 'ボタンを全部留め、名札を胸につけて清潔な作業着で勤務します。', jpExHiPh: 'बोतान ओ ज़ेन्बु तोमे, नाफ़ुदा ओ मुने नी त्सुकेते सेइकेत्सु ना साग्यौउगी दे किन्मु शिमासु।', jpExHi: 'सारे बटन बंद करें, नेमप्लेट लगाएं और साफ वर्दी में काम करें।'
  },
  {
    id: 'jp203', tradeId: 'workplace_salary',
    hi: 'लंच ब्रेक / दोपहर का भोजन', en: 'Lunch Break (Hiru yasumi / Kyuukei)',
    jpWord: '昼休み・お昼ご飯 (ひるやすみ・おひるごはん)', jpHindi: 'हिरु यासुमी / ओ-हिरु गोहान',
    jpEx: '12時から13時まで食堂で昼休みを取ります。', jpExHiPh: 'जूउ-नी-जी कारा जूउ-सान-जी मादे शोकुदौउ दे हिरु यासुमी ओ तोरिमासु।', jpExHi: '12 से 1 बजे तक कैफेटेरिया में लंच ब्रेक का समय है।'
  },
  {
    id: 'jp204', tradeId: 'workplace_salary',
    hi: 'सहयोग और टीम वर्क', en: 'Cooperation & Teamwork (Kyouryoku / Chiimuwaaku)',
    jpWord: 'チームワーク・協力 (チームワーク・きょうりょく)', jpHindi: 'चीमुवा-कु / क्योउर्योकु',
    jpEx: 'みんなで声を掛け合い、チームワークで安全に作業を進めましょう。', jpExHiPh: 'मिन्ना दे कोए ओ काकेआई, चीमुवा-कु दे आन्ज़ेन नी साग्यौ ओ सुसुमेमाशौ।', jpExHi: 'सब आपस में संवाद रखें और टीम वर्क के साथ सुरक्षित काम पूरा करें।'
  },
  {
    id: 'jp205', tradeId: 'greetings',
    hi: 'आपका परिश्रम सफल हो / धन्यवाद (काम पूरा होने पर)', en: 'Great job today! (Otsukaresama deshita)',
    jpWord: 'お疲れ様でした！ (おつかれさまでした)', jpHindi: 'ओत्सुकारेसामा देशिता!',
    jpEx: '今日も一日お疲れ様でした！明日も無事故で頑張りましょう！', jpExHiPh: 'कियौउ मो इचिनिचि ओत्सुकारेसामा देशिता! आशिता मो मुजिको दे गाम्बारीमाशौ!', jpExHi: 'आज के कठिन परिश्रम के लिए बहुत धन्यवाद! कल भी सुरक्षित रहकर काम करेंगे!'
  }
];

// Combine Specs into structured objects with all 6 languages
const ALL_VOCAB_ITEMS = [...VOCABULARY_LIST];

for (const spec of ADDITIONAL_VOCAB_SPECS) {
  ALL_VOCAB_ITEMS.push({
    id: spec.id,
    tradeId: spec.tradeId,
    hindiTerm: spec.hi,
    englishTerm: spec.en,
    importance: 'critical',
    tags: ['workplace', 'japan', 'skill', spec.tradeId],
    translations: {
      japanese: {
        word: spec.jpWord,
        phoneticHindi: spec.jpHindi,
        exampleSentence: spec.jpEx,
        examplePhoneticHindi: spec.jpExHiPh,
        exampleSentenceHindi: spec.jpExHi
      },
      'uae-arabic': {
        word: spec.en.split('(')[0].trim(),
        phoneticHindi: spec.hi,
        exampleSentence: spec.en + ' is vital for job performance.',
        examplePhoneticHindi: spec.hi + ' कार्यस्थल के लिए महत्वपूर्ण है।',
        exampleSentenceHindi: spec.jpExHi
      },
      german: {
        word: spec.en.split('(')[0].trim(),
        phoneticHindi: spec.hi,
        exampleSentence: spec.en + ' am Arbeitsplatz.',
        examplePhoneticHindi: spec.hi,
        exampleSentenceHindi: spec.jpExHi
      },
      english: {
        word: spec.en.split('(')[0].trim(),
        phoneticHindi: spec.en.split('(')[0].trim(),
        exampleSentence: spec.en + ' is essential in workplace operations.',
        examplePhoneticHindi: spec.en + ' इज़ एसेंशियल इन वर्कप्लेस ऑपरेशन्स।',
        exampleSentenceHindi: spec.jpExHi
      },
      french: {
        word: spec.en.split('(')[0].trim(),
        phoneticHindi: spec.hi,
        exampleSentence: spec.en + ' pour le travail.',
        examplePhoneticHindi: spec.hi,
        exampleSentenceHindi: spec.jpExHi
      },
      spanish: {
        word: spec.en.split('(')[0].trim(),
        phoneticHindi: spec.hi,
        exampleSentence: spec.en + ' en el trabajo.',
        examplePhoneticHindi: spec.hi,
        exampleSentenceHindi: spec.jpExHi
      }
    }
  });
}

// Write extendedVocabData.ts
const fileHeader = `import { MigrantVocabItem } from './migrantVocabTypes';
import { EXTENDED_VOCAB_PART_1 } from './extendedVocabPart1';

export const EXTENDED_MIGRANT_VOCABULARY: MigrantVocabItem[] = [
  ...EXTENDED_VOCAB_PART_1,
`;

const itemsFormatted = ALL_VOCAB_ITEMS.map(item => '  ' + JSON.stringify(item, null, 2).replace(/\n/g, '\n  ')).join(',\n');

const fileContent = `${fileHeader}${itemsFormatted}
];
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/extendedVocabData.ts'), fileContent, 'utf-8');
console.log('Successfully wrote src/data/extendedVocabData.ts with total extended items:', ALL_VOCAB_ITEMS.length + 15);
