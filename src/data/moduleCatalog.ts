import type { ModuleDef } from '../types';
import { FACTORS } from './factors';

export const MODULE_CATALOG: Record<string, ModuleDef> = {
  // --- FOOD & BEVERAGE ---
  pizza: {
    id: 'pizza',
    title: 'Pizza Consumption',
    description: 'Number of pizzas consumed',
    unit: 'pieces',
    icon: '🍕',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].pizza,
  },
  coffee: {
    id: 'coffee',
    title: 'Coffee Consumption',
    description: 'Number of cups of coffee',
    unit: 'cups',
    icon: '☕',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].coffee,
  },
  drinks: {
    id: 'drinks',
    title: 'Beverage Consumption',
    description: '500ml drinks consumed',
    unit: 'bottles',
    icon: '🥤',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].drinks_500ml,
  },

  // --- PAPER & OFFICE ---
  paper_a4: {
    id: 'paper_a4',
    title: 'A4 Paper Usage',
    description: 'Sheets of A4 paper',
    unit: 'sheets',
    icon: '📄',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].dina4,
  },
  paper_a3: {
    id: 'paper_a3',
    title: 'A3 Paper Usage',
    description: 'Sheets of A3 paper',
    unit: 'sheets',
    icon: '📋',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].dina3,
  },
  toner: {
    id: 'toner',
    title: 'Toner Cartridges',
    description: 'Printer toner cartridges used',
    unit: 'cartridges',
    icon: '🖨️',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].toner,
  },

  // --- TECHNOLOGY & EQUIPMENT ---
  computer: {
    id: 'computer',
    title: 'Desktop Computers',
    description: 'Number of active computers per year',
    unit: 'units',
    icon: '🖥️',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].computer,
  },
  laptop: {
    id: 'laptop',
    title: 'Laptops',
    description: 'Number of laptops per year',
    unit: 'units',
    icon: '💻',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].laptop,
  },
  server: {
    id: 'server',
    title: 'Servers',
    description: 'Number of active servers per year',
    unit: 'units',
    icon: '🖲️',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].server,
  },
  printer: {
    id: 'printer',
    title: 'Printers',
    description: 'Number of active printers per year',
    unit: 'units',
    icon: '🖨️',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].printer,
  },
  printer_3d: {
    id: 'printer_3d',
    title: '3D Printers',
    description: 'Number of 3D printers per year',
    unit: 'units',
    icon: '🖨️',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].printer_3d,
  },
  plotter: {
    id: 'plotter',
    title: 'Plotters',
    description: 'Number of plotters per year',
    unit: 'units',
    icon: '📐',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].plotter,
  },

  // --- RESOURCES ---
  water: {
    id: 'water',
    title: 'Water Usage',
    description: 'Liters of water consumed',
    unit: 'liters',
    icon: '💧',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].water,
  },
  heating: {
    id: 'heating',
    title: 'Heating Energy (Gas/Oil)',
    description: 'Heating energy consumption',
    unit: 'm³',
    icon: '🔥',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].heating,
  },
  district_heating: {
    id: 'district_heating',
    title: 'District Heating',
    description: 'District heating energy consumption',
    unit: 'kWh',
    icon: '🌡️',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].district_heating,
  },
  school_car: {
    id: 'school_car',
    title: 'School Car Travel',
    description: 'Person-kilometers traveled in school cars',
    unit: 'km',
    icon: '🚌',
    calculateCO2: (value, _sub, country) => value * FACTORS[country].school_car,
  },

  // --- MOBILITY & TRANSPORTATION ---
  mobility: {
    id: 'mobility',
    title: 'Mobility & Travel',
    description: 'Distance traveled per transport type (km)',
    unit: 'km',
    icon: '🚗',
    submodules: [
      { id: 'pkw', title: 'Car (PKW)' },
      { id: 'bus', title: 'Intercity Bus' },
      { id: 'train', title: 'Train' },
      { id: 'city_bus', title: 'City Bus' }
    ],
    calculateCO2: (_val, sub, country) => {
      if (!sub) return 0;
      const factors = FACTORS[country];
      return (
        (sub.pkw || 0) * factors.mobility_pkw +
        (sub.bus || 0) * factors.mobility_bus +
        (sub.train || 0) * factors.mobility_train +
        (sub.city_bus || 0) * factors.mobility_city_bus
      );
    }
  },

  // --- ENERGY ---
  electricity: {
    id: 'electricity',
    title: 'Electricity Mix',
    description: 'Energy consumed per source (kWh)',
    unit: 'kWh',
    icon: '⚡',
    submodules: [
      { id: 'neutral', title: 'Carbon Neutral (0 CO₂)' },
      { id: 'wind', title: 'Wind Power' },
      { id: 'hydro', title: 'Hydro Power' },
      { id: 'gas', title: 'Natural Gas' },
      { id: 'oil', title: 'Oil' },
      { id: 'coal', title: 'Coal' }
    ],
    calculateCO2: (_val, sub, country) => {
      if (!sub) return 0;
      const factors = FACTORS[country];
      return (
        (sub.wind || 0) * factors.electricity_wind +
        (sub.hydro || 0) * factors.electricity_hydro +
        (sub.gas || 0) * factors.electricity_gas +
        (sub.oil || 0) * factors.electricity_oil +
        (sub.coal || 0) * factors.electricity_coal
      );
    }
  },
};
