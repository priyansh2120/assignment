'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className='text-xl font-semibold mb-2 text-center'>Trending Coins</h2>
      <div className="overflow-auto" style={{ maxHeight: '500px' }}>
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
              <tr key={coin.item.id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-600'}>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{coin.item.market_cap_rank}</td>
                <td className='px-4 py-2'>
                  <img src={coin.item.thumb} alt={coin.item.name} className='w-10 h-10 rounded-full object-cover' />
                </td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{coin.item.name}</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{coin.item.symbol}</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{coin.item.price_btc.toFixed(8)}</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{coin.item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrendingCoinsTable;
