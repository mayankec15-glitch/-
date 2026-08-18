import express from "express";
import path from "path";
import https from "https";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent telemetry
let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Robust JSON parser helper
function cleanAndParseJson(rawText: string): any {
  if (!rawText) return {};
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }
  
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // Attempt to locate JSON boundary
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(cleaned.substring(firstBrace, lastBrace + 1));
      } catch (err) {
        // Continue to array check
      }
    }

    const firstBracket = cleaned.indexOf("[");
    const lastBracket = cleaned.lastIndexOf("]");
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      try {
        return JSON.parse(cleaned.substring(firstBracket, lastBracket + 1));
      } catch (err) {
        // Fall through
      }
    }
    throw e;
  }
}

// Multi-model retry and fallback runner with quota intelligence
async function callGeminiWithRetry(options: {
  systemInstruction?: string;
  contents: string;
  responseMimeType?: string;
  maxAttempts?: number;
}): Promise<string> {
  // Try lightweight & fast models first to conserve free-tier quota
  const modelsToTry = [
    "gemini-3.1-flash-lite",
    "gemini-3.7-flash",
    "gemini-flash-latest",
  ];

  const ai = getAI();
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: options.contents,
        config: {
          systemInstruction: options.systemInstruction,
          responseMimeType: options.responseMimeType || "application/json",
        },
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      lastError = err;
      const errMsg = String(err?.message || err || "");
      const isQuotaExceeded =
        errMsg.includes("429") ||
        errMsg.includes("RESOURCE_EXHAUSTED") ||
        errMsg.includes("Quota exceeded") ||
        errMsg.includes("generate_content_free_tier_requests");

      const isOverloaded =
        errMsg.includes("503") ||
        errMsg.includes("UNAVAILABLE") ||
        errMsg.includes("high demand") ||
        errMsg.includes("temporarily overloaded");

      console.warn(
        `[Gemini Call] Model ${model} failed (quotaExceeded: ${isQuotaExceeded}, overloaded: ${isOverloaded}):`,
        errMsg.slice(0, 180)
      );

      // If quota exceeded, do NOT retry same model — immediately failover to next model
      if (isOverloaded) {
        // Brief pause for momentary server spike before next model
        await new Promise((r) => setTimeout(r, 400));
      }
    }
  }

  throw lastError || new Error("All Gemini models are currently unavailable.");
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// High-fidelity Audio TTS streaming endpoint
app.get("/api/tts", (req, res) => {
  const text = (req.query.text as string || "").trim();
  const lang = (req.query.lang as string || "ar").toLowerCase();

  if (!text) {
    return res.status(400).json({ error: "Text parameter is required" });
  }

  // Map language codes
  let ttsLang = "ar";
  if (lang === "uae-arabic" || lang.startsWith("ar")) ttsLang = "ar";
  else if (lang === "german" || lang.startsWith("de")) ttsLang = "de";
  else if (lang === "japanese" || lang.startsWith("ja")) ttsLang = "ja";
  else if (lang === "french" || lang.startsWith("fr")) ttsLang = "fr";
  else if (lang === "spanish" || lang.startsWith("es")) ttsLang = "es";
  else if (lang === "hindi" || lang.startsWith("hi")) ttsLang = "hi";
  else if (lang === "english" || lang.startsWith("en")) ttsLang = "en";

  // Clean text for speech synthesis
  const cleanText = text
    .replace(/\([^)]*\)/g, "") // remove latin parentheses
    .replace(/\[[^\]]*\]/g, "")
    .replace(/\//g, "، ") // replace slash with pause
    .replace(/\.{2,}/g, "")
    .trim()
    .slice(0, 300);

  const finalQueryText = cleanText || text;
  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(finalQueryText)}&tl=${ttsLang}&client=tw-ob`;

  const request = https.get(ttsUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Referer": "https://translate.google.com/",
      "Accept": "*/*"
    }
  }, (ttsRes) => {
    if (ttsRes.statusCode !== 200) {
      console.warn(`TTS upstream status: ${ttsRes.statusCode}`);
      return res.status(502).json({ error: "Failed to retrieve TTS audio from upstream" });
    }

    res.set({
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Accept-Ranges": "bytes"
    });

    ttsRes.pipe(res);
  });

  request.on("error", (err) => {
    console.error("TTS stream error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "TTS error", details: err.message });
    }
  });

  req.on("close", () => {
    request.destroy();
  });
});

// Helper: Fallback generator for Sentence Analyzer
function getFallbackSentenceAnalysis(sentence: string, language: string) {
  const words = sentence.trim().split(/\s+/).filter(Boolean);
  
  let phonetic = "";
  let englishTranslation = "";
  let literalTranslation = "";
  let grammarSummary = "";
  let culturalInsight = "";

  if (language === "uae-arabic") {
    phonetic = sentence.includes("شُو") ? "Shu akhbarak? Hal fi zahma fi tareeq..." : "Kalaam Emirati Jameel";
    englishTranslation = "Meaning: Practical everyday Emirati Arabic phrase.";
    literalTranslation = "Word-by-word conversational Gulf Arabic formulation.";
    grammarSummary = "Emirati Arabic (Gulf / Khaleeji) features rich root-and-pattern morphology, characteristic local prefixes, and specific interrogative particles (such as 'شُو' for 'what' or 'وايد' for 'very').";
    culturalInsight = "In UAE culture, conversations prioritize warmth, respect, and cordial greetings before diving into practical business or questions.";
  } else if (language === "french") {
    phonetic = "Frahn-seh koo-rahn";
    englishTranslation = "Meaning: Conversational French sentence.";
    literalTranslation = "Word-by-word standard French expression.";
    grammarSummary = "Standard French structure follows Subject-Verb-Object (SVO), with strict grammatical gender concordance (masculine/feminine) and elision rules with apostrophes.";
    culturalInsight = "In France, polite tone is paramount; always start interactions with 'Bonjour' or 'S'il vous plaît' to maintain pleasant social register.";
  } else {
    phonetic = "Nihongo bunshou";
    englishTranslation = "Meaning: Conversational Japanese sentence.";
    literalTranslation = "Word-by-word Japanese expression.";
    grammarSummary = "Japanese employs a Subject-Object-Verb (SOV) structure governed by postpositional grammatical particles (は, が, を, に, で) and polite verb inflections.";
    culturalInsight = "Social register and consideration (Omotenashi) dictate whether to use polite (Desu/Masu) or casual forms depending on social proximity.";
  }

  const tokens = words.map((w, idx) => ({
    word: w,
    phonetic: `[${w}]`,
    meaning: `Component ${idx + 1}`,
    pos: idx === 0 ? "Particle / Subject" : idx === words.length - 1 ? "Verb / Predicate" : "Modifier / Noun",
    grammarRole: idx === 0 ? "Initial topic / marker" : "Constituent element",
    rootOrConjugation: w.replace(/[^\w\u0600-\u06FF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, "") || w,
  }));

  return {
    original: sentence,
    phonetic: phonetic,
    englishTranslation: englishTranslation,
    literalTranslation: literalTranslation,
    tokens: tokens.length > 0 ? tokens : [{ word: sentence, phonetic: "[Text]", meaning: "Full phrase", pos: "Phrase", grammarRole: "Main clause", rootOrConjugation: sentence }],
    grammarSummary: grammarSummary,
    culturalInsight: culturalInsight,
    similarPhrases: [
      {
        text: language === "uae-arabic" ? "مَرْحَبَا السَّاعْ" : language === "french" ? "Du coup, ça marche !" : "よろしくお願いします",
        phonetic: language === "uae-arabic" ? "Marhaba al-saa'" : language === "french" ? "Dew koo, sah mahrsh!" : "Yoroshiku onegai shimasu",
        translation: language === "uae-arabic" ? "A warm Emirati welcome!" : language === "french" ? "So, that works!" : "Please treat me kindly",
        usageNote: "Standard polite everyday native expression."
      }
    ]
  };
}

// 1. AI Conversational Roleplay Endpoint for Migrant Workers (श्रमिक संवाद सिमुलेशन)
app.post("/api/chat-roleplay", async (req, res) => {
  try {
    const { language, scenario, conversationHistory, userMessage } = req.body;

    let langContext = "";
    if (language === "uae-arabic") {
      langContext = `You are a native Gulf/Emirati Arabic speaker (Foreman / Manager / Doctor) speaking to an Indian migrant worker.
