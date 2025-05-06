
// Simple utility to manage API key storage in localStorage

// Key for storing in localStorage
const API_KEY_STORAGE_KEY = 'emailScribe_apiKey';

// Get the stored API key
export const getApiKey = (): string => {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
};

// Store the API key
export const setApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
};

// Check if API key exists
export const hasApiKey = (): boolean => {
  return !!getApiKey();
};

// Clear the API key
export const clearApiKey = (): void => {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
};
