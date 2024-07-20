"use client";
import { Provider } from 'react-redux';
import store from '@/store';


export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      
        <main>{children}</main>
      
    </Provider>
  );
}