import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Coin } from '@/types';

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async () => {
  const response = await axios.get<Coin[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr', {
    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-SdC7w5bkdz7CfT5rS7YbWpBC' },
  });
  return response.data;
});

interface CoinsState {
  coins: Coin[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CoinsState = {
  coins: [],
  status: 'idle',
  error: null,
};

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch coins';
      });
  },
});

export default coinsSlice.reducer;
