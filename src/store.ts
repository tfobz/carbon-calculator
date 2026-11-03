import { signal, computed, effect } from "@preact/signals";
import type { Organization, ModuleInstance } from "./types";
import type { CountryCode } from "./data/factors";

// 1. Load from LocalStorage
const savedData = localStorage.getItem("carbon-app-data");
const initialOrgs: Organization[] = savedData ? JSON.parse(savedData) : [];

// 2. Define Signals
export const organizations = signal<Organization[]>(initialOrgs);
export const activeOrgId = signal<string | null>(null);
export type AppView = "orgs" | "dashboard" | "settings" | "stats" | "about";
export const currentView = signal<AppView>("orgs");

const historyStateKey = "carbonCalculator";

type AppHistoryState = {
  view: AppView;
  orgId: string | null;
};

function readAppHistoryState(value: unknown): AppHistoryState | null {
  if (!value || typeof value !== "object") return null;
  const state = (value as Record<string, unknown>)[historyStateKey];
  if (!state || typeof state !== "object") return null;

  const appState = state as Record<string, unknown>;
  const views: AppView[] = ["orgs", "dashboard", "settings", "stats", "about"];
  if (
    typeof appState.view !== "string" ||
    !views.includes(appState.view as AppView) ||
    (typeof appState.orgId !== "string" && appState.orgId !== null)
  ) return null;

  return { view: appState.view as AppView, orgId: appState.orgId };
}

function makeHistoryState(view: AppView, orgId: string | null) {
  return {
    ...history.state,
    [historyStateKey]: { view, orgId },
  };
}

history.replaceState(makeHistoryState(currentView.value, activeOrgId.value), "");

window.addEventListener("popstate", (event: PopStateEvent) => {
  const appState = readAppHistoryState(event.state);
  if (!appState) {
    activeOrgId.value = null;
    currentView.value = "orgs";
    return;
  }

  const orgExists = appState.orgId === null || organizations.value.some(org => org.id === appState.orgId);
  const orgId = orgExists ? appState.orgId : null;
  activeOrgId.value = orgId;
  currentView.value = appState.view === "dashboard" && orgId === null
    ? "orgs"
    : appState.view;
});

// 3. Auto-save to LocalStorage whenever 'organizations' changes
effect(() => {
  localStorage.setItem("carbon-app-data", JSON.stringify(organizations.value));
});

// 4. Computed Helpers
export const activeOrg = computed(() => 
  organizations.value.find(o => o.id === activeOrgId.value) || null
);

// 5. Actions
export function addOrganization(name: string, description: string, country: CountryCode) {
  const newOrg: Organization = { 
    id: crypto.randomUUID(), 
    name, 
    description,
    country, 
    modules: [] 
  };
  organizations.value = [...organizations.value, newOrg];
}

export function selectOrganization(id: string | null) {
  navigateTo(id ? "dashboard" : "orgs", id);
}

export function navigateTo(view: AppView, orgId = activeOrgId.value) {
  if (view === "dashboard" && orgId === null) return;
  if (currentView.value === view && activeOrgId.value === orgId) return;

  history.pushState(makeHistoryState(view, orgId), "");
  activeOrgId.value = orgId;
  currentView.value = view;
}

export function addModuleInstance(defId: string) {
  const currentOrgId = activeOrgId.value;
  if (!currentOrgId) return;

  // We update the signal immutably so the UI knows to re-render
  organizations.value = organizations.value.map(org => {
    if (org.id === currentOrgId) {
      return {
        ...org,
        modules: [
          ...org.modules,
          { id: crypto.randomUUID(), defId, value: 0, submoduleValues: {} }
        ]
      };
    }
    return org;
  });
}

export function addModuleInstanceWithValues(defId: string, value: number, submoduleValues?: Record<string, number>) {
  const currentOrgId = activeOrgId.value;
  if (!currentOrgId) return;

  // We update the signal immutably so the UI knows to re-render
  organizations.value = organizations.value.map(org => {
    if (org.id === currentOrgId) {
      return {
        ...org,
        modules: [
          ...org.modules,
          { id: crypto.randomUUID(), defId, value, submoduleValues: submoduleValues || {} }
        ]
      };
    }
    return org;
  });
}

export function updateModuleValue(moduleId: string, newValue: number) {
  const currentOrgId = activeOrgId.value;
  if (!currentOrgId) return;

  organizations.value = organizations.value.map(org => {
    if (org.id === currentOrgId) {
      return {
        ...org,
        modules: org.modules.map(mod => 
          mod.id === moduleId ? { ...mod, value: newValue } : mod
        )
      };
    }
    return org;
  });
}

export function updateModuleInstance(updatedModule: ModuleInstance) {
  const currentOrgId = activeOrgId.value;
  if (!currentOrgId) return;

  organizations.value = organizations.value.map(org => {
    if (org.id === currentOrgId) {
      return {
        ...org,
        modules: org.modules.map(mod => mod.id === updatedModule.id ? updatedModule : mod)
      };
    }
    return org;
  });
}

export function deleteModuleInstance(moduleId: string) {
  const currentOrgId = activeOrgId.value;
  if (!currentOrgId) return;

  organizations.value = organizations.value.map(org => {
    if (org.id === currentOrgId) {
      return {
        ...org,
        modules: org.modules.filter(mod => mod.id !== moduleId)
      };
    }
    return org;
  });
}

export function deleteOrganization(id: string) {
  organizations.value = organizations.value.filter(org => org.id !== id);
  if (activeOrgId.value === id) {
    selectOrganization(null);
  }
}