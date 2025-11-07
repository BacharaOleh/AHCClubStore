import React, { useState, useEffect } from 'react';
import type { Collection } from '../types';
import { TonIcon } from './icons/TonIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { ClockIcon } from './icons/ClockIcon';


interface CollectionModalProps {
  collection: Collection;
  onClose: () => void;
}

const getDaysLeft = (endDateString?: string) => {
    if (!endDateString) return { value: 0, text: 'N/A' };
    const endDate = new Date(endDateString);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
        return { value: 0, text: 'Ended' };
    }
    return { value: diffDays, text: `${diffDays} days left` };
}

const KickstarterInfo: React.FC<{ collection: Collection }> = ({ collection }) => {
    const progress = collection.fundingGoal && collection.fundingRaised 
        ? Math.min((collection.fundingRaised / collection.fundingGoal) * 100, 100) 
        : 0;
    
    const daysLeft = getDaysLeft(collection.endDate);

    return (
        <div>
            <div className="my-6">
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div 
                        className="bg-slate-200 h-2.5 rounded-full" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-xl font-bold">{Math.floor(progress)}%</p>
                        <p className="text-xs text-slate-400">Funded</p>
                    </div>
                     <div>
                        <p className="text-xl font-bold flex items-center justify-center gap-1"><TonIcon className="w-4 h-4" />{collection.fundingRaised}</p>
                        <p className="text-xs text-slate-400">Raised of {collection.fundingGoal} TON</p>
                    </div>
                     <div>
                        <p className="text-xl font-bold flex items-center justify-center gap-1.5"><UserGroupIcon className="w-4 h-4"/>{collection.backers}</p>
                        <p className="text-xs text-slate-400">Backers</p>
                    </div>
                     <div>
                        <p className="text-xl font-bold flex items-center justify-center gap-1.5"><ClockIcon className="w-4 h-4"/>{daysLeft.value}</p>
                        <p className="text-xs text-slate-400">{daysLeft.value === 1 ? 'day left' : 'days left'}</p>
                    </div>
                </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-900 hover:bg-slate-200 font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
                <TonIcon className="w-6 h-6" />
                Back this Project
            </button>
        </div>
    );
};

const ReleasedInfo: React.FC = () => {
    return (
        <button className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-900 hover:bg-slate-200 font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
            <TonIcon className="w-6 h-6" />
            Buy Sticker Pack for 0.05 TON
        </button>
    );
}


export const CollectionModal: React.FC<CollectionModalProps> = ({ collection, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true"></div>

      <div
        className={`relative w-full max-w-lg m-4 bg-slate-900 rounded-2xl shadow-2xl shadow-slate-500/10 overflow-hidden transition-all duration-300 ease-out ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
           <img src={collection.coverImageUrl} alt={`${collection.name} cover`} className="w-full h-48 object-cover"/>
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
           <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 text-white bg-slate-950/50 rounded-full p-2 hover:bg-slate-950/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close modal"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
           </button>
        </div>

        <div className="p-6">
            <h2 className="text-3xl font-bold">{collection.name}</h2>
            <div className="flex items-center mt-2 mb-6">
                <img src={collection.creatorAvatarUrl} alt={collection.creator} className="w-8 h-8 rounded-full border-2 border-slate-700" />
                <p className="text-md text-slate-300 ml-3">by {collection.creator}</p>
            </div>
            
            {collection.status === 'kickstarter' ? <KickstarterInfo collection={collection} /> : <ReleasedInfo />}


            <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-300 border-b border-slate-700 pb-2 mb-4">Stickers in this collection</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 max-h-64 overflow-y-auto pr-2">
                    {collection.stickers.map(sticker => (
                        <div key={sticker.id} className="aspect-square bg-slate-700 rounded-lg overflow-hidden transition-transform hover:scale-110 hover:z-10">
                            <img src={sticker.imageUrl} alt={sticker.name} className="w-full h-full object-cover" title={sticker.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};