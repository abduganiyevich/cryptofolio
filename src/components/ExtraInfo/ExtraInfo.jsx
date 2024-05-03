import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import Chart from "../Chart/Chart";
import style from '../ExtraInfo/ExtraInfo.module.css';

function ExtraInfo() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [currency, setCurrency] = useState('USD');

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
      const data = await response.json();
      setCoin(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!coin) return <div className={style["linear-progress"]}></div>;

  return (
    <div className={style['general-container']}>
      <Header />
      <div className={style['general-wrapper']}>
        <div className={style['coins-container']}>
          <div className={style.sidebar}>
            <div className={style['coin-wrapper']}>
              <img src={coin?.image.large} alt={coin.name} className={style["coin-image"]} />
              <h3 className={style["coin-name"]}>{coin.name}</h3>
              <div className={style.description} dangerouslySetInnerHTML={{ __html: coin?.description.en.split(". ")[0] }}>

              </div>
            </div>
            <div className={style.info}>
              <div className={style["info-item"]}>
                <h5>Rank: &nbsp;  <span>{coin?.market_cap_rank}</span></h5>
              </div>
              <div className={style["info-item"]}>
                <h5>Current Price:&nbsp; <span>{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])} {currency}</span></h5>
              </div>
              <div className={style["info-item"]}>
                <h5>Market Cap:  &nbsp;<span>{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M {currency}</span></h5>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Chart coin={{ id: id }} />
        </div>
      </div>
    </div>
  );
}

export default ExtraInfo;
