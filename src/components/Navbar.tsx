'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleTheme } from '@/store/themeSlice';
import SearchBar from './Searchbar'; 
import Image from 'next/image';

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className={`p-4 flex justify-between items-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className='logo'>
        <Image src='/logo.png' alt='Logo'  height={36} width={36}/>
      </div>
      <div className='search w-32'>
        <SearchBar />
      </div>
      <div>
        <button
          onClick={handleThemeToggle}
          className='p-2 rounded bg-gray-300 dark:bg-gray-700'
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
