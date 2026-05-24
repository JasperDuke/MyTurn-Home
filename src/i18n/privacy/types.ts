export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type LegalSubsection = {
  title?: string;
  blocks: LegalBlock[];
};

export type LegalSection = {
  number: number;
  title: string;
  blocks?: LegalBlock[];
  subsections?: LegalSubsection[];
};

export type PrivacyPolicyDictionary = {
  title: string;
  subtitle: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
};
