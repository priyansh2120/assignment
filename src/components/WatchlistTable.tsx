'use client';

import React, { useState, useEffect } from 'react';
import { Coin } from '@/types';
import { useDragDrop } from '@/components/DragDropContext';

const WatchlistTable = () => {
  const [watchlist, setWatchlist] = useState<Coin[]>([]);
  const { draggingCoin } = useDragDrop();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWatchlist = localStorage.getItem('watchlist');
      setWatchlist(savedWatchlist ? JSON.parse(savedWatchlist) : []);
    }
  }, []);

  const handleDrop = () => {
    if (draggingCoin && !watchlist.some((coin) => coin.id === draggingCoin.id)) {
      setWatchlist((prevWatchlist) => {
        const newWatchlist = [...prevWatchlist, draggingCoin];
        localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
        return newWatchlist;
      });
    }
  };

  const handleRemove = (coinId: string) => {
    setWatchlist((prevWatchlist) => {
      const newWatchlist = prevWatchlist.filter((coin) => coin.id !== coinId);
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      return newWatchlist;
    });
  };

  return (
    <div
      className='min-w-full bg-white rounded-lg overflow-hidden'
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <table>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-4 py-2 text-left'>Coin</th>
            <th className='px-4 py-2 text-left'>Name</th>
            <th className='px-4 py-2 text-left'>Price</th>
            <th className='px-4 py-2 text-left'>24h Change</th>
            <th className='px-4 py-2 text-left'>Action</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((coin: Coin, index: number) => (
            <tr key={coin.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'}`}>
              <td className='px-4 py-2'>
                <img
                  src={coin.image}
                  alt={coin.name}
                  className='w-10 h-10 rounded-full object-cover'
                />
              </td>
              <td className='px-4 py-2'>{coin.name}</td>
              <td className='px-4 py-2'>₹{coin.current_price}</td>
              <td className='px-4 py-2'>{coin.price_change_percentage_24h.toFixed(2)}%</td>
              <td className='px-4 py-2'>
                <button
                  onClick={() => handleRemove(coin.id)}
                  className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700'
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchlistTable;
