import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useWatchlist, WatchlistContext } from "../WatchlistContext/WatchlistContext";
import { ThreeDots } from 'react-loading-icons';
import styles from '../Chart/Chart.module.css'; 
import errorImage from '../../assets/file.png'
function Chart({ coin }) {
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    const {selectedCurrency}=useWatchlist();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currency, setCurrency] = useState(selectedCurrency.toLowerCase());

    const chartDays = [
        {
            label: "24 Hours",
            value: 1,
        },
        {
            label: "30 Days",
            value: 30,
        },
        {
            label: "3 Months",
            value: 90,
        },
        {
            label: "1 Year",
            value: 365,
        },
    ];

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`);
            const data = await res.json();
            setHistoricalData(data.prices);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currency, days]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    return (
        <div className={styles.chartContainer}>
            {loading ? (
                <div className={styles.loader}><ThreeDots
                visible="true" 
                height="140"
                width="140"
                color="#4fa94d"
                radius="9"
                aria-label="three-dots-loading" 
              /></div>
            ) : error ? (
                <div className={styles.error}>
                    {error.message}
                <img src={errorImage} alt=""  width={400} />
                </div>
            ) : (
                <>
                    <Line
                        data={{
                            labels: historicalData.map(coin => {
                                let date = new Date(coin[0]);
                                let time = date.getHours() > 12
                                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                    : `${date.getHours()}:${date.getMinutes()} AM`
                                return days === 1 ? time : date.toLocaleDateString();
                            }),
                            datasets: [
                                {
                                    data: historicalData.map(coin => coin[1]),
                                    label: `Price ( Past ${days} Days ) in ${currency.toUpperCase()}`,
                                    borderColor: '#87CEEB'
                                }
                            ]
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 1,
                                }
                            }
                        }}
                    />
                    <div className={styles.selectContainer}>
                        {chartDays.map(day => (
                            <button 
                                key={day.value}
                                onClick={() => setDays(day.value)}
                                className={day.value === days ? styles.selected : ''}
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Chart;
