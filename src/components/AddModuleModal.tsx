import { useEffect, useState } from 'preact/hooks';
import { MODULE_CATALOG } from '../data/moduleCatalog';
import type { ModuleInstance } from '../types';
import { t } from '../i18n';

interface Props {
  onClose: () => void;
  onConfirm: (moduleInstance: ModuleInstance) => void;
}

export function AddModuleModal({ onClose, onConfirm }: Props) {
  const [selectedDefId, setSelectedDefId] = useState(Object.keys(MODULE_CATALOG)[0]);
  const [mainValue, setMainValue] = useState(0);
  const [subValues, setSubValues] = useState<Record<string, number>>({});

  const def = MODULE_CATALOG[selectedDefId];

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
  
  const handleAdd = () => {
    const newModule: ModuleInstance = {
      id: crypto.randomUUID(),
      defId: selectedDefId,
      value: mainValue,
      submoduleValues: subValues
    };
    onConfirm(newModule);
    onClose();
  };

  return (
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full shadow-xl max-h-screen overflow-y-auto">
        <h2 class="text-lg sm:text-xl font-bold mb-2">{t('addModule')}</h2>
        <p class="text-gray-600 text-xs sm:text-sm mb-6">{t('selectModuleDesc')}</p>

        {/* Module Selection */}
        <div class="mb-4">
          <label class="block text-xs sm:text-sm font-bold mb-2">{t('selectModuleType')}</label>
          <select 
            value={selectedDefId}
            onChange={(e) => {
              setSelectedDefId((e.target as HTMLSelectElement).value);
              setMainValue(0);
              setSubValues({});
            }}
            class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 text-sm"
          >
            {Object.values(MODULE_CATALOG).map(mod => (
              <option key={mod.id} value={mod.id}>{mod.icon} {mod.title}</option>
            ))}
          </select>
          <p class="text-gray-500 text-xs mt-2">{def?.description}</p>
        </div>

        {/* Main Value Input - only for modules without submodules */}
        {(!def?.submodules || def.submodules.length === 0) && (
          <div class="mb-6">
            <label class="block text-xs sm:text-sm font-bold mb-2">{t('value')} ({def?.unit})</label>
            <input 
              type="number" min="0" step="0.1"
              value={mainValue}
              onInput={(e) => setMainValue(Number((e.target as HTMLInputElement).value))}
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 text-sm"
              placeholder={t('enterValue')}
            />
          </div>
        )}

        {/* Submodule Inputs */}
        {def?.submodules && def.submodules.length > 0 && (
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
          <button onClick={onClose} class="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium text-sm">
            {t('cancel')}
          </button>
          <button 
            onClick={handleAdd} 
            class="px-3 sm:px-4 py-2 bg-green-700 text-white font-bold rounded hover:bg-green-800 text-sm"
          >
            {t('addModuleBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
