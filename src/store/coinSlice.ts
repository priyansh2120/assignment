// store/coinSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from '@/types';

interface CoinState {
  coins: Coin[];
}

const initialState: CoinState = {
  coins: [],
};

const coinSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoins(state, action: PayloadAction<Coin[]>) {
      state.coins = action.payload;
    },
  },
});

export const { setCoins } = coinSlice.actions;
export const coinReducer = coinSlice.reducer;
