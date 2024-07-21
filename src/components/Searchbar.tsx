'use client';

import React, { useState, useEffect } from 'react';
import { Coin } from '@/types';
import Link from 'next/link';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Coin[]>([]);
    const [recentlyViewedCoins, setRecentlyViewedCoins] = useState<Coin[]>([]);

    useEffect(() => {
        const storedCoins = JSON.parse(localStorage.getItem('recentlyViewedCoins')) || [];
        setRecentlyViewedCoins(storedCoins);
    }, []);

    useEffect(() => {
        if (query.length === 0) {
            setSuggestions([]);
        } else {
            const filteredSuggestions = recentlyViewedCoins.filter(coin =>
                coin.name.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        }
    }, [query, recentlyViewedCoins]);

    return (
        <div className='relative'>
            <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search for coins...'
                className='border p-2 w-full rounded'
            />
            {suggestions.length > 0 && (
                <ul className='absolute bg-white border w-full mt-1 rounded shadow-lg'>
                    {suggestions.map((coin: Coin) => (
                        <li key={coin.id} className='p-2 hover:bg-gray-200'>
                            <Link href={`/coin/${coin.id}`}>
                                {coin.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
