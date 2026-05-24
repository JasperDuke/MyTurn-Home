"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { LegalDocumentContent } from "./LegalDocumentContent";

export function PrivacyPolicyContent() {
  const { t } = useLanguage();
  return <LegalDocumentContent document={t.privacy} />;
}
