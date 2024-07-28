'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllCoinsTable from '@/components/AllCoinsTable';
import WatchlistTable from '@/components/WatchlistTable';
import CoinChart from '@/components/CoinChart';
import { Coin } from '@/types';
import { DragDropProvider } from '@/components/DragDropContext';
import RecentlyViewedCoins from '@/components/RecentlyViewedCoins';
import HoldingsTable from '@/components/HoldingsTable';
import TrendingCoinsTable from '@/components/TrendingCoinsTable';

async function getCoins(): Promise<Coin[]> {
    try {
        const response = await axios.get<Coin[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr', {
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-SdC7w5bkdz7CfT5rS7YbWpBC' }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching coins:', error);
        return [];
    }
}

const CoinsPage = (id:any) => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [selectedCoins, setSelectedCoins] = useState<Coin[]>([]);
    const [view, setView] = useState<'all' | 'bitcoin' | 'ethereum' | 'trending'>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCoins() {
            try {
                setIsLoading(true);
                setError(null);
                const coinsData = await getCoins();
                setCoins(coinsData);

                // Set default selected coins (Bitcoin and Wrapped Bitcoin)
                const defaultCoins = coinsData.filter(coin => coin.id === 'bitcoin' || coin.id === 'wrapped-bitcoin');
                setSelectedCoins(defaultCoins);
            } catch (error) {
                console.error('Error fetching coins:', error);
                setError('Failed to fetch coins. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }
        fetchCoins();
    }, []);

    const handleSelectCoin = (coin: Coin) => {
        setSelectedCoins((prevSelectedCoins) => {
            if (prevSelectedCoins.includes(coin)) {
                return prevSelectedCoins.filter((selectedCoin) => selectedCoin.id !== coin.id);
            } else {
                return [...prevSelectedCoins, coin];
            }
        });
    };

    return (
        <DragDropProvider>
            <div className='flex flex-col items-center bg-white dark:bg-gray-900 min-h-screen'>
                {/* <h1 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>Coin Dashboard</h1> */}
                <div className='w-full flex flex-col lg:flex-row'>
                    <div className='w-full lg:w-2/3 p-4'>
                        <div className='lg:ml-44'>
                            <CoinChart selectedCoins={selectedCoins.map((coin) => coin.id)} />
                        </div>
                        <div className='flex justify-center space-x-2 mt-4 mb-2 w-full sm:mx-4'>
                            <button
                                onClick={() => setView('all')}
                                className={`px-3 py-1 rounded-lg ${view === 'all' ? 'bg-pink-600 text-white' : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'}`}
                            >
                                All Coins
                            </button>
                            <button
                                onClick={() => setView('bitcoin')}
                                className={`px-3 py-1 rounded-lg ${view === 'bitcoin' ? 'bg-purple-600 text-white' : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'}`}
                            >
                                Bitcoin Holdings
                            </button>
                            <button
                                onClick={() => setView('ethereum')}
                                className={`px-3 py-1 rounded-lg ${view === 'ethereum' ? 'bg-indigo-600 text-white' : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'}`}
                            >
                                Ethereum Holdings
                            </button>
                            <button
                                onClick={() => setView('trending')}
                                className={`px-3 py-1 rounded-lg ${view === 'trending' ? 'bg-teal-600 text-white' : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'}`}
                            >
                                Trending Coins
                            </button>
                        </div>
                        <div className='w-full p-4'>
                            {view === 'all' && (
                                <>
                                    <AllCoinsTable coins={coins} onSelectCoin={handleSelectCoin} selectedCoins={selectedCoins} loading={isLoading} error={error}
                                    />
                                </>
                            )}
                            {view === 'bitcoin' && <HoldingsTable selectedCrypto='bitcoin' />}
                            {view === 'ethereum' && <HoldingsTable selectedCrypto='ethereum' />}
                            {view === 'trending' && <TrendingCoinsTable />}
                        </div>
                    </div>
                    <div className='w-full lg:w-1/3 p-4'>
                        <div className='h-full mb-4 overflow-auto'>
                            {/* <h2 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>Watchlist</h2> */}
                            <WatchlistTable coins={coins} isLoading={isLoading} error={error} />
                        </div>
                        <div className='mt-2 overflow-auto'>
                            {/* <h2 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>Recently Viewed Coins</h2> */}
                            <RecentlyViewedCoins coins={coins} isLoading={isLoading} error={error} />
                        </div>
                    </div>
                </div>
            </div>
        </DragDropProvider>
    );
};

export default CoinsPage;
