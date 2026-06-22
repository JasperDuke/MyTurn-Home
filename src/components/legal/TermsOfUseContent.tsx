"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { LegalDocumentContent } from "./LegalDocumentContent";

export function TermsOfUseContent() {
  const { t } = useLanguage();
  return <LegalDocumentContent document={t.terms} />;
}
