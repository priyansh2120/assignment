'use client';

import React, { useState } from 'react';
import AllCoinsTable from './AllCoinsTable';
import HoldingsTable from './HoldingsTable';
import TrendingCoinsTable from './TrendingCoinsTable';

const CryptoDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'bitcoin' | 'ethereum' | 'trending'>('all');

  const handleTabChange = (tab: 'all' | 'bitcoin' | 'ethereum' | 'trending') => {
    setSelectedTab(tab);
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-bold mb-4'>Crypto Dashboard</h1>
      <div className='mb-4'>
        <button
          onClick={() => handleTabChange('all')}
          className={`px-4 py-2 mr-2 ${selectedTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All Coins
        </button>
        <button
          onClick={() => handleTabChange('bitcoin')}
          className={`px-4 py-2 mr-2 ${selectedTab === 'bitcoin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Bitcoin Holdings
        </button>
        <button
          onClick={() => handleTabChange('ethereum')}
          className={`px-4 py-2 mr-2 ${selectedTab === 'ethereum' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Ethereum Holdings
        </button>
        <button
          onClick={() => handleTabChange('trending')}
          className={`px-4 py-2 ${selectedTab === 'trending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Trending
        </button>
      </div>
      <div className='min-w-full bg-white rounded-lg overflow-hidden'>
        {selectedTab === 'all' && <AllCoinsTable />}
        {selectedTab === 'bitcoin' && <HoldingsTable crypto="bitcoin" />}
        {selectedTab === 'ethereum' && <HoldingsTable crypto="ethereum" />}
        {selectedTab === 'trending' && <TrendingCoinsTable />}
      </div>
    </div>
  );
};

export default CryptoDashboard;