Use clear, authentic Gulf/Khaleeji Arabic phrases with diacritics (Harakat) where helpful.
Always provide:
1. Accurate Devanagari Hindi pronunciation (phoneticHindi) so Hindi-literate workers can read and pronounce it effortlessly.
2. English transliteration (phonetic).
3. Clear, simple Hindi translation (hindiTranslation).
4. Practical workplace/cultural tip in Hindi (shramikTip).
5. 3 practical suggested replies for the worker with Devanagari phonetics and Hindi meaning.`;
    } else if (language === "german") {
      langContext = `You are a German workshop foreman or supervisor (Vorarbeiter/Meister) speaking to an Indian skilled technician/worker.
Speak clear standard German with practical workshop vocabulary. Always provide Devanagari Hindi pronunciation (phoneticHindi), simple Hindi translation (hindiTranslation), and workplace etiquette tip (shramikTip).`;
    } else if (language === "japanese") {
      langContext = `You are a Japanese site supervisor (主任 / Shunin) or team leader speaking to an Indian Technical Intern Trainee (TITP/SSW).
Speak clear, polite Japanese with Kanji readings in Hiragana. Always provide Devanagari Hindi pronunciation (phoneticHindi), simple Hindi translation (hindiTranslation), and workplace etiquette tip (shramikTip).`;
    } else if (language === "english") {
      langContext = `You are an International HSE Safety Officer or Manager speaking to an Indian technician on a multinational project site.
Use clear international workplace English. Always provide Devanagari Hindi pronunciation (phoneticHindi), simple Hindi translation (hindiTranslation), and workplace safety tip (shramikTip).`;
    } else if (language === "french") {
      langContext = `You are a French construction site boss (Chef de chantier) speaking to an Indian skilled worker.
Speak clear standard French. Always provide Devanagari Hindi pronunciation (phoneticHindi), simple Hindi translation (hindiTranslation), and practical workplace tip (shramikTip).`;
    } else if (language === "spanish") {
      langContext = `You are a Spanish industrial maintenance supervisor speaking to an Indian craftsman.
Speak clear standard Spanish. Always provide Devanagari Hindi pronunciation (phoneticHindi), simple Hindi translation (hindiTranslation), and workplace tip (shramikTip).`;
    }

    const systemPrompt = `You are an expert multilingual workplace trainer for the Uttar Pradesh Migrant Worker Empowerment Platform (प्रशिक्षण निदेशालय, उत्तर प्रदेश).
${langContext}

Current Scenario: ${scenario?.title || scenario?.titleHindi || "Workplace Conversation"}
Scenario Context: ${scenario?.culturalContext || "Workplace communication between supervisor and worker"}
Your Character: ${scenario?.aiRole || scenario?.aiRoleHindi || "Supervisor / Officer"}
User Character: ${scenario?.userRole || scenario?.userRoleHindi || "Indian Migrant Worker"}

