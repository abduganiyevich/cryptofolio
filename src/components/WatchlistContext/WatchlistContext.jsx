import React, { createContext, useContext, useState, useEffect } from 'react';

export const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => JSON.parse(localStorage.getItem('watchlist')) || []);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
   useEffect(() => {
        if (selectedCurrency === 'USD') setSymbol('$');
        if (selectedCurrency === 'GBP') setSymbol('£');
        if (selectedCurrency === 'EUR') setSymbol('€');
    }, [selectedCurrency]) 

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const updateWatchlist = (crypto) => {
    const index = watchlist.findIndex(item => item.id === crypto.id);
    if (index === -1) {
      setWatchlist([...watchlist, crypto]);
    } else {
      const updatedWatchlist = [...watchlist];
      updatedWatchlist.splice(index, 1);
      setWatchlist(updatedWatchlist);
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, updateWatchlist, selectedCurrency, setSelectedCurrency,symbol,setSymbol }}>
      {children}
    </WatchlistContext.Provider>
  );
};
