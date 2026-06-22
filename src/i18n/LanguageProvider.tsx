"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { en } from "./en";
import { th } from "./th";

type Locale = "en" | "th";
export type Dictionary = typeof en;

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("preferred-locale");
  if (saved === "en" || saved === "th") return saved;
  if (navigator.language.toLowerCase().startsWith("th")) return "th";
  return "en";
}

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("preferred-locale", newLocale);
  };

  const t = locale === "en" ? en : th;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