Analyze the conversation, reply in-character, and provide structured support.
Ensure your response is valid JSON matching this schema:
{
  "replyText": "Target language response text",
  "phoneticHindi": "Exact pronunciation written in Devanagari Hindi script (e.g. सबाहुल खैर या साहिबी)",
  "phonetic": "Accurate Latin/Romaji/IPA transliteration",
  "hindiTranslation": "Simple and clear Hindi translation for workers (सरल हिंदी अर्थ)",
  "translation": "Natural English translation",
  "shramikTip": "1-2 sentence practical workplace tip in Hindi for the worker (श्रमिक साथी के लिए काम की सलाह)",
  "suggestedReplies": [
    {
      "text": "Suggested reply in target language",
      "phoneticHindi": "Devanagari Hindi pronunciation (देवनागरी उच्चारण)",
      "hindiTranslation": "Simple Hindi meaning (हिंदी अर्थ)"
    }
  ],
  "feedbackOnUserInHindi": "1 encouraging sentence in Hindi praising or guiding the worker's effort (उदा. शाबाश! आपने बहुत सटीक उत्तर दिया।)"
}`;

    const promptText = `Conversation history:
${(conversationHistory || []).map((m: any) => `${m.sender}: ${m.text}`).join("\n")}
User just said: "${userMessage}"

