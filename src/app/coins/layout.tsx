"use client";

import { Provider, useSelector } from 'react-redux';
import { useEffect } from 'react';
import store, { RootState } from '@/store';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <LayoutWithTheme>{children}</LayoutWithTheme>
    </Provider>
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
      <main>{children}</main>
    </>
  );
};
