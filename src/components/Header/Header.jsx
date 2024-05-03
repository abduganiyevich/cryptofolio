import React, { useState, useEffect, useContext } from 'react';
import style from '../Header/Header.module.css';
import Modal from '../Modal/Modal';
import axios from 'axios';
import { WatchlistContext } from '../WatchlistContext/WatchlistContext'; 

function Header() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { selectedCurrency, setSelectedCurrency } = useContext(WatchlistContext); 
  const [cryptoData, setCryptoData] = useState([]);

  function handleModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
  }, [selectedCurrency]);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div className={style.header}>
      <div className="container">
        <div className={style['header-wrapper']}>
          <div className={style['header-logo']}>
            <h2>CRYPTOFOLIO</h2>
          </div>

          <div className={style['watchlist']}>
            <select className={style['header-select']} value={selectedCurrency} onChange={handleCurrencyChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            <button onClick={handleModal} className={style['header-btn']}>watch list</button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} cryptoData={cryptoData} />
    </div>
  );
}

export default Header;
