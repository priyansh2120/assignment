'use client';

import React, { useState, useEffect } from 'react';
import { Coin } from '@/types';
import { useDragDrop } from '@/components/DragDropContext';
import Image from 'next/image';

const WatchlistTable = ({ coins }: { coins: Coin[] }) => {
  const [watchlist, setWatchlist] = useState<Coin[]>([]);
  const { draggingCoin } = useDragDrop();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWatchlist = localStorage.getItem('watchlist');
      const initialWatchlist = savedWatchlist ? JSON.parse(savedWatchlist) : [];
      const updatedWatchlist = initialWatchlist.map((storedCoin: Coin) => {
        const updatedCoin = coins.find((coin) => coin.id === storedCoin.id);
        return updatedCoin ? updatedCoin : storedCoin;
      });
      setWatchlist(updatedWatchlist);
    }
  }, [coins]);

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
      className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-auto border border-gray-200 dark:border-gray-700"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 className="text-xl font-semibold py-2 text-gray-700 dark:text-gray-100 text-center bg-gray-100 overflow-auto">Watchlist</h2>
      <table className="w-full">
        <thead className="bg-gray-100 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Coin</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Name</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Price</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">24h Change</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((coin: Coin, index: number) => (
            <tr key={coin.id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-600'}>
              <td className="px-4 py-2">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  className="w-10 h-10 rounded-full object-cover"
                  width={40}
                  height={40}
                />
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-300">{coin.name}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-300">₹{coin.current_price}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-300">{coin.price_change_percentage_24h}%</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleRemove(coin.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
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
