import { COUNTRY_NAMES, COUNTRY_FLAGS, FACTORS, type CountryCode, type EmissionFactors } from "../data/factors";
import { t } from "../i18n";

export function FactorsView() {
  const countryCodes = Object.keys(COUNTRY_NAMES) as CountryCode[];
  const factorKeys = Object.keys(FACTORS[countryCodes[0]]) as (keyof EmissionFactors)[];

  return (
    <div>
      <h2 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">🔢 {t('factors')}</h2>
      <table class="w-full border border-gray-300 rounded-lg overflow-hidden mb-2">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-300 p-2 text-left">{t('factor')}</th>
            {countryCodes.map(code => {
              return (
                <th class="border border-gray-300 p-2 text-right">{COUNTRY_FLAGS[code]} {COUNTRY_NAMES[code]} [kg CO₂]</th>
              );
            })}

          </tr>
        </thead>
        <tbody>
          {factorKeys.map(key => {
            return (
              <tr>
                <td class="border border-gray-300 p-2"><em>{key}</em></td>
                {countryCodes.map(code => {
                  return (

                    <td class="border border-gray-300 p-2" style={{ textAlign: 'right' }}>
                      {FACTORS[code][key].toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                    </td>
                  );
                })}

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}