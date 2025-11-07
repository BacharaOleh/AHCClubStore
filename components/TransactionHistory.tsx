
import React, { useState, useEffect } from 'react';
import type { TransactionRecord } from '../types';
import { getHistory } from '../utils/history';
import { TonIcon } from './icons/TonIcon';
import { WalletIcon } from './icons/WalletIcon'; // A new icon for wallet

interface TransactionHistoryProps {
  walletAddress: string | null;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ walletAddress }) => {
  const [history, setHistory] = useState<TransactionRecord[]>([]);

  useEffect(() => {
    if (walletAddress) {
      setHistory(getHistory(walletAddress));
    } else {
      setHistory([]);
    }
  }, [walletAddress]);

  if (!walletAddress) {
    return (
      <div className="text-center py-16 animate-fade-in flex flex-col items-center">
        <WalletIcon className="w-16 h-16 text-slate-600 mb-4" />
        <h3 className="text-2xl font-bold text-slate-400">Connect Your Wallet</h3>
        <p className="text-slate-500 mt-2">
          Please connect your wallet to view your transaction history.
        </p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <h3 className="text-2xl font-bold text-slate-400">No Activity Yet</h3>
        <p className="text-slate-500 mt-2">
          Your purchases and backed projects will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-100 mb-6 text-center">My Activity</h2>
      <div className="space-y-4">
        {history.map((record, index) => (
          <div
            key={index}
            className="bg-slate-800/50 p-4 rounded-lg flex justify-between items-center border border-slate-700"
          >
            <div>
              <p className="font-bold text-slate-100 text-lg">{record.collectionName}</p>
              <p className="text-sm text-slate-400">
                {new Date(record.date).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
                <p className="font-bold text-lg flex items-center gap-1.5 justify-end">
                    <TonIcon className="w-5 h-5" />
                    <span>{record.amount}</span>
                </p>
                 <p className={`text-xs font-semibold uppercase ${record.type === 'pledge' ? 'text-green-400' : 'text-blue-400'}`}>
                    {record.type}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add WalletIcon component here or in a separate file
const WalletIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m15-3V4.5A2.25 2.25 0 0015.75 2.25h-5.5A2.25 2.25 0 008 4.5v2.25m7.5 0h-7.5" />
  </svg>
);
