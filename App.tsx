
import React, { useState, useEffect } from 'react';
import { useTonWallet } from '@tonconnect/ui-react';
import { Header } from './components/Header';
import { CollectionCard } from './components/CollectionCard';
import { Footer } from './components/Footer';
import type { Collection, TransactionRecord } from './types';
import { CollectionModal } from './components/CollectionModal';
import { NavBar } from './components/NavBar';
import { View1ColIcon } from './components/icons/View1ColIcon';
import { View2ColIcon } from './components/icons/View2ColIcon';
import { View3ColIcon } from './components/icons/View3ColIcon';
import { TransactionHistory } from './components/TransactionHistory';
import { addHistory } from './utils/history';
import { getLocalCollections, updateLocalCollection } from './utils/collections';

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
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedCollections, setDisplayedCollections] = useState<Collection[]>([]);
  const [contentVisible, setContentVisible] = useState(false);
  const [gridCols, setGridCols] = useState(3);
  const [collectionStatus, setCollectionStatus] = useState<'released' | 'kickstarter'>('released');
  
  const wallet = useTonWallet();
  
  // Fetch collections from local storage on mount
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getLocalCollections();
        setCollections(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
    
    // Trigger intro animations
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
          collectionsToDisplay = shuffleArray([...collections]);
          break;
        case 'Newest':
          collectionsToDisplay = [...collections].reverse();
          break;
        case 'My Collections':
          collectionsToDisplay = []; // This category is now handled by wallet logic, but we keep it for structure
          break;
        case 'My Activity':
          collectionsToDisplay = []; // This will be handled by the TransactionHistory component
          break;
        case 'Featured':
        default:
          collectionsToDisplay = [...collections];
          break;
      }

      // Filter by status, but not for "My Collections" or "My Activity"
      if (activeCategory !== 'My Collections' && activeCategory !== 'My Activity') {
        collectionsToDisplay = collectionsToDisplay.filter(c => c.status === collectionStatus);
      }

      setDisplayedCollections(collectionsToDisplay);
      setContentVisible(true);
    }, 300); // Duration of fade transition

    return () => clearTimeout(timer);
  }, [activeCategory, collectionStatus, collections]);
  
  // This useEffect ensures the data in the modal is always in sync with the main app state.
  useEffect(() => {
    if (selectedCollection) {
      const updatedCollection = collections.find(c => c.id === selectedCollection.id);
      if (updatedCollection) {
        setSelectedCollection(updatedCollection);
      }
    }
  }, [collections, selectedCollection]);


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
  
  const handleSuccessfulTransaction = async (updatedCollection: Collection) => {
    // Update the UI state
    setCollections(prev => prev.map(c => c.id === updatedCollection.id ? updatedCollection : c));
    
    // Add to local transaction history
    if (wallet) {
      const newRecord: TransactionRecord = {
        collectionId: updatedCollection.id,
        collectionName: updatedCollection.name,
        amount: updatedCollection.price, // Note: This assumes the pledge amount is the price
        date: new Date().toISOString(),
        type: updatedCollection.status === 'kickstarter' ? 'pledge' : 'purchase'
      };
      addHistory(wallet.account.address, newRecord);
    }
    
    // Persist the change to local storage
    try {
      await updateLocalCollection(updatedCollection);
    } catch (error) {
      console.error("Error saving collection update to local storage:", error);
      // Optionally show a toast to the user that saving failed
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
  
  const renderContent = () => {
    if (isLoading) {
        return <div className="text-center py-16 text-slate-400">Loading collections...</div>;
    }
    if (error) {
        return <div className="text-center py-16 text-red-400">Error: {error}</div>;
    }

    if (activeCategory === 'My Activity') {
      return <TransactionHistory walletAddress={wallet?.account.address ?? null} />;
    }

    if (displayedCollections.length > 0) {
      return (
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
      );
    }

    return (
      <div className="text-center py-16 animate-fade-in">
        <h3 className="text-2xl font-bold text-slate-400">Nothing here... yet!</h3>
        <p className="text-slate-500 mt-2">
          {activeCategory === 'My Collections' 
            ? "You haven't collected any sticker packs."
            : `There are no ${collectionStatus} collections in this category.`
          }
        </p>
      </div>
    );
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
            {activeCategory !== 'My Activity' && (
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
            )}
            <div
              className={`transition-opacity duration-300 ${
                contentVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
      <Footer />
      {selectedCollection && (
        <CollectionModal 
          collection={selectedCollection}
          onClose={() => setSelectedCollection(null)}
          onSuccessfulTransaction={handleSuccessfulTransaction}
        />
      )}
    </div>
  );
};

export default App;