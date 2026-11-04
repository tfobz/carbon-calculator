import { useSignal, useComputed } from '@preact/signals';
import { activeOrg, addModuleInstanceWithValues, updateModuleInstance, deleteModuleInstance } from '../store';
import { MODULE_CATALOG } from '../data/moduleCatalog';
import { ModuleCard } from '../components/ModuleCard';
import { AddModuleModal } from '../components/AddModuleModal';
import { EditModuleModal } from '../components/EditModuleModal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { AddEditOrganizationModal } from '../components/AddEditOrganizationModal';
import { t } from '../i18n';

export function DashboardView() {
  const showAddModal = useSignal(false);
  const editingModule = useSignal<string | null>(null);
  const deletingModule = useSignal<string | null>(null);
  const showEditOrganizationModal = useSignal(false);

  // Calculate total CO2
  const totalCO2 = useComputed(() => {
    const org = activeOrg.value;
    if (!org) return 0;
    return org.modules.reduce((sum, mod) => {
      const def = MODULE_CATALOG[mod.defId];
      return sum + (def ? def.calculateCO2(mod.value, mod.submoduleValues, org.country) : 0);
    }, 0);
  });

  const org = activeOrg.value;
  if (!org) return <p class="text-gray-500 p-4">{t('noOrganizationsMsg')}</p>;

  const handleAddModule = (newModule: any) => {
    addModuleInstanceWithValues(newModule.defId, newModule.value, newModule.submoduleValues);
    showAddModal.value = false;
  };

  const handleDeleteModule = () => {
    if (deletingModule.value) {
      deleteModuleInstance(deletingModule.value);
      deletingModule.value = null;
    }
  };

  const handleEditOrganization = (name: string, description: string, country: string) => {
    org.name = name;
    org.description = description;
    org.country = country as any; // Assuming CountryCode type is compatible
    showEditOrganizationModal.value = false;
  }

  const editModule = org.modules.find(m => m.id === editingModule.value);

  return (
    <div>
      <h2 class="text-2xl sm:text-3xl font-bold mb-1">{org.name}</h2>
      {org.description && (
        <p class="text-gray-600 text-xs sm:text-sm mb-6">{org.description}</p>
      )}
      
      {/* Total CO2 Display */}
      <div class="mb-6 bg-gradient-to-r from-red-50 to-orange-50 p-4 sm:p-6 rounded-lg border border-red-200 mx-auto">
        <p class="text-gray-600 text-xs sm:text-sm mb-1">{t('totalCO2')}</p>
        <h3 class="text-2xl sm:text-4xl font-bold text-red-600 m-0">
          {totalCO2.value.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg CO₂
        </h3>
      </div>
      
      {/* List Active Modules */}
      <div class="mb-8">
        {org.modules.length === 0 ? (
          <p class="text-gray-500 text-sm">{t('noModulesMsg')}</p>
        ) : (
          org.modules.map(modInstance => (
            <ModuleCard 
              key={modInstance.id} 
              moduleInstance={modInstance} 
              country={org.country || 'it'} 
              onEdit={() => editingModule.value = modInstance.id}
              onDelete={() => deletingModule.value = modInstance.id}
            />
          ))
        )}
      </div>

      {/* Centered Add Module Button */}
      <div class="flex justify-center py-6 sm:py-8 border-t border-gray-200">
        <button 
          onClick={() => showAddModal.value = true}
          class="px-6 sm:px-8 py-2 sm:py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-colors shadow-lg text-sm sm:text-lg flex items-center gap-2"
        >
          ➕ {t('addModuleBtn')}
        </button>
        <button
          onClick={() => showEditOrganizationModal.value = true}
          class="px-6 sm:px-8 py-2 sm:py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors shadow-lg text-sm sm:text-lg flex items-center gap-2 ml-4"
        >
          {t('editOrganization')}
        </button>
      </div>

      {/* Modals */}
      {showAddModal.value && (
        <AddModuleModal 
          onClose={() => showAddModal.value = false}
          onConfirm={handleAddModule}
        />
      )}

      {editingModule.value && editModule && (
        <EditModuleModal 
          moduleInstance={editModule}
          onClose={() => editingModule.value = null}
          onSave={(updated) => {
            updateModuleInstance(updated);
            editingModule.value = null;
          }}
        />
      )}

      {deletingModule.value && (
        <ConfirmationModal 
          title={t('deleteModule')}
          message={t('deleteModuleConfirm')}
          confirmText={t('delete')}
          cancelText={t('cancel')}
          isDelete={true}
          onConfirm={handleDeleteModule}
          onCancel={() => deletingModule.value = null}
        />
      )}

      {showEditOrganizationModal.value && (
        <AddEditOrganizationModal 
          onClose={() => showEditOrganizationModal.value = false}
          onConfirm={handleEditOrganization}
          isEdit={{ name: org.name, description: org.description, country: org.country }}
        />
      )}
    </div>
  );
}