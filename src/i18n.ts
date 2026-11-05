import { signal, effect } from "@preact/signals";

// Import your new JSON files
import en from './locales/en.json';
import de from './locales/de.json';
import it from './locales/it.json';
import es from './locales/es.json';
import sv from './locales/sv.json';

export type Language = 'en' | 'de' | 'it' | 'es' | 'sv';

const savedLang = localStorage.getItem("carbon-app-lang") as Language;
export const currentLang = signal<Language>(savedLang || navigator.language.substring(0, 2) as Language || 'en');

effect(() => {
  localStorage.setItem("carbon-app-lang", currentLang.value);
});

// Map the imported JSON files to our dictionary object
const dictionary: Record<Language, Record<string, string>> = {
  en, de, it, es, sv
};

export function t(key: string): string {
  return dictionary[currentLang.value]?.[key] || dictionary['en'][key] || key;
}