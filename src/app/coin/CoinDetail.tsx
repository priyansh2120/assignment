'use client';

import React, { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import axios from 'axios';
import Chart from '@/components/Chart';
import { Button } from '@mui/material';

const CoinDetail = () => {
    const { id } = useParams();
    const pathname = usePathname();

    const [loading, setLoading] = useState(true);
    const [coin, setCoin] = useState({});
    const [days, setDays] = useState("24h");
    const [chartArray, setChartArray] = useState([]);
    const btns = ["24h", "7d", "14d", "30d", "60d", "1y", "max"];

    const fetchCoinData = async (coinId:any, days:any) => {
        try {
            setLoading(true);
            const { data: coinData } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
            const { data: chartData } = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
                params: {
                    vs_currency: 'inr',
                    days: days
                }
            });
            setCoin(coinData);
            setChartArray(chartData.prices);
            setLoading(false);

            // Save to recently viewed in local storage
            const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewedCoins')) || [];
            const updatedRecentlyViewed = [coinData, ...recentlyViewed.filter(c => c.id !== coinId)].slice(0, 5);
            localStorage.setItem('recentlyViewedCoins', JSON.stringify(updatedRecentlyViewed));
        } catch (error) {
            console.error('Error fetching coin data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchCoinData(id, days);
        }
    }, [id, days]);

    const switchChart = (key) => {
        setDays(key);
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="coin-detail">
            <div className="coin">
                <div className="left">
                    <img src={coin?.image?.large} alt={coin?.name} />
                    <h2>{coin?.name}</h2>
                    <p>Rank: #{coin?.coingecko_rank}</p>
                </div>
                <div className="right">
                    <div className="top">
                        <span>
                            24h Change:
                            <div className={coin?.market_data?.price_change_percentage_24h > 0 ? "green" : "red"}>
                                {coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%
                            </div>
                        </span>
                        <span>
                            Price:
                            <div>
                                ₹{coin?.market_data?.current_price?.inr?.toFixed(2)}
                            </div>
                        </span>
                        <span>Symbol: {coin?.symbol}</span>
                    </div>
                    <div className="bottom">{coin?.description?.en}</div>
                </div>
            </div>
            <div className="chart">
                <Chart arr={chartArray} days={days} />
            </div>
            <div className="btn">
                {btns.map((item) => (
                    <Button
                        key={item}
                        onClick={() => switchChart(item)}
                        variant="contained"
                        color="success"
                    >
                        {item}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default CoinDetail;
