'use client';

import React, { useEffect, useState } from 'react';
import { Coin } from '@/types';
import Link from 'next/link';

const RecentlyViewedCoins = () => {
    const [recentlyViewedCoins, setRecentlyViewedCoins] = useState<Coin[]>([]);

    useEffect(() => {
        const storedCoins = JSON.parse(localStorage.getItem('recentlyViewedCoins')) || [];
        setRecentlyViewedCoins(storedCoins);
    }, []);

    return (
        <div>
            <h2 className='text-xl font-semibold mb-2'>Recently Viewed Coins</h2>
            <table className='min-w-full bg-white rounded-lg overflow-hidden'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='px-4 py-2 text-left'>Coin</th>
                        <th className='px-4 py-2 text-left'>Name</th>
                        <th className='px-4 py-2 text-left'>Price</th>
                        <th className='px-4 py-2 text-left'>24h Change</th>
                    </tr>
                </thead>
                <tbody>
                    {recentlyViewedCoins.map((coin: Coin) => (
                        <tr key={coin.id} className='bg-gray-50'>
                            <td className='px-4 py-2'>
                                <Link href={`/coin/${coin.id}`}>
                                    {coin.name}
                                </Link>
                            </td>
                            <td className='px-4 py-2'>
                                <img
                                    src={coin.image}
                                    alt={coin.name}
                                    className='w-10 h-10 rounded-full object-cover'
                                />
                            </td>
                            <td className='px-4 py-2'>₹{coin.market_data.current_price.inr}</td>
                            <td className='px-4 py-2'>{coin.market_data.price_change_percentage_24h.toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentlyViewedCoins;
