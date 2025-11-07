
import type { TransactionRecord } from '../types';

const HISTORY_STORAGE_KEY = 'ton-store-transaction-history';

/**
 * Retrieves all transaction histories from localStorage.
 * @returns An object where keys are wallet addresses and values are their transaction arrays.
 */
const getAllHistories = (): Record<string, TransactionRecord[]> => {
  try {
    const rawData = localStorage.getItem(HISTORY_STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : {};
  } catch (error) {
    console.error("Failed to parse transaction history:", error);
    return {};
  }
};

/**
 * Retrieves the transaction history for a specific wallet address.
 * @param walletAddress The user's TON wallet address.
 * @returns An array of transaction records, sorted with the most recent first.
 */
export const getHistory = (walletAddress: string): TransactionRecord[] => {
  const allHistories = getAllHistories();
  const userHistory = allHistories[walletAddress] || [];
  // Return sorted by date, newest first
  return userHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

/**
 * Adds a new transaction record to the history for a specific wallet address.
 * @param walletAddress The user's TON wallet address.
 * @param newRecord The transaction record to add.
 */
export const addHistory = (walletAddress: string, newRecord: TransactionRecord): void => {
  const allHistories = getAllHistories();
  const userHistory = allHistories[walletAddress] || [];
  
  userHistory.push(newRecord);
  allHistories[walletAddress] = userHistory;

  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(allHistories));
  } catch (error) {
    console.error("Failed to save transaction history:", error);
  }
};
