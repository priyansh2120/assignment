'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Coin, PaginationProps } from '@/types';

const Pagination = ({ coins }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 20;

  // Calculate total number of pages
  const totalPages = Math.ceil(coins.length / coinsPerPage);

  // Get coins for the current page
  const startIndex = (currentPage - 1) * coinsPerPage;
  const currentCoins = coins.slice(startIndex, startIndex + coinsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className='mt-16'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {currentCoins.map((coin: Coin) => (
          <div key={coin.id} className='rounded bg-white p-4 shadow'>
            <img src={coin.image} alt={coin.name} className='w-16 h-16 object-cover' width={12} height={12}/>
            <h3 className='font-semibold'>{coin.name}</h3>
            <p className='text-sm text-gray-500'>Price: ₹{coin.current_price}</p>
            <p className='text-sm text-gray-500'>24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>
          </div>
        ))}
      </div>
      <div className='mt-8 flex justify-between'>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </section>
  );
};

export default Pagination;
