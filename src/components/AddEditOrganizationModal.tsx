import { useState } from 'preact/hooks';
import { COUNTRY_NAMES, type CountryCode } from '../data/factors';
import { t } from '../i18n';

interface Props {
  onClose: () => void;
  onConfirm: (name: string, description: string, country: CountryCode) => void;
  isEdit?: {name: string, description: string, country: CountryCode};
}

export function AddEditOrganizationModal({ onClose, onConfirm, isEdit }: Props) {
  const [name, setName] = useState(isEdit ? isEdit.name : "");
  const [description, setDescription] = useState(isEdit ? isEdit.description : "");
  const [country, setCountry] = useState<CountryCode>(isEdit ? isEdit.country : "it");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (name.trim()) {
      onConfirm(name.trim(), description.trim(), country);
      setName("");
      setDescription("");
      setCountry("it");
    }
  };

  return (
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full shadow-xl">
        <h2 class="text-lg sm:text-xl font-bold mb-4">{isEdit ? t('editOrganization') : t('addNewOrganization')}</h2>
        
        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="block text-xs sm:text-sm font-bold mb-2">{t('organizationNameRequired')}</label>
            <input 
              type="text" 
              required 
              placeholder={t('organizationNamePlaceholder')}
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>
          
          <div>
            <label class="block text-xs sm:text-sm font-bold mb-2">{t('description')}</label>
            <input 
              type="text" 
              placeholder={t('descriptionPlaceholder')}
              value={description}
              onInput={(e) => setDescription((e.target as HTMLInputElement).value)}
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>

          <div>
            <label class="block text-xs sm:text-sm font-bold mb-2">{t('country')}</label>
            <select 
              value={country}
              onChange={(e) => setCountry((e.target as HTMLSelectElement).value as CountryCode)}
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 text-sm"
            >
              {Object.entries(COUNTRY_NAMES).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button 
              type="button"
              onClick={onClose} 
              class="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium text-sm"
            >
              {t('cancel')}
            </button>
            <button 
              type="submit"
              class="px-3 sm:px-4 py-2 bg-green-700 text-white font-bold rounded hover:bg-green-800 text-sm"
            >
              {isEdit ? t('editOrganization') : t('createOrganization')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
