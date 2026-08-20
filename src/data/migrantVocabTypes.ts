export interface TradeCategory {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  icon: string;
  descriptionHindi: string;
  color: string;
}

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
