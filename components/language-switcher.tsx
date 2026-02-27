'use client';

import { Check, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from './language-provider';

const languages = [
  { code: 'zh' as const, label: '中文', flag: '🇨🇳' },
  { code: 'en' as const, label: 'English', flag: '🇺🇸' },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const handleLanguageChange = (code: 'zh' | 'en') => {
    setLang(code);
  };

  const current = languages.find(l => l.code === lang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{current?.label}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="gap-2"
          >
            <span>{language.flag}</span>
            <span>{language.label}</span>
            {lang === language.code && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
