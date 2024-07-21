"use client";


import { Inter } from "next/font/google";
import "./globals.css";
import { Provider, useSelector } from 'react-redux';
import { useEffect } from 'react';
import store, { RootState } from '@/store';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <LayoutWithTheme>{children}</LayoutWithTheme>
        </Provider>
      </body>
    </html>
  );
}

const LayoutWithTheme = ({ children }: { children: React.ReactNode }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
