'use client';

import React, { useState, useEffect } from 'react';
import { Coin } from '@/types';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Coin[]>([]);
    const [recentlyViewedCoins, setRecentlyViewedCoins] = useState<Coin[]>([]);
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);

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
                className={`border p-2 w-full rounded ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
            />
            {suggestions.length > 0 && (
                <ul className={`absolute w-full mt-1 rounded shadow-lg ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}>
                    {suggestions.map((coin: Coin) => (
                        <li key={coin.id} className={`p-2 hover:${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
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
