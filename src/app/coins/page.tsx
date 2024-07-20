import axios from 'axios';
import { Coin } from '@/types';
import Pagination from '@/components/Pagination';

export const revalidate = 60; // Revalidate the page every 60 seconds

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

export default async function CoinsPage() {
  const coins = await getCoins();

  return (
    <section>
      <h1>Coins List</h1>
      <Pagination initialCoins={coins} />
    </section>
  );
}
