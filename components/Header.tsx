import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { TonConnectButton } from '@tonconnect/ui-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/50 backdrop-blur-lg border-b border-slate-800/50">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <LogoIcon className="w-8 h-8 text-white"/>
          <span className="text-xl font-bold tracking-tighter">Alternative Store</span>
        </div>
        <TonConnectButton />
      </div>
    </header>
  );
};