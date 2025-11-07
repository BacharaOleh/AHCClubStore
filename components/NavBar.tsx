
import React from 'react';

const categories = ['Featured', 'Trending', 'Newest', 'My Activity'];

interface NavBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <nav className="sticky top-16 z-40 bg-slate-900/70 backdrop-blur-lg border-b border-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 sm:px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-colors duration-300 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-slate-200 text-slate-900 shadow-md shadow-slate-400/20'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
              aria-current={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
