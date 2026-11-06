import { COUNTRY_FLAGS, COUNTRY_NAMES, FACTORS } from "../data/factors";
import { t } from "../i18n";

export function FactorsView() {
  return (
    <div>
      <h2 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">🔢 {t('factors')}</h2>
      { (Object.keys(COUNTRY_NAMES) as Array<keyof typeof COUNTRY_NAMES>).map((code) => {
        return (
          <p class="mb-4 text-gray-700" key={code}>
            <h3 class="text-lg font-semibold">{COUNTRY_FLAGS[code]} {COUNTRY_NAMES[code]}</h3>
            <table class="w-full border border-gray-300 rounded-lg overflow-hidden mb-2">
              <thead class="bg-gray-100">
                <tr>
                  <th class="border border-gray-300 p-2 text-left">{t('factor')}</th>
                  <th class="border border-gray-300 p-2 text-right">{t('value')} in kg CO₂</th>
                </tr>
              </thead>
              {Object.entries(FACTORS[code]).map(([key, value]) => {
                return (
                  <tr>
                    <td class="border border-gray-300 p-2"><em>{key}</em></td>
                    <td class="border border-gray-300 p-2" style={{ textAlign: 'right' }}>
                      {Number.parseFloat(value.toString()).toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                    </td>
                  </tr>
                );
              })}
            </table>
          </p>
        );
      }) }
    </div>
  );
}