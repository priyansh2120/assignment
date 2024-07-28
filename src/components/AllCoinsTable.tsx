'use client';

import React, { useState } from 'react';
import { Coin } from '@/types';
import { useDragDrop } from '@/components/DragDropContext';
import Link from 'next/link';
import Image from 'next/image';
import Loader from './Loader';

interface AllCoinsTableProps {
  coins: Coin[];
  onSelectCoin: (coin: Coin) => void;
  selectedCoins: Coin[];
  loading: boolean;
  error: string | null;
}

const AllCoinsTable = ({ coins, onSelectCoin, selectedCoins, loading, error }: AllCoinsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 20;
  const totalPages = Math.ceil(coins.length / coinsPerPage);

  const { setDraggingCoin } = useDragDrop();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSelectCoin = (coin: Coin) => {
    onSelectCoin(coin);
  };

  const startIndex = (currentPage - 1) * coinsPerPage;
  const currentCoins = coins.slice(startIndex, startIndex + coinsPerPage);
  if (loading) {
    return <div className='-mt-[200px]'><Loader /></div>
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
    <div>
      <div className="overflow-auto" style={{ maxHeight: '500px' }}>
        <table className='min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700'>
          <thead className='bg-gray-100 dark:bg-gray-900'>
            <tr>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Select</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Coin</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Name</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Market Cap</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Supply</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Price</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>24H P</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>24H MC</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>All Time High</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>All Time Low</th>
            </tr>
          </thead>
          <tbody>
            {currentCoins.map((coin: Coin, index: number) => (
              <tr
                key={coin.id}
                draggable
                onDragStart={() => setDraggingCoin(coin)}
                className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-600'}`}
              >
                <td className='px-4 py-2'>
                  <input
                    type='checkbox'
                    checked={selectedCoins.includes(coin)}
                    onChange={() => handleSelectCoin(coin)}
                  />
                </td>
                <td className='px-4 py-2'>
                  <Link href={`/coin/${coin.id}`}>
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      className='rounded-full object-cover'
                      width={40}
                      height={40}
                    />
                  </Link>
                </td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{coin.name}</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>₹{coin.market_cap?.toLocaleString()}</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{coin.max_supply?.toLocaleString()}</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>₹{coin.current_price?.toLocaleString()}</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{coin.price_change_percentage_24h?.toFixed(2)}%</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{coin.market_cap_change_percentage_24h?.toFixed(2)}%</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{coin.ath?.toFixed(2)}%</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{coin.atl?.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-between mt-4'>
        <button
          className='btn btn-primary'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className='btn btn-primary'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllCoinsTable;
