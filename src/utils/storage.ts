import { AppState } from '../types';
import { INITIAL_APP_STATE } from './mockData';

const STORAGE_KEY = 'TRAVELER_MICRO_MVP_STATE_V1';

export function loadStoredState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_APP_STATE;
    }
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_APP_STATE,
      ...parsed,
    };
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return INITIAL_APP_STATE;
  }
}

export function saveStoredState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
}

export function clearStoredState(): AppState {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear state from localStorage:', err);
  }
  return INITIAL_APP_STATE;
}