Respond in-character following the JSON schema.`;

    const rawText = await callGeminiWithRetry({
      systemInstruction: systemPrompt,
      contents: promptText,
    });

    const parsed = cleanAndParseJson(rawText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.warn("Roleplay API fallback triggered:", error?.message);
    const { language, scenario } = req.body || {};
    
    let replyText = "مَرْحَبَا يَا صَاحِبِي! كُلُّ شَيْءٍ تَمَامْ فِي الشُّغْلْ؟";
    let phoneticHindi = "मरहबा या साहिबी! कुल्लू शै तमाम फिश-शुगल?";
    let phonetic = "Marhaba ya saahibi! Kullu shay tamam fish-shughl?";
    let hindiTranslation = "नमस्ते मेरे साथी! काम में सब कुछ ठीक-ठाक चल रहा है?";
    let translation = "Hello my friend! Is everything going well at work?";
    let shramikTip = "गल्फ देशों में काम के समय फोरमैन के हर सवाल पर 'नाअम या मुअल्लिम' (हाँ उस्ताद) या 'तमाम' (सब ठीक) कहकर आत्मविश्वास से उत्तर दें।";
    let feedbackOnUserInHindi = "शाबाश! आपने बहुत अच्छा प्रयास किया।";
    let suggestedReplies = [
      { text: "نَعَمْ يَا مُعَلِّمْ، كُلُّ شَيْءٍ تَمَامْ وَالشُّغْلْ مَاشِي زَيْنْ", phoneticHindi: "नाअम या मुअल्लिम, कुल्लू शै तमाम वश-शुगल माशी ज़ैन", hindiTranslation: "हाँ उस्ताद, सब कुछ ठीक है और काम बहुत अच्छा चल रहा है।" },
      { text: "أَحْتَاجُ بَعْضَ الأَدَوَاتِ الإِضَافِيَّةِ", phoneticHindi: "अहताजु बाद अल-अदवात अल-इज़ाफ़िय्या", hindiTranslation: "मुझे कुछ और औजारों की जरूरत है।" },
      { text: "شُكْرًا جَزِيلاً لَكَ يَا أَبُو صَالِحْ", phoneticHindi: "शुकरन जज़ीलन लक या अबू सालेह", hindiTranslation: "अबू सालेह जी, आपका बहुत-बहुत धन्यवाद।" }
    ];

    if (language === "german") {
      replyText = "Sehr gut! Machen Sie jetzt bitte mit der nächsten Aufgabe weiter.";
      phoneticHindi = "ज़ेयर गूट! माखन ज़ी येट्स्ट बिटे मिट डेर नेक्सटन आउफ़गाबे वाइटर.";
      phonetic = "Zehr goot! Mah-khen zee yetst bit-teh mit dehr naykh-sten owf-gah-beh vy-ter.";
      hindiTranslation = "बहुत बढ़िया! अब कृपया अगले काम को आगे बढ़ाइए।";
      translation = "Very good! Please continue with the next task now.";
      shramikTip = "जर्मनी में काम पूरा होने पर 'Fertig' (काम पूरा) कहकर सुपरवाइज़र को सूचित करें।";
      suggestedReplies = [
        { text: "Ja, Herr Schmidt! Ich mache sofort weiter.", phoneticHindi: "या, हेर श्मिट! इष माखे ज़ोफ़ोर्ट वाइटर.", hindiTranslation: "हाँ हेर श्मिट! मैं तुरंत आगे का काम करता हूँ।" },
        { text: "Haben Sie noch weitere Anweisungen für heute?", phoneticHindi: "हाबेन ज़ी नोख़ वाइटरे आनवाइज़ुंगेन फ्योर हॉइटे?", hindiTranslation: "क्या आज के लिए कोई और निर्देश भी हैं?" }
      ];
    } else if (language === "japanese") {
      replyText = "素晴らしいです！安全第一で引き続き作業をお願いします。";
      phoneticHindi = "सुबाराशी देस! आन्ज़ेन दाइइची दे हिकित्सुज़ुकी साग्यो ओ ओनेगाइ शिमास.";
      phonetic = "Subarashii desu! Anzen dai-ichi de hikitsuzuki sagyou o onegai shimasu.";
      hindiTranslation = "बहुत शानदार! सुरक्षा को प्राथमिकता देते हुए काम जारी रखें।";
      translation = "Wonderful! Please continue the work prioritizing safety first.";
      shramikTip: "जापानी साइट्स पर 'आन्ज़ेन दाइइची' (Safety First) का नारा सबसे अहम माना जाता है।";
      suggestedReplies = [
        { text: "はい！ご安全に作業を続けます！", phoneticHindi: "हाई! गो-आन्ज़ेन नी साग्यो ओ त्सुज़ुकेमास!", hindiTranslation: "हाँ! सुरक्षा के साथ काम जारी रखूँगा!" },
        { text: "ありがとうございます！お疲れ様です！", phoneticHindi: "आरिगातो गोज़ाइमास! ओत्सुकारेसामा देस!", hindiTranslation: "बहुत धन्यवाद! आपकी मेहनत के लिए आभार!" }
      ];
    } else if (language === "english") {
      replyText = "Great job! Keep following all safety protocols and notify me if you notice any hazard.";
      phoneticHindi = "ग्रेट जॉब! कीप फॉलोइंग ऑल सेफ्टी प्रोटोकॉल्स एंड नोटिफाई मी इफ यू नोटिस एनी हैज़र्ड.";
      phonetic = "Great job! Keep following all safety protocols and notify me if you notice any hazard.";
      hindiTranslation = "शाबाश! सभी सुरक्षा नियमों का पालन जारी रखें और कोई भी खतरा दिखने पर मुझे बताएं।";
      translation = "Great job! Keep following all safety protocols and notify me if you notice any hazard.";
      shramikTip = "साइट पर किसी भी खतरे को अनदेखा न करें, तुरंत सुपरवाइज़र को बताएं।";
      suggestedReplies = [
        { text: "Understood Sir, safety is our top priority.", phoneticHindi: "अंडरस्टूड सर, सेफ्टी इज़ अवर टॉप प्रायोरिटी.", hindiTranslation: "समझ गया सर, सुरक्षा हमारी पहली प्राथमिकता है।" },
        { text: "Thank you Sir, will inform you immediately.", phoneticHindi: "थैंक यू सर, विल इन्फॉर्म यू इमीडिएटली.", hindiTranslation: "धन्यवाद सर, तुरंत सूचित करूँगा।" }
      ];
    } else if (language === "french") {
      replyText = "Très bien ! Continuez le travail avec précaution et suivez les consignes de sécurité.";
      phoneticHindi = "त्रे ब्याँ! कोंतीन्यूए ल त्रावाइ अवेक प्रेकोस्योँ ए सुइवे ले कोंसीन्य द सेक्यूरीते.";
      phonetic = "Treh byan! Kon-teen-way luh trah-vye ah-vek pray-ko-syon ay swee-vay lay kon-seen-yuh duh say-kew-ree-tay.";
      hindiTranslation = "बहुत बढ़िया! सावधानी के साथ काम जारी रखें और सुरक्षा नियमों का पालन करें।";
      translation = "Very good! Continue the work with care and follow the safety guidelines.";
      shramikTip = "फ़्रांसीसी कार्यस्थल पर शिष्टाचार के लिए 'D'accord, Chef' (हाँ चीफ) और 'Merci' का उपयोग करें।";
      suggestedReplies = [
        { text: "D'accord Chef, je m'en occupe tout de suite !", phoneticHindi: "दाकौर शेफ़, झ मों ओक्यूप तू द सुइत!", hindiTranslation: "ठीक है चीफ, मैं इसे तुरंत संभालता हूँ!" },
        { text: "Merci beaucoup pour vos conseils.", phoneticHindi: "मेर्सी बोकू पूर वो कोंसेइ.", hindiTranslation: "आपकी सलाह के लिए बहुत धन्यवाद।" }
      ];
    } else if (language === "spanish") {
      replyText = "¡Excelente trabajo! Continúe con la siguiente tarea y mantenga la seguridad.";
      phoneticHindi = "एक्सलेंते त्राबाहो! कोन्तिनूए कोन ला सिगिएन्ते तारेआ इ मान्तेन्गा ला सेगुरिदाद.";
      phonetic = "Ex-seh-len-teh trah-bah-hoh! Kon-tee-nweh kon lah see-gwen-teh tah-ray-ah ee man-teng-ah lah say-goo-ree-dahd.";
      hindiTranslation = "उत्कृष्ट काम! अगले कार्य को जारी रखें और सुरक्षा बनाए रखें।";
      translation = "Excellent work! Continue with the next task and maintain safety.";
      shramikTip = "स्पेनिश में सुपरवाइज़र की बात पर 'Entendido, muchas gracias' (समझ गया, बहुत धन्यवाद) कहें।";
      suggestedReplies = [
        { text: "Entendido jefe, sigo con el trabajo.", phoneticHindi: "एन्तेन्दीदो हेफे, सीगो कोन एल त्राबाहो.", hindiTranslation: "समझ गया बॉस, मैं काम जारी रखता हूँ।" },
        { text: "Muchas gracias por la orientación.", phoneticHindi: "मूचास ग्रासियास पोर ला ओरिएन्तास्योन.", hindiTranslation: "मार्गदर्शन के लिए बहुत धन्यवाद।" }
      ];
    }

    res.json({
      success: true,
      data: {
        replyText,
        phoneticHindi,
        phonetic,
        hindiTranslation,
        translation,
        shramikTip,
        suggestedReplies,
        feedbackOnUserInHindi
      },
      isFallback: true
    });
  }
});

// 2. Deep Sentence & Grammar Breakdown Endpoint
app.post("/api/sentence-analyzer", async (req, res) => {
  const { sentence, language } = req.body;
  try {
    let dialectInstruction = "";
    if (language === "uae-arabic") {
      dialectInstruction = "Explain Emirati Arabic (Khaleeji) root words (جذر), suffixes, prefixes, verb tenses, and local Gulf nuances.";
    } else if (language === "french") {
      dialectInstruction = "Explain French verb conjugations, tense/mood, gender agreements (masculine/feminine), elisions, and liaison rules.";
    } else if (language === "japanese") {
      dialectInstruction = "Explain Japanese particles (は, が, を, に, で, etc.), verb conjugations (Te-form, Past, Potential, Politeness), Kanji breakdown, and onomatopoeia.";
    }

    const systemPrompt = `You are a master computational linguist and polyglot grammar tutor.
Target Language: ${language}
${dialectInstruction}

