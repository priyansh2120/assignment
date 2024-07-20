import axios from 'axios';
import Pagination from '@/components/Pagination';
import { Coin } from '@/types';

const COINS_API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr';

async function getCoins(): Promise<Coin[]> {
  try {
    const response = await axios.get<Coin[]>(COINS_API_URL, {
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-SdC7w5bkdz7CfT5rS7YbWpBC' }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    return []; // Return an empty array or handle the error as needed
  }
}

export default async function CoinsPage() {
  const coins = await getCoins();
  return <Pagination coins={coins} />;
}
