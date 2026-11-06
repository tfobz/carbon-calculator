// src/components/OrganizationCard.tsx
import type { Organization } from '../types';
import { COUNTRY_FLAGS, COUNTRY_NAMES } from '../data/factors';
import { t } from '../i18n';

interface Props {
  org: Organization;
  onClick: () => void;
}

export function OrganizationCard({ org, onClick }: Props) {
  const flag = COUNTRY_FLAGS[org.country] || '🌍';
  const countryName = COUNTRY_NAMES[org.country] || 'Unknown';
  
  // Truncate description after 80 characters with ellipsis
  const truncatedDesc = org.description && org.description.length > 80 
    ? org.description.substring(0, 80).trim() + '...'
    : org.description;
  
  return (
    <button 
      onClick={onClick}
      class="w-full border border-gray-200 rounded-lg p-4 cursor-pointer bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      <div class="flex-1 text-left">
        <h3 class="m-0 text-lg font-bold text-gray-900">{org.name}</h3>
        {truncatedDesc && (
          <p class="m-0 text-sm text-gray-600 mt-1 line-clamp-2">{truncatedDesc}</p>
        )}
      </div>
      <div class="flex items-center justify-between text-sm text-gray-500 mt-auto">
        <span>{flag} {countryName}</span>
        <span>{org.modules.length} {org.modules.length === 1 ? t('module') : t('modules')}</span>
      </div>
    </button>
  );
}