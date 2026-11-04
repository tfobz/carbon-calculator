import { useEffect, useState } from 'preact/hooks';
import type {  ModuleInstance } from '../types';
import { MODULE_CATALOG } from '../data/moduleCatalog';
import { t } from '../i18n';

interface Props {
  moduleInstance: ModuleInstance;
  onClose: () => void;
  onSave: (updated: ModuleInstance) => void;
}

export function EditModuleModal({ moduleInstance, onClose, onSave }: Props) {
  const def = MODULE_CATALOG[moduleInstance.defId];
  
  // Local state for editing before saving
  const [mainValue, setMainValue] = useState(moduleInstance.value);
  const [subValues, setSubValues] = useState<Record<string, number>>(moduleInstance.submoduleValues || {});

  if (!def) return null;

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [onClose]);

  const handleSubChange = (subId: string, val: number) => {
    setSubValues(prev => ({ ...prev, [subId]: val }));
  };

  const handleSave = () => {
    onSave({ ...moduleInstance, value: mainValue, submoduleValues: subValues });
    onClose();
  };

  return (
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full shadow-xl">
        <h2 class="text-lg sm:text-xl font-bold mb-2">{def.icon} {t('editModule')}</h2>
        <p class="text-gray-600 text-xs sm:text-sm mb-6">{def.description}</p>

        {/* Show Main Value Input ONLY if there are no submodules */}
        {(!def.submodules || def.submodules.length === 0) && (
          <div class="mb-4">
            <label class="block text-xs sm:text-sm font-bold mb-2">{t('value')} ({def.unit})</label>
            <input 
              type="number" min="0" step="0.1"
              value={mainValue} 
              onInput={(e) => setMainValue(Number((e.target as HTMLInputElement).value))}
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>
        )}

        {/* Show Submodule Inputs if they exist */}
        {def.submodules && def.submodules.length > 0 && (
          <div class="space-y-3 mb-6">
            <p class="font-bold text-xs sm:text-sm text-gray-700">{t('enterValuesByType')} ({def.unit}):</p>
            {def.submodules.map(sub => (
              <div key={sub.id} class="flex justify-between items-center gap-4">
                <label class="text-xs sm:text-sm text-gray-600 flex-1">{sub.title}</label>
                <input 
                  type="number" min="0" step="0.1"
                  value={subValues[sub.id] || 0}
                  onInput={(e) => handleSubChange(sub.id, Number((e.target as HTMLInputElement).value))}
                  class="w-20 sm:w-24 p-1.5 border border-gray-300 rounded text-right text-sm"
                />
              </div>
            ))}
          </div>
        )}

        <div class="flex justify-end gap-2 sm:gap-3 mt-8">
          <button onClick={onClose} class="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium text-sm">{t('cancel')}</button>
          <button onClick={handleSave} class="px-3 sm:px-4 py-2 bg-green-700 text-white font-bold rounded hover:bg-green-800 text-sm">
            {t('saveChanges')}
          </button>
        </div>
      </div>
    </div>
  );
}