import React from 'react';
import type { Collection } from '../types';

interface CollectionCardProps {
  collection: Collection;
  onClick: () => void;
}

const KickstarterProgress: React.FC<{ collection: Collection }> = ({ collection }) => {
  const progress =
    collection.fundingGoal && collection.fundingRaised
      ? Math.min((collection.fundingRaised / collection.fundingGoal) * 100, 100)
      : 0;

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-bold text-slate-300">{Math.floor(progress)}% Funded</span>
        <span className="text-xs text-slate-400">{collection.fundingRaised} TON</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-1.5">
        <div
          className="bg-slate-200 h-1.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};


export const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full h-full flex flex-col text-left group relative bg-slate-900 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-slate-100/10 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-slate-900"
      aria-label={`View collection ${collection.name}`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
        <img
          src={collection.coverImageUrl}
          alt={collection.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-20 flex -space-x-2 transition-all duration-300 group-hover:-space-x-1">
            {collection.stickers.slice(0, 3).map((sticker) => (
                <img key={sticker.id} src={sticker.imageUrl} alt={sticker.name} className="w-10 h-10 rounded-full object-cover border-2 border-slate-800" />
            ))}
        </div>
      </div>

      <div className="p-4 z-20 w-full flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold truncate">{collection.name}</h3>
          <div className="flex items-center mt-2">
            <img
              src={collection.creatorAvatarUrl}
              alt={collection.creator}
              className="w-6 h-6 rounded-full border-2 border-slate-700"
            />
            <p className="text-sm text-slate-300 ml-2">{collection.creator}</p>
          </div>
        </div>
        {collection.status === 'kickstarter' && <KickstarterProgress collection={collection} />}
      </div>
    </button>
  );
};