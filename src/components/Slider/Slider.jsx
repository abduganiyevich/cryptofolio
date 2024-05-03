import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useWatchlist } from '../WatchlistContext/WatchlistContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from '../Slider/Slide.module.css';
import { useNavigate } from 'react-router-dom';

function CryptoCarousel() {
  const [cryptos, setCryptos] = useState([]);
  const { symbol } = useWatchlist();
  const navigate = useNavigate();
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h')
      .then(response => response.json())
      .then(data => {
        const updatedCryptos = data.map(crypto => {
          const priceChange = parseFloat(crypto.price_change_percentage_24h);
          return {
            ...crypto,
            color: priceChange > 0 ? 'green' : 'red'
          };
        });
        setCryptos(updatedCryptos);
      })
      .catch(error => {
        console.error("Ma'lumotlar olishda xatolik:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const handleClick = (crypto) => {
    navigate(`/extrainfo/${crypto.id}`);
    updateWatchlist(crypto);
  };
  return (
    <div className={style['slider-wrap']}>
      <div className="container">
        <div>
          <h1 className={style['slider-title']}>CRYPTOFOLIO WATCH LIST</h1>
          <p>Get all the Info regarding your favorite Crypto Currency</p>
        </div>

        <div style={{ margin: '0 auto' }}>
          <Slider {...settings} arrows={false}>
            {cryptos.map(crypto => (
              <div className={style['slider-item']} key={crypto.id}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: 'pointer' }} onClick={() => handleClick(crypto)} >
                  <img src={crypto.image} alt={crypto.name} />
                  <p>{crypto.symbol.toUpperCase()} <span style={{ color: crypto.color }}>+{crypto.price_change_percentage_24h.toFixed(2)}%</span></p>
                  <p className={style['crypto-price']}>{symbol}&nbsp;{crypto.current_price}</p>
                </div>
              </div>
            ))}
          </Slider>

        </div>
      </div>
    </div>
  );
}

export default CryptoCarousel;
