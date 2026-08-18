export interface CulturalArticle {
  id: string;
  languageId: string;
  category: string;
  title: string;
  subtitle: string;
  heroQuote: {
    target: string;
    phonetic: string;
    translation: string;
  };
  overview: string;
  dos: string[];
  donts: string[];
  keyPhrases: Array<{
    text: string;
    phonetic: string;
    translation: string;
    context: string;
  }>;
  historicalContext: string;
}

export const CULTURAL_ARTICLES: CulturalArticle[] = [
  {
    id: 'culture-uae-majlis',
    languageId: 'uae-arabic',
    category: 'Hospitality & Social Customs',
    title: 'The Art of the Emirati Majlis & Dallah Coffee Protocol',
    subtitle: 'The sanctuary of conversation, wisdom, and Arabian hospitality (Karam).',
    heroQuote: {
      target: 'الْمَجْلِسْ مَدْرَسَةْ لِلرِّجَالْ وَالأَجْيَالْ',
      phonetic: "Al-majlis madrasah lil-rijaal wal-ajyaal",
      translation: 'The Majlis is a lifelong academy for generations.'
    },
    overview: 'The Majlis (literally "place of sitting") is the heartbeat of Emirati social and civic life. In the UAE, it serves as an open forum where friends, family, and community members gather to converse, resolve disputes, and celebrate milestones.',
    dos: [
      'Remove your shoes at the entrance if traditional carpets or floor cushions are laid.',
      'Greet starting from the right-hand side of the room or greet the eldest host first with a firm handshake or "Khashm Makhshoum" (traditional nose-touch greeting among close male peers).',
      'Always receive and hold the finjan (small handleless coffee cup) with your right hand.',
      'Enjoy dates (Tamr) before sipping the hot cardamom and saffron-infused Gahwa.',
      'Gently shake the cup side-to-side (Hazz al-Finjan) when you have finished drinking coffee.'
    ],
    donts: [
      'Never sit with the soles of your feet pointing towards anyone.',
      'Never use your left hand to hand over coffee cups, dates, or gifts.',
      'Never decline the first cup of Gahwa, as offering it is a foundational sign of honor (Karam).'
    ],
    keyPhrases: [
      {
        text: 'مَرْحَبَا السَّاعْ',
        phonetic: "Marhaba al-saa'",
        translation: 'Welcome at this very hour',
        context: 'Used when guests step through the door of the Majlis.'
      },
      {
        text: 'دَايْمَةْ إِنْ شَاءَ اللَّهْ',
        phonetic: "Daayma insha'Allah",
        translation: 'May your generosity endure forever',
        context: 'Said to the host after finishing coffee, tea, or a feast.'
      },
      {
        text: 'تَسْلَمْ إِيْدِكْ',
        phonetic: 'Taslam eedak',
        translation: 'Bless your hands',
        context: 'Said to whoever pours your coffee or serves food.'
      },
      {
        text: 'فَالِكْ طَيِّبْ',
        phonetic: 'Faalak tayyib',
        translation: 'Consider it done with great pleasure',
        context: 'When agreeing to a request or extending help.'
      }
    ],
    historicalContext: 'Nomadic Bedouin hospitality in the harsh desert environment dictated that any traveler seeking shelter was welcomed unconditionally for at least three days without being questioned about their origin or intent.'
  },
  {
    id: 'culture-fr-savoir-vivre',
    languageId: 'french',
    category: 'Social Etiquette & Dining',
    title: 'French Savoir-Vivre & Everyday Civility',
    subtitle: 'Navigating café culture, polite registers, and the sacred ritual of bread.',
    heroQuote: {
      target: 'Le savoir-vivre est le parfum de la civilisation.',
      phonetic: 'Luh sah-vwahr vee-vr ay luh pahr-fahn duh lah see-vee-lee-zah-syohn.',
      translation: 'Good manners are the fragrance of civilization.'
    },
    overview: 'In France, etiquette is not about rigid formality; it is about cultivating mutual respect, appreciating the beauty of food and conversation (l\'art de vivre), and respecting public shared spaces.',
    dos: [
      'Always start every interaction with "Bonjour" (or "Bonsoir" after 5 PM) before asking for anything.',
      'Use "Vous" when speaking with strangers, officials, service staff, and elders, until invited to use "Tu".',
      'Keep both hands resting visibly on the dining table (wrists touching edge, elbows off).',
      'Break bread with your fingers instead of cutting it with a knife.'
    ],
    donts: [
      'Never walk into a boutique or café without greeting the proprietor.',
      'Never rush through a meal or ask for the check before you have finished enjoying your coffee.',
      'Never put your bread on your main dinner plate; in casual dining, rest it directly on the tablecloth beside your plate.'
    ],
    keyPhrases: [
      {
        text: "S'il vous plaît",
        phonetic: 'Seel voo pleh',
        translation: 'Please (formal)',
        context: 'Essential for all polite requests.'
      },
      {
        text: 'Je vous en prie',
        phonetic: 'Zhuh vooz ahn pree',
        translation: 'You are most welcome / After you',
        context: 'Polite response to thank you, or letting someone go ahead.'
      },
      {
        text: 'Bonne dégustation !',
        phonetic: 'Buhn day-goos-tah-syohn!',
        translation: 'Enjoy your meal!',
        context: 'Said when food is served.'
      }
    ],
    historicalContext: 'The concept of "Courtoisie" stems from medieval French courtly traditions and Enlightenment salons where refined speech was prized as the highest art.'
  },
  {
    id: 'culture-ja-omotenashi',
    languageId: 'japanese',
    category: 'Social Harmony & Rituals',
    title: 'Japanese Omotenashi & Keigo Communication',
    subtitle: 'The philosophy of selfless hospitality and spatial mindfulness (Meiwaku).',
    heroQuote: {
      target: '一期一会 (いちごいちえ)',
      phonetic: 'Ichigo Ichie',
      translation: 'One time, one encounter (Treasuring every moment as once in a lifetime).'
    },
    overview: 'Omotenashi describes the Japanese approach to hospitality: anticipating the guest\'s needs with invisible effort and deep humility. It is closely tied to "Wa" (social harmony).',
    dos: [
      'Bow (Ojigi) to acknowledge greetings, express gratitude, or apologize.',
      'Present and receive business cards (Meishi) using both hands, reading the card carefully.',
      'Say "Itadakimasu" with hands clasped together before eating, and "Gochisousama deshita" after.',
      'Keep phones on silent ("Manner Mode") and avoid talking on trains and subways.'
    ],
    donts: [
      'Never pass food directly from chopsticks to chopsticks (Hashi-watashi), as this resembles funeral cremations.',
      'Never stick chopsticks vertically into a bowl of rice (Tsukitate-bashi).',
      'Never tip at restaurants or in taxis; exceptional service is standard and tipping can cause confusion.'
    ],
    keyPhrases: [
      {
        text: 'よろしくお願いします',
        phonetic: 'Yoroshiku onegai shimasu',
        translation: 'Please favor me / I count on you',
        context: 'Beginning a partnership, meeting someone new, or asking for assistance.'
      },
      {
        text: 'お疲れ様でした',
        phonetic: 'Otsukaresama deshita',
        translation: 'Thank you for your hard work',
        context: 'Said at the end of a workday or shared effort.'
      },
      {
        text: '恐れ入ります',
        phonetic: 'Osoreirimasu',
        translation: 'I am deeply humbled / Excuse my intrusion',
        context: 'Polite honorific phrase used when receiving praise or asking a favor.'
      }
    ],
    historicalContext: 'Rooted in the Japanese Tea Ceremony (Chado) developed by Sen no Rikyu, where host and guest share mutual harmony (Wa), respect (Kei), purity (Sei), and tranquility (Jaku).'
  }
];
