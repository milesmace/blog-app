import { isBrowser } from './next'

/**
 * Loads and parses a value from `localStorage` by the given key.
 *
 * ### Overload 1:
 * If no fallback value is provided and the key is not found or parsing fails,
 * the function returns `null`.
 *
 * ### Overload 2:
 * If a fallback value is provided, it will be returned in case the key is missing
 * or the stored value cannot be parsed.
 *
 * @template T - The expected return type after parsing the stored JSON string.
 *
 * @param {string} key - The key under which the value is stored in `localStorage`.
 *
 * @returns {(T | null)} - The parsed value from `localStorage`, or `null` if not found or invalid.
 */
export function loadFromStorage<T = string>(key: string): T | null;

/**
 * Loads and parses a value from `localStorage`, or returns the provided fallback.
 *
 * @template T - The expected return type after parsing the stored JSON string.
 *
 * @param {string} key - The key under which the value is stored in `localStorage`.
 * @param {T} fallback - A fallback value returned if the key is missing or data is invalid.
 *
 * @returns {T} - The parsed value from `localStorage`, or the fallback if not found or invalid.
 */
export function loadFromStorage<T = string>(key: string, fallback: T): T;

export function loadFromStorage<T = string>(
  key: string,
  fallback?: T,
): T | null {
  // Return fallback if not in browser environment
  if (!isBrowser()) {
    throw new Error('Not in browser environment');
  }

  const item = localStorage.getItem(key);

  if (!item) return fallback !== undefined ? fallback : null;

  try {
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`Failed to parse localStorage "${key}":`, e);
    return fallback !== undefined ? fallback : null;
  }
}

/**
 * Serializes and saves a typed value to localStorage.
 *
 * @template T - The type of the value to store.
 * @param key - The localStorage key to store the value under.
 * @param value - The value to store.
 */
export const saveToStorage = <T = string>(key: string, value: T): void => {
  // Do nothing if not in browser environment
  if (!isBrowser()) {
    throw new Error('Not in browser environment');
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to stringify localStorage "${key}":`, e);
  }
};

/**
 * Removes a key and its value from localStorage.
 *
 * @param key - The localStorage key to remove.
 */
export const removeFromStorage = (key: string): void => {
  // Do nothing if not in browser environment
  if (!isBrowser()) {
    throw new Error('Not in browser environment');
  }

  localStorage.removeItem(key);
};