Analyze the user's sentence thoroughly. Return JSON with this structure:
{
  "original": "${sentence}",
  "phonetic": "Complete phonetics / Romaji / Transliteration",
  "englishTranslation": "Natural English translation",
  "literalTranslation": "Word-for-word literal translation",
  "tokens": [
    {
      "word": "individual word/morpheme",
      "phonetic": "reading/pronunciation",
      "meaning": "English meaning",
      "pos": "Part of speech (e.g. Verb, Particle, Noun, Prefix)",
      "grammarRole": "Specific role (e.g., Past tense 1st person, Subject marker, Definite article)",
      "rootOrConjugation": "Root root/dictionary form or stem"
    }
  ],
  "grammarSummary": "2-3 sentences explaining the sentence structure, word order, and key grammatical rules at play.",
  "culturalInsight": "Any cultural context, tone indicator (formal/informal/honorific), or regional usage tip.",
  "similarPhrases": [
    {
      "text": "Alternative or related phrase in target language",
      "phonetic": "Pronunciation",
      "translation": "English meaning",
      "usageNote": "When to use this instead"
    }
  ]
}`;

    const rawText = await callGeminiWithRetry({
      systemInstruction: systemPrompt,
      contents: `Break down this sentence in ${language}: "${sentence}"`,
    });

    const parsed = cleanAndParseJson(rawText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.warn("Sentence Analyzer fallback triggered:", error?.message);
    const fallbackData = getFallbackSentenceAnalysis(sentence, language);
    res.json({ success: true, data: fallbackData, isFallback: true });
  }
});

// 3. Dynamic Quiz & Challenge Generator
app.post("/api/quiz-generator", async (req, res) => {
  const { language, level, topic, count = 5 } = req.body;
  try {
    const systemPrompt = `You are an expert exam designer for foreign language acquisition.
Create ${count} diverse, engaging quiz questions for ${language} at level ${level || "Beginner to Intermediate"}. Topic: ${topic || "Daily Life & Culture"}.
Include a mix of:
1. 'multiple_choice': Vocabulary & grammar nuances
2. 'dialect_match': Identifying authentic UAE Emirati / French colloquial / Japanese Keigo vs casual
3. 'sentence_assemble': Scrambled words to form correct sentences
4. 'cultural_etiquette': Situational etiquette test (e.g. greetings, dining, body language)

Return JSON with this schema:
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice | dialect_match | sentence_assemble | cultural_etiquette",
      "question": "Question text in English or target language",
      "promptTargetText": "Target language word/sentence if relevant",
      "phonetic": "Pronunciation/Romaji if helpful",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Exact matching string from options",
      "explanation": "Clear, informative explanation why this is correct and cultural background.",
      "tokens": ["word1", "word2", "word3"]
    }
  ]
}`;

    const rawText = await callGeminiWithRetry({
      systemInstruction: systemPrompt,
      contents: `Generate ${count} interactive quiz questions for ${language} on ${topic}.`,
    });

    const parsed = cleanAndParseJson(rawText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.warn("Quiz generator fallback triggered:", error?.message);
    let fallbackQuestions = [];
    if (language === "uae-arabic") {
      fallbackQuestions = [
        {
          id: "q-uae-fb-1",
          type: "cultural_etiquette",
          question: "When welcoming someone to an Emirati home, which phrase conveys the deepest hospitality?",
          options: ["مَرْحَبَا السَّاعْ (Marhaba al-saa')", "مَعَ السَّلامَة (Ma'a salama)", "تَصْبَحْ عَلَى خَيْر (Tisbah 'ala khayr)", "شُكْرًا (Shukran)"],
          correctAnswer: "مَرْحَبَا السَّاعْ (Marhaba al-saa')",
          explanation: "'Marhaba al-saa'' is the quintessential Emirati greeting of honor and joy upon meeting a guest."
        },
        {
          id: "q-uae-fb-2",
          type: "dialect_match",
          question: "Which word means 'Very / A lot' in authentic UAE Gulf dialect?",
          options: ["وَايِدْ (Wayed)", "بِالزَّاف (Bizzaf)", "كْتِير (Kteer)", "جِدّاً (Jiddan)"],
          correctAnswer: "وَايِدْ (Wayed)",
          explanation: "'Wayed' is the classic Emirati word for expressing abundance or high intensity."
        }
      ];
    } else if (language === "french") {
      fallbackQuestions = [
        {
          id: "q-fr-fb-1",
          type: "cultural_etiquette",
          question: "What is the polite first word when entering a French bakery (boulangerie) or café?",
          options: ["Bonjour", "Donnez-moi", "Combien", "Vite"],
          correctAnswer: "Bonjour",
          explanation: "Saying 'Bonjour' is mandatory social courtesy before requesting any goods in France."
        },
        {
          id: "q-fr-fb-2",
          type: "dialect_match",
          question: "Which filler connector is ubiquitous in modern conversational French?",
          options: ["Du coup", "Cependant", "Toutefois", "Néanmoins"],
          correctAnswer: "Du coup",
          explanation: "'Du coup' is universally used by French speakers to connect sentences."
        }
      ];
    } else if (language === "german") {
      fallbackQuestions = [
        {
          id: "q-de-fb-1",
          type: "cultural_etiquette",
          question: "How should you address a new supervisor or foreman in a German workshop?",
          options: ["Herr / Frau + Surname", "Hey Meister!", "Du", "Servus"],
          correctAnswer: "Herr / Frau + Surname",
          explanation: "In German workplaces, the formal 'Sie' and 'Herr/Frau + Surname' are standard until explicitly offered 'Du'."
        },
        {
          id: "q-de-fb-2",
          type: "dialect_match",
          question: "Which word means 'Safety / Security' in German industrial sites?",
          options: ["Sicherheit", "Geschwindigkeit", "Werkzeug", "Pünktlichkeit"],
          correctAnswer: "Sicherheit",
          explanation: "'Sicherheit' stands for safety, the fundamental pillar of German vocational standards."
        }
      ];
    } else if (language === "spanish") {
      fallbackQuestions = [
        {
          id: "q-es-fb-1",
          type: "cultural_etiquette",
          question: "What is the standard workplace greeting for 'Good morning' in Spanish?",
          options: ["Buenos días", "Buenas noches", "Hasta luego", "Adiós"],
          correctAnswer: "Buenos días",
          explanation: "'Buenos días' is used universally until noon to greet team members and supervisors."
        },
        {
          id: "q-es-fb-2",
          type: "dialect_match",
          question: "What does 'Equipo de Protección' mean?",
          options: ["Personal Protective Equipment (PPE)", "Heavy machinery", "Lunch break", "Daily schedule"],
          correctAnswer: "Personal Protective Equipment (PPE)",
          explanation: "'Equipo de Protección Individual' (EPI) refers to safety helmet, gloves, and protective gear."
        }
      ];
    } else if (language === "english") {
      fallbackQuestions = [
        {
          id: "q-en-fb-1",
          type: "cultural_etiquette",
          question: "What does 'HSE' standard stand for on international construction sites?",
          options: ["Health, Safety and Environment", "Heavy Safety Equipment", "High Standard Engineering", "Human Service Emergency"],
          correctAnswer: "Health, Safety and Environment",
          explanation: "HSE is the worldwide benchmark for jobsite health and safety compliance."
        },
        {
          id: "q-en-fb-2",
          type: "multiple_choice",
          question: "What is a 'Toolbox Talk' at the start of a shift?",
          options: ["A brief daily safety briefing", "Repairing tools", "Tool inventory check", "A tea break"],
          correctAnswer: "A brief daily safety briefing",
          explanation: "Toolbox Talks are mandatory daily pre-work safety and hazard alignment discussions."
        }
      ];
    } else {
      fallbackQuestions = [
        {
          id: "q-ja-fb-1",
          type: "cultural_etiquette",
          question: "What is the standard phrase for thanking someone for their hard work at the end of a day?",
          options: ["お疲れ様でした (Otsukaresama deshita)", "いただきます (Itadakimasu)", "ごちそうさまでした (Gochisousama deshita)", "いってきます (Ittekimasu)"],
          correctAnswer: "お疲れ様でした (Otsukaresama deshita)",
          explanation: "'Otsukaresama deshita' is the universal expression of appreciation for collective effort."
        },
        {
          id: "q-ja-fb-2",
          type: "multiple_choice",
          question: "What is the customary toast before drinks in Japan?",
          options: ["乾杯！（Kanpai!）", "ただいま！（Tadaima!）", "さようなら（Sayounara）", "おはよう（Ohayou）"],
          correctAnswer: "乾杯！（Kanpai!）",
          explanation: "'Kanpai!' means 'empty the glass' and is the standard festive toast."
        }
      ];
    }

    res.json({ success: true, data: { questions: fallbackQuestions }, isFallback: true });
  }
});

// 4. Cultural Advisor & Etiquette Assistant
app.post("/api/cultural-advisor", async (req, res) => {
  const { language, question } = req.body;
  try {
    const systemPrompt = `You are a premier cultural anthropologist, dialectologist, and native etiquette advisor specializing in:
