'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Chart from '@/components/Chart';
import { Button } from '@mui/material';
import Loader from '@/components/Loader';

const CoinDetail = ({id}:{id:any}) => {
    // const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [coin, setCoin] = useState<any>({});
    const [days, setDays] = useState<string>("24h");
    const [chartArray, setChartArray] = useState<any[]>([]);
    const btns: string[] = ["24h", "7d", "14d", "30d", "60d", "1y", "max"];
    const [error, setError] = useState<string | null>(null);

    const fetchCoinData = async (coinId: string, days: string) => {
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
            const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewedCoins') || '[]');
            const updatedRecentlyViewed = [coinData, ...recentlyViewed.filter((c: any) => c.id !== coinId)].slice(0, 5);
            localStorage.setItem('recentlyViewedCoins', JSON.stringify(updatedRecentlyViewed));
        } catch (error:any) {
            console.error('Error fetching coin data:', error);
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchCoinData(id, days);
        }
    }, [id, days]);

    const switchChart = (key: string) => {
        setDays(key);
    };

    if (loading) return <div className="loading"><Loader/></div>;
    if (error) {
        return (
          <div className="flex justify-center items-center h-64">
            <div className="text-center p-8 bg-red-100 dark:bg-red-900 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">Oops!</h2>
              <p className="text-red-600 dark:text-red-300">{error}</p>
              <p className="mt-4 text-sm text-red-500 dark:text-red-400">Please try again in a few minutes.</p>
            </div>
          </div>
        );
      }

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 p-6 flex flex-col md:flex-row">
                <div className="flex-1 text-center md:text-left">
                    <img src={coin?.image?.large} alt={coin?.name} className="w-36 h-36 object-cover rounded-full mx-auto mb-4 md:mx-0"/>
                    <h2 className="text-3xl font-bold mb-2">{coin?.name}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Market Cap Rank: #{coin?.market_cap_rank}</p>
                </div>
                <div className="flex-2 p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                        <span className="flex items-center text-xl mb-2 md:mb-0">
                            24h Change:
                            <div className={`ml-2 px-3 py-1 rounded ${coin?.market_data?.price_change_percentage_24h > 0 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400"}`}>
                                {coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%
                            </div>
                        </span>
                        <span className="flex items-center text-xl mb-2 md:mb-0">
                            Price:
                            <div className="ml-2 text-2xl font-bold">
                                ₹{coin?.market_data?.current_price?.inr?.toFixed(2)}
                            </div>
                        </span>
                        <span className="text-xl">Symbol: {coin?.symbol}</span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: coin?.description?.en }} />
                </div>
            </div>
            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <Chart arr={chartArray} days={days} />
            </div>
            <div className="flex space-x-2 ">
                {btns.map((item) => (
                    <Button
                        key={item}
                        onClick={() => switchChart(item)}
                        variant="contained"
                        color="success"
                        className="capitalize"
                    >
                        {item}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default CoinDetail;


