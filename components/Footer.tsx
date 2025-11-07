import React from 'react';
import { TelegramIcon } from './icons/TelegramIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { DiscordIcon } from './icons/DiscordIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 mt-16">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-slate-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Alternative Store. All Rights Reserved.
        </p>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <TwitterIcon className="w-6 h-6" />
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <TelegramIcon className="w-6 h-6" />
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <DiscordIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};