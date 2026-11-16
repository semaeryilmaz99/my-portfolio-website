export const locales = ['tr', 'en', 'de', 'es', 'fr', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

export const localeLabels: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  ru: 'Русский',
};

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** A piece of text in one or more languages. Turkish is the source language. */
export type L = { tr: string } & Partial<Record<Exclude<Locale, 'tr'>, string>>;

/** Picks the text for a locale; falls back to English, then Turkish. */
export function t(text: L, locale: Locale): string {
  return text[locale] ?? text.en ?? text.tr;
}
