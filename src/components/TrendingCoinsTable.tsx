'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

interface TrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
  };
}

const TrendingCoinsTable = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/search/trending',
        headers: {
          accept: 'application/json',
        }
      };

      try {
        const response = await axios.request(options);
        setTrendingCoins(response.data.coins);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending coins:', error);
        setError('Error fetching trending coins.');
        setLoading(false);
      }
    };

    fetchTrendingCoins();
  }, []);

  if (loading) {
    return <div className='-mt-[-200px]'><Loader/></div>;
  }

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
    <div className='overflow-x-auto'>
      <div className='inline-block min-w-full'>
        <div className='overflow-hidden'>
          <table className='min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700'>
            <thead className='bg-gray-100 dark:bg-gray-900'>
              <tr>
                <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Rank</th>
                <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Coin</th>
                <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Name</th>
                <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Symbol</th>
                <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Price (BTC)</th>
                <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Score</th>
              </tr>
            </thead>
            <tbody>
              {trendingCoins.map((coin, index) => (
                <tr key={coin.item.id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}>
                  <td className='px-4 py-2 text-gray-900 dark:text-gray-200'>{coin.item.market_cap_rank}</td>
                  <td className='px-4 py-2'>
                    <img src={coin.item.thumb} alt={coin.item.name} className='w-6 h-6 inline-block mr-2' />
                    <span className='text-gray-900 dark:text-gray-200'>{coin.item.name}</span>
                  </td>
                  <td className='px-4 py-2 text-gray-900 dark:text-gray-200'>{coin.item.name}</td>
                  <td className='px-4 py-2 text-gray-900 dark:text-gray-200'>{coin.item.symbol.toUpperCase()}</td>
                  <td className='px-4 py-2 text-gray-900 dark:text-gray-200'>{coin.item.price_btc.toFixed(8)}</td>
                  <td className='px-4 py-2 text-gray-900 dark:text-gray-200'>{coin.item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrendingCoinsTable;
