import type { LegalSection } from "../privacy/types";

export type TermsOfUseDictionary = {
  title: string;
  subtitle: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
};
