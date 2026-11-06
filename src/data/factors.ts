
import atData from './factors/at.json';
import itData from './factors/it.json';
import esData from './factors/es.json';
import seData from './factors/sv.json';

export type CountryCode = 'at' | 'it' | 'es' | 'sv';

// We extract the type directly from the JSON structure so TypeScript 
// will warn us if a country rep forgets a key in the future!
export type EmissionFactors = typeof atData; 

// Aggregate them into our dictionary
export const FACTORS: Record<CountryCode, EmissionFactors> = {
  at: atData,
  it: itData,
  es: esData,
  sv: seData
};

// The human-readable names for the UI dropdown
export const COUNTRY_NAMES: Record<CountryCode, string> = {
  at: "Austria",
  it: "Italy",
  es: "Spain",
  sv: "Sweden"
};

export const COUNTRY_FLAGS: Record<CountryCode, string> = {
  at: '🇦🇹',
  it: '🇮🇹',
  es: '🇪🇸',
  sv: '🇸🇪'
};