- UAE Emirati Culture & Traditions (Majlis etiquette, Gahwa/coffee pouring protocol, traditional attire names, Dubai/Abu Dhabi norms, religious greetings, Khaleeji slang)
- French Culture & Savoir-Vivre (Table manners, Tu vs Vous subtleties, La Bise cheek kisses, café culture, Paris vs provinces, French idioms and verlan)
- Japanese Culture & Omotenashi (Bowing angles, gift giving etiquette/omiyage, Meishi business cards, train manners, Izakaya etiquette, Keigo/Kenjougo/Sonkeigo).

Provide deep, respectful, highly practical answers formatted in JSON:
{
  "title": "Concise summary title",
  "directAnswer": "Clear, concise actionable answer (2-3 paragraphs)",
  "doList": ["Key Do rule 1", "Key Do rule 2", "Key Do rule 3"],
  "dontList": ["Key Don't taboo 1", "Key Don't taboo 2"],
  "essentialPhrases": [
    {
      "text": "Phrase in target script",
      "phonetic": "Pronunciation",
      "translation": "English meaning",
      "context": "When to say it"
    }
  ],
  "funFact": "Fascinating historical or cultural nugget"
}`;

    const rawText = await callGeminiWithRetry({
      systemInstruction: systemPrompt,
      contents: `Language/Culture: ${language}\nUser query: "${question}"`,
    });

    const parsed = cleanAndParseJson(rawText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.warn("Cultural advisor fallback triggered:", error?.message);
    res.json({
      success: true,
      data: {
        title: language === "uae-arabic" ? "Emirati Majlis & Hospitality Etiquette" : language === "french" ? "French Social Savoir-Vivre" : "Japanese Omotenashi Protocol",
        directAnswer: `In ${language === "uae-arabic" ? "UAE Emirati" : language === "french" ? "French" : "Japanese"} culture, social harmony, mutual respect, and honoring traditional customs are essential. Observing how native elders and peers interact will quickly help you navigate every scenario with grace.`,
        doList: [
          language === "uae-arabic" ? "Always accept and pass Gahwa cups with your right hand" : language === "french" ? "Always say 'Bonjour' before asking questions" : "Bow respectfully when greeting and receive business cards with both hands",
          "Speak with a warm, measured tone and clear appreciation",
          "Respect personal boundaries and hospitality customs"
        ],
        dontList: [
          language === "uae-arabic" ? "Never point the soles of your feet towards hosts in a Majlis" : language === "french" ? "Never start a conversation without greeting first" : "Never stick chopsticks vertically into rice",
          "Avoid rushing transactions or being overly abrupt"
        ],
        essentialPhrases: [
          {
            text: language === "uae-arabic" ? "فَالِكْ طَيِّبْ" : language === "french" ? "Je vous en prie" : "恐れ入ります",
            phonetic: language === "uae-arabic" ? "Faalak tayyib" : language === "french" ? "Zhuh vooz ahn pree" : "Osoreirimasu",
            translation: language === "uae-arabic" ? "Your wish is granted with pleasure!" : language === "french" ? "You are most welcome" : "Excuse me / Much obliged",
            context: "Polite cordial exchange"
          }
        ],
        funFact: language === "uae-arabic" ? "Traditional Emirati Gahwa is brewed with cardamom and saffron and served in small handleless cups called Finjan." : language === "french" ? "In France, bread is placed directly on the table, not on the dinner plate." : "In Japan, bowing at 15 degrees is for casual greetings, while 30-45 degrees is for deep respect."
      },
      isFallback: true
    });
  }
});

// 5. Custom Flashcard Deck Generator
app.post("/api/generate-cards", async (req, res) => {
  const { language, topic, count = 6 } = req.body;
  try {
    const systemPrompt = `You are a language learning deck creator.
