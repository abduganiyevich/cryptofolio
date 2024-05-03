import React, { useState, useEffect } from 'react';
import style from './Main.module.css';
import { IoEyeSharp } from "react-icons/io5";
import { useWatchlist } from '../WatchlistContext/WatchlistContext';
import { useNavigate } from 'react-router-dom';
import prev from '../../assets/prev.png';
import next from '../../assets/next.png';
import { ThreeDots } from 'react-loading-icons';

function MainSection() {
  const { watchlist, updateWatchlist, selectedCurrency } = useWatchlist();
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCryptos();
  }, [currentPage, searchTerm, selectedCurrency]);

  const fetchCryptos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=gecko_desc&per_page=10&page=${currentPage}&sparkline=false&price_change_percentage=24h`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setCryptos(data);
      filterCryptos(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      
    }
  };
 

  const filterCryptos = (data) => {
    const filtered = data.filter(crypto => crypto.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCryptos(filtered);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (crypto) => {
    navigate(`/extrainfo/${crypto.id}`);
    updateWatchlist(crypto);
  };

  const totalPages = 10;
  const maxPagesToShow = 5;

  const renderPaginationButtons = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          style={currentPage === page ? { color: "white", backgroundColor: "#FFFFFF29" } : null}
        >
          {page}
        </button>
      );
    }

    return pages;
  };

  return (
    <div>
      {loading ? (
        <div className={style['loader-style']}>
          <ThreeDots
            visible="true" 
            height="140"
            width="140"
            color="#4fa94d"
            radius="9"
            aria-label="three-dots-loading" 
          />
        </div>
      ) : (
        <div className='container'>
          <h2 className={style['main-title']}>Cryptocurrency Prices by Market Cap</h2>
          <form className={style['input-form']}>
            <input type="text" placeholder='Search For a Cryptocurrency..' value={searchTerm} onChange={handleSearchChange} />
          </form>

          <div className={style['main-table']}>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px" }}>Coin</th>
                  <th>Price</th>
                  <th>24 Change</th>
                  <th>Market Cap</th>
                </tr>
              </thead>

              <tbody>
                {filteredCryptos.map(crypto => (
                  <tr key={crypto.id} onClick={() => handleClick(crypto)}>
                    <td>
                      <div className={style['main-coins']}>
                        <img src={crypto.image} width={50} height={50} alt={crypto.name} />
                        <div className={style['coins-info']}>
                          <p>{crypto.symbol.toUpperCase()}</p>
                          <span>{crypto.name}</span>
                        </div>
                      </div>
                    </td>
                    <td>${crypto.current_price}</td>
                    <td>
                      <IoEyeSharp
                        className={style['crypto-eyes']}
                        style={{ color: watchlist.some(item => item.id === crypto.id) ? 'white' : 'green' }}
                      />
                      <span>{crypto.price_change_percentage_24h.toFixed(2)}%</span>
                    </td>
                    <td>${crypto.market_cap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={style['pagination']}>
            <button className={style['prev-btn']} onClick={handlePrevPage} disabled={currentPage === 1}>
              <img src={prev} alt="prev" />
            </button>
            {renderPaginationButtons()}
            <button className={style['next-btn']} onClick={handleNextPage} disabled={currentPage === totalPages}>
              <img src={next} alt="next" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainSection;
