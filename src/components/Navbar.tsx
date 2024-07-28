'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleTheme } from '@/store/themeSlice';
import SearchBar from './Searchbar'; 
import Image from 'next/image';
import Link from 'next/link';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // Import the icons

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className={`p-4 flex justify-between items-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className='logo'>
        <Link href='/coins'>
          <Image src='/logo.png' alt='Logo' height={36} width={36}/>
        </Link>
      </div>
      <div className='search w-64'> {/* Changed width from w-32 to w-64 */}
        <SearchBar />
      </div>
      <div>
        <button
          onClick={handleThemeToggle}
          className='p-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <SunIcon className='w-6 h-6' />
          ) : (
            <MoonIcon className='w-6 h-6' />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
