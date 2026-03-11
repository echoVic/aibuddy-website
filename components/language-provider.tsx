'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import zhMessages from '@/messages/zh.json';
import enMessages from '@/messages/en.json';

type Language = 'zh' | 'en';

interface Messages {
  [key: string]: string | string[] | Messages;
}

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string | string[] | Messages;
}

const messages: Record<Language, Messages> = {
  zh: zhMessages as Messages,
  en: enMessages as Messages,
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'zh',
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('zh');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('aibuddy-lang') as Language;
    if (saved && (saved === 'zh' || saved === 'en')) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('aibuddy-lang', newLang);
    document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : 'en-US';
  };

  const t = (key: string): string | string[] | Messages => {
    const keys = key.split('.');
    let value: unknown = messages[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && !Array.isArray(value) && k in value) {
        value = (value as Messages)[k];
      } else {
        // Fallback
        let fallback: unknown = messages['zh'];
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && !Array.isArray(fallback) && fk in fallback) {
            fallback = (fallback as Messages)[fk];
          } else {
            return key;
          }
        }
        return fallback as string | string[] | Messages;
      }
    }
    
    return value as string | string[] | Messages;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
