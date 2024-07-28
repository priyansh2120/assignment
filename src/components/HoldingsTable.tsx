'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';

interface Holding {
  name: string;
  symbol: string;
  country: string;
  total_holdings: number;
  total_current_value_usd: number | undefined;
  percentage_of_total_supply: number;
}

interface HoldingsTableProps {
  selectedCrypto: 'bitcoin' | 'ethereum';
}

const HoldingsTable = ({ selectedCrypto }: HoldingsTableProps) => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const holdingsPerPage = 20;
  const totalPages = Math.ceil(holdings.length / holdingsPerPage);

  useEffect(() => {
    const fetchHoldings = async () => {
      setIsLoading(true);
      setError(null);
      const url =
        selectedCrypto === 'bitcoin'
          ? 'https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin'
          : 'https://api.coingecko.com/api/v3/companies/public_treasury/ethereum';

      try {
        const response = await axios.get(url, {
          headers: { accept: 'application/json' },
        });
        setHoldings(response.data.companies);
      } catch (error) {
        console.error('Error fetching holdings:', error);
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          setError('Too many requests. Please try again later.');
        } else {
          setError('An error occurred while fetching data.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchHoldings();
  }, [selectedCrypto]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * holdingsPerPage;
  const currentHoldings = holdings.slice(startIndex, startIndex + holdingsPerPage);

  if (isLoading) {
    return <div className='-mt-[200px]'><Loader/></div>
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
    <div className='flex flex-col items-center'>
      <div className='overflow-auto' style={{ maxHeight: '500px' }}>
        <table className='min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700'>
          <thead className='bg-gray-100 dark:bg-gray-900'>
            <tr>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Company</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Symbol</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Country</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Total Holdings</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Total Value (USD)</th>
              <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>% of Supply</th>
            </tr>
          </thead>
          <tbody>
            {currentHoldings.map((holding, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-600'}>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{holding.name}</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{holding.symbol}</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{holding.country}</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{holding.total_holdings}</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>${holding.total_current_value_usd?.toLocaleString() || 'N/A'}</td>
                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{holding.percentage_of_total_supply?.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-between mt-4 w-full'>
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

export default HoldingsTable;
