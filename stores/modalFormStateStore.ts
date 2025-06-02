import { defineStore } from 'pinia';

export type FormState = Map<string, unknown>

export const useModalFormStateStore = defineStore('modalFormState', () => {
  const formsMap = ref<FormState>(new Map());

  const saveState = <T>(key: string, data: T) => {
    if (!key) return;
    formsMap.value.set(key, JSON.parse(JSON.stringify(data)));
  };

  const loadState = <T = unknown>(key: string): T | undefined => {
    if (!key || !formsMap.value.has(key)) return undefined;
    const data = formsMap.value.get(key);
    return JSON.parse(JSON.stringify(data));
  };

  const clearState = (key: string) => {
    if (!key) return;
    formsMap.value.delete(key);
  };

  const clearAllStates = () => {
    formsMap.value.clear();
  };

  const formsObject = computed(() => Object.fromEntries(formsMap.value));

  return {
    forms: formsObject,
    formsMap,
    saveState,
    loadState,
    clearState,
    clearAllStates,
  };
});
