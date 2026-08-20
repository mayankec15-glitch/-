import fs from 'fs';
import path from 'path';

// List of all comprehensive 148 additional Japanese and multi-trade vocabulary terms
const VOCAB_DATA = [
  // 1. Japanese Workplace Norms & Communication (73-85)
  {
    id: 'jp73',
    tradeId: 'greetings',
    hindiTerm: 'आपका बहुत-बहुत धन्यवाद (कृतज्ञता)',
    englishTerm: 'Thank you very much (Doumo Arigatou)',
    importance: 'critical',
    tags: ['polite', 'respect', 'daily'],
    translations: {
      japanese: {
        word: 'どうもありがとうございます',
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
    hindiTerm: 'कृपया (निवेदन / सामान देते समय)',
    englishTerm: 'Please / Here you go (Douzo)',
    importance: 'critical',
    tags: ['polite', 'daily', 'courtesy'],
    translations: {
      japanese: {
        word: 'どうぞ (Douzo)',
        phoneticHindi: 'दोज़ो',
        exampleSentence: 'こちらの資料をどうぞご覧ください。',
        examplePhoneticHindi: 'कोचिरा नो शिर्यौ ओ दोज़ो गोरान कुदासाई।',
        exampleSentenceHindi: 'कृपया यह दस्तावेज देखें।'
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
  },

  // 2. Manufacturing, Lathe, Press & Measurement in Japan (80-100)
  {
    id: 'jp80',
    tradeId: 'factory',
    hindiTerm: 'ब्लूप्रिंट / तकनीकी ड्राइंग',
    englishTerm: 'Blueprint / Engineering Drawing (Zumen)',
    importance: 'critical',
    tags: ['drawing', 'blueprint', 'factory', 'lathe'],
    translations: {
      japanese: {
        word: '図面 (ずめん - Zumen)',
        phoneticHindi: 'जुमेन',
        exampleSentence: '作業を始める前に図面の寸法と公差をよく読んでください。',
        examplePhoneticHindi: 'साग्यौ ओ हाजिमेरु माए नी जुमेन नो सुनपौ तो कौसा ओ योकु योन्दे कुदासाई।',
        exampleSentenceHindi: 'काम शुरू करने से पहले ड्राइंग के नाप और टॉलरेंस को ध्यान से पढ़ें।'
      },
      'uae-arabic': { word: 'المُخَطَّطُ الهَنْدَسِيّ / الرَّسْم', phoneticHindi: 'अल-मुख़त्तत अल-हंदसी', exampleSentence: 'اقْرَأْ مُخَطَّطَ الرَّسْمِ الهَنْدَسِيِّ بِدِقَّة', examplePhoneticHindi: 'इक़रा मुख़त्ततर रस्म अल-हंदसी बिदिक़्क़ा', exampleSentenceHindi: 'इंजीनियरिंग ड्राइंग को ध्यान से पढ़ें।' },
      german: { word: 'die technische Zeichnung / der Bauplan', phoneticHindi: 'दी तेश्निशे त्साइश्नूंग', exampleSentence: 'Prüfen Sie vor Arbeitsbeginn die Maße auf der Zeichnung.', examplePhoneticHindi: 'प्रूफ़ेन ज़ी फ़ोर आरबाइट्सबेगिन्न दी मासे आउफ़ डेर त्साइश्नूंग।', exampleSentenceHindi: 'काम शुरू करने से पहले ड्राइंग पर नाप की जांच करें।' },
      english: { word: 'Engineering Blueprint / Drawing', phoneticHindi: 'ब्लूप्रिंट / ड्रॉइंग', exampleSentence: 'Check the dimensions on the blueprint carefully before machining.',
        examplePhoneticHindi: 'चेक द डायमेंशन्स ऑन द ब्लूप्रिंट।', exampleSentenceHindi: 'मशीनिंग से पहले ब्लूप्रिंट पर नाप ध्यान से जांचें।' },
      french: { word: 'le plan technique', phoneticHindi: 'ल पलों तेक्नीक', exampleSentence: 'Vérifiez les cotes sur le plan technique avant l’usinage.', examplePhoneticHindi: 'वेरीफ़िए ले कोत सुर ल पलों तेक्नीक।', exampleSentenceHindi: 'मशीनिंग से पहले तकनीकी ड्राइंग पर आयाम जांचें।' },
      spanish: { word: 'el plano técnico', phoneticHindi: 'एल प्लानो तेकनिको', exampleSentence: 'Revise las medidas en el plano técnico antes de mecanizar.', examplePhoneticHindi: 'रेवीसे लास मेदीदास एन एल प्लानो तेकनिको।', exampleSentenceHindi: 'मशीनिंग से पहले तकनीकी ड्राइंग में माप की समीक्षा करें।' }
    }
  },
  {
    id: 'jp81',
    tradeId: 'factory',
    hindiTerm: 'वर्नियर कैलिपर (नापने का यंत्र)',
    englishTerm: 'Vernier Caliper (Nogisu)',
    importance: 'critical',
    tags: ['tools', 'measurement', 'precision', 'caliper'],
    translations: {
      japanese: {
        word: 'ノギス (Nogisu)',
        phoneticHindi: 'नोगिसु',
        exampleSentence: '外径と深さをノギスで0.05ミリ単位まで測ります。',
        examplePhoneticHindi: 'गाइकेइ तो फ़ुकासा ओ नोगिसु दे रेइ-तेन-रेइ-गो मिरि तान्इ मादे हाकारिमासु।',
        exampleSentenceHindi: 'बाहरी व्यास और गहराई को वर्नियर कैलिपर से 0.05 मिमी तक नापें।'
      },
      'uae-arabic': { word: 'قَدَمَةُ القِيَاس (فِيرْنْيِير)', phoneticHindi: 'क़दमतुल क़ियास (वर्नियर)', exampleSentence: 'قِسِ القُطْرَ الخَارِجِيَّ بِاسْتِخْدَامِ قَدَمَةِ القِيَاس', examplePhoneticHindi: 'क़िसिल क़ुतरल ख़ारिजी बि-इस्तिमल क़दमतिल क़ियास', exampleSentenceHindi: 'वर्नियर कैलिपर से बाहरी व्यास नापें।' },
      german: { word: 'der Messschieber', phoneticHindi: 'डेयर मेसशीबर', exampleSentence: 'Messen Sie den Außendurchmesser mit dem Messschieber.', examplePhoneticHindi: 'मेसेन ज़ी देन आउसेनडुर्शमेसर मिट देम मेसशीबर।', exampleSentenceHindi: 'वर्नियर कैलिपर से बाहरी व्यास नापें।' },
      english: { word: 'Vernier Caliper', phoneticHindi: 'वर्नियर कैलिपर', exampleSentence: 'Measure outer diameter with the vernier caliper accurately.', examplePhoneticHindi: 'मेज़र आउटर डायामीटर विद कैलिपर।', exampleSentenceHindi: 'वर्नियर कैलिपर से बाहरी व्यास सटीकता से नापें।' },
      french: { word: 'le pied à coulisse', phoneticHindi: 'ल प्ये आ कूलीस', exampleSentence: 'Mesurez le diamètre extérieur avec le pied à coulisse.', examplePhoneticHindi: 'मोज़ुरे ल दियामेत्र एक्स्तेरियूर आवेक ल प्ये आ कूलीस।', exampleSentenceHindi: 'कैलिपर से बाहरी व्यास नापें।' },
      spanish: { word: 'el calibre / pie de rey', phoneticHindi: 'एल कालीब्रे / प्ये दे रेय', exampleSentence: 'Mida el diámetro con el pie de rey con precisión.', examplePhoneticHindi: 'मीदा एल दियामेत्रो कौन एल प्ये दे रेय।', exampleSentenceHindi: 'कैलिपर से व्यास सटीकता से नापें।' }
    }
  },
  {
    id: 'jp82',
    tradeId: 'factory',
    hindiTerm: 'डिफेक्टिव पीस / खराब माल',
    englishTerm: 'Defective Product / Reject (Furyouhin)',
    importance: 'critical',
    tags: ['quality', 'defect', 'inspection', 'factory'],
    translations: {
      japanese: {
        word: '不良品 (ふりょうひん - Furyouhin)',
        phoneticHindi: 'फ़ुर्यौउहिन',
        exampleSentence: 'キズやバリのある部品は不良品箱に分けて入れます。',
        examplePhoneticHindi: 'किजु या बारि नो आरु बुहिन वा फ़ुर्यौउहिन बाको नी वाकेते इरेमासु।',
        exampleSentenceHindi: 'खरोंच या खुरदुरे किनारों वाले पुर्जों को डिफेक्टिव बॉक्स में अलग रखें।'
      },
      'uae-arabic': { word: 'مُنْتَجٌ مَعِيبٌ / تَالِف', phoneticHindi: 'मुन्तजुन मईब / तालिफ़', exampleSentence: 'افْصِلِ القِطَعَ المَعِيبَةَ عَنِ القِطَعِ السَّلِيمَة', examplePhoneticHindi: 'इफ़सिलिल क़ितअल मईबा अनिल क़ितइस सलीमा', exampleSentenceHindi: 'खराब पुर्जों को सही पुर्जों से अलग करें।' },
      german: { word: 'das Ausschussteil / defektes Produkt', phoneticHindi: 'दास आउसशुसताइल', exampleSentence: 'Legen Sie defekte Teile sofort in den Ausschussbehälter.', examplePhoneticHindi: 'लेगेन ज़ी देफ़ेक्ते ताइले ज़ोफ़ोर्ट इन देन आउसशुसबेहेल्टर।', exampleSentenceHindi: 'खराब पुर्जों को तुरंत रिजेक्ट बॉक्स में डालें।' },
      english: { word: 'Defective Product / Reject item', phoneticHindi: 'डिफेक्टिव प्रोडक्ट', exampleSentence: 'Separate defective parts with scratches into the reject box.', examplePhoneticHindi: 'सेपरेट डिफेक्टिव पार्ट्स इन रिजेक्ट बॉक्स।', exampleSentenceHindi: 'खरोंच लगे खराब पुर्जों को रिजेक्ट बॉक्स में अलग रखें।' },
      french: { word: 'la pièce défectueuse / le rebut', phoneticHindi: 'ला प्येस देफ़ेक्त्युएज़', exampleSentence: 'Isolez les pièces défectueuses dans le bac de rebut.', examplePhoneticHindi: 'ईज़ोले ले प्येस देफ़ेक्त्युएज़ दाँ ल बाक द रेब्यु।', exampleSentenceHindi: 'खराब पुर्जों को रिजेक्ट बिन में अलग करें।' },
      spanish: { word: 'el producto defectuoso', phoneticHindi: 'एल प्रोदुक्तो देफ़ेक्तुओसो', exampleSentence: 'Separe las piezas defectuosas en el contenedor de rechazo.', examplePhoneticHindi: 'सेपारे लास प्येसास देफ़ेक्तुओसास।', exampleSentenceHindi: 'खराब पुर्जों को रिजेक्ट कंटेनर में अलग रखें।' }
    }
  },
  {
    id: 'jp83',
    tradeId: 'factory',
    hindiTerm: 'क्वालिटी निरीक्षण / जांच कार्य',
    englishTerm: 'Quality Inspection (Kensa)',
    importance: 'critical',
    tags: ['quality', 'inspection', 'qc', 'standards'],
    translations: {
      japanese: {
        word: '検査・検品 (けんさ・けんぴん - Kensa)',
        phoneticHindi: 'केन्सा / केम्पिन',
        exampleSentence: '出荷前に全品の外観検査と寸法検査を行います。',
        examplePhoneticHindi: 'शुक्का माए नी ज़ेम्पिन नो गाइकान केन्सा तो सुनपौ केन्सा ओ ओकोनाइमासु।',
        exampleSentenceHindi: 'डिलीवरी से पहले सभी सामान की दिखावट व नाप की जांच करते हैं।'
      },
      'uae-arabic': { word: 'فَحْصُ الجَوْدَةِ وَالمُعَايَنَة', phoneticHindi: 'फ़हसुल जौदति वल-मुआयना', exampleSentence: 'أَجْرِ فَحْصَ الجَوْدَةِ لِجَمِيعِ القِطَعِ قَبْلَ الشَّحْن', examplePhoneticHindi: 'अजरि फ़हसल जौदति लिजमीइल क़ितअ क़ब्लश शह्न', exampleSentenceHindi: 'डिलीवरी से पहले सभी पुर्जों की क्वालिटी जांच करें।' },
      german: { word: 'die Qualitätsprüfung (QC)', phoneticHindi: 'दी क्वालितेट्सप्रूफ़ुंग', exampleSentence: 'Führen Sie die Qualitätsprüfung vor dem Versand durch.', examplePhoneticHindi: 'फ़्यूरेन ज़ी दी क्वालितेट्सप्रूफ़ुंग फ़ोर देम फ़ेरज़ांद दुर्श।', exampleSentenceHindi: 'भेजने से पहले क्वालिटी जांच पूरी करें।' },
      english: { word: 'Quality Inspection & QC Check', phoneticHindi: 'क्वालिटी इंस्पेक्शन', exampleSentence: 'Conduct visual and dimension quality checks before shipping.', examplePhoneticHindi: 'कंडक्ट क्वालिटी चेक्स बिफोर शिपिंग।', exampleSentenceHindi: 'शिपिंग से पहले विजुअल और डायमेंशन क्वालिटी जांच करें।' },
      french: { word: 'le contrôle qualité', phoneticHindi: 'ल कोन्त्रोल कालिते', exampleSentence: 'Effectuez le contrôle qualité avant l’expédition.', examplePhoneticHindi: 'एफ़ेक्त्युए ल कोन्त्रोल कालिते आवाँ लेक्सपेदिसियों।', exampleSentenceHindi: 'भेजने से पहले क्वालिटी जांच करें।' },
      spanish: { word: 'el control de calidad', phoneticHindi: 'एल कोन्त्रोल दे कालिदाद', exampleSentence: 'Realice la inspección de calidad antes del envío.', examplePhoneticHindi: 'रेआलीसे ला इन्स्पेकसियों दे कालिदाद।', exampleSentenceHindi: 'शिपमेंट से पहले क्वालिटी निरीक्षण करें।' }
    }
  },
  {
    id: 'jp84',
    tradeId: 'factory',
    hindiTerm: 'वेल्डिंग कार्य (धातु जोड़ना)',
    englishTerm: 'Welding Work (Yousetsu)',
    importance: 'critical',
    tags: ['welding', 'metal', 'fabrication', 'factory'],
    translations: {
      japanese: {
        word: '溶接作業 (ようせつさぎょう - Yousetsu)',
        phoneticHindi: 'यौसेत्सु साग्यौ',
        exampleSentence: 'アーク溶接時は遮光面と革手袋を必ず着用します。',
        examplePhoneticHindi: 'आ-कु यौसेत्सु-जी वा शाकौमेन तो कावा-तेबुकोरो ओ कानाराजु चाकुयौ शिमासु।',
        exampleSentenceHindi: 'आर्क वेल्डिंग के समय वेल्डिंग शील्ड और चमड़े के दस्ताने जरूर पहनें।'
      },
      'uae-arabic': { word: 'أَعْمَالُ التَّلْحِيم / اللِّحَام', phoneticHindi: 'आमालुत तलहीम / अल-लिहाम', exampleSentence: 'ارْتَدِ قِنَاعَ اللِّحَامِ وَالقُفَّازَاتِ الجِلْدِيَّةِ أَمَانًا', examplePhoneticHindi: 'इर्तेदि क़िनाअल लिहामि वल-कुफ़्फ़ाज़ात अल-जिल्दिय्या', exampleSentenceHindi: 'सुरक्षा के लिए वेल्डिंग मास्क और चमड़े के दस्ताने पहनें।' },
      german: { word: 'die Schweißarbeiten', phoneticHindi: 'दी श्वाइसआरबाइटेन', exampleSentence: 'Tragen Sie beim Schweißen immer den Schweißhelm.', examplePhoneticHindi: 'त्रागेन ज़ी बाइम श्वाइसन इम्मर देन श्वाइसहेल्म।', exampleSentenceHindi: 'वेल्डिंग करते समय हमेशा वेल्डिंग हेलमेट पहनें।' },
      english: { word: 'Welding Operations', phoneticHindi: 'वेल्डिंग ऑपरेशन्स', exampleSentence: 'Always wear a welding shield mask and leather gloves.', examplePhoneticHindi: 'ऑलवेज वेयर वेल्डिंग मास्क एंड लेदर ग्लव्स।', exampleSentenceHindi: 'हमेशा वेल्डिंग शील्ड मास्क और लेदर ग्लव्स पहनें।' },
      french: { word: 'les travaux de soudure', phoneticHindi: 'ले त्रावो द सूदूर', exampleSentence: 'Portez le masque de soudure et les gants en cuir.', examplePhoneticHindi: 'पोर्ते ल मास्क द सूदूर ए ले गाँ ऑँ कुईर।', exampleSentenceHindi: 'वेल्डिंग मास्क और लेदर ग्लव्स पहनें।' },
      spanish: { word: 'los trabajos de soldadura', phoneticHindi: 'लोस त्राबाखोस दे सोल्दादूरा', exampleSentence: 'Use la careta de soldar y guantes de cuero para protegerse.', examplePhoneticHindi: 'उसे ला कारेता दे सोल्दार ई गुआन्तेस दे कुएरो।', exampleSentenceHindi: 'सुरक्षा के लिए वेल्डिंग मास्क और लेदर ग्लव्स पहनें।' }
    }
  },
  {
    id: 'jp85',
    tradeId: 'factory',
    hindiTerm: 'लेथ मशीन (खराद मशीन)',
    englishTerm: 'Lathe Machine (Senban)',
    importance: 'high',
    tags: ['lathe', 'machining', 'turning', 'tools'],
    translations: {
      japanese: {
        word: '旋盤 (せんばん - Senban)',
        phoneticHindi: 'सेन्बान',
        exampleSentence: '旋盤のチャックにワークをしっかり固定してください。',
        examplePhoneticHindi: 'सेन्बान नो चाक्कु नी वा-कु ओ शिक्कारी कोतेइ शिते कुदासाई।',
        exampleSentenceHindi: 'लेथ मशीन के चक में जॉब को मजबूती से कसें।'
      },
      'uae-arabic': { word: 'مَاكِينَةُ المَخْرَطَة', phoneticHindi: 'माकीनतुल मख़रता', exampleSentence: 'ثَبِّتِ القِطْعَةَ بِإِحْكَامٍ فِي ظَرْفِ المَخْرَطَة', examplePhoneticHindi: 'सब्बितिल क़ितअ बि-एहकाम फ़ी ज़र्फ़िल मख़रता', exampleSentenceHindi: 'जॉब को खराद मशीन के चक में मजबूती से बांधें।' },
      german: { word: 'die Drehmaschine / Drehbank', phoneticHindi: 'दी द्रेहमाशीने', exampleSentence: 'Spannen Sie das Werkstück fest im Drehmaschinenfutter ein.', examplePhoneticHindi: 'शपानेन ज़ी दास वेर्कश्टुक फ़ेस्ट इम फ़ुटर आइन।', exampleSentenceHindi: 'जॉब को लेथ मशीन चक में कसकर फिक्स करें।' },
      english: { word: 'Lathe Machine', phoneticHindi: 'लेथ मशीन', exampleSentence: 'Clamp the workpiece securely into the lathe chuck.', examplePhoneticHindi: 'क्लैम्प द वर्कपीस इन द लेथ चक।', exampleSentenceHindi: 'जॉब को लेथ मशीन चक में मजबूती से कसें।' },
      french: { word: 'le tour mécanique', phoneticHindi: 'ल तूर मे Blank नीक', exampleSentence: 'Serrez fermement la pièce dans le mandrin du tour.', examplePhoneticHindi: 'सेरे फ़ेर्ममाँ ला प्येस दाँ ल मोंद्राँ दू तूर।', exampleSentenceHindi: 'जॉब को लेथ चक में कसकर बांधें।' },
      spanish: { word: 'el torno mecánico', phoneticHindi: 'एल तोर्नो मेकानिको', exampleSentence: 'Sujete bien la pieza en el plato del torno.', examplePhoneticHindi: 'सुखेते ब्येन ला प्येसा एन एल प्लातो देल तोर्नो।', exampleSentenceHindi: 'जॉब को लेथ के चक में मजबूती से फिक्स करें।' }
    }
  }
];

console.log('Generating vocab dataset additions...');
