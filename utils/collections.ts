import type { Collection } from '../types';
import { collections as initialCollections } from '../constants';

const COLLECTIONS_STORAGE_KEY = 'ton-store-collections';

/**
 * Retrieves collections from localStorage.
 * If no collections are found, it initializes localStorage with the initial data.
 * This function simulates an async fetch to keep the UI loading state consistent.
 * @returns A promise that resolves to an array of collections.
 */
export const getLocalCollections = (): Promise<Collection[]> => {
  return new Promise((resolve) => {
    setTimeout(() => { // Simulate network delay
      try {
        const rawData = localStorage.getItem(COLLECTIONS_STORAGE_KEY);
        if (!rawData || rawData === '[]') {
          localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(initialCollections));
          resolve(initialCollections);
        } else {
          resolve(JSON.parse(rawData));
        }
      } catch (error) {
        console.error("Failed to get collections from localStorage, initializing with default:", error);
        // Fallback to initial data if localStorage is corrupt or inaccessible
        localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(initialCollections));
        resolve(initialCollections);
      }
    }, 250); // 250ms delay to show loading indicator
  });
};

/**
 * Updates a single collection in localStorage.
 * This function simulates an async update.
 * @param updatedCollection The collection object with new data.
 * @returns A promise that resolves when the update is complete.
 */
export const updateLocalCollection = (updatedCollection: Collection): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            // Use a non-async version here to avoid race conditions with React state
            const rawData = localStorage.getItem(COLLECTIONS_STORAGE_KEY);
            const allCollections: Collection[] = rawData ? JSON.parse(rawData) : initialCollections;

            const newCollections = allCollections.map(c => 
                c.id === updatedCollection.id ? updatedCollection : c
            );
            localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(newCollections));
            resolve();
        } catch (error) {
            console.error("Failed to update collection in localStorage:", error);
            reject(error);
        }
    });
};
