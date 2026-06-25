// components/Visualizers/BSTVisualizer/BSTSearchResult.tsx

import React from 'react';

interface BSTSearchResultProps {
  searchResult: string | null;
}

export const BSTSearchResult: React.FC<BSTSearchResultProps> = ({ searchResult }) => {
  if (!searchResult) return null;
  
  const isFound = searchResult.includes('Found');
  
  return (
    <div className={`mb-4 p-3 rounded-xl text-center ${
      isFound ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`}>
      {searchResult}
    </div>
  );
};