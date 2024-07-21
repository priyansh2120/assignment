'use client';

import React, { useEffect, useState } from 'react';
import { Coin } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

const RecentlyViewedCoins = ({ coins }: { coins: Coin[] }) => {
    const [recentlyViewedCoins, setRecentlyViewedCoins] = useState<Coin[]>([]);

    useEffect(() => {
        const storedCoins = JSON.parse(localStorage.getItem('recentlyViewedCoins') || '[]');
        const updatedCoins = storedCoins.map((storedCoin: Coin) => {
            const updatedCoin = coins.find(coin => coin.id === storedCoin.id);
            return updatedCoin ? updatedCoin : storedCoin;
        });
        setRecentlyViewedCoins(updatedCoins);
    }, [coins]);

    return (
        <div
            className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
        >
            <h2 className="text-xl font-semibold py-2 text-gray-700 dark:text-gray-100 text-center bg-gray-100">Recently Viewed</h2>
            <div className='overflow-auto' style={{ maxHeight: '500px' }}>
                <table className='min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700'>
                    <thead className='bg-gray-100 dark:bg-gray-900'>
                        <tr>
                            <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Coin</th>
                            <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Name</th>
                            <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>Price</th>
                            <th className='px-4 py-2 text-left text-gray-700 dark:text-gray-200'>24h Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentlyViewedCoins.map((coin: Coin, index: number) => (
                            <tr key={coin.id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-600'}>
                                <td className='px-4 py-2'>
                                    <Link href={`/coin/${coin.id}`}>
                                        <Image
                                            src={coin.image}
                                            alt={coin.name}
                                            className='w-10 h-10 rounded-full object-cover'
                                            width={40}
                                            height={40}
                                        />
                                    </Link>
                                </td>
                                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{coin.name}</td>
                                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>₹{coin.current_price}</td>
                                <td className='px-4 py-2 text-gray-900 dark:text-gray-300'>{coin.price_change_percentage_24h}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentlyViewedCoins;
