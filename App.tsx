import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CollectionCard } from './components/CollectionCard';
import { Footer } from './components/Footer';
import { collections as initialCollections } from './constants';
import type { Collection } from './types';
import { CollectionModal } from './components/CollectionModal';
import { NavBar } from './components/NavBar';
import { View1ColIcon } from './components/icons/View1ColIcon';
import { View2ColIcon } from './components/icons/View2ColIcon';
import { View3ColIcon } from './components/icons/View3ColIcon';

// Utility function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


const App: React.FC = () => {
  const [introVisible, setIntroVisible] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [activeCategory, setActiveCategory] = useState('Featured');
  const [displayedCollections, setDisplayedCollections] = useState<Collection[]>([]);
  const [contentVisible, setContentVisible] = useState(false);
  const [gridCols, setGridCols] = useState(3);
  const [collectionStatus, setCollectionStatus] = useState<'released' | 'kickstarter'>('released');


  useEffect(() => {
    // Trigger animations on mount
    const timer = setTimeout(() => {
      setIntroVisible(true);
      setContentVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCollection) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedCollection]);

  // Handle filtering and displaying collections
  useEffect(() => {
    setContentVisible(false);

    const timer = setTimeout(() => {
      let collectionsToDisplay: Collection[];
      switch (activeCategory) {
        case 'Trending':
          collectionsToDisplay = shuffleArray([...initialCollections]);
          break;
        case 'Newest':
          collectionsToDisplay = [...initialCollections].reverse();
          break;
        case 'My Collections':
          collectionsToDisplay = [];
          break;
        case 'Featured':
        default:
          collectionsToDisplay = [...initialCollections];
          break;
      }

      // Filter by status, but not for "My Collections"
      if (activeCategory !== 'My Collections') {
        collectionsToDisplay = collectionsToDisplay.filter(c => c.status === collectionStatus);
      }

      setDisplayedCollections(collectionsToDisplay);
      setContentVisible(true);
    }, 300); // Duration of fade transition

    return () => clearTimeout(timer);
  }, [activeCategory, collectionStatus]);


  const handleCategoryChange = (category: string) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
  };
  
  const handleStatusChange = (status: 'released' | 'kickstarter') => {
    if (status !== collectionStatus) {
        setCollectionStatus(status);
    }
  };

  const getGridClass = (cols: number): string => {
    switch (cols) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
      default:
        return 'grid-cols-3';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1117] to-[#010409] text-white overflow-x-hidden">
      <Header />
      <div className="pt-16"> {/* Offset for fixed header */}
        <NavBar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        <main className="container mx-auto px-4 pb-8">
          <div
            className={`transition-all duration-700 ease-out mt-8 ${
              introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-black text-center uppercase text-slate-100">
              Alternative Store
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300 text-center max-w-2xl mx-auto">
             Стор от комьюнити и для комьюнити. Хватит кормить шайку.
            </p>
          </div>

          <div className="mt-12 md:mt-16">
            <div className="flex justify-end items-center gap-4 mb-4">
               {/* Status Switch */}
               <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-full">
                {(['Released', 'Kickstarter'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status.toLowerCase() as 'released' | 'kickstarter')}
                    className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 focus:outline-none ${
                      collectionStatus === status.toLowerCase() ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              {/* Grid Layout Switch */}
              <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-full">
                {[1, 2, 3].map(cols => (
                  <button
                    key={cols}
                    onClick={() => setGridCols(cols)}
                    className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                      gridCols === cols ? 'bg-slate-200 text-slate-900' : 'text-slate-400 hover:bg-slate-700'
                    }`}
                    aria-label={`Set ${cols} column layout`}
                  >
                    {cols === 1 && <View1ColIcon className="w-5 h-5" />}
                    {cols === 2 && <View2ColIcon className="w-5 h-5" />}
                    {cols === 3 && <View3ColIcon className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`transition-opacity duration-300 ${
                contentVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {displayedCollections.length > 0 ? (
                <div className={`grid ${getGridClass(gridCols)} gap-6 md:gap-8`}>
                  {displayedCollections.map((collection, index) => (
                    <div
                      key={`${collection.id}-${activeCategory}-${collectionStatus}`} // Use a key that changes with category to re-trigger animations
                      className="animate-fade-in"
                      style={{ animationFillMode: 'backwards', animationDelay: `${index * 100}ms` }}
                    >
                      <CollectionCard collection={collection} onClick={() => setSelectedCollection(collection)} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 animate-fade-in">
                  <h3 className="text-2xl font-bold text-slate-400">Nothing here... yet!</h3>
                  <p className="text-slate-500 mt-2">
                    {activeCategory === 'My Collections' 
                      ? "You haven't collected any sticker packs."
                      : `There are no ${collectionStatus} collections in this category.`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
      {selectedCollection && (
        <CollectionModal 
          collection={selectedCollection}
          onClose={() => setSelectedCollection(null)}
        />
      )}
    </div>
  );
};

export default App;