// components/AllCoinsTable.tsx
'use client';

import React, { useState } from 'react';
import { Coin } from '@/types';
import { useDragDrop } from '@/components/DragDropContext';
import Link from 'next/link';

interface AllCoinsTableProps {
  coins: Coin[];
  onSelectCoin: (coin: Coin) => void;
  selectedCoins: Coin[];
}

const AllCoinsTable = ({ coins, onSelectCoin, selectedCoins }: AllCoinsTableProps) => {
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

  return (
    <div>
      <table className='min-w-full bg-white rounded-lg overflow-hidden'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-4 py-2 text-left'>Select</th>
            <th className='px-4 py-2 text-left'>Coin</th>
            <th className='px-4 py-2 text-left'>Name</th>
            <th className='px-4 py-2 text-left'>Price</th>
            <th className='px-4 py-2 text-left'>24h Change</th>
          </tr>
        </thead>
        <tbody>
          {currentCoins.map((coin: Coin, index: number) => (

            <tr
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'}`}
              draggable
              onDragStart={() => setDraggingCoin(coin)}
              id={coin.id}
            >
              <td className='px-4 py-2'>
                <input
                  type='checkbox'
                  checked={selectedCoins.includes(coin)}
                  onChange={() => handleSelectCoin(coin)}
                />
              </td>
              <Link href={`/coin/${coin.id}`}>
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
              </Link>
            </tr>


          ))}
        </tbody>
      </table>
      <div className='flex justify-between mt-4'>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AllCoinsTable;
