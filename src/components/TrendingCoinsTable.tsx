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
          'x-cg-demo-api-key': 'CG-SdC7w5bkdz7CfT5rS7YbWpBC'
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
      <h2 className='text-xl font-semibold mb-2'>Trending Coins</h2>
      <table className='min-w-full bg-white rounded-lg overflow-hidden'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-4 py-2 text-left'>Rank</th>
            <th className='px-4 py-2 text-left'>Coin</th>
            <th className='px-4 py-2 text-left'>Name</th>
            <th className='px-4 py-2 text-left'>Symbol</th>
            <th className='px-4 py-2 text-left'>Price (BTC)</th>
            <th className='px-4 py-2 text-left'>Score</th>
          </tr>
        </thead>
        <tbody>
          {trendingCoins.map((coin) => (
            <tr key={coin.item.id} className='bg-gray-50'>
              <td className='px-4 py-2'>{coin.item.market_cap_rank}</td>
              <td className='px-4 py-2'>
                <img src={coin.item.thumb} alt={coin.item.name} className='w-10 h-10 rounded-full object-cover' />
              </td>
              <td className='px-4 py-2'>{coin.item.name}</td>
              <td className='px-4 py-2'>{coin.item.symbol}</td>
              <td className='px-4 py-2'>{coin.item.price_btc.toFixed(8)}</td>
              <td className='px-4 py-2'>{coin.item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrendingCoinsTable;
