'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Holding {
  name: string;
  symbol: string;
  country: string;
  total_holdings: number;
  total_current_value_usd: number | undefined;
  percentage_of_total_supply: number;
}

const HoldingsTable = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<'bitcoin' | 'ethereum'>('bitcoin');

  useEffect(() => {
    const fetchHoldings = async () => {
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
      }
    };

    fetchHoldings();
  }, [selectedCrypto]);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-bold mb-4'>Public Holdings</h1>
      <div className='mb-4'>
        <button
          onClick={() => setSelectedCrypto('bitcoin')}
          className={`px-4 py-2 mr-2 ${selectedCrypto === 'bitcoin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Bitcoin
        </button>
        <button
          onClick={() => setSelectedCrypto('ethereum')}
          className={`px-4 py-2 ${selectedCrypto === 'ethereum' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Ethereum
        </button>
      </div>
      <div className='min-w-full bg-white rounded-lg overflow-hidden'>
        <table className='min-w-full'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-2 text-left'>Company</th>
              <th className='px-4 py-2 text-left'>Symbol</th>
              <th className='px-4 py-2 text-left'>Country</th>
              <th className='px-4 py-2 text-left'>Total Holdings</th>
              <th className='px-4 py-2 text-left'>Total Value (USD)</th>
              <th className='px-4 py-2 text-left'>% of Supply</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-200'}`}>
                <td className='px-4 py-2'>{holding.name}</td>
                <td className='px-4 py-2'>{holding.symbol}</td>
                <td className='px-4 py-2'>{holding.country}</td>
                <td className='px-4 py-2'>{holding.total_holdings}</td>
                <td className='px-4 py-2'>${holding.total_current_value_usd?.toLocaleString() || 'N/A'}</td>
                <td className='px-4 py-2'>{holding.percentage_of_total_supply.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoldingsTable;
