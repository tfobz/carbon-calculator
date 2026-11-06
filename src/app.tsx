import { currentView, activeOrgId, navigateTo, selectOrganization } from './store';
import { OrganizationsView } from './pages/OrganizationsView';
import { DashboardView } from './pages/DashboardView';
import { StatisticsView } from './pages/StatisticsView';
import { FactorsView } from './pages/FactorsView';
import { SettingsView } from './pages/SettingsView';
import { AboutView } from './pages/AboutView';
import { t } from './i18n';
import logoPath from './assets/logo.png';

function Navbar() {
  // A simple helper function to apply Tailwind classes based on the active view
  const navBtnClass = (view: string) => `
    px-3 py-1.5 rounded-md transition-colors text-sm font-medium flex items-center gap-2
    ${currentView.value === view 
      ? 'bg-green-50 text-green-700' 
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
  `;

  return (
    <nav class="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      
      {/* Logo / Home Button */}
      <button 
        class="font-bold cursor-pointer flex items-center gap-2 text-lg hover:opacity-80 transition-opacity"
        onClick={() => selectOrganization(null)} // Clears active org and goes to 'orgs' view
      >
        <img src={logoPath} alt="Carbon Calculator" class="h-8 w-8" />
        <span class="hidden sm:inline text-green-700">Carbon Calculator</span>
      </button>

      {/* Navigation Links */}
      <div class="flex gap-1 sm:gap-2">
        {/* Only show Dashboard link if an organization is currently selected */}
        {activeOrgId.value && (
           <button 
             class={navBtnClass('dashboard')} 
             onClick={() => navigateTo('dashboard')}
           >
             <span>📊</span>
             <span class="hidden sm:inline">{t('dashboard')}</span>
           </button>
        )}
        
        <button 
          class={navBtnClass('stats')} 
          onClick={() => navigateTo('stats')}
        >
          <span>📈</span>
          <span class="hidden sm:inline">{t('stats')}</span>
        </button>

        <button
          class={navBtnClass('factors')}
          onClick={() => navigateTo('factors')}
        >
          <span>🔢</span>
          <span class="hidden sm:inline">{t('factors')}</span>
        </button>

        <button 
          class={navBtnClass('settings')} 
          onClick={() => navigateTo('settings')}
        >
          <span>⚙️</span>
          <span class="hidden sm:inline">{t('settings')}</span>
        </button>
      </div>

    </nav>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer class="bg-gray-100 border-t border-gray-200 mt-12 py-6">
      <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-600 gap-4 text-center sm:text-left">
        <p class="m-0">© {currentYear} {t('copyright')}</p>
        <div class="flex items-center gap-4">
          <button 
            onClick={() => navigateTo('about')}
            class="text-green-700 hover:text-green-900 font-medium transition-colors"
          >
            {t('about')}
          </button>
          <a 
            href="https://github.com/tfobz/carbon-calculator"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 hover:text-gray-900 transition-colors"
            title="View on GitHub"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.186.092-.923.35-1.544.636-1.9-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <div class="min-h-screen text-gray-800 font-sans flex flex-col">
      <Navbar />
      <main class="flex-1 p-4 max-w-4xl mx-auto w-full">
        {currentView.value === 'orgs' && <OrganizationsView />}
        {currentView.value === 'dashboard' && <DashboardView />}
        {currentView.value === 'stats' && <StatisticsView />}
        {currentView.value === 'factors' && <FactorsView />}
        {currentView.value === 'settings' && <SettingsView />}
        {currentView.value === 'about' && <AboutView />}
      </main>
      <Footer />
    </div>
  );
}