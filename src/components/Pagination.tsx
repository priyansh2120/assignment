'use client';

import { useState, useEffect } from 'react';
import { Coin } from '@/types';
import CoinChart from './CoinChart'; // Make sure to import the CoinChart component

interface PaginationProps {
  initialCoins: Coin[];
}

const Pagination = ({ initialCoins }: PaginationProps) => {
  const [coins, setCoins] = useState<Coin[]>(initialCoins);
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 20;

  useEffect(() => {
    const cachedCoins = localStorage.getItem('coins');
    if (cachedCoins) {
      setCoins(JSON.parse(cachedCoins));
    } else {
      localStorage.setItem('coins', JSON.stringify(initialCoins));
    }
  }, [initialCoins]);

  const handleSelectCoin = (coinId: string) => {
    setSelectedCoins((prevSelectedCoins) =>
      prevSelectedCoins.includes(coinId)
        ? prevSelectedCoins.filter((id) => id !== coinId)
        : [...prevSelectedCoins, coinId]
    );
  };

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
      <CoinChart selectedCoins={selectedCoins} />
      <div className='overflow-x-auto'>
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
              <tr key={coin.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'}`}>
                <td className='px-4 py-2'>
                  <input
                    type="checkbox"
                    checked={selectedCoins.includes(coin.id)}
                    onChange={() => handleSelectCoin(coin.id)}
                  />
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-8 flex justify-between items-center'>
        <button
          className={`pagination-button ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#8592; Previous
        </button>
        <span className='text-gray-600'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`pagination-button ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &#8594;
        </button>
      </div>
    </section>
  );
};

export default Pagination;