Create ${count} high-utility flashcards for ${language} covering "${topic}".
Include accurate script, clear phonetics/Romaji/transliteration, English translation, an example sentence, and cultural context.

Return JSON:
{
  "cards": [
    {
      "front": "Word/phrase in target language",
      "phonetic": "Pronunciation guide",
      "back": "English translation",
      "category": "${topic}",
      "notes": "Grammar, dialect, or gender note",
      "exampleSentence": {
        "target": "Full sentence in target language",
        "phonetic": "Sentence pronunciation",
        "translation": "Sentence English translation"
      }
    }
  ]
}`;

    const rawText = await callGeminiWithRetry({
      systemInstruction: systemPrompt,
      contents: `Generate ${count} flashcards for ${language} on "${topic}".`,
    });

    const parsed = cleanAndParseJson(rawText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.warn("Generate cards fallback triggered:", error?.message);
    let fallbackCards = [];
    if (language === "uae-arabic") {
      fallbackCards = [
        {
          front: "مَرْحَبَا السَّاعْ",
          phonetic: "Marhaba al-saa'",
          back: "Warm Emirati welcome ('Welcome at this hour')",
          category: topic || "Daily Life",
          notes: "Signature UAE greeting.",
          exampleSentence: {
            target: "يَا مَرْحَبَا السَّاعْ بِالضُّيُوفْ",
            phonetic: "Ya marhaba al-saa' bil-duyoof",
            translation: "A warm welcome to our honored guests!"
          }
        },
        {
          front: "وَايِدْ زَيْنْ",
          phonetic: "Wayed zayn",
          back: "Very good / excellent",
          category: topic || "Daily Life",
          notes: "'Wayed' means very/a lot in the Gulf.",
          exampleSentence: {
            target: "الأَكْلْ هِنِي وَايِدْ زَيْنْ",
            phonetic: "Al-akl hini wayed zayn",
            translation: "The food here is very good!"
          }
        }
      ];
    } else if (language === "french") {
      fallbackCards = [
        {
          front: "S'il vous plaît",
          phonetic: "Seel voo pleh",
          back: "Please (formal / polite)",
          category: topic || "Daily Life",
          notes: "Used with strangers, waitstaff, and elders.",
          exampleSentence: {
            target: "Un café s'il vous plaît.",
            phonetic: "Uhn kah-fay seel voo pleh.",
            translation: "A coffee please."
          }
        },
        {
          front: "Du coup",
          phonetic: "Dew koo",
          back: "So / Consequently / As a result",
          category: topic || "Daily Life",
          notes: "Essential conversational transition.",
          exampleSentence: {
            target: "Du coup, on se voit demain ?",
            phonetic: "Dew koo, ohn suh vwah duh-mahn?",
            translation: "So, are we seeing each other tomorrow?"
          }
        }
      ];
    } else if (language === "german") {
      fallbackCards = [
        {
          front: "Guten Tag / Hallo",
          phonetic: "Goo-ten Tahg / Hah-loh",
          back: "Good day / Hello",
          category: topic || "Daily Life",
          notes: "Universal German daytime greeting.",
          exampleSentence: {
            target: "Guten Tag, wie kann ich Ihnen helfen?",
            phonetic: "Goo-ten Tahg, vee kahn ikh Ee-nen hel-fen?",
            translation: "Good day, how can I help you?"
          }
        },
        {
          front: "Vielen Dank",
          phonetic: "Fee-len Dahnk",
          back: "Thank you very much",
          category: topic || "Daily Life",
          notes: "Standard polite appreciation in German.",
          exampleSentence: {
            target: "Vielen Dank für Ihre Unterstützung!",
            phonetic: "Fee-len Dahnk fyoor Ee-ruh Oon-ter-shtyet-soong!",
            translation: "Thank you very much for your support!"
          }
        }
      ];
    } else if (language === "spanish") {
      fallbackCards = [
        {
          front: "Muchas gracias",
          phonetic: "Moo-chas grah-syas",
          back: "Thank you very much",
          category: topic || "Daily Life",
          notes: "Standard courteous Spanish phrase.",
          exampleSentence: {
            target: "Muchas gracias por la ayuda.",
            phonetic: "Moo-chas grah-syas por lah ah-yoo-dah.",
            translation: "Thank you very much for the help."
          }
        },
        {
          front: "¿Cómo está usted?",
          phonetic: "Koh-moh es-tah oos-ted?",
          back: "How are you? (formal)",
          category: topic || "Daily Life",
          notes: "Respectful inquiry used with supervisors and elders.",
          exampleSentence: {
            target: "Buenos días, ¿cómo está usted hoy?",
            phonetic: "Bweh-nos dee-as, koh-moh es-tah oos-ted oy?",
            translation: "Good morning, how are you today?"
          }
        }
      ];
    } else if (language === "english") {
      fallbackCards = [
        {
          front: "Safety first",
          phonetic: "Seyf-tee furst",
          back: "सुरक्षा सर्वोपरि (Safety is the top priority)",
          category: topic || "Workplace Safety",
          notes: "Core international workplace motto.",
          exampleSentence: {
            target: "Always wear your PPE on site: safety first!",
            phonetic: "All-ways wear your P-P-E on site: seyf-tee furst!",
            translation: "Always wear your PPE on site: safety first!"
          }
        },
        {
          front: "Understood, thank you",
          phonetic: "Un-der-stood, thank yoo",
          back: "समझ गया, धन्यवाद",
          category: topic || "Workplace Communication",
          notes: "Standard professional acknowledgement.",
          exampleSentence: {
            target: "Understood, thank you for the guidance.",
            phonetic: "Un-der-stood, thank yoo for the guy-dance.",
            translation: "Understood, thank you for the guidance."
          }
        }
      ];
    } else {
      fallbackCards = [
        {
          front: "よろしくお願いします",
          phonetic: "Yoroshiku onegai shimasu",
          back: "Please treat me favorably / I look forward to working with you",
          category: topic || "Daily Life",
          notes: "Foundation of polite Japanese interactions.",
          exampleSentence: {
            target: "これからもよろしくお願いします。",
            phonetic: "Korekara mo yoroshiku onegai shimasu.",
            translation: "Looking forward to working with you going forward."
          }
        },
        {
          front: "お疲れ様です",
          phonetic: "Otsukaresama desu",
          back: "Thank you for your hard work",
          category: topic || "Daily Life",
          notes: "Daily greeting between coworkers or colleagues.",
          exampleSentence: {
            target: "今日もお疲れ様でした！",
            phonetic: "Kyou mo otsukaresama deshita!",
            translation: "Great work today as well!"
          }
        }
      ];
    }

    res.json({ success: true, data: { cards: fallbackCards }, isFallback: true });
  }
});

// 6. Interactive Voice Pronunciation Coach & Fast Evaluation
app.post("/api/voice-pronunciation-eval", async (req, res) => {
  const {
    targetPhrase,
    spokenPhrase,
    targetPhoneticHindi,
    language,
    hindiMeaning,
    tradeCategory,
  } = req.body;

  const target = (targetPhrase || "").toLowerCase().trim();
  const spoken = (spokenPhrase || targetPhrase || "").toLowerCase().trim();

  // Fast calculation of similarity
  let matchScore = 86;
  if (target === spoken) {
    matchScore = 96;
  } else if (spoken.includes(target) || target.includes(spoken)) {
    matchScore = 90;
  } else {
    // Check character overlap
    let matchChars = 0;
    for (const char of spoken) {
      if (target.includes(char)) matchChars++;
    }
    const ratio = matchChars / Math.max(target.length, 1);
    matchScore = Math.min(95, Math.max(72, Math.round(ratio * 100)));
  }

  const fastFallbackData = {
    accuracyScore: matchScore,
    fluencyScore: Math.max(70, matchScore - 4),
    grade: matchScore >= 90 ? "A+" : matchScore >= 80 ? "A" : "B",
    feedbackInHindi: matchScore >= 85 
      ? `शानदार प्रयास! आपका उच्चारण बहुत स्पष्ट और शुद्ध है। ${targetPhoneticHindi ? `(${targetPhoneticHindi})` : ''} को इसी तरह धाराप्रवाह बोलें।`
      : `अच्छा प्रयास! ध्वनि को थोड़ा और स्पष्ट करें। ${targetPhoneticHindi ? `(${targetPhoneticHindi})` : ''} को 1-2 बार और बोलकर अभ्यास करें।`,
    phoneticGuideHindi: targetPhoneticHindi || targetPhrase,
    syllableBreakdown: (targetPhoneticHindi || targetPhrase).split(/[\s-]+/).map((s: string) => ({
      syllable: s,
      correct: true,
      tip: "स्पष्ट ध्वनि"
    })),
    soundTipsHindi: "आवाज को स्थिर और मध्यम गति में रखें ताकि सामने वाला व्यक्ति आसानी से समझ सके।",
    workplaceContextHindi: `कार्यस्थल पर यह वाक्य "${hindiMeaning || 'दैनिक कार्य'}" के लिए उपयोग किया जाता है।`
  };

  try {
    const systemPrompt = `You are a fast AI Language Pronunciation Coach for UP Migrant Workers. Return concise JSON:
{
  "accuracyScore": 90,
  "fluencyScore": 88,
  "grade": "A+",
  "feedbackInHindi": "बहुत बढ़िया उच्चारण!",
  "phoneticGuideHindi": "${targetPhoneticHindi || targetPhrase}",
  "syllableBreakdown": [{"syllable": "शब्द", "correct": true, "tip": "स्पष्ट"}],
  "soundTipsHindi": "आवाज साफ रखें।",
  "workplaceContextHindi": "कार्यस्थल उपयोगिता।"
}`;

    const contents = `Target: "${targetPhrase}" (${language}), Expected Hindi: "${targetPhoneticHindi}", Spoken: "${spokenPhrase}"`;

    // 2.0s fast timeout promise
    const geminiPromise = callGeminiWithRetry({
      systemInstruction: systemPrompt,
      contents: contents,
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Fast timeout")), 2200)
    );

    const rawText = (await Promise.race([geminiPromise, timeoutPromise])) as string;
    const parsed = cleanAndParseJson(rawText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    // Fast instant response
    res.json({
      success: true,
      data: fastFallbackData,
      isFallback: true
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PolyGlot Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
