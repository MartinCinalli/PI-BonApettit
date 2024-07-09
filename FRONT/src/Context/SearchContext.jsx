import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, filteredRecipes, setFilteredRecipes }}>
      {children}
    </SearchContext.Provider>
  );
};

