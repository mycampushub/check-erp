import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Set value in localStorage and state
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove value from localStorage and reset to initial value
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes to this localStorage key from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage key "${key}":`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}

// Specialized hooks for common Odoo data types
export function useOdooStorage<T>(
  collection: string,
  initialValue: T[] = []
): [T[], (items: T[]) => void, (item: T) => void, (id: string) => void, () => void] {
  const [items, setItems, clearItems] = useLocalStorage<T[]>(
    `odoo_${collection}`,
    initialValue as T[]
  );

  const addItem = useCallback(
    (item: T) => {
      setItems(currentItems => [...currentItems, item]);
    },
    [setItems]
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems(currentItems =>
        currentItems.filter((item: any) => item.id !== id)
      );
    },
    [setItems]
  );

  return [items, setItems, addItem, removeItem, clearItems];
}

// Hook for user preferences
export function useUserPreferences() {
  const [preferences, setPreferences] = useLocalStorage("odoo_user_preferences", {
    theme: "light",
    language: "en",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    defaultView: "list",
    itemsPerPage: 20,
  });

  const updatePreference = useCallback(
    (key: string, value: any) => {
      setPreferences(current => ({ ...current, [key]: value }));
    },
    [setPreferences]
  );

  return [preferences, setPreferences, updatePreference] as const;
}

// Hook for view states (filters, sorting, etc.)
export function useViewState(viewId: string) {
  const [viewStates, setViewStates] = useLocalStorage("odoo_view_states", {});

  const getViewState = useCallback(
    (defaultState = {}) => {
      return (viewStates as any)[viewId] || defaultState;
    },
    [viewStates, viewId]
  );

  const setViewState = useCallback(
    (state: any) => {
      setViewStates(current => ({
        ...current,
        [viewId]: { ...(current as any)[viewId], ...state }
      }));
    },
    [setViewStates, viewId]
  );

  const clearViewState = useCallback(() => {
    setViewStates(current => {
      const updated = { ...current };
      delete (updated as any)[viewId];
      return updated;
    });
  }, [setViewStates, viewId]);

  return [getViewState, setViewState, clearViewState] as const;
}

// Hook for managing form drafts
export function useFormDraft(formId: string) {
  const [drafts, setDrafts] = useLocalStorage("odoo_form_drafts", {});

  const getDraft = useCallback(
    () => (drafts as any)[formId] || null,
    [drafts, formId]
  );

  const saveDraft = useCallback(
    (data: any) => {
      setDrafts(current => ({
        ...current,
        [formId]: { ...data, _savedAt: Date.now() }
      }));
    },
    [setDrafts, formId]
  );

  const clearDraft = useCallback(() => {
    setDrafts(current => {
      const updated = { ...current };
      delete (updated as any)[formId];
      return updated;
    });
  }, [setDrafts, formId]);

  const hasDraft = useCallback(
    () => !!(drafts as any)[formId],
    [drafts, formId]
  );

  return [getDraft, saveDraft, clearDraft, hasDraft] as const;
}
