import type { CountryCode } from './data/factors';

export interface SubmoduleDef {
  id: string;
  title: string;
}

// How a developer defines a new module
export interface ModuleDef {
  id: string;
  title: string;
  description: string;
  unit: string; // e.g., "pieces", "kg", "km", "kWh"
  icon: string; // emoji or icon for display
  submodules?: SubmoduleDef[];
  // The formula function that calculates CO2 based on the given value
  calculateCO2: (value: number, submoduleValues: Record<string, number> | undefined, country: CountryCode) => number;
}

// How a user's entered data is saved
export interface ModuleInstance {
  id: string;
  defId: string; // Matches a ModuleDef.id
  value: number;
  submoduleValues?: Record<string, number>;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  country: CountryCode;
  modules: ModuleInstance[];
}